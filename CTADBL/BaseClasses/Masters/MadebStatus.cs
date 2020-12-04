using CTADBL.BaseClasses.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using System.Text;

namespace CTADBL.BaseClasses.Masters
{
    [Table("lstcountry")]
    public class MadebStatus : CommonProps
    {
        #region Private Properties
        private int _Id;
        private string _sMadebStatus;
        #endregion

        #region Public Properties
        [Key]
        public int Id
        {
            get
            {
                return _Id;
            }
            set
            {
                _Id = value;
            }
        }
        [Required]
        public string sMadebStatus
        {
            get
            {
                return _sMadebStatus;
            }
            set
            {
                _sMadebStatus = value;
            }
        }

        #endregion
    }
}
