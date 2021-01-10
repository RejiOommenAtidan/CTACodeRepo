
use ctadb;
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
    if(`ident`.`FormDate` REGEXP '\^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$',`ident`.`FormDate`,"2001-01-01") AS 'dtFormDate',
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
	null,
	`madeb`.`Email`,
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
		IF(`madebchange`.`ApprovedReject` = 'Approved', 2,
			IF(`madebchange`.`ApprovedReject` like 'Reject%', 3, 
				IF(`madebchange`.`ApprovedReject` like 'Cancel%', 4, 
					IF(`madebchange`.`ApprovedReject` like 'Close%', 5, 
						null))))) as nMadebStatusID,
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
		IF(`madeblost`.`ApprovedReject` = 'Approved', 2,
			IF(`madeblost`.`ApprovedReject` like 'Reject%', 3, 
				IF(`madeblost`.`ApprovedReject` like 'Cancel%', 4, 
					IF(`madeblost`.`ApprovedReject` like 'Close%', 5, 
						null))))) as nMadebStatusID,
	IF(`madeblost`.`ApprovedReject` IS null or `madeblost`.`ApprovedReject` = '', null, 
		IF(`madeblost`.`ApprovedReject` = 'Approved', null,
			IF(`madeblost`.`ApprovedReject` like 'Reject%', `madeblost`.`ApprovedReject`,`madeblost`.`ApprovedReject`))) as nMadebStatusRemark,
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


-- SELECT * FROM tblmadeb where dtReceived = '0000-00-00';
-- SELECT * FROM tblmadeb where dtIssueAction = '0000-00-00';
-- SELECT * FROM tblmadeb where dtEmailSend = '0000-00-00';
-- SELECT * FROM tblmadeb where dtReject = '0000-00-00';
-- SELECT * FROM tblmadeb where dtReturnEmail = '0000-00-00';
-- SELECT * FROM tblmadeb where sName = '';
-- SELECT * FROM tblgreenbook where dtDOB = '0000-00-00';
-- SELECT * FROM tblgreenbook where dtFormDate = '0000-00-00';
-- SELECT * FROM tblgreenbook where dtDeceased = '0000-00-00';
-- SELECT * FROM tblgreenbook where dtValidityDate = '0000-00-00';

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
    and   STR_TO_DATE(sEnteredDateTime, '%m/%d/%Y %H:%i:%s') < CURDATE();


UPDATE `tblgreenbook`
SET
`dtEntered` = STR_TO_DATE(sEnteredDateTime, '%m/%d/%Y %H:%i:%s')
WHERE (sEnteredDateTime like '%AM' OR sEnteredDateTime like '%PM' )
    and    STR_TO_DATE(sEnteredDateTime, '%m/%d/%Y %H:%i:%s') < CURDATE();

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


INSERT INTO `tblauditlog` 
( 
	`dtEntered`, 
	`nFeatureID`, 
	`nRegionID`, 
	`nRecordID`, 
	`sGBID`, 
	`sFieldValuesOld`, 
	`sFieldValuesNew`, 
	`nEnteredBy`
) 
SELECT   
	historychangeschild.ModifiedDate as dtEntered     
	, 101 as nFeatureID     
	, null as nRegionID     
	, historychangeschild.ChildID as nRecordID     
	, historychangeschild.ParentID as sGBID     
	, concat(historychangeschild.FieldName, ' = ',historychangeschild.ChangesFrom) as sFieldValuesOld
	, concat(historychangeschild.FieldName, ' = ',historychangeschild.ChangesFrom) as sFieldValuesNew
	,if(concat('',historychangeschild.byWhom * 1) = historychangeschild.byWhom,historychangeschild.byWhom,1) as nEnteredBy 
FROM greenbookprime.historychangeschild; 


SET SQL_SAFE_UPDATES=0;
UPDATE lstMadebType
		,(SELECT tblmadeb.nMadebTypeID as ID, Max(tblmadeb.nFormNumber) AS LastFormNumber
			FROM lstMadebType
			INNER JOIN tblmadeb ON tblmadeb.nMadebTypeID = lstMadebType.ID
			group by tblmadeb.nMadebTypeID
			) as MaxNum
        SET lstMadebType.nMadebLastFormNumber = MaxNum.LastFormNumber
        where lstMadebType.ID = MaxNum.ID;
		

