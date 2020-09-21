using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Transactions
{
    [Table("tblRecentlySearchedGB")]
    public class RecentlySearchedGB
    {
        #region Recently Searched GB Properties
        private int _ID;
        private int _nGBID;
        private int _nUserID;
        private int _nEnteredBy;
        private DateTime? _dtEntered;
        #endregion

        #region Public recently Searched GB properties
        [Key]
        public int ID { get { return _ID; } set { _ID = value; } }
        public int nGBID { get { return _nGBID; } set { _nGBID = value; } }
        public int nUserID { get { return _nUserID; } set { _nUserID = value; } }
        public DateTime? dtEntered { get { return _dtEntered; } set { _dtEntered = value; } }
        public int nEnteredBy { get { return _nEnteredBy; } set { _nEnteredBy = value; } }
        #endregion
    }
}
