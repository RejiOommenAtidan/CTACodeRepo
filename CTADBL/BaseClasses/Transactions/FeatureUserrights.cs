using System;
using System.ComponentModel.DataAnnotations;

namespace CTADBL.BaseClasses.Transactions
{
    public class FeatureUserrights
    {
        #region Private FeatureUserrights Properties 
        private int _Id;
        private int? _nFeatureID;
        private int? _nUserRightsID;
        private int? _nRights;
        private DateTime? _dtEntered;
        private int? _nEnteredBy;
        #endregion

        #region Public FeatureUserrights Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        public int? nFeatureID { get { return _nFeatureID; } set { _nFeatureID = value; } }
        public int? nUserRightsID { get { return _nUserRightsID; } set { _nUserRightsID = value; } }
        public int? nRights { get { return _nRights; } set { _nRights = value; } }
        public DateTime? dtEntered { get { return _dtEntered; } set { _dtEntered = value; } }
        public int? nEnteredBy { get { return _nEnteredBy; } set { _nEnteredBy = value; } }
        #endregion
    }
}
