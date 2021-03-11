    
CALL spReportGreenBookIssuedOverAll (2,'2003-12-14','2009-12-17','lstauthregion.sAuthRegion','lstauthregion.sAuthRegion');
CALL spReportGreenBookIssuedOverAll (2,'2003-12-14','2009-12-17','lstcountry.sCountryID','lstcountry.sCountryID');
CALL spReportGreenBookIssuedOverAll (3,'2003-12-14','2009-12-17','lstauthregion.sAuthRegion','lstauthregion.sAuthRegion');
CALL spReportGreenBookIssuedOverAll (3,'2003-12-14','2009-12-17','lstcountry.sCountryID','lstcountry.sCountryID');
CALL spReportGreenBookIssuedOverAll (4,'2011-12-14','2015-12-17','lstauthregion.sAuthRegion','lstauthregion.sAuthRegion');
CALL spReportGreenBookIssuedOverAll (4,'2011-12-14','2015-12-17','lstcountry.sCountryID','lstcountry.sCountryID');
CALL spReportGreenBookIssuedOverAll (5,'2003-12-14','2012-12-17','lstauthregion.sAuthRegion','lstauthregion.sAuthRegion');
CALL spReportGreenBookIssuedOverAll (5,'2003-12-14','2012-12-17','lstcountry.sCountryID','lstcountry.sCountryID');
CALL spReportGreenBookIssuedOverAll (6,'2003-12-14','2015-12-17','lstauthregion.sAuthRegion','lstauthregion.sAuthRegion');
CALL spReportGreenBookIssuedOverAll (6,'2001-12-14','2015-12-17','lstcountry.sCountryID','lstcountry.sCountryID');



CALL spReportGreenBookIssuedIndividual ('F','2020-03-10','2020-04-10','lstcountry.sCountry','lstcountry.sCountry');
CALL spReportGreenBookIssuedIndividual ('F','2020-03-10','2020-04-10','lstauthregion.ID','lstauthregion.sAuthRegion');
CALL spReportGreenBookIssuedIndividual ('M','2003-12-14','2009-12-17','lstcountry.sCountry','lstcountry.sCountry');
CALL spReportGreenBookIssuedIndividual ('M','2003-12-14','2009-12-17','lstauthregion.ID','lstauthregion.sAuthRegion');
CALL spReportGreenBookIssuedIndividual ('L','2003-12-14','2009-12-17','lstcountry.sCountry','lstcountry.sCountry');
CALL spReportGreenBookIssuedIndividual ('L','2003-12-14','2009-12-17','lstauthregion.ID','lstauthregion.sAuthRegion');
CALL spReportGreenBookIssuedIndividual ('A','2011-12-14','2015-12-17','lstcountry.sCountry','lstcountry.sCountry');
CALL spReportGreenBookIssuedIndividual ('A','2011-12-14','2015-12-17','lstauthregion.ID','lstauthregion.sAuthRegion');
CALL spReportGreenBookIssuedIndividual ('U','2003-12-14','2012-12-17','lstcountry.sCountry','lstcountry.sCountry');
CALL spReportGreenBookIssuedIndividual ('U','2003-12-14','2012-12-17','lstauthregion.ID','lstauthregion.sAuthRegion');
CALL spReportGreenBookIssuedIndividual ('B','2003-12-14','2015-12-17','lstcountry.sCountry','lstcountry.sCountry');
CALL spReportGreenBookIssuedIndividual ('B','2003-12-14','2015-12-17','lstauthregion.ID','lstauthregion.sAuthRegion');


CALL spReportCTAChangesLog ('2015-12-17');
CALL spReportCTAChangesLog ('2015-12-17');

CALL spReportCTAChangesLogForChildren ('2015-12-17');
CALL spReportCTAChangesLogForChildren ('2015-12-17');

CALL spReportCTANewEntryFromDay ('2015-12-17');
CALL spReportCTANewEntryFromDay ('2015-12-17');

