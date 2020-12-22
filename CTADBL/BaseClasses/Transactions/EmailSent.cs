using System;
using System.Collections.Generic;
using System.Text;

namespace CTADBL.BaseClasses.Transactions
{
    public class EmailSent
    {
        #region Private props

        private int _Id;
        private int _nFormNumber;
        private int _nMadebTypeId;
        private string _sName;
        private string _sFrom;
        private string _sReceiver;
        private string _sSubject;
        private string _sBody;
        

        #endregion

        #region Public props

        public int Id
        {
            get
            {
                return _Id;
            }
            set
            {
                _Id = value;
            }
        }

        public int nFormNumber
        {
            get
            {
                return _nFormNumber;
            }
            set
            {
                _nFormNumber = value;
            }
        }


        public string sName
        {
            get
            {
                return _sName;
            }
            set
            {
                _sName = value;
            }
        }

        public string sFrom
        {
            get
            {
                return _sFrom;
            }
            set
            {
                _sFrom = value;
            }
        }

        public string sReceiver
        {
            get
            {
                return _sReceiver;
            }
            set
            {
                _sReceiver = value;
            }
        }

        public string sSubject
        {
            get
            {
                return _sSubject;
            }
            set
            {
                _sSubject = value;
            }

        }

        public string sBody
        {
            get
            {
                return _sBody;
            }
            set
            {
                _sBody = value;
            }
        }

        public int nMadebTypeId
        {
            get
            {
                return _nMadebTypeId;
            }
            set
            {
                _nMadebTypeId = value;
            }
        }

        #endregion
    }
}
