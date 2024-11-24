<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('booking', function (Blueprint $table) {
            // Kiểm tra và chỉ xóa cột nếu nó tồn tại
            if (Schema::hasColumn('booking', 'UserId')) {
                $table->dropColumn('UserId');
            }
        });
    }

    public function down()
    {
        Schema::table('booking', function (Blueprint $table) {
            // Thêm lại cột UserId nếu cần thiết (có thể để nullable)
            $table->unsignedBigInteger('UserId')->nullable();
        });
    }
};
