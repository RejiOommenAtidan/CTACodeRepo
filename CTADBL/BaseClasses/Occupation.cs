using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace CTADBL.BaseClasses
{
    [Table("lstoccupation")]
    public class Occupation : CommonProps
    {
        private int _id;
        private string _occupationDesc;
        private string _occupationDescTibetan;

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
        public string sOccupationDesc
        {
            get
            {
                return _occupationDesc;
            }
            set
            {
                _occupationDesc = value;
            }
        }
        public string sOccupationDescTibetan
        {
            get
            {
                return _occupationDescTibetan;
            }
            set
            {
                _occupationDescTibetan = value;
            }
        }
    }
}
