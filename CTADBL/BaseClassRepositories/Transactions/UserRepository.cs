using CTADBL.BaseClasses.Transactions;
using CTADBL.Services;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace CTADBL.BaseClassRepositories.Transactions
{
    public class UserRepository : ADORepository<User>
    {
        private static MySqlConnection _connection;
             
        #region Constructor
        public UserRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
        }
        #endregion

        #region Add Call
        public void Add(User user)
        {
            var builder = new SqlQueryBuilder<User>(user);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Update Call
        public void Update(User user)
        {
            var builder = new SqlQueryBuilder<User>(user);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Delete Call
        public void Delete(User user)
        {
            var builder = new SqlQueryBuilder<User>(user);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get User/Users
        public IEnumerable<User> GetAllUsers()
        {
            string sql = @"SELECT `Id`,
                            `_Id`,
                            `sUsername`,
                            `sFullName`,
                            `sOffice`,
                            NULL AS sPassword,
	                        NULL AS sSalt,
                            `nUserRightsId`,
                            `bActive`,
                            `dtEntered`,
                            `nEnteredBy`,
                            `dtUpdated`,
                            `nUpdatedBy`
                        FROM `tbluser`;";
            using (var command = new MySqlCommand(sql))
            {
                return GetRecords(command);
            }
        }

        public User GetUserById(string Id)
        {
            string sql = @"SELECT `Id`,
                            `_Id`,
                            `sUsername`,
                            `sFullName`,
                            `sOffice`,
                            `sPassword`,
	                        `sSalt`,
                            `nUserRightsId`,
                            `bActive`,
                            `dtEntered`,
                            `nEnteredBy`,
                            `dtUpdated`,
                            `nUpdatedBy`
                        FROM `tbluser`
                        WHERE Id = @Id";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("Id", Id);
                return GetRecord(command);
            }
        }

        public string GetUserNameById(int Id)
        {
            string sql = @"SELECT sFullName FROM tbluser WHERE Id = @Id";

            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("Id", Id);
                command.CommandType = CommandType.Text;
                command.Connection = _connection;
                _connection.Open();
                string name = command.ExecuteScalar().ToString();
                _connection.Close();
                return name;
            }
        }

        public User GetUserByUsername(string sUsername)
        {
            string sql = @"SELECT `Id`,
                            `_Id`,
                            `sUsername`,
                            `sFullName`,
                            `sOffice`,
                            `sPassword`,
	                        `sSalt`,
                            `nUserRightsId`,
                            `bActive`,
                            `dtEntered`,
                            `nEnteredBy`,
                            `dtUpdated`,
                            `nUpdatedBy`
                        FROM `tbluser`
                        WHERE sUsername = @sUsername;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sUsername", sUsername);
                return GetRecord(command);
            }
        }
        #endregion

        #region Populate User Records
        public override User PopulateRecord(MySqlDataReader reader)
        {
            User user = new User();
            user.Id = (int)reader["Id"];
            //TODO: 
            //user._id = reader.IsDBNull("_Id") ? null : (int?)(reader["_Id"]);
            user.sUsername = (string)reader["sUsername"];
            user.sFullname = (string)reader["sFullName"];
            user.sOffice = (string)reader["sOffice"];
            user.sPassword = reader.IsDBNull("sPassword") ? null : (string)reader["sPassword"];
            user.sSalt = reader.IsDBNull("sSalt") ? null : (string)reader["sSalt"];
            user.nUserRightsId = (int)reader["nUserRightsId"];
            user.bActive = (bool)reader["bActive"];
            //Common Properties
            user.dtEntered = (DateTime)(reader["dtEntered"]);
            user.nEnteredBy = (int)reader["nEnteredBy"];
            user.dtUpdated = (DateTime)(reader["dtUpdated"]);
            user.nUpdatedBy = (int)reader["nUpdatedBy"];

            // Decrypt the password before returning
            //user.sPassword = PasswordEncryption.DecryptString(user.sPassword);
            
            return user;
        }
        #endregion
    }
}
