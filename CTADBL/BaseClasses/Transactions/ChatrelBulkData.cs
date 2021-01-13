using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Transactions
{
    [Table("tblchatrelbulkdata")]
    public class ChatrelBulkData
    {
        #region Private GBChatrel Properties 
        private int _Id;
        private string _sBatchNumber = null;
        private bool _bValidate=false;
        private string _SNo = null;
        private string _GBID;
        private string _Name;
        private string _PaidByGBId;
        private string _Currency;
        private string _Chatrel;
        private string _Meal;
        private string _Salary;
        private string _ChatrelFrom;
        private string _ChatrelTo;
        private string _FinancialYear;
        private string _ArrearsPlusLateFees;
        private string _ArrearsFrom;
        private string _ArrearsTo;
        private string _BusinessDonation;
        private string _AdditionalDonation;
        private string _TotalAmount;
        private string _ReceiptNo;
        private string _PaymentDate;
        private string _Region;
        private string _Country;
        private string _PaymentMode;
        private string _sStatus = null;
        private string _sRemarkText = null;
        private DateTime? _dtEntered;
        private int _nEnteredBy = 1;
        private DateTime? _dtUpdated;
        private int _nUpdatedBy = 1;
        #endregion

        #region Public ChatrelBulkData Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        [DisplayName("Batch Number")]
        public string sBatchNumber { get { return _sBatchNumber; } set { _sBatchNumber = value; } }
        [DisplayName("Validate")]
        public bool bValidate { get { return _bValidate; } set { _bValidate = value; } }
        [DisplayName("SNo")]
        public string SNo { get { return _SNo; } set { _SNo = value; } }
        [DisplayName("Green Book ID")]
        public string GBID { get { return _GBID; } set { _GBID = value; } }
        [DisplayName("Name")]
        public string Name { get { return _Name; } set { _Name = value; } }

        [DisplayName("Paid by Green Book ID")]
        public string PaidByGBId { get { return _PaidByGBId; } set { _PaidByGBId = value; } }

        [DisplayName("Payment Currency")]
        public string Currency { get { return _Currency; } set { _Currency = value; } }

        [DisplayName("Chatrel Amount")]
        public string Chatrel { get { return _Chatrel; } set { _Chatrel = value; } }
        [DisplayName("Chatrel Meal")]
        public string Meal { get { return _Meal; } set { _Meal = value; } }
        [DisplayName("Current Chatrel Salary Amount")]
        public string Salary { get { return _Salary; } set { _Salary = value; } }

        [DisplayName("Chatrel Date From")]
        public string ChatrelFrom { get { return _ChatrelFrom; } set { _ChatrelFrom = value; } }
        [DisplayName("Chatrel Date To")]
        public string ChatrelTo { get { return _ChatrelTo; } set { _ChatrelTo = value; } }

        [DisplayName("Chatrel Year")]
        public string FinancialYear { get { return _FinancialYear; } set { _FinancialYear = value; } }
        
        
        [DisplayName("Arrears Amount")]
        public string ArrearsPlusLateFees { get { return _ArrearsPlusLateFees; } set { _ArrearsPlusLateFees = value; } }
        [DisplayName("Arrears From Date")]
        public string ArrearsFrom { get { return _ArrearsFrom; } set { _ArrearsFrom = value; } }
        [DisplayName("Arrears To Date")]
        public string ArrearsTo { get { return _ArrearsTo; } set { _ArrearsTo = value; } }

        [DisplayName("Business Donation")]
        public string BusinessDonation { get { return _BusinessDonation; } set { _BusinessDonation = value; } }

        [DisplayName("Additional Donation")]
        public string AdditionalDonation { get { return _AdditionalDonation; } set { _AdditionalDonation = value; } }


        [DisplayName("Chatrel Total Amount")]
        public string TotalAmount { get { return _TotalAmount; } set { _TotalAmount = value; } }
        [DisplayName("Chatrel Receipt Number")]
        public string ReceiptNo { get { return _ReceiptNo; } set { _ReceiptNo = value; } }

        [DisplayName("Payment Date")]
        public string PaymentDate { get { return _PaymentDate; } set { _PaymentDate = value; } }


        [DisplayName("Authority Region ")]
        public string Region { get { return _Region; } set { _Region = value; } }
        
        [DisplayName("Country ")]
        public string Country { get { return _Country; } set { _Country = value; } }
        
        [DisplayName("Payment Mode")]
        public string PaymentMode { get { return _PaymentMode; } set { _PaymentMode = value; } }
        
        [DisplayName("Status")]
        public string sStatus { get { return _sStatus; } set { _sStatus = value; } }

        [DisplayName("Remarks")]
        public string sRemarkText { get { return _sRemarkText; } set { _sRemarkText = value; } }


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
