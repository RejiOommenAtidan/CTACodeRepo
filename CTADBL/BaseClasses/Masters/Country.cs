using CTADBL.BaseClasses.Common;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Masters
{
    [Table("lstcountry")]
    public class Country : CommonProps
    {
        #region Country Private Properties
        private int _id;
        private string _countryId;
        private string _country;
        private int? _nDefaultAuthRegionID;
        #endregion

        #region Country Public Properties
        [Key]
        public int ID { get { return _id; } set { _id = value; } }
        [Required]
        [StringLength(2, ErrorMessage = "CountryID should be of 2 characters")]
        [DisplayName("Country ID")]
        public string sCountryID { get { return _countryId; } set { _countryId = value; } }
        [Required]
        [DisplayName("Country")]
        public string sCountry { get { return _country; } set { _country = value; } }
        [DisplayName("Default Authority Region ID")]
        public int? nDefaultAuthRegionID { get { return _nDefaultAuthRegionID; } set { _nDefaultAuthRegionID = value; } }
        #endregion
    }
}
