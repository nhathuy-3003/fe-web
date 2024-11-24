<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'Id' => $this->UserId,
            'UserName' => $this->UserName,
            'FullName' => $this->FullName,
            'Password' => $this->Password,
            'UserStatus' => $this->UserStatus,
            'Role' => $this->Role,
            'HotelName' => $this->hotel ? $this->hotel->HotelName : null,
            'HotelId' => $this->hotel ? $this->hotel->HotelId : null,
        ];
    }
}
