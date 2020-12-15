using CTADBL.BaseClasses.Common;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Masters
{
    [Table("lstprovince")]
    public class Province : CommonProps
    {
        private int _id;
        private string _province;

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
        [DisplayName("Province Name")]
        public string sProvince
        {
            get
            {
                return _province;
            }
            set
            {
                _province = value;
            }
        }
    }
}
