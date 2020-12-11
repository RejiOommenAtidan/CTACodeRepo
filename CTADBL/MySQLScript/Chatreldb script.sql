use chatreldb;

CREATE TABLE `lnkgbchatrel` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `chatrelpaymentID` int(11) NOT NULL,
  `sGBId` varchar(255) DEFAULT NULL,
  `nChatrelAmount` decimal(15,2) NOT NULL,
  `nChatrelMeal` decimal(15,2) DEFAULT NULL,
  `nChatrelYear` int(11) DEFAULT NULL,
  `nChatrelLateFeesPercentage` int(11) DEFAULT NULL,
  `nChatrelLateFeesValue` decimal(15,2) DEFAULT NULL,
  `nArrearsAmount` decimal(15,2) DEFAULT NULL,
  `dtArrearsFrom` date DEFAULT NULL,
  `dtArrearsTo` date DEFAULT NULL,
  `nCurrentChatrelSalaryAmt` decimal(15,2) DEFAULT NULL,
  `dtCurrentChatrelFrom` date DEFAULT NULL,
  `dtCurrentChatrelTo` date DEFAULT NULL,
  `nChatrelTotalAmount` decimal(15,2) DEFAULT NULL,
  `sChatrelReceiptNumber` varchar(255) DEFAULT NULL,
  `nAuthRegionID` int(11) DEFAULT NULL,
  `sCountryID` varchar(255) DEFAULT NULL,
  `sPaymentCurrency` varchar(255) DEFAULT NULL,
  `sAuthRegionCurrency` varchar(255) DEFAULT NULL,
  `nConversionRate` decimal(15,4) DEFAULT NULL,
  `sPaidByGBId` varchar(255) DEFAULT NULL,
  `dtPayment` datetime DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) NOT NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `lnkgbchatreldonation` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `chatrelpaymentID` int(11) NOT NULL,
  `sGBId` varchar(255) DEFAULT NULL,
  `nChatrelAdditionalDonationAmt` decimal(15,2) DEFAULT NULL,
  `nChatrelBusinessDonationAmt` decimal(15,2) DEFAULT NULL,
  `sChatrelReceiptNumber` varchar(255) DEFAULT NULL,
  `nAuthRegionID` int(11) DEFAULT NULL,
  `sCountryID` varchar(255) DEFAULT NULL,
  `sPaymentCurrency` varchar(255) DEFAULT NULL,
  `sAuthRegionCurrency` varchar(255) DEFAULT NULL,
  `nConversionRate` decimal(15,4) DEFAULT NULL,
  `sPaidByGBId` varchar(255) DEFAULT NULL,
  `dtPayment` datetime DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) NOT NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `lnkgbchildren` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sGBIDParent` varchar(255) DEFAULT NULL,
  `sName` varchar(100) DEFAULT NULL,
  `dtDOB` datetime DEFAULT NULL,
  `sGender` varchar(1) DEFAULT NULL,
  `sChildID` varchar(50) DEFAULT NULL,
  `sGBIDChild` varchar(100) DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `sGBIDParent` (`sGBIDParent`)
) ENGINE=InnoDB AUTO_INCREMENT=109500 DEFAULT CHARSET=latin1;

CREATE TABLE `lnkgbFileDispute` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sGBId` varchar(255) DEFAULT NULL,
  `sSubject` varchar(500) DEFAULT NULL,
  `sEmailBody` VARCHAR(2000) DEFAULT NULL,
  `binFileDoc` longblob DEFAULT NULL,
  `sFileExtension` varchar(255) DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `GB_EMAIL_GBID` (`sGBId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `lnkgbrelation` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sGBID` varchar(255) DEFAULT NULL,
  `sGBIDRelation` varchar(255) DEFAULT NULL,
  `nRelationID` int(11) NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) NOT NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `GBID_RELATION` (`sGBIDRelation`,`nRelationID`)
) ENGINE=InnoDB AUTO_INCREMENT=39657 DEFAULT CHARSET=latin1;


CREATE TABLE `lstchatrel` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sChatrelKey` text NOT NULL,
  `nChatrelValue` int(11) NOT NULL,
  `dtChatrelFrom` date DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


CREATE TABLE `lstchatrelconfig` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sKey` text NOT NULL,
  `sValue` mediumtext NOT NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


