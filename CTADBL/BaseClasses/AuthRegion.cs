using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace CTADBL.BaseClasses
{
    [Table ("lstauthregion")]
    public class AuthRegion
    {
        private int _id;
        private string _authRegion;
        private string _countryId;

        [Key]
        public int ID 
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
        public string sAuthRegion 
        { 
            get 
            {
                return _authRegion;
            } 
            set 
            {
                _authRegion = value;
            } 
        }
        public string sCountryID 
        { 
            get 
            {
                return _countryId;
            } 
            set 
            {
                _countryId = value;
            } 
        }
    }
}
