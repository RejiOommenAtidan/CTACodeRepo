using System;

namespace CTADBL.ViewModels
{
    public class DetailedSearchVM
    {
        #region Private Detailed Properties 
        private string _sFirstname;
        private string _sSecondname;
        private string _sFamilyname;
        private string _sFathername;
        private string _sMothername;
        private string _sSpousename;
        private DateTime? _dtDOB;
        private string _sCity;
        private string _sState;
        private int? _nFromAge;
        private int? _nToAge;
        private string _sCountry;
        private string _sSearchType;
        private string _sGender;
        #endregion

        #region Public Detailed Props
        public string sFirstname { get { return _sFirstname; } set { _sFirstname = value; } }
        public string sSecondname { get { return _sSecondname; } set { _sSecondname = value; } }
        public string sFamilyname { get { return _sFamilyname; } set { _sFamilyname = value; } }
        public string sFathername { get { return _sFathername; } set { _sFathername = value; } }
        public string sMothername { get { return _sMothername; } set { _sMothername = value; } }
        public string sSpousename { get { return _sSpousename; } set { _sSpousename = value; } }
        public DateTime? dtDOB { get { return _dtDOB; } set { _dtDOB = value; } }
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
