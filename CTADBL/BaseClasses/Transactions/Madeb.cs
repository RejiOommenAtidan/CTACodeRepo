using CTADBL.BaseClasses.Common;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Transactions
{
    [Table("tblmadeb")]
    public class Madeb : CommonProps
    {
        #region Private Madeb Properties
        private int _Id;
        private int? __Id;
        private int _nFormNumber;
        private string? _sGBID;
        private int? _nMadebTypeID;
        private string? _sName;
        private string? _sFathersName;
        private int _nAuthRegionID;
        private DateTime? _dtReceived = null;
        private DateTime? _dtIssueAction = null;
        private int? _nIssuedOrNotID;
        private int _nType;
        private string? _sChangeField;
        private string? _sOfficeOfTibetan;
        private string? _sDocumentAttached;
        private int? _nCurrentGBSno;
        private int? _nPreviousGBSno;
        private int? _nSaneyFormNo;
        private int? _nReceiptNo;
        private DateTime? _dtEmailSend = null;
        private string? _sAlias;
        private string? _sApprovedReject;
        private int? _nMadebStatusID;
        private string? _sMadebStatusRemark;
        private DateTime? _dtReject = null;
        private DateTime? _dtReturnEmail = null;
        #endregion

        #region Public Madeb Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        public int? _id { get { return __Id; } set { __Id = value; } }
        [Required]
        [DisplayName("Form Number")]
        public int nFormNumber { get { return _nFormNumber; } set { _nFormNumber = value; } }
        [DisplayName("Green Book ID")]
        public string? sGBID { get { return _sGBID; } set { _sGBID = value; } }
        [Required]
        [DisplayName("Madeb Type ID")]
        public int? nMadebTypeID { get { return _nMadebTypeID; } set { _nMadebTypeID = value; } }
        [Required]
        [DisplayName("Name")]
        public string? sName { get { return _sName; } set { _sName = value; } }
        [DisplayName("Father Name")]
        public string? sFathersName { get { return _sFathersName; } set { _sFathersName = value; } }
        [Required]
        [DisplayName("Authority Region ID")]
        public int nAuthRegionID { get { return _nAuthRegionID; } set { _nAuthRegionID = value; } }
        [Required]
        [DisplayName("Received Date")]
        public DateTime? dtReceived { get { return _dtReceived; } set { _dtReceived = value; } }
        [DisplayName("Issue Action Date")]
        public DateTime? dtIssueAction { get { return _dtIssueAction; } set { _dtIssueAction = value; } }
        [DisplayName("Issued Or Not")]
        public int? nIssuedOrNotID { get { return _nIssuedOrNotID; } set { _nIssuedOrNotID = value; } }
        [DisplayName("Type")]
        public int nType { get { return _nType; } set { _nType = value; } }
        [DisplayName("Change Field")]
        public string? sChangeField { get { return _sChangeField; } set { _sChangeField = value; } }
        [DisplayName("Office Of Tibetan")]
        public string? sOfficeOfTibetan { get { return _sOfficeOfTibetan; } set { _sOfficeOfTibetan = value; } }
        [DisplayName("Document Attached")]
        public string? sDocumentAttached { get { return _sDocumentAttached; } set { _sDocumentAttached = value; } }
        [DisplayName("Current Green Book Serial Number")]
        public int? nCurrentGBSno { get { return _nCurrentGBSno; } set { _nCurrentGBSno = value; } }
        [DisplayName("Previous Green Book Serial Number")]
        public int? nPreviousGBSno { get { return _nPreviousGBSno; } set { _nPreviousGBSno = value; } }
        [DisplayName("Saney Form Number")]
        public int? nSaneyFormNo { get { return _nSaneyFormNo; } set { _nSaneyFormNo = value; } }
        [DisplayName("Receipt Number")]
        public int? nReceiptNo { get { return _nReceiptNo; } set { _nReceiptNo = value; } }
        [DisplayName("Email Send Date")]
        public DateTime? dtEmailSend { get { return _dtEmailSend; } set { _dtEmailSend = value; } }
        [DisplayName("Alias Name")]
        public string? sAlias { get { return _sAlias; } set { _sAlias = value; } }
        [DisplayName("Approved Or Reject")]
        public string? sApprovedReject { get { return _sApprovedReject; } set { _sApprovedReject = value; } }
        [DisplayName("Madeb Status ID")]
        public int? nMadebStatusID { get { return _nMadebStatusID; } set { _nMadebStatusID = value; } }
        [DisplayName("Madeb Status Remark")]
        public string? sMadebStatusRemark { get { return _sMadebStatusRemark; } set { _sMadebStatusRemark = value; } }
        [DisplayName("Reject Date")]
        public DateTime? dtReject { get { return _dtReject; } set { _dtReject = value; } }
        [DisplayName("Return Date")]
        public DateTime? dtReturnEmail { get { return _dtReturnEmail; } set { _dtReturnEmail = value; } }
        #endregion
    }
}
