using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Transactions
{
    [Table("lnkgbchatreldonation")]
    public class GBChatrelDonation
    {
        #region Private GBChatrelDonation Properties 
        private int _Id;
        private int _chatrelpaymentID;
        private string _sGBId;
        private decimal? _nChatrelAdditionalDonationAmt;
        private decimal? _nChatrelBusinessDonationAmt;
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
        [DisplayName("Chatrel Payment ID")]
        public int chatrelpaymentID { get { return _chatrelpaymentID; } set { _chatrelpaymentID = value; } }
        [DisplayName("Green Book ID")]
        public string sGBId { get { return _sGBId; } set { _sGBId = value; } }
        [DisplayName("Chatrel Additional Donation")]
        public decimal? nChatrelAdditionalDonationAmt { get { return _nChatrelAdditionalDonationAmt; } set { _nChatrelAdditionalDonationAmt = value; } }
        [DisplayName("Chatrel Business Donation")]
        public decimal? nChatrelBusinessDonationAmt { get { return _nChatrelBusinessDonationAmt; } set { _nChatrelBusinessDonationAmt = value; } }
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
        [DisplayName("Paid By Green Book ID")]
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







  
