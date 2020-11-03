using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ChatrelDBL.BaseClasses.Masters
{
    [Table("lstchatrel")]
    public class Chatrel
    {
        #region Private Chatrel Properties 
        private int _Id;
        private string _sChatrelKey;
        private int _nChatrelValue;
        private DateTime? _dtChatrelFrom;
        private DateTime? _dtEntered = null;
        private int _nEnteredBy = 1;
        #endregion

        #region Public Chatrel Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        public string sChatrelKey { get { return _sChatrelKey; } set { _sChatrelKey = value; } }
        public int nChatrelValue { get { return _nChatrelValue; } set { _nChatrelValue = value; } }
        public DateTime? dtChatrelFrom { get { return _dtChatrelFrom; } set { _dtChatrelFrom = value; } }
        public DateTime? dtEntered { get { return _dtEntered; } set { _dtEntered = value; } }
        public int nEnteredBy { get { return _nEnteredBy; } set { _nEnteredBy = value; } }
        #endregion
    }
}
