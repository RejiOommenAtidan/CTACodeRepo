
use ctauatdb;
-- SELECT @@GLOBAL.sql_mode global, @@SESSION.sql_mode session;

-- set session sql_mode = ''

Insert into tbluser
(
    `tbluser`.`Id`,
    `tbluser`.`_Id`,
    `tbluser`.`sUsername`,
    `tbluser`.`sFullName`,
    `tbluser`.`sOffice`,
    `tbluser`.`sPassword`,
    `tbluser`.`nUserRightsId`,
    `tbluser`.`bActive`,
    `tbluser`.`dtEntered`,
    `tbluser`.`nEnteredBy`,
    `tbluser`.`dtUpdated`,
    `tbluser`.`nUpdatedBy`
)
SELECT `tbluser`.`Id`,
    `tbluser`.`_Id`,
    `tbluser`.`sUsername`,
    `tbluser`.`sFullName`,
    `tbluser`.`sOffice`,
    `tbluser`.`sPassword`,
    `tbluser`.`nUserRightsId`,
    `tbluser`.`bActive`,
    `tbluser`.`dtEntered`,
    `tbluser`.`nEnteredBy`,
    `tbluser`.`dtUpdated`,
    `tbluser`.`nUpdatedBy`
FROM `ctadb`.`tbluser`;


INSERT INTO `tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `bActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`) 
	VALUES ('pankaj', 'Pankaj Gupta', 'TCRC Office', 'pankaj123', '5', '1',now(),1,now(),1);

INSERT INTO `tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `bActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`) 
	VALUES ('reji', 'Reji Oommen', 'TCRC Office', 'reji123', '5', '1',now(),1,now(),1);

INSERT INTO `tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `bActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`) 
	VALUES ('malay', 'Malay', 'TCRC Office', 'malay123', '5', '1',now(),1,now(),1);

INSERT INTO `tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `bActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`) 
	VALUES ('aayush', 'Aayush', 'TCRC Office', 'aayush123', '5', '1',now(),1,now(),1);
	
INSERT INTO `tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `bActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`)
	VALUES ('rajen', 'Rajen', 'TCRC Office', 'rajen123', '5', '1',now(),1,now(),1);
	
INSERT INTO `tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `bActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`)
	VALUES ('kamlesh', 'Kamlesh', 'TCRC Office', 'kamlesh123', '5', '1',now(),1,now(),1);
    
SET sql_mode = 'allow_invalid_dates';
-- SET SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

