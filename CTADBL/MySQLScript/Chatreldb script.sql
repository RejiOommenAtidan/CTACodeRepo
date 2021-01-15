use chatreldb;

CREATE TABLE `lnkgbchatrel` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `chatrelpaymentID` int(11) NOT NULL,
  `sGBId` varchar(255) NOT NULL,
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
  `dtEntered` datetime Not NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime Not NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000000 ;

CREATE TABLE `lnkgbchatrelDonation` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `chatrelpaymentID` int(11) NOT NULL,
  `sGBId` varchar(255) NOT NULL,
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
  `dtEntered` datetime Not NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime Not NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000000 ;

CREATE TABLE `lnkGBChildren` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sGBIDParent` varchar(255) NOT NULL,
  `sName` varchar(100) DEFAULT NULL,
  `dtDOB` date DEFAULT NULL,
  `sGender` varchar(1) DEFAULT NULL,
  `sChildID` varchar(50) DEFAULT NULL,
  `sGBIDChild` varchar(100) DEFAULT NULL,
  `dtEntered` datetime Not NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime Not NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`ID`),
  KEY `sGBIDParent` (`sGBIDParent`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

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
) ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE `lnkGBRelation` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sGBID` varchar(255) NOT NULL,
  `sGBIDRelation` varchar(255) DEFAULT NULL,
  `nRelationID` int(11) NOT NULL,
  `dtEntered` datetime Not NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime Not NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;


CREATE TABLE `lstChatrel` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sChatrelKey` text NOT NULL,
  `nChatrelValue` int(11) NOT NULL,
  `dtChatrelFrom` date DEFAULT NULL,
  `dtEntered` datetime Not NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime Not NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

CREATE TABLE `lstAuthRegion` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `sAuthRegion` text NOT NULL,
  `sCountryID` text NOT NULL,
  `sCurrencyCode` text DEFAULT NULL,
  `dtEntered` datetime Not NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime Not NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

CREATE TABLE `lstchatrelconfig` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sKey` text NOT NULL,
  `sValue` mediumtext NOT NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

CREATE TABLE `lstCountry` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `sCountryID` text DEFAULT NULL,
  `sCountry` text DEFAULT NULL,
  `nDefaultAuthRegionID` int(11) NULL,
  `dtEntered` datetime Not NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime Not NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE `lstRelation` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sRelation` text NOT NULL,
  `dtEntered` datetime Not NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime Not NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

CREATE TABLE `tblAuditLog` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `dtEntered` datetime NOT NULL,
  `nFeatureID` int(11) NOT NULL,
  `nRegionID` int(11) DEFAULT NULL,
  `nRecordID` int(11) NOT NULL,
  `sGBID` varchar(255) DEFAULT NULL,
  `sFieldValuesOld` text NOT NULL,
  `sFieldValuesNew` text NOT NULL,
  `nEnteredBy` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;


CREATE TABLE `tblchatrelpayment` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sGBId` varchar(255) NOT NULL,
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
  `dtEntered` datetime Not NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime Not NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000000 ;





