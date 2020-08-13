-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 13, 2020 at 08:33 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbcta`
--

-- --------------------------------------------------------

--
-- Table structure for table `ctauser`
--

CREATE TABLE `ctauser` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `confirm_password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `region` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ctauser`
--

INSERT INTO `ctauser` (`user_id`, `username`, `fullname`, `email`, `password`, `confirm_password`, `role`, `region`, `status`) VALUES
(1, 'malay.doshi', 'Malay P Doshi', 'malay.doshi@atidan.com', 'Password@123', 'Password@123', 'Trainee Software Developer', 'Mumbai', 'Active'),
(2, 'siddhesh.lad', 'Siddhesh Lad', 'siddhesh.lad@atidan.com', 'Password@123', 'Password@123', 'Trainee Software Developer', 'Mumbai', 'Active'),
(3, 'vikas.jain', 'Vikas Jain', 'vikas.jain@atidan.com', 'Password@123', 'Password@123', 'Software Developer', 'Mumbai', 'Active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ctauser`
--
ALTER TABLE `ctauser`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ctauser`
--
ALTER TABLE `ctauser`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
