using CTADBL.BaseClasses.Common;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Transactions
{
    [Table("tblgreenbook")]
    public class Greenbook : CommonProps
    {
        #region Private Greenbook Properties
        private int _Id;
        private int __Id;
        private string _sGBID;
        private int _nAuthRegionID;
        private string _sFirstName;
        private string _sMiddleName;
        private string _sLastName;
        private string _sFamilyName;
        private string _sGender;
        private DateTime _dtDOB;
        private string _sDOBApprox;
        private string _sBirthPlace;
        private string _sBirthCountryID;
        private string _sOriginVillage;
        private string _sOriginProvinceID;
        private string _sMarried;
        private string _sOtherDocuments;
        private string _sResidenceNumber;
        private string _sQualificationID;
        private string _sOccupationID;
        private string _sAliasName;
        private string _sOldGreenBKNo;
        private string _sFstGreenBkNo;
        private DateTime _dtFormDate;
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
        private string _sAddress1;
        private string _sAddress2;
        private string _sCity;
        private string _sState;
        private string _sPCode;
        private string _sCountryID;
        private string _sEmail;
        private string _sPhone;
        private string _sFax;
        private DateTime _dtDeceased;
        private string _sBookIssued;
        private DateTime _dtValidityDate;
        private string _sPaidUntil;
        private string _TibetanName;
        private string _TBUPlaceOfBirth;
        private string _TBUOriginVillage;
        private string _TBUFathersName;
        private string _TBUMothersName;
        private string _TBUSpouseName;
        private string _sEnteredDateTime;
        #endregion

        #region Public Greenbook Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        public int _id { get { return __Id; } set { __Id = value; } }
        public string sGBID { get { return _sGBID; } set { _sGBID = value; } }
        public int nAuthRegionID { get { return _nAuthRegionID; } set { _nAuthRegionID = value; } }
        public string sFirstName { get { return _sFirstName; } set { _sFirstName = value; } }
        public string sMiddleName { get { return _sMiddleName; } set { _sMiddleName = value; } }
        public string sLastName { get { return _sLastName; } set { _sLastName = value; } }
        public string sFamilyName { get { return _sFamilyName; } set { _sFamilyName = value; } }
        public string sGender { get { return _sGender; } set { _sGender = value; } }
        public DateTime dtDOB { get { return _dtDOB; } set { _dtDOB = value; } }
        public string sDOBApprox { get { return _sDOBApprox; } set { _sDOBApprox = value; } }
        public string sBirthPlace { get { return _sBirthPlace; } set { _sBirthPlace = value; } }
        public string sBirthCountryID { get { return _sBirthCountryID; } set { _sBirthCountryID = value; } }
        public string sOriginVillage { get { return _sOriginVillage; } set { _sOriginVillage = value; } }
        public string sOriginProvinceID { get { return _sOriginProvinceID; } set { _sOriginProvinceID = value; } }
        public string sMarried { get { return _sMarried; } set { _sMarried = value; } }
        public string sOtherDocuments { get { return _sOtherDocuments; } set { _sOtherDocuments = value; } }
        public string sResidenceNumber { get { return _sResidenceNumber; } set { _sResidenceNumber = value; } }
        public string sQualificationID { get { return _sQualificationID; } set { _sQualificationID = value; } }
        public string sOccupationID { get { return _sOccupationID; } set { _sOccupationID = value; } }
        public string sAliasName { get { return _sAliasName; } set { _sAliasName = value; } }
        public string sOldGreenBKNo { get { return _sOldGreenBKNo; } set { _sOldGreenBKNo = value; } }
        public string sFstGreenBkNo { get { return _sFstGreenBkNo; } set { _sFstGreenBkNo = value; } }
        public DateTime dtFormDate { get { return _dtFormDate; } set { _dtFormDate = value; } }
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
        public string sAddress1 { get { return _sAddress1; } set { _sAddress1 = value; } }
        public string sAddress2 { get { return _sAddress2; } set { _sAddress2 = value; } }
        public string sCity { get { return _sCity; } set { _sCity = value; } }
        public string sState { get { return _sState; } set { _sState = value; } }
        public string sPCode { get { return _sPCode; } set { _sPCode = value; } }
        public string sCountryID { get { return _sCountryID; } set { _sCountryID = value; } }
        public string sEmail { get { return _sEmail; } set { _sEmail = value; } }
        public string sPhone { get { return _sPhone; } set { _sPhone = value; } }
        public string sFax { get { return _sFax; } set { _sFax = value; } }
        public DateTime dtDeceased { get { return _dtDeceased; } set { _dtDeceased = value; } }
        public string sBookIssued { get { return _sBookIssued; } set { _sBookIssued = value; } }
        public DateTime dtValidityDate { get { return _dtValidityDate; } set { _dtValidityDate = value; } }
        public string sPaidUntil { get { return _sPaidUntil; } set { _sPaidUntil = value; } }
        public string TibetanName { get { return _TibetanName; } set { _TibetanName = value; } }
        public string TBUPlaceOfBirth { get { return _TBUPlaceOfBirth; } set { _TBUPlaceOfBirth = value; } }
        public string TBUOriginVillage { get { return _TBUOriginVillage; } set { _TBUOriginVillage = value; } }
        public string TBUFathersName { get { return _TBUFathersName; } set { _TBUFathersName = value; } }
        public string TBUMothersName { get { return _TBUMothersName; } set { _TBUMothersName = value; } }
        public string TBUSpouseName { get { return _TBUSpouseName; } set { _TBUSpouseName = value; } }
        public string sEnteredDateTime { get { return _sEnteredDateTime; } set { _sEnteredDateTime = value; } }
        #endregion
    }
}
