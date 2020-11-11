using CTADBL.BaseClasses.Masters;
using CTADBL.BaseClasses.Transactions;
using CTADBL.ViewModels;
using MySql.Data.MySqlClient;
using System.Collections.Generic;
using System.Data;

namespace CTADBL.ViewModelsRepositories
{
    public class UserVMRepository
    {
        #region Constructor
        private static MySqlConnection _connection;
        public UserVMRepository(string connectionString)
        {
            _connection = new MySqlConnection(connectionString);
        }
        #endregion

        #region Authenticate User
        public UserVM AuthenticateUser(int Id)
        {
            User _oUser = new User();
            string _sJWTToken = null;
            UserRights _oUserRights = new UserRights();
            List<FeatureUserrights> _lFeatureUserrights = new List<FeatureUserrights>();
            using (var command = new MySqlCommand("spGetUserAuthorization"))
            {
                command.Parameters.AddWithValue("nUserIdIN", Id);
                command.Connection = _connection;
                command.CommandType = CommandType.StoredProcedure;
                _connection.Open();
                try
                {

                    var reader = command.ExecuteReader();
                    try
                    {
                        #region User
                        while (reader.Read())
                        {
                            _oUser.Id = (int)reader["Id"];
                            _oUser.sUsername= (string)reader["sUsername"];
                            _oUser.sFullname = (string)reader["sFullName"];
                            _oUser.sOffice = (string)reader["sOffice"];
                            _oUser.nUserRightsId = (int)reader["nUserRightsId"];
                            _oUser.bActive = (bool)reader["nActive"]; 
                        }
                        // Next Result Set
                        reader.NextResult();
                        #endregion

                        #region User Rights
                        while (reader.Read())
                        {
                            _oUserRights.Id = (int)reader["Id"];
                            _oUserRights.sUserRightsName = (string)reader["sUserRightsName"];
                        }
                        // Next Result Set
                        reader.NextResult();
                        #endregion

                        #region User Rights Feature
                        while (reader.Read())
                        {
                            _lFeatureUserrights.Add(new FeatureUserrights()
                            {
                                Id = (int)reader["Id"],
                                nFeatureID = (int)reader["nFeatureID"],
                                nUserRightsID = (int)reader["nUserRightsID"],
                                bRights = (bool)reader["bRights"]
                            }); 
                        }
                        // Next Result Set
                        reader.NextResult();
                        #endregion

                        //JWT Token Generation in API

                        return new UserVM
                        {
                            lFeatureUserrights=_lFeatureUserrights,
                            oUser=_oUser,
                            oUserRights=_oUserRights,
                            sJWTToken=_sJWTToken
                        };
                    }
                    finally
                    {
                        // Always call Close when done reading.
                        reader.Close();
                    }
                }
                finally
                {
                    _connection.Close();
                }
            }
        }
        #endregion
    }
}
