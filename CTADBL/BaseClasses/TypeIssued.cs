using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace CTADBL.BaseClasses
{
    [Table("lsttypeissued")]
    public class TypeIssued
    {
        #region TypeIssued Properties
        [Key]
        public int Id { get; set; }
        public string sTypeIssued { get; set; }

        #endregion

    }
}
