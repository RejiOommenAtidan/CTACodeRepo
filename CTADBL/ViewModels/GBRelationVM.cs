using System;
using System.Collections.Generic;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Text;
using CTADBL.BaseClasses;
using CTADBL.BaseClasses.Transactions;

namespace CTADBL.ViewModels
{

    /*
     * gb.sFathersName, gb.sFathersID , frel.sgbidrelation as sFathersGBID, gb.sMothersName, gb.sMothersID,  mrel.sgbidrelation as sMothersGBID,  gb.sSpouseName, gb.sSpouseID, srel.sgbidrelation as sSpouseGBID,
     * 
     */


    public class GBRelationVM
    {
        #region Private props
        //private GBRelation _gbRelation = null;
        private string _sFathersName;
        private string _sFathersID;
        private string _sFathersGBID;
        private string _sFathersPhoto;
        private string _sMothersName;
        private string _sMothersID;
        private string _sMothersGBID;
        private string _sMothersPhoto;
        private string _sSpouseName;
        private string _sSpouseID;
        private string _sSpouseGBID;
        private string _sSpousePhoto;

        #endregion

        #region Public Properties
        //public GBRelation gbRelation
        //{
        //    get
        //    {
        //        return _gbRelation;
        //    }
        //    set
        //    {
        //        _gbRelation = value;
        //    }
        //}

        public string sFathersName
        {
            get
            {
                return _sFathersName;
            }
            set
            {
                _sFathersName = value;
            }
        }

        public string sFathersID
        {
            get
            {
                return _sFathersID;
            }
            set
            {
                _sFathersID = value;
            }
        }

        public string sFathersGBID
        {
            get
            {
                return _sFathersGBID;
            }
            set
            {
                _sFathersGBID = value;
            }
        }


        public string sFathersPhoto
        {
            get
            {
                return _sFathersPhoto;
            }
            set
            {
                _sFathersPhoto = value;
            }
        }
        public string sMothersName
        {
            get
            {
                return _sMothersName;
            }
            set
            {
                _sMothersName = value;
            }
        }
        public string sMothersID
        {
            get
            {
                return _sMothersID;
            }
            set
            {
                _sMothersID = value;
            }
        }
        public string sMothersGBID
        {
            get
            {
                return _sMothersGBID;
            }
            set
            {
                _sMothersGBID = value;
            }
        }
        public string sMothersPhoto
        {
            get
            {
                return _sMothersPhoto;
            }
            set
            {
                _sMothersPhoto = value;
            }
        }
        public string sSpouseName
        {
            get
            {
                return _sSpouseName;
            }
            set
            {
                _sSpouseName = value;
            }
        }
        public string sSpouseID
        {
            get
            {
                return _sSpouseID;
            }
            set
            {
                _sSpouseID = value;
            }
        }
        public string sSpouseGBID
        {
            get
            {
                return _sSpouseGBID;
            }
            set
            {
                _sSpouseGBID = value;
            }
        }
        public string sSpousePhoto
        {
            get
            {
                return _sSpousePhoto;
            }
            set
            {
                _sSpousePhoto = value;
            }
        }
        




        #endregion

    }
}
