using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Transactions
{
    [Table("tblactionlogger")]
    public class ActionLogger
    {
        #region Private User Properties 
        private int _Id;
        private string _sActionType;
        private string _sModuleName;
        private string _sEventName;
        private string _sDescription;    
        private string _sStackTrace=null;
        private DateTime? _dtEntered;
        private int? _nEnteredBy=null;
        #endregion

        #region Public Common Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        public string sActionType { get { return _sActionType; } set { _sActionType = value; } }
        public string sModuleName { get { return _sModuleName; } set { _sModuleName = value; } }
        public string sEventName { get { return _sEventName; } set { _sEventName = value; } }
        public string sDescription { get { return _sDescription; } set { _sDescription = value; } }
        public string sStackTrace { get { return _sStackTrace; } set { _sStackTrace = value; } }
        public DateTime? dtEntered { get { return _dtEntered; } set { _dtEntered = value; } }
        public int? nEnteredBy { get { return _nEnteredBy; } set { _nEnteredBy = value; } }
        #endregion
    }
}
