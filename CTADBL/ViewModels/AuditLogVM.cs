using CTADBL.BaseClasses.Transactions;
using System;
using System.Collections.Generic;
using System.Text;

namespace CTADBL.ViewModels
{
    public class AuditLogVM
    {
        #region Private properties
        private AuditLog _auditLog;
        private string _sEnteredBy;
        private string _sAuthRegion;
        private string _sRecordType;
        #endregion

        #region Public properties
        public AuditLog auditLog { get { return _auditLog; } set { _auditLog = value; } }
        public string sEnteredBy { get { return _sEnteredBy; } set { _sEnteredBy = value; } }
        public string sAuthRegion { get { return _sAuthRegion;  } set { _sAuthRegion = value; } }
        public string sRecordType { get { return _sRecordType; } set { _sRecordType = value; } }
        #endregion
    }
}
