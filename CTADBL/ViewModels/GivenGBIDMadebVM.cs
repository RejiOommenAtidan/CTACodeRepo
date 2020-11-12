using CTADBL.BaseClasses.Transactions;

namespace CTADBL.ViewModels
{
    public class GivenGBIDMadebVM
    {
        #region Private Props
        private Madeb _oMadeb;
        private GivenGBID _oGivenGBID;
        #endregion

        #region Public Props
        public Madeb oMadeb { get { return _oMadeb; } set { _oMadeb = value; } }
        public GivenGBID oGivenGBID { get { return _oGivenGBID; } set { _oGivenGBID = value; } }
        #endregion
    }
}
