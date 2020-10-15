using CTADBL.BaseClasses.Masters;
using System.Collections.Generic;

namespace CTADBL.ViewModels
{
    public class MadebNewRecordVM
    {
        /*
         * select Id, sMadebDisplayName from lstmadebtype;
         * select ID, sAuthRegion from lstauthregion;
         * select Id, sTypeIssued from lsttypeissued;
	     * select 7000 as nFormNumber;
	     * 
         */
        public List<MadebType> madebTypes { get; set; }
        public List<AuthRegion> authRegions { get; set; }
        public List<TypeIssued> typeIssued { get; set; }
        public List<MadebStatus> madebStatuses { get; set; }
        public int nFormNumber { get; set; }
    }
}
