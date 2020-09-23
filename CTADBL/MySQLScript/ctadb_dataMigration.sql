insert into  ctadb.tblgreenbook
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
`ident`.`id`,
    `ident`.`IdentityID`,
    `ident`.`AuthRegionID`,
    `ident`.`FirstName`,
    null,
    `ident`.`SecondName`,
    `ident`.`FamilyName`,
    `ident`.`Sex`,
    `ident`.`DOB`,
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
    `ident`.`FormDate`,
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
    `ident`.`Deceased`,
    `ident`.`BookIssued`,
    `ident`.`ValidityDate`,
    `ident`.`PaidUntil`,
    `ident`.`TibetanName`,
    `ident`.`TBUPlaceOfBirth`,
    `ident`.`TBUOriginVillage`,
    `ident`.`TBUFathersName`,
    `ident`.`TBUMothersName`,
    `ident`.`TBUSpouseName`,
    `ident`.`Entered`,
    now(),
    `ident`.`EnteredBy`,
    now(),
    `ident`.`EnteredBy`
FROM `greenbookprime`.`ident`;



Insert into ctadb.tblmadeb
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
   null,
   1,
    `madeb`.`Name`,
    `madeb`.`FathersName`,
    `madeb`.`AuthRegionID`,
    `madeb`.`ReceivedDate`,
    `madeb`.`IssueActionDate`,
    `madeb`.`IssuedOrNot`,
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
    `madeb`.`RejectDate`,
    `madeb`.`ReturnDate`,
   now(),
    `madeb`.`EnteredBy`,
   now(),
    `madeb`.`EnteredBy`
FROM `greenbookprime`.`madeb`;


Insert into ctadb.tblmadeb
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
    `madebchange`.`IssueActionDate`,
    `madebchange`.`IssuedOrNot`,
    `madebchange`.`Type`,
    `madebchange`.`ChangeField`,
    null,
    `madebchange`.`DA`,
    null,
    null,
    null,
    `madebchange`.`ReceiptNo`,
    `madebchange`.`Email`,
    null,
    `madebchange`.`ApprovedReject`,
    `madebchange`.`RejectDate`,
    `madebchange`.`ReturnDate`,
    now(),
    `madebchange`.`EnteredBy`,
    now(),
    `madebchange`.`EnteredBy`
FROM `greenbookprime`.`madebchange`;



Insert into ctadb.tblmadeb
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
    `madeblost`.`IssueActionDate`,
    `madeblost`.`IssuedOrNot`,
    `madeblost`.`Type`,
    `madeblost`.`ChangeField`,
null,
    `madeblost`.`DA`,
null,
null,
null,
    `madeblost`.`ReceiptNo`,
    `madeblost`.`Email`,
null,
    `madeblost`.`ApprovedReject`,
    `madeblost`.`RejectDate`,
    `madeblost`.`ReturnDate`,
   now(),
    `madeblost`.`EnteredBy`,
   now(),
    `madeblost`.`EnteredBy`
FROM `greenbookprime`.`madeblost`;



Insert into ctadb.tblmadeb
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
    `abroad`.`IssueActionDate`,
    `abroad`.`IssuedOrNot`,
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
    `abroad`.`RejectDate`,
    `abroad`.`ReturnDate`,
   now(),
    `abroad`.`EnteredBy`,
   now(),
    `abroad`.`EnteredBy`
FROM `greenbookprime`.`abroad`;



Insert into ctadb.tblmadeb
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
    `bookfull`.`IssueActionDate`,
    `bookfull`.`IssuedOrNot`,
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
    `bookfull`.`RejectDate`,
    `bookfull`.`ReturnDate`,
   now(),
    `bookfull`.`EnteredBy`,
   now(),
    `bookfull`.`EnteredBy`
FROM `greenbookprime`.`bookfull`;



Insert into ctadb.tblmadeb
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
    `briefgb`.`IssueActionDate`,
    `briefgb`.`IssuedOrNot`,
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
    `briefgb`.`RejectDate`,
    `briefgb`.`ReturnDate`,
   now(),
    `briefgb`.`EnteredBy`,
   now(),
    `briefgb`.`EnteredBy`
FROM `greenbookprime`.`briefgb`;



Insert into ctadb.tbluser
(
    `tbluser`.`Id`,
    `tbluser`.`_Id`,
    `tbluser`.`sUsername`,
    `tbluser`.`sFullName`,
    `tbluser`.`sOffice`,
    `tbluser`.`sPassword`,
    `tbluser`.`nUserRightsId`,
    `tbluser`.`nActive`,
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
	`user`.`deleteTab`,
	1,
	now(),
	1,
	now()
FROM `greenbookprime`.`user`;




-- Correcting Data


-- SELECT * FROM ctadb.tblmadeb where dtReceived = '0000-00-00';
-- SELECT * FROM ctadb.tblmadeb where dtIssueAction = '0000-00-00';
-- SELECT * FROM ctadb.tblmadeb where dtEmailSend = '0000-00-00';
-- SELECT * FROM ctadb.tblmadeb where dtReject = '0000-00-00';
-- SELECT * FROM ctadb.tblmadeb where dtReturnEmail = '0000-00-00';
-- SELECT * FROM ctadb.tblmadeb where sName = '';
-- SELECT * FROM ctadb.tblgreenbook where dtDOB = '0000-00-00';
-- SELECT * FROM ctadb.tblgreenbook where dtFormDate = '0000-00-00';
-- SELECT * FROM ctadb.tblgreenbook where dtDeceased = '0000-00-00';
-- SELECT * FROM ctadb.tblgreenbook where dtValidityDate = '0000-00-00';

use ctadb;
SET SQL_SAFE_UPDATES=0;

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


use ctadb;
DROP table IF EXISTS `tbluser`;

CREATE TABLE `tbluser` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `_Id` int(11) DEFAULT NULL,
  `sUsername` text NOT NULL,
  `sFullName` text NOT NULL,
  `sOffice` text NOT NULL,
  `sPassword` text NOT NULL,
  `nUserRightsId` int(11) NOT NULL,
  `nActive` tinyint(1) NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) NOT NULL,
  `dtUpdated` datetime DEFAULT NULL,
  `nUpdatedBy` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=91 DEFAULT CHARSET=latin1;


Insert into ctadb.tbluser
(
    `tbluser`.`Id`,
    `tbluser`.`_Id`,
    `tbluser`.`sUsername`,
    `tbluser`.`sFullName`,
    `tbluser`.`sOffice`,
    `tbluser`.`sPassword`,
    `tbluser`.`nUserRightsId`,
    `tbluser`.`nActive`,
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
	1,
	now(),
	1,
	now()
FROM `greenbookprime`.`user`;

INSERT INTO `ctadb`.`tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `nActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`) 
	VALUES ('pankaj', 'Pankaj Gupta', 'TCRC Office', 'pankaj123', '5', '1',1,now(),1,now());

INSERT INTO `ctadb`.`tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `nActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`) 
	VALUES ('reji', 'Reji Oommen', 'TCRC Office', 'reji123', '5', '1',1,now(),1,now());

INSERT INTO `ctadb`.`tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `nActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`) 
	VALUES ('malay', 'Malay', 'TCRC Office', 'malay123', '5', '1',1,now(),1,now());

INSERT INTO `ctadb`.`tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `nActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`) 
	VALUES ('aayush', 'Aayush', 'TCRC Office', 'aayush123', '5', '1',1,now(),1,now());
	
INSERT INTO `ctadb`.`tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `nActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`)
	VALUES ('rajen', 'Rajen', 'TCRC Office', 'rajen123', '5', '1',1,now(),1,now());
