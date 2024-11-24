<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HotelModel extends Model
{
    //
    protected $table = 'Hotel';
    protected $primaryKey = 'HotelId';
    protected $fillable = [
        'HotelName',
        'HotelAddress',
        'OpenDay',
        'HotelStatus',
        'locationDistrictId',
        'locationCityId', // Thêm locationCityId vào fillable
    ];

    public function district()
    {
        return $this->belongsTo(LocationDistrictModel::class, 'locationDistrictId', 'locationDistrictId');
    }

    public function city()
    {
        return $this->belongsTo(LocationCityModel::class, 'locationCityId', 'locationCityId'); // Sửa để tạo mối quan hệ trực tiếp với thành phố
    }

    public function imageHotel()
    {
        return $this->hasMany(HotelImageModel::class, 'HotelId', 'HotelId');
    }
    public function amenities()
    {
        return $this->belongsToMany(AmenityModel::class, 'hotel_amenities', 'HotelId', 'AmenityId');
    }
      // Quan hệ với booking
      public function bookings()
      {
          return $this->hasMany(BookingModel::class, 'HotelId', 'HotelId');
      }

    
}
