<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alat extends Model
{
    protected $table = 'tr_alat';
    protected $guarded = [];


    public function foto_alat () {
        return $this->hasOne(FotoAlat::class, 'alat_id', 'id');
    }

    public function peminjaman () {
        return $this->hasMany(transaksi::class, 'alat_id', 'id');
    }
}
