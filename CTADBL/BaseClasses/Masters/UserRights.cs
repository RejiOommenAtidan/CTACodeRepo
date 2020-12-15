using CTADBL.BaseClasses.Common;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Masters
{
    [Table("lstuserrights")]
    public class UserRights : CommonProps
    {
        #region Private User Rights Properties 
        private int _Id;
        private string _sUserRightsName;
        #endregion

        #region Public User Rights Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        [DisplayName("Role Name")]
        public string sUserRightsName { get { return _sUserRightsName; } set { _sUserRightsName = value; } }
        #endregion
    }
}