insert into  tblgreenbook
(
`tblgreenbook`.`_Id`,
    `tblgreenbook`.`sGBID`,
    `tblgreenbook`.`nAuthRegionID`,
    `tblgreenbook`.`sFirstName`,
    `tblgreenbook`.`sMiddleName`,
    `tblgreenbook`.`sLastName`,
    `tblgreenbook`.`sFamilyName`,
    `tblgreenbook`.`sGender`,
    `tblgreenbook`.`dtDOB`,
    `tblgreenbook`.`sDOBApprox`,
    `tblgreenbook`.`sBirthPlace`,
    `tblgreenbook`.`sBirthCountryID`,
    `tblgreenbook`.`sOriginVillage`,
    `tblgreenbook`.`sOriginProvinceID`,
    `tblgreenbook`.`sMarried`,
    `tblgreenbook`.`sOtherDocuments`,
    `tblgreenbook`.`sResidenceNumber`,
    `tblgreenbook`.`sQualificationID`,
    `tblgreenbook`.`sOccupationID`,
    `tblgreenbook`.`sAliasName`,
    `tblgreenbook`.`sOldGreenBKNo`,
    `tblgreenbook`.`sFstGreenBkNo`,
    `tblgreenbook`.`dtFormDate`,
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
    `tblgreenbook`.`sAddress1`,
    `tblgreenbook`.`sAddress2`,
    `tblgreenbook`.`sCity`,
    `tblgreenbook`.`sState`,
    `tblgreenbook`.`sPCode`,
    `tblgreenbook`.`sCountryID`,
    `tblgreenbook`.`sEmail`,
    `tblgreenbook`.`sPhone`,
    `tblgreenbook`.`sFax`,
    `tblgreenbook`.`dtDeceased`,
    `tblgreenbook`.`sBookIssued`,
    `tblgreenbook`.`dtValidityDate`,
    `tblgreenbook`.`sPaidUntil`,
    `tblgreenbook`.`TibetanName`,
    `tblgreenbook`.`TBUPlaceOfBirth`,
    `tblgreenbook`.`TBUOriginVillage`,
    `tblgreenbook`.`TBUFathersName`,
    `tblgreenbook`.`TBUMothersName`,
    `tblgreenbook`.`TBUSpouseName`,
    `tblgreenbook`.`sEnteredDateTime`,
    `tblgreenbook`.`dtEntered`,
    `tblgreenbook`.`nEnteredBy`,
    `tblgreenbook`.`dtUpdated`,
    `tblgreenbook`.`nUpdatedBy`
)
SELECT 
    `tblgreenbook`.`_Id`,
    `tblgreenbook`.`sGBID`,
    `tblgreenbook`.`nAuthRegionID`,
    `tblgreenbook`.`sFirstName`,
    `tblgreenbook`.`sMiddleName`,
    `tblgreenbook`.`sLastName`,
    `tblgreenbook`.`sFamilyName`,
    `tblgreenbook`.`sGender`,
    `tblgreenbook`.`dtDOB`,
    `tblgreenbook`.`sDOBApprox`,
    `tblgreenbook`.`sBirthPlace`,
    `tblgreenbook`.`sBirthCountryID`,
    `tblgreenbook`.`sOriginVillage`,
    `tblgreenbook`.`sOriginProvinceID`,
    `tblgreenbook`.`sMarried`,
    `tblgreenbook`.`sOtherDocuments`,
    `tblgreenbook`.`sResidenceNumber`,
    `tblgreenbook`.`sQualificationID`,
    `tblgreenbook`.`sOccupationID`,
    `tblgreenbook`.`sAliasName`,
    `tblgreenbook`.`sOldGreenBKNo`,
    `tblgreenbook`.`sFstGreenBkNo`,
    `tblgreenbook`.`dtFormDate`,
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
    `tblgreenbook`.`sAddress1`,
    `tblgreenbook`.`sAddress2`,
    `tblgreenbook`.`sCity`,
    `tblgreenbook`.`sState`,
    `tblgreenbook`.`sPCode`,
    `tblgreenbook`.`sCountryID`,
    `tblgreenbook`.`sEmail`,
    `tblgreenbook`.`sPhone`,
    `tblgreenbook`.`sFax`,
    `tblgreenbook`.`dtDeceased`,
    `tblgreenbook`.`sBookIssued`,
    `tblgreenbook`.`dtValidityDate`,
    `tblgreenbook`.`sPaidUntil`,
    `tblgreenbook`.`TibetanName`,
    `tblgreenbook`.`TBUPlaceOfBirth`,
    `tblgreenbook`.`TBUOriginVillage`,
    `tblgreenbook`.`TBUFathersName`,
    `tblgreenbook`.`TBUMothersName`,
    `tblgreenbook`.`TBUSpouseName`,
    `tblgreenbook`.`sEnteredDateTime`,
    `tblgreenbook`.`dtEntered`,
    `tblgreenbook`.`nEnteredBy`,
    `tblgreenbook`.`dtUpdated`,
    `tblgreenbook`.`nUpdatedBy`
FROM `ctadb`.`tblgreenbook`;


