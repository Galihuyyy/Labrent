<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class profile extends Model
{
    protected $table = "tr_profile",
    $hidden = ['id', 'user_id', 'kelas_id', 'jurusan_id'];
    protected $guarded = [];

    public function users() {
        return $this->belongsTo(User::class);
    }
    
    public function kelas () {
        return $this->belongsTo(Kelas::class, 'kelas_id', 'id');
    }

    public function jurusan () {
        return $this->belongsTo(Jurusan::class, 'jurusan_id', 'id');
    }

    public function transaksi () {
        return $this->hasMany(Transaksi::class, 'peminjam_id');
    }
}
