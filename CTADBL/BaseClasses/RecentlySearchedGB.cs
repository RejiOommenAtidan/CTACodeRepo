using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses
{
    [Table("tblRecentlySearchedGB")]
    public class RecentlySearchedGB
    {
        #region Recently Searched GB Properties
        [Key]
        public int ID { get; set; }
        public int nGBID { get; set; }
        public int nUserID { get; set; }
        public string sEnteredDateTime { get; set; }
        public int nEnteredBy { get; set; }
        #endregion

    }
}
