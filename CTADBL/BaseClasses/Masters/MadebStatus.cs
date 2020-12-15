using CTADBL.BaseClasses.Common;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Masters
{
    [Table("lstmadebstatus")]
    public class MadebStatus : CommonProps
    {
        #region Private Properties
        private int _Id;
        private string _sMadebStatus;
        #endregion

        #region Public Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        [Required]
        [DisplayName("Madeb Status")]
        public string sMadebStatus { get { return _sMadebStatus; } set { _sMadebStatus = value; } }
        #endregion
    }
}
