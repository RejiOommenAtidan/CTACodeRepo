using System;
using System.Collections.Generic;
using System.Text;

namespace CTADBL.ViewModels
{
    public class FeatureUserrightsPivot
    {
        #region Private Feature Userrights Pivot Properties 
        private int? _nFeatureID;
        private string _sFeature;
        private int[] _aUserRights;
        #endregion

        #region Public Feature Userrights Pivot Props
        public int? nFeatureID { get { return _nFeatureID; } set { _nFeatureID = value; } }
        public string sFeature { get { return _sFeature; } set { _sFeature = value; } }
        public int[] aUserRights { get { return _aUserRights; } set { _aUserRights = value; } }
        #endregion
    }
}
