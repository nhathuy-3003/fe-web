<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AmenityModel extends Model
{
    protected $table = 'amenities';
    protected $primaryKey = 'AmenityId';
    protected $fillable = [
        'AmenityName',
        'AmenityIcon',
    ];

    public function hotels()
    {
        return $this->belongsToMany(HotelModel::class, 'hotel_amenities', 'AmenityId', 'HotelId');
    }
    public function rooms()
    {
        return $this->belongsToMany(RoomModel::class, 'room_amenity', 'AmenityId', 'RoomId');
    }
    

}
