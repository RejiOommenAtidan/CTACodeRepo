using CTADBL.BaseClasses;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace CTADBL.BaseClassRepositories
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
                Id=(int)reader["Id"],
                dtEntered=(DateTime)reader["dtEntered"],
                nEnteredBy=(int?)reader["nEnteredBy"],
                sActionType=(string)reader["sActionType"],
                sDescription=(string)reader["sDescription"],
                sEventName= (string)reader["sEventName"],
                sModuleName=(string)reader["sModuleName"]
            };
        }
        #endregion
    }
}
