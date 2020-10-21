using CTADBL.BaseClasses.Transactions;
using System.Collections.Generic;

namespace CTADBL.ViewModels
{
    public class GBLnkVM
    {
        #region Private Props
        private List<GBChildren> _lGBChildren;
        private List<GBNote> _lGBNote;
        //private List<GBRelation> _lGBRelation;
        private List<GBDocument> _lGBDocument;
        #endregion

        #region Public Props
        public List<GBChildren> lGBChildren { get { return _lGBChildren; } set { _lGBChildren = value; } }
        public List<GBNote> lGBNote { get { return _lGBNote; } set { _lGBNote = value; } }
        //public List<GBRelation> lGBRelation { get { return _lGBRelation; } set { _lGBRelation = value; } }
        public List<GBDocument> lGBDocument { get { return _lGBDocument; } set { _lGBDocument = value; } }
        #endregion
    }
}