CALL spReportCTABelow6Years ('lstauthregion.sAuthRegion');
CALL spReportCTABelow6Years ('lstcountry.sCountry');

CALL spReportCTADeceasedRegionOrCountryWise ('2009-12-17','2015-12-17','lstcountry.sCountry');
CALL spReportCTADeceasedRegionOrCountryWise ('2009-12-17','2015-12-17','lstauthregion.sAuthRegion');


CALL spReportCTAMadebRegionOrCountryWise ('F','2009-12-17','2015-12-17','lstcountry.sCountry');
CALL spReportCTAMadebRegionOrCountryWise ('F','2009-12-17','2015-12-17','lstauthregion.sAuthRegion');
CALL spReportCTAMadebRegionOrCountryWise ('M','2009-12-17','2015-12-17','lstcountry.sCountry');
CALL spReportCTAMadebRegionOrCountryWise ('M','2009-12-17','2015-12-17','lstauthregion.sAuthRegion');
CALL spReportCTAMadebRegionOrCountryWise ('L','2009-12-17','2015-12-17','lstcountry.sCountry');
CALL spReportCTAMadebRegionOrCountryWise ('L','2009-12-17','2015-12-17','lstauthregion.sAuthRegion');
CALL spReportCTAMadebRegionOrCountryWise ('A','2009-12-17','2015-12-17','lstcountry.sCountry');
CALL spReportCTAMadebRegionOrCountryWise ('A','2009-12-17','2015-12-17','lstauthregion.sAuthRegion');
CALL spReportCTAMadebRegionOrCountryWise ('U','2009-12-17','2015-12-17','lstcountry.sCountry');
CALL spReportCTAMadebRegionOrCountryWise ('U','2009-12-17','2015-12-17','lstauthregion.sAuthRegion');
CALL spReportCTAMadebRegionOrCountryWise ('B','2009-12-17','2015-12-17','lstcountry.sCountry');
CALL spReportCTAMadebRegionOrCountryWise ('B','2009-12-17','2015-12-17','lstauthregion.sAuthRegion');




CALL spReportChatrelSuccessRecordsRegionOrCountryWise ('2009-12-17','2015-12-17','lnkgbchatrel.nAuthRegionID');
CALL spReportChatrelSuccessRecordsRegionOrCountryWise ('2009-12-17','2015-12-17','lnkgbchatrel.sCountryID');
CALL spReportChatrelFailedRecordsRegionOrCountryWise ('2009-12-17','2015-12-17','lnkgbchatrel.sCountryID');
CALL spReportChatrelFailedRecordsRegionOrCountryWise ('2009-12-17','2015-12-17','lnkgbchatrel.nAuthRegionID');
CALL spReportChatrelRecordsRegionOrCountryWise ('2009-12-17','2015-12-17','lnkgbchatrel.sCountryID');
CALL spReportChatrelRecordsRegionOrCountryWise ('2009-12-17','2015-12-17','lnkgbchatrel.nAuthRegionID');



======================================================================

CALL spReportGreenBookDeleted ('2014-01-14','2014-12-17');


-- Create index in greenbookPrime

CREATE INDEX FORMNO_INDEX_MADEB ON MADEB(FormNo);
CREATE INDEX FORMNO_INDEX_GBNOGIVEN ON GBNOGIVEN(FormNo);
CREATE INDEX GIVENORNOT_INDEX_GBNOGIVEN ON GBNOGIVEN(GivenOrNot);
CREATE INDEX IDENTITYID_INDEX_IDENT_BOOKISSUED ON IDENT_BOOKISSUED(IdentityID);
CREATE INDEX WHYISSUED_INDEX_IDENT_BOOKISSUED ON IDENT_BOOKISSUED(WhyIssued);
CREATE INDEX IDNo_INDEX_IDENT_BOOKSERIAL ON IDENT_BOOKSERIAL(IDNo);
CREATE INDEX GB_INDEX_abroad ON abroad(GB);