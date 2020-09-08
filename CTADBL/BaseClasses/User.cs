using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CTADBL.BaseClasses
{
    [Table("tbluser")]
    public class User : CommonProps
    {
        #region Private User Properties 
        private int _Id;
        private string _sUsername;
        private string _sFullname;
        private string _sOffice;
        private string _sPassword;
        private int _nUserRightsId;
        private int _nActive;
        private DateTime _dtDOB;
        #endregion

        #region Public Common Properties
        [Key]
        public int Id { get { return _Id; } set { _Id = value; } }
        public string sUsername { get { return _sUsername; } set { _sUsername = value; } }
        public string sFullname { get { return _sFullname; } set { _sFullname = value; } }
        public string sOffice { get { return _sOffice; } set { _sOffice = value; } }
        public string sPassword { get { return _sPassword; } set { _sPassword = value; } }
        public int nUserRightsId { get { return _nUserRightsId; } set { _nUserRightsId = value; } }
        public int nActive { get { return _nActive; } set { _nActive = value; } }
        public DateTime dtDOB { get { return _dtDOB; } set { _dtDOB = value; } }
        #endregion
    }
}
