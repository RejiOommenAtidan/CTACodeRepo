using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Transactions
{
    [Table("lnkgbchildren")]
    public class GBChildren
    {
        #region Private Properties
        private int _Id;
        private string _sGBIDParent;
        private string _sName;
        private DateTime? _dtDOB;
        private string _sGender;
        private string? _sChildID;
        private string? _sGBIDChild;
        private DateTime? _dtEntered = null;
        private int? _nEnteredBy = null;
        #endregion

        #region Public Properties
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

        public string sGBIDParent
        {
            get
            {
                return _sGBIDParent;
            }
            set
            {
                _sGBIDParent = value;
            }
        }

        public string sName
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
        public DateTime? dtDOB
        {
            get
            {
                return _dtDOB;
            }
            set
            {
                _dtDOB = value;
            }
        }
        public string sGender
        {
            get
            {
                return _sGender;
            }
            set
            {
                _sGender = value;
            }
        }
        public string sChildID
        {
            get
            {
                return _sChildID;
            }
            set
            {
                _sChildID = value;
            }
        }
        public string sGBIDChild
        {
            get
            {
                return _sGBIDChild;
            }
            set
            {
                _sGBIDChild = value;
            }
        }

        public DateTime? dtEntered
        {
            get
            {
                return _dtEntered;
            }
            set
            {
                _dtEntered = value;
            }
        }

        public int? nEnteredBy
        {
            get
            {
                return _nEnteredBy;
            }
            set
            {
                _nEnteredBy = value;
            }
        }



        #endregion
    }
}
