using ChatrelDBL.BaseClasses.Transactions;
using System;
using System.Collections.Generic;
using System.Text;

namespace ChatrelDBL.ViewModels
{
    public class ChatrelPaymentVM
    {

        #region Private properties
        private IEnumerable<GBChatrel> _gbChatrels;
        private ChatrelPayment _chatrelPayment;
        private GBChatrelDonation _gbChatrelDonation;
        private bool _bOutstanding = true;
        #endregion

        #region Public properties
        public IEnumerable<GBChatrel> gbChatrels
        {
            get
            {
                return _gbChatrels;
            }
            set
            {
                _gbChatrels = value;
            }
        }

        public ChatrelPayment chatrelPayment
        {
            get
            {
                return _chatrelPayment;
            }
            set
            {
                _chatrelPayment = value;
            }
        }

        public GBChatrelDonation gbChatrelDonation
        {
            get
            {
                return _gbChatrelDonation;
            }
            set
            {
                _gbChatrelDonation = value;
            }
        }


        public bool Outstanding
        {
            get
            {
                return _bOutstanding;
            }
            set
            {
                _bOutstanding = value;
            }
        }

        #endregion
    }
}
