<?php

namespace App\Http\Controllers;

use App\Http\Resources\HotelResource;
use App\Models\HotelModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule; // Import Rule


class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = HotelModel::with(['district', 'imageHotel', 'district.city']);
    
        // Lọc theo tên thành phố
        if ($request->has('city')) {
            $cityName = $request->input('city');
            $query->whereHas('district.city', function ($q) use ($cityName) {
                $q->where('locationCityName', 'LIKE', '%' . $cityName . '%');
            });
        }
    
        // Lọc theo tên quận/huyện
        if ($request->has('district')) {
            $districtName = $request->input('district');
            $query->whereHas('district', function ($q) use ($districtName) {
                $q->where('locationDistrictName', 'LIKE', '%' . $districtName . '%');
            });
        }
    
      
        $hotels = $query->get();
    
        if ($hotels->isEmpty()) {
            return response()->json([
                'message' => 'Không tìm thấy khách sạn phù hợp',
                'data' => []
            ], 200);
        }
    
        return HotelResource::collection($hotels);
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
            'HotelName' => 'required|string|max:255',
            'HotelAddress' => 'required|string|max:255',
            'OpenDay' => 'required|date',
            'locationDistrictId' => 'required|exists:Location_district,locationDistrictId',
            'locationCityId' => 'required|exists:Location_city,locationCityId',
            'amenities' => 'nullable|array', // Danh sách tiện nghi
            'amenities.*' => 'exists:amenities,AmenityId', // Mỗi tiện nghi phải tồn tại
            ],
            [
                // Custom thông báo lỗi cho từng trường và quy tắc
                'HotelName.required' => 'Tên khách sạn không được để trống.',
                'HotelName.string' => 'Tên khách sạn phải là một chuỗi ký tự.',
                'HotelName.max' => 'Tên khách sạn không được dài quá 255 ký tự.',
                'HotelAddress.required' => 'Địa chỉ khách sạn không được để trống.',
                'HotelAddress.string' => 'Địa chỉ khách sạn phải là một chuỗi ký tự.',
                'HotelAddress.max' => 'Địa chỉ khách sạn không được dài quá 255 ký tự.',
                'OpenDay.required' => 'Phải chọn ngày mở cửa.',
                'OpenDay.date' => 'Phải là định dạng ngày tháng năm.',
                'locationCityId.required' => 'ID thành phố không được để trống.',
                'locationCityId.exists' => 'ID thành phố không hợp lệ.',
                'locationDistrictId.required' => 'ID quận không được để trống.',
                'locationDistrictId.exists' => 'ID quận không hợp lệ.',
                'AmenityIds.*.exists' => 'Tiện nghi không hợp lệ.',
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Thêm dữ liệu thất bại',
                'error' => $validator->messages(),
            ],  );
        }

       
        try {
            // Tạo khách sạn
            $hotel = HotelModel::create([
                'HotelName' => $request->HotelName,
                'HotelAddress' => $request->HotelAddress,
                'OpenDay' => $request->OpenDay,
                'locationDistrictId' => $request->locationDistrictId,
                'locationCityId' => $request->locationCityId,
            ]);
    
            // Kiểm tra ID khách sạn
            if (!$hotel->HotelId) {
                throw new \Exception("HotelId is null after creating hotel.");
            }
    
            // Gắn tiện nghi vào khách sạn nếu có
            if ($request->has('amenities')) {
                $amenityData = collect($request->amenities)->map(function ($amenityId) use ($hotel) {
                    return [
                        'HotelId' => $hotel->HotelId,
                        'AmenityId' => $amenityId,
                    ];
                })->toArray();
    
                DB::table('hotel_amenities')->insert($amenityData);
            }
    
            return response()->json([
                'message' => 'Tạo khách sạn thành công',
                'data' => $hotel,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Lỗi khi tạo khách sạn.',
                'error' => $e->getMessage(),
            ], 500);
        }
        
        if ($request->HotelName && $request->HotelName !== $hotel->HotelName) {
            $existingHotel = HotelModel::where('HotelName', $request->HotelName)
                ->where('id', '!=', $hotel->id) // Bỏ qua khách sạn hiện tại
                ->exists();
            if ($existingHotel) {
                return response()->json([
                    'message' => 'Khách sạn này đã tồn tại trong hệ thống.',
                ], 409);
            }
        }
        

}

    /**
     * Display the specified resource.
     */
    public function show(HotelModel $hotel)
    {
        //
        return new HotelResource($hotel);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HotelModel $hotel)
    {
        //
        $validator = Validator::make(
            $request->all(),
            [
                'HotelName' => [
                    'nullable', // Cho phép không gửi lên trường này
                    'string',
                    'max:255',
                    Rule::unique('hotel', 'HotelName')->ignore($hotel->HotelId, 'HotelId'),

                ],
                'HotelAddress' => 'nullable|string|max:255',
                'OpenDay' => 'nullable|date',
                'HotelStatus' => 'nullable|in:0,1',
                'locationDistrictId' => 'nullable|exists:Location_district,locationDistrictId',
                'locationCityId' => 'nullable|exists:Location_city,locationCityId',
                'AmenityIds' => 'nullable|array',
                'AmenityIds.*' => 'exists:amenities,AmenityId',
            ],
            [
                // Custom thông báo lỗi cho từng trường và quy tắc
                'HotelName.required' => 'Tên khách sạn không được để trống.',
                'HotelName.string' => 'Tên khách sạn phải là một chuỗi ký tự.',
                'HotelName.max' => 'Tên khách sạn không được dài quá 255 ký tự.',
                'HotelAddress.required' => 'Địa chỉ khách sạn không được để trống.',
                'HotelAddress.string' => 'Địa chỉ khách sạn phải là một chuỗi ký tự.',
                'HotelAddress.max' => 'Địa chỉ khách sạn không được dài quá 255 ký tự.',
                'OpenDay.required' => 'Phải chọn ngày mở cửa.',
                'OpenDay.date' => 'Phải là định dạng ngày tháng năm.',
                'HotelStatus.in' => 'Trạng thái khách sạn chỉ có thể là 0 (không hoạt động) hoặc 1 (hoạt động).',
                'locationDistrictId.required' => 'ID quận không được để trống.',
                'locationDistrictId.exists' => 'ID quận không hợp lệ.',
                 'locationCityId.required' => 'ID thành phố không được để trống.',
                'locationCityId.exists' => 'ID thành phố không hợp lệ.',
                'AmenityIds.*.exists' => 'Tiện nghi không hợp lệ.',
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Thêm dữ liệu thất bại',
                'error' => $validator->messages(),
            ], 422);
        }

        $existingHotel = HotelModel::where('HotelName', $request->HotelName)->exists();

        if ($request->HotelName && $request->HotelName !== $hotel->HotelName) {
            $existingHotel = HotelModel::where('HotelName', $request->HotelName)
            ->where('HotelId', '!=', $hotel->HotelId)
            ->exists();
        
            if ($existingHotel) {
                return response()->json([
                    'message' => 'Khách sạn này đã tồn tại trong hệ thống.',
                ], 409);
            }
        }
        
        $hotel->update(array_filter([
            'HotelName' => $request->HotelName,
            'HotelAddress' => $request->HotelAddress,
            'OpenDay' => $request->OpenDay,
            'HotelStatus' => $request->HotelStatus,
            'locationDistrictId' => $request->locationDistrictId,
            'locationCityId' => $request->locationCityId,
        ]));
        
         // Cập nhật tiện nghi
    if ($request->has('AmenityIds')) {
        $hotel->amenities()->sync($request->AmenityIds); // Cập nhật lại danh sách tiện nghi
    }

        return response()->json([
            'message' => 'tạo khách sạn thành công',
            'data' => new HotelResource($hotel->load('amenities'))
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HotelModel $hotel)
    {
        //
        $hotel->delete();
        return response()->json([
            'message' => 'Đã xoá thành công khách sạn'
        ], 200);
    }
/**
     *Tiện Nghi
     */
    public function addAmenities(Request $request, $hotelId)
{
    $hotel = HotelModel::find($hotelId);

    if (!$hotel) {
        return response()->json(['message' => 'Khách sạn không tồn tại'], 404);
    }

    $validator = Validator::make($request->all(), [
        'AmenityIds' => 'required|array',
        'AmenityIds.*' => 'exists:amenities,AmenityId',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'message' => 'Thêm tiện nghi thất bại',
            'errors' => $validator->messages(),
        ], 422);
    }

    $hotel->amenities()->syncWithoutDetaching($request->AmenityIds);

    return response()->json([
        'message' => 'Thêm tiện nghi thành công',
        'data' => $hotel->amenities
    ], 200);
}

public function removeAmenities(Request $request, $hotelId)
{
    $hotel = HotelModel::find($hotelId);

    if (!$hotel) {
        return response()->json(['message' => 'Khách sạn không tồn tại'], 404);
    }

    $validator = Validator::make($request->all(), [
        'AmenityIds' => 'required|array',
        'AmenityIds.*' => 'exists:amenities,AmenityId',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'message' => 'Xóa tiện nghi thất bại',
            'errors' => $validator->messages(),
        ], 422);
    }

    $hotel->amenities()->detach($request->AmenityIds);

    return response()->json([
        'message' => 'Xóa tiện nghi thành công',
        'data' => $hotel->amenities
    ], 200);
}

}