INSERT INTO `tblauditlog`
(
`dtEntered`,
`nFeatureID`,
`nRegionID`,
`nRecordID`,
`sGBID`,
`sFieldValuesOld`,
`sFieldValuesNew`,
`nEnteredBy`)
SELECT 
	`deletelog`.`WhenDeleted`,
	17,
    null,
    `deletelog`.`ID`,
    `deletelog`.`IdentityID`,
    concat('Name = ',`deletelog`.`Name`) as sFieldValuesOld,
    concat('Delete GB = ',`deletelog`.`IdentityID`) as sFieldValuesNew,
    1
FROM `greenbookprime`.`deletelog`;


CREATE TABLE `tmpGBDocument` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sGBId` varchar(255) NOT NULL,
  `sTitle` varchar(255) DEFAULT NULL,
  `sDocType` varchar(255) DEFAULT NULL,
  `imageFileName` varchar(255) DEFAULT NULL,
  `sFileExtension` varchar(255) DEFAULT NULL,
  `nRegisterDate` datetime DEFAULT NULL,
  `dtEntered` datetime NOT NULL,
  `nEnteredBy` int(11) NOT NULL,
  `dtUpdated` datetime NOT NULL,
  `nUpdatedBy` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `GB_TMP_DOC_GBID` (`sGBId`)
)ENGINE=InnoDB AUTO_INCREMENT=1 ;


INSERT INTO `ctadb`.`tmpgbdocument`
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
  
  
INSERT INTO tblchatrelpayment (sGBId,nChatrelYear,nChatrelTotalAmount,sChatrelReceiptNumber,sPaymentStatus,sPaymentMode,sPaymentCurrency,sPaidByGBId,sPayPal_Status,sPayPal_ID,sPayPal_Currency_Code,sPayPal_Currency_Value,sPayPal_Response_Object,dtPayment,dtEntered,nEnteredBy,dtUpdated,nUpdatedBy) VALUES ('4489430',2020,500.23,'1','Success','Online','USD','9675',NULL,NULL,NULL,NULL,NULL,'2020-12-01 16:54:44.0','2020-12-01 16:54:44.0',9675,'2020-12-01 16:54:44.0',9675), ('4110460',2020,314.71,'2','Success','Online','USD','9675',NULL,NULL,NULL,NULL,NULL,'2020-12-01 17:08:07.0','2020-12-01 17:08:07.0',9675,'2020-12-01 17:08:07.0',9675), ('23542',2020,11.98,'3','Success','Online','INR','8822',NULL,NULL,NULL,NULL,NULL,'2020-12-01 18:28:18.0','2020-12-01 18:28:18.0',8822,'2020-12-01 18:28:18.0',8822), ('1443296',2020,7.32,'4','Success','Online','INR','1443296',NULL,NULL,NULL,NULL,NULL,'2020-12-01 21:17:21.0','2020-12-01 21:17:21.0',1443296,'2020-12-01 21:17:21.0',1443296), ('693161',2020,7.82,'5','Success','Online','INR','1443296',NULL,NULL,NULL,NULL,NULL,'2020-12-01 21:28:05.0','2020-12-01 21:28:05.0',1443296,'2020-12-01 21:28:05.0',1443296);


SET SQL_SAFE_UPDATES=0;
update tblchatrelpayment
set sPaymentMode = 'Offline';




INSERT INTO lnkgbchatrel (chatrelpaymentID,sGBId,nChatrelAmount,nChatrelMeal,nChatrelYear,nChatrelLateFeesPercentage,nChatrelLateFeesValue,nArrearsAmount,dtArrearsFrom,dtArrearsTo,nCurrentChatrelSalaryAmt,dtCurrentChatrelFrom,dtCurrentChatrelTo,nChatrelTotalAmount,sChatrelReceiptNumber,nAuthRegionID,sCountryID,sPaymentCurrency,sAuthRegionCurrency,nConversionRate,sPaidByGBId,dtPayment,dtEntered,nEnteredBy,dtUpdated,nUpdatedBy) 
VALUES (1,'4489430',48.00,10.00,2011,10,5.80,63.80,'2011-04-01','2012-03-31',0.00,'2011-04-01','2012-03-31',0.86,'1',135,'NP','USD','INR',0.01,'9675','2020-12-01 16:54:44.0','2020-12-01 16:54:44.0',9675,'2020-12-01 16:54:44.0',9675)
, (1,'4489430',48.00,10.00,2012,10,5.80,63.80,'2012-04-01','2013-03-31',0.00,'2012-04-01','2013-03-31',0.86,'1',135,'NP','USD','INR',0.01,'9675','2020-12-01 16:54:44.0','2020-12-01 16:54:44.0',9675,'2020-12-01 16:54:44.0',9675), (1,'4489430',36.00,10.00,2013,10,9.60,105.60,'2013-04-01','2014-03-31',50.00,'2013-04-01','2014-03-31',105.60,'1',131,'CH','USD','USD',1.00,'9675','2020-12-01 16:54:44.0','2020-12-01 16:54:44.0',9675,'2020-12-01 16:54:44.0',9675), (1,'4489430',36.00,10.00,2014,10,9.60,105.60,'2014-04-01','2015-03-31',50.00,'2014-04-01','2015-03-31',105.60,'1',131,'CH','USD','USD',1.00,'9675','2020-12-01 16:54:44.0','2020-12-01 16:54:44.0',9675,'2020-12-01 16:54:44.0',9675), (1,'4489430',36.00,10.00,2015,10,9.60,105.60,'2015-04-01','2016-03-31',50.00,'2015-04-01','2016-03-31',105.60,'1',141,'JP','USD','USD',1.00,'9675','2020-12-01 16:54:44.0','2020-12-01 16:54:44.0',9675,'2020-12-01 16:54:44.0',9675), (1,'4489430',36.00,10.00,2016,10,4.60,50.60,'2016-04-01','2017-03-31',0.00,'2016-04-01','2017-03-31',50.60,'1',132,'TW','USD','USD',1.00,'9675','2020-12-01 16:54:44.0','2020-12-01 16:54:44.0',9675,'2020-12-01 16:54:44.0',9675), (1,'4489430',48.00,10.00,2017,10,5.80,63.80,'2017-04-01','2018-03-31',0.00,'2017-04-01','2018-03-31',0.86,'1',135,'NP','USD','INR',0.01,'9675','2020-12-01 16:54:44.0','2020-12-01 16:54:44.0',9675,'2020-12-01 16:54:44.0',9675), (1,'4489430',36.00,10.00,2018,10,4.60,50.60,'2018-04-01','2019-03-31',0.00,'2018-04-01','2019-03-31',50.60,'1',149,'US','USD','USD',1.00,'9675','2020-12-01 16:54:44.0','2020-12-01 16:54:44.0',9675,'2020-12-01 16:54:44.0',9675), (1,'4489430',48.00,10.00,2019,10,5.80,63.80,'2019-04-01','2020-03-31',0.00,'2019-04-01','2020-03-31',0.86,'1',135,'NP','USD','INR',0.01,'9675','2020-12-01 16:54:44.0','2020-12-01 16:54:44.0',9675,'2020-12-01 16:54:44.0',9675), (1,'4489430',48.00,10.00,2020,10,0.00,NULL,NULL,NULL,0.00,'2020-04-01','2021-03-31',0.78,'1',135,'NP','USD','INR',0.01,'9675','2020-12-01 16:54:44.0','2020-12-01 16:54:44.0',9675,'2020-12-01 16:54:44.0',9675), (2,'4110460',48.00,10.00,2011,10,5.80,63.80,'2011-04-01','2012-03-31',0.00,'2011-04-01','2012-03-31',0.86,'2',135,'NP','USD','INR',0.01,'9675','2020-12-01 17:08:07.0','2020-12-01 17:08:07.0',9675,'2020-12-01 17:08:07.0',9675), (2,'4110460',48.00,10.00,2012,10,5.80,63.80,'2012-04-01','2013-03-31',0.00,'2012-04-01','2013-03-31',0.86,'2',135,'NP','USD','INR',0.01,'9675','2020-12-01 17:08:07.0','2020-12-01 17:08:07.0',9675,'2020-12-01 17:08:07.0',9675), (2,'4110460',48.00,10.00,2013,10,15.80,173.80,'2013-04-01','2014-03-31',100.00,'2013-04-01','2014-03-31',2.35,'2',135,'NP','USD','INR',0.01,'9675','2020-12-01 17:08:07.0','2020-12-01 17:08:07.0',9675,'2020-12-01 17:08:07.0',9675), (2,'4110460',48.00,10.00,2014,10,5.80,63.80,'2014-04-01','2015-03-31',0.00,'2014-04-01','2015-03-31',0.86,'2',135,'NP','USD','INR',0.01,'9675','2020-12-01 17:08:07.0','2020-12-01 17:08:07.0',9675,'2020-12-01 17:08:07.0',9675), (2,'4110460',48.00,10.00,2015,10,5.80,63.80,'2015-04-01','2016-03-31',0.00,'2015-04-01','2016-03-31',0.86,'2',135,'NP','USD','INR',0.01,'9675','2020-12-01 17:08:07.0','2020-12-01 17:08:07.0',9675,'2020-12-01 17:08:07.0',9675), (2,'4110460',48.00,10.00,2016,10,5.80,63.80,'2016-04-01','2017-03-31',0.00,'2016-04-01','2017-03-31',0.86,'2',135,'NP','USD','INR',0.01,'9675','2020-12-01 17:08:07.0','2020-12-01 17:08:07.0',9675,'2020-12-01 17:08:07.0',9675), (2,'4110460',48.00,10.00,2017,10,5.80,63.80,'2017-04-01','2018-03-31',0.00,'2017-04-01','2018-03-31',0.86,'2',135,'NP','USD','INR',0.01,'9675','2020-12-01 17:08:07.0','2020-12-01 17:08:07.0',9675,'2020-12-01 17:08:07.0',9675), (2,'4110460',36.00,10.00,2018,10,9.60,105.60,'2018-04-01','2019-03-31',50.00,'2018-04-01','2019-03-31',105.60,'2',75,'US','USD','USD',1.00,'9675','2020-12-01 17:08:07.0','2020-12-01 17:08:07.0',9675,'2020-12-01 17:08:07.0',9675), (2,'4110460',36.00,10.00,2019,10,9.60,105.60,'2019-04-01','2020-03-31',50.00,'2019-04-01','2020-03-31',105.60,'2',71,'GB','USD','USD',1.00,'9675','2020-12-01 17:08:07.0','2020-12-01 17:08:07.0',9675,'2020-12-01 17:08:07.0',9675), (2,'4110460',36.00,10.00,2020,10,0.00,NULL,NULL,NULL,50.00,'2020-04-01','2021-03-31',96.00,'2',71,'GB','USD','USD',1.00,'9675','2020-12-01 17:08:07.0','2020-12-01 17:08:07.0',9675,'2020-12-01 17:08:07.0',9675), (3,'23542',48.00,10.00,2007,10,5.80,63.80,'2007-04-01','2008-03-31',0.00,'2007-04-01','2008-03-31',0.86,'3',12,'BT','USD','INR',0.01,'8822','2020-12-01 18:28:18.0','2020-12-01 18:28:18.0',8822,'2020-12-01 18:28:18.0',8822), (3,'23542',48.00,10.00,2008,10,5.80,63.80,'2008-04-01','2009-03-31',0.00,'2008-04-01','2009-03-31',0.86,'3',12,'BT','USD','INR',0.01,'8822','2020-12-01 18:28:18.0','2020-12-01 18:28:18.0',8822,'2020-12-01 18:28:18.0',8822), (3,'23542',48.00,10.00,2009,10,5.80,63.80,'2009-04-01','2010-03-31',0.00,'2009-04-01','2010-03-31',0.86,'3',12,'BT','USD','INR',0.01,'8822','2020-12-01 18:28:18.0','2020-12-01 18:28:18.0',8822,'2020-12-01 18:28:18.0',8822), (3,'23542',48.00,10.00,2010,10,5.80,63.80,'2010-04-01','2011-03-31',0.00,'2010-04-01','2011-03-31',0.86,'3',12,'BT','USD','INR',0.01,'8822','2020-12-01 18:28:18.0','2020-12-01 18:28:18.0',8822,'2020-12-01 18:28:18.0',8822), (3,'23542',48.00,10.00,2011,10,5.80,63.80,'2011-04-01','2012-03-31',0.00,'2011-04-01','2012-03-31',0.86,'3',12,'BT','USD','INR',0.01,'8822','2020-12-01 18:28:18.0','2020-12-01 18:28:18.0',8822,'2020-12-01 18:28:18.0',8822), (3,'23542',48.00,10.00,2012,10,5.80,63.80,'2012-04-01','2013-03-31',0.00,'2012-04-01','2013-03-31',0.86,'3',12,'BT','USD','INR',0.01,'8822','2020-12-01 18:28:18.0','2020-12-01 18:28:18.0',8822,'2020-12-01 18:28:18.0',8822), (3,'23542',48.00,10.00,2013,10,5.80,63.80,'2013-04-01','2014-03-31',0.00,'2013-04-01','2014-03-31',0.86,'3',12,'BT','USD','INR',0.01,'8822','2020-12-01 18:28:18.0','2020-12-01 18:28:18.0',8822,'2020-12-01 18:28:18.0',8822), (3,'23542',48.00,10.00,2014,10,5.80,63.80,'2014-04-01','2015-03-31',0.00,'2014-04-01','2015-03-31',0.86,'3',12,'BT','USD','INR',0.01,'8822','2020-12-01 18:28:18.0','2020-12-01 18:28:18.0',8822,'2020-12-01 18:28:18.0',8822), (3,'23542',48.00,10.00,2015,10,5.80,63.80,'2015-04-01','2016-03-31',0.00,'2015-04-01','2016-03-31',0.86,'3',12,'BT','USD','INR',0.01,'8822','2020-12-01 18:28:18.0','2020-12-01 18:28:18.0',8822,'2020-12-01 18:28:18.0',8822), (3,'23542',48.00,10.00,2016,10,5.80,63.80,'2016-04-01','2017-03-31',0.00,'2016-04-01','2017-03-31',0.86,'3',12,'BT','USD','INR',0.01,'8822','2020-12-01 18:28:18.0','2020-12-01 18:28:18.0',8822,'2020-12-01 18:28:18.0',8822), (3,'23542',48.00,10.00,2017,10,5.80,63.80,'2017-04-01','2018-03-31',0.00,'2017-04-01','2018-03-31',0.86,'3',12,'BT','USD','INR',0.01,'8822','2020-12-01 18:28:18.0','2020-12-01 18:28:18.0',8822,'2020-12-01 18:28:18.0',8822), (3,'23542',48.00,10.00,2018,10,5.80,63.80,'2018-04-01','2019-03-31',0.00,'2018-04-01','2019-03-31',0.86,'3',12,'BT','USD','INR',0.01,'8822','2020-12-01 18:28:18.0','2020-12-01 18:28:18.0',8822,'2020-12-01 18:28:18.0',8822), (3,'23542',48.00,10.00,2019,10,5.80,63.80,'2019-04-01','2020-03-31',0.00,'2019-04-01','2020-03-31',0.86,'3',12,'BT','USD','INR',0.01,'8822','2020-12-01 18:28:18.0','2020-12-01 18:28:18.0',8822,'2020-12-01 18:28:18.0',8822), (3,'23542',48.00,10.00,2020,10,0.00,NULL,NULL,NULL,0.00,'2020-04-01','2021-03-31',0.78,'3',12,'BT','USD','INR',0.01,'8822','2020-12-01 18:28:18.0','2020-12-01 18:28:18.0',8822,'2020-12-01 18:28:18.0',8822), (4,'1443296',12.00,0.00,2010,10,1.20,13.20,'2010-04-01','2011-03-31',0.00,'2010-04-01','2011-03-31',0.18,'4',35,'IN','USD','INR',0.01,'1443296','2020-12-01 21:17:21.0','2020-12-01 21:17:21.0',1443296,'2020-12-01 21:17:21.0',1443296), (4,'1443296',12.00,0.00,2011,10,1.20,13.20,'2011-04-01','2012-03-31',0.00,'2011-04-01','2012-03-31',0.18,'4',35,'IN','USD','INR',0.01,'1443296','2020-12-01 21:17:21.0','2020-12-01 21:17:21.0',1443296,'2020-12-01 21:17:21.0',1443296), (4,'1443296',30.00,0.00,2012,10,3.00,33.00,'2012-04-01','2013-03-31',0.00,'2012-04-01','2013-03-31',0.45,'4',35,'IN','USD','INR',0.01,'1443296','2020-12-01 21:17:21.0','2020-12-01 21:17:21.0',1443296,'2020-12-01 21:17:21.0',1443296), (4,'1443296',48.00,0.00,2013,10,4.80,52.80,'2013-04-01','2014-03-31',0.00,'2013-04-01','2014-03-31',0.71,'4',35,'IN','USD','INR',0.01,'1443296','2020-12-01 21:17:21.0','2020-12-01 21:17:21.0',1443296,'2020-12-01 21:17:21.0',1443296), (4,'1443296',48.00,0.00,2014,10,4.80,52.80,'2014-04-01','2015-03-31',0.00,'2014-04-01','2015-03-31',0.71,'4',35,'IN','USD','INR',0.01,'1443296','2020-12-01 21:17:21.0','2020-12-01 21:17:21.0',1443296,'2020-12-01 21:17:21.0',1443296), (4,'1443296',48.00,10.00,2015,10,5.80,63.80,'2015-04-01','2016-03-31',0.00,'2015-04-01','2016-03-31',0.86,'4',35,'IN','USD','INR',0.01,'1443296','2020-12-01 21:17:21.0','2020-12-01 21:17:21.0',1443296,'2020-12-01 21:17:21.0',1443296), (4,'1443296',48.00,10.00,2016,10,5.80,63.80,'2016-04-01','2017-03-31',0.00,'2016-04-01','2017-03-31',0.86,'4',35,'IN','USD','INR',0.01,'1443296','2020-12-01 21:17:21.0','2020-12-01 21:17:21.0',1443296,'2020-12-01 21:17:21.0',1443296), (4,'1443296',48.00,10.00,2017,10,5.80,63.80,'2017-04-01','2018-03-31',0.00,'2017-04-01','2018-03-31',0.86,'4',35,'IN','USD','INR',0.01,'1443296','2020-12-01 21:17:21.0','2020-12-01 21:17:21.0',1443296,'2020-12-01 21:17:21.0',1443296), (4,'1443296',48.00,10.00,2018,10,5.80,63.80,'2018-04-01','2019-03-31',0.00,'2018-04-01','2019-03-31',0.86,'4',35,'IN','USD','INR',0.01,'1443296','2020-12-01 21:17:21.0','2020-12-01 21:17:21.0',1443296,'2020-12-01 21:17:21.0',1443296), (4,'1443296',48.00,10.00,2019,10,5.80,63.80,'2019-04-01','2020-03-31',0.00,'2019-04-01','2020-03-31',0.86,'4',35,'IN','USD','INR',0.01,'1443296','2020-12-01 21:17:21.0','2020-12-01 21:17:21.0',1443296,'2020-12-01 21:17:21.0',1443296), (4,'1443296',48.00,10.00,2020,10,0.00,NULL,NULL,NULL,0.00,'2020-04-01','2021-03-31',0.78,'4',35,'IN','USD','INR',0.01,'1443296','2020-12-01 21:17:21.0','2020-12-01 21:17:21.0',1443296,'2020-12-01 21:17:21.0',1443296), (5,'693161',12.00,0.00,2010,10,1.20,13.20,'2010-04-01','2011-03-31',0.00,'2010-04-01','2011-03-31',0.18,'5',35,'IN','USD','INR',0.01,'1443296','2020-12-01 21:28:05.0','2020-12-01 21:28:05.0',1443296,'2020-12-01 21:28:05.0',1443296), (5,'693161',18.00,0.00,2011,10,1.80,19.80,'2011-04-01','2012-03-31',0.00,'2011-04-01','2012-03-31',0.27,'5',35,'IN','USD','INR',0.01,'1443296','2020-12-01 21:28:05.0','2020-12-01 21:28:05.0',1443296,'2020-12-01 21:28:05.0',1443296), (5,'693161',48.00,0.00,2012,10,4.80,52.80,'2012-04-01','2013-03-31',0.00,'2012-04-01','2013-03-31',0.71,'5',35,'IN','USD','INR',0.01,'1443296','2020-12-01 21:28:05.0','2020-12-01 21:28:05.0',1443296,'2020-12-01 21:28:05.0',1443296), (5,'693161',48.00,0.00,2013,10,4.80,52.80,'2013-04-01','2014-03-31',0.00,'2013-04-01','2014-03-31',0.71,'5',35,'IN','USD','INR',0.01,'1443296','2020-12-01 21:28:05.0','2020-12-01 21:28:05.0',1443296,'2020-12-01 21:28:05.0',1443296), (5,'693161',48.00,10.00,2014,10,5.80,63.80,'2014-04-01','2015-03-31',0.00,'2014-04-01','2015-03-31',0.86,'5',35,'IN','USD','INR',0.01,'1443296','2020-12-01 21:28:05.0','2020-12-01 21:28:05.0',1443296,'2020-12-01 21:28:05.0',1443296), (5,'693161',48.00,10.00,2015,10,5.80,63.80,'2015-04-01','2016-03-31',0.00,'2015-04-01','2016-03-31',0.86,'5',35,'IN','USD','INR',0.01,'1443296','2020-12-01 21:28:05.0','2020-12-01 21:28:05.0',1443296,'2020-12-01 21:28:05.0',1443296), (5,'693161',48.00,10.00,2016,10,5.80,63.80,'2016-04-01','2017-03-31',0.00,'2016-04-01','2017-03-31',0.86,'5',35,'IN','USD','INR',0.01,'1443296','2020-12-01 21:28:05.0','2020-12-01 21:28:05.0',1443296,'2020-12-01 21:28:05.0',1443296), (5,'693161',48.00,10.00,2017,10,5.80,63.80,'2017-04-01','2018-03-31',0.00,'2017-04-01','2018-03-31',0.86,'5',35,'IN','USD','INR',0.01,'1443296','2020-12-01 21:28:05.0','2020-12-01 21:28:05.0',1443296,'2020-12-01 21:28:05.0',1443296), (5,'693161',48.00,10.00,2018,10,5.80,63.80,'2018-04-01','2019-03-31',0.00,'2018-04-01','2019-03-31',0.86,'5',35,'IN','USD','INR',0.01,'1443296','2020-12-01 21:28:05.0','2020-12-01 21:28:05.0',1443296,'2020-12-01 21:28:05.0',1443296), (5,'693161',48.00,10.00,2019,10,5.80,63.80,'2019-04-01','2020-03-31',0.00,'2019-04-01','2020-03-31',0.86,'5',35,'IN','USD','INR',0.01,'1443296','2020-12-01 21:28:05.0','2020-12-01 21:28:05.0',1443296,'2020-12-01 21:28:05.0',1443296), (5,'693161',48.00,10.00,2020,10,0.00,NULL,NULL,NULL,0.00,'2020-04-01','2021-03-31',0.78,'5',35,'IN','USD','INR',0.01,'1443296','2020-12-01 21:28:05.0','2020-12-01 21:28:05.0',1443296,'2020-12-01 21:28:05.0',1443296);


INSERT INTO lnkgbchatreldonation (chatrelpaymentID,sGBId,nChatrelAdditionalDonationAmt,nChatrelBusinessDonationAmt,sChatrelReceiptNumber,nAuthRegionID,sCountryID,sPaymentCurrency,sAuthRegionCurrency,nConversionRate,sPaidByGBId,dtPayment,dtEntered,nEnteredBy,dtUpdated,nUpdatedBy) VALUES (1,'4489430',60.00,18.00,'1',135,'NP','USD','INR',1.00,'9675','2020-12-01 16:54:44.0','2020-12-01 16:54:44.0',1,'2020-12-01 16:54:44.0',1);
