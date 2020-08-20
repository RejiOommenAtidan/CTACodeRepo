SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


INSERT INTO `ctauser` (`user_id`, `username`, `fullname`, `email`, `password`, `confirm_password`, `role`, `region`, `status`) VALUES
(40, 'malay.doshi', 'Malay Doshi', 'malay.doshi@atidan.com', 'Password@123', 'Password@123', 'Trainee Software Developer', 'Mumbai', 'Active'),
(41, 'malay.doshi', 'Malay Doshi', 'malay.doshi@razor-tech.com', 'Password@123', 'Password@123', 'Trainee Software Developer', 'Mumbai', 'Inactive'),
(42, 'aayush.pandya', 'Aayush Pandya', 'aayush.pandya@atidan.com', 'Password@123', 'Password@123', 'Trainee Software Developer', 'Mumbai', 'Active'),
(43, 'aayush.pandya', 'Aayush Pandya', 'aayush.pandya@razor-tech.com', 'Password@123', 'Password@123', 'Trainee Software Developer', 'Mumbai', 'Inactive'),
(44, 'reji.oommen', 'Reji Oommen', 'reji.oommen@atidan.com', 'Password@123', 'Password@123', 'Software Developer', 'Mumbai', 'Inactive'),
(45, 'reji.oommen', 'Reji Oommen', 'reji.oommen@razor-tech.com', 'Password@123', 'Password@123', 'Software Developer', 'Mumbai', 'Active'),
(46, 'pankaj.gupta', 'Pankaj Gupta', 'pankaj.gupta@atidan.com', 'Password@123', 'Password@123', 'Software Developer', 'Mumbai', 'Inactive'),
(47, 'pankaj.gupta', 'Pankaj Gupta', 'pankaj.gupta@razor-tech.com', 'Password@123', 'Password@123', 'Software Developer', 'Mumbai', 'Active'),
(48, 'manoj.hardwani', 'Manoj Hardwani', 'manoj.hardwani@atidan.com', 'Password@123', 'Password@123', 'Software Developer', 'Mumbai', 'Inactive'),
(49, 'manoj.hardwani', 'Manoj Hardwani', 'manoj.hardwani@razor-tech.com', 'Password@123', 'Password@123', 'Software Developer', 'Mumbai', 'Active');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
