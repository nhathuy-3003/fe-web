<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LocationCityModel extends Model
{
    //
    protected $table = 'Location_city';
    protected $primaryKey = 'locationCityId';
    protected $fillable = [
        'locationCityId',
        'locationCityName'
    ];

    public function district()
    {
        return $this->hasMany(LocationDistrictModel::class, 'locationCityId', 'locationCityId');
    }
}
