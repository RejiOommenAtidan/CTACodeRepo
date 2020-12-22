using CTADBL.BaseClasses.Common;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Transactions
{
    [Table("lnkgbchildren")]
    public class GBChildren : CommonProps
    {
        #region Private GB Children Properties
        private int _Id;
        private string _sGBIDParent;
        private string _sName;
        private DateTime? _dtDOB;
        private string _sGender;
        private string? _sChildID;
        private string? _sGBIDChild;
        #endregion

        #region Public GB CHildren Properties
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
        [DisplayName("Parent Green Book ID")]
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
        [DisplayName("Name")]
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
        [DisplayName("Birth Date")]
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
        [DisplayName("Gender")]
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
        [DisplayName("Child ID")]
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
        [DisplayName("Child Green Book ID")]
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
        #endregion
    }
}
