using CTADBL.BaseClasses.Common;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Transactions
{
    [Table("lnkgbdocument")]
    public class GBDocument : CommonProps
    {
        #region Private GB Document Properties 
        private int _Id;
        private string _sGBID;
        private string _sTitle;
        private string _sDocType;
        private string? _binFileDoc;
        private string? _sFileExtension;
        private int? _nRegisterDate;
        #endregion

        #region Public GB Document Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        [DisplayName("Green Book ID")]
        public string sGBID { get { return _sGBID; } set { _sGBID = value; } }
        [DisplayName("Title")]
        public string sTitle { get { return _sTitle; } set { _sTitle = value; } }
        [DisplayName("Document Type")]
        public string sDocType { get { return _sDocType; } set { _sDocType = value; } }
        [DisplayName("Document Binary File")]
        public string? binFileDoc { get { return _binFileDoc; } set { _binFileDoc = value; } }
        [DisplayName("File Extension")]
        public string? sFileExtension { get { return _sFileExtension; } set { _sFileExtension = value; } }
        [DisplayName("Register Date")]
        public int? nRegisterDate { get { return _nRegisterDate; } set { _nRegisterDate = value; } }
        #endregion
    }
}
