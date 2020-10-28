using CTADBL.BaseClasses.Transactions;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace CTADBL.BaseClassRepositories.Transactions
{
    public class GBChatrelRepository : ADORepository<GBChatrel>
    {
        #region Constructor
        public GBChatrelRepository(string connectionString) : base(connectionString)
        {
        }
        #endregion

        #region Add Call
        public void Add(GBChatrel gbChatrel)
        {
            var builder = new SqlQueryBuilder<GBChatrel>(gbChatrel);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Update Call
        public void Update(GBChatrel gbChatrel)
        {
            var builder = new SqlQueryBuilder<GBChatrel>(gbChatrel);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Delete Call
        public void Delete(GBChatrel gbChatrel)
        {
            var builder = new SqlQueryBuilder<GBChatrel>(gbChatrel);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get GB Chatrel
        public IEnumerable<GBChatrel> GetAllGBChatrel()
        {
            string sql = @"SELECT `Id`,
                            `sGBId`,
                            `nChatrelAmount`,
                            `nChatrelMeal`,
                            `nChatrelYear`,
                            `nChatrelLateFeesPercentage`,
                            `nArrearsAmount`,
                            `dtArrearsFrom`,
                            `dtArrearsTo`,
                            `nChatrelSalaryAmt`,
                            `dtChatrelSalaryFrom`,
                            `dtChatrelSalaryTo`,
                            `nChatrelBusinessDonationAmt`,
                            `nChatrelTotalAmount`,
                            `nChatrelRecieptNumber`,
                            `nAuthRegionID`,
                            `sCountryID`,
                            `dtEntered`,
                            `nEnteredBy`
                        FROM `lnkgbChatrel`;";
            using (var command = new MySqlCommand(sql))
            {
                return GetRecords(command);
            }
        }

        public GBChatrel GetGBChatrelById(string Id)
        {
            string sql = @"SELECT `Id`,
                            `sGBId`,
                            `nChatrelAmount`,
                            `nChatrelMeal`,
                            `nChatrelYear`,
                            `nChatrelLateFeesPercentage`,
                            `nArrearsAmount`,
                            `dtArrearsFrom`,
                            `dtArrearsTo`,
                            `nChatrelSalaryAmt`,
                            `dtChatrelSalaryFrom`,
                            `dtChatrelSalaryTo`,
                            `nChatrelBusinessDonationAmt`,
                            `nChatrelTotalAmount`,
                            `nChatrelRecieptNumber`,
                            `nAuthRegionID`,
                            `sCountryID`,
                            `dtEntered`,
                            `nEnteredBy`
                        FROM `lnkgbChatrel`
                        WHERE Id = @Id;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("Id", Id);
                return GetRecord(command);
            }
        }

        public IEnumerable<GBChatrel> GetChatrelsByGBID (string sGBID)
        {
            string sql = @"SELECT `Id`,
                            `sGBId`,
                            `nChatrelAmount`,
                            `nChatrelMeal`,
                            `nChatrelYear`,
                            `nChatrelLateFeesPercentage`,
                            `nArrearsAmount`,
                            `dtArrearsFrom`,
                            `dtArrearsTo`,
                            `nChatrelSalaryAmt`,
                            `dtChatrelSalaryFrom`,
                            `dtChatrelSalaryTo`,
                            `nChatrelBusinessDonationAmt`,
                            `nChatrelTotalAmount`,
                            `nChatrelRecieptNumber`,
                            `nAuthRegionID`,
                            `sCountryID`,
                            `dtEntered`,
                            `nEnteredBy`
                        FROM `lnkgbChatrel`
                        WHERE sGBID = @sGBID;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBID", sGBID);
                return GetRecords(command);
            }
        }
        #endregion

        #region Populate GBChatrel Records
        public override GBChatrel PopulateRecord(MySqlDataReader reader)
        {
            GBChatrel gbChatrel = new GBChatrel();
            gbChatrel.Id = (int)reader["Id"];
            gbChatrel.sGBId = reader.IsDBNull("sGBId") ? null : (string)reader["sGBId"];
            gbChatrel.nChatrelAmount = (int)reader["nChatrelAmount"];
            gbChatrel.nChatrelMeal = reader.IsDBNull("nChatrelMeal") ? null : (int?)reader["nChatrelMeal"];
            gbChatrel.nChatrelYear = reader.IsDBNull("nChatrelYear") ? null : (int?)reader["nChatrelYear"];
            gbChatrel.nChatrelLateFeesPercentage = reader.IsDBNull("nChatrelLateFeesPercentage") ? null : (int?)reader["nChatrelLateFeesPercentage"];
            gbChatrel.nArrearsAmount = reader.IsDBNull("nArrearsAmount") ? null : (int?)reader["nArrearsAmount"];
            gbChatrel.dtArrearsFrom = reader.IsDBNull("dtArrearsFrom") ? null : (DateTime?)(reader["dtArrearsFrom"]);
            gbChatrel.dtArrearsTo = reader.IsDBNull("dtArrearsTo") ? null : (DateTime?)(reader["dtArrearsTo"]);
            gbChatrel.nChatrelSalaryAmt = reader.IsDBNull("nChatrelSalaryAmt") ? null : (int?)reader["nChatrelSalaryAmt"];
            gbChatrel.dtChatrelSalaryFrom = reader.IsDBNull("dtChatrelSalaryFrom") ? null : (DateTime?)(reader["dtChatrelSalaryFrom"]);
            gbChatrel.dtChatrelSalaryTo = reader.IsDBNull("dtChatrelSalaryTo") ? null : (DateTime?)(reader["dtChatrelSalaryTo"]);
            gbChatrel.nChatrelBusinessDonationAmt = reader.IsDBNull("nChatrelBusinessDonationAmt") ? null : (int?)reader["nChatrelBusinessDonationAmt"];
            gbChatrel.nChatrelTotalAmount = reader.IsDBNull("nChatrelTotalAmount") ? null : (int?)reader["nChatrelTotalAmount"];
            gbChatrel.nChatrelRecieptNumber = reader.IsDBNull("nChatrelRecieptNumber") ? null : (int?)reader["nChatrelRecieptNumber"];
            gbChatrel.nAuthRegionID = reader.IsDBNull("nAuthRegionID") ? null : (int?)reader["nAuthRegionID"];
            gbChatrel.sCountryID = reader.IsDBNull("sCountryID") ? null : (string)reader["sCountryID"];
            gbChatrel.dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"]);
            gbChatrel.nEnteredBy = (int)reader["nEnteredBy"];
            return gbChatrel;
        }
        #endregion
    }
}
