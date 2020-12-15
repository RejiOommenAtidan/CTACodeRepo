using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Transactions
{
    [Table("lnkgbChatrel")]
    public class GBChatrel
    {
        #region Private GBChatrel Properties 
        private int _Id;
        private int _chatrelpaymentID;
        private string _sGBId;
        private decimal _nChatrelAmount;
        private decimal? _nChatrelMeal;
        private int? _nChatrelYear;
        private int? _nChatrelLateFeesPercentage;
        private decimal? _nChatrelLateFeesValue;
        private decimal? _nArrearsAmount;
        private DateTime? _dtArrearsFrom;
        private DateTime? _dtArrearsTo;
        private decimal? _nCurrentChatrelSalaryAmt;
        private DateTime? _dtCurrentChatrelFrom;
        private DateTime? _dtCurrentChatrelTo;
        private decimal? _nChatrelTotalAmount;
        private string _sChatrelReceiptNumber;
        private int? _nAuthRegionID;
        private string _sCountryID;
        private string? _sPaymentCurrency;
        private string? _sAuthRegionCurrency;
        private decimal? _nConversionRate;
        private string? _sPaidByGBId;
        private DateTime _dtPayment;
        private DateTime? _dtEntered;
        private int _nEnteredBy = 1;
        private DateTime? _dtUpdated;
        private int _nUpdatedBy = 1;
        #endregion

        #region Public GBChatrel Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        [DisplayName("ChatrelPayment ID")]
        public int chatrelpaymentID { get { return _chatrelpaymentID; } set { _chatrelpaymentID = value; } }
        [DisplayName("Green Book ID")]
        public string sGBId { get { return _sGBId; } set { _sGBId = value; } }
        [DisplayName("Chatrel Amount")]
        public decimal nChatrelAmount { get { return _nChatrelAmount; } set { _nChatrelAmount = value; } }
        [DisplayName("Chatrel Meal")]
        public decimal? nChatrelMeal { get { return _nChatrelMeal; } set { _nChatrelMeal = value; } }
        [DisplayName("Chatrel Year")]
        public int? nChatrelYear { get { return _nChatrelYear; } set { _nChatrelYear = value; } }
        [DisplayName("Chatrel Late Fee Percent")]
        public int? nChatrelLateFeesPercentage { get { return _nChatrelLateFeesPercentage; } set { _nChatrelLateFeesPercentage = value; } }
        [DisplayName("Chatrel Late Fee Value")]
        public decimal? nChatrelLateFeesValue { get { return _nChatrelLateFeesValue; } set { _nChatrelLateFeesValue = value; } }
        [DisplayName("Arrears Amount")]
        public decimal? nArrearsAmount { get { return _nArrearsAmount; } set { _nArrearsAmount = value; } }
        [DisplayName("Arrears From Date")]
        public DateTime? dtArrearsFrom { get { return _dtArrearsFrom; } set { _dtArrearsFrom = value; } }
        [DisplayName("Arrears To Date")]
        public DateTime? dtArrearsTo { get { return _dtArrearsTo; } set { _dtArrearsTo = value; } }
        [DisplayName("Current Chatrel Salary Amount")]
        public decimal? nCurrentChatrelSalaryAmt { get { return _nCurrentChatrelSalaryAmt; } set { _nCurrentChatrelSalaryAmt = value; } }
        [DisplayName("Current Chatrel Date From")]
        public DateTime? dtCurrentChatrelFrom { get { return _dtCurrentChatrelFrom; } set { _dtCurrentChatrelFrom = value; } }
        [DisplayName("Current Chatrel Date To")]
        public DateTime? dtCurrentChatrelTo { get { return _dtCurrentChatrelTo; } set { _dtCurrentChatrelTo = value; } }
        [DisplayName("Chatrel Total Amount")]
        public decimal? nChatrelTotalAmount { get { return _nChatrelTotalAmount; } set { _nChatrelTotalAmount = value; } }
        [DisplayName("Chatrel Receipt Number")]
        public string sChatrelReceiptNumber { get { return _sChatrelReceiptNumber; } set { _sChatrelReceiptNumber = value; } }
        [DisplayName("Authority Region ID")]
        public int? nAuthRegionID { get { return _nAuthRegionID; } set { _nAuthRegionID = value; } }
        [DisplayName("Country ID")]
        public string sCountryID { get { return _sCountryID; } set { _sCountryID = value; } }
        [DisplayName("Payment Currency")]
        public string? sPaymentCurrency { get { return _sPaymentCurrency; } set { _sPaymentCurrency = value; } }
        [DisplayName("Authority Region Currency")]
        public string? sAuthRegionCurrency { get { return _sAuthRegionCurrency; } set { _sAuthRegionCurrency = value; } }
        [DisplayName("Conversion Rate")]
        public decimal? nConversionRate { get { return _nConversionRate; } set { _nConversionRate = value; } }
        [DisplayName("Paid by Green Book ID")]
        public string? sPaidByGBId { get { return _sPaidByGBId; } set { _sPaidByGBId = value; } }
        [DisplayName("Payment Date")]
        public DateTime dtPayment { get { return _dtPayment; } set { _dtPayment = value; } }
        [DisplayName("Entered Date")]
        public DateTime? dtEntered { get { return _dtEntered; } set { _dtEntered = value; } }
        [DisplayName("Entered By")]
        public int nEnteredBy { get { return _nEnteredBy; } set { _nEnteredBy = value; } }
        [DisplayName("Update Date")]
        public DateTime? dtUpdated { get { return _dtUpdated; } set { _dtUpdated = value; } }
        [DisplayName("Updated By")]
        public int nUpdatedBy { get { return _nUpdatedBy; } set { _nUpdatedBy = value; } }
        #endregion
    }
}
