<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
        $exceptions->render(function (NotFoundHttpException $e, Request $request) {
            if ($request->is('api/locationDistrict/*')) {
                return response()->json([
                    'message' => 'Không tìm thấy chi tiết quận.'
                ], 404);
            } elseif ($request->is('api/locationCity/*')) {
                return response()->json([
                    'message' => 'Không tìm thấy chi tiết thành phố.'
                ], 404);
            } elseif ($request->is('api/hotel/*')) {
                return response()->json([
                    'message' => 'Không tìm thấy chi tiết khách sạn.'
                ], 404);
            } elseif ($request->is('api/hotelImg/*')) {
                return response()->json([
                    'message' => 'Không tìm thấy ảnh chi tiết của khách sạn.'
                ], 404);
            } elseif ($request->is('api/room/*')) {
                return response()->json([
                    'message' => 'Không tìm chi tiết phòng ở.'
                ], 404);
            } elseif ($request->is('api/roomImg/*')) {
                return response()->json([
                    'message' => 'Không tìm thấy ảnh chi tiết của phòng ở.'
                ], 404);
            }
        });
    })->create();
