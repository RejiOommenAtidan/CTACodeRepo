using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Transactions
{
    [Table("lnkgbchartel")]
    public class GBChartel
    {
        #region Private GBChartel Properties 
        private int _Id;
        private string _sGBId;
        private int _nChartelAmount;
        private int? _nChartelMeal;
        private int? _nChartelYear;
        private int? _nChartelLateFeesPercentage;
        private int? _nArrearsAmount;
        private DateTime? _dtArrearsFrom;
        private DateTime? _dtArrearsTo;
        private int? _nChartelSalaryAmt;
        private DateTime? _dtChartelSalaryFrom;
        private DateTime? _dtChartelSalaryTo;
        private int? _nChartelBusinessDonationAmt;
        private int? _nChartelTotalAmount;
        private int? _nChartelRecieptNumber;
        private int? _nAuthRegionID;
        private string _sCountryID;
        private DateTime? _dtEntered = null;
        private int _nEnteredBy = 1;
        #endregion

        #region Public GBChartel Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        public string sGBId { get { return _sGBId; } set { _sGBId = value; } }
        public int nChartelAmount { get { return _nChartelAmount; } set { _nChartelAmount = value; } }
        public int? nChartelMeal { get { return _nChartelMeal; } set { _nChartelMeal = value; } }
        public int? nChartelYear { get { return _nChartelYear; } set { _nChartelYear = value; } }
        public int? nChartelLateFeesPercentage { get { return _nChartelLateFeesPercentage; } set { _nChartelLateFeesPercentage = value; } }
        public int? nArrearsAmount { get { return _nArrearsAmount; } set { _nArrearsAmount = value; } }
        public DateTime? dtArrearsFrom { get { return _dtArrearsFrom; } set { _dtArrearsFrom = value; } }
        public DateTime? dtArrearsTo { get { return _dtArrearsTo; } set { _dtArrearsTo = value; } }
        public int? nChartelSalaryAmt { get { return _nChartelSalaryAmt; } set { _nChartelSalaryAmt = value; } }
        public DateTime? dtChartelSalaryFrom { get { return _dtChartelSalaryFrom; } set { _dtChartelSalaryFrom = value; } }
        public DateTime? dtChartelSalaryTo { get { return _dtChartelSalaryTo; } set { _dtChartelSalaryTo = value; } }
        public int? nChartelBusinessDonationAmt { get { return _nChartelBusinessDonationAmt; } set { _nChartelBusinessDonationAmt = value; } }
        public int? nChartelTotalAmount { get { return _nChartelTotalAmount; } set { _nChartelTotalAmount = value; } }
        public int? nChartelRecieptNumber { get { return _nChartelRecieptNumber; } set { _nChartelRecieptNumber = value; } }
        public int? nAuthRegionID { get { return _nAuthRegionID; } set { _nAuthRegionID = value; } }
        public string sCountryID { get { return _sCountryID; } set { _sCountryID = value; } }
        public DateTime? dtEntered { get { return _dtEntered; } set { _dtEntered = value; } }
        public int nEnteredBy { get { return _nEnteredBy; } set { _nEnteredBy = value; } }
        #endregion
    }
}
