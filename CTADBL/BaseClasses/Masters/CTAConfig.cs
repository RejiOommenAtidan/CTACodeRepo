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
        private DateTime _dtEntered;
        private int _nEnteredBy;
        #endregion

        #region Public CTAConfig Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        public string sKey { get { return _sKey; } set { _sKey = value; } }
        [DisplayName("Value")]
        public string sValue { get { return _sValue; } set { _sValue = value; } }
        public DateTime dtEntered { get { return _dtEntered; } set { _dtEntered = value; } }
        public int nEnteredBy { get { return _nEnteredBy; } set { _nEnteredBy = value; } }
        #endregion
    }
}
