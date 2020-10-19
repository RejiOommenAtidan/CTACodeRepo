using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Masters
{
    [Table("lstchartel")]
    public class Chartel
    {
        #region Private Chartel Properties 
        private int _Id;
        private string _sChartelKey;
        private int? _nChartelValue;
        private DateTime? _dtChartelFrom;
        private DateTime? _dtEntered = null;
        private int _nEnteredBy = 1;
        #endregion

        #region Public Chartel Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        public string sChartelKey { get { return _sChartelKey; } set { _sChartelKey = value; } }
        public int? nChartelValue { get { return _nChartelValue; } set { _nChartelValue = value; } }
        public DateTime? dtChartelFrom { get { return _dtChartelFrom; } set { _dtChartelFrom = value; } }
        public DateTime? dtEntered { get { return _dtEntered; } set { _dtEntered = value; } }
        public int nEnteredBy { get { return _nEnteredBy; } set { _nEnteredBy = value; } }
        #endregion
    }
}
