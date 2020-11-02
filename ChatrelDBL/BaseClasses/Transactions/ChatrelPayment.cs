using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChatrelDBL.BaseClasses.Transactions
{
    [Table("tblchatrelpayment")]
    public class ChatrelPayment
    {
        #region Private  Properties 
        private int _Id;
        private string? _sGBId;
        private int? _nchatrelAmount;
        private int? _nchatrelMeal;
        private int? _nchatrelYear;
        private int? _nchatrelLateFeesPercentage;
        private int? _nArrearsAmount;
        private DateTime? _dtArrearsFrom;
        private DateTime? _dtArrearsTo;
        private int? _nchatrelSalaryAmt;
        private DateTime? _dtchatrelSalaryFrom;
        private DateTime? _dtchatrelSalaryTo;
        private int? _nchatrelBusinessDonationAmt;
        private int? _nchatrelTotalAmount;
        private int? _nchatrelRecieptNumber;
        private int? _nAuthRegionID;
        private string? _sCountryID;
        private string? _sPaymentStatus;
        private string? _sPaymentMode;
        private string? _sPaymentCurrency;
        private DateTime? _dtEntered;
        private int _nEnteredBy;
        #endregion

        #region Public Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        public string? sGBId { get { return _sGBId; } set { _sGBId = value; } }
        public int? nchatrelAmount { get { return _nchatrelAmount; } set { _nchatrelAmount = value; } }
        public int? nchatrelMeal { get { return _nchatrelMeal; } set { _nchatrelMeal = value; } }
        public int? nchatrelYear { get { return _nchatrelYear; } set { _nchatrelYear = value; } }
        public int? nchatrelLateFeesPercentage { get { return _nchatrelLateFeesPercentage; } set { _nchatrelLateFeesPercentage = value; } }
        public int? nArrearsAmount { get { return _nArrearsAmount; } set { _nArrearsAmount = value; } }
        public DateTime? dtArrearsFrom { get { return _dtArrearsFrom; } set { _dtArrearsFrom = value; } }
        public DateTime? dtArrearsTo { get { return _dtArrearsTo; } set { _dtArrearsTo = value; } }
        public int? nchatrelSalaryAmt { get { return _nchatrelSalaryAmt; } set { _nchatrelSalaryAmt = value; } }
        public DateTime? dtchatrelSalaryFrom { get { return _dtchatrelSalaryFrom; } set { _dtchatrelSalaryFrom = value; } }
        public DateTime? dtchatrelSalaryTo { get { return _dtchatrelSalaryTo; } set { _dtchatrelSalaryTo = value; } }
        public int? nchatrelBusinessDonationAmt { get { return _nchatrelBusinessDonationAmt; } set { _nchatrelBusinessDonationAmt = value; } }
        public int? nchatrelTotalAmount { get { return _nchatrelTotalAmount; } set { _nchatrelTotalAmount = value; } }
        public int? nchatrelRecieptNumber { get { return _nchatrelRecieptNumber; } set { _nchatrelRecieptNumber = value; } }
        public int? nAuthRegionID { get { return _nAuthRegionID; } set { _nAuthRegionID = value; } }
        public string? sCountryID { get { return _sCountryID; } set { _sCountryID = value; } }
        public string? sPaymentStatus { get { return _sPaymentStatus; } set { _sPaymentStatus = value; } }
        public string? sPaymentMode { get { return _sPaymentMode; } set { _sPaymentMode = value; } }
        public string? sPaymentCurrency { get { return _sPaymentCurrency; } set { _sPaymentCurrency = value; } }
        public DateTime? dtEntered { get { return _dtEntered; } set { _dtEntered = value; } }
        public int nEnteredBy { get { return _nEnteredBy; } set { _nEnteredBy = value; } }

        #endregion
    }
}
