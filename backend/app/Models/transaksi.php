<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class transaksi extends Model
{
    protected $table = "transaksi", $guarded = [];
    public $timestamps = false;

    public function transaksi_details()
    {
        return $this->hasOne(transaksiDetails::class, 'transaksi_id', 'id');
    }

    public function peminjam()
    {
        return $this->belongsTo(User::class, 'peminjam_id', 'id');
    }
}
