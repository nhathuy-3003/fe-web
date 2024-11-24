<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerModel extends Model
{
    protected $table = 'customers';
    protected $primaryKey = 'CustomerId';
    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'CustomerName',
        'CustomerPhone',
        'CustomerEmail',
        'CustomerAddress',
    ];

    public function bookings()
    {
        return $this->hasMany(BookingModel::class, 'CustomerId', 'CustomerId');
    }
}
