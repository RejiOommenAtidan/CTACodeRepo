using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Masters;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using TimeZoneConverter;

namespace CTADBL.BaseClassRepositories.Transactions
{
    public class ChatrelBulkDataRepository : ADORepository<ChatrelBulkData>
    {
        private CountryRepository _countryRepository;
        private GreenbookRepository _greenbookRepository;
        private static MySqlConnection _connection;
        #region Constructor
        public ChatrelBulkDataRepository(string connectionString) : base(connectionString)
        {
            _countryRepository = new CountryRepository(connectionString);
            _greenbookRepository = new GreenbookRepository(connectionString);
            _connection = new MySqlConnection(connectionString);
        }
        #endregion

        #region Add Call
        public int Add(ChatrelBulkData chatrelBulkData)
        {
            var builder = new SqlQueryBuilder<ChatrelBulkData>(chatrelBulkData);
            return ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Update Call
        public void Update(ChatrelBulkData chatrelBulkData)
        {
            var builder = new SqlQueryBuilder<ChatrelBulkData>(chatrelBulkData);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        
        


        #region Get Data by Batch Number
        public IEnumerable<ChatrelBulkData> GetChatrelBulkDataByBatchNumber(string sBatchNumber)
        {
            string sql = @"SELECT Id, sBatchNumber, bValidate, SNo, GBID, Name, PaidByGBId, Currency, Chatrel, Meal, Salary, ChatrelFrom, ChatrelTo, FinancialYear, ArrearsPlusLateFees, ArrearsFrom, ArrearsTo, BusinessDonation, AdditionalDonation, TotalAmount, ReceiptNo, PaymentDate, Region, Country, PaymentMode, sStatus, sRemarkText, dtEntered, nEnteredBy, dtUpdated, nUpdatedBy FROM tblchatrelbulkdata WHERE sBatchNumber = @sBatchNumber;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sBatchNumber", sBatchNumber);
                return GetRecords(command);
            }

        }
        #endregion

        #region Verify and Save Bulk Import File
        public (string, bool) InsertBulkImport(IEnumerable<ChatrelBulkData> chatrelBulkData)
        {
            string guid = Guid.NewGuid().ToString();
            
            foreach(ChatrelBulkData data in chatrelBulkData)
            {
                data.sBatchNumber = guid;
                data.dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                data.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                try
                {
                    int inserted = Add(data);
                }
                catch (Exception ex)
                {
                    return (ex.Message, false);
                }
            }
            
            using (var command = new MySqlCommand("spValidateBulkUploadedDataByBatchNumber"))
            {
                try
                {
                    command.Parameters.AddWithValue("strBatchNumber", guid);
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandTimeout = 300;
                    command.Connection = _connection;
                    _connection.Open();
                    int returnValue = command.ExecuteNonQuery();
                    _connection.Close();
                    return (guid, true);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    throw;
                }
                
            }
        }
        #endregion

        #region Bulk Data Submit after verification
        public int SubmitBulkData(string sBatchNumber)
        {
            using(var command = new MySqlCommand("spInsertBulkUploadedDataByBatchNumber"))
            {
                try
                {
                    command.Parameters.AddWithValue("strBatchNumber", sBatchNumber);
                    command.Parameters.Add("@rowsinserted", MySqlDbType.UInt32);
                    command.Parameters["@rowsinserted"].Direction = ParameterDirection.Output;
                    command.CommandType = CommandType.StoredProcedure;
                    command.Connection = _connection;
                    _connection.Open();
                    int x = (int)command.ExecuteScalar();
                    _connection.Close();
                    return x;
                }
                catch(MySqlException ex)
                {
                    throw;
                }
            }
        }
        #endregion

        #region Populate GBChatrel Records
        public override ChatrelBulkData PopulateRecord(MySqlDataReader reader)
        {
            ChatrelBulkData chatrelBulkData = new ChatrelBulkData();

            chatrelBulkData.Id = (int)reader["Id"];
            chatrelBulkData.sBatchNumber = reader.IsDBNull("sBatchNumber") ? null : (string)reader["sBatchNumber"];
            chatrelBulkData.bValidate = (bool)reader["bValidate"];
            chatrelBulkData.SNo = reader.IsDBNull("SNo") ? null : (string)reader["SNo"];
            chatrelBulkData.GBID = reader.IsDBNull("GBID") ? null : (string)reader["GBID"];
            chatrelBulkData.Name = reader.IsDBNull("Name") ? null : (string)reader["Name"];
            chatrelBulkData.PaidByGBId = reader.IsDBNull("PaidByGBId") ? null : (string)reader["PaidByGBId"];
            chatrelBulkData.Currency = reader.IsDBNull("Currency") ? null : (string)reader["Currency"];
            chatrelBulkData.Chatrel = reader.IsDBNull("Chatrel") ? null : (string)reader["Chatrel"];
            chatrelBulkData.Meal = reader.IsDBNull("Meal") ? null : (string)reader["Meal"];
            chatrelBulkData.Salary = reader.IsDBNull("Salary") ? null : (string)reader["Salary"];
            chatrelBulkData.ChatrelFrom = reader.IsDBNull("ChatrelFrom") ? null : (string)reader["ChatrelFrom"];
            chatrelBulkData.ChatrelTo = reader.IsDBNull("ChatrelTo") ? null : (string)reader["ChatrelTo"];
            chatrelBulkData.FinancialYear = reader.IsDBNull("FinancialYear") ? null : (string)reader["FinancialYear"];
            chatrelBulkData.ArrearsPlusLateFees = reader.IsDBNull("ArrearsPlusLateFees") ? null : (string)reader["ArrearsPlusLateFees"];
            chatrelBulkData.ArrearsFrom = reader.IsDBNull("ArrearsFrom") ? null : (string)reader["ArrearsFrom"];
            chatrelBulkData.ArrearsTo = reader.IsDBNull("ArrearsTo") ? null : (string)reader["ArrearsTo"];
            chatrelBulkData.BusinessDonation = reader.IsDBNull("BusinessDonation") ? null : (string)reader["BusinessDonation"];
            chatrelBulkData.AdditionalDonation = reader.IsDBNull("AdditionalDonation") ? null : (string)reader["AdditionalDonation"];
            chatrelBulkData.TotalAmount = reader.IsDBNull("TotalAmount") ? null : (string)reader["TotalAmount"];
            chatrelBulkData.ReceiptNo = reader.IsDBNull("ReceiptNo") ? null : (string)reader["ReceiptNo"];
            chatrelBulkData.PaymentDate = reader.IsDBNull("PaymentDate") ? null : (string)reader["PaymentDate"];
            chatrelBulkData.Region = reader.IsDBNull("Region") ? null : (string)reader["Region"];
            chatrelBulkData.Country = reader.IsDBNull("Country") ? null : (string)reader["Country"];
            chatrelBulkData.PaymentMode = reader.IsDBNull("PaymentMode") ? null : (string)reader["PaymentMode"];
            chatrelBulkData.sStatus = reader.IsDBNull("sStatus") ? null : (string)reader["sStatus"];
            chatrelBulkData.sRemarkText = reader.IsDBNull("sRemarkText") ? null : (string)reader["sRemarkText"];
            chatrelBulkData.dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"]);
            chatrelBulkData.nEnteredBy = (int)reader["nEnteredBy"];
            chatrelBulkData.dtUpdated = reader.IsDBNull("dtUpdated") ? null : (DateTime?)(reader["dtUpdated"]);
            chatrelBulkData.nUpdatedBy = (int)reader["nUpdatedBy"];

            return chatrelBulkData;
        }
        #endregion
    }
}
