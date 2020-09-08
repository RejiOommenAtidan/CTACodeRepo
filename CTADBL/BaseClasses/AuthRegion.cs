using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace CTADBL.BaseClasses
{
    [Table ("lstauthregion")]
    public class AuthRegion
    {
        [Key]
        public int ID { get; set; }
        public string sAuthRegion { get; set; }
        public string sCountryID { get; set; }
    }
}
