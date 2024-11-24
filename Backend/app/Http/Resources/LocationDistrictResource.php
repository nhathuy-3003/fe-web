<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LocationDistrictResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->locationDistrictId,
            'tên quận' => $this->locationDistrictName,
            'tên thành phố' => $this->city ? $this->city->locationCityName : null,
        ];
    }
}