CREATE TABLE `tblchatrelpayment` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sGBId` varchar(255) DEFAULT NULL,
  `nChatrelYear` int(11) DEFAULT NULL,
  `nChatrelTotalAmount` decimal(15,2) DEFAULT NULL,
  `sChatrelReceiptNumber` varchar(255) DEFAULT NULL,
  `sPaymentStatus` varchar(255) DEFAULT NULL,
  `sPaymentMode` varchar(255) DEFAULT NULL,
  `sPaymentCurrency` varchar(255) DEFAULT NULL,
  `sPaidByGBId` varchar(255) DEFAULT NULL,
  `sPayPal_Status` varchar(255) DEFAULT NULL,
  `sPayPal_ID` varchar(255) DEFAULT NULL,
  `sPayPal_Currency_Code` varchar(255) DEFAULT NULL,
  `sPayPal_Currency_Value` varchar(255) DEFAULT NULL,
  `sPayPal_Response_Object` varchar(5000) DEFAULT NULL,
  `dtPayment` datetime DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) NOT NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;





CREATE TABLE `tblgreenbook` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sGBID` varchar(255) DEFAULT NULL,
  `nAuthRegionID` int(11) NOT NULL,
  `sFirstName` varchar(255) DEFAULT NULL,
  `sMiddleName` varchar(255) DEFAULT NULL,
  `sLastName` varchar(255) DEFAULT NULL,
  `sFamilyName` varchar(255) DEFAULT NULL,
  `dtDOB` date DEFAULT NULL,
  `sMarried` varchar(255) DEFAULT NULL,
  `sFathersName` varchar(255) DEFAULT NULL,
  `sFathersID` varchar(255) DEFAULT NULL,
  `sFathersGBID` varchar(255) DEFAULT NULL,
  `sMothersName` varchar(255) DEFAULT NULL,
  `sMothersID` varchar(255) DEFAULT NULL,
  `sMothersGBID` varchar(255) DEFAULT NULL,
  `sSpouseName` varchar(255) DEFAULT NULL,
  `sSpouseID` varchar(255) DEFAULT NULL,
  `sSpouseGBID` varchar(255) DEFAULT NULL,
  `nChildrenM` int(11) NOT NULL,
  `nChildrenF` int(11) NOT NULL,
  `sEmail` varchar(255) DEFAULT NULL,
  `sPhone` varchar(255) DEFAULT NULL,
  `sFax` varchar(255) DEFAULT NULL,
  `sPaidUntil` text NOT NULL,
  `sLoginGmail` varchar(255) DEFAULT NULL,
  `dtLastSuccessfullLogin` DateTime DEFAULT NULL,
  `sEnteredDateTime` text DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) NOT NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `nAuthRegionID` (`nAuthRegionID`),
  KEY `GREENBOOK_GBID` (`sGBID`)
) ENGINE=InnoDB AUTO_INCREMENT=312459 DEFAULT CHARSET=utf8;

CREATE TABLE `lstcountry` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `sCountryID` text DEFAULT NULL,
  `sCountry` text DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) NOT NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=241 DEFAULT CHARSET=utf8;


CREATE TABLE `lstauthregion` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `sAuthRegion` text NOT NULL,
  `sCountryID` text NOT NULL,
  `sCurrencyCode` text NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) NOT NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=168 DEFAULT CHARSET=latin1;


CREATE TABLE `lstrelation` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sRelation` text NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) NOT NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;


CREATE TABLE `tblauditlog` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `dtEntered` datetime DEFAULT NULL,
  `nFeatureID` int(11) NOT NULL,
  `nRegionID` int(11) DEFAULT NULL,
  `nRecordID` int(11) NOT NULL,
  `sGBID` varchar(255) DEFAULT NULL,
  `sFieldValuesOld` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `sFieldValuesNew` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `nEnteredBy` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `tblactionlogger` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sActionType` varchar(255) DEFAULT NULL,
  `sModuleName` varchar(255) DEFAULT NULL,
  `sEventName` varchar(255) DEFAULT NULL,
  `sDescription` varchar(255) DEFAULT NULL,
  `sStackTrace` varchar(255) DEFAULT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--- -------------------------------------------------------------------------
--- Data Migration From CTADB to ChatrelDB
--- -------------------------------------------------------------------------

