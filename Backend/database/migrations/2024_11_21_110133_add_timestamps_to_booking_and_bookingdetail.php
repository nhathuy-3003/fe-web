<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTimestampsToBookingAndBookingdetail extends Migration
{
    public function up()
    {
        Schema::table('booking', function (Blueprint $table) {
            $table->timestamps(); // Thêm created_at và updated_at
        });

        Schema::table('bookingdetail', function (Blueprint $table) {
            $table->timestamps(); // Thêm created_at và updated_at
        });
    }

    public function down()
    {
        Schema::table('booking', function (Blueprint $table) {
            $table->dropTimestamps();
        });

        Schema::table('bookingdetail', function (Blueprint $table) {
            $table->dropTimestamps();
        });
    }
}
