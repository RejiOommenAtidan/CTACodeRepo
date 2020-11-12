using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Masters;
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
            string sql = @"SELECT   `lnkgbchatrel`.`Id`,
                                    `lnkgbchatrel`.`sGBId`,
                                    `lnkgbchatrel`.`nChatrelAmount`,
                                    `lnkgbchatrel`.`nChatrelMeal`,
                                    `lnkgbchatrel`.`nChatrelYear`,
                                    `lnkgbchatrel`.`nChatrelLateFeesPercentage`,
                                    `lnkgbchatrel`.`nArrearsAmount`,
                                    `lnkgbchatrel`.`dtArrearsFrom`,
                                    `lnkgbchatrel`.`dtArrearsTo`,
                                    `lnkgbchatrel`.`nCurrentChatrelSalaryAmt`,
                                    `lnkgbchatrel`.`dtCurrentChatrelFrom`,
                                    `lnkgbchatrel`.`dtCurrentChatrelTo`,
                                    `lnkgbchatrel`.`nChatrelAdditionalDonationAmt`,
                                    `lnkgbchatrel`.`nChatrelBusinessDonationAmt`,
                                    `lnkgbchatrel`.`nChatrelTotalAmount`,
                                    `lnkgbchatrel`.`sChatrelReceiptNumber`,
                                    `lnkgbchatrel`.`nAuthRegionID`,
                                    `lnkgbchatrel`.`sCountryID`,
                                    `lnkgbchatrel`.`sPaymentCurrency`,
                                    `lnkgbchatrel`.`sPaidByGBId`,
                                    `lnkgbchatrel`.`dtPayment`,
                                    `lnkgbchatrel`.`dtEntered`,
                                    `lnkgbchatrel`.`nEnteredBy`
                                FROM `ctadb`.`lnkgbchatrel`
                                LIMIT @limit;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("limit", Convert.ToInt32(CTAConfigRepository.GetValueByKey("SelectTotalRecordCount")));
                return GetRecords(command);
            }
        }

        public GBChatrel GetGBChatrelById(string Id)
        {
            string sql = @"SELECT   `lnkgbchatrel`.`Id`,
                                    `lnkgbchatrel`.`sGBId`,
                                    `lnkgbchatrel`.`nChatrelAmount`,
                                    `lnkgbchatrel`.`nChatrelMeal`,
                                    `lnkgbchatrel`.`nChatrelYear`,
                                    `lnkgbchatrel`.`nChatrelLateFeesPercentage`,
                                    `lnkgbchatrel`.`nArrearsAmount`,
                                    `lnkgbchatrel`.`dtArrearsFrom`,
                                    `lnkgbchatrel`.`dtArrearsTo`,
                                    `lnkgbchatrel`.`nCurrentChatrelSalaryAmt`,
                                    `lnkgbchatrel`.`dtCurrentChatrelFrom`,
                                    `lnkgbchatrel`.`dtCurrentChatrelTo`,
                                    `lnkgbchatrel`.`nChatrelAdditionalDonationAmt`,
                                    `lnkgbchatrel`.`nChatrelBusinessDonationAmt`,
                                    `lnkgbchatrel`.`nChatrelTotalAmount`,
                                    `lnkgbchatrel`.`sChatrelReceiptNumber`,
                                    `lnkgbchatrel`.`nAuthRegionID`,
                                    `lnkgbchatrel`.`sCountryID`,
                                    `lnkgbchatrel`.`sPaymentCurrency`,
                                    `lnkgbchatrel`.`sPaidByGBId`,
                                    `lnkgbchatrel`.`dtPayment`,
                                    `lnkgbchatrel`.`dtEntered`,
                                    `lnkgbchatrel`.`nEnteredBy`
                                FROM `ctadb`.`lnkgbchatrel`
                                WHERE Id = @Id;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("Id", Id);
                return GetRecord(command);
            }
        }

        public IEnumerable<GBChatrel> GetChatrelsByGBID (string sGBID)
        {
            string sql = @"SELECT   `lnkgbchatrel`.`Id`,
                                    `lnkgbchatrel`.`sGBId`,
                                    `lnkgbchatrel`.`nChatrelAmount`,
                                    `lnkgbchatrel`.`nChatrelMeal`,
                                    `lnkgbchatrel`.`nChatrelYear`,
                                    `lnkgbchatrel`.`nChatrelLateFeesPercentage`,
                                    `lnkgbchatrel`.`nArrearsAmount`,
                                    `lnkgbchatrel`.`dtArrearsFrom`,
                                    `lnkgbchatrel`.`dtArrearsTo`,
                                    `lnkgbchatrel`.`nCurrentChatrelSalaryAmt`,
                                    `lnkgbchatrel`.`dtCurrentChatrelFrom`,
                                    `lnkgbchatrel`.`dtCurrentChatrelTo`,
                                    `lnkgbchatrel`.`nChatrelAdditionalDonationAmt`,
                                    `lnkgbchatrel`.`nChatrelBusinessDonationAmt`,
                                    `lnkgbchatrel`.`nChatrelTotalAmount`,
                                    `lnkgbchatrel`.`sChatrelReceiptNumber`,
                                    `lnkgbchatrel`.`nAuthRegionID`,
                                    `lnkgbchatrel`.`sCountryID`,
                                    `lnkgbchatrel`.`sPaymentCurrency`,
                                    `lnkgbchatrel`.`sPaidByGBId`,
                                    `lnkgbchatrel`.`dtPayment`,
                                    `lnkgbchatrel`.`dtEntered`,
                                    `lnkgbchatrel`.`nEnteredBy`
                                FROM `ctadb`.`lnkgbchatrel`
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
            gbChatrel.nChatrelAmount = (decimal)reader["nChatrelAmount"];
            gbChatrel.nChatrelMeal = reader.IsDBNull("nChatrelMeal") ? null : (decimal?)reader["nChatrelMeal"];
            gbChatrel.nChatrelYear = reader.IsDBNull("nChatrelYear") ? null : (int?)reader["nChatrelYear"];
            gbChatrel.nChatrelLateFeesPercentage = reader.IsDBNull("nChatrelLateFeesPercentage") ? null : (int?)reader["nChatrelLateFeesPercentage"];
            gbChatrel.nArrearsAmount = reader.IsDBNull("nArrearsAmount") ? null : (decimal?)reader["nArrearsAmount"];
            gbChatrel.dtArrearsFrom = reader.IsDBNull("dtArrearsFrom") ? null : (DateTime?)(reader["dtArrearsFrom"]);
            gbChatrel.dtArrearsTo = reader.IsDBNull("dtArrearsTo") ? null : (DateTime?)(reader["dtArrearsTo"]);
            gbChatrel.nCurrentChatrelSalaryAmt = reader.IsDBNull("nCurrentChatrelSalaryAmt") ? null : (decimal?)reader["nCurrentChatrelSalaryAmt"];
            gbChatrel.dtCurrentChatrelFrom = reader.IsDBNull("dtCurrentChatrelFrom") ? null : (DateTime?)(reader["dtCurrentChatrelFrom"]);
            gbChatrel.dtCurrentChatrelTo = reader.IsDBNull("dtCurrentChatrelTo") ? null : (DateTime?)(reader["dtCurrentChatrelTo"]);
            gbChatrel.nChatrelAdditionalDonationAmt = reader.IsDBNull("nChatrelAdditionalDonationAmt") ? null : (decimal?)reader["nChatrelAdditionalDonationAmt"];
            gbChatrel.nChatrelBusinessDonationAmt = reader.IsDBNull("nChatrelBusinessDonationAmt") ? null : (decimal?)reader["nChatrelBusinessDonationAmt"];
            gbChatrel.nChatrelTotalAmount = reader.IsDBNull("nChatrelTotalAmount") ? null : (decimal?)reader["nChatrelTotalAmount"];
            gbChatrel.sChatrelReceiptNumber = reader.IsDBNull("sChatrelReceiptNumber") ? null : (string)reader["sChatrelReceiptNumber"];
            gbChatrel.nAuthRegionID = reader.IsDBNull("nAuthRegionID") ? null : (int?)reader["nAuthRegionID"];
            gbChatrel.sCountryID = reader.IsDBNull("sCountryID") ? null : (string)reader["sCountryID"];
            gbChatrel.dtPayment = (DateTime)(reader["dtPayment"]);
            gbChatrel.dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"]);
            gbChatrel.nEnteredBy = (int)reader["nEnteredBy"];
            return gbChatrel;
        }
        #endregion
    }
}
