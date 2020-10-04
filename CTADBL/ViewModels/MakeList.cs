using CTADBL.BaseClasses.Masters;
using System.Collections.Generic;
using System;


namespace CTADBL.ViewModels
{
    /*
     * select  gb.sFirstName, gb.sLastName, gb.sAliasName, gb.sFathersName, gb.sCity, gb.sOldGreenBkNo, gb.sGBID, gb.sAddress1 from tblgreenbook gb INNER JOIN tblgreenbookissued as gbi on gbi.ngbid = gb.sgbid where gbi.dtIssuedDate >= '2005-01-01' and gbi.dtIssuedDate <= '2019-12-31' and gbi.sWhyIssued = 'F' and gbi.nWhereIssued = 1 and gbi.nPrinted = 1 ;
     * 
     * 
     */


    public class MakeList
    {
        #region Private Properties
        
        private string _sFirstName;
        private string? _sMiddleName = null;
        private string? _sLastName = null;
        private string? _sAliasName = null;
        private string? _sFathersName = null;
        private string? _sCity = null;
        private string? _sOldGreenBkNo = null;
        private string _sGBID;
        private string? _sAddress1 = null;
        #endregion

        #region Public Properties

        public string sFirstName
        {
            get
            {
                return _sFirstName;
            }
            set
            {
                _sFirstName = value;
            }
        }

        public string? sMiddleName
        {
            get
            {
                return _sMiddleName ;
            }
            set
            {
                _sMiddleName = value;
            }
        }

        public string? sLastName
        {
            get
            {
                return _sLastName ?? "";
            }
            set
            {
                _sLastName = value;
            }
        }

        public string? sAliasName
        {
            get
            {
                return _sAliasName;
            }
            set
            {
                _sAliasName = value;
            }
        }

        public string sName
        {
            get
            {
                return String.IsNullOrEmpty(_sAliasName) ? sFirstName + " " + (String.IsNullOrEmpty(sMiddleName) ? "" : sMiddleName + " ") + sLastName : _sAliasName;
            }
        }

        public string? sFathersName
        {
            get
            {
                return _sFathersName;
            }
            set
            {
                _sFathersName = value;
            }
        }

        public string? sCity
        {
            get
            {
                return _sCity;
            }
            set
            {
                _sCity = value;
            }
        }

        public string? sOldGreenBkNo
        {
            get
            {
                return _sOldGreenBkNo;
            }
            set
            {
                _sOldGreenBkNo = value;
            }
        }
        

        public string sGBID
        {
            get
            {
                return _sGBID;
            }
            set
            {
                _sGBID = value;
            }
        }

        public string? sAddress1
        {
            get
            {
                return _sAddress1;
            }
            set
            {
                _sAddress1 = value;
            }
        }

        #endregion



    }
}