INSERT INTO `chatreldb`.`tblgreenbook`
(`Id`,
`sGBID`,
`nAuthRegionID`,
`sFirstName`,
`sMiddleName`,
`sLastName`,
`sFamilyName`,
`dtDOB`,
`sMarried`,
`sFathersName`,
`sFathersID`,
`sFathersGBID`,
`sMothersName`,
`sMothersID`,
`sMothersGBID`,
`sSpouseName`,
`sSpouseID`,
`sSpouseGBID`,
`nChildrenM`,
`nChildrenF`,
`sEmail`,
`sPhone`,
`sFax`,
`sPaidUntil`,
`sEnteredDateTime`,
`dtEntered`,
`nEnteredBy`,
`dtUpdated`,
`nUpdatedBy`)
SELECT 
	`tblgreenbook`.`Id`,
    `tblgreenbook`.`sGBID`,
    `tblgreenbook`.`nAuthRegionID`,
    `tblgreenbook`.`sFirstName`,
    `tblgreenbook`.`sMiddleName`,
    `tblgreenbook`.`sLastName`,
    `tblgreenbook`.`sFamilyName`,
    `tblgreenbook`.`dtDOB`,
    `tblgreenbook`.`sMarried`,
    `tblgreenbook`.`sFathersName`,
    `tblgreenbook`.`sFathersID`,
    `tblgreenbook`.`sFathersGBID`,
    `tblgreenbook`.`sMothersName`,
    `tblgreenbook`.`sMothersID`,
    `tblgreenbook`.`sMothersGBID`,
    `tblgreenbook`.`sSpouseName`,
    `tblgreenbook`.`sSpouseID`,
    `tblgreenbook`.`sSpouseGBID`,
    `tblgreenbook`.`nChildrenM`,
    `tblgreenbook`.`nChildrenF`,
    `tblgreenbook`.`sEmail`,
    `tblgreenbook`.`sPhone`,
    `tblgreenbook`.`sFax`,
    `tblgreenbook`.`sPaidUntil`,
    `tblgreenbook`.`sEnteredDateTime`,
    `tblgreenbook`.`dtEntered`,
    `tblgreenbook`.`nEnteredBy`,
    `tblgreenbook`.`dtUpdated`,
    `tblgreenbook`.`nUpdatedBy`
FROM `ctadb`.`tblgreenbook`;


INSERT INTO `chatreldb`.`lstchatrelconfig`
(`Id`,
`sKey`,
`sValue`,
`dtUpdated`,
`nUpdatedBy`)
SELECT 
	`Id`,
	`sKey`,
	`sValue`,
	`dtUpdated`,
	`nUpdatedBy` 
FROM ctadb.lstctaconfig;

INSERT INTO `chatreldb`.`lstchatrel`
(`Id`,
`sChatrelKey`,
`nChatrelValue`,
`dtChatrelFrom`,
`dtEntered`,
`nEnteredBy`)
SELECT 
	`Id`,
	`sChatrelKey`,
	`nChatrelValue`,
	`dtChatrelFrom`,
	`dtEntered`,
	`nEnteredBy` 
FROM ctadb.lstchatrel;

INSERT INTO `chatreldb`.`lstauthregion`
(`ID`,
`sAuthRegion`,
`sCountryID`,
`sCurrencyCode`,
`dtEntered`,
`nEnteredBy`,
`dtUpdated`,
`nUpdatedBy`)
SELECT 
	`ID`,
	`sAuthRegion`,
	`sCountryID`,
	`sCurrencyCode`,
	`dtEntered`,
	`nEnteredBy`,
	`dtUpdated`,
	`nUpdatedBy` 
FROM ctadb.lstauthregion;

INSERT INTO `chatreldb`.`lstcountry`
(`ID`,
`sCountryID`,
`sCountry`,
`dtEntered`,
`nEnteredBy`,
`dtUpdated`,
`nUpdatedBy`)

SELECT `lstcountry`.`ID`,
    `lstcountry`.`sCountryID`,
    `lstcountry`.`sCountry`,
    `lstcountry`.`dtEntered`,
    `lstcountry`.`nEnteredBy`,
    `lstcountry`.`dtUpdated`,
    `lstcountry`.`nUpdatedBy`
FROM `ctadb`.`lstcountry`;



INSERT INTO `chatreldb`.`lnkgbrelation`
(`Id`,
`sGBID`,
`sGBIDRelation`,
`nRelationID`,
`dtEntered`,
`nEnteredBy`,
`dtUpdated`,
`nUpdatedBy`)
SELECT 
	`Id`,
	`sGBID`,
	`sGBIDRelation`,
	`nRelationID`,
	`dtEntered`,
	`nEnteredBy`,
	`dtUpdated`,
	`nUpdatedBy` 
FROM ctadb.lnkgbrelation;


INSERT INTO `chatreldb`.`lnkgbchildren`
(`Id`,
`sGBIDParent`,
`sName`,
`dtDOB`,
`sGender`,
`sChildID`,
`sGBIDChild`,
`dtEntered`,
`nEnteredBy`)
SELECT 
	`Id`,
	`sGBIDParent`,
	`sName`,
	`dtDOB`,
	`sGender`,
	`sChildID`,
	`sGBIDChild`,
	`dtEntered`,
	`nEnteredBy` 
FROM ctadb.lnkgbchildren;



INSERT INTO `chatreldb`.`lstrelation`
(`Id`,
`sRelation`,
`dtEntered`,
`nEnteredBy`,
`dtUpdated`,
`nUpdatedBy`)

