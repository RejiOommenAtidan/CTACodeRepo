using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace CTADBL.BaseClasses
{
    [Table("lstuserrights")]
    public class UserRights
    {
        #region UserRights Properties
        [Key]
        public int Id { get; set; }
        public string sUserRightsName { get; set; }
        
        #endregion
    }
}
