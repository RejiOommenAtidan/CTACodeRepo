using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Transactions
{
    [Table("lnkfeatureuserrights")]
    public class FeatureUserrights
    {
        #region Private FeatureUserrights Properties 
        private int _Id;
        private int? _nFeatureID;
        private int? _nUserRightsID;
        private bool _bRights;
        private DateTime? _dtEntered;
        private int _nEnteredBy;
        #endregion

        #region Public FeatureUserrights Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        [DisplayName("Feature ID")]
        public int? nFeatureID { get { return _nFeatureID; } set { _nFeatureID = value; } }
        [DisplayName("User Rights ID")]
        public int? nUserRightsID { get { return _nUserRightsID; } set { _nUserRightsID = value; } }
        [DisplayName("Rights")]
        public bool bRights { get { return _bRights; } set { _bRights = value; } }
        [DisplayName("Entered Date")]
        public DateTime? dtEntered { get { return _dtEntered; } set { _dtEntered = value; } }
        [DisplayName("Entered By")]
        public int nEnteredBy { get { return _nEnteredBy; } set { _nEnteredBy = value; } }
        #endregion
    }
}
