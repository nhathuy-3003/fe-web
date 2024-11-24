<?php

namespace App\Http\Controllers;

use App\Http\Resources\HotelImageResource;
use App\Models\HotelImageModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class HotelImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $hotelImg = HotelImageModel::with(['hotel'])->get();
        if ($hotelImg->isNotEmpty()) {
            return HotelImageResource::collection($hotelImg);
        } else {
            return response()->json(
                [
                    'message' => 'Không có dữ liệu nào về ảnh của khách sạn'
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
        // Kiểm tra dữ liệu nhận được
        \Log::info('Request Data:', $request->all());
    
        $validator = Validator::make(
            $request->all(),
            [
                'HotelId' => 'required|exists:Hotel,HotelId',
                'ImageUrl.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
                'HotelImageDescription.*' => 'required|string|max:255',
            ],
            [
                'ImageUrl.*.required' => 'Ảnh khách sạn không được để trống.',
                'ImageUrl.*.image' => 'Tệp phải là hình ảnh.',
                'HotelImageDescription.*.required' => 'Mô tả không được để trống.',
                'HotelImageDescription.*.string' => 'Mô tả phải là chuỗi ký tự.',
            ]
        );
    
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Thêm dữ liệu thất bại',
                'errors' => $validator->errors(),
            ], 422);
        }
    
        // Lấy danh sách hình ảnh và mô tả
        $imageFiles = $request->file('ImageUrl');
        $descriptions = $request->input('HotelImageDescription');
    
        // Kiểm tra xem số lượng ảnh và mô tả có khớp nhau không
        if (count($imageFiles) !== count($descriptions)) {
            return response()->json([
                'message' => 'Số lượng ảnh và mô tả không khớp.',
            ], 400);
        }
    
        // Lưu từng hình ảnh vào database
        try {
            foreach ($imageFiles as $index => $file) {
                $path = $file->store('hotel_images', 'public');
    
                HotelImageModel::create([
                    'HotelId' => $request->HotelId,
                    'ImageUrl' => $path,
                    'HotelImageDescription' => $descriptions[$index] ?? 'Không có mô tả',
                ]);
            }
    
            return response()->json([
                'message' => 'Thêm ảnh thành công!',
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Error saving images:', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Lỗi server khi lưu ảnh.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
    /**
     * Display the specified resource.
     */
    public function show(HotelImageModel $hotelImg)
    {
        //
        return new HotelImageResource($hotelImg);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Tìm hình ảnh theo ID
        $hotelImage = HotelImageModel::find($id);
        
        if (!$hotelImage) {
            return response()->json([
                'message' => 'Không tìm thấy hình ảnh.'
            ], 404);
        }
        
        // Validate dữ liệu
        $validator = Validator::make($request->all(), [
            'HotelImageDescription' => 'required|string|max:255',
        ], [
            'HotelImageDescription.required' => 'Mô tả không được để trống.',
            'HotelImageDescription.string' => 'Mô tả phải là chuỗi ký tự.',
            'HotelImageDescription.max' => 'Mô tả không được dài quá 255 ký tự.',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Dữ liệu không hợp lệ.',
                'errors' => $validator->errors(),
            ], 422);
        }
        
        // Cập nhật mô tả
        try {
            $hotelImage->HotelImageDescription = $request->HotelImageDescription;
            $hotelImage->save();
            
            return response()->json([
                'message' => 'Cập nhật mô tả thành công.',
                'data' => $hotelImage,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Lỗi khi cập nhật mô tả.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HotelImageModel $hotelImg)
    {
        //
        $imgPath = $hotelImg->ImageUrl;

        // dd($imgPath);

        if (Storage::disk('public')->exists($imgPath)) {
            Storage::disk('public')->delete($imgPath);
        }

        $hotelImg->delete();

        return response()->json([
            'message' => 'Ảnh đã được xoá thành công.'
        ], 200);
    }
    public function getHotelImages($hotelId)
    {
        // Lấy danh sách hình ảnh từ bảng hotelImg dựa vào HotelId
        $images = HotelImageModel::where('HotelId', $hotelId)->get();
    
        if ($images->isEmpty()) {
            return response()->json([
                'message' => 'Không tìm thấy hình ảnh nào cho khách sạn này.'
            ], 404);
        }
    
        // Trả về danh sách hình ảnh
        return response()->json($images, 200);
    }
    

}
