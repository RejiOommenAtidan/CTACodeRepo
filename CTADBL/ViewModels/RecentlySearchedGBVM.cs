using CTADBL.BaseClasses.Transactions;
using System;
using System.Collections.Generic;
using System.Text;

namespace CTADBL.ViewModels
{
    public class RecentlySearchedGBVM
    {
        #region Private Properties
        //private RecentlySearchedGB _recentlySearchedGB = null;
        private int _nGBID;
        private string? _sPhoto = null;
        #endregion

        #region Public Properties
        //public RecentlySearchedGB recentlySearchedGB
        //{
        //    get
        //    {
        //        return _recentlySearchedGB;
        //    }
        //    set
        //    {
        //        _recentlySearchedGB = value;
        //    }
        //}

        public int nGBID
        {
            get
            {
                return _nGBID;
            }
            set
            {
                _nGBID = value;
            }
        }

        public string? sPhoto
        {
            get
            {
                return _sPhoto;
            }
            set
            {
                _sPhoto = value;
            }
        }

        #endregion
    }
}
