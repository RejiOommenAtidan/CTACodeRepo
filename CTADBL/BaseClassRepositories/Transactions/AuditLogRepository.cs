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
        private static MySqlConnection _connection;
        #region Constructor
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
                sGBID = reader.IsDBNull("sGBID") ? null : (string)reader["sGBID"],
                dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"]),
                nEnteredBy = reader.IsDBNull("nEnteredBy") ? null : (int?)(reader["nEnteredBy"]),
                nFeatureID = reader.IsDBNull("nFeatureID") ? null : (int?)(reader["nFeatureID"]),
                nRecordID = reader.IsDBNull("nRecordID") ? null : (int?)(reader["nRecordID"]),
                nRegionID = reader.IsDBNull("nRegionID") ? null : (int?)(reader["nRegionID"]),
                sFieldValuesOld = reader.IsDBNull("sFieldValuesOld") ? null : (string)reader["sFieldValuesOld"],
                sFieldValuesNew = reader.IsDBNull("sFieldValuesNew") ? null : (string)reader["sFieldValuesNew"]
            };
            
            return auditLog;

        }


        #endregion
    }
}
