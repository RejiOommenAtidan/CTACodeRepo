
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
	VALUES ('sherab', 'sherab gyatso', '', 'jojo', '4', '1',now(),1,now(),1);


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
`nEnteredBy`,
`dtUpdated`,
`nUpdatedBy`
)
SELECT `lnkgbchildren`.`Id`,
    `lnkgbchildren`.`sGBIDParent`,
    `lnkgbchildren`.`sName`,
    `lnkgbchildren`.`dtDOB`,
    `lnkgbchildren`.`sGender`,
    `lnkgbchildren`.`sChildID`,
    `lnkgbchildren`.`sGBIDChild`,
    `lnkgbchildren`.`dtEntered`,
    `lnkgbchildren`.`nEnteredBy`,
    `lnkgbchildren`.`dtUpdated`,
    `lnkgbchildren`.`nUpdatedBy`
FROM `ctadb`.`lnkgbchildren`;



INSERT INTO `lnkgbnote`
(`Id`,
`sGBId`,
`sNote`,
`dtEntered`,
`nEnteredBy`,
`dtUpdated`,
`nUpdatedBy`)
SELECT `lnkgbnote`.`Id`,
    `lnkgbnote`.`sGBId`,
    `lnkgbnote`.`sNote`,
    `lnkgbnote`.`dtEntered`,
    `lnkgbnote`.`nEnteredBy`,
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

INSERT INTO `lnkgbdocument`
(`id`,
`sGBId`,
`sTitle`,
`sDocType`,
`binFileDoc`,
`sFileExtension`,
`nRegisterDate`,
`dtEntered`,
`nEnteredBy`,
`dtUpdated`,
`nUpdatedBy`)
SELECT `lnkgbdocument`.`id`,
    `lnkgbdocument`.`sGBId`,
    `lnkgbdocument`.`sTitle`,
    `lnkgbdocument`.`sDocType`,
    `lnkgbdocument`.`binFileDoc`,
    `lnkgbdocument`.`sFileExtension`,
    `lnkgbdocument`.`nRegisterDate`,
    `lnkgbdocument`.`dtEntered`,
    `lnkgbdocument`.`nEnteredBy`,
    `lnkgbdocument`.`dtUpdated`,
    `lnkgbdocument`.`nUpdatedBy`
FROM `ctadb`.`lnkgbdocument`;

INSERT INTO `tblauditlog`
(`Id`,
`dtEntered`,
`nFeatureID`,
`nRegionID`,
`nRecordID`,
`sGBID`,
`sFieldValuesOld`,
`sFieldValuesNew`,
`nEnteredBy`)
SELECT `tblauditlog`.`Id`,
    `tblauditlog`.`dtEntered`,
    `tblauditlog`.`nFeatureID`,
    `tblauditlog`.`nRegionID`,
    `tblauditlog`.`nRecordID`,
    `tblauditlog`.`sGBID`,
    `tblauditlog`.`sFieldValuesOld`,
    `tblauditlog`.`sFieldValuesNew`,
    `tblauditlog`.`nEnteredBy`
FROM `ctadb`.`tblauditlog`;