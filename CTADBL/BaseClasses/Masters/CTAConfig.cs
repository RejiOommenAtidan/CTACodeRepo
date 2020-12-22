using CTADBL.BaseClasses.Common;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Masters
{
    [Table("lstctaconfig")]
    public class CTAConfig : CommonProps
    {
        #region Private CTA Config Properties 
        private int _Id;
        private string _sKey;
        private string _sValue;
        #endregion

        #region Public CTA Config Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        [DisplayName("Chatrel Key")]
        public string sKey { get { return _sKey; } set { _sKey = value; } }
        [DisplayName("Chatrel Value")]
        public string sValue { get { return _sValue; } set { _sValue = value; } }
        #endregion
    }
}