Insert into tblmadeb
(
    `tblmadeb`.`_Id`,
    `tblmadeb`.`nFormNumber`,
    `tblmadeb`.`sGBID`,
    `tblmadeb`.`nMadebTypeID`,
    `tblmadeb`.`sName`,
    `tblmadeb`.`sFathersName`,
    `tblmadeb`.`nAuthRegionID`,
    `tblmadeb`.`dtReceived`,
    `tblmadeb`.`dtIssueAction`,
    `tblmadeb`.`nIssuedOrNotID`,
    `tblmadeb`.`nType`,
    `tblmadeb`.`sChangeField`,
    `tblmadeb`.`sOfficeOfTibetan`,
    `tblmadeb`.`sDocumentAttached`,
    `tblmadeb`.`nCurrentGBSno`,
    `tblmadeb`.`nPreviousGBSno`,
    `tblmadeb`.`nSaneyFormNo`,
    `tblmadeb`.`nReceiptNo`,
    `tblmadeb`.`dtEmailSend`,
    `tblmadeb`.`sAlias`,
    `tblmadeb`.`sApprovedReject`,
    `tblmadeb`.`nMadebStatusID`,
    `tblmadeb`.`sMadebStatusRemark`,
    `tblmadeb`.`dtReject`,
    `tblmadeb`.`dtReturnEmail`,
    `tblmadeb`.`dtEntered`,
    `tblmadeb`.`nEnteredBy`,
    `tblmadeb`.`dtUpdated`,
    `tblmadeb`.`nUpdatedBy`
)
SELECT 
    `tblmadeb`.`_Id`,
    `tblmadeb`.`nFormNumber`,
    `tblmadeb`.`sGBID`,
    `tblmadeb`.`nMadebTypeID`,
    `tblmadeb`.`sName`,
    `tblmadeb`.`sFathersName`,
    `tblmadeb`.`nAuthRegionID`,
    `tblmadeb`.`dtReceived`,
    `tblmadeb`.`dtIssueAction`,
    `tblmadeb`.`nIssuedOrNotID`,
    `tblmadeb`.`nType`,
    `tblmadeb`.`sChangeField`,
    `tblmadeb`.`sOfficeOfTibetan`,
    `tblmadeb`.`sDocumentAttached`,
    `tblmadeb`.`nCurrentGBSno`,
    `tblmadeb`.`nPreviousGBSno`,
    `tblmadeb`.`nSaneyFormNo`,
    `tblmadeb`.`nReceiptNo`,
    `tblmadeb`.`dtEmailSend`,
    `tblmadeb`.`sAlias`,
    `tblmadeb`.`sApprovedReject`,
    `tblmadeb`.`nMadebStatusID`,
    `tblmadeb`.`sMadebStatusRemark`,
    `tblmadeb`.`dtReject`,
    `tblmadeb`.`dtReturnEmail`,
    `tblmadeb`.`dtEntered`,
    `tblmadeb`.`nEnteredBy`,
    `tblmadeb`.`dtUpdated`,
    `tblmadeb`.`nUpdatedBy`
FROM `ctadb`.`tblmadeb`;

SET SQL_SAFE_UPDATES=0;

update `tblgreenbook` 
set `dtDOB` = null
where `dtDOB` like '%-00%';

update `tblmadeb` 
set `dtReceived` = null
where `dtReceived` =  '0000-00-00';
 
update `tblmadeb` 
set `dtIssueAction` = null
where `dtIssueAction` =  '0000-00-00';
 
update `tblmadeb` 
set `dtEmailSend` = null
where `dtEmailSend` =  '0000-00-00';
 
update `tblmadeb` 
set `dtReject` = null
where `dtReject` = '0000-00-00';
 
update `tblmadeb` 
set `dtReturnEmail` = null
where `dtReturnEmail` = '0000-00-00';


update `tblmadeb` 
set `dtReturnEmail` = null
where `dtReturnEmail` like '%-00%';

update `tblmadeb` 
set `dtReceived` = null
where `dtReceived` like '%-00%';
 
update `tblmadeb` 
set `dtIssueAction` = null
where `dtIssueAction` like '%-00%';
 
update `tblmadeb` 
set `dtEmailSend` = null
where `dtEmailSend` like '%-00%';
 
update `tblmadeb` 
set `dtReject` = null
where `dtReject` like '%-00%';

update `tblmadeb` 
set `dtReturnEmail` = null
where `dtReturnEmail` like '0000%';

update `tblmadeb` 
set `dtReceived` = null
where `dtReceived` like '0000%';
 
update `tblmadeb` 
set `dtIssueAction` = null
where `dtIssueAction` like '0000%';
 
update `tblmadeb` 
set `dtEmailSend` = null
where `dtEmailSend` like '0000%';
 
update `tblmadeb` 
set `dtReject` = null
where `dtReject` like '0000%';


 
update `tblmadeb` 
set `sName` = null
where `sName` = '';
 
update `tblgreenbook` 
set `dtDOB` = null
where `dtDOB` =  '0000-00-00';
 
update `tblgreenbook` 
set `dtFormDate` = null
where `dtFormDate` =  '0000-00-00';

update `tblgreenbook` 
set `dtDeceased` = null
where `dtDeceased` =  '0000-00-00';

update `tblgreenbook` 
set `dtValidityDate` = null
where `dtValidityDate` =  '0000-00-00';


