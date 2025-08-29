<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FotoAlat extends Model
{
    protected $table = 'tr_foto_alat';
    protected $guarded = [], $hidden = ['id', 'alat_id'];

    public function alat () {
        return $this->belongsTo(Alat::class, 'alat_id', 'id');
    }
}
