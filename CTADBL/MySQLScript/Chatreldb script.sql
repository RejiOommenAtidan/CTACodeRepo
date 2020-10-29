use chatreldb;



CREATE TABLE `lstChatrel` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sChatrelKey` text NOT NULL,
  `nChatrelValue` int(11) NOT NULL,
  `dtChatrelFrom` date DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `lstChatrel` (`Id`, `sChatrelKey`, `nChatrelValue`, `dtChatrelFrom`, `dtEntered`, `nEnteredBy`) VALUES
(1, 'ChatrelAmount', '36', DATE_FORMAT(now(), "%Y-%m-%d"), now(), 1),
(2, 'ChatrelMeal', '10', DATE_FORMAT(now(), "%Y-%m-%d"), now(), 1),
(3, 'ChatrelSalaryAmt', '50', DATE_FORMAT(now(), "%Y-%m-%d"), now(), 1),
(4, 'ChatrelLateFeesPercentage', '10', DATE_FORMAT(now(), "%Y-%m-%d"), now(), 1),
(5, 'ChatrelStartYear', '2011', DATE_FORMAT(now(), "%Y-%m-%d"), now(), 1);




CREATE TABLE `tblChatrelPayment` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sGBId` varchar(255) DEFAULT NULL,
  `nchatrelAmount` int(11) DEFAULT NULL,
  `nchatrelMeal` int(11) DEFAULT NULL,
  `nchatrelYear` int(11) DEFAULT NULL,
  `nchatrelLateFeesPercentage` int(11) DEFAULT NULL,
  `nArrearsAmount` int(11) DEFAULT NULL,
  `dtArrearsFrom` date DEFAULT NULL,
  `dtArrearsTo` date DEFAULT NULL,
  `nchatrelSalaryAmt` int(11) DEFAULT NULL,
  `dtchatrelSalaryFrom` date DEFAULT NULL,
  `dtchatrelSalaryTo` date DEFAULT NULL,
  `nchatrelBusinessDonationAmt` int(11) DEFAULT NULL,
  `nchatrelTotalAmount` int(11) DEFAULT NULL,
  `nchatrelRecieptNumber` int(11) DEFAULT NULL,
  `nAuthRegionID` int(11) DEFAULT NULL,
  `sCountryID` varchar(255) DEFAULT NULL,
  `sPaymentStatus` varchar(255) DEFAULT NULL,
  `sPaymentMode` varchar(255) DEFAULT NULL,
  `sPaymentCurrency` varchar(255) DEFAULT NULL,
  `sPaidByGBId` varchar(255) DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=131071 DEFAULT CHARSET=latin1;



CREATE TABLE `lnkgbChatrel` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sGBId` varchar(255) DEFAULT NULL,
  `nChatrelAmount` int(11) NOT NULL,
  `nChatrelMeal` int(11) DEFAULT NULL,
  `nChatrelYear` int(11) DEFAULT NULL,
  `nChatrelLateFeesPercentage` int(11) DEFAULT NULL,
  `nArrearsAmount` int(11) DEFAULT NULL,
  `dtArrearsFrom` date DEFAULT NULL,
  `dtArrearsTo` date DEFAULT NULL,
  `nChatrelSalaryAmt` int(11) DEFAULT NULL,
  `dtChatrelSalaryFrom` date DEFAULT NULL,
  `dtChatrelSalaryTo` date DEFAULT NULL,
  `nChatrelBusinessDonationAmt` int(11) DEFAULT NULL,
  `nChatrelTotalAmount` int(11) DEFAULT NULL,
  `nChatrelRecieptNumber` int(11) DEFAULT NULL,
  `nAuthRegionID` int(11) DEFAULT NULL,
  `sCountryID` varchar(255) DEFAULT NULL,
  `sPaymentCurrency` varchar(255) DEFAULT NULL,
  `sPaidByGBId` varchar(255) DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=131071 DEFAULT CHARSET=latin1;

