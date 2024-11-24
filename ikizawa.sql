-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 24, 2024 lúc 08:20 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `ikizawa`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `amenities`
--

CREATE TABLE `amenities` (
  `AmenityId` int(11) NOT NULL,
  `AmenityName` varchar(100) NOT NULL,
  `AmenityIcon` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `amenities`
--

INSERT INTO `amenities` (`AmenityId`, `AmenityName`, `AmenityIcon`, `created_at`, `updated_at`) VALUES
(1, 'Wifi', 'amenity_icons/3ZdrVqLAigabcuHq0vCqb9bXA50raOWSA2aUqOhv.png', '2024-11-19 11:23:21', '2024-11-19 11:23:21'),
(2, 'Wifi', 'amenity_icons/83KayJdlPTxhYX9HMvl0YGgLOT2ycRyiHTyxftE3.png', '2024-11-19 11:58:29', '2024-11-19 11:58:29');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `booking`
--

CREATE TABLE `booking` (
  `BookingId` int(11) NOT NULL,
  `CustomerId` int(11) NOT NULL,
  `HotelId` int(11) NOT NULL,
  `RoomId` int(11) NOT NULL,
  `OrderDate` datetime NOT NULL COMMENT 'Ngày đặt phòng',
  `DateIn` date NOT NULL COMMENT 'Ngày bắt đầu ở',
  `DateOut` date NOT NULL COMMENT 'Ngày trả phòng',
  `BookingPaymentMethod` enum('momo','credit') NOT NULL DEFAULT 'momo',
  `BookingTotalAmount` decimal(10,2) NOT NULL DEFAULT 0.00 COMMENT 'Tổng giá trị của booking',
  `BookingStatus` enum('Pending','Confirmed','Cancelled') NOT NULL DEFAULT 'Pending' COMMENT 'Trạng thái booking',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `booking`
--

INSERT INTO `booking` (`BookingId`, `CustomerId`, `HotelId`, `RoomId`, `OrderDate`, `DateIn`, `DateOut`, `BookingPaymentMethod`, `BookingTotalAmount`, `BookingStatus`, `created_at`, `updated_at`) VALUES
(2, 15, 33, 14, '2024-11-22 00:00:00', '2024-11-22', '2024-11-23', 'momo', 300000.00, 'Cancelled', '2024-11-22 02:46:22', '2024-11-23 07:44:51'),
(3, 16, 1, 6, '2024-11-22 00:00:00', '2024-11-23', '2024-11-29', 'momo', 1200000.00, 'Cancelled', '2024-11-22 02:51:05', '2024-11-23 07:22:12'),
(5, 21, 33, 14, '2024-11-22 00:00:00', '2024-11-22', '2024-11-29', 'momo', 2100000.00, 'Pending', '2024-11-22 02:55:53', '2024-11-22 02:55:53');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comment`
--

CREATE TABLE `comment` (
  `CommentId` int(11) NOT NULL,
  `HotelId` int(11) NOT NULL,
  `CustomerName` varchar(25) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Content` text NOT NULL,
  `Display` bit(1) NOT NULL DEFAULT b'0' COMMENT '0 là không hiển thị, 1 là hiển thị bình luận',
  `Rating` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `comment`
--

INSERT INTO `comment` (`CommentId`, `HotelId`, `CustomerName`, `Email`, `Content`, `Display`, `Rating`) VALUES
(1, 6, '', 'baokhuong6996@gmail.com', 'khách sạm này vip quá', b'0', 5),
(2, 3, '', 'baokhuong6996@gmail.com', 'dm như l*', b'0', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customers`
--

CREATE TABLE `customers` (
  `CustomerId` int(11) NOT NULL,
  `CustomerName` varchar(255) NOT NULL,
  `CustomerPhone` varchar(15) NOT NULL,
  `CustomerEmail` varchar(255) NOT NULL,
  `CustomerAddress` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `customers`
--

INSERT INTO `customers` (`CustomerId`, `CustomerName`, `CustomerPhone`, `CustomerEmail`, `CustomerAddress`, `created_at`, `updated_at`) VALUES
(15, '24112412', '12412421', '412412@gmail.com', '', '2024-11-22 02:46:22', '2024-11-22 02:46:22'),
(16, 'Nhật Huy', '0798800959', 'huyladay123@gmail.com', '', '2024-11-22 02:51:05', '2024-11-22 02:51:05'),
(21, 'nhậth uy', '312412512', '12312@gmail.com', '', '2024-11-22 02:55:53', '2024-11-22 02:55:53');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hotel`
--

CREATE TABLE `hotel` (
  `HotelId` int(11) NOT NULL,
  `HotelName` varchar(255) NOT NULL,
  `HotelAddress` varchar(255) NOT NULL,
  `OpenDay` date NOT NULL,
  `HotelStatus` bit(1) NOT NULL DEFAULT b'1' COMMENT '1 là còn hoạt động, 0 là đóng cửa',
  `locationDistrictId` int(11) NOT NULL,
  `locationCityId` int(11) DEFAULT NULL,
  `availableFrom` date DEFAULT NULL,
  `availableTo` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `hotel`
--

INSERT INTO `hotel` (`HotelId`, `HotelName`, `HotelAddress`, `OpenDay`, `HotelStatus`, `locationDistrictId`, `locationCityId`, `availableFrom`, `availableTo`, `created_at`, `updated_at`) VALUES
(1, 'Khách Sạn Trà My', '39 Phan Xích Long', '2024-10-09', b'1', 17, 58, NULL, NULL, NULL, '2024-11-23 07:59:47'),
(2, 'Khách Sạn Lý Quốc Sư', '108-156-210 Võ Chí Công, Xuân La', '2020-10-20', b'1', 21, 24, NULL, NULL, NULL, NULL),
(3, 'Khách sạn C123', '872 đường số 2', '2024-11-21', b'1', 1, 58, NULL, NULL, NULL, '2024-11-21 07:37:53'),
(6, 'Khách Sạn Thiên Đường Đã Fix', '22/5 quốc lộ 10', '2024-11-01', b'0', 5, 58, NULL, NULL, '2024-11-01 12:29:15', '2024-11-01 12:41:03'),
(7, 'Khách sạn thiên đường', 'quốc lộ 1', '2021-11-17', b'1', 17, 58, NULL, NULL, NULL, NULL),
(8, 'Khách sạn tung tăng', 'quốc lộ 1', '2021-11-17', b'1', 17, 58, NULL, NULL, '2024-11-17 14:30:58', '2024-11-17 14:30:58'),
(25, 'Cozrum Lux Hotel', '19C Bùi Thị Xuân, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh, Việt Nam, 700000', '2024-11-20', b'1', 1, 58, NULL, NULL, '2024-11-19 21:43:46', '2024-11-19 21:43:46'),
(26, 'The One Premium Hotel', '29 Thủ Khoa Huân, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh, Việt Nam, 700000', '2024-11-21', b'1', 1, 58, NULL, NULL, '2024-11-19 22:31:21', '2024-11-19 22:31:21'),
(27, 'My Villa Airport Hotel', '54/34 Bạch Đằng, Phường 2, Quận Tân Bình, Thành phố Hồ Chí Minh, Việt Nam', '2024-11-20', b'1', 13, 58, NULL, NULL, '2024-11-19 22:41:22', '2024-11-19 22:41:22'),
(33, 'Khách Sạn La Paix Saigon Boutique', '59 Hai Bà Trưng, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam, 700000', '2024-11-20', b'1', 1, 58, NULL, NULL, '2024-11-19 23:04:08', '2024-11-19 23:04:08');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hotelimage`
--

CREATE TABLE `hotelimage` (
  `HotelImageId` int(11) NOT NULL,
  `HotelId` int(11) NOT NULL,
  `ImageUrl` varchar(255) NOT NULL,
  `HotelImageDescription` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `hotelimage`
--

INSERT INTO `hotelimage` (`HotelImageId`, `HotelId`, `ImageUrl`, `HotelImageDescription`, `created_at`, `updated_at`) VALUES
(14, 1, 'hotel_images/iIJS1aksyzvvHktaNQmjV3O5mJBvYxQxkPDO5QiU.jpg', '213123áđá12', '2024-11-11 18:42:33', '2024-11-21 08:07:05'),
(15, 1, 'hotel_images/fxL3ExxYBkS6KZThSPQt9ji2JFl0wZILmN6BLkQP.jpg', '1124123', '2024-11-17 19:56:59', '2024-11-17 19:56:59'),
(16, 1, 'hotel_images/hYgz2vYV7gXdObu6XnkQwKu9oARArrq9NRzFHCkr.jpg', '123123', '2024-11-17 19:57:28', '2024-11-21 08:17:32'),
(17, 1, 'hotel_images/u98pejOmKznlGIgKKbqMJOWrflyVlQy0nVqdoK9E.jpg', '1124123', '2024-11-17 19:58:02', '2024-11-17 19:58:02'),
(18, 1, 'hotel_images/BVmPH66uqRt5b9dA6ReTzAlnTLh7xVU47FbTl50e.png', '1124123', '2024-11-17 19:58:30', '2024-11-17 19:58:30'),
(19, 1, 'hotel_images/ruN2IaE61DEfHK1WtWUivnJIjYn3YY0A3Gy0CX1I.png', '1124123', '2024-11-17 19:58:48', '2024-11-17 19:58:48'),
(20, 2, 'hotel_images/mmvlaG6uoPm9ehVeDhMIWUGjI2t5RBatEHqiRkFY.jpg', '1124123', '2024-11-17 19:59:49', '2024-11-17 19:59:49'),
(21, 2, 'hotel_images/JtVcBHx6KuXK8fzoJVk9JSDpYiU3TS9uD5Z1EF3G.jpg', '1124123', '2024-11-17 19:59:52', '2024-11-17 19:59:52'),
(22, 2, 'hotel_images/hFhqNnIrNyVupWOR5VEOVLCkLnhmH5TQuImPXjtR.jpg', '1124123', '2024-11-17 19:59:55', '2024-11-17 19:59:55'),
(23, 2, 'hotel_images/rYbbL5PUAOXzNs3F8b8cWCa7VFPt1r6UlNO06fr4.jpg', '1124123', '2024-11-17 19:59:56', '2024-11-17 19:59:56'),
(24, 2, 'hotel_images/L35xcwZ0Zs76oV5k0QhNZwI47zQ3yatTIE3aU4xn.jpg', '1124123', '2024-11-17 19:59:57', '2024-11-17 19:59:57'),
(25, 2, 'hotel_images/eubL93ElDI66LbVgKoLqUxZJyxOrw3WHMhcVQ3XN.jpg', '1124123', '2024-11-17 19:59:58', '2024-11-17 19:59:58'),
(26, 3, 'hotel_images/kC0NdZ6faztvQ17Ve1rmbgknIJdRmKU7ZrZDaHie.jpg', 'Vung Tau', '2024-11-17 20:33:20', '2024-11-17 20:33:20'),
(27, 3, 'hotel_images/bsSDs0RfhNHkXEkGbkpZs9Opjm7GlwJ5E16ApaxC.jpg', 'Vung Tau', '2024-11-17 20:33:24', '2024-11-17 20:33:24'),
(28, 3, 'hotel_images/xGogz5ba4vzyvxIcSenebAgXh9jcFVzCYKjIQPG0.jpg', 'Vung Tau', '2024-11-17 20:33:24', '2024-11-17 20:33:24'),
(29, 3, 'hotel_images/KIFI5hc1MAWvJr5FyBApOqDitMl2h6p4KYpHjb9e.jpg', 'Vung Tau', '2024-11-17 20:33:25', '2024-11-17 20:33:25'),
(30, 3, 'hotel_images/e1m7khKyGBnb8NwOFYkiHTtVkevtFd2nk1JijvZl.jpg', 'Vung Tau', '2024-11-17 20:33:26', '2024-11-17 20:33:26'),
(31, 3, 'hotel_images/M2yk1VZ2kegcUWNpbpVqmCwbJzzPSIx5qzZnocI4.jpg', 'Vung Tau', '2024-11-17 20:33:27', '2024-11-17 20:33:27'),
(32, 25, 'hotel_images/Cs4N1EXXaPVJlVNb58vZqgUcKqQuWzabOJ7GxpyC.jpg', '123124', '2024-11-19 22:29:39', '2024-11-19 22:29:39'),
(33, 25, 'hotel_images/ktJ4lgvPtxE2k4Oxx1CXv1H7p6DIsUQcO9ttfya7.jpg', '124124', '2024-11-19 22:29:39', '2024-11-19 22:29:39'),
(34, 25, 'hotel_images/pRaMGpXSiBPuCboUBtsPuHMbdW2Ei9riXJ1vuXWH.jpg', '412412', '2024-11-19 22:29:39', '2024-11-19 22:29:39'),
(35, 25, 'hotel_images/Oe1rq9JUkivDayo1eD70fTQ9z7nPztdEv8TDN0eW.jpg', '12412512365', '2024-11-19 22:29:39', '2024-11-19 22:29:39'),
(36, 26, 'hotel_images/p7mWDDx4m1HeIacSb0QR7gjntXECDBE6kDZR6U0v.jpg', 'phòng', '2024-11-19 22:32:42', '2024-11-19 22:32:42'),
(37, 26, 'hotel_images/XzYb48A0NG1wQFQJCm0Mro109XUowfoXzThH4EfK.jpg', 'mặt tiền', '2024-11-19 22:32:42', '2024-11-19 22:32:42'),
(38, 26, 'hotel_images/evgR0U8QXWyhzFFLtlCMlr9S5uNxXsnY1DLJBjq5.jpg', 'phòng 1', '2024-11-19 22:32:42', '2024-11-19 22:32:42'),
(39, 26, 'hotel_images/K6aXSZtU3jwmzwy88SioNTw4Wkbdux468uwcGpCy.jpg', 'phòng 2', '2024-11-19 22:32:42', '2024-11-19 22:32:42'),
(40, 26, 'hotel_images/ooSqsvFeBZTyGlu3NmIEqdUZ80GZhP6WY8UEVLG4.jpg', 'phòng 3', '2024-11-19 22:32:42', '2024-11-19 22:32:42'),
(41, 26, 'hotel_images/sDd1rllsTE3KKuF9alU8ZSEsH0uU9cHZN7cbsvy2.jpg', 'phòng 4', '2024-11-19 22:32:42', '2024-11-19 22:32:42'),
(42, 26, 'hotel_images/rZYaXcJs0I7TR44Gvyx4ZZt51h2XeSv3XFdXC0pv.jpg', 'Phòng ngủ', '2024-11-19 22:39:30', '2024-11-19 22:39:30'),
(43, 27, 'hotel_images/h8GyzTWcyoOeiP2Y6HRlz8kvtdDt0rp52cbxI6hX.jpg', 'Phòng ngủ', '2024-11-19 22:42:48', '2024-11-19 22:42:48'),
(44, 27, 'hotel_images/l2ubsRz7sE03EZ3Qly0UoSqCBml0N5tT9ZTLZyB3.jpg', 'Phòng ngủ 2', '2024-11-19 22:42:48', '2024-11-19 22:42:48'),
(45, 27, 'hotel_images/KzraVr0gOrA3wCQ4XaaiytC4blQWPMRrxzowGuWO.jpg', 'Bên Ngoài', '2024-11-19 22:42:48', '2024-11-19 22:42:48'),
(46, 27, 'hotel_images/FyzzDEDN9Rb1vW7DYMbnpiUC7j5rSa2T1fjxIOIj.jpg', 'Phòng ngủ 3', '2024-11-19 22:42:48', '2024-11-19 22:42:48'),
(47, 27, 'hotel_images/58xmoOyxv4ifA2lJQaZhMsscpUkn1Suru4hbqWYC.jpg', 'Bên ngoài ban đêm', '2024-11-19 22:42:48', '2024-11-19 22:42:48'),
(48, 27, 'hotel_images/mNBS1QHL7mSq1g05Ao46xXwZv2A6sGO80UFBQ6O3.jpg', 'Phòng tắm 1', '2024-11-19 22:42:48', '2024-11-19 22:42:48'),
(49, 27, 'hotel_images/KUfrDHnGhc0HFglePcOkNjG8zFAmbMyC7zy8XQ0V.jpg', 'Phòng ngủ 4', '2024-11-19 22:42:48', '2024-11-19 22:42:48'),
(50, 33, 'hotel_images/KhVXJwUPbHBT7644c17eA4IoS5yXTkA7DCc8hNjg.jpg', 'Phòng Ngủ', '2024-11-19 23:05:13', '2024-11-19 23:05:13'),
(51, 33, 'hotel_images/CQz3gW1QfvAwbvQFzUwECybj482divuofSwTzFxH.jpg', 'Phòng Ngủ 1', '2024-11-19 23:05:13', '2024-11-19 23:05:13'),
(52, 33, 'hotel_images/2lPL53s2mQwsZlve2rcNv61bgWgr4TBNkU3jGxKO.jpg', 'Phòng Ngủ 2', '2024-11-19 23:05:13', '2024-11-19 23:05:13'),
(53, 33, 'hotel_images/EBOx7tsd7GFVjja1o7oJXfM1PxQN9NiDrO7xh0BU.jpg', 'Phòng Ngủ 3', '2024-11-19 23:05:13', '2024-11-19 23:05:13'),
(54, 33, 'hotel_images/NsGNdmQG2vvPL7aE4QTTsKHAEi2VJ5aj7HZ0ZnO4.jpg', 'Phòng Ngủ 4', '2024-11-19 23:05:13', '2024-11-19 23:05:13'),
(55, 33, 'hotel_images/C9ZRJUG5FoTW3YdozmlmEgfWiV0YTJpbSTYg4Fbt.jpg', 'Phòng Ngủ 5', '2024-11-19 23:05:13', '2024-11-19 23:05:13'),
(61, 1, 'hotel_images/n6Npzr78tAbvWTvo6G7LrOVrTZhrT4mKY1DGOf6H.jpg', '123124123', '2024-11-21 07:46:54', '2024-11-21 07:46:54'),
(64, 1, 'hotel_images/l1CQBDKZPPJbspPNBFbTECj6i9PhEDxKpuGIorZU.jpg', '2141242', '2024-11-21 08:11:15', '2024-11-21 08:16:49'),
(65, 1, 'hotel_images/nIqT6OdVPspjkh6R94d6Bt7FfPnCRe504pmjMC40.jpg', '1243214123', '2024-11-21 08:17:01', '2024-11-21 08:17:01');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hotel_amenities`
--

CREATE TABLE `hotel_amenities` (
  `HotelAmenityId` int(11) NOT NULL,
  `HotelId` int(11) NOT NULL,
  `AmenityId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `hotel_amenities`
--

INSERT INTO `hotel_amenities` (`HotelAmenityId`, `HotelId`, `AmenityId`) VALUES
(1, 1, 1),
(2, 1, 1),
(3, 2, 1),
(8, 33, 1),
(9, 33, 2),
(12, 3, 1),
(13, 3, 2),
(15, 1, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `location_city`
--

CREATE TABLE `location_city` (
  `locationCityId` int(11) NOT NULL,
  `locationCityName` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `location_city`
--

INSERT INTO `location_city` (`locationCityId`, `locationCityName`, `created_at`, `updated_at`) VALUES
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
-- Cấu trúc bảng cho bảng `location_district`
--

CREATE TABLE `location_district` (
  `locationDistrictId` int(11) NOT NULL,
  `locationDistrictName` varchar(50) NOT NULL,
  `locationCityId` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `location_district`
--

INSERT INTO `location_district` (`locationDistrictId`, `locationDistrictName`, `locationCityId`, `created_at`, `updated_at`) VALUES
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
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2024_10_27_073657_create_sessions_table', 1),
(2, '2024_11_17_202902_create_personal_access_tokens_table', 2),
(3, '2024_11_14_085747_add_is_featured_to_location_city_table', 3),
(4, '2024_11_14_090240_add_image_path_to_location_city_table', 3),
(5, '2024_11_20_110739_add_available_dates_to_hotel_table', 3),
(6, '2024_11_21_110133_add_timestamps_to_booking_and_bookingdetail', 4),
(9, '2024_11_22_083507_create_cache_table', 5),
(10, '2024_11_22_085908_remove_userid_from_bookings_table', 5);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\UserModel', 6, 'authToken', 'b00bc609a34c483ee84cdd78fad23311a633dd379e32f9d3b18a0bb722707384', '[\"*\"]', NULL, NULL, '2024-11-17 14:03:11', '2024-11-17 14:03:11'),
(2, 'App\\Models\\UserModel', 6, 'authToken', '946db85e93763f99eaec122200d86b2118e584e7fb2f4aef9fc3dc8d4f1057de', '[\"*\"]', NULL, NULL, '2024-11-17 14:03:20', '2024-11-17 14:03:20'),
(3, 'App\\Models\\UserModel', 6, 'authToken', 'f5e41e50ca8a80f858cb9f486cb7a39550632286560ac6c49ef1e9f57aabe0ef', '[\"*\"]', NULL, NULL, '2024-11-17 14:03:25', '2024-11-17 14:03:25'),
(4, 'App\\Models\\UserModel', 6, 'authToken', 'd50e66bc840314c797ef174a1aa52465023eaddb211768ddb42fa6b162f2c5bb', '[\"*\"]', NULL, NULL, '2024-11-17 14:03:44', '2024-11-17 14:03:44'),
(5, 'App\\Models\\UserModel', 6, 'authToken', 'a22f1c1efee8df6db1b7bd5545a168abcebf54df789568bb7e257cec1c9c1720', '[\"*\"]', NULL, NULL, '2024-11-17 14:04:52', '2024-11-17 14:04:52'),
(6, 'App\\Models\\UserModel', 6, 'authToken', '85673f24ff94ec85007920d692059bf9b40599a4a26087ec963d5744a01cf044', '[\"*\"]', NULL, NULL, '2024-11-17 14:05:55', '2024-11-17 14:05:55'),
(7, 'App\\Models\\UserModel', 6, 'authToken', '206d67e701a9b08996bb903829270087a9843e6060a61cade3c5b0b4c2258028', '[\"*\"]', NULL, NULL, '2024-11-17 14:06:03', '2024-11-17 14:06:03'),
(9, 'App\\Models\\UserModel', 6, 'authToken', 'abff78f9c8b823380f20ed857d6a6c627d558120503d5774cb939bc6004a1a74', '[\"*\"]', NULL, NULL, '2024-11-17 14:14:22', '2024-11-17 14:14:22'),
(10, 'App\\Models\\UserModel', 6, 'authToken', '9000b975a2cdcccd62c5136b38c723f248e02def988f68e3e88355fec646e706', '[\"*\"]', NULL, NULL, '2024-11-17 14:19:57', '2024-11-17 14:19:57'),
(11, 'App\\Models\\UserModel', 6, 'authToken', '0a964f729c6d33b856249b294d61f306b42c46c78df33e80ad555b7881e65ca2', '[\"*\"]', NULL, NULL, '2024-11-17 14:21:48', '2024-11-17 14:21:48'),
(12, 'App\\Models\\UserModel', 6, 'authToken', '983ed6899950c7c6dbb05824f8f522e4dd9e81d1f2ce6fc55cf1d7baceb9a9a9', '[\"*\"]', NULL, NULL, '2024-11-17 14:22:57', '2024-11-17 14:22:57'),
(13, 'App\\Models\\UserModel', 6, 'authToken', 'e82e2280aeb3624de12f7f5df49e23eab45168d74aa3a6a41a80956d7617ff2f', '[\"*\"]', NULL, NULL, '2024-11-17 14:26:58', '2024-11-17 14:26:58'),
(14, 'App\\Models\\UserModel', 6, 'authToken', 'f30ac9d3731f437ba4c54f290d1593a2e0b68e26ff156c15b0105e29e826b69e', '[\"*\"]', NULL, NULL, '2024-11-17 14:27:00', '2024-11-17 14:27:00'),
(15, 'App\\Models\\UserModel', 6, 'authToken', 'e34c08b198740ead4e0769ceca49154c9bf05a68b980d1a66926b3b2885d9050', '[\"*\"]', NULL, NULL, '2024-11-17 14:28:06', '2024-11-17 14:28:06'),
(16, 'App\\Models\\UserModel', 6, 'authToken', '102cb4fd2aee3ca3ee41e9582809e2e7bef760f4671b45fada29e1ace9a4cfe2', '[\"*\"]', NULL, NULL, '2024-11-17 14:28:49', '2024-11-17 14:28:49'),
(17, 'App\\Models\\UserModel', 6, 'authToken', '411023188a15159617d014fd7020f5bb0b82ced21bdb0933aee89256741969ff', '[\"*\"]', NULL, NULL, '2024-11-17 22:46:58', '2024-11-17 22:46:58'),
(18, 'App\\Models\\UserModel', 6, 'authToken', '6c685da5efe76d47e3175ba878553c70a2287b0a0d184805d7e61e9ecb7d4b3c', '[\"*\"]', NULL, NULL, '2024-11-17 22:47:34', '2024-11-17 22:47:34'),
(19, 'App\\Models\\UserModel', 6, 'authToken', '58da45c1760f1a0cf3f6718abd554e659bc3607b318e850aaff5ffe0919fa57e', '[\"*\"]', NULL, NULL, '2024-11-17 22:48:00', '2024-11-17 22:48:00'),
(20, 'App\\Models\\UserModel', 6, 'authToken', '7818b8b9c5aa3c6a69daf7c236d3f130384e73ca29d221678b91dff79b4e4f3f', '[\"*\"]', NULL, NULL, '2024-11-17 23:32:47', '2024-11-17 23:32:47'),
(21, 'App\\Models\\UserModel', 6, 'authToken', '0eacade99761a07d56dbd45ac4feb9de0744f4e135a9a7412a50d1c655ac2aaf', '[\"*\"]', NULL, NULL, '2024-11-23 22:04:13', '2024-11-23 22:04:13'),
(22, 'App\\Models\\UserModel', 6, 'authToken', '856bd4a8f8fd014a2aa4456c0f075026162c1f737431ddad3813eb16db86125f', '[\"*\"]', NULL, NULL, '2024-11-23 22:11:06', '2024-11-23 22:11:06'),
(23, 'App\\Models\\UserModel', 6, 'authToken', 'f74e4e8d88cd006ce6666c82207a1503ee73ddc3adafb76cd3fd623de12125a3', '[\"*\"]', NULL, NULL, '2024-11-23 22:24:29', '2024-11-23 22:24:29'),
(24, 'App\\Models\\UserModel', 6, 'authToken', 'ec8280e109711a3562165d59410aaa3d97d6cc24b5eaa4f88de3c3493d17df98', '[\"*\"]', NULL, NULL, '2024-11-23 22:28:23', '2024-11-23 22:28:23'),
(25, 'App\\Models\\UserModel', 6, 'authToken', 'cbeede614d8487ba2840ea221574c6e6989ba7e0009bab291da392bca118fbea', '[\"*\"]', NULL, NULL, '2024-11-23 22:29:33', '2024-11-23 22:29:33'),
(26, 'App\\Models\\UserModel', 6, 'authToken', '3e1f6251f0450b036bd6b326685bacdd73f68f44f2ef0a7d3bc69856731ae898', '[\"*\"]', NULL, NULL, '2024-11-23 23:42:43', '2024-11-23 23:42:43'),
(27, 'App\\Models\\UserModel', 6, 'authToken', 'e19142628d58a65efd278922fabc18be703297d91ac5004bbcbe88dce57088dd', '[\"*\"]', NULL, NULL, '2024-11-23 23:45:33', '2024-11-23 23:45:33'),
(28, 'App\\Models\\UserModel', 6, 'authToken', '8197fe53450549e1c255d1054b15c3e80ce3fc065e44bbc90240f55c83d37814', '[\"*\"]', NULL, NULL, '2024-11-23 23:48:32', '2024-11-23 23:48:32'),
(29, 'App\\Models\\UserModel', 6, 'authToken', '44920ed2293098a87f182cc770184c002b6ecf9061b3cc8ccaeba78743b519fc', '[\"*\"]', NULL, NULL, '2024-11-23 23:50:47', '2024-11-23 23:50:47'),
(30, 'App\\Models\\UserModel', 6, 'authToken', '7264ec2986d55ef8214dab1b064791c00ce822b3fb2f71517050dea48afd0448', '[\"*\"]', NULL, NULL, '2024-11-23 23:55:55', '2024-11-23 23:55:55'),
(31, 'App\\Models\\UserModel', 6, 'authToken', '7b8de097c8fa84dedc68538e1f66a9e482ac74c3eaa03f2cf3c8daa97fd7ecb9', '[\"*\"]', NULL, NULL, '2024-11-23 23:56:07', '2024-11-23 23:56:07'),
(32, 'App\\Models\\UserModel', 6, 'authToken', 'e24ed31b4f9bc760fc3cf696ac73adcaeea326149d573ef6f1867aed0708fec7', '[\"*\"]', NULL, NULL, '2024-11-23 23:56:25', '2024-11-23 23:56:25'),
(33, 'App\\Models\\UserModel', 6, 'authToken', 'eca9b73b6964a3f483a257e9157041521a00a2c7d532576de84e96ddf880f8bd', '[\"*\"]', NULL, NULL, '2024-11-23 23:57:17', '2024-11-23 23:57:17'),
(34, 'App\\Models\\UserModel', 6, 'authToken', 'fbc1841b4bc054a1c5db3843619960c522ffe3ffcd87815a7f87bd3e5935f407', '[\"*\"]', NULL, NULL, '2024-11-23 23:59:38', '2024-11-23 23:59:38'),
(35, 'App\\Models\\UserModel', 6, 'authToken', '68eabce1cbc1e4c460a17580e3d139711be4e610e81ca039349a234f1bb0bf38', '[\"*\"]', NULL, NULL, '2024-11-23 23:59:46', '2024-11-23 23:59:46'),
(36, 'App\\Models\\UserModel', 6, 'authToken', '56e4ec17bc3148905edd50d64cdaf269571228c9cefde942b12666ee361483f4', '[\"*\"]', NULL, NULL, '2024-11-24 00:05:41', '2024-11-24 00:05:41'),
(37, 'App\\Models\\UserModel', 6, 'authToken', '154c99aadb6bf36484b32538f46dd058cad69df7da9aabf89977bd7b3738129b', '[\"*\"]', NULL, NULL, '2024-11-24 00:05:52', '2024-11-24 00:05:52'),
(38, 'App\\Models\\UserModel', 6, 'authToken', '9c1e330901ebf2bb829d2381a3af412e91b77e61c7f24d29c2db7c839695bb42', '[\"*\"]', NULL, NULL, '2024-11-24 00:06:00', '2024-11-24 00:06:00'),
(39, 'App\\Models\\UserModel', 6, 'authToken', 'f2fb05a976546e9a83411242d7a5453fb34885007406df89136fc55566c5346d', '[\"*\"]', NULL, NULL, '2024-11-24 00:06:07', '2024-11-24 00:06:07'),
(40, 'App\\Models\\UserModel', 6, 'authToken', '126d2aac4700c57aecace122de036019ee8916777def8828eccadf581f6e02d9', '[\"*\"]', NULL, NULL, '2024-11-24 00:06:22', '2024-11-24 00:06:22'),
(41, 'App\\Models\\UserModel', 6, 'authToken', '4f90810807ebf8d363c1c02d70c3c7ca561da74d154cefc1c4f39d9c21c02968', '[\"*\"]', NULL, NULL, '2024-11-24 00:06:34', '2024-11-24 00:06:34'),
(42, 'App\\Models\\UserModel', 6, 'authToken', '7faf5931c8a733f02e688b2cc9ad72740d43d75a124257aff192c3072bd013e7', '[\"*\"]', NULL, NULL, '2024-11-24 00:08:02', '2024-11-24 00:08:02'),
(43, 'App\\Models\\UserModel', 6, 'authToken', '8deb1414be06a5afc86742e5ebfbd7f158ea2a3bdaa1e97c420e7c0224016827', '[\"*\"]', NULL, NULL, '2024-11-24 00:08:13', '2024-11-24 00:08:13'),
(44, 'App\\Models\\UserModel', 6, 'authToken', '3cdd470f3d91f05c14bd47cd72508c902059d2d72e25a60f586230ad27625c76', '[\"*\"]', NULL, NULL, '2024-11-24 00:12:48', '2024-11-24 00:12:48');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `room`
--

CREATE TABLE `room` (
  `RoomId` int(11) NOT NULL,
  `RoomName` varchar(64) NOT NULL,
  `HotelId` int(11) NOT NULL,
  `RoomType` varchar(30) NOT NULL COMMENT 'Kiểu phòng VD: Phòng Vip, Đơn, Đôi',
  `RoomStatus` varchar(30) NOT NULL COMMENT 'Trạng thái phòng như: Trống, Đã Đặt, Đang sử dụng, dọn dẹp, bảo trì',
  `Description` text NOT NULL COMMENT 'Mô tả phòng',
  `MaxCustomer` int(11) NOT NULL DEFAULT 1 COMMENT 'Số khách tối đa trong 1 phòng',
  `Price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `room`
--

INSERT INTO `room` (`RoomId`, `RoomName`, `HotelId`, `RoomType`, `RoomStatus`, `Description`, `MaxCustomer`, `Price`, `created_at`, `updated_at`) VALUES
(6, 'T101', 1, 'Bình thường', 'Trống', 'Phòng này cháy phết', 2, 200000.00, '2024-11-07 13:47:20', '2024-11-20 09:33:09'),
(7, 'T102', 1, 'Bình thường', 'Trống', 'Phòng này cháy phết', 2, 120000.00, '2024-11-07 13:47:25', '2024-11-07 13:47:25'),
(8, 'T103', 1, 'Bình thường', 'Trống', 'Phòng này cháy phết', 2, 120000.00, '2024-11-07 13:47:31', '2024-11-07 13:47:31'),
(9, 'T104', 1, 'Bình thường', 'Trống', 'Phòng này cháy phết', 2, 300000.00, '2024-11-07 13:47:36', '2024-11-20 04:40:12'),
(10, 'T105', 1, 'Bình thường', 'Trống', 'Phòng này cháy phết', 2, 120000.00, '2024-11-07 13:47:43', '2024-11-07 13:47:43'),
(13, '107', 1, 'Phòng đôi', 'Trống', 'ádáe213214', 2, 500000.00, '2024-11-20 10:09:24', '2024-11-20 10:09:24'),
(14, '1', 33, 'Phòng đôi', 'Trống', 'ádfzxczxdáe123', 2, 300000.00, '2024-11-21 08:36:08', '2024-11-21 08:36:08'),
(17, '101', 27, 'Phòng đôi', 'Trống', 'zsdáewq312412', 2, 300000.00, '2024-11-22 00:13:33', '2024-11-22 00:13:33');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roomimage`
--

CREATE TABLE `roomimage` (
  `RoomImageId` int(11) NOT NULL,
  `RoomId` int(11) NOT NULL,
  `RoomImageUrl` varchar(255) NOT NULL,
  `RoomImageDescription` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `roomimage`
--

INSERT INTO `roomimage` (`RoomImageId`, `RoomId`, `RoomImageUrl`, `RoomImageDescription`, `created_at`, `updated_at`) VALUES
(5, 6, 'room_images/0WdhSrAFcYPbZcAdVOvkoNFWLrrfGurRu5rjyxF4.jpg', '1231231235321', '2024-11-19 09:52:26', '2024-11-20 10:03:49'),
(6, 6, 'room_images/Kw76oIFcY4M6OC6K6JigYyMIYzmlZjdEXozHkuMJ.jpg', '123123123', '2024-11-19 09:52:37', '2024-11-19 09:52:37'),
(15, 6, 'room_images/LXHAHNc5co4jAl1lKQdg4zRyNAlqIw6YbsIZkFAQ.jpg', 'tu1', '2024-11-20 09:48:17', '2024-11-21 02:18:57'),
(16, 6, 'room_images/gFOzjx3eoMr2OhR2NLIhyBx1OeElbDZlypohkoGe.jpg', '12312412412', '2024-11-20 09:49:24', '2024-11-20 09:49:24'),
(17, 6, 'room_images/YjLPOP6m4mBF0TIb2CIEEkq8t09TTKVyAG9PwMBV.jpg', '1231241243', '2024-11-20 09:51:16', '2024-11-20 09:51:16'),
(18, 6, 'room_images/VvyDjwDsF0TuQYLNmefqORLI9hQG8It6uMaXmxHP.jpg', '214124123', '2024-11-20 09:54:22', '2024-11-20 09:54:22'),
(19, 6, 'room_images/qloj3r9j2QeMqINKVVs87PC6jZevl60RvoL7mxUg.jpg', '56487456812231', '2024-11-20 09:54:35', '2024-11-20 09:54:35'),
(21, 6, 'room_images/Sms1KfTOZxT6rhxqEdLK7akxuI8y5UXcSQQpTlk9.jpg', '1231231', '2024-11-20 09:57:41', '2024-11-21 22:42:27'),
(22, 6, 'room_images/tCF4jikHIM7DmPCcaRXPCFPdh7kyIoIsOjpbGHqh.jpg', '123124151', '2024-11-20 10:04:16', '2024-11-20 10:04:24'),
(23, 7, 'room_images/WDt9XmTAedRbPpPJH1M13bGw3oe99amM6CMlB1BG.jpg', '123124124', '2024-11-20 10:04:49', '2024-11-21 02:26:01'),
(24, 13, 'room_images/VRCfWB5e9720uv4n2Hv5KTEacoHpPGGWxYWYP9pN.jpg', '124152', '2024-11-20 10:09:43', '2024-11-20 10:09:43'),
(25, 13, 'room_images/C7z98YOnvcdK4ew26D2VjsaH5NXN2GWBrTUC2PSx.jpg', '1234125', '2024-11-20 10:09:43', '2024-11-20 10:09:43'),
(26, 13, 'room_images/90TsAsGJqTghza7nbhHuwxMYt0i2WFNFLBFJnNnv.jpg', '51234124', '2024-11-20 10:09:43', '2024-11-20 10:09:43'),
(27, 13, 'room_images/4iEGIFxK7jRjmTEeeQHVZZTQGsROv6w0FS2JTK4V.jpg', '521412', '2024-11-20 10:09:43', '2024-11-20 10:09:43'),
(28, 13, 'room_images/e79oH3ti4tCwNJByu6X6nFw9JPfrIQ6VFd9crbYc.jpg', '4125125', '2024-11-20 10:09:43', '2024-11-20 10:09:43'),
(29, 13, 'room_images/muzRooAkvj8mVHSRSfXSinG2g6W8jnRn0hSga6Dc.jpg', '52412', '2024-11-20 10:09:43', '2024-11-20 10:09:43'),
(30, 13, 'room_images/HlNMPodRJH4SyiGK6JRJWZObhxNIRRDPzQ2allz9.jpg', '5123412341', '2024-11-20 10:09:43', '2024-11-21 22:42:07'),
(31, 14, 'room_images/7i1imdtXczUbmnk6oKTUwSElAbjnLbvdqmUgmArZ.jpg', '12412', '2024-11-21 08:36:20', '2024-11-21 08:36:20'),
(32, 14, 'room_images/vqizkYT4bptppwxVtByxeHT5MkRJXIQLXt60vUCs.jpg', '123412', '2024-11-21 08:36:20', '2024-11-21 08:36:20'),
(33, 14, 'room_images/naeDMK7J6GHbcbiHfZX0lSjQJYeQ1x7BHxJcwmJC.jpg', '1215124', '2024-11-21 08:36:20', '2024-11-21 08:36:20'),
(43, 17, 'room_images/hY6BfztGMubdxYwhwnjDc30e6hk09VV1mBc8CA41.jpg', '125123', '2024-11-22 00:13:50', '2024-11-22 00:13:50'),
(44, 17, 'room_images/wXUrMXMmjNskvZCZ9Z6uFRwxvZyrdGU9y6gVl6zC.jpg', '21512', '2024-11-22 00:13:50', '2024-11-22 00:13:50'),
(45, 17, 'room_images/7JOBZ5XfaGt7afL0PuLOJJkXp4itw8uF6ZTEuJ9f.jpg', '15213', '2024-11-22 00:13:50', '2024-11-22 00:13:50'),
(46, 17, 'room_images/weMv2uI3YY284RklG1YtEKDcmp1SIhRh5RYJb0QI.jpg', '512512', '2024-11-22 00:13:50', '2024-11-22 00:13:50'),
(47, 17, 'room_images/soxEOobmNUpunsryMOXVzH4GKEtLzjZIsqTHFv9b.jpg', '512512', '2024-11-22 00:13:50', '2024-11-22 00:13:50');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `room_amenities`
--

CREATE TABLE `room_amenities` (
  `RoomAmenityId` bigint(20) NOT NULL,
  `RoomId` int(11) NOT NULL,
  `AmenityId` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `room_amenities`
--

INSERT INTO `room_amenities` (`RoomAmenityId`, `RoomId`, `AmenityId`, `created_at`, `updated_at`) VALUES
(15, 7, 2, '2024-11-20 06:47:19', '2024-11-20 06:47:19'),
(16, 8, 1, '2024-11-20 06:47:19', '2024-11-20 06:47:19'),
(21, 7, 1, '2024-11-20 11:45:24', '2024-11-20 11:45:24'),
(26, 6, 1, '2024-11-20 16:32:11', '2024-11-20 16:32:11'),
(27, 13, 1, '2024-11-20 17:09:24', '2024-11-20 17:09:24'),
(28, 13, 2, '2024-11-20 17:09:24', '2024-11-20 17:09:24'),
(30, 14, 2, '2024-11-21 15:36:08', '2024-11-21 15:36:08'),
(31, 14, 1, '2024-11-21 15:36:08', '2024-11-21 15:36:08'),
(36, 17, 1, '2024-11-22 07:13:33', '2024-11-22 07:13:33'),
(37, 17, 2, '2024-11-22 07:13:33', '2024-11-22 07:13:33');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('9JFQ0v0yIxIxZbf0R2XXA0t28jRKokd0sji7zV8G', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTW9PZlVQR0c5MXJ5OGVGQ2lmQzFWb0xOTUZwUDFuYThKTVJKM1p6TSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1731910623),
('ed8R7RW9TTlKNsBihNCTCXWJaubTJ54GM61irppQ', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRDdweFZlTFhPektpNE9nZUdlVERiMHFHRTNETGtaSWJWcFVpU2pYZiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1730045877),
('lgDHnpG1GD0Q6Gqu235P9EE7E8BOFUeqLMpwJT6e', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicjV5eUU5bjBqNGlqQ05VcmdLaDdWTmx5Q2w2eGdQdXEyS1RHbFBVOSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1730016515),
('t3SkU82cLTkpbzQfWaR4A3mcoU6ouENsCWybdX9c', NULL, '127.0.0.1', 'PostmanRuntime/7.42.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOWt6SkdMYkdLeE9QcVVZRXVHdFlRVFk1cDNWenYxdHFmNzNWa01CVyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1731876253),
('W6cuGCPY93ah7fclhyX0JYFzCrhVHAOv5ncLlvfP', NULL, '127.0.0.1', 'PostmanRuntime/7.42.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTE4xUjJycGxWMDhrQVdEbTdpdWJGeDViMG9WbVFKRXhEY1NBdGVFbCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1732186930),
('Xgu6BxroRbsK9Ucn7yfEfD9B2UHPOf1mioTaQHfc', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibnZjZlc1UzJpUUxvcllRY2EwVXgxWGY0QmlFckU3UmNBTEM3azVpaSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1730353999);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `UserId` int(11) NOT NULL,
  `HotelId` int(11) NOT NULL,
  `UserName` varchar(15) NOT NULL COMMENT 'Mã NV',
  `FullName` varchar(30) NOT NULL COMMENT 'Họ và tên NV',
  `Password` varchar(255) NOT NULL,
  `UserStatus` bit(1) NOT NULL DEFAULT b'1' COMMENT '1 là đang làm việc, 0 là nghỉ việc',
  `Role` enum('Nhân viên','Quản lý') NOT NULL DEFAULT 'Nhân viên',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`UserId`, `HotelId`, `UserName`, `FullName`, `Password`, `UserStatus`, `Role`, `created_at`, `updated_at`) VALUES
(6, 25, 'ngocgamer', 'Bảo ngọc', '$2y$12$UCcZP0ueNuSipDt./9EJreRxleOly3DZhxOFffZgASUcT7TdUG9ri', b'1', 'Nhân viên', '2024-11-17 14:02:58', '2024-11-24 00:17:15');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `amenities`
--
ALTER TABLE `amenities`
  ADD PRIMARY KEY (`AmenityId`),
  ADD KEY `AmenityId` (`AmenityId`);

--
-- Chỉ mục cho bảng `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`BookingId`),
  ADD KEY `CustomerId` (`CustomerId`),
  ADD KEY `HotelId` (`HotelId`),
  ADD KEY `RoomId` (`RoomId`);

--
-- Chỉ mục cho bảng `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`CommentId`),
  ADD KEY `HotelId` (`HotelId`);

--
-- Chỉ mục cho bảng `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`CustomerId`),
  ADD UNIQUE KEY `CustomerPhone` (`CustomerPhone`),
  ADD UNIQUE KEY `CustomerEmail` (`CustomerEmail`);

--
-- Chỉ mục cho bảng `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`HotelId`),
  ADD KEY `locationDistrictId` (`locationDistrictId`),
  ADD KEY `fk_hotel_location_city` (`locationCityId`);

--
-- Chỉ mục cho bảng `hotelimage`
--
ALTER TABLE `hotelimage`
  ADD PRIMARY KEY (`HotelImageId`),
  ADD KEY `HotelId` (`HotelId`);

--
-- Chỉ mục cho bảng `hotel_amenities`
--
ALTER TABLE `hotel_amenities`
  ADD PRIMARY KEY (`HotelAmenityId`),
  ADD KEY `HotelId` (`HotelId`),
  ADD KEY `AmenityId` (`AmenityId`);

--
-- Chỉ mục cho bảng `location_city`
--
ALTER TABLE `location_city`
  ADD PRIMARY KEY (`locationCityId`);

--
-- Chỉ mục cho bảng `location_district`
--
ALTER TABLE `location_district`
  ADD PRIMARY KEY (`locationDistrictId`),
  ADD KEY `locationCityId` (`locationCityId`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Chỉ mục cho bảng `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`RoomId`),
  ADD KEY `HotelId` (`HotelId`),
  ADD KEY `RoomId` (`RoomId`),
  ADD KEY `RoomId_2` (`RoomId`);

--
-- Chỉ mục cho bảng `roomimage`
--
ALTER TABLE `roomimage`
  ADD PRIMARY KEY (`RoomImageId`),
  ADD KEY `RoomId` (`RoomId`);

--
-- Chỉ mục cho bảng `room_amenities`
--
ALTER TABLE `room_amenities`
  ADD PRIMARY KEY (`RoomAmenityId`),
  ADD KEY `RoomId` (`RoomId`),
  ADD KEY `AmenityId` (`AmenityId`);

--
-- Chỉ mục cho bảng `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserId`),
  ADD KEY `HotelId` (`HotelId`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `amenities`
--
ALTER TABLE `amenities`
  MODIFY `AmenityId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `booking`
--
ALTER TABLE `booking`
  MODIFY `BookingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `comment`
--
ALTER TABLE `comment`
  MODIFY `CommentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `customers`
--
ALTER TABLE `customers`
  MODIFY `CustomerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT cho bảng `hotel`
--
ALTER TABLE `hotel`
  MODIFY `HotelId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT cho bảng `hotelimage`
--
ALTER TABLE `hotelimage`
  MODIFY `HotelImageId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT cho bảng `hotel_amenities`
--
ALTER TABLE `hotel_amenities`
  MODIFY `HotelAmenityId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `location_city`
--
ALTER TABLE `location_city`
  MODIFY `locationCityId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT cho bảng `location_district`
--
ALTER TABLE `location_district`
  MODIFY `locationDistrictId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT cho bảng `room`
--
ALTER TABLE `room`
  MODIFY `RoomId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT cho bảng `roomimage`
--
ALTER TABLE `roomimage`
  MODIFY `RoomImageId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT cho bảng `room_amenities`
--
ALTER TABLE `room_amenities`
  MODIFY `RoomAmenityId` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `UserId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`CustomerId`) REFERENCES `customers` (`CustomerId`),
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`HotelId`) REFERENCES `hotel` (`HotelId`),
  ADD CONSTRAINT `booking_ibfk_3` FOREIGN KEY (`RoomId`) REFERENCES `room` (`RoomId`);

