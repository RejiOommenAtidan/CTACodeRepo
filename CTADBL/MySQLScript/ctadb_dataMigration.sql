﻿
use ctadb;
-- SELECT @@GLOBAL.sql_mode global, @@SESSION.sql_mode session;

-- set session sql_mode = ''

UPDATE `lstchatrel` SET `nChatrelValue` = '3' WHERE (`Id` = '5');
INSERT INTO `lstchatrel` (`sChatrelKey`, `nChatrelValue`, `dtChatrelFrom`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`) VALUES ('USDChildMonthChatrelAmount', '1', '2015-04-01', '2021-02-22 11:53:57', '1', '2021-02-22 11:53:57', '1');


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
SELECT 
	`user`.`id`,
	`user`.`id`,
	`user`.`username`,
	`user`.`name`,
	`user`.`Office`,
	`user`.`password`,
	`user`.`rights`,
	IF(`user`.`deleteTab`=1,0,1),
	now(),
	1,
	now(),
	1
FROM `greenbookprime`.`user`;

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

INSERT INTO `tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `bActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`)
	VALUES ('admin', 'Admin User', 'TCRC Office', 'admin123', '5', '1',now(),1,now(),1);

INSERT INTO `tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `bActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`)
	VALUES ('edit', 'Edit User', 'TCRC Office', 'edit123', '4', '1',now(),1,now(),1);
	
INSERT INTO `tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `bActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`)
	VALUES ('bookissue', 'Book Issue User', 'TCRC Office', 'bookissue123', '3', '1',now(),1,now(),1);

INSERT INTO `tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `bActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`)
	VALUES ('entry', 'Entry User', 'TCRC Office', 'entry123', '2', '1',now(),1,now(),1);

INSERT INTO `tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `bActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`)
	VALUES ('search', 'Search User', 'TCRC Office', 'search123', '1', '1',now(),1,now(),1);
	
INSERT INTO `tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `bActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`)
	VALUES ('chatreladmin', 'Chatrel Admin', 'TCRC Office', 'cta@123', '7', '1',now(),1,now(),1);
	
INSERT INTO `tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `bActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`)
	VALUES ('chatrelguest', 'Chatrel Guest', 'TCRC Office', 'cta@123', '6', '1',now(),1,now(),1);
	
	

