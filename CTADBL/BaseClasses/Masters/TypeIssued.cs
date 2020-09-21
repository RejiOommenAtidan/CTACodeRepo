using CTADBL.BaseClasses.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Masters
{
    [Table("lsttypeissued")]
    public class TypeIssued : CommonProps
    {
        #region Private TypeIssued Properties 
        private int _Id;
        private string _sTypeIssued;

        #endregion

        #region Public Common Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        public string sTypeIssued { get { return _sTypeIssued; } set { _sTypeIssued = value; } }

        #endregion
    }
}
