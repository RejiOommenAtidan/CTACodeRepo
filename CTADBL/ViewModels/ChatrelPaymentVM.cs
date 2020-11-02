using CTADBL.BaseClasses.Transactions;
using System;
using System.Collections.Generic;
using System.Text;

namespace CTADBL.ViewModels
{
    public class ChatrelPaymentVM
    {

        #region Private properties
        private IEnumerable<GBChatrel> _gbChatrels;
        private ChatrelPayment _chatrelPayment;
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
        #endregion
    }
}
