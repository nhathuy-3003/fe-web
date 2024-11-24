<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomImageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->RoomImageId,
            'RoomName' => $this->room->RoomName,
            'UrlImg' => $this->RoomImageUrl,
            'Description' => $this->RoomImageDescription,
        ];
    }
}
