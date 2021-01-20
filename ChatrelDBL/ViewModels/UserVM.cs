using ChatrelDBL.BaseClasses.Transactions;
using System;
using System.Collections.Generic;
using System.Text;

namespace ChatrelDBL.ViewModels
{
    public class UserVM
    {
        private Greenbook _User;
        private string _sJwtToken;
        public Greenbook User
        {
            get
            {
                return _User;
            }
            set
            {
                _User = value;
            }
        }


        public string sJwtToken
        {
            get
            {
                return _sJwtToken;
            }
            set
            {
                _sJwtToken = value;
            }
        }
    }
}
