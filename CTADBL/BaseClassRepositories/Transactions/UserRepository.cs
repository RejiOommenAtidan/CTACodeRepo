using CTADBL.BaseClasses.Transactions;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace CTADBL.BaseClassRepositories.Transactions
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
                            `_Id`,
                            `sUsername`,
                            `sFullName`,
                            `sOffice`,
                            `sPassword`,
                            `nUserRightsId`,
                            IF(nActive, 1, 0) nActive,
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
                            `nUserRightsId`,
                            IF(nActive, 1, 0) nActive,
                            `dtEntered`,
                            `nEnteredBy`,
                            `dtUpdated`,
                            `nUpdatedBy`
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

            //reader.get
            int colIndex1 = reader.GetOrdinal("dtEntered");
            int colIndex2 = reader.GetOrdinal("dtUpdated");

            DateTime? dtEntered = null;
            DateTime? dtUpdated = null;
            if (!reader.IsDBNull(colIndex1))
            {
                dtEntered = (DateTime)reader["dtEntered"];
            }
            if (!reader.IsDBNull(colIndex2))
            {
                dtUpdated = (DateTime)reader["dtUpdated"];
            }

            User user = new User();

            user.Id = (int)reader["Id"];
            //TODO: 
            //user._id = (int?)reader["_id"];
            user.sUsername = (string)reader["sUsername"];
            user.sFullname = (string)reader["sFullName"];
            user.sOffice = (string)reader["sOffice"];
            user.sPassword = (string)reader["sPassword"];
            user.nUserRightsId = (int)reader["nUserRightsId"];
            user.nActive = (int)reader["nActive"];
            //Common Properties
            user.dtEntered = dtEntered;
            user.nEnteredBy = (int)reader["nEnteredBy"];
            user.dtUpdated = dtUpdated;
            user.nUpdatedBy = (int)reader["nUpdatedBy"];
            
            return user;
        }
        #endregion
    }
}
