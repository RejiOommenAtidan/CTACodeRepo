using CTADBL.BaseClasses.Common;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Transactions
{
    [Table("tblGivenGBID")]
    public class GivenGBID : CommonProps
    {
        #region Private Given GBID Properties
        private int _Id;
        private int? __Id;
        private int _nGBId;
        private int _nFormNo;
        private DateTime? _dtDate;
        private int _nGivenOrNot;
        private int _nActive;
        #endregion

        #region Public Given GBID Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        public int? _id { get { return __Id; } set { __Id = value; } }
        public int nGBId { get { return _nGBId; } set { _nGBId = value; } }
        public int nFormNo { get { return _nFormNo; } set { _nFormNo = value; } }
        public DateTime? dtDate { get { return _dtDate; } set { _dtDate = value; } }
        public int nGivenOrNot { get { return _nGivenOrNot; } set { _nGivenOrNot = value; } }
        public int nActive { get { return _nActive; } set { _nActive = value; } }
        #endregion 
    }
}
