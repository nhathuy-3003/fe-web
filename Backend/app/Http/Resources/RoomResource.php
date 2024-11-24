<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'Id' => $this->RoomId,
            'Room Name' => $this->RoomName,
            'Hotel Id' => $this->hotel ? $this->hotel->HotelName : null,
            'Room Type' => $this->RoomType,
            'Room Status' => $this->RoomStatus,
            'Description' => $this->Description,
            'Max Customer' => $this->MaxCustomer,
            'Price' => $this->Price,
            'amenities' => $this->amenities->map(function ($amenity) {
                return [
                    'AmenityId' => $amenity->AmenityId,
                    'AmenityName' => $amenity->AmenityName,
                ];
            }),
            // 'Img Room' => $this->imageRoom->map(function ($img) {
            //     return [
            //         'Id ảnh' => $img->RoomImageId,
            //         'Url ảnh' => $img->RoomUrl,
            //         'Mô tả ảnh' => $img->RoomImageDescription,
            //     ];
            // })
        ];
    }
}
