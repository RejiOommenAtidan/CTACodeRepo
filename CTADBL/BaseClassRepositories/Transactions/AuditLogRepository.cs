using CTADBL.BaseClasses.Transactions;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace CTADBL.BaseClassRepositories.Transactions
{
    public class AuditLogRepository : ADORepository<AuditLog>
    {
        #region Constructor
        private static MySqlConnection _connection;
        public AuditLogRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
        }
        #endregion

        #region Get call
        public IEnumerable<AuditLog> GetAuditLogsByGBID(string sGBID)
        {
            string sql = @"SELECT Id, sGBID, dtEntered, nFeatureID, nRegionID, nRecordID, sFieldValuesOld, sFieldValuesNew, nEnteredBy from tblauditlog WHERE sGBID = @sGBID ORDER BY dtEntered ;";
            
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBID", sGBID);
                return GetRecords(command);
            }
        }
        #endregion

        #region Populate records

        public override AuditLog PopulateRecord(MySqlDataReader reader)
        {
            AuditLog auditLog = new AuditLog
            {
                Id = (int)reader["Id"],
                dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"]),
                nFeatureID = reader.IsDBNull("nFeatureID") ? null : (int?)(reader["nFeatureID"]),
                nRecordID = reader.IsDBNull("nRecordID") ? null : (int?)(reader["nRecordID"]),
                nRegionID = reader.IsDBNull("nRegionID") ? null : (int?)(reader["nRegionID"]),
                sGBID = reader.IsDBNull("sGBID") ? null : (string)reader["sGBID"],
                sFieldValuesOld = reader.IsDBNull("sFieldValuesOld") ? null : (string)reader["sFieldValuesOld"],
                sFieldValuesNew = reader.IsDBNull("sFieldValuesNew") ? null : (string)reader["sFieldValuesNew"],
                nEnteredBy = reader.IsDBNull("nEnteredBy") ? null : (int?)(reader["nEnteredBy"])
            };
            return auditLog;
        }
        #endregion

        #region Add Call
        public void Add(AuditLog auditLog)
        {
            var builder = new SqlQueryBuilder<AuditLog>(auditLog);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Update Call
        public void Update(AuditLog auditLog)
        {
            var builder = new SqlQueryBuilder<AuditLog>(auditLog);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Delete Call
        public void Delete(AuditLog auditLog)
        {
            var builder = new SqlQueryBuilder<AuditLog>(auditLog);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion
    }
}
