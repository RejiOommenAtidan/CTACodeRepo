using CTADBL.BaseClasses;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System.Collections.Generic;

namespace CTADBL.BaseClassRepositories
{
    public class UserRepository : ADORepository<User>
    {
        #region Constructor
        public UserRepository(string connectionString) : base(connectionString)
        {
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
                            `sUsername`,
                            `sFullName`,
                            `sOffice`,
                            `sPassword`,
                            `nUserRightsId`,
                            IF(nActive, 1, 0) nActive
                        FROM `tbluser`;";
            using (var command = new MySqlCommand(sql))
            {
                return GetRecords(command);
            }
        }

        public User GetUserById(string Id)
        {
            string sql = @"SELECT `Id`,
                            `sUsername`,
                            `sFullName`,
                            `sOffice`,
                            `sPassword`,
                            `nUserRightsId`,
                            IF(nActive, 1, 0) nActive
                        FROM `tbluser`
                        WHERE Id =@Id";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("Id", Id);
                return GetRecord(command);
            }
        }
        #endregion

        #region Populate User Records
        public override User PopulateRecord(MySqlDataReader reader)
        {
            return new User
            {
                Id = (int)reader["Id"],
                sUsername= (string)reader["sUsername"],
                sFullname= (string)reader["sFullName"],
                sOffice= (string)reader["sOffice"],
                sPassword = (string)reader["sPassword"],
                nUserRightsId= (int)reader["nUserRightsId"],
                nActive= (int)reader["nActive"]
            };
        }
        #endregion
    }
}
