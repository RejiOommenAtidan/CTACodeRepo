using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses
{
    [Table("tblgreenbook")]
    public class Greenbook : CommonProps
    {
        #region Greenbook Properties
        [Key]
        public int Id { get; set; }
        public string sGBID { get; set; }
        public int nAuthRegionID { get; set; }
        public string sFirstName { get; set; }
        public string sSecondName { get; set; }
        public string sFamilyName { get; set; }
        public string sGender { get; set; }
        public DateTime dtDOB { get; set; }
        public string sDOBApprox { get; set; }
        public string sBirthPlace { get; set; }
        public string sBirthCountryID { get; set; }
        public string sOriginVillage { get; set; }
        public string sOriginProvinceID { get; set; }
        public string sMarried { get; set; }
        public string sOtherDocuments { get; set; }
        public string sResidenceNumber { get; set; }
        public string sQualificationID { get; set; }
        public string sOccupationID { get; set; }
        public string sAliasName { get; set; }
        public string sOldGreenBKNo { get; set; }
        public string sFstGreenBkNo { get; set; }
        public DateTime dtFormDate { get; set; }
        public string sFathersName { get; set; }
        public string sFathersID { get; set; }
        public string sFathersGBID { get; set; }
        public string sMothersName { get; set; }
        public string sMothersID { get; set; }
        public string sMothersGBID { get; set; }
        public string sSpouseName { get; set; }
        public string sSpouseID { get; set; }
        public string sSpouseGBID { get; set; }
        public int nChildrenM { get; set; }
        public int nChildrenF { get; set; }
        public string sAddress1 { get; set; }
        public string sAddress2 { get; set; }
        public string sCity { get; set; }
        public string sState { get; set; }
        public string sPCode { get; set; }
        public string sCountryID { get; set; }
        public string sEmail { get; set; }
        public string sPhone { get; set; }
        public string sFax { get; set; }
        public DateTime dtDeceased { get; set; }
        public string sBookIssued { get; set; }
        public DateTime dtValidityDate { get; set; }
        public string sPaidUntil { get; set; }
        public string TibetanName { get; set; }
        public string TBUPlaceOfBirth { get; set; }
        public string TBUOriginVillage { get; set; }
        public string TBUFathersName { get; set; }
        public string TBUMothersName { get; set; }
        public string TBUSpouseName { get; set; }
        #endregion
    }
}
