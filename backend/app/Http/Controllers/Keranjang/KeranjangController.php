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
                'data' => $user->keranjang()->with(['peminjam', 'alat'])->get()
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
            return $keranjang;
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
    public function destroy(Keranjang $keranjang)
    {
        try {
            $keranjang->delete();
            return response()->json([
                'message' => "Keranjang berhasil di delete",
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Keranjang gagal di delete",
                'error' => $th->getMessage()
            ], 500);
        }
    }
}
