﻿using CTADBL.BaseClasses.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses.Masters
{
    [Table("lstuserrights")]
    public class UserRights : CommonProps
    {
        #region Private UserRights Properties 
        private int _Id;
        private string _sUserRightsName;

        #endregion

        #region Public Common Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        public string sUserRightsName { get { return _sUserRightsName; } set { _sUserRightsName = value; } }
       
        #endregion

     }
}