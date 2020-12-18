using CTADBL.BaseClasses.Common;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Masters
{
    [Table("lstmadebtype")]
    public class MadebType : CommonProps
    {
        #region Private Madeb Type Properties
        private int _id;
        private string _madebType;
        private string _sMadebDisplayName;
        private string _sMadebDisplayKey;
        private int _nMadebFeatureId;
        private int _nMadebLastFormNumber;
        #endregion

        #region Public Madeb Type Properties
        [Key]
        public int Id { get { return _id; } set { _id = value; } }
        [Required]
        [DisplayName("Madeb Type")]
        public string sMadebType { get { return _madebType; } set { _madebType = value; } }
        [DisplayName("Madeb Display Name")]
        public string sMadebDisplayName { get { return _sMadebDisplayName; } set { _sMadebDisplayName = value; } }
        [DisplayName("Madeb Display Key")]
        public string sMadebDisplayKey { get { return _sMadebDisplayKey; } set { _sMadebDisplayKey = value; } }
        [DisplayName("Madeb Feature ID")]
        public int nMadebFeatureId { get { return _nMadebFeatureId; } set { _nMadebFeatureId = value; } }
        [DisplayName("Last Form Number")]

        public int nMadebLastFormNumber { get { return _nMadebLastFormNumber; } set { _nMadebLastFormNumber = value; } }
        #endregion
    }
}
