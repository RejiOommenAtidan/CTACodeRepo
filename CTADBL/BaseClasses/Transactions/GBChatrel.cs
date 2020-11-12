using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Transactions
{
    [Table("lnkgbChatrel")]
    public class GBChatrel
    {
        #region Private GBChatrel Properties 
        private int _Id;
        private string _sGBId;
        private decimal _nChatrelAmount;
        private decimal? _nChatrelMeal;
        private int? _nChatrelYear;
        private int? _nChatrelLateFeesPercentage;
        private decimal? _nArrearsAmount;
        private DateTime? _dtArrearsFrom;
        private DateTime? _dtArrearsTo;
        private decimal? _nCurrentChatrelSalaryAmt;
        private DateTime? _dtCurrentChatrelFrom;
        private DateTime? _dtCurrentChatrelTo;
        private decimal? _nChatrelAdditionalDonationAmt;
        private decimal? _nChatrelBusinessDonationAmt;
        private decimal? _nChatrelTotalAmount;
        private string _sChatrelReceiptNumber;
        private int? _nAuthRegionID;
        private string _sCountryID;
        private string? _sPaymentCurrency;
        private string? _sPaidByGBId;
        private DateTime _dtPayment;
        private DateTime? _dtEntered = null;
        private int _nEnteredBy = 1;
        #endregion

        #region Public GBChatrel Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        public string sGBId { get { return _sGBId; } set { _sGBId = value; } }
        public decimal nChatrelAmount { get { return _nChatrelAmount; } set { _nChatrelAmount = value; } }
        public decimal? nChatrelMeal { get { return _nChatrelMeal; } set { _nChatrelMeal = value; } }
        public int? nChatrelYear { get { return _nChatrelYear; } set { _nChatrelYear = value; } }
        public int? nChatrelLateFeesPercentage { get { return _nChatrelLateFeesPercentage; } set { _nChatrelLateFeesPercentage = value; } }
        public decimal? nArrearsAmount { get { return _nArrearsAmount; } set { _nArrearsAmount = value; } }
        public DateTime? dtArrearsFrom { get { return _dtArrearsFrom; } set { _dtArrearsFrom = value; } }
        public DateTime? dtArrearsTo { get { return _dtArrearsTo; } set { _dtArrearsTo = value; } }
        public decimal? nCurrentChatrelSalaryAmt { get { return _nCurrentChatrelSalaryAmt; } set { _nCurrentChatrelSalaryAmt = value; } }
        public DateTime? dtCurrentChatrelFrom { get { return _dtCurrentChatrelFrom; } set { _dtCurrentChatrelFrom = value; } }
        public DateTime? dtCurrentChatrelTo { get { return _dtCurrentChatrelTo; } set { _dtCurrentChatrelTo = value; } }
        public decimal? nChatrelAdditionalDonationAmt { get { return _nChatrelAdditionalDonationAmt; } set { _nChatrelAdditionalDonationAmt = value; } }
        public decimal? nChatrelBusinessDonationAmt { get { return _nChatrelBusinessDonationAmt; } set { _nChatrelBusinessDonationAmt = value; } }
        public decimal? nChatrelTotalAmount { get { return _nChatrelTotalAmount; } set { _nChatrelTotalAmount = value; } }
        public string sChatrelReceiptNumber { get { return _sChatrelReceiptNumber; } set { _sChatrelReceiptNumber = value; } }
        public int? nAuthRegionID { get { return _nAuthRegionID; } set { _nAuthRegionID = value; } }
        public string sCountryID { get { return _sCountryID; } set { _sCountryID = value; } }
        public string? sPaymentCurrency { get { return _sPaymentCurrency; } set { _sPaymentCurrency = value; } }
        public string? sPaidByGBId { get { return _sPaidByGBId; } set { _sPaidByGBId = value; } }

        public DateTime dtPayment { get { return _dtPayment; } set { _dtPayment = value; } }
        public DateTime? dtEntered { get { return _dtEntered; } set { _dtEntered = value; } }

        public int nEnteredBy { get { return _nEnteredBy; } set { _nEnteredBy = value; } }
        #endregion
    }
}
