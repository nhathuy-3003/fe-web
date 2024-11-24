<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoomModel extends Model
{
    //
    protected $table = 'Room';
    protected $primaryKey = 'RoomId';
    protected $fillable = [
        'RoomName',
        'HotelId',
        'RoomType',
        'RoomStatus',
        'Description',
        'MaxCustomer',
        'Price'
    ];

    public function hotel()
    {
        return $this->belongsTo(HotelModel::class, 'HotelId', 'HotelId');
    }

    public function images()
    {
        return $this->hasMany(RoomImageModel::class, 'RoomId', 'RoomId');
    }
    public function amenities()
    {
        return $this->belongsToMany(AmenityModel::class, 'room_amenities', 'RoomId', 'AmenityId');
    }
     // Quan hệ với bảng booking
     public function bookings()
     {
         return $this->hasMany(BookingModel::class, 'RoomId', 'RoomId');
     }

}
