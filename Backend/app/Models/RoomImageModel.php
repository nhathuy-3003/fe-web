<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoomImageModel extends Model
{
    //
    protected $table = 'RoomImage';
    protected $primaryKey = 'RoomImageId';
    protected $fillable = [
        'RoomId',
        'RoomImageUrl',
        'RoomImageDescription',
    ];

    public function room()
    {
        return $this->belongsTo(RoomModel::class, 'RoomId', 'RoomId');
    }
    
}
