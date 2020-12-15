using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Masters
{
    [Table("lstctaconfig")]
    public class CTAConfig
    {
        #region Private CTAConfig Properties 
        private int _Id;
        private string _sKey;
        private string _sValue;
        private DateTime _dtUpdated;
        private int _nUpdatedBy;
        #endregion

        #region Public CTAConfig Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        [DisplayName("Chatrel Key")]
        public string sKey { get { return _sKey; } set { _sKey = value; } }
        [DisplayName("Chatrel Value")]
        public string sValue { get { return _sValue; } set { _sValue = value; } }
        public DateTime dtUpdated { get { return _dtUpdated; } set { _dtUpdated = value; } }
        public int nUpdatedBy { get { return _nUpdatedBy; } set { _nUpdatedBy = value; } }
        #endregion
    }
}