INSERT INTO `tblgivengbid`
SELECT  `tblgivengbid`.`Id`,
    `tblgivengbid`.`_Id`,
    `tblgivengbid`.`nGBId`,
    `tblgivengbid`.`nFormNo`,
    `tblgivengbid`.`dtDate`,
    `tblgivengbid`.`bGivenOrNot`,
    `tblgivengbid`.`bActive`,
    `tblgivengbid`.`dtEntered`,
    `tblgivengbid`.`nEnteredBy`,
    `tblgivengbid`.`dtUpdated`,
    `tblgivengbid`.`nUpdatedBy`
FROM `ctadb`.`tblgivengbid`;


INSERT INTO `tblgreenbookissued`
(
`nGBId`,
`dtIssuedDate`,
`sWhyIssued`,
`nMadebTypeId`,
`nTypeIssuedId`,
`sFormNumber`,
`nFormNumber`,
`nWhereIssued`,
`nAuthRegionId`,
`bPrinted`,
`sRemarks`,
`dtEntered`,
`nEnteredBy`,
`dtUpdated`,
`nUpdatedBy`)
SELECT 
    `tblgreenbookissued`.`nGBId`,
    `tblgreenbookissued`.`dtIssuedDate`,
    `tblgreenbookissued`.`sWhyIssued`,
    `tblgreenbookissued`.`nMadebTypeId`,
    `tblgreenbookissued`.`nTypeIssuedId`,
    `tblgreenbookissued`.`sFormNumber`,
    `tblgreenbookissued`.`nFormNumber`,
    `tblgreenbookissued`.`nWhereIssued`,
    `tblgreenbookissued`.`nAuthRegionId`,
    `tblgreenbookissued`.`bPrinted`,
    `tblgreenbookissued`.`sRemarks`,
    `tblgreenbookissued`.`dtEntered`,
    `tblgreenbookissued`.`nEnteredBy`,
    `tblgreenbookissued`.`dtUpdated`,
    `tblgreenbookissued`.`nUpdatedBy`
FROM `ctadb`.`tblgreenbookissued`;

SET SQL_SAFE_UPDATES=0;
UPDATE tblgreenbook 
SET sMarried = 'S'
where sMarried = 'N';

UPDATE tblgreenbook 
SET sMarried = null
where sMarried = '';

UPDATE tblgreenbookissued a
INNER JOIN lstmadebtype b 
	ON a.sWhyIssued = b.sMadebDisplayKey
SET a.nMadebTypeId = b.Id;

UPDATE tblgreenbookissued 
SET nAuthRegionId = null
WHERE nWhereIssued = 0;

UPDATE tblgreenbookissued 
SET sRemarks = null
WHERE sRemarks = '';

update tblgreenbookissued
set nFormNumber=ceil(cast(sFormNumber AS char(7)));

update tblgreenbookissued
set nFormNumber = null
where nformNumber = 0;


INSERT INTO `tblgreenbookserial`
SELECT `tblgreenbookserial`.`Id`,
    `tblgreenbookserial`.`nBookNo`,
    `tblgreenbookserial`.`sGBID`,
    `tblgreenbookserial`.`Remarks`,
    `tblgreenbookserial`.`dtDate`,
    `tblgreenbookserial`.`sName`,
    `tblgreenbookserial`.`sCountryID`,
    `tblgreenbookserial`.`nMadebTypeID`,
    `tblgreenbookserial`.`nFormNumber`,
    `tblgreenbookserial`.`sAuthRegion`,
    `tblgreenbookserial`.`nAuthRegionID`,
    `tblgreenbookserial`.`dtEntered`,
    `tblgreenbookserial`.`nEnteredBy`,
    `tblgreenbookserial`.`dtUpdated`,
    `tblgreenbookserial`.`nUpdatedBy`
FROM `ctadb`.`tblgreenbookserial`;

SET SQL_SAFE_UPDATES=0;
UPDATE tblgreenbookserial a
INNER JOIN lstauthregion b 
	ON a.sAuthRegion = b.sAuthRegion
SET a.nAuthRegionId = b.Id;

INSERT INTO `tblrecentlysearchedgb`
(
    `tblrecentlysearchedgb`.`nGBID`,
    `tblrecentlysearchedgb`.`nUserID`,
    `tblrecentlysearchedgb`.`dtEntered`,
    `tblrecentlysearchedgb`.`nEnteredBy`
)
SELECT 
    `tblrecentlysearchedgb`.`nGBID`,
    `tblrecentlysearchedgb`.`nUserID`,
    `tblrecentlysearchedgb`.`dtEntered`,
    `tblrecentlysearchedgb`.`nEnteredBy`
FROM `ctadb`.`tblrecentlysearchedgb`;



