using CTADBL.BaseClasses.Masters;
using System.Collections.Generic;

namespace CTADBL.ViewModels
{
    public class FeatureUserrightsVM
    {
        #region Private Feature Userrights VM Properties 
        private List<FeatureUserrightsPivot> _lFeatureUserRightsPivot;
        private List<UserRights> _lUserRights;
        private List<Feature> _lFeatures;
        #endregion

        #region Public Feature Userrights VM Props
        public List<FeatureUserrightsPivot> lFeatureUserRightsPivot { get { return _lFeatureUserRightsPivot; } set { _lFeatureUserRightsPivot = value; } }
        public List<UserRights> lUserRights { get { return _lUserRights; } set { _lUserRights = value; } }
        public List<Feature> lFeatures { get { return _lFeatures; } set { _lFeatures = value; } }
        #endregion
    }
}
