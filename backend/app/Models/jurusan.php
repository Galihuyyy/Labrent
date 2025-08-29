<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Jurusan extends Model
{
    protected $table = "ms_jurusan";

    public function profile () {
        return $this->hasMany(Profile::class, 'jurusan_id');
    }
}
