<?php

namespace App\Http\Controllers\Peminjaman;

use App\Http\Controllers\Controller;
use App\Models\alat;
use App\Models\Peminjaman;
use App\Models\Transaksi;
use App\Models\transaksiDetails;
use App\Models\Ulasan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class peminjamanController extends Controller
{

    private function  generateCode($number)
    {
        $prefix = 'TRX' . date('Ymd') . str_pad($number, 4, '0', STR_PAD_LEFT);
        return $prefix;
    }

    // 1. Tambah ke cart
    public function addToCart(Request $request)
    {
        $request->validate([
            'alat_id' => 'required|exists:tr_alat,id',
            'jumlah' => 'required|integer|min:1'
        ]);

        $profile_id = Auth::user()->profile->id;

        $peminjaman = Transaksi::create([
            'alat_id' => $request->alat_id,
            'jumlah' => $request->jumlah,
            'transaksi_id' => null,
            'peminjam_id' => $profile_id,
        ]);

        return response()->json([
            'message' => 'Alat berhasil ditambahkan ke keranjang',
            'data' => $peminjaman
        ], 201);
    }

    // 2. Lihat cart
    public function viewCart()
    {
        $profile_id = Auth::user()->id;
        $items = Transaksi::with('alat')
            ->where('peminjam_id', $profile_id)
            ->whereNull('transaksi_id')
            ->get();

        return response()->json([
            'message' => 'Cart berhasil diambil',
            'data' => $items
        ]);
    }

    // 3. Checkout
    public function checkout(Request $request)
    {
        $user_id = auth()->user()->id;
        $keranjang = $request->input('keranjang');

        DB::beginTransaction();

        try {
            $transaksi = Transaksi::create([
                'peminjam_id' => $user_id,
                "tanggal_pinjam" => now(),
                "tanggal_kembali" => now()->addDays(3),
                "status" => "pending"
            ]);

            foreach ($keranjang as $item) {
                $transaksi->transaksi_details()->create([
                    'alat_id' => $item->alat_id,
                    'jumlah' => $item->qty,
                ]);
            }

            return response()->json([
                "message" => "berhasil checkout",
                "transaksi_id" => $transaksi->id
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Gagal melakukan checkout",
                'error' => $th->getMessage()
            ], $th->getCode());
        }
    }

    // 4. Konfirmasi oleh admin
    public function confirmTransaksi($id)
    {
        $transaksi = Transaksi::where('transaksi_code', $id)->first();
        if (!$transaksi) {
            return response()->json([
                'message' => "Transaksi tidak ditemukan"
            ], 404);
        }

        $transaksi->status = 'dipinjam';
        $transaksi->save();

        return response()->json([
            'message' => 'Transaksi berhasil dikonfirmasi',
            'data' => $transaksi
        ]);
    }

    // 5. Pengembalian alat
    public function kembalikan($id)
    {
        $transaksi = Transaksi::where('transaksi_code', $id)->first();
        $transaksi->status = 'dikembalikan';
        $transaksi->tanggal_kembali = now();
        $transaksi->save();

        return response()->json([
            'message' => 'Alat berhasil dikembalikan',
            'data' => $transaksi
        ]);
    }

    // 6. Tambah ulasan setelah pengembalian

    public function transaksiPending(string $id)
    {
        $transaksi = Transaksi::find($id);

        $transaksi?->delete();

        return response()->json([
            'message' => 'Transaksi berhasil didelete',
        ]);
    }

    public function riwayatTransaksi()
    {
        $profile_id = Auth::user()->profile->id;

        $transaksi = Transaksi::with(['peminjaman.alat', 'peminjaman.peminjam.profile'])
            ->where('peminjam_id', $profile_id)
            ->whereIn('status', ['dipinjam', 'dikembalikan'])
            ->get();

        return response()->json([
            'message' => 'Riwayat transaksi berhasil diambil',
            'data' => $transaksi
        ]);
    }

    public function getTransaksi(Request $request)
    {

        $transaksi = Transaksi::with(['transaksi_details.alat', 'peminjam.profile'])
            ->when($request->transaksi_user, fn($q) => $q->where('peminjam_id', auth()->id()))
            ->get();


        return response()->json([
            'message' => 'Riwayat transaksi berhasil diambil',
            'data' => $transaksi
        ]);
    }

    public function showTransaksi(Request $request, string $id)
    {
        $transaksi = Transaksi::with(['transaksi_details.alat', 'peminjam.profile'])
            ->findOrFail($id);

        return response()->json([
            'message' => 'Detail transaksi berhasil diambil',
            'data' => [
                'status'          => $transaksi->status,
                'nama_peminjam'   => $transaksi->nama_peminjam,
                'email_peminjam'  => $transaksi->peminjam?->email,
                'tanggal_pinjam'  => $transaksi->tanggal_pinjam,
                'tanggal_kembali' => $transaksi->tanggal_kembali,

                'transaksi_details' => $transaksi->transaksi_details?->map(function ($detail) {
                    return [
                        'jumlah' => $detail->jumlah,
                        'nama_alat'   => $detail->alat->name ?? null,
                        'keterangan_alat' => $detail->alat->keterangan ?? null,
                    ];
                }),
            ]
        ]);
    }

    public function pinjamLangsung(Request $request)
    {

        $request->validate([
            'alat_id' => 'required|exists:tr_alat,id',
            'jumlah' => 'required|integer|min:1'
        ]);

        $profile_id = Auth::user()->id;

        DB::beginTransaction();
        try {
            $transaksi = Transaksi::create([
                'peminjam_id' => $profile_id,
                'tanggal_pinjam' => now(),
                'status' => 'pending'
            ]);

            $transaksi->transaksi_details()->create([
                'alat_id' => $request->alat_id,
                'jumlah' => $request->jumlah,
            ]);

            $transaksi->transaksi_code = $this->generateCode($transaksi->id);
            $transaksi->save();


            $alat = alat::find($request->alat_id);

            $alat->stok -= $request->jumlah;

            $alat->save();

            DB::commit();
            return response()->json([
                'message' => 'Alat berhasil langsung dipinjam',
                'data' => $transaksi->load('transaksi_details')
            ], 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Gagal pinjam langsung', 'error' => $e->getMessage()], 500);
        }
    }
}
