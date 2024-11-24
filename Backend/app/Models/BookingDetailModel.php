<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookingDetailModel extends Model
{
    protected $table = 'bookingdetail';
    protected $fillable = [
        'BookingId',
        'RoomId',
        'BookingService',
        'BookingQty',
        'BookingPrice',
        'BookingTotalAmount',
        'BookingSpecialNote',
    ];
    public $timestamps = false; // Tắt timestamps
}
