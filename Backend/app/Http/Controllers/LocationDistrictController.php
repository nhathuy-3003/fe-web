<?php

namespace App\Http\Controllers;

use App\Exports\DistrictHotelsExport;
use App\Http\Resources\LocationDistrictResource;
use App\Models\HotelModel;
use App\Models\LocationDistrictModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;

class LocationDistrictController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $districts = LocationDistrictModel::with('city')->get();
        if ($districts->isNotEmpty()) {
            return LocationDistrictResource::collection($districts);
        } else {
            return response()->json(
                [
                    'message' => 'Không có dữ liệu nào về quận'
                ],
                200
            );
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validator = Validator::make(
            $request->all(),
            [
                'locationDistrictName' => 'required|string|max:30',
                'locationCityId' => 'required|exists:Location_city,locationCityId'
            ],
            [
                // Custom thông báo lỗi cho từng trường và quy tắc
                'locationDistrictName.required' => 'Tên quận không được để trống.',
                'locationDistrictName.string' => 'Tên quận phải là một chuỗi ký tự.',
                'locationDistrictName.max' => 'Tên quận không được dài quá 30 ký tự.',
                'locationCityId.required' => 'ID thành phố không được để trống.',
                'locationCityId.exists' => 'ID thành phố không hợp lệ.',
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Thêm dữ liệu thất bại',
                'error' => $validator->messages(),
            ], 422);
        }

        $existingDistrict = LocationDistrictModel::where('locationDistrictName', $request->locationDistrictName)->exists();

        if ($existingDistrict) {
            return response()->json([
                'message' => 'Quận này đã tồn tại trong hệ thống.',
            ], 409);
        }

        $locationDistricts = LocationDistrictModel::create(
            [
                'locationDistrictName' => $request->locationDistrictName,
                'locationCityId' => $request->locationCityId,
            ]
        );

        return response()->json([
            'message' => 'tạo quận thành công',
            'data' => new LocationDistrictResource($locationDistricts)
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(LocationDistrictModel $locationDistrict)
    {
        //
        return new LocationDistrictResource($locationDistrict);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LocationDistrictModel $locationDistrict)
    {
        //
        $validator = Validator::make(
            $request->all(),
            [
                'locationDistrictName' => 'required|string|max:30',
                'locationCityId' => 'required|exists:Location_city,locationCityId'
            ],
            [
                // Custom thông báo lỗi cho từng trường và quy tắc
                'locationDistrictName.required' => 'Tên quận không được để trống.',
                'locationDistrictName.string' => 'Tên quận phải là một chuỗi ký tự.',
                'locationDistrictName.max' => 'Tên quận không được dài quá 30 ký tự.',
                'locationCityId.required' => 'ID thành phố không được để trống.',
                'locationCityId.exists' => 'ID thành phố không hợp lệ.',
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Cập nhật dữ liệu thất bại',
                'error' => $validator->messages(),
            ], 422);
        }

        $existingDistrict = LocationDistrictModel::where('locationDistrictName', $request->locationDistrictName)->exists();

        if ($existingDistrict) {
            return response()->json([
                'message' => 'Quận này đã tồn tại trong hệ thống.',
            ], 409);
        }

        $locationDistrict->update(
            [
                'locationDistrictName' => $request->locationDistrictName,
                'locationCityId' => $request->locationCityId,
            ]
        );

        return response()->json([
            'message' => 'Cập nhật quận thành công',
            'data' => new LocationDistrictResource($locationDistrict)
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LocationDistrictModel $locationDistrict)
    {

        $locationDistrict->delete();
        return response()->json([
            'message' => 'Đã xoá thành công quận'
        ], 200);
    }

    public function countHotels($locationDistrictId)
    {
        $district = LocationDistrictModel::withCount('hotels')->find($locationDistrictId);

        if (!$district) {
            return response()->json([
                'message' => 'Không tìm thấy quận này.'
            ], 404);
        }

        if ($district->hotels_count === 0) {
            return response()->json([
                'message' => 'Không có khách sạn nào trong quận này.'
            ], 200);
        }

        return response()->json([
            'DistrictName' => $district->locationDistrictName,
            'TotalHotels' => $district->hotels_count,
            'Hotels' => $district->hotels->map(
                function ($hotel) {
                    return [
                        'id' => $hotel->HotelId,
                        'tên khách sạn' => $hotel->HotelName,
                        'địa chỉ khách sạn' => $hotel->HotelAddress,
                        'ngày mở cửa' => $hotel->OpenDay,
                        'trạng thái' => $hotel->HotelStatus,
                        'tên quận' => $hotel->district ? $hotel->district->locationDistrictName : null,
                        'id quận' => $hotel->locationDistrictId,
                    ];
                }
            )
        ], 200);
    }

    public function exportDistrictHotels($locationDistrictId)
    {
        $hotelsCount = HotelModel::where('locationDistrictId', $locationDistrictId)->count();

        if ($hotelsCount === 0) {
            return response()->json([
                'message' => 'Không có khách sạn nào trong quận này để xuất file.'
            ], 404); // Trả về lỗi 404 hoặc thông báo tuỳ chọn
        }
        return Excel::download(new DistrictHotelsExport($locationDistrictId), 'district_hotels.xlsx');
    }
}
