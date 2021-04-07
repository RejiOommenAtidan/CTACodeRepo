using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CTADBL.ViewModels
{
    public class MadebSearchVM
    {
        #region Private Detailed Properties 
        private string _sName;
        private string _sFathersName;
        private int? _nFormNumber;
        private string _sAuthRegion;
        private string _sAlias;
        private string _sGBID;
        private DateTime? _dtReceived;
        #endregion

        #region Public Detailed Props
        public string sName { get { return _sName; } set { _sName = value; } }
        public string sFathersName { get { return _sFathersName; } set { _sFathersName = value; } }
        public DateTime? dtReceived { get { return _dtReceived; } set { _dtReceived = value; } }
        public string sAuthRegion { get { return _sAuthRegion; } set { _sAuthRegion = value; } }
        public int? nFormNumber { get { return _nFormNumber; } set { _nFormNumber = value; } }
        public string sAlias { get { return _sAlias; } set { _sAlias = value; } }
        public string sGBID { get { return _sGBID; } set { _sGBID = value; } }
        #endregion
    }
}
