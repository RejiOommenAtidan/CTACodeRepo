using CTADBL.BaseClasses.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Masters
{
    [Table("lstmadebtype")]
    public class MadebType : CommonProps
    {
        private int _id;
        private string _madebType;
        private string _sMadebDisplayName;
        private string _sMadebDisplayKey;

        [Key]
        public int Id
        {
            get
            {
                return _id;
            }
            set
            {
                _id = value;
            }
        }
        [Required]
        public string sMadebType
        {
            get
            {
                return _madebType;
            }
            set
            {
                _madebType = value;
            }
        }

        public string sMadebDisplayName
        {
            get
            {
                return _sMadebDisplayName;
            }
            set
            {
                _sMadebDisplayName = value;
            }
        }

        public string sMadebDisplayKey
        {
            get
            {
                return _sMadebDisplayKey;
            }
            set
            {
                _sMadebDisplayKey = value;
            }
        }
    }
}
