using CTADBL.BaseClasses.Transactions;
using System;
using System.Collections.Generic;
//using System.Runtime.InteropServices.WindowsRuntime;
using System.Text;

namespace CTADBL.ViewModels
{
    public class IssueBookVM
    {
        private IssueBook _issueBook;
        private string _sMadebDisplayName;
        private string _sAuthRegion;

        public IssueBook issueBook
        {
            get
            {
                return _issueBook;
            }
            set
            {
                _issueBook = value;
            }
        }

        public string sMadebDisplayName
        {
            get
            {
                return _sMadebDisplayName;
            }
            set
            {
                _sMadebDisplayName = value;
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
    }
}
