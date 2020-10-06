using System.ComponentModel.DataAnnotations;

namespace CTADBL.ViewModels
{
    public class SimpleSearchVM
    {
        #region Private Simple Properties 
        private string _sSearchField;
        private string _sSearchValue;
        #endregion

        #region Public Simple Props
        [Required]
        public string sSearchField { get { return _sSearchField; } set { _sSearchField = value; } }
        [Required]
        public string sSearchValue { get { return _sSearchValue; } set { _sSearchValue = value; } }
        #endregion
    }
}
