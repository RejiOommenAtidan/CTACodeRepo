
use ctadb;
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
	now(),
	1,
	now(),
	1
FROM `greenbookprime`.`user`;

INSERT INTO `ctadb`.`tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `nActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`) 
	VALUES ('pankaj', 'Pankaj Gupta', 'TCRC Office', 'pankaj123', '5', '1',now(),1,now(),1);

INSERT INTO `ctadb`.`tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `nActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`) 
	VALUES ('reji', 'Reji Oommen', 'TCRC Office', 'reji123', '5', '1',now(),1,now(),1);

INSERT INTO `ctadb`.`tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `nActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`) 
	VALUES ('malay', 'Malay', 'TCRC Office', 'malay123', '5', '1',now(),1,now(),1);

INSERT INTO `ctadb`.`tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `nActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`) 
	VALUES ('aayush', 'Aayush', 'TCRC Office', 'aayush123', '5', '1',now(),1,now(),1);
	
INSERT INTO `ctadb`.`tblUser` (`sUsername`, `sFullName`, `sOffice`, `sPassword`, `nUserRightsId`, `nActive`, `dtEntered`, `nEnteredBy`, `dtUpdated`, `nUpdatedBy`)
	VALUES ('rajen', 'Rajen', 'TCRC Office', 'rajen123', '5', '1',now(),1,now(),1);
	
    

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
IF(`madebchange`.`ApprovedReject` IS null or `madebchange`.`ApprovedReject` = '', null, 
		IF(`madebchange`.`ApprovedReject` = 'Approved', 1,
			IF(`madebchange`.`ApprovedReject` like 'Reject%', 2, 
				IF(`madebchange`.`ApprovedReject` like 'Cancel%', 3, 
					IF(`madebchange`.`ApprovedReject` like 'Close%', 4, 
						null))))) as nMadebStatusID,
IF(`madebchange`.`ApprovedReject` IS null or `madebchange`.`ApprovedReject` = '', null, 
		IF(`madebchange`.`ApprovedReject` = 'Approved', null,
			IF(`madebchange`.`ApprovedReject` like 'Reject%', `madebchange`.`ApprovedReject`,`madebchange`.`ApprovedReject`))) as nMadebStatusID,
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
	IF(`madeblost`.`ApprovedReject` IS null or `madeblost`.`ApprovedReject` = '', null, 
		IF(`madeblost`.`ApprovedReject` = 'Approved', 1,
			IF(`madeblost`.`ApprovedReject` like 'Reject%', 2, 
				IF(`madeblost`.`ApprovedReject` like 'Cancel%', 3, 
					IF(`madeblost`.`ApprovedReject` like 'Close%', 4, 
						null))))) as nMadebStatusID,
	IF(`madeblost`.`ApprovedReject` IS null or `madeblost`.`ApprovedReject` = '', null, 
		IF(`madeblost`.`ApprovedReject` = 'Approved', null,
			IF(`madeblost`.`ApprovedReject` like 'Reject%', `madeblost`.`ApprovedReject`,`madeblost`.`ApprovedReject`))) as nMadebStatusID,
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
	null,
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
	null,
	null,
    `briefgb`.`RejectDate`,
    `briefgb`.`ReturnDate`,
	now(),
    `briefgb`.`EnteredBy`,
	now(),
    `briefgb`.`EnteredBy`
FROM `greenbookprime`.`briefgb`;



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



DROP table IF EXISTS `lnkFeatureUserRights`;

CREATE TABLE `lnkFeatureUserRights` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `nFeatureID` int(11) Not NULL,
  `nUserRightsID` int(11) Not NULL,
  `nRights` tinyint(1) NOT NULL,
  `dtEntered` datetime DEFAULT NULL,
  `nEnteredBy` int(11) Not NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
	VALUES (	1	,	5	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	2	,	5	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	3	,	5	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	4	,	5	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	5	,	5	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	6	,	5	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	7	,	5	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	8	,	5	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	9	,	5	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	10	,	5	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	11	,	5	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	12	,	5	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	13	,	5	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	14	,	5	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	15	,	5	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	16	,	5	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	17	,	5	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	18	,	5	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	19	,	5	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	20	,	5	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	21	,	5	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	22	,	5	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	23	,	5	,	TRUE	,now(),1);


INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	1	,	4	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	2	,	4	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	3	,	4	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	4	,	4	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	5	,	4	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	6	,	4	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	7	,	4	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	8	,	4	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	9	,	4	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	10	,	4	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	11	,	4	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	12	,	4	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	13	,	4	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	14	,	4	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	15	,	4	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	16	,	4	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	17	,	4	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	18	,	4	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	19	,	4	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	20	,	4	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	21	,	4	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	22	,	4	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	23	,	4	,	FALSE	,now(),1);

INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	1	,	3	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	2	,	3	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	3	,	3	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	4	,	3	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	5	,	3	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	6	,	3	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	7	,	3	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	8	,	3	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	9	,	3	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	10	,	3	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	11	,	3	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	12	,	3	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	13	,	3	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	14	,	3	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	15	,	3	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	16	,	3	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	17	,	3	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	18	,	3	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	19	,	3	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	20	,	3	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	21	,	3	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	22	,	3	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	23	,	3	,	FALSE	,now(),1);

INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	1	,	2	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	2	,	2	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	3	,	2	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	4	,	2	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	5	,	2	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	6	,	2	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	7	,	2	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	8	,	2	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	9	,	2	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	10	,	2	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	11	,	2	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	12	,	2	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	13	,	2	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	14	,	2	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	15	,	2	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	16	,	2	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	17	,	2	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	18	,	2	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	19	,	2	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	20	,	2	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	21	,	2	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	22	,	2	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	23	,	2	,	FALSE	,now(),1);

INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	1	,	1	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	2	,	1	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	3	,	1	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	4	,	1	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	5	,	1	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	6	,	1	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	7	,	1	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	8	,	1	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	9	,	1	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	10	,	1	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	11	,	1	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	12	,	1	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	13	,	1	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	14	,	1	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	15	,	1	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	16	,	1	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	17	,	1	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	18	,	1	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	19	,	1	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	20	,	1	,	TRUE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	21	,	1	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	22	,	1	,	FALSE	,now(),1);
INSERT INTO `ctadb`.`lnkfeatureuserrights` (`nFeatureID`,`nUserRightsID`,`nRights`,`dtEntered`,`nEnteredBy`)
VALUES (	23	,	1	,	FALSE	,now(),1);


INSERT INTO `ctadb`.`tblgivengbid`
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

INSERT INTO `ctadb`.`tblgreenbookissued`
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
UPDATE ctadb.tblgreenbookissued a
INNER JOIN ctadb.lstmadebtype b 
	ON a.sWhyIssued = b.sMadebDisplayKey
SET a.nMadebTypeId = b.Id;

UPDATE ctadb.tblgreenbookissued 
SET nAuthRegionId = null
WHERE nWhereIssued = 0;

UPDATE ctadb.tblgreenbookissued 
SET sRemarks = null
WHERE sRemarks = '';



INSERT INTO `ctadb`.`tblgreenbookserial`
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
UPDATE ctadb.tblgreenbookserial a
INNER JOIN ctadb.lstauthregion b 
	ON a.sAuthRegion = b.sAuthRegion
SET a.nAuthRegionId = b.Id;