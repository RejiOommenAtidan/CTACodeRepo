﻿using CTADBL.BaseClasses.Common;
using System;
using System.ComponentModel;
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
        private bool _bGivenOrNot;
        private bool _bActive;
        #endregion

        #region Public Given GBID Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        [DisplayName("Previous system ID")]
        public int? _id { get { return __Id; } set { __Id = value; } }
        [DisplayName("Green Book ID")]
        public int nGBId { get { return _nGBId; } set { _nGBId = value; } }
        [DisplayName("Form Number")]
        public int nFormNo { get { return _nFormNo; } set { _nFormNo = value; } }
        [DisplayName("Date")]
        public DateTime? dtDate { get { return _dtDate; } set { _dtDate = value; } }
        [DisplayName("Given")]
        public bool bGivenOrNot { get { return _bGivenOrNot; } set { _bGivenOrNot = value; } }
        [DisplayName("Active")]
        public bool bActive { get { return _bActive; } set { _bActive = value; } }
        #endregion 
    }
}
