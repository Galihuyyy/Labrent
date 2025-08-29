<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Keranjang extends Model
{
    protected $table = 'tr_keranjang';

    public function peminjam() {
        return $this->belongsTo(User::class, 'peminjam_id', 'id');
    }

    public function alat() {
        return $this->belongsTo(Alat::class, 'alat_id', 'id');
    }

}
