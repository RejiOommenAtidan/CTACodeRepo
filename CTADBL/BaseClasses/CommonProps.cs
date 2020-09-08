namespace CTADBL.BaseClasses
{
    public class CommonProps
    {
        #region Private Common Properties
        private string _sEnteredDateTime;
        private int _nEnteredBy;
        private string _sUpdatedDateTime;
        private int _nUpdatedBy;
        #endregion

        #region Public Common Properties
        public string sEnteredDateTime { get { return _sEnteredDateTime; } set { _sEnteredDateTime = value; } }
        public int nEnteredBy { get { return _nEnteredBy; } set { _nEnteredBy = value; } }
        public string sUpdatedDateTime { get { return _sUpdatedDateTime; } set { _sUpdatedDateTime = value; } }
        public int nUpdatedBy { get { return _nUpdatedBy; } set { _nUpdatedBy = value; } }
        #endregion
    }
}