CREATE TABLE `tblgreenbook` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sGBID` varchar(255) DEFAULT NULL,
  `nAuthRegionID` int(11) NOT NULL,
  `sFirstName` varchar(255) DEFAULT NULL,
  `sMiddleName` varchar(255) DEFAULT NULL,
  `sLastName` varchar(255) DEFAULT NULL,
  `sFamilyName` varchar(255) DEFAULT NULL,
  `sGender` varchar(255) DEFAULT NULL,
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
  `sCountryID` varchar(255) DEFAULT NULL,
  `sPaidUntil` text NOT NULL,
  `sLoginGmail` varchar(255) DEFAULT NULL,
  `dtLastSuccessfullLogin` DateTime DEFAULT NULL,
  `dtEntered` datetime Not NULL,
  `nEnteredBy` int(11) Not NULL,
  `dtUpdated` datetime Not NULL,
  `nUpdatedBy` int(11) Not NULL,
  PRIMARY KEY (`Id`),
  KEY `nAuthRegionID` (`nAuthRegionID`),
  KEY `GREENBOOK_GBID` (`sGBID`)
) ENGINE=InnoDB AUTO_INCREMENT=1;


CREATE TABLE `tblActionLogger` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `sActionType` varchar(255) DEFAULT NULL,
  `sModuleName` varchar(255) DEFAULT NULL,
  `sEventName` varchar(255) DEFAULT NULL,
  `sDescription` text DEFAULT NULL,
  `sStackTrace` text DEFAULT NULL,
  `dtEntered` datetime Not NULL,
  `nEnteredBy` int(11) Not NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;

CREATE INDEX CHATREL_GREENBOOK_GBID ON tblgreenbook(sGBID);
CREATE INDEX CHATREL_GBID_RELATION ON lnkgbrelation(sgbidrelation, nrelationid);
--- -------------------------------------------------------------------------
--- Data Migration From CTADB to ChatrelDB
--- -------------------------------------------------------------------------
INSERT INTO `tblgreenbook`
(`Id`,
`sGBID`,
`nAuthRegionID`,
`sFirstName`,
`sMiddleName`,
`sLastName`,
`sFamilyName`,
`sGender`,
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
`sCountryID`,
`sPaidUntil`,
`sLoginGmail`,
`dtLastSuccessfullLogin`,
`dtEntered`,
`nEnteredBy`,
`dtUpdated`,
`nUpdatedBy`)
SELECT `tblgreenbook`.`Id`,
    `tblgreenbook`.`sGBID`,
    `tblgreenbook`.`nAuthRegionID`,
    `tblgreenbook`.`sFirstName`,
    `tblgreenbook`.`sMiddleName`,
    `tblgreenbook`.`sLastName`,
    `tblgreenbook`.`sFamilyName`,
    `tblgreenbook`.`sGender`,
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
	`tblgreenbook`.`sCountryID`,
    `tblgreenbook`.`sPaidUntil`,
    `tblgreenbook`.`sLoginGmail`,
    `tblgreenbook`.`dtLastSuccessfullLogin`,
    `tblgreenbook`.`dtEntered`,
    `tblgreenbook`.`nEnteredBy`,
    `tblgreenbook`.`dtUpdated`,
    `tblgreenbook`.`nUpdatedBy`
FROM `ctadb`.`tblgreenbook`;


INSERT INTO `lstchatrelconfig`
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

INSERT INTO `lstchatrel`
(`Id`,
`sChatrelKey`,
`nChatrelValue`,
`dtChatrelFrom`,
`dtEntered`,
`nEnteredBy`,
`dtUpdated`,
`nUpdatedBy`)
SELECT 
	`Id`,
	`sChatrelKey`,
	`nChatrelValue`,
	`dtChatrelFrom`,
	`dtEntered`,
	`nEnteredBy`,
	`dtUpdated`,
	`nUpdatedBy`  
FROM ctadb.lstchatrel;

INSERT INTO `lstauthregion`
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

INSERT INTO `lstcountry`
(`ID`,
`sCountryID`,
`sCountry`,
`nDefaultAuthRegionID`,
`dtEntered`,
`nEnteredBy`,
`dtUpdated`,
`nUpdatedBy`)

SELECT `lstcountry`.`ID`,
    `lstcountry`.`sCountryID`,
    `lstcountry`.`sCountry`,
	`lstcountry`.`nDefaultAuthRegionID`,
    `lstcountry`.`dtEntered`,
    `lstcountry`.`nEnteredBy`,
    `lstcountry`.`dtUpdated`,
    `lstcountry`.`nUpdatedBy`
FROM `ctadb`.`lstcountry`;



INSERT INTO `lnkgbrelation`
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


INSERT INTO `lnkgbchildren`
(`Id`,
`sGBIDParent`,
`sName`,
`dtDOB`,
`sGender`,
`sChildID`,
`sGBIDChild`,
`dtEntered`,
`nEnteredBy`,
`dtUpdated`,
`nUpdatedBy` )
SELECT 
	`Id`,
	`sGBIDParent`,
	`sName`,
	if(`dtDOB`='0000-00-00',null,`dtDOB`) as dtDOB,
	`sGender`,
	`sChildID`,
	`sGBIDChild`,
	`dtEntered`,
	`nEnteredBy`,
	`dtUpdated`,
	`nUpdatedBy` 
FROM ctadb.lnkgbchildren;

SET SQL_SAFE_UPDATES=0;

update `lnkgbchildren` 
set `dtDOB` = null
where `dtDOB` like '%-00%';

INSERT INTO `lstrelation`
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

UPDATE `lstchatrel` SET `dtChatrelFrom` = '2000-04-01' WHERE (`Id` = '1');
UPDATE `lstchatrel` SET `dtChatrelFrom` = '2000-04-01' WHERE (`Id` = '2');
UPDATE `lstchatrel` SET `dtChatrelFrom` = '2000-04-01' WHERE (`Id` = '3');
UPDATE `lstchatrel` SET `dtChatrelFrom` = '2000-04-01' WHERE (`Id` = '4');
UPDATE `lstchatrel` SET `dtChatrelFrom` = '2000-04-01' WHERE (`Id` = '5');
UPDATE `lstchatrel` SET `dtChatrelFrom` = '2000-04-01' WHERE (`Id` = '6');
UPDATE `lstchatrel` SET `dtChatrelFrom` = '2000-04-01' WHERE (`Id` = '7');
UPDATE `lstchatrel` SET `dtChatrelFrom` = '2000-04-01' WHERE (`Id` = '8');
UPDATE `lstchatrel` SET `dtChatrelFrom` = '2000-04-01' WHERE (`Id` = '9');
UPDATE `lstchatrel` SET `dtChatrelFrom` = '2000-04-01' WHERE (`Id` = '10');
 

INSERT INTO `tblchatrelpayment`
(`Id`,
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
SELECT `tblchatrelpayment`.`Id`,
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

INSERT INTO `lnkgbchatreldonation`
(`Id`,
`chatrelpaymentID`,
`sGBId`,
`nChatrelAdditionalDonationAmt`,
`nChatrelBusinessDonationAmt`,
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
SELECT `lnkgbchatreldonation`.`Id`,
    `lnkgbchatreldonation`.`chatrelpaymentID`,
    `lnkgbchatreldonation`.`sGBId`,
    `lnkgbchatreldonation`.`nChatrelAdditionalDonationAmt`,
    `lnkgbchatreldonation`.`nChatrelBusinessDonationAmt`,
    `lnkgbchatreldonation`.`sChatrelReceiptNumber`,
    `lnkgbchatreldonation`.`nAuthRegionID`,
    `lnkgbchatreldonation`.`sCountryID`,
    `lnkgbchatreldonation`.`sPaymentCurrency`,
    `lnkgbchatreldonation`.`sAuthRegionCurrency`,
    `lnkgbchatreldonation`.`nConversionRate`,
    `lnkgbchatreldonation`.`sPaidByGBId`,
    `lnkgbchatreldonation`.`dtPayment`,
    `lnkgbchatreldonation`.`dtEntered`,
    `lnkgbchatreldonation`.`nEnteredBy`,
    `lnkgbchatreldonation`.`dtUpdated`,
    `lnkgbchatreldonation`.`nUpdatedBy`
FROM `ctadb`.`lnkgbchatreldonation`;
