<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\BookingModel;
use App\Models\CustomerModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    public function index()
    {
        // Include room, customer, and hotel relationships
        $bookings = BookingModel::with(['customer', 'hotel', 'room'])->get();
    
        return response()->json([
            'message' => 'Danh sách booking:',
            'data' => $bookings,
        ], 200);
    }
    

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'CustomerName' => 'required|string|max:255',
            'CustomerPhone' => 'required|string|max:20',
            'CustomerEmail' => 'required|string|email|max:255',
            'HotelId' => 'required|exists:hotel,HotelId',
            'RoomId' => 'required|exists:room,RoomId', // RoomId là bắt buộc
            'OrderDate' => 'required|date',
            'DateIn' => 'required|date|after_or_equal:OrderDate',
            'DateOut' => 'required|date|after:DateIn',
            'BookingPaymentMethod' => 'required|string|in:momo,credit',
            'BookingTotalAmount' => 'required|numeric|min:0',
        ], [
            'HotelId.exists' => 'Khách sạn không hợp lệ.',
            'RoomId.exists' => 'Phòng không hợp lệ.',
            'OrderDate.required' => 'Ngày đặt phòng là bắt buộc.',
            'DateIn.after_or_equal' => 'Ngày nhận phòng phải sau hoặc bằng ngày đặt.',
            'DateOut.after' => 'Ngày trả phòng phải sau ngày nhận phòng.',
            'BookingTotalAmount.numeric' => 'Tổng giá trị phải là số hợp lệ.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Thêm booking thất bại.',
                'errors' => $validator->messages(),
            ], 422);
        }

        DB::beginTransaction();

        try {
            // Kiểm tra và tạo khách hàng nếu chưa tồn tại
            $customer = CustomerModel::firstOrCreate(
                [
                    'CustomerPhone' => $request->CustomerPhone,
                ],
                [
                    'CustomerName' => $request->CustomerName,
                    'CustomerEmail' => $request->CustomerEmail,
                    'CustomerAddress' => $request->CustomerAddress ?? '',
                ]
            );

            // Lưu thông tin booking
            $booking = BookingModel::create([
                'CustomerId' => $customer->CustomerId,
                'HotelId' => $request->HotelId,
                'RoomId' => $request->RoomId,
                'OrderDate' => $request->OrderDate,
                'DateIn' => $request->DateIn,
                'DateOut' => $request->DateOut,
                'BookingPaymentMethod' => $request->BookingPaymentMethod,
                'BookingTotalAmount' => $request->BookingTotalAmount,
                'BookingStatus' => 'Pending', // Trạng thái mặc định
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Thêm booking và customer thành công.',
                'data' => $booking,
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Có lỗi xảy ra khi thêm booking.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show(BookingModel $booking)
    {
        $booking->load('customer', 'hotel');
        return response()->json([
            'message' => 'Thông tin chi tiết booking:',
            'data' => $booking,
        ], 200);
    }

    public function update(Request $request, BookingModel $booking)
    {
        $validator = Validator::make($request->all(), [
            'CustomerName' => 'sometimes|string|max:255',
            'CustomerPhone' => 'sometimes|string|max:20',
            'CustomerEmail' => 'sometimes|string|email|max:255',
            'HotelId' => 'sometimes|exists:hotel,HotelId',
            'RoomId' => 'sometimes|exists:room,RoomId', // RoomId là bắt buộc
            'OrderDate' => 'sometimes|date',
            'DateIn' => 'sometimes|date|after_or_equal:OrderDate',
            'DateOut' => 'sometimes|date|after:DateIn',
            'BookingPaymentMethod' => 'sometimes|string|in:momo,credit',
            'BookingTotalAmount' => 'sometimes|numeric|min:0',
            'BookingStatus' => 'sometimes|string|in:Pending,Confirmed,Cancelled',
        ], [
            'HotelId.exists' => 'Khách sạn không hợp lệ.',
            'RoomId.exists' => 'Phòng không hợp lệ.',
            'OrderDate.required' => 'Ngày đặt phòng là bắt buộc.',
            'DateIn.after_or_equal' => 'Ngày nhận phòng phải sau hoặc bằng ngày đặt.',
            'DateOut.after' => 'Ngày trả phòng phải sau ngày nhận phòng.',
            'BookingTotalAmount.numeric' => 'Tổng giá trị phải là số hợp lệ.',
            'BookingStatus.required' => 'Trạng thái không được để trống.',
            'BookingStatus.in' => 'Trạng thái không hợp lệ.',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Cập nhật trạng thái thất bại.',
                'errors' => $validator->messages(),
            ], 422);
        }
    
        $booking->update($request->only(['BookingStatus']));
    
        return response()->json([
            'message' => 'Cập nhật trạng thái thành công.',
            'data' => $booking,
        ], 200);
    }
    
    public function destroy(BookingModel $booking)
    {
        if (!$booking) {
            return response()->json(['message' => 'Booking không tồn tại.'], 404);
        }
    
        try {
            DB::beginTransaction();
    
            // Check if the customer has other bookings
            $customer = $booking->customer;
            $booking->delete();
    
            if ($customer && $customer->bookings()->count() === 0) {
                // Delete the customer if no other bookings exist
                $customer->delete();
            }
    
            DB::commit();
            return response()->json(['message' => 'Xóa booking và khách hàng thành công.'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Có lỗi xảy ra khi xóa booking.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
}


