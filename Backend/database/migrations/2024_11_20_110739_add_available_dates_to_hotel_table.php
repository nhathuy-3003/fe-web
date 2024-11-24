<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::table('hotel', function (Blueprint $table) {
        $table->date('availableFrom')->nullable()->after('locationCityId');
        $table->date('availableTo')->nullable()->after('availableFrom');
    });
}

public function down()
{
    Schema::table('hotel', function (Blueprint $table) {
        $table->dropColumn(['availableFrom', 'availableTo']);
    });
}

};
