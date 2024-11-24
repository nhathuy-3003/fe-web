<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoomImageResource;
use App\Http\Resources\RoomResource;
use App\Models\RoomImageModel;
use App\Models\RoomModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class RoomImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $roomImg = RoomImageModel::with(['room'])->get();
        if ($roomImg->isNotEmpty()) {
            return RoomImageResource::collection($roomImg);
        } else {
            return response()->json(
                [
                    'message' => 'Không có dữ liệu nào về ảnh phòng.'
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
        $validator = Validator::make(
            $request->all(),
            [
                'RoomId' => 'required|exists:Room,RoomId',
                'RoomImageUrl' => 'required', // Yêu cầu có RoomImageUrl
                'RoomImageUrl.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Hỗ trợ mảng ảnh
                'RoomImageDescription' => 'nullable', // Mô tả không bắt buộc
                'RoomImageDescription.*' => 'nullable|string|max:255', // Mô tả cho từng ảnh nếu là mảng
            ],
            [
                'RoomImageUrl.required' => 'Ảnh phòng không được để trống.',
                'RoomImageUrl.*.image' => 'Đường dẫn ảnh phải là một tệp ảnh.',
                'RoomImageUrl.*.mimes' => 'Ảnh chỉ được có định dạng jpeg, png, jpg, gif.',
                'RoomImageUrl.*.max' => 'Dung lượng ảnh không được vượt quá 2MB.',
                'RoomImageDescription.*.string' => 'Mô tả ảnh phải là một chuỗi ký tự.',
                'RoomImageDescription.*.max' => 'Mô tả ảnh không được dài quá 255 ký tự.',
                'RoomId.required' => 'ID room không được để trống.',
                'RoomId.exists' => 'ID room không tồn tại.',
            ]
        );
    
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Thêm dữ liệu thất bại',
                'error' => $validator->messages(),
            ], 422);
        }
    
        // Xử lý mảng ảnh và mô tả
        $roomImages = [];
        $roomImageFiles = $request->file('RoomImageUrl');
        $roomImageDescriptions = $request->RoomImageDescription;
    
        // Nếu chỉ có một ảnh, chuyển thành mảng để xử lý đồng nhất
        if (!is_array($roomImageFiles)) {
            $roomImageFiles = [$roomImageFiles];
            $roomImageDescriptions = [$roomImageDescriptions];
        }
    
        foreach ($roomImageFiles as $index => $image) {
            // Lưu ảnh vào storage
            $imagePath = $image->store('room_images', 'public');
    
            // Lưu thông tin ảnh vào database
            $roomImage = RoomImageModel::create([
                'RoomId' => $request->RoomId,
                'RoomImageUrl' => $imagePath,
                'RoomImageDescription' => $roomImageDescriptions[$index] ?? '',
            ]);
    
            $roomImages[] = new RoomImageResource($roomImage);
        }
    
        return response()->json([
            'message' => 'Thêm ảnh thành công',
            'data' => $roomImages,
        ], 201);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(RoomImageModel $roomImg)
    {
        //
        return new RoomImageResource($roomImg);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $roomImage = RoomImageModel::find($id);
        if (!$roomImage) {
            return response()->json(['message' => 'Image not found'], 404);
        }
    
        $validator = Validator::make($request->all(), [
            'RoomImageDescription' => 'nullable|string|max:255',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->messages(),
            ], 422);
        }
    
        $roomImage->update([
            'RoomImageDescription' => $request->RoomImageDescription,
        ]);
    
        return response()->json([
            'message' => 'Image description updated successfully',
            'data' => new RoomImageResource($roomImage),
        ], 200);
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RoomImageModel $roomImg)
    {
        //
        $imgPath = $roomImg->RoomImageUrl;

        // dd($imgPath);

        if (Storage::disk('public')->exists($imgPath)) {
            Storage::disk('public')->delete($imgPath);
        }

        $roomImg->delete();

        return response()->json([
            'message' => 'Ảnh đã được xoá thành công.'
        ], 200);
    }
    public function getRoomImages($roomId)
{
    // Lấy danh sách hình ảnh từ bảng RoomImage dựa vào RoomId
    $images = RoomImageModel::where('RoomId', $roomId)->get();

    if ($images->isEmpty()) {
        return response()->json([
            'message' => 'Không tìm thấy hình ảnh nào cho phòng này.'
        ], 404);
    }

    // Trả về danh sách hình ảnh
    return response()->json($images, 200);
}

}
