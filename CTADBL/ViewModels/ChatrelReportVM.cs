using CTADBL.BaseClasses.Masters;
using System;
using System.Collections.Generic;
using System.Text;

namespace CTADBL.ViewModels
{
    public class ChatrelReportVM
    {
        public IEnumerable<Country> Countries { get; set; }
        public IEnumerable<AuthRegion> AuthRegions { get; set; }
        public DateTime dtDateFrom { get; set; }
        public DateTime dtDateTo { get; set; }
        public string sPaymentMode { get; set; }

    }
}
