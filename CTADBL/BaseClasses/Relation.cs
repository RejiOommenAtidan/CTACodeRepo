using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace CTADBL.BaseClasses
{
    [Table("lstrelation")]
    public class Relation
    {
       
        #region Private Relation Properties 
        private int _Id;
        private string _sRelation;
        #endregion

        #region Public Common Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        public string sRelation { get { return _sRelation; } set { _sRelation = value; } }
        

        #endregion
    }
}
