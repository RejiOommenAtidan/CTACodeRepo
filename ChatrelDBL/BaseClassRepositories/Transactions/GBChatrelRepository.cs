using ChatrelDBL.BaseClasses.Transactions;
using ChatrelDBL.BaseClassRepositories.Masters;
using ChatrelDBL.QueryBuilder;
using ChatrelDBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace ChatrelDBL.BaseClassRepositories.Transactions
{
    public class GBChatrelRepository : ADORepository<GBChatrel>
    {
        private GreenbookRepository _greenbookRepository;
        private static MySqlConnection _connection;
        #region Constructor
        public GBChatrelRepository(string connectionString) : base(connectionString)
        {
            _greenbookRepository = new GreenbookRepository(connectionString);
            _connection = new MySqlConnection(connectionString);
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
            string sql = @"SELECT `lnkgbchatrel`.`Id`,
                                    `lnkgbchatrel`.`chatrelpaymentID`,
                                    `lnkgbchatrel`.`sGBId`,
                                    `lnkgbchatrel`.`nChatrelAmount`,
                                    `lnkgbchatrel`.`nChatrelMeal`,
                                    `lnkgbchatrel`.`nChatrelYear`,
                                    `lnkgbchatrel`.`nChatrelLateFeesPercentage`,
                                    `lnkgbchatrel`.`nChatrelLateFeesValue`,
                                    `lnkgbchatrel`.`nArrearsAmount`,
                                    `lnkgbchatrel`.`dtArrearsFrom`,
                                    `lnkgbchatrel`.`dtArrearsTo`,
                                    `lnkgbchatrel`.`nCurrentChatrelSalaryAmt`,
                                    `lnkgbchatrel`.`dtCurrentChatrelFrom`,
                                    `lnkgbchatrel`.`dtCurrentChatrelTo`,
                                    `lnkgbchatrel`.`nChatrelTotalAmount`,
                                    `lnkgbchatrel`.`sChatrelReceiptNumber`,
                                    `lnkgbchatrel`.`nAuthRegionID`,
                                    `lnkgbchatrel`.`sCountryID`,
                                    `lnkgbchatrel`.`sPaymentCurrency`,
                                    `lnkgbchatrel`.`sAuthRegionCurrency`,
                                    `lnkgbchatrel`.`nConversionRate`,
                                    `lnkgbchatrel`.`sPaidByGBId`,
                                    `lnkgbchatrel`.`dtPayment`,
                                    `lnkgbchatrel`.`dtEntered`,
                                    `lnkgbchatrel`.`nEnteredBy`,
                                    `lnkgbchatrel`.`dtUpdated`,
                                    `lnkgbchatrel`.`nUpdatedBy`
                                FROM `chatreldb`.`lnkgbchatrel`
                                LIMIT @limit;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("limit", Convert.ToInt32(ChatrelConfigRepository.GetValueByKey("SelectTotalRecordCount")));
                return GetRecords(command);
            }
        }

        public GBChatrel GetGBChatrelById(string Id)
        {
            string sql = @"SELECT `lnkgbchatrel`.`Id`,
                                    `lnkgbchatrel`.`chatrelpaymentID`,
                                    `lnkgbchatrel`.`sGBId`,
                                    `lnkgbchatrel`.`nChatrelAmount`,
                                    `lnkgbchatrel`.`nChatrelMeal`,
                                    `lnkgbchatrel`.`nChatrelYear`,
                                    `lnkgbchatrel`.`nChatrelLateFeesPercentage`,
                                    `lnkgbchatrel`.`nChatrelLateFeesValue`,
                                    `lnkgbchatrel`.`nArrearsAmount`,
                                    `lnkgbchatrel`.`dtArrearsFrom`,
                                    `lnkgbchatrel`.`dtArrearsTo`,
                                    `lnkgbchatrel`.`nCurrentChatrelSalaryAmt`,
                                    `lnkgbchatrel`.`dtCurrentChatrelFrom`,
                                    `lnkgbchatrel`.`dtCurrentChatrelTo`,
                                    `lnkgbchatrel`.`nChatrelTotalAmount`,
                                    `lnkgbchatrel`.`sChatrelReceiptNumber`,
                                    `lnkgbchatrel`.`nAuthRegionID`,
                                    `lnkgbchatrel`.`sCountryID`,
                                    `lnkgbchatrel`.`sPaymentCurrency`,
                                    `lnkgbchatrel`.`sAuthRegionCurrency`,
                                    `lnkgbchatrel`.`nConversionRate`,
                                    `lnkgbchatrel`.`sPaidByGBId`,
                                    `lnkgbchatrel`.`dtPayment`,
                                    `lnkgbchatrel`.`dtEntered`,
                                    `lnkgbchatrel`.`nEnteredBy`,
                                    `lnkgbchatrel`.`dtUpdated`,
                                    `lnkgbchatrel`.`nUpdatedBy`
                                FROM `chatreldb`.`lnkgbchatrel`
                                WHERE Id = @Id;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("Id", Id);
                return GetRecord(command);
            }
        }

        public IEnumerable<GBChatrel> GetChatrelsByGBID(string sGBID)
        {
            string sql = @"SELECT `lnkgbchatrel`.`Id`,
                                    `lnkgbchatrel`.`chatrelpaymentID`,
                                    `lnkgbchatrel`.`sGBId`,
                                    `lnkgbchatrel`.`nChatrelAmount`,
                                    `lnkgbchatrel`.`nChatrelMeal`,
                                    `lnkgbchatrel`.`nChatrelYear`,
                                    `lnkgbchatrel`.`nChatrelLateFeesPercentage`,
                                    `lnkgbchatrel`.`nChatrelLateFeesValue`,
                                    `lnkgbchatrel`.`nArrearsAmount`,
                                    `lnkgbchatrel`.`dtArrearsFrom`,
                                    `lnkgbchatrel`.`dtArrearsTo`,
                                    `lnkgbchatrel`.`nCurrentChatrelSalaryAmt`,
                                    `lnkgbchatrel`.`dtCurrentChatrelFrom`,
                                    `lnkgbchatrel`.`dtCurrentChatrelTo`,
                                    `lnkgbchatrel`.`nChatrelTotalAmount`,
                                    `lnkgbchatrel`.`sChatrelReceiptNumber`,
                                    `lnkgbchatrel`.`nAuthRegionID`,
                                    `lnkgbchatrel`.`sCountryID`,
                                    `lnkgbchatrel`.`sPaymentCurrency`,
                                    `lnkgbchatrel`.`sAuthRegionCurrency`,
                                    `lnkgbchatrel`.`nConversionRate`,
                                    `lnkgbchatrel`.`sPaidByGBId`,
                                    `lnkgbchatrel`.`dtPayment`,
                                    `lnkgbchatrel`.`dtEntered`,
                                    `lnkgbchatrel`.`nEnteredBy`,
                                    `lnkgbchatrel`.`dtUpdated`,
                                    `lnkgbchatrel`.`nUpdatedBy`
                                FROM `chatreldb`.`lnkgbchatrel`
                                WHERE sGBID = @sGBID;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBID", sGBID);
                return GetRecords(command);
            }
        }

        public GBChatrel GetChatrelByGBIDForYear(string sGBID, int year)
        {
            string sql = @"SELECT `lnkgbchatrel`.`Id`,
                                    `lnkgbchatrel`.`chatrelpaymentID`,
                                    `lnkgbchatrel`.`sGBId`,
                                    `lnkgbchatrel`.`nChatrelAmount`,
                                    `lnkgbchatrel`.`nChatrelMeal`,
                                    `lnkgbchatrel`.`nChatrelYear`,
                                    `lnkgbchatrel`.`nChatrelLateFeesPercentage`,
                                    `lnkgbchatrel`.`nChatrelLateFeesValue`,
                                    `lnkgbchatrel`.`nArrearsAmount`,
                                    `lnkgbchatrel`.`dtArrearsFrom`,
                                    `lnkgbchatrel`.`dtArrearsTo`,
                                    `lnkgbchatrel`.`nCurrentChatrelSalaryAmt`,
                                    `lnkgbchatrel`.`dtCurrentChatrelFrom`,
                                    `lnkgbchatrel`.`dtCurrentChatrelTo`,
                                    `lnkgbchatrel`.`nChatrelTotalAmount`,
                                    `lnkgbchatrel`.`sChatrelReceiptNumber`,
                                    `lnkgbchatrel`.`nAuthRegionID`,
                                    `lnkgbchatrel`.`sCountryID`,
                                    `lnkgbchatrel`.`sPaymentCurrency`,
                                    `lnkgbchatrel`.`sAuthRegionCurrency`,
                                    `lnkgbchatrel`.`nConversionRate`,
                                    `lnkgbchatrel`.`sPaidByGBId`,
                                    `lnkgbchatrel`.`dtPayment`,
                                    `lnkgbchatrel`.`dtEntered`,
                                    `lnkgbchatrel`.`nEnteredBy`,
                                    `lnkgbchatrel`.`dtUpdated`,
                                    `lnkgbchatrel`.`nUpdatedBy`
                                FROM `chatreldb`.`lnkgbchatrel`
                                WHERE sGBID = @sGBID
                                AND nChatrelYear = @year;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBID", sGBID);
                command.Parameters.AddWithValue("year", year);
                return GetRecord(command);
            }
        }

        public int GetLatestAuthRegionID(string sGBID)
        {
            string sql = @"SELECT 
                                nAuthRegionID 
                           FROM 
                                chatreldb.lnkgbchatrel 
                           WHERE 
                                sGBID = @sGBID
                           ORDER BY 
                                nChatrelYear DESC, 
                                dtPayment DESC 
                           LIMIT 1;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBID", sGBID);
                _connection.Open();
                command.Connection = _connection;

                var result = command.ExecuteScalar();
                int authRegionID = 0;
                if (result != null)
                {
                    authRegionID = Convert.ToInt32(result);
                }
                else
                {
                    authRegionID = _greenbookRepository.GetGreenbookByGBID(sGBID).nAuthRegionID;
                }
                _connection.Close();
                return authRegionID;
            }

        }

        #endregion

        #region Populate GBChatrel Records
        public override GBChatrel PopulateRecord(MySqlDataReader reader)
        {
            GBChatrel gbChatrel = new GBChatrel();
            gbChatrel.Id = (int)reader["Id"];
            gbChatrel.chatrelpaymentID = (int)reader["Id"];
            gbChatrel.sGBId = reader.IsDBNull("sGBId") ? null : (string)reader["sGBId"];
            gbChatrel.nChatrelAmount = (decimal)reader["nChatrelAmount"];
            gbChatrel.nChatrelMeal = reader.IsDBNull("nChatrelMeal") ? null : (decimal?)reader["nChatrelMeal"];
            gbChatrel.nChatrelYear = reader.IsDBNull("nChatrelYear") ? null : (int?)reader["nChatrelYear"];
            gbChatrel.nChatrelLateFeesPercentage = reader.IsDBNull("nChatrelLateFeesPercentage") ? null : (int?)reader["nChatrelLateFeesPercentage"];
            gbChatrel.nChatrelLateFeesValue = reader.IsDBNull("nChatrelLateFeesValue") ? null : (decimal?)reader["nChatrelLateFeesValue"];
            gbChatrel.nArrearsAmount = reader.IsDBNull("nArrearsAmount") ? null : (decimal?)reader["nArrearsAmount"];
            gbChatrel.dtArrearsFrom = reader.IsDBNull("dtArrearsFrom") ? null : (DateTime?)(reader["dtArrearsFrom"]);
            gbChatrel.dtArrearsTo = reader.IsDBNull("dtArrearsTo") ? null : (DateTime?)(reader["dtArrearsTo"]);
            gbChatrel.nCurrentChatrelSalaryAmt = reader.IsDBNull("nCurrentChatrelSalaryAmt") ? null : (decimal?)reader["nCurrentChatrelSalaryAmt"];
            gbChatrel.dtCurrentChatrelFrom = reader.IsDBNull("dtCurrentChatrelFrom") ? null : (DateTime?)(reader["dtCurrentChatrelFrom"]);
            gbChatrel.dtCurrentChatrelTo = reader.IsDBNull("dtCurrentChatrelTo") ? null : (DateTime?)(reader["dtCurrentChatrelTo"]);

            gbChatrel.nChatrelTotalAmount = reader.IsDBNull("nChatrelTotalAmount") ? null : (decimal?)reader["nChatrelTotalAmount"];
            gbChatrel.sChatrelReceiptNumber = reader.IsDBNull("sChatrelReceiptNumber") ? null : (string)reader["sChatrelReceiptNumber"];
            gbChatrel.nAuthRegionID = reader.IsDBNull("nAuthRegionID") ? null : (int?)reader["nAuthRegionID"];
            gbChatrel.sCountryID = reader.IsDBNull("sCountryID") ? null : (string)reader["sCountryID"];
            gbChatrel.sPaymentCurrency = reader.IsDBNull("sPaymentCurrency") ? null : (string)reader["sPaymentCurrency"];
            gbChatrel.sAuthRegionCurrency = reader.IsDBNull("sAuthRegionCurrency") ? null : (string)reader["sAuthRegionCurrency"];
            gbChatrel.nConversionRate = reader.IsDBNull("nConversionRate") ? null : (decimal?)reader["nConversionRate"];
            gbChatrel.sPaidByGBId = reader.IsDBNull("sPaidByGBId") ? null : (string)reader["sPaidByGBId"];
            gbChatrel.dtPayment = (DateTime)(reader["dtPayment"]);
            gbChatrel.dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"]);
            gbChatrel.nEnteredBy = (int)reader["nEnteredBy"];
            gbChatrel.dtUpdated = reader.IsDBNull("dtUpdated") ? null : (DateTime?)(reader["dtUpdated"]);
            gbChatrel.nUpdatedBy = (int)reader["nUpdatedBy"];
            return gbChatrel;
        }
        #endregion
    }
}
