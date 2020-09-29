using System.ComponentModel.DataAnnotations;

namespace CTADBL.ViewModels
{
    public class ChangePasswordVM
    {
        #region Private Properties 
        private int _nUserId;
        private string _sOldPassword;
        private string _sNewPassword;
        private string _sConfirmNewPassword;
        #endregion

        #region Public Props
        [Required]
        public int nUserId { get { return _nUserId; } set { _nUserId = value; } }
        [Required]
        public string sOldPassword { get { return _sOldPassword; } set { _sOldPassword = value; } }
        [Required]
        public string sNewPassword { get { return _sNewPassword; } set { _sNewPassword = value; } }
        [Required]
        public string sConfirmNewPassword { get { return _sConfirmNewPassword; } set { _sConfirmNewPassword = value; } }
        #endregion
    }
}
