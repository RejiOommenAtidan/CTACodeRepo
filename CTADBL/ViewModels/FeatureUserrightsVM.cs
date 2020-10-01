using CTADBL.BaseClasses.Transactions;

namespace CTADBL.ViewModels
{
    public class FeatureUserrightsVM
    {
        #region Private Properties 
        private FeatureUserrights _oFeatureUserrights;
        private string _sUserRightsName;
        private string _sFeature;
        #endregion

        #region Public Props
        public FeatureUserrights oFeatureUserrights { get { return _oFeatureUserrights; } set { _oFeatureUserrights = value; } }
        public string sUserRightsName { get { return _sUserRightsName; } set { _sUserRightsName = value; } }
        public string sFeature { get { return _sFeature; } set { _sFeature = value; } }
        #endregion
    }
}
