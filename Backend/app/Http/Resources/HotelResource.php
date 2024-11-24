<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HotelResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->HotelId,
            'tên khách sạn' => $this->HotelName,
            'địa chỉ khách sạn' => $this->HotelAddress,
            'ngày mở cửa' => $this->OpenDay,
            'trạng thái' => $this->HotelStatus,
            'tên quận' => $this->district ? $this->district->locationDistrictName : null,
            'id quận' => $this->locationDistrictId,
            'tên thành phố' =>  $this->district->city->locationCityName,
            'ảnh' => $this->imageHotel->map(function ($img) {
                return [
                    'Id ảnh' => $img->HotelImageId,
                    'Url ảnh' => $img->ImageUrl,
                    'Mô tả ảnh' => $img->HotelImageDescription,
                ];
                
            }),
            'amenities' => $this->amenities->map(function ($amenity) {
            return [
                'AmenityId' => $amenity->AmenityId,
                'AmenityName' => $amenity->AmenityName,
                'AmenityIcon' => $amenity->AmenityIcon,
            ];
        })
            
        ];
    }
}
