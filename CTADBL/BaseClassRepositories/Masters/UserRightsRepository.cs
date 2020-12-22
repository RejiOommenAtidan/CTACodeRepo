using CTADBL.BaseClasses.Masters;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace CTADBL.BaseClassRepositories.Masters
{
    public class UserRightsRepository : ADORepository<UserRights>
    {
        #region Constructor
        public UserRightsRepository(string connectionString) : base(connectionString)
        {
        }
        #endregion

        #region UserRights Add Call
        public void Add(UserRights userrights)
        {
            var builder = new SqlQueryBuilder<UserRights>(userrights);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Update UserRights Call
        public void Update(UserRights userrights)
        {
            var builder = new SqlQueryBuilder<UserRights>(userrights);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Delete UserRights Call
        public void Delete(UserRights userrights)
        {
            var builder = new SqlQueryBuilder<UserRights>(userrights);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get UserRights Call (SP & Normal)
        public IEnumerable<UserRights> GetAllUserRights()
        {
            // DBAs across the country are having strokes over this next command!
            using (var command = new MySqlCommand("SELECT * FROM lstuserrights"))
            {
                return GetRecords(command);
            }
        }

        public UserRights GetUserRightsById(string Id)
        {
            string sql = @"SELECT `Id`,
                            `sUserRightsName`,
                            `dtEntered`,
                            `nEnteredBy`,
                            `dtUpdated`,
                            `nUpdatedBy`
                        FROM `lstuserrights`
                        WHERE Id= @Id;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("Id", Id);
                return GetRecord(command);
            }
        }

        public UserRights GetUserRightsByUserRightsName(string sUserRightsName)
        {
            string sql = @"SELECT `Id`,
                            `sUserRightsName`,
                            `dtEntered`,
                            `nEnteredBy`,
                            `dtUpdated`,
                            `nUpdatedBy`
                        FROM `lstuserrights`
                        WHERE sUserRightsName = @sUserRightsName;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sUserRightsName", sUserRightsName);
                return GetRecord(command);
            }
        }
        #endregion

        #region Populate UserRights Records
        public override UserRights PopulateRecord(MySqlDataReader reader)
        {
            return new UserRights
            {
                Id = (int)reader["Id"],
                sUserRightsName = (string)reader["sUserRightsName"],
                nEnteredBy = (int)reader["nEnteredBy"],
                nUpdatedBy = (int)reader["nUpdatedBy"],
                dtEntered = (DateTime)reader["dtEntered"],
                dtUpdated = (DateTime)reader["dtUpdated"]
            };
        }
        #endregion
    }
}
