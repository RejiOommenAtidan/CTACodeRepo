using CTADBL.BaseClasses.Masters;
using CTADBL.BaseClasses.Transactions;
using System.Collections.Generic;

namespace CTADBL.ViewModels
{
    public class UserVM
    {
        #region Private Properties 
        private User _oUser;
        private string _sJWTToken;
        private UserRights _oUserRights;
        private List<FeatureUserrights> _lFeatureUserrights;
        private double _nTimeoutInDays;
        #endregion

        #region Public Props
        public User oUser { get { return _oUser; } set { _oUser = value; } } 
        public string sJWTToken { get { return _sJWTToken; } set { _sJWTToken = value; } }
        public UserRights oUserRights { get { return _oUserRights; } set { _oUserRights = value; } }
        public List<FeatureUserrights> lFeatureUserrights { get { return _lFeatureUserrights; } set { _lFeatureUserrights = value; } }
        public double nTimeoutInDays { get { return _nTimeoutInDays; } set { _nTimeoutInDays = value; } }
        #endregion
    }
}
