using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CTADBL.BaseClasses
{
    public class RecentlySearchedGB
    {
        #region Recently Searched GB
        [Key]
        public int ID { get; set; }
        public int nGBID { get; set; }
        public int nUserID { get; set; }
        public string sEnteredDateTime { get; set; }
        public int nEnteredBy { get; set; }
        #endregion

    }
}
