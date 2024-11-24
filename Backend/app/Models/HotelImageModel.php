<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HotelImageModel extends Model
{
    //
    protected $table = 'HotelImage';
    protected $primaryKey = 'HotelImageId';
    protected $fillable = [
        'HotelId',
        'ImageUrl',
        'HotelImageDescription',
    ];

    public function hotel()
    {
        return $this->belongsTo(HotelModel::class, 'HotelId', 'HotelId');
    }
}
