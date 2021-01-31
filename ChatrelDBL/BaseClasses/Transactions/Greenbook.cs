using ChatrelDBL.BaseClasses.Common;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChatrelDBL.BaseClasses.Transactions
{
    [Table("tblgreenbook")]
    public class Greenbook : CommonProps
    {
        #region Private Greenbook Properties
        private int _Id;
        private string _sGBID;
        private int _nAuthRegionID;
        private string _sFirstName;
        private string _sMiddleName;
        private string _sLastName;
        private string _sFamilyName;
        private string _sGender;
        private DateTime? _dtDOB;
        private string _sMarried;
        private string _sFathersName;
        private string _sFathersID;
        private string _sFathersGBID;
        private string _sMothersName;
        private string _sMothersID;
        private string _sMothersGBID;
        private string _sSpouseName;
        private string _sSpouseID;
        private string _sSpouseGBID;
        private int _nChildrenM;
        private int _nChildrenF;
        private string _sEmail;
        private string _sPhone;
        private string _sFax;
        private DateTime? _dtDeceased;
        private string _sCountryID;
        private string _sPaidUntil;
        private string _sLoginGmail;
        private DateTime? _dtLastSuccessfullLogin;
        #endregion

        #region Public Greenbook Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        public string sGBID { get { return _sGBID; } set { _sGBID = value; } }
        public int nAuthRegionID { get { return _nAuthRegionID; } set { _nAuthRegionID = value; } }
        public string sFirstName { get { return _sFirstName; } set { _sFirstName = value; } }
        public string sMiddleName { get { return _sMiddleName; } set { _sMiddleName = value; } }
        public string sLastName { get { return _sLastName; } set { _sLastName = value; } }
        public string sFamilyName { get { return _sFamilyName; } set { _sFamilyName = value; } }
        public string sGender { get { return _sGender; } set { _sGender = value; } }
        public DateTime? dtDOB { get { return _dtDOB; } set { _dtDOB = value; } }
        public string sMarried { get { return _sMarried; } set { _sMarried = value; } }
        public string sFathersName { get { return _sFathersName; } set { _sFathersName = value; } }
        public string sFathersID { get { return _sFathersID; } set { _sFathersID = value; } }
        public string sFathersGBID { get { return _sFathersGBID; } set { _sFathersGBID = value; } }
        public string sMothersName { get { return _sMothersName; } set { _sMothersName = value; } }
        public string sMothersID { get { return _sMothersID; } set { _sMothersID = value; } }
        public string sMothersGBID { get { return _sMothersGBID; } set { _sMothersGBID = value; } }
        public string sSpouseName { get { return _sSpouseName; } set { _sSpouseName = value; } }
        public string sSpouseID { get { return _sSpouseID; } set { _sSpouseID = value; } }
        public string sSpouseGBID { get { return _sSpouseGBID; } set { _sSpouseGBID = value; } }
        public int nChildrenM { get { return _nChildrenM; } set { _nChildrenM = value; } }
        public int nChildrenF { get { return _nChildrenF; } set { _nChildrenF = value; } }
        public string sEmail { get { return _sEmail; } set { _sEmail = value; } }
        public string sPhone { get { return _sPhone; } set { _sPhone = value; } }
        public string sFax { get { return _sFax; } set { _sFax = value; } }
        public DateTime? dtDeceased { get { return _dtDeceased; } set { _dtDeceased = value; } }
        public string sCountryID { get { return _sCountryID; } set { _sCountryID = value; } }
        public string sPaidUntil { get { return _sPaidUntil; } set { _sPaidUntil = value; } }
        public string sLoginGmail { get { return _sLoginGmail; } set { _sLoginGmail = value; } }
        public DateTime? dtLastSuccessfullLogin { get { return _dtLastSuccessfullLogin; } set { _dtLastSuccessfullLogin = value; } }
        
        #endregion
    }
}
