using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace CTADBL.BaseClasses
{
    [Table ("lstcountry")]
    public class Country
    {
        [Key]
        public int ID { get; set; }
        public string sCountryID { get; set; }
        public string sCountry { get; set; }
    }
}
