using CTADBL.BaseClasses.Common;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Masters
{
    [Table("lstfeature")]
    public class Feature : CommonProps
    {
        #region Private Properties 
        private int _Id;
        private string _sFeature;
        #endregion

        #region Public Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        [DisplayName("Feature Name")]
        public string sFeature { get { return _sFeature; } set { _sFeature = value; } }
        #endregion
    }
}
