<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LocationDistrictModel extends Model
{
    //
    protected $table = 'Location_district';
    protected $primaryKey = 'locationDistrictId';
    protected $fillable = [
        'locationDistrictId',
        'locationDistrictName',
        'locationCityId',
    ];

    public function city()
    {
        return $this->belongsTo(LocationCityModel::class, 'locationCityId', 'locationCityId');
    }

    public function hotels()
    {
        return $this->hasMany(HotelModel::class, 'locationDistrictId');
    }
}
