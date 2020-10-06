﻿using System;
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
     */


    public class GreenBookVM
    {
        private Greenbook _greenbook;
        private IEnumerable<GBChildren>? _children = null;
        private IEnumerable<IssueBook>? _bookIssued = null;
        private string _sAuthRegion;
        private string? _sProvince;
        private string? _sQualification;
        private string? _sOccupationDesc;
        private string? _sFathersGBID;
        private string? _sMothersGBID;
        private string? _sSpouseGBID;


    
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

        public IEnumerable<IssueBook>? bookIssued
        {
            get
            {
                return _bookIssued;
            }
            set
            {
                _bookIssued = value;
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
    }


}
