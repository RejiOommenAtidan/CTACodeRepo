using CTADBL.BaseClasses.Common;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Masters
{
    [Table("lstauthregion")]
    public class AuthRegion : CommonProps
    {
        #region Private AuthRegion Properties
        private int _id;
        private string _sAuthRegion;
        private string _sCountryId;
        private string? _sCurrencyCode;
        #endregion

        #region Public AuthRegion Properties
        [Key]
        public int ID { get { return _id; } set { _id = value; } }
        [Required]
        [DisplayName("Authority Region")]
        public string sAuthRegion { get { return _sAuthRegion; } set { _sAuthRegion = value; } }
        [Required]
        [DisplayName("Country ID")]
        public string sCountryID { get { return _sCountryId; } set { _sCountryId = value; } }
        [Required]
        [DisplayName("Currency Code")]
        public string sCurrencyCode { get { return _sCurrencyCode; } set { _sCurrencyCode = value; } }
        #endregion
    }
}
