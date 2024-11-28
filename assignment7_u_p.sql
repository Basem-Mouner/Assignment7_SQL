-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2024 at 10:32 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `assignment7_u_p`
--

-- --------------------------------------------------------

--
-- Table structure for table `phone`
--

CREATE TABLE `phone` (
  `ph_id` int(11) NOT NULL,
  `ph_phone` varchar(255) NOT NULL,
  `ph_userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `phone`
--

INSERT INTO `phone` (`ph_id`, `ph_phone`, `ph_userId`) VALUES
(1, '01223300895', 1),
(2, '01555570468', 1),
(3, '01281646052', 2);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `pr_id` int(11) NOT NULL,
  `pr_name` varchar(255) NOT NULL,
  `pr_stock` int(11) DEFAULT 0,
  `pr_price` decimal(10,2) NOT NULL,
  `pr_isDeleted` tinyint(1) DEFAULT 0,
  `pr_userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`pr_id`, `pr_name`, `pr_stock`, `pr_price`, `pr_isDeleted`, `pr_userId`) VALUES
(2, 'samsung', 50, '99.99', 1, 1),
(3, 'samsung', 50, '99.99', 0, 1),
(4, 'laptop', 5, '99.99', 0, 2),
(5, 'mianta', 77, '5000.00', 0, 2),
(6, 'recorder', 88, '9000.00', 0, 1),
(7, 'tv', 33, '2999.00', 0, 2),
(8, 'tv', 33, '2999.00', 0, 2),
(9, 'tv', 33, '22.00', 0, 2),
(10, 'tv', 33, '444.00', 0, 2),
(11, 'tv', 33, '111.00', 0, 2),
(12, 'tv', 33, '10000.00', 0, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `u_id` int(11) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `u_email` varchar(255) NOT NULL,
  `u_role` varchar(50) DEFAULT NULL,
  `u_password` varchar(255) NOT NULL,
  `u_createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `u_updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`u_id`, `firstName`, `lastName`, `u_email`, `u_role`, `u_password`, `u_createdAt`, `u_updatedAt`) VALUES
(1, 'basem', 'mouner', 'bmr.audi@gmail.com', 'admin', '1234', '2024-11-28 14:41:12', '2024-11-28 14:41:12'),
(2, 'nana', 'nagi', 'nana.audi@yahoo.com', NULL, '1234', '2024-11-28 18:11:34', '2024-11-28 18:11:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `phone`
--
ALTER TABLE `phone`
  ADD PRIMARY KEY (`ph_id`),
  ADD KEY `ph_userId` (`ph_userId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`pr_id`),
  ADD KEY `pr_userId` (`pr_userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`u_id`),
  ADD UNIQUE KEY `u_email` (`u_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `phone`
--
ALTER TABLE `phone`
  MODIFY `ph_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `pr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `phone`
--
ALTER TABLE `phone`
  ADD CONSTRAINT `phone_ibfk_1` FOREIGN KEY (`ph_userId`) REFERENCES `users` (`u_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`pr_userId`) REFERENCES `users` (`u_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
