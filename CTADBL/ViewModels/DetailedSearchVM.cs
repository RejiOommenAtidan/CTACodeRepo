using System;

namespace CTADBL.ViewModels
{
    public class DetailedSearchVM
    {
        #region Private Detailed Properties 
        private string _sFirstName;
        private string _sMiddleName;
        private string _sLastName;
        private string _sFamilyName;
        private string _sFatherName;
        private string _sMotherName;
        private string _sSpouseName;
        private string _dtDOB;
        private string _sCity;
        private string _sState;
        private int? _nFromAge;
        private int? _nToAge;
        private string _sCountry;
        private string _sSearchType;
        private string _sGender;
        #endregion

        #region Public Detailed Props
        public string sFirstName { get { return _sFirstName; } set { _sFirstName = value; } }
        public string sMiddleName { get { return _sMiddleName; } set { _sMiddleName = value; } }
        public string sLastName { get { return _sLastName; } set { _sLastName = value; } }
        public string sFamilyName { get { return _sFamilyName; } set { _sFamilyName = value; } }
        public string sFatherName { get { return _sFatherName; } set { _sFatherName = value; } }
        public string sMotherName { get { return _sMotherName; } set { _sMotherName = value; } }
        public string sSpouseName { get { return _sSpouseName; } set { _sSpouseName = value; } }
        public string dtDOB { get { return _dtDOB; } set { _dtDOB = value; } }
        public string sCity { get { return _sCity; } set { _sCity = value; } }
        public string sState { get { return _sState; } set { _sState = value; } }
        public int? nFromAge { get { return _nFromAge; } set { _nFromAge = value; } }
        public int? nToAge { get { return _nToAge; } set { _nToAge = value; } }
        public string sCountry { get { return _sCountry; } set { _sCountry = value; } }
        public string sSearchType { get { return _sSearchType; } set { _sSearchType = value; } }
        public string sGender { get { return _sGender; } set { _sGender = value; } }
        #endregion
    }
}
