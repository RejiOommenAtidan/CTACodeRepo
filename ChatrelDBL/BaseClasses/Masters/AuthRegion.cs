using ChatrelDBL.BaseClasses.Common;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChatrelDBL.BaseClasses.Masters
{
    [Table ("lstauthregion")]
    public class AuthRegion : CommonProps
    {
        private int _id;
        private string _sAuthRegion;
        private string _sCountryId;
        private string _sCurrencyCode;

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
                return _sAuthRegion;
            }
            set
            {
                _sAuthRegion = value;
            }
        }
        [Required]
        public string sCountryID
        {
            get
            {
                return _sCountryId;
            }
            set
            {
                _sCountryId = value;
            }
        }
        [Required]
        public string sCurrencyCode
        {
            get
            {
                return _sCurrencyCode;
            }
            set
            {
                _sCurrencyCode = value;
            }
        }
    }
}
