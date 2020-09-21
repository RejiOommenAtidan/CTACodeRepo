using CTADBL.BaseClasses.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Masters
{
    [Table ("lstauthregion")]
    public class AuthRegion : CommonProps
    {
        private int _id;
        private string _authRegion;
        private string _countryId;

        [Key]
        public int ID 
        { 
            get 
            {
                return _id;
            } 
            set 
            {
                _id = value;
            } 
        }
        [Required]
        public string sAuthRegion 
        { 
            get 
            {
                return _authRegion;
            } 
            set 
            {
                _authRegion = value;
            } 
        }
        [Required]
        public string sCountryID 
        { 
            get 
            {
                return _countryId;
            } 
            set 
            {
                _countryId = value;
            } 
        }
    }
}
