using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Masters
{
    [Table("lstDOBApprox")]
    public class DOBApprox
    {
        #region Private DOBApprox Properties 
        private int _Id;
        private string _sDOBApproxID;
        private string _sDOBApproxName;
        #endregion

        #region Public DOBApprox Properties 
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        [DisplayName("DOB Approx ID")]
        public string sDOBApproxID { get { return _sDOBApproxID; } set { _sDOBApproxID = value; } }
        [DisplayName("DOB Approx Name")]
        public string sDOBApproxName { get { return _sDOBApproxName; } set { _sDOBApproxName = value; } }
        #endregion
    }
}
