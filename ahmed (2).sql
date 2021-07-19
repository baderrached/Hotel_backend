-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 19, 2021 at 08:29 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ahmed`
--

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `passeport_cin` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `nb_reservation` int(11) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `clients`:
--

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `first_name`, `last_name`, `passeport_cin`, `gender`, `country`, `nb_reservation`, `username`, `password`) VALUES
(4, 'houssem', 'nachet', '06998661', NULL, NULL, NULL, 'houba', 'root'),
(7, NULL, NULL, NULL, NULL, NULL, NULL, 'iheb', 'root123');

-- --------------------------------------------------------

--
-- Table structure for table `extra_demande`
--

CREATE TABLE `extra_demande` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `extra_demande`:
--   `user_id`
--       `clients` -> `id`
--

--
-- Dumping data for table `extra_demande`
--

INSERT INTO `extra_demande` (`id`, `user_id`, `room_id`, `status`) VALUES
(1, 4, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `extra_list`
--

CREATE TABLE `extra_list` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `descreption` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `extra_list`:
--

--
-- Dumping data for table `extra_list`
--

INSERT INTO `extra_list` (`id`, `name`, `category`, `descreption`, `price`, `image`) VALUES
(1, 'burger salta3 ', 'food', 'food', '15', 'https://i.pinimg.com/originals/08/fb/04/08fb04447b0c1a86b467e1d0ed21132a.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- RELATIONSHIPS FOR TABLE `failed_jobs`:
--

-- --------------------------------------------------------

--
-- Table structure for table `hotels`
--

CREATE TABLE `hotels` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `room` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `hotels`:
--

--
-- Dumping data for table `hotels`
--

INSERT INTO `hotels` (`id`, `name`, `room`, `location`, `image`, `status`, `created_at`, `updated_at`) VALUES
(1, 'hotel 1', '1212', 'sousse', 'https://media-cdn.tripadvisor.com/media/photo-s/1a/00/13/85/sousse-city-beach-hotel.jpg', '', '2021-07-11 20:26:39', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- RELATIONSHIPS FOR TABLE `migrations`:
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `orders` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `orders`:
--

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `orders`, `created_at`) VALUES
(1, 123, 'Array', '2021-07-15 22:48:34'),
(2, 123, 'Array', '2021-07-15 22:54:42'),
(3, 123, '[{\"id\":1,\"name\":\"burger salta3 \",\"category\":\"food\",\"descreption\":\"food\",\"price\":\"15\",\"image\":\"https://i.pinimg.com/originals/08/fb/04/08fb04447b0c1a86b467e1d0ed21132a.jpg\",\"count\":1}]', '2021-07-15 22:56:17'),
(4, 123, '[{\"id\":1,\"name\":\"burger salta3 \",\"category\":\"food\",\"descreption\":\"food\",\"price\":\"15\",\"image\":\"https://i.pinimg.com/originals/08/fb/04/08fb04447b0c1a86b467e1d0ed21132a.jpg\",\"count\":1},{\"id\":1,\"name\":\"burger salta3 \",\"category\":\"food\",\"descreption\":\"food\",\"price\":\"15\",\"image\":\"https://i.pinimg.com/originals/08/fb/04/08fb04447b0c1a86b467e1d0ed21132a.jpg\",\"count\":1},{\"id\":1,\"name\":\"burger salta3 \",\"category\":\"food\",\"descreption\":\"food\",\"price\":\"15\",\"image\":\"https://i.pinimg.com/originals/08/fb/04/08fb04447b0c1a86b467e1d0ed21132a.jpg\",\"count\":1},{\"id\":1,\"name\":\"burger salta3 \",\"category\":\"food\",\"descreption\":\"food\",\"price\":\"15\",\"image\":\"https://i.pinimg.com/originals/08/fb/04/08fb04447b0c1a86b467e1d0ed21132a.jpg\",\"count\":1}]', '2021-07-19 11:05:53');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- RELATIONSHIPS FOR TABLE `password_resets`:
--

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `id_user` varchar(255) NOT NULL,
  `card_number` varchar(255) NOT NULL,
  `ex_date` varchar(255) NOT NULL,
  `cvv` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `payment`:
--

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `id_user`, `card_number`, `ex_date`, `cvv`) VALUES
(14, '4', '544443', '1253', 334),
(15, 'houba', '544443', '1253', 334),
(16, 'houba', '544443', '1253', 334),
(17, '4', '123456789', '01/23', 123),
(18, '4', '1137373', '12/23', 246),
(19, '4', '11/23', '124', 134),
(20, '4', '11/23', '124', 134),
(21, '4', '11/23', '124', 134),
(22, '4', '11/23', '124', 134),
(23, '4', '11/23', '124', 134),
(24, '4', '4647', '3544', 46),
(25, '7', '655776', '32/32', 575),
(26, '4', '123456789', '12/23', 537),
(27, '4', '123456789', '12/23', 537),
(28, '4', '123456789', '12/23', 537),
(29, '4', '123456789', '12/23', 537),
(30, '4', '1234567', '54/12', 245),
(31, '4', '1234567', '54/12', 245);

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `room_id` int(255) NOT NULL,
  `amount` float NOT NULL,
  `status` varchar(255) NOT NULL,
  `nb_nuit` int(11) NOT NULL,
  `from` varchar(255) NOT NULL,
  `to` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `reservations`:
--   `room_id`
--       `rooms` -> `id`
--

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `user_id`, `room_id`, `amount`, `status`, `nb_nuit`, `from`, `to`) VALUES
(12, '4', 1, 1560, '1', 13, '14/07/2021', '31/07/2021'),
(13, '4', 1, 1560, '0', 13, '18/07/2021', '31/07/2021'),
(14, '4', 1, 1560, '0', 13, '7/18/2021', '7/31/2021'),
(15, '4', 1, 1560, '0', 13, '7/18/2021', '7/31/2021'),
(16, '4', 1, 1560, '0', 13, '7/18/2021', '7/31/2021'),
(17, '4', 1, 1560, '0', 13, '7/18/2021', '7/31/2021'),
(18, '4', 1, 2280, '0', 19, '7/12/2021', '7/31/2021'),
(19, '4', 1, 2280, '0', 19, '7/12/2021', '7/31/2021');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `room_name` varchar(255) NOT NULL,
  `nb_adulte` int(11) NOT NULL,
  `nb_children` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `descreption` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `nb_disponible` int(11) NOT NULL,
  `hotel_id` int(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `activated` varchar(255) NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- RELATIONSHIPS FOR TABLE `rooms`:
--   `hotel_id`
--       `hotels` -> `id`
--

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `room_name`, `nb_adulte`, `nb_children`, `type`, `descreption`, `price`, `nb_disponible`, `hotel_id`, `image`, `activated`, `created_at`, `updated_at`) VALUES
(1, 'room 1', 2, 1, 'double', 'double', 120, 12, 1, 'https://www.movenpick.com/fileadmin/_processed_/0/f/csm_Sousse_xxxxxxxx_i111746_eb9d1a8793.jpg', 'active', '2021-07-11 20:36:31', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- RELATIONSHIPS FOR TABLE `users`:
--

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `extra_demande`
--
ALTER TABLE `extra_demande`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`user_id`);

--
-- Indexes for table `extra_list`
--
ALTER TABLE `extra_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `room_id` (`room_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hotel_id` (`hotel_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `extra_demande`
--
ALTER TABLE `extra_demande`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `extra_list`
--
ALTER TABLE `extra_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hotels`
--
ALTER TABLE `hotels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `extra_demande`
--
ALTER TABLE `extra_demande`
  ADD CONSTRAINT `userID` FOREIGN KEY (`user_id`) REFERENCES `clients` (`id`);

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `room_id` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`);

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `hotel_id` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
