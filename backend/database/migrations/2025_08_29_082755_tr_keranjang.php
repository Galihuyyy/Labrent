<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tr_keranjang', function (Blueprint $table) {
            $table->id();
            $table->foreignId('peminjam_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('alat_id')->nullable()->constrained('tr_alat')->nullOnDelete();
            $table->integer("qty");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tr_keranjang');
    }
};
