using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses
{
    [Table("greenbookpayment")]
    public class GreenbookPayment
    {
        #region GreenbookPayment Properties

        [Key]
        public int GreenbookID { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Name { get; set; }
        public string TibetianAssociation { get; set; }
        public int YearOfLastPayment { get; set; }
        public int NummberOfYears { get; set; }
        public int EmployementYears { get; set; }
        public int TotalDue { get; set; }
        public int ExtraDonation { get; set; }

        #endregion
    }
}
