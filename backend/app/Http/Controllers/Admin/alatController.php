<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\alat;
use App\Models\foto_alat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class alatController extends Controller
{

    private function rules()
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'deskripsi' => ['required', 'string'],
            'stok' => ['required', 'integer', 'min:1'],
            'keterangan' => ['required', 'string'],
            'foto_alat' => ['file', 'mimes:jpg,png,jpeg', 'max:2048'],
        ];
    }

    private function storeFile($file)
    {
        return $file->store('foto_alat', 'public');
    }

    private function deleteFile($path)
    {
        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }

    public function index()
    {
        $alat = Alat::with('foto_alat')->orderByDesc('created_at')->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'deskripsi' => $item->deskripsi,
                    'stok' => $item->stok,
                    'keterangan' => $item->keterangan,
                    'foto_alat' =>  asset('storage/' .  $item->foto_alat?->foto ?? ''),
                    'created_at' => $item->created_at,
                    'updated_at' => $item->updated_at,
                ];
            });

        if ($alat) {
            return response()->json([
                'message' => 'berhasil mendapatkan data alat!',
                'data' => [
                    "alat_tersedia" => $alat->where('stok', '>', 0)->values(),
                    "alat_tidak_tersedia" => $alat->where('stok', '=', 0)->values()
                ]
            ], 200);
        }

        return response()->json([
            'message' => 'gagal mendapatkan alat'
        ], 500);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate($this->rules());

        DB::beginTransaction();
        try {
            $alat = Alat::create([
                'name' => $request->name,
                'deskripsi' => $request->deskripsi,
                'stok' => $request->stok,
                'keterangan' => $request->keterangan,
            ]);

            if ($request->hasFile('foto_alat')) {
                $foto = $request->file('foto_alat');
                $path = $this->storeFile($foto);

                $alat->foto_alat()->create(['foto' => $path]);
            }
            DB::commit();

            return response()->json([
                'message' => 'Data alat berhasil disimpan',
                'data' => $alat->load('foto_alat'),
            ], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'error' => $th->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $alat = Alat::with([
            'foto_alat',
        ])->find($id);

        if (!$alat) {
            return response()->json([
                'message' => 'ID alat tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'message' => 'Data ditemukan',
            'data' => [
                'id' => $alat->id,
                'name' => $alat->name,
                'deskripsi' => $alat->deskripsi,
                'stok' => $alat->stok,
                'keterangan' => $alat->keterangan,
                'foto_alat' => asset('/storage' . '/' . $alat->foto_alat->foto),
                'created_at' => $alat->created_at,
                'updated_at' => $alat->updated_at,
            ]
        ], 200);
    }


    public function update(Request $request, string $id)
    {
        $alat = Alat::with('foto_alat')->find($id);
        if (!$alat) return response()->json(['message' => 'ID alat tidak ditemukan'], 404);

        $request->validate($this->rules());
        DB::beginTransaction();
        try {
            $alat->update($request->only(['name', 'deskripsi', 'stok', 'keterangan']));

            if ($request->hasFile('foto_alat')) {
                $this->deleteFile($alat->foto_alat->foto);

                $foto = $request->file('foto_alat');
                $path = $this->storeFile($foto);

                $foto_alat = $alat->foto_alat;
                $foto_alat->foto = $path;
                $foto_alat->save();
            }

            DB::commit();
            return response()->json([
                'message' => 'Data berhasil diperbarui',
                'data' => $alat
            ], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'error' => $th->getMessage()
            ]);
        }
    }


    public function destroy(string $id)
    {
        $alat = Alat::with('foto_alat')->find($id);
        if (!$alat) return response()->json(['message' => 'ID alat tidak ditemukan'], 404);

        try {
            $this->deleteFile($alat->foto_alat->foto);
            $alat->delete();
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage()
            ]);
        }

        return response()->json([
            'message' => 'Data alat dan fotonya berhasil dihapus'
        ], 200);
    }
}
