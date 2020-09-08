using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses
{
    [Table("tblmadeb")]
    public class Madeb : CommonProps
    {
        #region Madeb Properties
        [Key]
        public int Id { get; set; }
        public int nFormNumber { get; set; }
        public string sGBID { get; set; }
        public int nMadebTypeID { get; set; }
        public string sName { get; set; }
        public string sFathersName { get; set; }
        public int nAuthRegionID { get; set; }
        public DateTime dtReceived { get; set; }
        public DateTime dtIssueAction { get; set; }
        public int nIssuedOrNot { get; set; }
        public int nType { get; set; }
        public string sChangeField { get; set; }
        public string sOfficeOfTibetan { get; set; }
        public string sDocumentAttached { get; set; }
        public int nCurrentGBSno { get; set; }
        public int nPreviousGBSno { get; set; }
        public int nSaneyFormNo { get; set; }
        public int nReceiptNo { get; set; }
        public DateTime dtEmailSend { get; set; }
        public string sAlias { get; set; }
        public string sApprovedReject { get; set; }
        public DateTime dtReject { get; set; }
        public DateTime dtReturnEmail { get; set; }
        #endregion
    }
}