--
-- Các ràng buộc cho bảng `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`HotelId`) REFERENCES `hotel` (`HotelId`);

--
-- Các ràng buộc cho bảng `hotel`
--
ALTER TABLE `hotel`
  ADD CONSTRAINT `fk_hotel_location_city` FOREIGN KEY (`locationCityId`) REFERENCES `location_city` (`locationCityId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hotel_ibfk_1` FOREIGN KEY (`locationDistrictId`) REFERENCES `location_district` (`locationDistrictId`);

--
-- Các ràng buộc cho bảng `hotelimage`
--
ALTER TABLE `hotelimage`
  ADD CONSTRAINT `hotelimage_ibfk_1` FOREIGN KEY (`HotelId`) REFERENCES `hotel` (`HotelId`);

--
-- Các ràng buộc cho bảng `hotel_amenities`
--
ALTER TABLE `hotel_amenities`
  ADD CONSTRAINT `hotel_amenities_ibfk_1` FOREIGN KEY (`HotelId`) REFERENCES `hotel` (`HotelId`) ON DELETE CASCADE,
  ADD CONSTRAINT `hotel_amenities_ibfk_2` FOREIGN KEY (`AmenityId`) REFERENCES `amenities` (`AmenityId`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `location_district`
--
ALTER TABLE `location_district`
  ADD CONSTRAINT `location_district_ibfk_1` FOREIGN KEY (`locationCityId`) REFERENCES `location_city` (`locationCityId`);

--
-- Các ràng buộc cho bảng `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `room_ibfk_1` FOREIGN KEY (`HotelId`) REFERENCES `hotel` (`HotelId`);

--
-- Các ràng buộc cho bảng `roomimage`
--
ALTER TABLE `roomimage`
  ADD CONSTRAINT `roomimage_ibfk_1` FOREIGN KEY (`RoomId`) REFERENCES `room` (`RoomId`);

--
-- Các ràng buộc cho bảng `room_amenities`
--
ALTER TABLE `room_amenities`
  ADD CONSTRAINT `room_amenities_ibfk_1` FOREIGN KEY (`RoomId`) REFERENCES `room` (`RoomId`) ON DELETE CASCADE,
  ADD CONSTRAINT `room_amenities_ibfk_2` FOREIGN KEY (`AmenityId`) REFERENCES `amenities` (`AmenityId`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`HotelId`) REFERENCES `hotel` (`HotelId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
