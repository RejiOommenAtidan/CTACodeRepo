using CTADBL.BaseClasses.Common;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Transactions
{
    [Table("lnkgbrelation")]
    public class GBRelation :CommonProps
    {
        #region Private GBRelation Properties 
        private int _Id;
        private string _sGBID;
        private string _sGBIDRelation;
        private int _nRelationID;
        #endregion

        #region Public GBRelation Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        [DisplayName("Greenbook ID")]
        public string sGBID { get { return _sGBID; } set { _sGBID = value; } }
        [DisplayName("Greenbook ID of Relation")]
        public string sGBIDRelation { get { return _sGBIDRelation; } set { _sGBIDRelation = value; } }
        [DisplayName("Relation ID")]
        public int nRelationID { get { return _nRelationID; } set { _nRelationID = value; } }
        #endregion
    }
}
