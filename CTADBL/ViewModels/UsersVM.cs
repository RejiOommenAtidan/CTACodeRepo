using CTADBL.BaseClasses.Transactions;

namespace CTADBL.ViewModels
{
    public class UsersVM
    {
        #region Private Properties 
        private User _oUser;
        private string _sUserRightsName;
        #endregion

        #region Public Props
        public User oUser { get { return _oUser; } set { _oUser = value; } }
        public string sUserRightsName { get { return _sUserRightsName; } set { _sUserRightsName = value; } }
        #endregion
    }
}
