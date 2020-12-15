using CTADBL.BaseClasses.Common;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Masters
{
    [Table("lstoccupation")]
    public class Occupation : CommonProps
    {
        #region Private Occupation Properties
        private int _id;
        private string _occupationDesc;
        private string _occupationDescTibetan;
        #endregion

        #region Public Occupation Properties
        [Key]
        public int Id { get { return _id; } set { _id = value; } }
        [Required]
        [DisplayName("Occupation Description")]
        public string sOccupationDesc { get { return _occupationDesc; } set { _occupationDesc = value; } }
        [DisplayName("Occupation Description Tibetan")]
        public string sOccupationDescTibetan { get { return _occupationDescTibetan; } set { _occupationDescTibetan = value; } }
        #endregion
    }
}
