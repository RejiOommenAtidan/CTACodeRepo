using System;
using System.Collections.Generic;
using System.Text;

namespace CTADBL.BaseClasses.Masters
{
    public class MadebStatus
    {
        #region Private Properties
        private int _Id;
        private string _sMadebStatus;
        #endregion

        #region Public Properties
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

        #endregion
    }
}
