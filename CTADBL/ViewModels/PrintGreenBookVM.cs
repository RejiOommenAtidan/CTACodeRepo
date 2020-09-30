using System;
using System.Collections.Generic;
using System.Text;

namespace CTADBL.ViewModels
{
    public class PrintGreenBookVM
    {
        #region Private properties
        private string _sCountryID;
        private string _sGBID;
        private DateTime? _dtDOB;
        private string _sDOBApprox;
        private string _TibetanName;
        private string _TBUOriginVillage;
        private int _nCurrentBookNo;
        private int? _nPreviousBookNo = null;


        #endregion

        #region Public Properties
        public string sCountryID { get { return _sCountryID; } set { _sCountryID = value; } }
        public string sGBID { get { return _sGBID; } set { _sGBID = value; } }
        public DateTime? dtDOB { get { return _dtDOB; } set { _dtDOB = value; } }
        public string sDOBApprox { get { return _sDOBApprox; } set { _sDOBApprox = value; } }
        public string TibetanName { get { return _TibetanName; } set { _TibetanName = value; } }
        public string TBUOriginVillage { get { return _TBUOriginVillage; } set { _TBUOriginVillage = value; } }
        public int nCurrentBookNo
        {
            get
            {
                return _nCurrentBookNo;
            }
            set
            {
                _nCurrentBookNo = value;
            }
        }

        public int? nPreviousBookNo
        {
            get
            {
                return _nPreviousBookNo;
            }
            set
            {
                _nPreviousBookNo = value;
            }
        }
        #endregion
    }
}
