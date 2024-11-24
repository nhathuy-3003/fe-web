-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:8889
-- Thời gian đã tạo: Th10 03, 2024 lúc 07:52 AM
-- Phiên bản máy phục vụ: 8.0.35
-- Phiên bản PHP: 8.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `ikiZawa`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Booking`
--

CREATE TABLE `Booking` (
  `BookingId` int NOT NULL,
  `UserId` int NOT NULL,
  `CusomterId` int NOT NULL,
  `HotelId` int NOT NULL,
  `OrderDate` datetime NOT NULL COMMENT 'Ngày khách đặt phòng',
  `DateIn` date NOT NULL COMMENT 'Ngày bắt đầu ở',
  `DateOut` date NOT NULL COMMENT 'Ngày trả phòng',
  `BookingOrderType` varchar(30) NOT NULL COMMENT 'kiểu đặt phòng như đặt trực tiếp hay qua tổng đài',
  `BookingPaymentMethod` varchar(30) NOT NULL COMMENT 'Phương thức thanh toán',
  `BookingTotalAmount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT 'Tổng giá trị của đơn đặt này ',
  `BookingPaidAmount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT 'Số tiền khách đặt cọc/thanh toán(trước hoặc sau khi trả phòng)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `BookingDetail`
--

CREATE TABLE `BookingDetail` (
  `BookingDetailId` int NOT NULL,
  `BookingId` int NOT NULL,
  `RoomId` int NOT NULL,
  `BookingService` varchar(256) NOT NULL COMMENT 'Dịch vụ cung cấp',
  `BookingPrice` decimal(10,2) NOT NULL DEFAULT '0.00',
  `BookingQty` int NOT NULL DEFAULT '0' COMMENT 'Số ngày khách ở',
  `BookingTotalAmount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT 'Tổng tiền booking, được tính bằng Price nhân với Qty',
  `BookingSpecialNote` varchar(500) NOT NULL COMMENT 'Từng phòng có lưu ý gì không'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Customer`
--

CREATE TABLE `Customer` (
  `CustomerId` int NOT NULL,
  `CustomerName` varchar(255) NOT NULL,
  `CusomterPhone` varchar(11) NOT NULL,
  `CustomerType` varchar(15) NOT NULL COMMENT 'Kiểu khách hàng như: Vip, thường',
  `CustomerAddress` varchar(256) NOT NULL,
  `CustomerEmail` varchar(50) NOT NULL,
  `CustomerNote` varchar(255) DEFAULT NULL COMMENT 'Ghi chú thêm về khách hàng',
  `CustomerSpecInfo` varchar(255) DEFAULT NULL COMMENT 'Ghi chú đặc biệt về khách hàng'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Hotel`
--

