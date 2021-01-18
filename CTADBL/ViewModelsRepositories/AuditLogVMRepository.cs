using CTADBL.BaseClasses.Transactions;
using CTADBL.QueryBuilder;
using CTADBL.ViewModels;
using CTADBL.ViewModelsRepositories;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using CTADBL.BaseClassRepositories.Transactions;

namespace CTADBL.ViewModelsRepositories
{
    public class AuditLogVMRepository : ADORepository<AuditLogVM>
    {
        private static MySqlConnection _connection;
        private readonly AuditLogRepository _auditLogRepository;
        #region Constructor
        public AuditLogVMRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
            _auditLogRepository = new AuditLogRepository(connectionString);
        }
        #endregion

        #region Get Calls
        public IEnumerable<AuditLogVM> GetAuditLogsByGBID(string sGBID)
        {
            string sql = @"SELECT aud.Id, aud.sGBID, aud.dtEntered, aud.nFeatureID, aud.nRegionID, aud.nRecordID, aud.sFieldValuesOld, aud.sFieldValuesNew, aud.nEnteredBy, us.sFullName AS sEnteredBy, us.sOffice, ft.sFeature FROM tblauditlog AS aud LEFT JOIN tbluser us ON aud.nEnteredBy = us.Id LEFT JOIN lstfeature AS ft ON ft.Id = aud.nFeatureID WHERE aud.sGBID = @sGBID AND aud.nFeatureID <= 100 ORDER BY dtEntered ;";

            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBID", sGBID);
                return GetRecords(command);
            }
        }
        #endregion

        #region Populate records

        public override AuditLogVM PopulateRecord(MySqlDataReader reader)
        {
            AuditLogVM auditLogVM = new AuditLogVM
            {
                auditLog = _auditLogRepository.PopulateRecord(reader),
                sEnteredBy = reader.IsDBNull("sEnteredBy") ? null : (string)reader["sEnteredBy"],
                sFeature = reader.IsDBNull("sFeature") ? null : (string)reader["sFeature"],
                sOffice = reader.IsDBNull("sOffice") ? null : (string)reader["sOffice"]
            };

            return auditLogVM;
        }

        #endregion
    }
}
