<?php

namespace App\Http\Controllers;

use App\Models\AmenityModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AmenityController extends Controller
{
    /**
     * Lấy danh sách tất cả tiện nghi
     */
    public function index()
    {
        $amenities = AmenityModel::all();
        return response()->json([
            'message' => 'Danh sách tiện nghi',
            'data' => $amenities
        ], 200);
    }

    /**
     * Thêm tiện nghi mới
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'AmenityName' => 'required|string|max:100',
            'AmenityIcon' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Chấp nhận file ảnh tối đa 2MB
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Thêm tiện nghi thất bại',
                'errors' => $validator->messages(),
            ], 422);
        }

        $amenityData = ['AmenityName' => $request->AmenityName];

        // Xử lý upload file nếu có
        if ($request->hasFile('AmenityIcon')) {
            $file = $request->file('AmenityIcon');
            $filePath = $file->store('amenity_icons', 'public'); // Lưu trong thư mục storage/app/public/amenity_icons
            $amenityData['AmenityIcon'] = $filePath;
        }

        $amenity = AmenityModel::create($amenityData);

        return response()->json([
            'message' => 'Thêm tiện nghi thành công',
            'data' => $amenity
        ], 201);
    }

    /**
     * Cập nhật tiện nghi
     */
    public function update(Request $request, $id)
    {
        $amenity = AmenityModel::find($id);

        if (!$amenity) {
            return response()->json(['message' => 'Tiện nghi không tồn tại'], 404);
        }

        $validator = Validator::make($request->all(), [
            'AmenityName' => 'required|string|max:100',
            'AmenityIcon' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Chấp nhận file ảnh tối đa 2MB
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Cập nhật tiện nghi thất bại',
                'errors' => $validator->messages(),
            ], 422);
        }

        $amenityData = ['AmenityName' => $request->AmenityName];

        // Xử lý upload file nếu có
        if ($request->hasFile('AmenityIcon')) {
            $file = $request->file('AmenityIcon');
            $filePath = $file->store('amenity_icons', 'public'); // Lưu trong thư mục storage/app/public/amenity_icons
            $amenityData['AmenityIcon'] = $filePath;
        }

        $amenity->update($amenityData);

        return response()->json([
            'message' => 'Cập nhật tiện nghi thành công',
            'data' => $amenity
        ], 200);
    }

    /**
     * Xóa tiện nghi
     */
    public function destroy($id)
    {
        $amenity = AmenityModel::find($id);

        if (!$amenity) {
            return response()->json(['message' => 'Tiện nghi không tồn tại'], 404);
        }

        // Xóa file icon nếu tồn tại
        if ($amenity->AmenityIcon && \Storage::disk('public')->exists($amenity->AmenityIcon)) {
            \Storage::disk('public')->delete($amenity->AmenityIcon);
        }

        $amenity->delete();

        return response()->json(['message' => 'Xóa tiện nghi thành công'], 200);
    }
}
