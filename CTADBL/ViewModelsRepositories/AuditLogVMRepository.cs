using CTADBL.BaseClasses.Transactions;
using CTADBL.QueryBuilder;
using CTADBL.ViewModels;
using CTADBL.ViewModelsRepositories;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
namespace CTADBL.ViewModelsRepositories
{
    public class AuditLogVMRepository : ADORepository<AuditLogVM>
    {
        private static MySqlConnection _connection;
        #region Constructor
        public AuditLogVMRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
        }
        #endregion

        #region Get Calls
        public IEnumerable<AuditLogVM> GetAuditLogsByGBID(string sGBID)
        {
            string sql = @"SELECT Id, sGBID, dtEntered, nFeatureID, nRegionID, nRecordID, sFieldValuesOld, sFieldValuesNew, nEnteredBy from tblauditlog WHERE sGBID = @sGBID ORDER BY dtEntered ;";

            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBID", sGBID);
                return GetRecords(command);
            }
        }
        #endregion
    }
}
