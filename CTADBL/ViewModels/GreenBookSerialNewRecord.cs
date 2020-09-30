using CTADBL.BaseClasses.Masters;
using System.Collections.Generic;

namespace CTADBL.ViewModels
{
    public class GreenBookSerialNewRecord
    {
        public List<MadebType> madebTypes { get; set; }
        public List<AuthRegion> authRegions { get; set; }
        public int nBookNo { get; set; }
    }
}
