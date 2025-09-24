<?php

namespace App\Http\Controllers\Keranjang;

use App\Http\Controllers\Controller;
use App\Models\Keranjang;
use Illuminate\Http\Request;

class KeranjangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        try {
            return response()->json([
                'message' => 'Berhasil mendapatkan data keranjang',
                'data' => $user->keranjang()->with(['peminjam', 'alat.foto_alat'])->get()->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'qty' => $item->qty,
                        'alat_id' => $item->alat?->id,
                        'alat_name' => $item->alat?->name,
                        'alat_deskripsi' => $item->alat?->deskripsi,
                        'alat_stok' => $item->alat?->stok,
                        'alat_keterangan' => $item->alat?->keterangan,
                        'alat_foto' => asset('storage/' . $item->alat?->foto_alat?->foto ?? '')
                    ];
                })
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Gagal mendapatkan data keranjang',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $val = $request->validate([
            'alat_id' => ['exists:tr_alat,id'],
            'qty' => ['required', 'numeric']
        ]);

        try {
            $user = auth()->user();

            if ($duplicateKeranjang = Keranjang::where('peminjam_id', $user->id)->where('alat_id', $val['alat_id'])->first()){
                $duplicateKeranjang->qty += $val['qty'];
                $duplicateKeranjang->save();
            } else {
                Keranjang::create([
                    'peminjam_id' => $user->id,
                    'alat_id' => $val['alat_id'],
                    'qty' => $val['qty']
                ]);
            }

            return response()->json([
                'message' => "Alat dimasukkan keranjang"
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Alat gagal dimasukkan keranjang!",
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Keranjang $keranjang)
    {
        try {
            $keranjang->load('alat.foto_alat', 'peminjam');
            
            return response()->json([
                'message' => "detail keranjang didapatkan",
                "data" => [
                    'id' => $keranjang->id,
                    'qty' => $keranjang->qty,
                    'alat_name' => $keranjang->alat?->name,
                    'alat_deskripsi' => $keranjang->alat?->deskripsi,
                    'alat_foto' => asset('storage/' . $keranjang->alat?->foto_alat?->foto)
                ]
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Gagal mendapatkan detail keranjang',
                'error' => $th->getMessage()
            ], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $ids = $request->input('ids', []); // default [] kalau null

        try {
            Keranjang::whereIn('id', $ids)->delete();

            return response()->json([
                'message' => "Keranjang berhasil dihapus",
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Keranjang gagal dihapus",
                'error' => $th->getMessage()
            ], 500);
        }
    }


    public function updateQty(Request $request) {
        $idKeranjang = $request->input('id');
        $newQty = $request->input('qty');

        try {
            $keranjang = Keranjang::findOrFail($idKeranjang);
            $keranjang->qty = $newQty;
            $keranjang->save();
    
            return response()->json([
                'message' => "qty berhasil ditambahkan!",
                "keranjang" => $keranjang
            ]);
        } catch (\Throwable $th) {
            abort($th->getCode(), $th->getMessage());
        }

    }
}
