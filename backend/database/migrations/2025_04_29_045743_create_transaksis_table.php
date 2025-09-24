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
        Schema::create('tr_transaksi', function (Blueprint $table) {
            $table->id();
            $table->string('transaksi_code')->nullable();
            $table->foreignId("peminjam_id")->constrained('tr_profile')->onDelete('cascade')->onUpdate('cascade');
            $table->string("nama_peminjam");
            $table->date('tanggal_pinjam');
            $table->date('tanggal_kembali')->nullable();
            $table->enum('status', ['dipinjam','dikembalikan', 'ditolak', 'pending', 'expired']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tr_transaksi');
    }
};
