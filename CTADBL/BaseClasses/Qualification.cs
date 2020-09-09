using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace CTADBL.BaseClasses
{
    [Table("lstqualification")]
    public class Qualification
    {

        #region Private Qualification Properties 
        private int _Id;
        private string _sQualificationID;
        private string _sQualification;

        #endregion

        #region Public Common Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        public string sQualificationID { get { return _sQualificationID; } set { _sQualificationID = value; } }
        public string sQualification { get { return _sQualification; } set { _sQualification = value; } }
     
        #endregion
    }
}
