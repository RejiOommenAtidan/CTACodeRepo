﻿using CTADBL.BaseClasses.Common;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Masters
{
    [Table("lstrelation")]
    public class Relation : CommonProps
    {
        #region Private Relation Properties 
        private int _Id;
        private string _sRelation;
        #endregion

        #region Public Relation Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        [DisplayName("Relation Name")]
        public string sRelation { get { return _sRelation; } set { _sRelation = value; } }
        #endregion
    }
}
