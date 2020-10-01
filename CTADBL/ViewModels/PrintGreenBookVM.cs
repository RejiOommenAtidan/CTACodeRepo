using System;
using System.Collections.Generic;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Text;

namespace CTADBL.ViewModels
{
    public class PrintGreenBookVM
    {
        #region Private properties
        private string _sCountryID;
        private string _sGBID;
        private string _sName;
        private DateTime? _dtDOB;
        private string _sDOBApprox;
        private string _TibetanName;
        private string _TBUOriginVillage;
        private int _nCurrentBookNo;
        private int? _nPreviousBookNo = null;
        private string _sTibetanDate = null;


        #endregion

        #region Public Properties
        public string sCountryID { get { return _sCountryID; } set { _sCountryID = value; } }
        public string sGBID { get { return _sGBID; } set { _sGBID = value; } }
        public string sName { get { return _sName; } set { _sName = value; } }
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

        public string sTibetanDate
        {
            get
            {
                return _sTibetanDate;
            }
            set
            {
                _sTibetanDate = value;
            }
        }
        #endregion
    }
}
