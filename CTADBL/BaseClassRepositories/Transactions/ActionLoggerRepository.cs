using CTADBL.BaseClasses.Transactions;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace CTADBL.BaseClassRepositories.Transactions
{
    public class ActionLoggerRepository : ADORepository<ActionLogger>
    {
        #region Constructor
        public ActionLoggerRepository(string connectionString) : base(connectionString)
        {
        }
        #endregion

        #region Add Call
        public void Add(ActionLogger actionLogger)
        {
            var builder = new SqlQueryBuilder<ActionLogger>(actionLogger);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Update Call
        public void Update(ActionLogger actionLogger)
        {
            var builder = new SqlQueryBuilder<ActionLogger>(actionLogger);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Delete Call
        public void Delete(ActionLogger actionLogger)
        {
            var builder = new SqlQueryBuilder<ActionLogger>(actionLogger);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get Log/Logs
        public IEnumerable<ActionLogger> GetAllLogs()
        {
            string sql = @"SELECT `Id`,
                            `sActionType`,
                            `sModuleName`,
                            `sEventName`,
                            `sDescription`,
                            `sStackTrace`,
                            `sEnteredDateTime`,
                            `dtEntered`,
                            `nEnteredBy`
                        FROM `tblactionlogger`;";
            using (var command = new MySqlCommand(sql))
            {
                return GetRecords(command);
            }
        }

        public ActionLogger GetLogById(string Id)
        {
            string sql = @"SELECT `Id`,
                            `sActionType`,
                            `sModuleName`,
                            `sEventName`,
                            `sDescription`,
                            `sStackTrace`,
                            `sEnteredDateTime`,
                            `dtEntered`,
                            `nEnteredBy`
                        FROM `tblactionlogger`
                        WHERE Id =@Id";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("Id", Id);
                return GetRecord(command);
            }
        }
        #endregion

        #region Populate Action Logger Records
        public override ActionLogger PopulateRecord(MySqlDataReader reader)
        {
            return new ActionLogger
            {
                Id = (int)reader["Id"],
                sActionType = reader.IsDBNull("sActionType") ? null : (string)(reader["sActionType"]),
                sModuleName = reader.IsDBNull("sModuleName") ? null : (string)(reader["sModuleName"]),
                sEventName = reader.IsDBNull("sEventName") ? null : (string)(reader["sEventName"]),
                sDescription = reader.IsDBNull("sDescription") ? null : (string)(reader["sDescription"]),
                sStackTrace = reader.IsDBNull("sStackTrace") ? null : (string)(reader["sStackTrace"]),
                dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"]),
                nEnteredBy = (int)reader["nEnteredBy"]
            };
        }
        #endregion
    }
}
