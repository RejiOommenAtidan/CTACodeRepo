using System;

namespace CTADBL.BaseClasses.Common
{
    public class CommonProps
    {
        #region Private Common Properties
        private DateTime _dtEntered;
        private int _nEnteredBy;
        private DateTime _dtUpdated;
        private int _nUpdatedBy;
        #endregion

        #region Public Common Properties
        public DateTime dtEntered 
        { 
            get
            {
                return _dtEntered; 
            }
            set
            {
                _dtEntered = value;
            }
        } 
        public int nEnteredBy { get { return _nEnteredBy; } set { _nEnteredBy = value; } }
        //NOTE: protected so no body can set it 
        public DateTime dtUpdated
        {
            get
            {
                return _dtUpdated;
            }
            set
            {
                _dtUpdated = value;
            }
        }
        public int nUpdatedBy { get { return _nUpdatedBy; } set { _nUpdatedBy = value; } }
        #endregion
    }
}
