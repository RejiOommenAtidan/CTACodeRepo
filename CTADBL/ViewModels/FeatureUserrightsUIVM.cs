namespace CTADBL.ViewModels
{
    public class FeatureUserrightsUIVM
    {
        #region Private Properties 
        public int _nFeatureID;
        private string _sFeature;
        private int _nAdmin;
        private int _nEdit;
        private int _nBookIssue;
        private int _nEntry;
        private int _nSearch;
        #endregion

        #region Public Props
        public int nFeatureID { get { return _nFeatureID; } set { _nFeatureID = value; } }
        public string sFeature { get { return _sFeature; } set { _sFeature = value; } }
        public int nAdmin { get { return _nAdmin; } set { _nAdmin = value; } }
        public int nEdit { get { return _nEdit; } set { _nEdit = value; } }
        public int nBookIssue { get { return _nBookIssue; } set { _nBookIssue = value; } }
        public int nEntry { get { return _nEntry; } set { _nEntry = value; } }
        public int nSearch { get { return _nSearch; } set { _nSearch = value; } }
        #endregion
    }
}