SELECT 
	`Id`,
	`sRelation`,
	`dtEntered`,
	`nEnteredBy`,
	`dtUpdated`,
	`nUpdatedBy`
FROM ctadb.lstrelation;


INSERT INTO `ctadb`.`tblchatrelpayment`
(
`sGBId`,
`nChatrelYear`,
`nChatrelTotalAmount`,
`sChatrelReceiptNumber`,
`sPaymentStatus`,
`sPaymentMode`,
`sPaymentCurrency`,
`sPaidByGBId`,
`sPayPal_Status`,
`sPayPal_ID`,
`sPayPal_Currency_Code`,
`sPayPal_Currency_Value`,
`sPayPal_Response_Object`,
`dtPayment`,
`dtEntered`,
`nEnteredBy`,
`dtUpdated`,
`nUpdatedBy`)
SELECT 
    `tblchatrelpayment`.`sGBId`,
    `tblchatrelpayment`.`nChatrelYear`,
    `tblchatrelpayment`.`nChatrelTotalAmount`,
    `tblchatrelpayment`.`sChatrelReceiptNumber`,
    `tblchatrelpayment`.`sPaymentStatus`,
    `tblchatrelpayment`.`sPaymentMode`,
    `tblchatrelpayment`.`sPaymentCurrency`,
    `tblchatrelpayment`.`sPaidByGBId`,
    `tblchatrelpayment`.`sPayPal_Status`,
    `tblchatrelpayment`.`sPayPal_ID`,
    `tblchatrelpayment`.`sPayPal_Currency_Code`,
    `tblchatrelpayment`.`sPayPal_Currency_Value`,
    `tblchatrelpayment`.`sPayPal_Response_Object`,
    `tblchatrelpayment`.`dtPayment`,
    `tblchatrelpayment`.`dtEntered`,
    `tblchatrelpayment`.`nEnteredBy`,
    `tblchatrelpayment`.`dtUpdated`,
    `tblchatrelpayment`.`nUpdatedBy`
FROM `ctadb`.`tblchatrelpayment`;


INSERT INTO `lnkgbchatrel`
(`Id`,
`chatrelpaymentID`,
`sGBId`,
`nChatrelAmount`,
`nChatrelMeal`,
`nChatrelYear`,
`nChatrelLateFeesPercentage`,
`nChatrelLateFeesValue`,
`nArrearsAmount`,
`dtArrearsFrom`,
`dtArrearsTo`,
`nCurrentChatrelSalaryAmt`,
`dtCurrentChatrelFrom`,
`dtCurrentChatrelTo`,
`nChatrelTotalAmount`,
`sChatrelReceiptNumber`,
`nAuthRegionID`,
`sCountryID`,
`sPaymentCurrency`,
`sAuthRegionCurrency`,
`nConversionRate`,
`sPaidByGBId`,
`dtPayment`,
`dtEntered`,
`nEnteredBy`,
`dtUpdated`,
`nUpdatedBy`)
SELECT `lnkgbchatrel`.`Id`,
    `lnkgbchatrel`.`chatrelpaymentID`,
    `lnkgbchatrel`.`sGBId`,
    `lnkgbchatrel`.`nChatrelAmount`,
    `lnkgbchatrel`.`nChatrelMeal`,
    `lnkgbchatrel`.`nChatrelYear`,
    `lnkgbchatrel`.`nChatrelLateFeesPercentage`,
    `lnkgbchatrel`.`nChatrelLateFeesValue`,
    `lnkgbchatrel`.`nArrearsAmount`,
    `lnkgbchatrel`.`dtArrearsFrom`,
    `lnkgbchatrel`.`dtArrearsTo`,
    `lnkgbchatrel`.`nCurrentChatrelSalaryAmt`,
    `lnkgbchatrel`.`dtCurrentChatrelFrom`,
    `lnkgbchatrel`.`dtCurrentChatrelTo`,
    `lnkgbchatrel`.`nChatrelTotalAmount`,
    `lnkgbchatrel`.`sChatrelReceiptNumber`,
    `lnkgbchatrel`.`nAuthRegionID`,
    `lnkgbchatrel`.`sCountryID`,
    `lnkgbchatrel`.`sPaymentCurrency`,
    `lnkgbchatrel`.`sAuthRegionCurrency`,
    `lnkgbchatrel`.`nConversionRate`,
    `lnkgbchatrel`.`sPaidByGBId`,
    `lnkgbchatrel`.`dtPayment`,
    `lnkgbchatrel`.`dtEntered`,
    `lnkgbchatrel`.`nEnteredBy`,
    `lnkgbchatrel`.`dtUpdated`,
    `lnkgbchatrel`.`nUpdatedBy`
FROM `ctadb`.`lnkgbchatrel`;

