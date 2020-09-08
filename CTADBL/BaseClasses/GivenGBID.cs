using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses
{
    [Table("tblGivenGBID")]
    public class GivenGBID
    {
        #region Given GBID Properties
        [Key]
        public int Id { get; set; }
        public int nGivenGBId { get; set; }
        public int nFormNo { get; set; }
        public DateTime dtDate { get; set; }
        public int nGivenOrNot { get; set; }
        public int nActive { get; set; }
        public string sEnteredDateTime { get; set; }
        public int nEnteredBy { get; set; }
        public string sUpdatedDateTime { get; set; }
        public int nUpdatedBy { get; set; }
        #endregion
    }
}
