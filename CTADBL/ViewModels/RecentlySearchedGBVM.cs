using CTADBL.BaseClasses.Transactions;
using System;
using System.Collections.Generic;
using System.Text;

namespace CTADBL.ViewModels
{
    public class RecentlySearchedGBVM
    {
        #region Private Properties
        private RecentlySearchedGB _recentlySearchedGB;
        private string? _sPhoto;
        #endregion

        #region Public Properties
        public RecentlySearchedGB recentlySearchedGB
        {
            get
            {
                return _recentlySearchedGB;
            }
            set
            {
                _recentlySearchedGB = value;
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
