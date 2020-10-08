using System;
using System.Collections.Generic;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Text;
using CTADBL.BaseClasses;
using CTADBL.BaseClasses.Transactions;

namespace CTADBL.ViewModels
{

    /*
     * SELECT gb.sGBID, ar.sAuthRegion, gb.sFirstName, gb.sMiddleName, gb.sLastName, gb.sFamilyName, gb.sGender, gb.dtDOB, gb.sDOBApprox, gb.sBirthPlace, gb.sBirthCountryID, gb.sOriginVillage, pr.sProvince, gb.sMarried, gb.sOtherDocuments, gb.sResidenceNumber, qu.sQualification, occ.sOccupationDesc , gb.sAliasName, gb.sOldGreenBKNo, gb.sFstGreenBkNo,  gb.dtFormDate,  gb.sFathersName, frel.sgbidrelation as sFathersGBID, gb.sMothersName,  mrel.sgbidrelation as sMothersGBID,  gb.sSpouseName, srel.sgbidrelation as sSpouseGBID, gb.nChildrenM, gb.nChildrenF, gb.sAddress1, gb.sAddress2, gb.sCity, gb.sState, gb.sPCode, gb.sCountryID, gb.sEmail, gb.sPhone, gb.sfax, gb.dtDeceased, gb.sBookIssued, gb.dtValidityDate, gb.sPaidUntil, gb.TibetanName, gb.TBUPlaceOfBirth, gb.TBUOriginVillage, gb.TBUFathersName, gb.TBUMothersName, gb.TBUSpouseName  FROM tblgreenbook as gb LEFT JOIN lstauthregion AS ar ON ar.ID = gb.nAuthRegionID LEFT JOIN lstprovince AS pr ON pr.Id = gb.sOriginProvinceID LEFT JOIN lstqualification AS qu ON qu.sQualificationID = gb.sQualificationID LEFT JOIN lstoccupation AS occ ON occ.Id = gb.sOccupationID LEFT JOIN lnkgbrelation AS frel ON gb.sGBID = frel.sGBID and frel.nrelationid = 1  LEFT JOIN lnkgbrelation AS mrel ON gb.sGBID = mrel.sGBID and mrel.nrelationid = 2 LEFT JOIN lnkgbrelation AS srel ON gb.sGBID = srel.sGBID and srel.nrelationid = 3  left join lnkgbchildren child on gb.sGBID = child.sGBIDParent where gb.sGBID = '9675'
     * 
     * 
     * SELECT gb.sGBID, ar.sAuthRegion, gb.sFirstName, gb.sMiddleName, gb.sLastName, gb.sFamilyName, gb.sGender, gb.dtDOB, gb.sDOBApprox, gb.sBirthPlace, bctry.sCountry, gb.sOriginVillage, pr.sProvince, gb.sMarried, gb.sOtherDocuments, gb.sResidenceNumber, qu.sQualification, occ.sOccupationDesc , gb.sAliasName, gb.sOldGreenBKNo, gb.sFstGreenBkNo,  gb.dtFormDate,  gb.sFathersName, frel.sgbidrelation as sFathersGBID, gb.sMothersName,  mrel.sgbidrelation as sMothersGBID,  gb.sSpouseName, srel.sgbidrelation as sSpouseGBID, gb.nChildrenM, gb.nChildrenF, gb.sAddress1, gb.sAddress2, gb.sCity, gb.sState, gb.sPCode, ctry.sCountry AS Country, gb.sEmail, gb.sPhone, gb.sfax, gb.dtDeceased, gb.sBookIssued, gb.dtValidityDate, gb.sPaidUntil, gb.TibetanName, gb.TBUPlaceOfBirth, gb.TBUOriginVillage, gb.TBUFathersName, gb.TBUMothersName, gb.TBUSpouseName, us.sFullName AS EnteredBy  FROM tblgreenbook as gb LEFT JOIN lstcountry ctry ON ctry.sCountryID = gb.sCountryID LEFT JOIN lstcountry bctry ON bctry.sCountryID = gb.sBirthCountryID  LEFT JOIN tbluser AS us ON us.Id = gb.nEnteredBy LEFT JOIN lstauthregion AS ar ON ar.ID = gb.nAuthRegionID LEFT JOIN lstprovince AS pr ON pr.Id = gb.sOriginProvinceID LEFT JOIN lstqualification AS qu ON qu.sQualificationID = gb.sQualificationID LEFT JOIN lstoccupation AS occ ON occ.Id = gb.sOccupationID LEFT JOIN lnkgbrelation AS frel ON gb.sGBID = frel.sGBID and frel.nrelationid = 1  LEFT JOIN lnkgbrelation AS mrel ON gb.sGBID = mrel.sGBID and mrel.nrelationid = 2 LEFT JOIN lnkgbrelation AS srel ON gb.sGBID = srel.sGBID and srel.nrelationid = 3 where gb.sFstGreenBkNo like '283%';
     * 
     * 
     */