INSERT INTO `lnkgbchildren`
(`Id`,
`sGBIDParent`,
`sName`,
`dtDOB`,
`sGender`,
`sChildID`,
`sGBIDChild`,
`dtEntered`,
`nEnteredBy`
)
SELECT `lnkgbchildren`.`Id`,
    `lnkgbchildren`.`sGBIDParent`,
    `lnkgbchildren`.`sName`,
    `lnkgbchildren`.`dtDOB`,
    `lnkgbchildren`.`sGender`,
    `lnkgbchildren`.`sChildID`,
    `lnkgbchildren`.`sGBIDChild`,
    `lnkgbchildren`.`dtEntered`,
    `lnkgbchildren`.`nEnteredBy`
FROM `ctadb`.`lnkgbchildren`;



INSERT INTO `lnkgbnote`
(`Id`,
`sGBId`,
`sNote`,
`dtEntered`,
`nEnteredBy`)
SELECT `lnkgbnote`.`Id`,
    `lnkgbnote`.`sGBId`,
    `lnkgbnote`.`sNote`,
    `lnkgbnote`.`dtEntered`,
    `lnkgbnote`.`nEnteredBy`
FROM `ctadb`.`lnkgbnote`;



INSERT INTO lnkgbrelation
(
sGBID,
sGBIDRelation,
nRelationID,
dtEntered,
nEnteredBy,
dtUpdated,
nUpdatedBy
)
SELECT 
    `lnkgbrelation`.`sGBID`,
    `lnkgbrelation`.`sGBIDRelation`,
    `lnkgbrelation`.`nRelationID`,
    `lnkgbrelation`.`dtEntered`,
    `lnkgbrelation`.`nEnteredBy`,
    `lnkgbrelation`.`dtUpdated`,
    `lnkgbrelation`.`nUpdatedBy`
FROM `ctadb`.`lnkgbrelation`;


-- ALTER TABLE tblgreenbookissued
-- ADD COLUMN nFormNumber int(11) DEFAULT NULL AFTER sFormNumber;



DROP table IF EXISTS `lnkFeatureUserRights`;

CREATE TABLE `lnkFeatureUserRights` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `nFeatureID` int(11) Not NULL,
  `nUserRightsID` int(11) Not NULL,
  `bRights` tinyint(1) NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 ;




--
-- Dumping data for table `lnkFeatureUserRights`
--


-- lnk feature user rights insert statement changes
INSERT INTO `lnkFeatureUserRights` (`Id`, `nFeatureID`, `nUserRightsID`, `bRights`, `dtEntered`, `nEnteredBy`) VALUES
(1, 1, 5, 1, now(), 1),
(2, 2, 5, 1, now(), 1),
(3, 3, 5, 1, now(), 1),
(4, 4, 5, 1, now(), 1),
(5, 5, 5, 1, now(), 1),
(6, 6, 5, 1, now(), 1),
(7, 7, 5, 1, now(), 1),
(8, 8, 5, 1, now(), 1),
(9, 9, 5, 1, now(), 1),
(10, 10, 5, 1, now(), 1),
(11, 11, 5, 1, now(), 1),
(12, 12, 5, 1, now(), 1),
(13, 13, 5, 1, now(), 1),
(14, 14, 5, 1, now(), 1),
(15, 15, 5, 1, now(), 1),
(16, 16, 5, 1, now(), 1),
(17, 17, 5, 1, now(), 1),
(18, 18, 5, 1, now(), 1),
(19, 19, 5, 1, now(), 1),
(20, 20, 5, 1, now(), 1),
(21, 21, 5, 1, now(), 1),
(22, 22, 5, 1, now(), 1),
(23, 23, 5, 1, now(), 1),
(24, 24, 5, 1, now(), 1),
(25, 25, 5, 1, now(), 1),
(26, 26, 5, 1, now(), 1),
(27, 27, 5, 1, now(), 1),
(28, 28, 5, 1, now(), 1),
(29, 29, 5, 1, now(), 1),
(30, 30, 5, 1, now(), 1),
(31, 31, 5, 1, now(), 1),
(32, 32, 5, 1, now(), 1),
(33, 33, 5, 1, now(), 1),
(34, 34, 5, 1, now(), 1),
(35, 35, 5, 1, now(), 1),
(36, 36, 5, 1, now(), 1),
(37, 37, 5, 1, now(), 1),

