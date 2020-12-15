using CTADBL.BaseClasses.Common;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Transactions
{
    [Table("tblgreenbook")]
    public class Greenbook : CommonProps
    {
        #region Private Green Book Properties
        private int _Id;
        private int? __Id;
        private string _sGBID;
        private int _nAuthRegionID;
        private string _sFirstName;
        private string _sMiddleName;
        private string _sLastName;
        private string _sFamilyName;
        private string _sGender;
        private DateTime? _dtDOB;
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
        private DateTime? _dtFormDate;
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
        private DateTime? _dtDeceased;
        private string _sBookIssued;
        private DateTime? _dtValidityDate;
        private string _sPaidUntil;
        private string _TibetanName;
        private string _TBUPlaceOfBirth;
        private string _TBUOriginVillage;
        private string _TBUFathersName;
        private string _TBUMothersName;
        private string _TBUSpouseName;
        private string _sEnteredDateTime;
        #endregion

        #region Public Green Book Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        [DisplayName("Previous system ID")]
        public int? _id { get { return __Id; } set { __Id = value; } }
        [DisplayName("Green Book ID")]
        public string sGBID { get { return _sGBID; } set { _sGBID = value; } }
        [DisplayName("Authority Region ID")]
        public int nAuthRegionID { get { return _nAuthRegionID; } set { _nAuthRegionID = value; } }
        [DisplayName("First Name")]
        public string sFirstName { get { return _sFirstName; } set { _sFirstName = value; } }
        [DisplayName("Middle Name")]
        public string sMiddleName { get { return _sMiddleName; } set { _sMiddleName = value; } }
        [DisplayName("Last Name")]
        public string sLastName { get { return _sLastName; } set { _sLastName = value; } }
        [DisplayName("Family Name")]
        public string sFamilyName { get { return _sFamilyName; } set { _sFamilyName = value; } }
        [DisplayName("Gender")]
        public string sGender { get { return _sGender; } set { _sGender = value; } }
        [DisplayName("Birth Date")]
        public DateTime? dtDOB { get { return _dtDOB; } set { _dtDOB = value; } }
        [DisplayName("Birth Date Approx")]
        public string sDOBApprox { get { return _sDOBApprox; } set { _sDOBApprox = value; } }
        [DisplayName("Place Of Birth")]
        public string sBirthPlace { get { return _sBirthPlace; } set { _sBirthPlace = value; } }
        [DisplayName("Birth Country ID")]
        public string sBirthCountryID { get { return _sBirthCountryID; } set { _sBirthCountryID = value; } }
        [DisplayName("Origin Village")]
        public string sOriginVillage { get { return _sOriginVillage; } set { _sOriginVillage = value; } }
        [DisplayName("Origin Province ID")]
        public string sOriginProvinceID { get { return _sOriginProvinceID; } set { _sOriginProvinceID = value; } }
        [DisplayName("Married")]
        public string sMarried { get { return _sMarried; } set { _sMarried = value; } }
        [DisplayName("Other Documents")]
        public string sOtherDocuments { get { return _sOtherDocuments; } set { _sOtherDocuments = value; } }
        [DisplayName("Residence Number")]
        public string sResidenceNumber { get { return _sResidenceNumber; } set { _sResidenceNumber = value; } }
        [DisplayName("Qualification ID")]
        public string sQualificationID { get { return _sQualificationID; } set { _sQualificationID = value; } }
        [DisplayName("Occupation ID")]
        public string sOccupationID { get { return _sOccupationID; } set { _sOccupationID = value; } }
        [DisplayName("Alias")]
        public string sAliasName { get { return _sAliasName; } set { _sAliasName = value; } }
        public string sOldGreenBKNo { get { return _sOldGreenBKNo; } set { _sOldGreenBKNo = value; } }
        [DisplayName("First Green Book Number")]
        public string sFstGreenBkNo { get { return _sFstGreenBkNo; } set { _sFstGreenBkNo = value; } }
        [DisplayName("Form Date")]
        public DateTime? dtFormDate { get { return _dtFormDate; } set { _dtFormDate = value; } }
        [DisplayName("Father's Name")]
        public string sFathersName { get { return _sFathersName; } set { _sFathersName = value; } }
        [DisplayName("Father's ID")]
        public string sFathersID { get { return _sFathersID; } set { _sFathersID = value; } }
        [DisplayName("Father's Green Book ID")]
        public string sFathersGBID { get { return _sFathersGBID; } set { _sFathersGBID = value; } }
        [DisplayName("Mother's Name")]
        public string sMothersName { get { return _sMothersName; } set { _sMothersName = value; } }
        [DisplayName("Mother's ID")]
        public string sMothersID { get { return _sMothersID; } set { _sMothersID = value; } }
        [DisplayName("Mother's Green Book ID")]
        public string sMothersGBID { get { return _sMothersGBID; } set { _sMothersGBID = value; } }
        [DisplayName("Spouse Name")]
        public string sSpouseName { get { return _sSpouseName; } set { _sSpouseName = value; } }
        [DisplayName("Spouse's ID")]
        public string sSpouseID { get { return _sSpouseID; } set { _sSpouseID = value; } }
        [DisplayName("Spouse's Green Book ID")]
        public string sSpouseGBID { get { return _sSpouseGBID; } set { _sSpouseGBID = value; } }
        [DisplayName("Male Child Number")]
        public int nChildrenM { get { return _nChildrenM; } set { _nChildrenM = value; } }
        [DisplayName("Female Child Number")]
        public int nChildrenF { get { return _nChildrenF; } set { _nChildrenF = value; } }
        [DisplayName("Address1")]
        public string sAddress1 { get { return _sAddress1; } set { _sAddress1 = value; } }
        [DisplayName("Address2")]
        public string sAddress2 { get { return _sAddress2; } set { _sAddress2 = value; } }
        [DisplayName("City")]
        public string sCity { get { return _sCity; } set { _sCity = value; } }
        [DisplayName("State")]
        public string sState { get { return _sState; } set { _sState = value; } }
        [DisplayName("Pin Code")]
        public string sPCode { get { return _sPCode; } set { _sPCode = value; } }
        [DisplayName("Country ID")]
        public string sCountryID { get { return _sCountryID; } set { _sCountryID = value; } }
        [DisplayName("Email")]
        public string sEmail { get { return _sEmail; } set { _sEmail = value; } }
        [DisplayName("Phone")]
        public string sPhone { get { return _sPhone; } set { _sPhone = value; } }
        [DisplayName("Fax")]
        public string sFax { get { return _sFax; } set { _sFax = value; } }
        [DisplayName("Deceased Date")]
        public DateTime? dtDeceased { get { return _dtDeceased; } set { _dtDeceased = value; } }
        [DisplayName("Book Issued")]
        public string sBookIssued { get { return _sBookIssued; } set { _sBookIssued = value; } }
        [DisplayName("Validity Date")]
        public DateTime? dtValidityDate { get { return _dtValidityDate; } set { _dtValidityDate = value; } }
        [DisplayName("Paid Until")]
        public string sPaidUntil { get { return _sPaidUntil; } set { _sPaidUntil = value; } }
        [DisplayName("Name Tibetan")]
        public string TibetanName { get { return _TibetanName; } set { _TibetanName = value; } }
        [DisplayName("Birth Place Tibetan")]
        public string TBUPlaceOfBirth { get { return _TBUPlaceOfBirth; } set { _TBUPlaceOfBirth = value; } }
        [DisplayName("Origin Village Tibetan")]
        public string TBUOriginVillage { get { return _TBUOriginVillage; } set { _TBUOriginVillage = value; } }
        [DisplayName("Father's Name Tibetan")]
        public string TBUFathersName { get { return _TBUFathersName; } set { _TBUFathersName = value; } }
        [DisplayName("Mother's Name Tibetan")]
        public string TBUMothersName { get { return _TBUMothersName; } set { _TBUMothersName = value; } }
        [DisplayName("Spouse's Name Tibetan")]
        public string TBUSpouseName { get { return _TBUSpouseName; } set { _TBUSpouseName = value; } }
        [DisplayName("Entered Date")]
        public string sEnteredDateTime { get { return _sEnteredDateTime; } set { _sEnteredDateTime = value; } }
        #endregion
    }
}