CREATE TABLE `Hotel` (
  `HotelId` int NOT NULL,
  `HotelName` varchar(255) NOT NULL,
  `HotelAddress` varchar(255) NOT NULL,
  `OpenDay` date NOT NULL,
  `HotelStatus` bit(1) NOT NULL DEFAULT b'1' COMMENT '1 là còn hoạt động, 0 là đóng cửa',
  `locationDistrictId` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `Hotel`
--

INSERT INTO `Hotel` (`HotelId`, `HotelName`, `HotelAddress`, `OpenDay`, `HotelStatus`, `locationDistrictId`, `created_at`, `updated_at`) VALUES
(1, 'Khách Sạn Trà My 1', '39 Phan Xích Long', '2024-10-09', b'1', 17, NULL, NULL),
(2, 'Khách Sạn Lý Quốc Sư', '108-156-210 Võ Chí Công, Xuân La', '2020-10-20', b'1', 21, NULL, NULL),
(3, 'Khách sạn A', '872 đường số 20', '2024-10-04', b'1', 15, NULL, NULL),
(4, 'Khách sạn B', '872 đường số 22', '2024-10-23', b'1', 22, NULL, NULL),
(6, 'Khách Sạn Thiên Đường Đã Fix', '22/5 quốc lộ 10', '2024-11-01', b'0', 5, '2024-11-01 12:29:15', '2024-11-01 12:41:03');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `HotelImage`
--

CREATE TABLE `HotelImage` (
  `HotelImageId` int NOT NULL,
  `HotelId` int NOT NULL,
  `ImageUrl` varchar(255) NOT NULL,
  `HotelImageDescription` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Location_city`
--

CREATE TABLE `Location_city` (
  `locationCityId` int NOT NULL,
  `locationCityName` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `Location_city`
--

INSERT INTO `Location_city` (`locationCityId`, `locationCityName`, `created_at`, `updated_at`) VALUES
(1, 'An Giang', NULL, NULL),
(2, 'Bà Rịa - Vũng Tàu', NULL, NULL),
(3, 'Bắc Giang', NULL, NULL),
(4, 'Bắc Kạn', NULL, NULL),
(5, 'Bạc Liêu', NULL, NULL),
(6, 'Bắc Ninh', NULL, NULL),
(7, 'Bến Tre', NULL, NULL),
(8, 'Bình Định', NULL, NULL),
(9, 'Bình Dương', NULL, NULL),
(10, 'Bình Phước', NULL, NULL),
(11, 'Bình Thuận', NULL, NULL),
(12, 'Cà Mau', NULL, NULL),
(13, 'Cần Thơ', NULL, NULL),
(14, 'Cao Bằng', NULL, NULL),
(15, 'Đà Nẵng', NULL, NULL),
(16, 'Đắk Lắk', NULL, NULL),
(17, 'Đắk Nông', NULL, NULL),
(18, 'Điện Biên', NULL, NULL),
(19, 'Đồng Nai', NULL, NULL),
(20, 'Đồng Tháp', NULL, NULL),
(21, 'Gia Lai', NULL, NULL),
(22, 'Hà Giang', NULL, NULL),
(23, 'Hà Nam', NULL, NULL),
(24, 'Hà Nội', NULL, NULL),
(25, 'Hà Tĩnh', NULL, NULL),
(26, 'Hải Dương', NULL, NULL),
(27, 'Hải Phòng', NULL, NULL),
(28, 'Hậu Giang', NULL, NULL),
(29, 'Hòa Bình', NULL, NULL),
(30, 'Hưng Yên', NULL, NULL),
(31, 'Khánh Hòa', NULL, NULL),
(32, 'Kiên Giang', NULL, NULL),
(33, 'Kon Tum', NULL, NULL),
(34, 'Lai Châu', NULL, NULL),
(35, 'Lâm Đồng', NULL, NULL),
(36, 'Lạng Sơn', NULL, NULL),
(37, 'Lào Cai', NULL, NULL),
(38, 'Long An', NULL, NULL),
(39, 'Nam Định', NULL, NULL),
(40, 'Nghệ An', NULL, NULL),
(41, 'Ninh Bình', NULL, NULL),
(42, 'Ninh Thuận', NULL, NULL),
(43, 'Phú Thọ', NULL, NULL),
(44, 'Phú Yên', NULL, NULL),
(45, 'Quảng Bình', NULL, NULL),
(46, 'Quảng Nam', NULL, NULL),
(47, 'Quảng Ngãi', NULL, NULL),
(48, 'Quảng Ninh', NULL, NULL),
(49, 'Quảng Trị', NULL, NULL),
(50, 'Sóc Trăng', NULL, NULL),
(51, 'Sơn La', NULL, NULL),
(52, 'Tây Ninh', NULL, NULL),
(53, 'Thái Bình', NULL, NULL),
(54, 'Thái Nguyên', NULL, NULL),
(55, 'Thanh Hóa', NULL, NULL),
(56, 'Thừa Thiên Huế', NULL, NULL),
(57, 'Tiền Giang', NULL, NULL),
(58, 'TP Hồ Chí Minh', NULL, NULL),
(59, 'Trà Vinh', NULL, NULL),
(60, 'Tuyên Quang', NULL, NULL),
(61, 'Vĩnh Long', NULL, NULL),
(62, 'Vĩnh Phúc', NULL, NULL),
(63, 'Yên Bái', NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Location_district`
--

CREATE TABLE `Location_district` (
  `locationDistrictId` int NOT NULL,
  `locationDistrictName` varchar(50) NOT NULL,
  `locationCityId` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `Location_district`
--

INSERT INTO `Location_district` (`locationDistrictId`, `locationDistrictName`, `locationCityId`, `created_at`, `updated_at`) VALUES
(1, 'Quận 1', 58, NULL, NULL),
(2, 'Quận 2', 58, NULL, NULL),
(3, 'Quận 3', 58, NULL, NULL),
(4, 'Quận 4', 58, NULL, NULL),
(5, 'Quận 5', 58, NULL, NULL),
(6, 'Quận 6', 58, NULL, NULL),
(7, 'Quận 7', 58, NULL, NULL),
(8, 'Quận 8', 58, NULL, NULL),
(9, 'Quận 9', 58, NULL, NULL),
(10, 'Quận 10', 58, NULL, NULL),
(11, 'Quận 11', 58, NULL, NULL),
(12, 'Quận 12', 58, NULL, NULL),
(13, 'Quận Tân Bình', 58, NULL, NULL),
(14, 'Quận Tân Phú', 58, NULL, NULL),
(15, 'Quận Gò Vấp', 58, NULL, NULL),
(16, 'Quận Bình Tân', 58, NULL, NULL),
(17, 'Quận Phú Nhuận', 58, NULL, NULL),
(18, 'Ba Đình', 24, NULL, NULL),
(19, 'Cầu Giấy', 24, NULL, NULL),
(20, 'Đống Đa', 24, NULL, NULL),
(21, 'Hai Bà Trưng', 24, NULL, NULL),
(22, 'Hoàn Kiếm', 24, NULL, NULL),
(23, 'Thanh Xuân', 24, NULL, NULL),
(24, 'Hoàng Mai', 24, NULL, NULL),
(25, 'Long Biên', 24, NULL, NULL),
(26, 'Hà Đông', 24, NULL, NULL),
(27, 'Tây Hồ', 24, NULL, NULL),
(28, 'Nam Từ Liêm', 24, NULL, NULL),
(29, 'Bắc Từ Liêm', 24, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2024_10_27_073657_create_sessions_table', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Permission`
--

CREATE TABLE `Permission` (
  `PermissionId` int NOT NULL,
  `PermissionName` varchar(30) NOT NULL COMMENT 'Mã quyền',
  `PermissionNote` varchar(500) NOT NULL COMMENT 'Mô tả quyền dùng để làm gì, ai cần quyền này'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Room`
--

CREATE TABLE `Room` (
  `RoomId` int NOT NULL,
  `RoomName` varchar(64) NOT NULL,
  `HotelId` int NOT NULL,
  `RoomType` varchar(30) NOT NULL COMMENT 'Kiểu phòng VD: Phòng Vip, Đơn, Đôi',
  `RoomStatus` varchar(30) NOT NULL COMMENT 'Trạng thái phòng như: Trống, Đã Đặt, Đang sử dụng, dọn dẹp, bảo trì',
  `Description` text NOT NULL COMMENT 'Mô tả phòng',
  `MaxCustomer` int NOT NULL DEFAULT '1' COMMENT 'Số khách tối đa trong 1 phòng',
  `Price` decimal(10,2) NOT NULL DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `Room`
--

INSERT INTO `Room` (`RoomId`, `RoomName`, `HotelId`, `RoomType`, `RoomStatus`, `Description`, `MaxCustomer`, `Price`) VALUES
(1, '101', 1, 'Phòng 2 người', 'Trống', 'Phòng 101 được thiết kế sang trọng ấm cúng sang trọng và đầy đủ tiện nghi, tầm nhìn thoáng khiến bạn cảm thấy dễ chịu thoải mái như ở nhà.\nTầm nhìn: Đẹp, thoáng                           \nDiện tích phòng: 25m2       \nLoại giường: 1 giường đôi                              \nCác thiết bị theo phòng:\n+ Trang thiết bị hiện đại\n+ Điều hòa 2 chiều\n+ Giường với thiết kế vải đệm mềm và mượt\n+ Thảm trải phòng                        \n+ Rèm cửa 2 lớp\n+ Tủ quần áo\n+ Bàn tiếp khách\n+ Bàn làm việc – gương trang điểm\n+ Giá để hành lý\n+ Tủ đầu giường\n+ Tủ lạnh\n+ Tivi LCD Sony 32 inchs \n+ Dịch vụ điện thoại trong nước và quốc tế\n+ Dịch vụ  wifi trong phòng miễn phí\n+ Phòng tắm rộng\n+ Buồng tắm riêng biệt và cây sen đứng\n+ Tiện nghi đồ dùng phòng tắm theo phong cách Hoa Đào\n+ Máy sấy tóc\n+ Bảng nội quy và hướng dẫn sử dụng thiết bị và dịch vụ\n', 2, 200000.00),
(2, '102', 1, 'Phòng 2 người', 'Trống', 'Phòng 102 được thiết kế sang trọng ấm cúng sang trọng và đầy đủ tiện nghi, tầm nhìn thoáng khiến bạn cảm thấy dễ chịu thoải mái như ở nhà.\r\nTầm nhìn: Đẹp, thoáng                           \r\nDiện tích phòng: 25m2       \r\nLoại giường: 1 giường đôi                              \r\nCác thiết bị theo phòng:\r\n+ Trang thiết bị hiện đại\r\n+ Điều hòa 2 chiều\r\n+ Giường với thiết kế vải đệm mềm và mượt\r\n+ Thảm trải phòng                        \r\n+ Rèm cửa 2 lớp\r\n+ Tủ quần áo\r\n+ Bàn tiếp khách\r\n+ Bàn làm việc – gương trang điểm\r\n+ Giá để hành lý\r\n+ Tủ đầu giường\r\n+ Tủ lạnh\r\n+ Tivi LCD Sony 32 inchs \r\n+ Dịch vụ điện thoại trong nước và quốc tế\r\n+ Dịch vụ  wifi trong phòng miễn phí\r\n+ Phòng tắm rộng\r\n+ Buồng tắm riêng biệt và cây sen đứng\r\n+ Tiện nghi đồ dùng phòng tắm theo phong cách Hoa Đào\r\n+ Máy sấy tóc\r\n+ Bảng nội quy và hướng dẫn sử dụng thiết bị và dịch vụ\r\n', 2, 200000.00),
(3, '103', 1, 'Phòng 2 người', 'Trống', 'Phòng 103 được thiết kế sang trọng ấm cúng sang trọng và đầy đủ tiện nghi, tầm nhìn thoáng khiến bạn cảm thấy dễ chịu thoải mái như ở nhà.\r\nTầm nhìn: Đẹp, thoáng                           \r\nDiện tích phòng: 25m2       \r\nLoại giường: 1 giường đôi                              \r\nCác thiết bị theo phòng:\r\n+ Trang thiết bị hiện đại\r\n+ Điều hòa 2 chiều\r\n+ Giường với thiết kế vải đệm mềm và mượt\r\n+ Thảm trải phòng                        \r\n+ Rèm cửa 2 lớp\r\n+ Tủ quần áo\r\n+ Bàn tiếp khách\r\n+ Bàn làm việc – gương trang điểm\r\n+ Giá để hành lý\r\n+ Tủ đầu giường\r\n+ Tủ lạnh\r\n+ Tivi LCD Sony 32 inchs \r\n+ Dịch vụ điện thoại trong nước và quốc tế\r\n+ Dịch vụ  wifi trong phòng miễn phí\r\n+ Phòng tắm rộng\r\n+ Buồng tắm riêng biệt và cây sen đứng\r\n+ Tiện nghi đồ dùng phòng tắm theo phong cách Hoa Đào\r\n+ Máy sấy tóc\r\n+ Bảng nội quy và hướng dẫn sử dụng thiết bị và dịch vụ\r\n', 2, 200000.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `RoomImage`
--

CREATE TABLE `RoomImage` (
  `RoomImageId` int NOT NULL,
  `RoomId` int NOT NULL,
  `RoomImageUrl` varchar(255) NOT NULL,
  `RoomImageDescription` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('ed8R7RW9TTlKNsBihNCTCXWJaubTJ54GM61irppQ', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRDdweFZlTFhPektpNE9nZUdlVERiMHFHRTNETGtaSWJWcFVpU2pYZiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1730045877),
('lgDHnpG1GD0Q6Gqu235P9EE7E8BOFUeqLMpwJT6e', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicjV5eUU5bjBqNGlqQ05VcmdLaDdWTmx5Q2w2eGdQdXEyS1RHbFBVOSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1730016515),
('Xgu6BxroRbsK9Ucn7yfEfD9B2UHPOf1mioTaQHfc', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibnZjZlc1UzJpUUxvcllRY2EwVXgxWGY0QmlFckU3UmNBTEM3azVpaSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1730353999);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `User`
--

CREATE TABLE `User` (
  `UserId` int NOT NULL,
  `HotelId` int NOT NULL,
  `UserName` varchar(15) NOT NULL COMMENT 'Mã NV',
  `FullName` varchar(30) NOT NULL COMMENT 'Họ và tên NV',
  `PassWord` varchar(25) NOT NULL,
  `UserStatus` bit(1) NOT NULL DEFAULT b'1' COMMENT '1 là đang làm việc, 0 là nghỉ việc',
  `Role` varchar(64) NOT NULL COMMENT 'Là nhân viên hay quản lý'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `UserPermission`
--

CREATE TABLE `UserPermission` (
  `UserPermissionId` int NOT NULL,
  `PermissionId` int NOT NULL,
  `UserId` int NOT NULL,
  `UserPermissionNote` varchar(500) NOT NULL COMMENT 'Ghi chú vì sao phân quyền này cho nhân viên',
  `DataCreate` datetime NOT NULL,
  `UserCreate` int NOT NULL COMMENT 'Người phân quyền này là ai'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `Booking`
--
ALTER TABLE `Booking`
  ADD PRIMARY KEY (`BookingId`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `CusomterId` (`CusomterId`),
  ADD KEY `HotelId` (`HotelId`);

--
-- Chỉ mục cho bảng `BookingDetail`
--
ALTER TABLE `BookingDetail`
  ADD PRIMARY KEY (`BookingDetailId`),
  ADD KEY `BookingId` (`BookingId`),
  ADD KEY `RoomId` (`RoomId`);

--
-- Chỉ mục cho bảng `Customer`
--
ALTER TABLE `Customer`
  ADD PRIMARY KEY (`CustomerId`);

--
-- Chỉ mục cho bảng `Hotel`
--
ALTER TABLE `Hotel`
  ADD PRIMARY KEY (`HotelId`),
  ADD KEY `locationDistrictId` (`locationDistrictId`);

--
-- Chỉ mục cho bảng `HotelImage`
--
ALTER TABLE `HotelImage`
  ADD PRIMARY KEY (`HotelImageId`),
  ADD KEY `HotelId` (`HotelId`);

--
-- Chỉ mục cho bảng `Location_city`
--
ALTER TABLE `Location_city`
  ADD PRIMARY KEY (`locationCityId`);

--
-- Chỉ mục cho bảng `Location_district`
--
ALTER TABLE `Location_district`
  ADD PRIMARY KEY (`locationDistrictId`),
  ADD KEY `locationCityId` (`locationCityId`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `Permission`
--
ALTER TABLE `Permission`
  ADD PRIMARY KEY (`PermissionId`);

--
-- Chỉ mục cho bảng `Room`
--
ALTER TABLE `Room`
  ADD PRIMARY KEY (`RoomId`),
  ADD KEY `HotelId` (`HotelId`);

--
-- Chỉ mục cho bảng `RoomImage`
--
ALTER TABLE `RoomImage`
  ADD PRIMARY KEY (`RoomImageId`),
  ADD KEY `RoomId` (`RoomId`);

--
-- Chỉ mục cho bảng `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Chỉ mục cho bảng `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`UserId`),
  ADD KEY `HotelId` (`HotelId`);

--
-- Chỉ mục cho bảng `UserPermission`
--
ALTER TABLE `UserPermission`
  ADD PRIMARY KEY (`UserPermissionId`),
  ADD KEY `PermissionId` (`PermissionId`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `UserCreate` (`UserCreate`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `Booking`
--
ALTER TABLE `Booking`
  MODIFY `BookingId` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `BookingDetail`
--
ALTER TABLE `BookingDetail`
  MODIFY `BookingDetailId` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `Customer`
--
ALTER TABLE `Customer`
  MODIFY `CustomerId` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `Hotel`
--
ALTER TABLE `Hotel`
  MODIFY `HotelId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `HotelImage`
--
ALTER TABLE `HotelImage`
  MODIFY `HotelImageId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `Location_city`
--
ALTER TABLE `Location_city`
  MODIFY `locationCityId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT cho bảng `Location_district`
--
ALTER TABLE `Location_district`
  MODIFY `locationDistrictId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `Permission`
--
ALTER TABLE `Permission`
  MODIFY `PermissionId` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `Room`
--
ALTER TABLE `Room`
  MODIFY `RoomId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `RoomImage`
--
ALTER TABLE `RoomImage`
  MODIFY `RoomImageId` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `User`
--
ALTER TABLE `User`
  MODIFY `UserId` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `UserPermission`
--
ALTER TABLE `UserPermission`
  MODIFY `UserPermissionId` int NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `Booking`
--
ALTER TABLE `Booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `User` (`UserId`),
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`CusomterId`) REFERENCES `Customer` (`CustomerId`),
  ADD CONSTRAINT `booking_ibfk_3` FOREIGN KEY (`HotelId`) REFERENCES `Hotel` (`HotelId`);

--
-- Các ràng buộc cho bảng `BookingDetail`
--
ALTER TABLE `BookingDetail`
  ADD CONSTRAINT `bookingdetail_ibfk_1` FOREIGN KEY (`BookingId`) REFERENCES `Booking` (`BookingId`),
  ADD CONSTRAINT `bookingdetail_ibfk_2` FOREIGN KEY (`RoomId`) REFERENCES `Room` (`RoomId`);

--
-- Các ràng buộc cho bảng `Hotel`
--
ALTER TABLE `Hotel`
  ADD CONSTRAINT `hotel_ibfk_1` FOREIGN KEY (`locationDistrictId`) REFERENCES `Location_district` (`locationDistrictId`);

--
-- Các ràng buộc cho bảng `HotelImage`
--
ALTER TABLE `HotelImage`
  ADD CONSTRAINT `hotelimage_ibfk_1` FOREIGN KEY (`HotelId`) REFERENCES `Hotel` (`HotelId`);

--
-- Các ràng buộc cho bảng `Location_district`
--
ALTER TABLE `Location_district`
  ADD CONSTRAINT `location_district_ibfk_1` FOREIGN KEY (`locationCityId`) REFERENCES `Location_city` (`locationCityId`);

--
-- Các ràng buộc cho bảng `Room`
--
ALTER TABLE `Room`
  ADD CONSTRAINT `room_ibfk_1` FOREIGN KEY (`HotelId`) REFERENCES `Hotel` (`HotelId`);

--
-- Các ràng buộc cho bảng `RoomImage`
--
ALTER TABLE `RoomImage`
  ADD CONSTRAINT `roomimage_ibfk_1` FOREIGN KEY (`RoomId`) REFERENCES `Room` (`RoomId`);

--
-- Các ràng buộc cho bảng `User`
--
ALTER TABLE `User`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`HotelId`) REFERENCES `Hotel` (`HotelId`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `UserPermission` (`UserId`);

--
-- Các ràng buộc cho bảng `UserPermission`
--
ALTER TABLE `UserPermission`
  ADD CONSTRAINT `userpermission_ibfk_1` FOREIGN KEY (`PermissionId`) REFERENCES `Permission` (`PermissionId`),
  ADD CONSTRAINT `userpermission_ibfk_2` FOREIGN KEY (`UserCreate`) REFERENCES `User` (`UserId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