(38, 1, 4, 1, now(), 1),
(39, 2, 4, 1, now(), 1),
(40, 3, 4, 0, now(), 1),
(41, 4, 4, 0, now(), 1),
(42, 5, 4, 0, now(), 1),
(43, 6, 4, 0, now(), 1),
(44, 7, 4, 1, now(), 1),
(45, 8, 4, 1, now(), 1),
(46, 9, 4, 1, now(), 1),
(47, 10, 4, 1, now(), 1),
(48, 11, 4, 1, now(), 1),
(49, 12, 4, 1, now(), 1),
(50, 13, 4, 1, now(), 1),
(51, 14, 4, 1, now(), 1),
(52, 15, 4, 1, now(), 1),
(53, 16, 4, 1, now(), 1),
(54, 17, 4, 1, now(), 1),
(55, 18, 4, 1, now(), 1),
(56, 19, 4, 1, now(), 1),
(57, 20, 4, 1, now(), 1),
(58, 21, 4, 1, now(), 1),
(59, 22, 4, 0, now(), 1),
(60, 23, 4, 0, now(), 1),
(61, 24, 4, 0, now(), 1),
(62, 25, 4, 0, now(), 1),
(63, 26, 4, 0, now(), 1),
(64, 27, 4, 0, now(), 1),
(65, 28, 4, 0, now(), 1),
(66, 29, 4, 0, now(), 1),
(67, 30, 4, 0, now(), 1),
(68, 31, 4, 0, now(), 1),
(69, 32, 4, 0, now(), 1),
(70, 33, 4, 0, now(), 1),
(71, 34, 4, 0, now(), 1),
(72, 35, 4, 0, now(), 1),
(73, 36, 4, 0, now(), 1),
(74, 37, 4, 0, now(), 1),

(75, 1, 3, 1, now(), 1),
(76, 2, 3, 1, now(), 1),
(77, 3, 3, 0, now(), 1),
(78, 4, 3, 0, now(), 1),
(79, 5, 3, 0, now(), 1),
(80, 6, 3, 0, now(), 1),
(81, 7, 3, 0, now(), 1),
(82, 8, 3, 1, now(), 1),
(83, 9, 3, 1, now(), 1),
(84, 10, 3, 1, now(), 1),
(85, 11, 3, 1, now(), 1),
(86, 12, 3, 1, now(), 1),
(87, 13, 3, 1, now(), 1),
(88, 14, 3, 1, now(), 1),
(89, 15, 3, 1, now(), 1),
(90, 16, 3, 1, now(), 1),
(91, 17, 3, 1, now(), 1),
(92, 18, 3, 1, now(), 1),
(93, 19, 3, 1, now(), 1),
(94, 20, 3, 1, now(), 1),
(95, 21, 3, 1, now(), 1),
(96, 22, 3, 0, now(), 1),
(97, 23, 3, 0, now(), 1),
(98, 24, 3, 0, now(), 1),
(99, 25, 3, 0, now(), 1),
(100, 26, 3, 0, now(), 1),
(101, 27, 3, 0, now(), 1),
(102, 28, 3, 0, now(), 1),
(103, 29, 3, 0, now(), 1),
(104, 30, 3, 0, now(), 1),
(105, 31, 3, 0, now(), 1),
(106, 32, 3, 0, now(), 1),
(107, 33, 3, 0, now(), 1),
(108, 34, 3, 0, now(), 1),
(109, 35, 3, 0, now(), 1),
(110, 36, 3, 0, now(), 1),
(111, 37, 3, 0, now(), 1),

(112, 1, 2, 1, now(), 1),
(113, 2, 2, 1, now(), 1),
(114, 3, 2, 0, now(), 1),
(115, 4, 2, 0, now(), 1),
(116, 5, 2, 0, now(), 1),
(117, 6, 2, 0, now(), 1),
(118, 7, 2, 1, now(), 1),
(119, 8, 2, 0, now(), 1),
(120, 9, 2, 0, now(), 1),
(121, 10, 2, 0, now(), 1),
(122, 11, 2, 0, now(), 1),
(123, 12, 2, 1, now(), 1),
(124, 13, 2, 0, now(), 1),
(125, 14, 2, 0, now(), 1),
(126, 15, 2, 0, now(), 1),
(127, 16, 2, 0, now(), 1),
(128, 17, 2, 0, now(), 1),
(129, 18, 2, 0, now(), 1),
(130, 19, 2, 1, now(), 1),
(131, 20, 2, 1, now(), 1),
(132, 21, 2, 1, now(), 1),
(133, 22, 2, 0, now(), 1),
(134, 23, 2, 0, now(), 1),
(135, 24, 2, 0, now(), 1),
(136, 25, 2, 0, now(), 1),
(137, 26, 2, 0, now(), 1),
(138, 27, 2, 0, now(), 1),
(139, 28, 2, 0, now(), 1),
(140, 29, 2, 0, now(), 1),
(141, 30, 2, 0, now(), 1),
(142, 31, 2, 0, now(), 1),
(143, 32, 2, 0, now(), 1),
(144, 33, 2, 0, now(), 1),
(145, 34, 2, 0, now(), 1),
(146, 35, 2, 0, now(), 1),
(147, 36, 2, 0, now(), 1),
(148, 37, 2, 0, now(), 1),

