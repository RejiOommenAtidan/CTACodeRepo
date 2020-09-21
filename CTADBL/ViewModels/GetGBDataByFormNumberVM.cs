﻿using CTADBL.BaseClasses.Masters;
using CTADBL.BaseClasses.Transactions;
using System.Collections.Generic;

namespace CTADBL.ViewModels
{
    public class GetGBDataByFormNumberVM
    {
        #region Private Props
        private List<AuthRegion> _lAuthRegion;
        private List<Country> _lCountry;
        private List<Province> _lProvince;
        private List<Qualification> _lQualification;
        private List<Occupation> _lOccupation;
        private List<DOBApprox> _lDOBApprox;
        private Madeb _oMadeb;
        #endregion

        #region Public Props
        public List<AuthRegion> lAuthRegion { get { return _lAuthRegion; } set { _lAuthRegion = value; } }
        public List<Country> lCountry { get { return _lCountry; } set { _lCountry = value; } }
        public List<Province> lProvince { get { return _lProvince; } set { _lProvince = value; } }
        public List<Qualification> lQualification { get { return _lQualification; } set { _lQualification = value; } }
        public List<Occupation> lOccupation { get { return _lOccupation; } set { _lOccupation = value; } }
        public List<DOBApprox> lDOBApprox { get { return _lDOBApprox; } set { _lDOBApprox = value; } }
        public Madeb oMadeb { get { return _oMadeb; } set { _oMadeb = value; } }
        #endregion
    }
}
