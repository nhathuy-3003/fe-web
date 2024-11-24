<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class UserModel extends Authenticatable
{
    //
    use Notifiable, HasApiTokens;

    protected $table = 'user';
    protected $primaryKey = 'UserId';
    protected $fillable = ['HotelId', 'UserName', 'FullName', 'UserStatus', 'Role', 'Password'];
    protected $hidden = ['Password'];
    protected $casts = [
        'Role' => 'string', // Enum
    ];
    
    public function hasPassword($value)
    {
        $this->attributes['Password'] = bcrypt($value);
    }

    public function hotel()
    {
        return $this->belongsTo(HotelModel::class, 'HotelId', 'HotelId');
    }
}