(149, 1, 1, 1, now(), 1),
(150, 2, 1, 1, now(), 1),
(151, 3, 1, 0, now(), 1),
(152, 4, 1, 0, now(), 1),
(153, 5, 1, 0, now(), 1),
(154, 6, 1, 0, now(), 1),
(155, 7, 1, 0, now(), 1),
(156, 8, 1, 0, now(), 1),
(157, 9, 1, 0, now(), 1),
(158, 10, 1, 0, now(), 1),
(159, 11, 1, 0, now(), 1),
(160, 12, 1, 0, now(), 1),
(161, 13, 1, 0, now(), 1),
(162, 14, 1, 0, now(), 1),
(163, 15, 1, 0, now(), 1),
(164, 16, 1, 0, now(), 1),
(165, 17, 1, 0, now(), 1),
(166, 18, 1, 0, now(), 1),
(167, 19, 1, 1, now(), 1),
(168, 20, 1, 1, now(), 1),
(169, 21, 1, 0, now(), 1),
(170, 22, 1, 0, now(), 1),
(171, 23, 1, 0, now(), 1),
(172, 24, 1, 0, now(), 1),
(173, 25, 1, 0, now(), 1),
(174, 26, 1, 0, now(), 1),
(175, 27, 1, 0, now(), 1),
(176, 28, 1, 0, now(), 1),
(177, 29, 1, 0, now(), 1),
(178, 30, 1, 0, now(), 1),
(179, 31, 1, 0, now(), 1),
(180, 32, 1, 0, now(), 1),
(181, 33, 1, 0, now(), 1),
(182, 34, 1, 0, now(), 1),
(183, 35, 1, 0, now(), 1),
(184, 36, 1, 0, now(), 1),
(185, 37, 1, 0, now(), 1);



INSERT INTO `tblchatrelpayment`
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
	sGBID,
	SUBSTRING(sPaidUntil,1,4),
	58,
	null,
	'Success',
	'Offline_WebAdmin',
	'INR',
	sGBID,
	null,
	null,
	null,
	null,
	null,
	null,
	dtEntered,
	nEnteredBy,
	dtEntered,
	nEnteredBy
FROM ctadb.tblgreenbook WHERE sPaidUntil != '' and SUBSTRING(sPaidUntil,1,4) REGEXP '^-?[0-9]+$';

INSERT INTO `lnkgbchatrel`
(
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
SELECT
	id,
	sGBId,
	48,
	10,
	nChatrelYear,
	10,
	null,
	null,
	null,
	null,
	null,
	null,
	null,
	58,
	null,
	null,
	null,
	'INR',
	null,
	null,
	sGBId,
	dtPayment,
	dtEntered,
	nEnteredBy,
	dtUpdated,
	nUpdatedBy
from tblchatrelpayment;

INSERT INTO `ctauatdb`.`lnkgbdocument`
(`id`,
`sGBId`,
`sTitle`,
`sDocType`,
`binFileDoc`,
`sFileExtension`,
`nRegisterDate`,
`dtEntered`,
`nEnteredBy`)
SELECT `lnkgbdocument`.`id`,
    `lnkgbdocument`.`sGBId`,
    `lnkgbdocument`.`sTitle`,
    `lnkgbdocument`.`sDocType`,
    `lnkgbdocument`.`binFileDoc`,
    `lnkgbdocument`.`sFileExtension`,
    `lnkgbdocument`.`nRegisterDate`,
    `lnkgbdocument`.`dtEntered`,
    `lnkgbdocument`.`nEnteredBy`
FROM `ctadb`.`lnkgbdocument`;