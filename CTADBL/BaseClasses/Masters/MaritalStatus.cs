using CTADBL.BaseClasses.Common;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Masters
{
    [Table("lstMaritalStatus")]
    public class MaritalStatus : CommonProps
    {
        #region Private Marital Status Properties 
        private int _Id;
        private string _sMaritalStatusText;
        private string _sMaritalStatusId;
        #endregion

        #region Public Marital Status Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        [DisplayName("Marital Status Text")]
        public string sMaritalStatusText { get { return _sMaritalStatusText; } set { _sMaritalStatusText = value; } }
        [DisplayName("Marital Status ID")]
        public string sMaritalStatusId { get { return _sMaritalStatusId; } set { _sMaritalStatusId = value; } }
        #endregion
    }
}
