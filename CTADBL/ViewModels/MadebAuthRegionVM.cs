using CTADBL.BaseClasses.Transactions;

namespace CTADBL.ViewModels
{
    public class MadebAuthRegionVM 
    {
        private string? _sTypeIssued;
        private string _sAuthRegion;
        private string _sMadebStatus;
        private Madeb _madeb;
        public Madeb madeb
        {
            get
            {
                return _madeb;
            }
            set
            {
                _madeb = value;
            }
        }
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
        public string? sTypeIssued
        {
            get
            {
                return _sTypeIssued;
            }
            set
            {
                _sTypeIssued = value;
            }
        }

        public string sMadebStatus
        {
            get
            {
                return _sMadebStatus;
            }
            set
            {
                _sMadebStatus = value;
            }
        }
    }
}
