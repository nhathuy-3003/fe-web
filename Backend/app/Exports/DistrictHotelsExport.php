<?php

namespace App\Exports;

use App\Models\HotelModel;
use App\Models\LocationDistrictModel;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class DistrictHotelsExport implements FromCollection, WithHeadings, WithMapping
{
    protected $locationDistrictId;

    public function __construct($locationDistrictId)
    {
        $this->locationDistrictId = $locationDistrictId;
    }
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return HotelModel::with('district')
            ->where('locationDistrictId', $this->locationDistrictId)
            ->get();
    }

    public function headings(): array
    {
        return [
            'Tên khách sạn',
            'Địa chỉ khách sạn',
            'Trạng thái',
            'Ngày mở cửa',
            'Quận',
        ];
    }

    public function map($hotel): array
    {
        return [
            $hotel->HotelName,
            $hotel->HotelAddress,
            $hotel->HotelStatus ? 'Mở' : 'Đóng cửa',
            $hotel->OpenDay,
            $hotel->district->locationDistrictName,
        ];
    }
}
