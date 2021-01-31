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
        private int _nChatrelYear;
        private string _sGBId;
        private decimal _nChatrelTotalAmount;
        private string _sChatrelReceiptNumber;
        private string? _sPaymentStatus;
        private string? _sPaymentMode;
        private string? _sPaymentCurrency;
        private string? _sPaidByGBId;
        private string? _sPayPal_Status;
        private string? _sPayPal_ID;
        private string? _sPayPal_Currency_Code;
        private string? _sPayPal_Currency_Value;
        private string? _sPayPal_Response_Object;
        private DateTime _dtPayment;
        private DateTime? _dtEntered;
        private int _nEnteredBy;
        private DateTime? _dtUpdated;
        private int _nUpdatedBy;
        #endregion

        public enum PaymentStatus { Success = 1, Failed };
        public enum PaymentMode { Online = 1, Offline_WebAdmin, Offline_Bulk };

        public static string Success = "Success";
        public static string Failed = "Failed";

        public static string Online = "Online";
        public static string Offline_WebAdmin = "Offline_WebAdmin";
        public static string Offline_Bulk = "Offline_Bulk";

        public static string INR = "INR";
        public static string USD = "USD";

        #region Public Properties
        public int Id { get { return _Id; } set { _Id = value; } }
        public string sGBId { get { return _sGBId; } set { _sGBId = value; } }
        public int nChatrelYear { get { return _nChatrelYear; } set { _nChatrelYear = value; } }
        public decimal nChatrelTotalAmount { get { return _nChatrelTotalAmount; } set { _nChatrelTotalAmount = value; } }
        public string sChatrelReceiptNumber { get { return _sChatrelReceiptNumber; } set { _sChatrelReceiptNumber = value; } }

        public string? sPaymentStatus { get { return _sPaymentStatus; } set { _sPaymentStatus = value; } }
        public string? sPaymentMode { get { return _sPaymentMode; } set { _sPaymentMode = value; } }
        public string? sPaymentCurrency { get { return _sPaymentCurrency; } set { _sPaymentCurrency = value; } }
        public string? sPaidByGBId { get { return _sPaidByGBId; } set { _sPaidByGBId = value; } }

        public string? sPayPal_Status { get { return _sPayPal_Status; } set { _sPayPal_Status = value; } }
        public string? sPayPal_ID { get { return _sPayPal_ID; } set { _sPayPal_ID = value; } }

        public string? sPayPal_Currency_Code { get { return _sPayPal_Currency_Code; } set { _sPayPal_Currency_Code = value; } }

        public string? sPayPal_Currency_Value { get { return _sPayPal_Currency_Value; } set { _sPayPal_Currency_Value = value; } }
        public string? sPayPal_Response_Object { get { return _sPayPal_Response_Object; } set { _sPayPal_Response_Object = value; } }


        public DateTime dtPayment { get { return _dtPayment; } set { _dtPayment = value; } }
        public DateTime? dtEntered { get { return _dtEntered; } set { _dtEntered = value; } }
        public int nEnteredBy { get { return _nEnteredBy; } set { _nEnteredBy = value; } }

        public DateTime? dtUpdated { get { return _dtUpdated; } set { _dtUpdated = value; } }
        public int nUpdatedBy { get { return _nUpdatedBy; } set { _nUpdatedBy = value; } }
        #endregion
    }
}
