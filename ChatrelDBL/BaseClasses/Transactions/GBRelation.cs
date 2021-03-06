﻿using ChatrelDBL.BaseClasses.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChatrelDBL.BaseClasses.Transactions
{
    [Table("lnkgbrelation")]
    public class GBRelation : CommonProps
    {
        #region Private GBRelation Properties 
        private int _Id;
        private string _sGBID;
        private string _sGBIDRelation;
        private int _nRelationID;
        #endregion

        #region Public GBRelation Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        public string sGBID { get { return _sGBID; } set { _sGBID = value; } }
        public string sGBIDRelation { get { return _sGBIDRelation; } set { _sGBIDRelation = value; } }
        public int nRelationID { get { return _nRelationID; } set { _nRelationID = value; } }
        #endregion
    }

}
