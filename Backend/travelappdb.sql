-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 22, 2024 lúc 07:43 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `travelappdb`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `blogposts`
--

CREATE TABLE `blogposts` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `blogposts`
--

INSERT INTO `blogposts` (`post_id`, `user_id`, `title`, `content`, `created_at`, `updated_at`) VALUES
(1, 1, 'Khách sạn tốt nhất tại Tokyo', 'Nội dung bài viết về khách sạn tại Tokyo...', '2024-10-22 17:42:53', '2024-10-22 17:42:53'),
(2, 2, 'Những địa điểm du lịch nổi bật', 'Nội dung bài viết về địa điểm du lịch nổi bật...', '2024-10-22 17:42:53', '2024-10-22 17:42:53');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `favorites`
--

CREATE TABLE `favorites` (
  `favorite_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `hotel_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `favorites`
--

INSERT INTO `favorites` (`favorite_id`, `user_id`, `hotel_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 1),
(4, 2, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hotels`
--

CREATE TABLE `hotels` (
  `hotel_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `rating` decimal(2,1) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `beds` int(11) NOT NULL,
  `discount` varchar(10) DEFAULT NULL,
  `imageUrl` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `hotels`
--

INSERT INTO `hotels` (`hotel_id`, `name`, `location`, `rating`, `price`, `beds`, `discount`, `imageUrl`) VALUES
(1, 'The Lounge & Bar', 'Tokyo, Japan', 4.9, 311.00, 3, '20%', 'hue.jpg'),
(2, 'The Lounge & Bar', 'Tokyo, Japan', 4.9, 311.00, 3, '15%', 'hue.jpg'),
(3, 'The Lounge & Bar', 'Tokyo, Japan', 4.9, 311.00, 3, '20%', 'hue.jpg'),
(4, 'The Lounge & Bar', 'Tokyo, Japan', 4.9, 311.00, 3, '25%', 'hue.jpg'),
(5, 'The Lounge & Bar', 'Tokyo, Japan', 4.9, 311.00, 3, '10%', 'hue.jpg'),
(6, 'The Lounge & Bar', 'Tokyo, Japan', 4.9, 311.00, 3, '5%', 'hue.jpg'),
(7, 'The Lounge & Bar', 'Tokyo, Japan', 4.9, 311.00, 3, '10%', 'hue.jpg'),
(8, 'The Lounge & Bar', 'Tokyo, Japan', 4.9, 311.00, 3, '5%', 'hue.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `images`
--

CREATE TABLE `images` (
  `image_id` int(11) NOT NULL,
  `hotel_id` int(11) DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  `caption` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `images`
--

INSERT INTO `images` (`image_id`, `hotel_id`, `image_url`, `caption`) VALUES
(1, 1, 'hue.jpg', 'Khách sạn The Lounge & Bar - Phòng nghỉ sang trọng'),
(2, 2, 'hue.jpg', 'Khách sạn The Lounge & Bar - Khu vực tiếp khách thoải mái'),
(3, 3, 'hue.jpg', 'Khách sạn The Lounge & Bar - Hồ bơi ngoài trời'),
(4, 4, 'hue.jpg', 'Khách sạn The Lounge & Bar - Quang cảnh ban đêm'),
(5, 5, 'hue.jpg', 'Khách sạn The Lounge & Bar - Nhà hàng hiện đại'),
(6, 6, 'hue.jpg', 'Khách sạn The Lounge & Bar - Đường phố xung quanh'),
(7, 7, 'hue.jpg', 'Khách sạn The Lounge & Bar - Khu vực thư giãn'),
(8, 8, 'hue.jpg', 'Khách sạn The Lounge & Bar - Phòng tập thể dục');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `created_at`) VALUES
(1, 'user1', 'user1@example.com', 'password1', '2024-10-22 17:42:53'),
(2, 'user2', 'user2@example.com', 'password2', '2024-10-22 17:42:53'),
(3, 'user3', 'user3@example.com', 'password3', '2024-10-22 17:42:53');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `blogposts`
--
ALTER TABLE `blogposts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`favorite_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `hotel_id` (`hotel_id`);

--
-- Chỉ mục cho bảng `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`hotel_id`);

--
-- Chỉ mục cho bảng `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `hotel_id` (`hotel_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `blogposts`
--
ALTER TABLE `blogposts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `favorites`
--
ALTER TABLE `favorites`
  MODIFY `favorite_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `hotels`
--
ALTER TABLE `hotels`
  MODIFY `hotel_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `images`
--
ALTER TABLE `images`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `blogposts`
--
ALTER TABLE `blogposts`
  ADD CONSTRAINT `blogposts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`hotel_id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`hotel_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
