
use ctadb;

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


INSERT INTO `ctadb`.`tblrecentlysearchedgb`
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
 FROM `greenbookprime`.`recentlysearchedgb`
 

INSERT INTO `ctadb`.`lnkgbchildren`
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
SELECT 
	`ident_children`.`ID`,
	`ident_children`.`ParentID`,
	`ident_children`.`Name`,
	`ident_children`.`DOB`,
	`ident_children`.`Gender`,
	`ident_children`.`ChildID`,
	`ident_children`.`ChildIdentityID`,
	now(),
	1
FROM `greenbookprime`.`ident_children`;


INSERT INTO `ctadb`.`lnkgbnote`
(`Id`,
`sGBId`,
`sNote`,
`dtEntered`,
`nEnteredBy`)
SELECT `ident_note`.`NoteID`,
    `ident_note`.`IdentityID`,
    `ident_note`.`Note`,
    `ident_note`.`Entered`,
    `ident_note`.`EnteredBy`
FROM `greenbookprime`.`ident_note`;