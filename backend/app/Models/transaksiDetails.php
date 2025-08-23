<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class transaksiDetails extends Model
{
    protected $table = 'transaksi_details';
    protected $guarded = [];

    public function alat () {
        return $this->belongsTo(alat::class, 'alat_id');
    }

    public function transaksi () {
        return $this->belongsTo(transaksi::class, 'transaksi_id');
    }

}
