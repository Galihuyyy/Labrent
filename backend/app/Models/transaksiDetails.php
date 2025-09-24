<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransaksiDetails extends Model
{
    protected $table = 'tr_transaksi_details';
    protected $guarded = [];

    public function alat () {
        return $this->belongsTo(Alat::class, 'alat_id');
    }

    public function transaksi () {
        return $this->belongsTo(Transaksi::class, 'transaksi_id');
    }

}
