<?php

use App\Models\Transaksi;
use Carbon\Carbon;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');


Schedule::call(function () {
    $today = Carbon::today('Asia/Jakarta')->toDateString();

    Log::info('scheduler running - expire pending transaksi check', ['date' => $today]);

    $affected = Transaksi::where('status', 'pending')
        ->whereDate('tanggal_kembali', '<', $today)
        ->update([
            'status'     => 'expired',
        ]);

    Log::info("scheduler: transaksi expired updated", ['affected' => $affected]);
})->everyMinute();
