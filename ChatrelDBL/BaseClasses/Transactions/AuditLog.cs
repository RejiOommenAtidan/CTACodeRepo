using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChatrelDBL.BaseClasses.Transactions
{
    public class AuditLog
    {
        #region Private AuditLog Properties 
        private int _Id;
        private DateTime? _dtEntered;
        private int? _nFeatureID;
        private int? _nRegionID;
        private int? _nRecordID;
        private string _sGBID;
        private string _sFieldValuesOld;
        private string _sFieldValuesNew;
        private int? _nEnteredBy;
        #endregion

        #region Public AuditLog Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        public DateTime? dtEntered { get { return _dtEntered; } set { _dtEntered = value; } }
        public int? nFeatureID { get { return _nFeatureID; } set { _nFeatureID = value; } }
        public int? nRegionID { get { return _nRegionID; } set { _nRegionID = value; } }
        public int? nRecordID { get { return _nRecordID; } set { _nRecordID = value; } }
        public string sGBID { get { return _sGBID; } set { _sGBID = value; } }
        public string sFieldValuesOld { get { return _sFieldValuesOld; } set { _sFieldValuesOld = value; } }
        public string sFieldValuesNew { get { return _sFieldValuesNew; } set { _sFieldValuesNew = value; } }
        public int? nEnteredBy { get { return _nEnteredBy; } set { _nEnteredBy = value; } }
        #endregion
    }
}
