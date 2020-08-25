-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 25, 2020 at 04:21 PM
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

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `spGetAllUsers` ()  BEGIN
	SELECT * FROM dbcta.ctauser;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spGetInnerJoin` ()  BEGIN
SELECT 
    m.member_id, 
    m.name member, 
    c.committee_id, 
    c.name committee
	FROM
		members m
	INNER JOIN 
		committees c 
	ON c.name = m.name;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spGetUserByEmailID` (IN `inputEmail` VARCHAR(255))  BEGIN
	SELECT * FROM ctauser WHERE email = inputEmail;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spGetUserByUserID` (IN `inputUser_id` INT)  BEGIN
select * from ctauser where user_id = inputUser_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spTransactionExample` ()  BEGIN
INSERT INTO members(name)
VALUES('John'),('Jane'),('Mary'),('David'),('Amelia');

INSERT INTO commttees(name)
VALUES('John'),('Mary'),('Amelia'),('Joe');
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `committees`
--

CREATE TABLE `committees` (
  `committee_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `committees`
--

INSERT INTO `committees` (`committee_id`, `name`) VALUES
(1, 'John'),
(2, 'Mary'),
(3, 'Amelia'),
(4, 'Joe'),
(9, 'John'),
(10, 'Mary'),
(11, 'Amelia'),
(12, 'Joe'),
(17, 'John'),
(18, 'Mary'),
(19, 'Amelia'),
(20, 'Joe');

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
(40, 'malay.doshi', 'Malay Doshi', 'malay.doshi@atidan.com', 'Password@123', 'Password@123', 'Trainee Software Developer', 'Mumbai', 'Active'),
(41, 'malay.doshi', 'Malay Doshi', 'malay.doshi@razor-tech.com', 'Password@123', 'Password@123', 'Trainee Software Developer', 'Mumbai', 'Inactive'),
(42, 'aayush.pandya', 'Aayush Pandya', 'aayush.pandya@atidan.com', 'Password@123', 'Password@123', 'Trainee Software Developer', 'Mumbai', 'Active'),
(43, 'aayush.pandya', 'Aayush Pandya', 'aayush.pandya@razor-tech.com', 'Password@123', 'Password@123', 'Trainee Software Developer', 'Mumbai', 'Inactive'),
(44, 'reji.oommen', 'Reji Oommen', 'reji.oommen@atidan.com', 'Password@123', 'Password@123', 'Software Developer', 'Mumbai', 'Inactive'),
(45, 'reji.oommen', 'Reji Oommen', 'reji.oommen@razor-tech.com', 'Password@123', 'Password@123', 'Software Developer', 'Mumbai', 'Active'),
(46, 'pankaj.gupta', 'Pankaj Gupta', 'pankaj.gupta@atidan.com', 'Password@123', 'pankaj.gupta', 'Software Developer', 'Mumbai', 'Inactive'),
(47, 'pankaj.gupta', 'Pankaj Gupta', 'pankaj.gupta@razor-tech.com', 'Password@123', 'pankaj.gupta', 'Software Developer', 'Mumbai', 'Active'),
(48, 'manoj.hardwani', 'Manoj Hardwani', 'manoj.hardwani@atidan.com', 'Password@123', 'manoj.hardwani', 'Software Developer', 'Mumbai', 'Inactive'),
(49, 'manoj.hardwani', 'Manoj Hardwani', 'manoj.hardwani@razor-tech.com', 'Password@123', 'Password@123', 'Software Developer', 'Mumbai', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `greenbookpayment`
--

CREATE TABLE `greenbookpayment` (
  `greenbookid` int(11) NOT NULL,
  `dateofbirth` datetime DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `tibetianassociation` varchar(45) DEFAULT NULL,
  `yearoflastpayment` int(11) DEFAULT NULL,
  `numberofyears` int(11) DEFAULT NULL,
  `employementyears` int(11) DEFAULT NULL,
  `totaldue` int(11) DEFAULT NULL,
  `extradonation` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `greenbookpayment`
--

INSERT INTO `greenbookpayment` (`greenbookid`, `dateofbirth`, `name`, `tibetianassociation`, `yearoflastpayment`, `numberofyears`, `employementyears`, `totaldue`, `extradonation`) VALUES
(1, '2020-08-25 19:48:16', 'malay', 'dharmshala', 2016, 4, 4, 4000, 1000),
(2, '2020-08-25 19:50:21', 'aayush', 'dharamshala', 2018, 2, 2, 2000, 1000);

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `member_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`member_id`, `name`) VALUES
(1, 'John'),
(2, 'Jane'),
(3, 'Mary'),
(4, 'David'),
(5, 'Amelia'),
(11, 'John'),
(12, 'Jane'),
(13, 'Mary'),
(14, 'David'),
(15, 'Amelia'),
(21, 'John'),
(22, 'Jane'),
(23, 'Mary'),
(24, 'David'),
(25, 'Amelia');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `committees`
--
ALTER TABLE `committees`
  ADD PRIMARY KEY (`committee_id`);

--
-- Indexes for table `ctauser`
--
ALTER TABLE `ctauser`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `greenbookpayment`
--
ALTER TABLE `greenbookpayment`
  ADD PRIMARY KEY (`greenbookid`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`member_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `committees`
--
ALTER TABLE `committees`
  MODIFY `committee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `ctauser`
--
ALTER TABLE `ctauser`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `greenbookpayment`
--
ALTER TABLE `greenbookpayment`
  MODIFY `greenbookid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `member_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