-- all Password changed to : cta@123 to force user to change the password`
ALTER TABLE tbluser ADD sSalt varchar(255) NULL AFTER sPassword;
SET SQL_SAFE_UPDATES=0;
Update tbluser
set sSalt = '/xPgGzm22nBKPtBsoAzC8w==',
	sPassword = 'hydhXeUd2Upt6OSJcxVYoTMCdmvvRKVVEm4bNVWxmyQ=';	
	

SET sql_mode = 'allow_invalid_dates';

insert into  tblgreenbook
(
`tblgreenbook`.`Id`,
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
SELECT `ident`.`id`,
`ident`.`id`,
    `ident`.`IdentityID`,
    if(`ident`.`AuthRegionID` REGEXP '^-?[0-9]+$',`ident`.`AuthRegionID`,1) AS 'AuthRegionID',
    `ident`.`FirstName`,
    null,
    `ident`.`SecondName`,
    `ident`.`FamilyName`,
    `ident`.`Sex`,
	if(`ident`.`DOB`='0000-00-00',null,`ident`.`DOB`) as DOB,
    `ident`.`DOBApprox`,
    `ident`.`BirthPlace`,
    `ident`.`BirthCountryID`,
    `ident`.`OriginVillage`,
    `ident`.`OriginProvinceID`,
    `ident`.`Married`,
    `ident`.`OtherDocuments`,
    `ident`.`ResidenceID`,
    `ident`.`QualificationID`,
    `ident`.`OccupationID`,
    `ident`.`alias`,
    `ident`.`OldGreenBKNo`,
    `ident`.`FstGreenBkNo`,
    date(`ident`.`FormDate`),
    `ident`.`FathersName`,
    `ident`.`FathersID`,
    `ident`.`FathersIdentityID`,
    `ident`.`MothersName`,
    `ident`.`MothersID`,
    `ident`.`MothersIdentityID`,
    `ident`.`SpouseName`,
    `ident`.`SpouseID`,
    `ident`.`SpouseIdentityID`,
    `ident`.`ChildrenM`,
    `ident`.`ChildrenF`,
    `ident`.`Address`,
    `ident`.`Address2`,
    `ident`.`City`,
    `ident`.`State`,
    `ident`.`PCode`,
    `ident`.`CountryID`,
    `ident`.`Email`,
    `ident`.`Phone`,
    `ident`.`Fax`,
	if(`ident`.`Deceased`='0000-00-00',null,`ident`.`Deceased`) as Deceased,
    `ident`.`BookIssued`,
	if(`ident`.`ValidityDate`='0000-00-00',null,`ident`.`ValidityDate`) as ValidityDate,
    `ident`.`PaidUntil`,
    `ident`.`TibetanName`,
    `ident`.`TBUPlaceOfBirth`,
    `ident`.`TBUOriginVillage`,
    `ident`.`TBUFathersName`,
    `ident`.`TBUMothersName`,
    `ident`.`TBUSpouseName`,
	if(`ident`.`Entered`='0000-00-00',null,`ident`.`Entered`) as Entered,
    now(),
    if(`ident`.`EnteredBy` REGEXP '^-?[0-9]+$',`ident`.`EnteredBy`,1) AS 'nEnteredBy',
    now(),
    if(`ident`.`EnteredBy` REGEXP '^-?[0-9]+$',`ident`.`EnteredBy`,1) AS 'nUpdatedBy'
FROM `greenbookprime`.`ident`;

set sql_mode='';
SET SQL_SAFE_UPDATES=0;
truncate TABLE tblmadeb;
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
    `bookfull`.`Id`,
    `bookfull`.`FormNo`,
    `bookfull`.`GB`,
    5,
    `bookfull`.`Name`,
    `bookfull`.`FathersName`,
    `bookfull`.`AuthRegionID`,
    `bookfull`.`ReceivedDate`,
    (SELECT IssuedDate FROM greenbookprime.ident_bookissued WHERE ident_bookissued.WhyIssued = 'U' AND ident_bookissued.FormNo = bookfull.FormNo AND ident_bookissued.IdentityID = bookfull.GB AND ident_bookissued.IssuedOrNot = 2 HAVING count(FormNo) = 1),
    IF((SELECT IssuedDate FROM greenbookprime.ident_bookissued WHERE ident_bookissued.WhyIssued = 'U' AND ident_bookissued.FormNo = bookfull.FormNo AND ident_bookissued.IdentityID = bookfull.GB AND ident_bookissued.IssuedOrNot = 2 HAVING count(FormNo) = 1) IS NOT NULL, 2,  IF((SELECT BookNo FROM greenbookprime.ident_bookserial WHERE BookFull = bookfull.FormNo AND ident_bookserial.IDNo = bookfull.GB HAVING COUNT(BookFull) = 1) IS NOT NULL, 1, NULL)),
    `bookfull`.`Type`,
    null,
    `bookfull`.`OOT`,
    null,
    `bookfull`.`CurrentGBSno`,
    `bookfull`.`PreviousGBSno`,
    `bookfull`.`SaneyFormNo`,
    null,
    `bookfull`.`Email`,
    null,
    null,
    IF((SELECT IssuedDate FROM greenbookprime.ident_bookissued WHERE ident_bookissued.WhyIssued = 'U' AND ident_bookissued.FormNo = bookfull.FormNo AND ident_bookissued.IdentityID = bookfull.GB AND ident_bookissued.IssuedOrNot = 2 HAVING count(FormNo) = 1) IS NOT NULL, 2, IF((SELECT BookNo FROM greenbookprime.ident_bookserial WHERE BookFull = bookfull.FormNo AND ident_bookserial.IDNo = bookfull.GB HAVING COUNT(BookFull) = 1) IS NOT NULL, 2, IF(IssuedOrNot = 3, 3, IF(IssuedOrNot = 4, 4, IF(IssuedOrNot = 5, 5, 1))))),
    null,
    `bookfull`.`RejectDate`,
    `bookfull`.`ReturnDate`,
    now(),
    `bookfull`.`EnteredBy`,
    now(),
    `bookfull`.`EnteredBy`
FROM `greenbookprime`.`bookfull`;

Insert ignore into tblmadeb
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
    `abroad`.`Id`,
    `abroad`.`FormNo`,
    `abroad`.`GB`,
    4,
    `abroad`.`Name`,
    `abroad`.`FathersName`,
    `abroad`.`AuthRegionID`,
    `abroad`.`ReceivedDate`,
    (SELECT IssuedDate FROM greenbookprime.ident_bookissued WHERE ident_bookissued.WhyIssued = 'A' AND ident_bookissued.FormNo = abroad.FormNo AND ident_bookissued.IdentityID = abroad.GB AND ident_bookissued.IssuedOrNot = 2 HAVING count(FormNo) = 1),
    IF((SELECT IssuedDate FROM greenbookprime.ident_bookissued WHERE ident_bookissued.WhyIssued = 'A' AND ident_bookissued.FormNo = abroad.FormNo AND ident_bookissued.IdentityID = abroad.GB AND ident_bookissued.IssuedOrNot = 2 HAVING count(FormNo) = 1) IS NOT NULL, 2,  IF((SELECT BookNo FROM greenbookprime.ident_bookserial WHERE Abroad = abroad.FormNo AND ident_bookserial.IDNo = abroad.GB HAVING COUNT(Abroad) = 1) IS NOT NULL, 1, NULL)),
    `abroad`.`Type`,
    null,
    `abroad`.`OOT`,
    null,
    `abroad`.`CurrentGBSno`,
    `abroad`.`PreviousGBSno`,
    `abroad`.`SaneyFormNo`,
    `abroad`.`ReceiptNo`,
    `abroad`.`Email`,
    `abroad`.`Alias`,
    null,
    IF((SELECT IssuedDate FROM greenbookprime.ident_bookissued WHERE ident_bookissued.WhyIssued = 'U' AND ident_bookissued.FormNo = abroad.FormNo AND ident_bookissued.IdentityID = abroad.GB AND ident_bookissued.IssuedOrNot = 2 HAVING count(FormNo) = 1) IS NOT NULL, 2, IF((SELECT BookNo FROM greenbookprime.ident_bookserial WHERE Abroad = abroad.FormNo AND ident_bookserial.IDNo = abroad.GB HAVING COUNT(Abroad) = 1) IS NOT NULL, 2, IF(IssuedOrNot = 3, 3, IF(IssuedOrNot = 4, 4, IF(IssuedOrNot = 5, 5, 1))))),
    null,
    `abroad`.`RejectDate`,
    `abroad`.`ReturnDate`,
    now(),
    `abroad`.`EnteredBy`,
    now(),
    `abroad`.`EnteredBy`
FROM `greenbookprime`.`abroad`;
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
`briefgb`.`Id`,
    `briefgb`.`FormNo`,
    `briefgb`.`GB`,
    6,
    `briefgb`.`Name`,
    `briefgb`.`FathersName`,
    `briefgb`.`AuthRegionID`,
    `briefgb`.`ReceivedDate`,
    (SELECT IssuedDate FROM greenbookprime.ident_bookissued WHERE ident_bookissued.WhyIssued = 'B' AND ident_bookissued.FormNo = briefgb.FormNo AND ident_bookissued.IdentityID = briefgb.GB AND ident_bookissued.IssuedOrNot = 2 HAVING count(FormNo) = 1),
    IF((SELECT IssuedDate FROM greenbookprime.ident_bookissued WHERE ident_bookissued.WhyIssued = 'B' AND ident_bookissued.FormNo = briefgb.FormNo AND ident_bookissued.IdentityID = briefgb.GB AND ident_bookissued.IssuedOrNot = 2 HAVING count(FormNo) = 1) IS NOT NULL, 2,  IF((SELECT BookNo FROM greenbookprime.ident_bookserial WHERE BriefGB = briefgb.FormNo AND ident_bookserial.IDNo = briefgb.GB HAVING COUNT(BriefGB) = 1) IS NOT NULL, 1, NULL)),
    `briefgb`.`Type`,
    null,
    `briefgb`.`OOT`,
    null,
    `briefgb`.`CurrentGBSno`,
    `briefgb`.`PreviousGBSno`,
    `briefgb`.`SaneyFormNo`,
    `briefgb`.`ReceiptNo`,
    `briefgb`.`Email`,
    null,
    null,
    IF((SELECT IssuedDate FROM greenbookprime.ident_bookissued WHERE ident_bookissued.WhyIssued = 'B' AND ident_bookissued.FormNo = briefgb.FormNo AND ident_bookissued.IdentityID = briefgb.GB AND ident_bookissued.IssuedOrNot = 2 HAVING count(FormNo) = 1) IS NOT NULL, 2, IF((SELECT BookNo FROM greenbookprime.ident_bookserial WHERE BriefGB = briefgb.FormNo AND ident_bookserial.IDNo = briefgb.GB HAVING COUNT(BriefGB) = 1) IS NOT NULL, 2, IF(IssuedOrNot = 3, 3, IF(IssuedOrNot = 4, 4, IF(IssuedOrNot = 5, 5, 1))))),
    null,
    `briefgb`.`RejectDate`,
    `briefgb`.`ReturnDate`,
    now(),
    `briefgb`.`EnteredBy`,
    now(),
    `briefgb`.`EnteredBy`
FROM `greenbookprime`.`briefgb`;
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
    `madeblost`.`Id`,
    `madeblost`.`FormNo`,
    `madeblost`.`IdentityID`,
    3,
    `madeblost`.`Name`,
    null,
    `madeblost`.`AuthRegionID`,
    `madeblost`.`ReceivedDate`,
    (SELECT Entered FROM greenbookprime.ident_bookissued WHERE ident_bookissued.WhyIssued = 'L' AND ident_bookissued.FormNo = madeblost.FormNo AND ident_bookissued.IdentityID = madeblost.IdentityID AND ident_bookissued.IssuedOrNot = 2 HAVING count(FormNo) = 1),
    IF((SELECT Entered FROM greenbookprime.ident_bookissued WHERE ident_bookissued.WhyIssued = 'L' AND ident_bookissued.FormNo = madeblost.FormNo AND ident_bookissued.IdentityID = madeblost.IdentityID AND ident_bookissued.IssuedOrNot = 2 HAVING count(FormNo) = 1) IS NOT NULL, 2,  IF((SELECT BookNo FROM greenbookprime.ident_bookserial WHERE LostFormNo = madeblost.FormNo AND ident_bookserial.IDNo = madeblost.IdentityID HAVING COUNT(LostFormNo) = 1) IS NOT NULL, 1, NULL)),
    `madeblost`.`Type`,
    `madeblost`.`ChangeField`,
    null,
    `madeblost`.`DA`,
    null,
    null,
    null,
    if(`madeblost`.`ReceiptNo` REGEXP '^-?[0-9]+$',`madeblost`.`ReceiptNo`,1) AS 'nReceiptNo',
    `madeblost`.`Email`,
    null,
    `madeblost`.`ApprovedReject`,
    IF((SELECT Entered FROM greenbookprime.ident_bookissued WHERE ident_bookissued.WhyIssued = 'L' AND ident_bookissued.FormNo = madeblost.FormNo AND ident_bookissued.IdentityID = madeblost.IdentityID AND ident_bookissued.IssuedOrNot = 2 HAVING count(FormNo) = 1) IS NOT NULL, 2, IF((SELECT BookNo FROM greenbookprime.ident_bookserial WHERE LostFormNo = madeblost.FormNo AND ident_bookserial.IDNo = madeblost.IdentityID HAVING COUNT(LostFormNo) = 1) IS NOT NULL, 2, IF(IssuedOrNot = 3, 3, IF(IssuedOrNot = 4, 4, IF(IssuedOrNot = 5, 5, 1))))),
    IF(`madeblost`.`ApprovedReject` IS null or `madeblost`.`ApprovedReject` = '', null, 
        IF(`madeblost`.`ApprovedReject` = 'Approved', null,
            IF(`madeblost`.`ApprovedReject` like 'Reject%', `madeblost`.`ApprovedReject`,`madeblost`.`ApprovedReject`))),
    `madeblost`.`RejectDate`,
    `madeblost`.`ReturnDate`,
    now(),
    `madeblost`.`EnteredBy`,
    now(),
    `madeblost`.`EnteredBy`
FROM `greenbookprime`.`madeblost`;
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
`madebchange`.`Id`,
    `madebchange`.`FormNo`,
    `madebchange`.`IdentityID`,
    2,
    `madebchange`.`Name`,
    null,
    `madebchange`.`AuthRegionID`,
    `madebchange`.`ReceivedDate`,
    (SELECT Entered FROM greenbookprime.ident_bookissued WHERE ident_bookissued.WhyIssued = 'M' AND ident_bookissued.FormNo = madebchange.FormNo AND ident_bookissued.IdentityID = madebchange.IdentityID AND ident_bookissued.IssuedOrNot = 2 HAVING count(FormNo) = 1),
    IF((SELECT Entered FROM greenbookprime.ident_bookissued WHERE ident_bookissued.WhyIssued = 'M' AND ident_bookissued.FormNo = madebchange.FormNo AND ident_bookissued.IdentityID = madebchange.IdentityID AND ident_bookissued.IssuedOrNot = 2 HAVING count(FormNo) = 1) IS NOT NULL, 2,  IF((SELECT BookNo FROM greenbookprime.ident_bookserial WHERE ChangeFormNo = madebchange.FormNo AND ident_bookserial.IDNo = madebchange.IdentityID HAVING COUNT(ChangeFormNo) = 1) IS NOT NULL, 1, NULL)),
    `madebchange`.`Type`,
    `madebchange`.`ChangeField`,
    null,
    `madebchange`.`DA`,
    null,
    null,
    null,
    NULLIF(CAST(`madebchange`.`ReceiptNo` AS UNSIGNED),0),
    `madebchange`.`Email`,
    null,
    `madebchange`.`ApprovedReject`,
IF((SELECT Entered FROM greenbookprime.ident_bookissued WHERE ident_bookissued.WhyIssued = 'M' AND ident_bookissued.FormNo = madebchange.FormNo AND ident_bookissued.IdentityID = madebchange.IdentityID AND ident_bookissued.IssuedOrNot = 2 HAVING count(FormNo) = 1) IS NOT NULL, 2, IF((SELECT BookNo FROM greenbookprime.ident_bookserial WHERE ChangeFormNo = madebchange.FormNo AND ident_bookserial.IDNo = madebchange.IdentityID HAVING COUNT(ChangeFormNo) = 1) IS NOT NULL, 2, IF(IssuedOrNot = 3, 3, IF(IssuedOrNot = 4, 4, IF(IssuedOrNot = 5, 5, 1))))),
IF(`madebchange`.`ApprovedReject` IS null or `madebchange`.`ApprovedReject` = '', null, 
        IF(`madebchange`.`ApprovedReject` = 'Approved', null,
            IF(`madebchange`.`ApprovedReject` like 'Reject%', `madebchange`.`ApprovedReject`,`madebchange`.`ApprovedReject`))) as nMadebStatusRemark,
    `madebchange`.`RejectDate`,
    `madebchange`.`ReturnDate`,
   now(),
    `madebchange`.`EnteredBy`,
   now(),
    `madebchange`.`EnteredBy`
FROM `greenbookprime`.`madebchange`;
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
    `madeb`.`Id`,
    `madeb`.`FormNo`,
    (select gbNoGiven.IdentityID from greenbookprime.gbnogiven WHERE gbNoGiven.FormNo = madeb.FormNo AND gbNoGiven.GivenOrNot = 1 HAVING count(formNo) = 1),
    1,
    `madeb`.`Name`,
    `madeb`.`FathersName`,
    `madeb`.`AuthRegionID`,
    `madeb`.`ReceivedDate`,
    (SELECT date FROM greenbookprime.gbnogiven WHERE gbNoGiven.FormNo = madeb.FormNo AND gbNoGiven.GivenOrNot = 1 HAVING count(formNo) = 1),
    IF((SELECT Entered FROM greenbookprime.ident_bookissued WHERE ident_bookissued.WhyIssued = 'F' AND ident_bookissued.FormNo = madeb.FormNo AND ident_bookissued.IdentityID = (select gbNoGiven.IdentityID from greenbookprime.gbnogiven WHERE gbNoGiven.FormNo = madeb.FormNo AND gbNoGiven.GivenOrNot = 1 HAVING count(formNo) = 1) AND ident_bookissued.IssuedOrNot = 2 HAVING count(FormNo) = 1) IS NOT NULL, 2, IF((select gbNoGiven.IdentityID from greenbookprime.gbnogiven WHERE gbNoGiven.FormNo = madeb.FormNo AND gbnogiven.givenornot = 1 HAVING count(formNo) = 1) IS NOT NULL, 1, NULL)),
    `madeb`.`Type`,
    null,
    `madeb`.`OOT`,
    `madeb`.`DA`,
    null,
    null,
    null,
    null,
    `madeb`.`Email`,
    null,
    null,
    IF((SELECT Entered FROM greenbookprime.ident_bookissued WHERE ident_bookissued.WhyIssued = 'F' AND ident_bookissued.FormNo = madeb.FormNo AND ident_bookissued.IdentityID = (select gbNoGiven.IdentityID from greenbookprime.gbnogiven WHERE gbNoGiven.FormNo = madeb.FormNo AND gbNoGiven.GivenOrNot = 1 HAVING count(formNo) = 1) AND ident_bookissued.IssuedOrNot = 2 HAVING count(FormNo) = 1) IS NOT NULL, 2, IF((select gbNoGiven.IdentityID from greenbookprime.gbnogiven WHERE gbNoGiven.FormNo = madeb.FormNo AND gbnogiven.givenornot = 1 HAVING count(formNo) = 1) IS NOT NULL, 2, IF(IssuedOrNot = 3, 3, IF(IssuedOrNot = 4, 4, IF(IssuedOrNot = 5, 5, 1))))),
    null,
    `madeb`.`RejectDate`,
    `madeb`.`ReturnDate`,
    now(),
    `madeb`.`EnteredBy`,
    now(),
    `madeb`.`EnteredBy`
FROM `greenbookprime`.`madeb`;

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

UPDATE tblmadeb a
INNER JOIN tblgreenbookserial b ON a.nFormNumber = b.nFormNumber
SET a.nCurrentGBSno = b.nBookNo
where a.nMadebTypeID = 1;


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
SELECT 
	`gbnogiven`.`id`,
	 `gbnogiven`.`id`,
	`gbnogiven`.`IdentityID`,
	`gbnogiven`.`formNo`,
	`gbnogiven`.`date`,
	`gbnogiven`.`GivenOrNot`,
	IF(`gbnogiven`.`deleteTab`=1,0,1),
	now(),
	1,
	now(),
	1
FROM `greenbookprime`.`gbnogiven`;



INSERT INTO `tblgreenbookissued`
(`Id`,
`nGBId`,
`dtIssuedDate`,
`sWhyIssued`,
`nMadebTypeId`,
`nTypeIssuedId`,
`sFormNumber`,
`nWhereIssued`,
`nAuthRegionId`,
`bPrinted`,
`sRemarks`,
`dtEntered`,
`nEnteredBy`,
`dtUpdated`,
`nUpdatedBy`)

SELECT 
	`ident_bookissued`.`BookIssuedID`,
	`ident_bookissued`.`IdentityID`,
	`ident_bookissued`.`IssuedDate`,
	`ident_bookissued`.`WhyIssued`,
	null,
	`ident_bookissued`.`IssuedOrNot`,
	`ident_bookissued`.`FormNo`,
	`ident_bookissued`.`WhereIssued`,
	`ident_bookissued`.`WhereIssued`,
	`ident_bookissued`.`Printed`,
	`ident_bookissued`.`Remarks`,
	`ident_bookissued`.`Entered`,
	`ident_bookissued`.`EnteredBy`,
	`ident_bookissued`.`Entered`,
	`ident_bookissued`.`EnteredBy`
FROM `greenbookprime`.`ident_bookissued`;

SET SQL_SAFE_UPDATES=0;
UPDATE tblgreenbook 
SET sMarried = 'S'
where sMarried = 'N';

UPDATE tblgreenbook 
SET sMarried = null
where sMarried = '';

SET session sql_mode = '';
UPDATE `tblgreenbook`
SET
`dtEntered` = null;

UPDATE `tblgreenbook`
SET
`dtEntered` = STR_TO_DATE(sEnteredDateTime, '%m/%d/%Y %H:%i:%s')
WHERE (sEnteredDateTime like '%AM' OR sEnteredDateTime like '%PM' )
    and STR_TO_DATE(sEnteredDateTime, '%m/%d/%Y %H:%i:%s') < CURDATE();


UPDATE `tblgreenbook`
SET
`dtEntered` = STR_TO_DATE(sEnteredDateTime, '%m/%d/%Y %H:%i:%s')
WHERE (sEnteredDateTime like '%AM' OR sEnteredDateTime like '%PM' )
    and STR_TO_DATE(sEnteredDateTime, '%m/%d/%Y %H:%i:%s') < CURDATE();

UPDATE `tblgreenbook`
SET
`dtEntered` = dtUpdated
where dtEntered is null;


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



INSERT INTO `tblgreenbookserial`
SELECT 
	`ident_bookserial`.`ID`,
	`ident_bookserial`.`BookNo`,
	`ident_bookserial`.`IDNo`,
	`ident_bookserial`.`Remarks`,
	`ident_bookserial`.`Date`,
	`ident_bookserial`.`Name`,
	`ident_bookserial`.`CountryID`,
    If(SarsoFormNo is null or SarsoFormNo = 0,
		If(ChangeFormNo is null or ChangeFormNo = 0,
			If(LostFormNo is null or LostFormNo = 0,
				If(Abroad is null or Abroad = 0,
					If(BookFull is null or BookFull = 0,
						If(BriefGB is null or BriefGB = 0,Null,
						6),
							5),
								4),
									3),
										2),
											1) as nMadebTypeID,
	If(SarsoFormNo is null or SarsoFormNo = 0,
		If(ChangeFormNo is null or ChangeFormNo = 0,
			If(LostFormNo is null or LostFormNo = 0,
				If(Abroad is null or Abroad = 0,
					If(BookFull is null or BookFull = 0,
						If(BriefGB is null or BriefGB = 0,Null,
						BriefGB),
							BookFull),
								Abroad),
									LostFormNo),
										ChangeFormNo),
											SarsoFormNo) as nFormNumber,
	`ident_bookserial`.`AuthRegionID`,
	null,
	now(),
	1,
	now(),
	1
FROM greenbookprime.ident_bookserial;


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
    `recentlysearchedgb`.`IdentityID`,
    `recentlysearchedgb`.`UserID`,
    now(),
	1
 FROM `greenbookprime`.`recentlysearchedgb`;
 

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
`nUpdatedBy`
)
SELECT 
	`ident_children`.`ID`,
	`ident_children`.`ParentID`,
	`ident_children`.`Name`,
	if(`ident_children`.`DOB`='0000-00-00',null,`ident_children`.`DOB`) as DOB,
	`ident_children`.`Gender`,
	`ident_children`.`ChildID`,
	`ident_children`.`ChildIdentityID`,
	now(),
	1,
	now(),
	1
FROM `greenbookprime`.`ident_children`;

SET SQL_SAFE_UPDATES=0;

update `lnkgbchildren` 
set `dtDOB` = null
where `dtDOB` like '%-00%';


INSERT INTO `lnkgbnote`
(`Id`,
`sGBId`,
`sNote`,
`dtEntered`,
`nEnteredBy`,
`dtUpdated`,
`nUpdatedBy`)
SELECT `ident_note`.`NoteID`,
    `ident_note`.`IdentityID`,
    `ident_note`.`Note`,
    `ident_note`.`Entered`,
    `ident_note`.`EnteredBy`,
	`ident_note`.`Entered`,
    `ident_note`.`EnteredBy`
FROM `greenbookprime`.`ident_note`;



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
    g.sGBID AS sGBID,
    f.sGBID AS sGBIDRelation,
    1 as nRelationID,
    now(),
    1,
    now(),
    1
FROM
    tblgreenbook g
INNER JOIN tblgreenbook f ON 
    f.sGBID = g.sFathersGBID and  g.sFathersGBID is not null
ORDER BY 
    sGBID;
	

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
    g.sGBID AS sGBID,
    f.sGBID AS sGBIDRelation,
    2 as nRelationID,
    now(),
    1,
    now(),
    1
FROM
    tblgreenbook g
INNER JOIN tblgreenbook f ON 
    f.sGBID = g.sMothersGBID and  g.sMothersGBID is not null
ORDER BY 
    sGBID;
	

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
    g.sGBID AS sGBID,
    f.sGBID AS sGBIDRelation,
    3 as nRelationID,
    now(),
    1,
    now(),
    1
FROM
    tblgreenbook g
INNER JOIN tblgreenbook f ON 
    f.sGBID = g.sSpouseGBID and  g.sSpouseGBID is not null
ORDER BY 
    sGBID;

delete from tblgivengbid where id = 14898 and  nGBID = 8278214;


-- ALTER TABLE tblgreenbookissued
-- ADD COLUMN nFormNumber int(11) DEFAULT NULL AFTER sFormNumber;

update tblgreenbookissued
set nFormNumber=ceil(cast(sFormNumber AS char(7)));

update tblgreenbookissued
set nFormNumber = null
where nformNumber = 0;



SET SQL_SAFE_UPDATES=0;
update tblmadeb set dtReceived = dtIssueAction WHERE id in (63639, 44338, 45636);




SET SQL_SAFE_UPDATES=0;
-- UPDATE `lnkgbchatrel` a
-- INNER JOIN `tblgreenbook` b ON a.sGBID = b.sGBID
-- SET a.nAuthRegionID =  b.nAuthRegionId;

-- UPDATE `lnkgbchatrel` a
-- INNER JOIN `tblgreenbook` b ON a.sGBID = b.sGBID
-- SET a.sCountryID =  b.sCountryID;

update tblgivengbid
set bActive = 0
where nFormNo in (350,
348,
327,
315,
274,
3,
1,
0);

update tblgivengbid
set bActive = 0
where nGBId = 0;




SET SQL_SAFE_UPDATES=0;
UPDATE lstMadebType
		,(SELECT tblmadeb.nMadebTypeID as ID, Max(tblmadeb.nFormNumber) AS LastFormNumber
			FROM lstMadebType
			INNER JOIN tblmadeb ON tblmadeb.nMadebTypeID = lstMadebType.ID
			group by tblmadeb.nMadebTypeID
			) as MaxNum
        SET lstMadebType.nMadebLastFormNumber = MaxNum.LastFormNumber
        where lstMadebType.ID = MaxNum.ID;
		



UPDATE lstmadebtype SET lstmadebtype.nMadebLastFormNumber = (SELECT max(tblmadeb.nFormNumber) FROM tblmadeb WHERE tblmadeb.nMadebTypeID = 1 ) WHERE lstmadebtype.Id = 1;
UPDATE lstmadebtype SET lstmadebtype.nMadebLastFormNumber = (SELECT max(tblmadeb.nFormNumber) FROM tblmadeb WHERE tblmadeb.nMadebTypeID = 2) where lstmadebtype.Id = 2;
UPDATE lstmadebtype SET lstmadebtype.nMadebLastFormNumber = (SELECT max(tblmadeb.nFormNumber) FROM tblmadeb WHERE tblmadeb.nMadebTypeID = 3) WHERE lstmadebtype.Id = 3;
UPDATE lstmadebtype SET lstmadebtype.nMadebLastFormNumber = (SELECT max(tblmadeb.nFormNumber) FROM tblmadeb WHERE tblmadeb.nMadebTypeID = 4) WHERE lstmadebtype.Id = 4;
UPDATE lstmadebtype SET lstmadebtype.nMadebLastFormNumber = (SELECT max(tblmadeb.nFormNumber) FROM tblmadeb WHERE tblmadeb.nMadebTypeID = 5) WHERE lstmadebtype.Id = 5;
UPDATE lstmadebtype SET lstmadebtype.nMadebLastFormNumber = (SELECT max(tblmadeb.nFormNumber) FROM tblmadeb WHERE tblmadeb.nMadebTypeID = 6) WHERE lstmadebtype.Id = 6;


INSERT INTO `tmpgbdocument`
(`id`,
`sGBId`,
`sTitle`,
`sDocType`,
`imageFileName`,
`sFileExtension`,
`nRegisterDate`,
`dtEntered`,
`nEnteredBy`,
`dtUpdated`,
`nUpdatedBy`)
SELECT
	id,
    IdentityID,
    title,
    null,
    image,
    null,
	FROM_UNIXTIME(registerdate) as registerdate,
    now(),
    82,
    now(),
    82    
FROM 
  greenbookprime.document;
  
  

SET sql_mode = 'NO_ZERO_DATE';
update tblgreenbook
set dtEntered = STR_TO_DATE(sEnteredDateTime, '%Y-%m-%d %H:%i:%s')
where STR_TO_DATE(sEnteredDateTime, '%Y-%m-%d %H:%i:%s') is not null and date(dtEntered) = date(dtUpdated) and sEnteredDateTime like '%-%-%';


update tblgreenbook
set dtEntered = STR_TO_DATE(sEnteredDateTime, '%m/%d/%Y')
where STR_TO_DATE(sEnteredDateTime, '%m/%d/%Y') is not null and date(dtEntered) = date(dtUpdated) and sEnteredDateTime like '%/%/%';

UPDATE tblgreenbook
SET dtEntered = STR_TO_DATE(sEnteredDateTime, '%d-%m-%Y')
WHERE STR_TO_DATE(sEnteredDateTime, '%d-%m-%Y') is not null and date(dtEntered) = date(dtUpdated) and sEnteredDateTime like '%-%-%';


UPDATE lnkgbchildren
SET sgbidChild = if(sgbidChild = 0 ,null,sgbidChild);

UPDATE tblgreenbook 
   SET nChildrenM = (
       SELECT COUNT(id) 
         FROM lnkgbchildren 
        WHERE lnkgbchildren.sGBIDParent = tblgreenbook.sGBID 
			AND sGender = 'M'
        GROUP BY lnkgbchildren.sGBIDParent
       ),
       nChildrenF = (
       SELECT COUNT(id) 
         FROM lnkgbchildren 
        WHERE lnkgbchildren.sGBIDParent = tblgreenbook.sGBID 
			AND sGender = 'F'
        GROUP BY lnkgbchildren.sGBIDParent
       );
	   
	   
-- tblauditlog


-- SHOW variables like 'group_concat_max_len';

SET session group_concat_max_len=1024000;

INSERT ignore INTO tblauditlog(dtEntered, nFeatureID, nRecordID, sGBID, sFieldValuesOld, sFieldValuesNew, nEnteredBy) SELECT h.ModifiedDate, 16, h.ID, h.IdentityID, concat('[', group_concat('{"Field":"',FieldName , '", "PreviousValue":"', ifnull(replace(ChangesFrom, '\\', '\\\\'), ''),'", "NewValue":"', ifnull(replace(ChangesTo, '\\','\\\\'), ''),'"}'), ']'),'', IFNULL(CAST(h.byWhom AS UNSIGNED), 0) FROM greenbookprime.historychanges h  GROUP BY h.IdentityID, date_format(ModifiedDate, '%Y-%m-%d %H:%i');
 
INSERT ignore INTO tblauditlog(dtEntered, nFeatureID, nRecordID, sGBID, sFieldValuesOld, sFieldValuesNew, nEnteredBy) SELECT h.ModifiedDate, 101, h.ID, h.ParentID, concat('[', group_concat('{"Field":"',FieldName , '", "PreviousValue":"', ifnull(replace(ChangesFrom, '\\', '\\\\'), ''),'", "NewValue":"', ifnull(replace(ChangesTo, '\\', '\\\\'), ''),'"}'), ']'),'', IFNULL(CAST(h.byWhom AS UNSIGNED), 0) FROM greenbookprime.historychangeschild h  GROUP BY h.ParentID, ModifiedDate ORDER BY ModifiedDate;

INSERT ignore INTO tblauditlog(dtEntered, nFeatureID, nRecordID, sGBID, sFieldValuesOld, sFieldValuesNew, nEnteredBy)  SELECT d.WhenDeleted, 17 as featureID, d.ID as RecordID, d.IdentityID as gbid, concat('[', '{"Field":"Greenbook ID Deleted", "PreviousValue":"", "NewValue":"',d.IdentityID,'"}', ']') as old , concat('Greenbook Id ', d.IdentityID ,' Deleted') as new, 0 FROM greenbookprime.deletelog d ORDER BY d.WhenDeleted;

 


UPDATE lnkgbdocument AS d
INNER JOIN tblgreenbook AS g ON d.sGBId = g.sGBId
SET d.dtEntered = g.dtEntered,
	d.nEnteredBy = g.nEnteredBy,
    d.nUpdatedBy =  g.nUpdatedBy
WHERE  d.sDocType = 'Photo Identity';

UPDATE lnkgbdocument AS d
INNER JOIN tblgreenbook AS g ON d.sGBId = g.sGBId
SET 
	d.nEnteredBy = g.nEnteredBy,
    d.nUpdatedBy =  g.nUpdatedBy
WHERE  d.sDocType = 'Support Document';

UPDATE `lstmadebstatus` SET `sMadebStatus` = 'Double' WHERE (`Id` = '4');
UPDATE `lstmadebstatus` SET `sMadebStatus` = 'Cancelled' WHERE (`Id` = '5');
UPDATE `lstmadebstatus` SET `sMadebStatus` = 'Closed' WHERE (`Id` = '6');


