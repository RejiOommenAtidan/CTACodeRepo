
using CTADBL.BaseClasses.Masters;
using CTADBL.BaseClasses.Transactions;
using System;
using System.Collections.Generic;
//using System.Runtime.InteropServices.WindowsRuntime;
using System.Text;

namespace CTADBL.ViewModels
{
    public class GreenBookSerialNumberVM
    {
        private GreenBookSerialNumber _greenBookSerialNumber;
        private string? _sMadebType;
        private string? _sAuthRegion;

       


        public GreenBookSerialNumber greenBookSerialNumber
        {
            get
            {
                return _greenBookSerialNumber;
            }
            set
            {
                _greenBookSerialNumber = value;
            }
        }

        public string? sMadebType
        {
            get
            {
                return _sMadebType;
            }
            set
            {
                _sMadebType = value;
            }
        }

        public string? sAuthRegion
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

        
    }
}
