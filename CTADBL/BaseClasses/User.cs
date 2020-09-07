using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses
{
    [Table("tbluser")]
    public class User
    {
        #region User Properties
        [Key]
        public int Id { get; set; }
        public string sUsername { get; set; }
        public string sFullname { get; set; }
        public string sOffice { get; set; }
        public string sPassword { get; set; }
        public int nUserRightsId { get; set; }
        public int nActive { get; set; }
        //public string sEnteredDateTime { get; set; }
        //public int nEnteredBy { get; set; }
        //public string sUpdatedDateTime { get; set; }
        //public int nUpdatedBy { get; set; }
        #endregion
    }
}
