using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CTADBL.BaseClasses.Common;

namespace CTADBL.BaseClasses.Transactions
{
    [Table("lnkgbnote")]
    public class GBNote : CommonProps
    {
        #region Private GBNote Properties 
        private int _Id;
        private string _sGBID;
        private string _sNote;
    
        #endregion

        #region Public GBNote Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        [DisplayName("Green Book ID")]
        public string sGBID { get { return _sGBID; } set { _sGBID = value; } }
        [DisplayName("Note")]
        public string sNote { get { return _sNote; } set { _sNote = value; } }
    
        #endregion
    }
}
