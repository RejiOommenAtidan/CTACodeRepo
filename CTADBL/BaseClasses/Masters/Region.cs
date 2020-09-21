using CTADBL.BaseClasses.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Masters
{
    [Table("lstregion")]
    public class Region : CommonProps
    {
        #region Private Region Properties 
        private int _Id;
        private string _sRegion_name;
        private string _sRegion_code;

        #endregion

        #region Public Common Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        public string sRegion_name { get { return _sRegion_name; } set { _sRegion_name = value; } }
        public string sRegion_code { get { return _sRegion_code; } set { _sRegion_code = value; } }

        #endregion
    }
}
