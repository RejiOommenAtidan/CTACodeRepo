using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Transactions
{
    [Table("lnkgbnote")]
    public class GBNote
    {
        #region Private GBNote Properties 
        private int _Id;
        private string _sGBID;
        private string _sNote;
        private DateTime? _dtEntered;
        private int _nEnteredBy;
        #endregion

        #region Public GBNote Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        public string sGBID { get { return _sGBID; } set { _sGBID = value; } }
        public string sNote { get { return _sNote; } set { _sNote = value; } }    
        public DateTime? dtEntered { get { return _dtEntered; } set { _dtEntered = value; } }
        public int nEnteredBy { get { return _nEnteredBy; } set { _nEnteredBy = value; } }
        #endregion
    }
}
