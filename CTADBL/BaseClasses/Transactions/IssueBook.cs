using CTADBL.BaseClasses.Common;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Transactions
{
    [Table("tblgreenbookissued")]
    public class IssueBook : CommonProps
    {
        #region Private Issue Book Properties
        private int _Id;
        private int? _nGBId;
        private DateTime? _dtIssuedDate = null;
        private string? _sWhyIssued;
        private int? _nMadebTypeId;
        private int? _nTypeIssuedId;
        private int _nFormNumber;
        private string? _sFormNumber;
        private int? _nWhereIssued;
        private int? _nAuthRegionId;
        private bool _bPrinted;
        private string _sRemarks;
        #endregion

        #region Public Issue Book Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        [DisplayName("Green Book ID")]
        public int? nGBID { get { return _nGBId; } set { _nGBId = value; } }
        [DisplayName("Issued Date")]
        public DateTime? dtIssuedDate { get { return _dtIssuedDate; } set { _dtIssuedDate = value; } }
        [DisplayName("Why Issued")]
        public string? sWhyIssued { get { return _sWhyIssued; } set { _sWhyIssued = value; } }
        [DisplayName("Madeb Type ID")]
        public int? nMadebTypeId { get { return _nMadebTypeId; } set { _nMadebTypeId = value; } }
        [DisplayName("Type Issued ID")]
        public int? nTypeIssuedId { get { return _nTypeIssuedId; } set { _nTypeIssuedId = value; } }
        [DisplayName("Form Number")]
        public string? sFormNumber { get { return _sFormNumber; } set { _sFormNumber = value; } }
        [DisplayName("Form Number")]
        public int nFormNumber { get { return _nFormNumber; } set { _nFormNumber = value; } }
        [DisplayName("Where Issued")]
        public int? nWhereIssued { get { return _nWhereIssued; } set { _nWhereIssued = value; } }
        [DisplayName("Authority Region ID")]
        public int? nAuthRegionId { get { return _nAuthRegionId; } set { _nAuthRegionId = value; } }
        [DisplayName("Printed")]
        public bool bPrinted { get { return _bPrinted; } set { _bPrinted = value; } }
        [DisplayName("Remarks")]
        public string sRemarks { get { return _sRemarks; } set { _sRemarks = value; } }
        #endregion
    }
}
