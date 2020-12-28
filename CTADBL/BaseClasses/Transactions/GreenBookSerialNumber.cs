#nullable enable
using CTADBL.BaseClasses.Common;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Transactions
{
    [Table("tblgreenbookserial")]
    public class GreenBookSerialNumber : CommonProps
    {
        #region Private Properties
        private int _Id;
        private int _nBookNo;
        private string _sGBID;
        private string? _Remarks;
        private DateTime? _dtDate;
        private string? _sName;
        private string? _sCountryID;
        private int? _nMadebTypeId;
        private int? _nFormNumber;
        private string? _sAuthRegion;
        private int? _nAuthRegionId;
        #endregion

        #region Public properties
        [Key]
        public int Id
        {
            get
            {
                return _Id;
            }
            set
            {
                _Id = value;
            }
        }
        [DisplayName("Book Serial Number")]
        [Required]
        public int nBookNo
        {
            get
            {
                return _nBookNo;
            }
            set
            {
                _nBookNo = value;
            }
        }
        [Required]
        [DisplayName("Green Book ID")]
        public string sGBID
        {
            get
            {
                return _sGBID;
            }
            set
            {
                _sGBID = value;
            }
        }

        [DisplayName("Remarks")]
        public string? Remarks
        {
            get
            {
                return _Remarks;
            }
            set
            {
                _Remarks = value;
            }
        }
        [DisplayName("Date")]
        [Required]
        public DateTime? dtDate
        {
            get
            {
                return _dtDate;
            }
            set
            {
                _dtDate = value;
            }
        }
        [DisplayName("Name")]
        public string? sName
        {
            get
            {
                return _sName;
            }
            set
            {
                _sName = value;
            }
        }
        [DisplayName("Country ID")]
        public string? sCountryID
        {
            get
            {
                return _sCountryID;
            }
            set
            {
                _sCountryID = value;
            }
        }
        [DisplayName("Madeb Type ID")]
        //[Required]
        public int? nMadebTypeId
        {
            get
            {
                return _nMadebTypeId;
            }
            set
            {
                _nMadebTypeId = value;
            }
        }
        [DisplayName("Form Number")]
        //[Required]
        public int? nFormNumber
        {
            get
            {
                return _nFormNumber;
            }
            set
            {
                _nFormNumber = value;
            }
        }
        [DisplayName("Authority Region")]
        public string? sAuthRegion
        {
            get
            {
                return _sAuthRegion;
            }
            set
            {
                _sAuthRegion = value;
            }
        }
        [DisplayName("Authority Region ID")]
        //[Required]
        public int? nAuthRegionId
        {
            get
            {
                return _nAuthRegionId;
            }
            set
            {
                _nAuthRegionId = value;
            }
        }
        #endregion
    }
}
