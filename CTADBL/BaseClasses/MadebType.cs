using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Text;

namespace CTADBL.BaseClasses
{
    [Table("lstmadebtype")]
    public class MadebType : CommonProps
    {
        private int _id;
        private string _madebType;

        [Key]
        public int Id
        {
            get
            {
                return _id;
            }
            set
            {
                _id = value;
            }
        }
        [Required]
        public string sMadebType
        {
            get
            {
                return _madebType;
            }
            set
            {
                _madebType = value;
            }
        }
    }
}
