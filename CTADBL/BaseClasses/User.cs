using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses
{
    [Table("ctauser")]
    public class User
    {
        #region User Properties
        [Key]
        public int User_Id { get; set; }
        public string Username { get; set; }
        public string Fullname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Confirm_Password { get; set; }
        public string Role { get; set; }
        public string Region { get; set; }
        public string Status { get; set; } 
        #endregion
    }
}