    public class GreenBookVM
    {
        private Greenbook _greenbook;
        private IEnumerable<GBChildren>? _children = null;
        private IEnumerable<IssueBookVM>? _booksIssued = null;
        private IEnumerable<GBNote>? _gbNotes = null;
        private IEnumerable<GBDocument> _gbDocuments = null;
        private IEnumerable<AuditLogVM> _auditLogs = null;
        private string _sAuthRegion;
        private string? _sProvince;
        private string? _sQualification;
        private string? _sOccupationDesc;
        private string? _sFathersGBID;
        private string? _sMothersGBID;
        private string? _sSpouseGBID;
        private string? _sBirthCountry;
        private string? _sCountry;
        private string? _sEnteredBy;
        //private int? _nAge = null;



        public Greenbook greenBook
        {
            get
            {
                return _greenbook;
            }
            set
            {
                _greenbook = value;
            }
        }

        public IEnumerable<GBChildren>? children
        {
            get
            {
                return _children;
            }
            set
            {
                _children = value;
            }
        }

        public IEnumerable<IssueBookVM>? booksIssued
        {
            get
            {
                return _booksIssued;
            }
            set
            {
                _booksIssued = value;
            }
        }

        public IEnumerable<GBNote>? gbNotes
        {
            get
            {
                return _gbNotes;
            }
            set
            {
                _gbNotes = value;
            }
        }

        public IEnumerable<GBDocument>? gbDocuments
        {
            get
            {
                return _gbDocuments;
            }
            set
            {
                _gbDocuments = value;
            }
        }


        public IEnumerable<AuditLogVM>? auditLogs
        {
            get
            {
                return _auditLogs;
            }
            set
            {
                _auditLogs = value;
            }
        }


        public string sAuthRegion
        {
            get
            {
                return _sAuthRegion;
            }
            set
            {
                _sAuthRegion = value;
            }
        }

        public string sProvince
        {
            get
            {
                return _sProvince;
            }
            set
            {
                _sProvince = value;
            }
        }
        public string sQualification
        {
            get
            {
                return _sQualification;
            }
            set
            {
                _sQualification = value;
            }
        }
        public string sOccupationDesc
        {
            get
            {
                return _sOccupationDesc;
            }
            set
            {
                _sOccupationDesc = value;
            }
        }
        public string sFathersGBID
        {
            get
            {
                return _sFathersGBID;
            }
            set
            {
                _sFathersGBID = value;
            }
        }
        public string sMothersGBID
        {
            get
            {
                return _sMothersGBID;
            }
            set
            {
                _sMothersGBID = value;
            }
        }

        public string sSpouseGBID
        {
            get
            {
                return _sSpouseGBID;
            }
            set
            {
                _sSpouseGBID = value;
            }
        }

        public string sBirthCountry
        {
            get
            {
                return _sBirthCountry;
            }
            set
            {
                _sBirthCountry = value;
            }
        }

        public string sCountry
        {
            get
            {
                return _sCountry;
            }
            set
            {
                _sCountry = value;
            }
        }

        public string sEnteredBy
        {
            get
            {
                return _sEnteredBy;
            }
            set
            {
                _sEnteredBy = value;
            }
        }

        public int? nAge
        {
            get
            {
                return greenBook.dtDOB.HasValue ? DateTime.Now.Year - greenBook.dtDOB.Value.Year : (int?)null ;
            }
        }
    }


}
