<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomerResource;
use App\Models\CustomerModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    /**
     * Thêm khách hàng.
     */
    public function index()
    {
        //
        $booking = CustomerModel::get();
        if ($booking->isNotEmpty()) {
            return CustomerResource::collection($booking);
        } else {
            return response()->json(
                [
                    'message' => 'Không có thông tin booking'
                ],
                200
            );
        }
    }
    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                
                'CustomerName' => 'required|string|max:255',
                'CustomerPhone' => 'required|string|max:20|unique:customers,CustomerPhone',
                'CustomerAddress' => 'required|string',
                'CustomerEmail' => 'required|string|email|max:255|unique:customers,CustomerEmail',
            ],
            [
                'CustomerName.required' => 'Tên khách hàng không được để trống.',
                'CustomerPhone.required' => 'Số điện thoại không được để trống.',
                'CustomerPhone.unique' => 'Số điện thoại đã tồn tại.',
                'CustomerAddress.required' => 'Địa chỉ không được để trống.',
                'CustomerEmail.required' => 'Email không được để trống.',
                'CustomerEmail.email' => 'Email phải đúng định dạng.',
                'CustomerEmail.unique' => 'Email đã tồn tại.',
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Thêm khách hàng thất bại.',
                'errors' => $validator->messages(),
            ], 422);
        }

        // Sử dụng các trường được chỉ định để lưu
        $customer = CustomerModel::create($request->only([ 'CustomerName', 'CustomerPhone', 'CustomerAddress', 'CustomerEmail']));

        return response()->json([
            'message' => 'Thêm khách hàng thành công.',
            'data' => $customer,
        ], 201);
    }

    /**
     * Hiển thị chi tiết khách hàng.
     */
    public function show(CustomerModel $customer)
    {
        return response()->json($customer, 200);
    }

    /**
     * Cập nhật thông tin khách hàng.
     */
    public function update(Request $request, CustomerModel $customer)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'CustomerName' => 'sometimes|string|max:255',
                'CustomerPhone' => "sometimes|string|max:20|unique:customers,CustomerPhone,{$customer->id}",
                'CustomerAddress' => 'sometimes|string',
                'CustomerEmail' => "sometimes|string|email|max:255|unique:customers,CustomerEmail,{$customer->id}",
            ],
            [
                'CustomerPhone.unique' => 'Số điện thoại đã tồn tại.',
                'CustomerEmail.unique' => 'Email đã tồn tại.',
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Cập nhật thông tin thất bại.',
                'errors' => $validator->messages(),
            ], 422);
        }

        $customer->update($request->only(['CustomerName', 'CustomerPhone', 'CustomerAddress', 'CustomerEmail']));

        return response()->json([
            'message' => 'Cập nhật khách hàng thành công.',
            'data' => $customer,
        ], 200);
    }

    /**
     * Xóa khách hàng.
     */
    public function destroy(CustomerModel $customer)
    {
        $customer->delete();

        return response()->json(['message' => 'Xóa khách hàng thành công.'], 200);
    }
}
