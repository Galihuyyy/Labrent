<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    protected $table = "ms_kelas";

    public function profile () {
        return $this->hasMany(Profile::class, 'kelas_id');
    }
}
