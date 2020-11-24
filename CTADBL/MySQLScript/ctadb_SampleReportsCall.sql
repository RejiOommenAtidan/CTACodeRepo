CALL spReportGreenBookIssuedOverAll ('F','2004-12-14','2004-12-17','lstauthregion.sAuthRegion');
CALL spReportGreenBookIssuedOverAll ('F','2004-12-14','2004-12-17','lstauthregion.sCountryID');
CALL spReportGreenBookIssuedOverAll ('M','2003-12-14','2009-12-17','lstauthregion.sAuthRegion');
CALL spReportGreenBookIssuedOverAll ('M','2003-12-14','2009-12-17','lstauthregion.sCountryID');
CALL spReportGreenBookIssuedOverAll ('L','2003-12-14','2009-12-17','lstauthregion.sAuthRegion');
CALL spReportGreenBookIssuedOverAll ('L','2003-12-14','2009-12-17','lstauthregion.sCountryID');
CALL spReportGreenBookIssuedOverAll ('A','2011-12-14','2015-12-17','lstauthregion.sAuthRegion');
CALL spReportGreenBookIssuedOverAll ('A','2011-12-14','2015-12-17','lstauthregion.sCountryID');
CALL spReportGreenBookIssuedOverAll ('U','2003-12-14','2012-12-17','lstauthregion.sAuthRegion');
CALL spReportGreenBookIssuedOverAll ('U','2003-12-14','2012-12-17','lstauthregion.sCountryID');
CALL spReportGreenBookIssuedOverAll ('B','2003-12-14','2015-12-17','lstauthregion.sAuthRegion');
CALL spReportGreenBookIssuedOverAll ('B','2001-12-14','2015-12-17','lstauthregion.sCountryID');



CALL spReportGreenBookIssuedIndividual ('F','2004-12-14','2004-12-17','lstcountry.sCountry','lstcountry.sCountry');
CALL spReportGreenBookIssuedIndividual ('F','2004-12-14','2004-12-17','lstauthregion.ID','lstauthregion.sAuthRegion');
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



