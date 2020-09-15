using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace CTADBL.BaseClasses
{
    [Table ("lstcountry")]
    public class Country : CommonProps
    {
        private int _id;
        private string _countryId;
        private string _country;

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
        [StringLength(2, ErrorMessage = "CountryID should be of 2 characters")]
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
        [Required]
        public string sCountry 
        { 
            get
            {
                return _country;
            }
            set
            {
                _country = value;
            }
        }
    }
}
