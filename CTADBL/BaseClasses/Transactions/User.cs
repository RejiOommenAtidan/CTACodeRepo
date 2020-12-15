using CTADBL.BaseClasses.Common;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Transactions
{
    [Table("tbluser")]
    public class User : CommonProps
    {
        #region Private User Properties 
        private int _Id;
        private int? __Id;
        private string _sUsername;
        private string _sFullname;
        private string _sOffice;
        private string _sPassword;
        private int _nUserRightsId;
        private bool _bActive;
        #endregion

        #region Public Common Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        [DisplayName("Previous System ID")]
        public int? _id { get { return __Id; } set { __Id = value; } }
        [DisplayName("Username")]
        public string sUsername { get { return _sUsername; } set { _sUsername = value; } }
        [DisplayName("Full Name")]
        public string sFullname { get { return _sFullname; } set { _sFullname = value; } }
        [DisplayName("Office")]
        public string sOffice { get { return _sOffice; } set { _sOffice = value; } }
        [DisplayName("Password")]
        public string sPassword { get { return _sPassword; } set { _sPassword = value; } }
        [DisplayName("User Rights ID")]
        public int nUserRightsId { get { return _nUserRightsId; } set { _nUserRightsId = value; } }
        [DisplayName("Active")]
        public bool bActive { get { return _bActive; } set { _bActive = value; } }
        #endregion
    }
}
