using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Text;

namespace CTADBL.BaseClasses
{
    [Table("lstprovince")]
    public class Province : CommonProps
    {
        private int _id;
        private string _province;

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
        [NotNull]
        public string sProvince
        {
            get
            {
                return _province;
            }
            set
            {
                _province = value;
            }
        }
    }
}
