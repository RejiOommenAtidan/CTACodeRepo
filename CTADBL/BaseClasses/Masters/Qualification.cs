using CTADBL.BaseClasses.Common;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Masters
{
    [Table("lstqualification")]
    public class Qualification : CommonProps
    {
        #region Private Qualification Properties 
        private int _Id;
        private string _sQualificationID;
        private string _sQualification;
        #endregion

        #region Public Common Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        [DisplayName("Qualification ID")]
        public string sQualificationID { get { return _sQualificationID; } set { _sQualificationID = value; } }
        [DisplayName("Qualification Name")]
        public string sQualification { get { return _sQualification; } set { _sQualification = value; } }
        #endregion
    }
}
