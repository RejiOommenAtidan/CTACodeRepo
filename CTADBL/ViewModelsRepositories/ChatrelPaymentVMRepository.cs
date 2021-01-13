using CTADBL.BaseClasses.Masters;
using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Masters;
using CTADBL.BaseClassRepositories.Transactions;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using CTADBL.ViewModels;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Asn1;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;
using static CTADBL.BaseClasses.Transactions.ChatrelPayment;

namespace CTADBL.ViewModelsRepositories
{
    public class ChatrelPaymentVMRepository : ADORepository<ChatrelPaymentVM>
    {

        private static MySqlConnection _connection;
        private int _FYStartMonth = 4;
        private int _FYStartDate = 1;
        private int _FYEndMonth = 3;
        private int _FYEndDate = 31;
        private GreenbookRepository _greenBookRepository;
        private const string Success = "Success";
        private const string Failed = "Failed";
        private const string Online = "Online";
        private const string Offline_WebAdmin = "Offline_WebAdmin";
        private const string Offline_Bulk = "Offline_Bulk";
        //private enum PaymentMode { Online = 1, Offline_WebAdmin, Offline_Bulk };
        //private enum PaymentStatus { Success =1, Failed}
        #region Constructor
        public ChatrelPaymentVMRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
            _greenBookRepository = new GreenbookRepository(connectionString);

        }
        #endregion

        public string Add(ChatrelPaymentVM chatrelPaymentVM)
        {

            
            ChatrelPayment chatrelPayment = chatrelPaymentVM.chatrelPayment;
            IEnumerable<GBChatrel> chatrels = chatrelPaymentVM.gbChatrels;
            GBChatrelDonation gbChatrelDonation = chatrelPaymentVM.gbChatrelDonation;
            if(gbChatrelDonation == null && chatrels == null)
            {
                return ("No donation amount.");
            }
            else 
            {
                Greenbook greenbook = _greenBookRepository.GetGreenbookByGBID(chatrelPayment.sGBId);
                if (chatrelPayment.sPaymentMode == ChatrelPayment.Online)
                {
                    chatrelPayment.sChatrelReceiptNumber = GenerateReceiptNo();
                }


                chatrelPayment.dtEntered = DateTime.Now;
                chatrelPayment.dtPayment = DateTime.Now;
                chatrelPayment.dtUpdated = DateTime.Now;
                chatrelPayment.sPaymentStatus = ChatrelPayment.Success;
                greenbook.dtUpdated = DateTime.Now;
                greenbook.sPaidUntil = chatrelPayment.nChatrelYear.ToString();

                if(chatrels != null)
                {
                    foreach (var chatrel in chatrels)
                    {
                        chatrel.sChatrelReceiptNumber = chatrelPayment.sChatrelReceiptNumber;
                        //chatrel.sGBId = chatrelPayment.sGBId;
                        chatrel.sPaidByGBId = chatrelPayment.sPaidByGBId;
                        //chatrel.nChatrelLateFeesPercentage = chatrelPayment.nChatrelLateFeesPercentage;
                        chatrel.dtPayment = chatrelPayment.dtPayment;
                        chatrel.dtEntered = DateTime.Now;
                        chatrel.dtUpdated = DateTime.Now;
                    }
                }
                

                var builder = new SqlQueryBuilder<ChatrelPayment>(chatrelPayment);
                MySqlCommand command = builder.GetInsertCommand();

                _connection.Open();
                MySqlTransaction transaction = _connection.BeginTransaction();
                command.Transaction = transaction;
                command.Connection = _connection;

                try
                {
                    command.ExecuteNonQuery();
                    long insertId = command.LastInsertedId;
                    if(chatrels != null)
                    {
                        foreach (var chatrel in chatrels)
                        {
                            chatrel.chatrelpaymentID = Convert.ToInt32(insertId);
                            var cbuilder = new SqlQueryBuilder<GBChatrel>(chatrel);
                            command.CommandText = cbuilder.GetInsertCommand().CommandText;
                            int rows = command.ExecuteNonQuery();
                        }
                    }
                    if(gbChatrelDonation != null)
                    {
                        gbChatrelDonation.chatrelpaymentID = Convert.ToInt32(insertId);
                        gbChatrelDonation.sChatrelReceiptNumber = chatrelPayment.sChatrelReceiptNumber;
                        gbChatrelDonation.dtPayment = chatrelPayment.dtPayment;
                        gbChatrelDonation.dtEntered = chatrelPayment.dtEntered;
                        gbChatrelDonation.dtUpdated = chatrelPayment.dtUpdated;
                        var dbuilder = new SqlQueryBuilder<GBChatrelDonation>(gbChatrelDonation);
                        command.CommandText = dbuilder.GetInsertCommand().CommandText;
                        int rows = command.ExecuteNonQuery();
                    }
                    var gbuilder = new SqlQueryBuilder<Greenbook>(greenbook);
                    command.CommandText = gbuilder.GetUpdateCommand().CommandText;
                    command.ExecuteNonQuery();
                    transaction.Commit();
                    //To do: Update GreenBook "sPaidUntil" column to reflect current paid upto status.
                    return ("Records inserted successfully.");
                }
                catch (Exception ex)
                {
                    try
                    {
                        transaction.Rollback();
                        //To do: Audit log for rollback transaction.
                        return ("Transaction rolled back successfully.");
                    }
                    catch (MySqlException mysqlException)
                    {
                        if (transaction.Connection != null)
                        {
                            return ("An exception of type " + mysqlException.GetType() +
                            " was encountered while attempting to roll back the transaction.");
                        }
                        return ("An exception of type " + mysqlException.GetType() +
                            " was encountered while attempting to roll back the transaction.");
                    }
                }
            }
        }


        private string GenerateReceiptNo(string sPaymentMode = "Online")
        {
            string sql = "SELECT IFNULL(MAX(CAST(SUBSTRING(sChatrelReceiptNumber, 4) AS UNSIGNED)), 1) AS value FROM tblchatrelpayment WHERE sPaymentMode = @sPaymentMode;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sPaymentMode", sPaymentMode);
                command.Connection = _connection;
                command.CommandType = CommandType.Text;

                int maxNumber = Convert.ToInt32(command.ExecuteScalar());
                return String.Format("CTA{0}", maxNumber);
            }
                
        }



        #region Search Users in Chatrel
        public IEnumerable<Object> SearchUsers(string sGBID, string sFirstName, string sFathersName, string sMothersName)
        {
            string parameters = "";
            if (sFirstName != null && !String.IsNullOrEmpty(sFirstName.Trim()))
            {
                parameters += String.Format(@"t2.sFirstName = '{0}' AND ", sFirstName);
            }
            if (sFathersName != null && !String.IsNullOrEmpty(sFathersName.Trim()))
            {
                parameters += String.Format(@"t2.sFathersName = '{0}' AND ", sFathersName);
            }
            if (sMothersName != null && !String.IsNullOrEmpty(sMothersName.Trim()))
            {
                parameters += String.Format(@"t2.sMothersName = '{0}' AND ", sMothersName);
            }
            string sql = String.Format(@"set session sql_mode = '';SELECT t.sGBId, t2.sFirstName, t2.sLastName, CAST((date_format(curdate(), '%Y%m%d') -  date_format(t2.dtdob, '%Y%m%d'))/10000 AS UNSIGNED) AS nAge, l.sAuthRegion, l2.sCountry, if(t2.dtDeceased IS NULL, 'Alive', 'Deceased' ) AS sStatus, max(t.dtPayment) as dtPayment FROM tblchatrelpayment t INNER JOIN tblgreenbook t2 ON t.sGBId = t2.sGBID LEFT JOIN lstauthregion l ON t2.nAuthRegionID = l.ID LEFT JOIN lstcountry l2 ON t2.sCountryID = l2.sCountryID WHERE t.sGBId LIKE @sGBID AND {0} 1 = 1 GROUP BY t.sGBId;", parameters);

            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBID", sGBID + '%');
                command.CommandType = CommandType.Text;
                command.Connection = _connection;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                var result = tables[0].AsEnumerable().Select(row => new
                {
                    sGBID = row.Field<string>("sGBID"),
                    sFirstName = row.Field<string>("sFirstName"),
                    sLastName = row.Field<string>("sLastName"),
                    nAge = Convert.ToInt32(row.Field<System.UInt64>("nAge")),
                    sAuthRegion = row.Field<string>("sAuthRegion"),
                    sCountry = row.Field<string>("sCountry"),
                    sStatus = row.Field<string>("sStatus"),
                    dtPayment = row.Field<DateTime?>("dtPayment"),
                });

                return result;
            }
        }
        #endregion

        #region User Profile from Search Users
        public Object GetUserProfileFromGBID(string sGBID)
        {
            string sql = @"SELECT t.sGBID, t.sFirstName, t.sLastName, t.sGender, t.dtDOB, t.sFamilyName, l.sCountry, t.sCountryID, t.sEmail, t.sPhone FROM  tblgreenbook t INNER JOIN lstcountry l ON l.sCountryID = t.sCountryID WHERE t.sGBID = @sGBID;
                           SELECT t.sGBId, t.sChatrelReceiptNumber, t.dtPayment, t.nChatrelYear, t.sPaymentCurrency, t.nChatrelTotalAmount, t.sPaymentMode, t.sPaymentStatus, t.sPaidByGBId  FROM tblchatrelpayment t WHERE t.sGBId = @sGBID;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBID", sGBID);
                command.CommandType = CommandType.Text;
                command.Connection = _connection;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                var profile = tables[0].AsEnumerable().Select(row => new
                {
                    sGBID = row.Field<string>("sGBID"),
                    sFirstName = row.Field<string>("sFirstName"),
                    sLastName = row.Field<string>("sLastName"),
                    sCountryID = row.Field<string>("sCountryID"),
                    sGender = row.Field<string>("sGender"),
                    dtDOB = row.Field<DateTime?>("dtDOB"),
                    sFamilyName = row.Field<string>("sFamilyName"),
                    sCountry = row.Field<string>("sCountry"),
                    sEmail = row.Field<string>("sEmail"),
                    sPhone = row.Field<string>("sPhone"),
                }).FirstOrDefault();
                var payment = tables[1].AsEnumerable().Select(row => new
                {
                    sGBID = row.Field<string>("sGBID"),
                    sChatrelReceiptNumber = row.Field<string>("sChatrelReceiptNumber"),
                    dtPayment = row.Field<DateTime?>("dtPayment"),
                    nChatrelYear = row.Field<int>("nChatrelYear"),
                    sPaymentCurrency = row.Field<string>("sPaymentCurrency"),
                    nChatrelTotalAmount = row.Field<decimal>("nChatrelTotalAmount"),
                    sPaymentMode = row.Field<string>("sPaymentMode"),
                    sPaymentStatus = row.Field<string>("sPaymentStatus"),
                    sPaidByGBId = row.Field<string>("sPaidByGBId"),
                }).ToList();
                var result = new { profile, payment };
                return result;

            }
        }
        #endregion


        #region Get Chatrel List
        public IEnumerable<Object> GetAllChatrelPayments()
        {
            //string sql = @"SELECT l.sGBID, t3.sChatrelReceiptNumber, t3.dtPayment, t2.sFirstName,  l.sPaidByGBId, l.sPaymentCurrency, l.nChatrelAmount*l.nConversionRate AS nChatrelAmount, l.nChatrelMeal*l.nConversionRate AS nChatrelMeal, l.nCurrentChatrelSalaryAmt*l.nConversionRate AS nCurrentChatrelSalaryAmt, l.dtCurrentChatrelFrom, l.dtCurrentChatrelTo, concat(date_format(dtCurrentChatrelFrom, '%Y'), '-', date_format(dtCurrentChatrelTo, '%y')) AS sFinancialYear, l2.nArrears, l2.dtArrearsFrom, l2.dtArrearsTo, l4.nChatrelBusinessDonationAmt, l4.nChatrelAdditionalDonationAmt, t3.nChatrelTotalAmount, l5.sAuthRegion, t3.sPaymentMode FROM lnkgbchatrel l INNER JOIN (SELECT l3.chatrelpaymentID, sum(l3.nArrearsAmount*l3.nConversionRate) AS nArrears, min(l3.dtArrearsFrom) AS dtArrearsFrom, max(l3.dtArrearsTo) AS dtArrearsTo FROM lnkgbchatrel l3 WHERE l3.nArrearsAmount IS NOT NULL GROUP BY l3.sChatrelReceiptNumber ) AS l2 ON l.chatrelpaymentID = l2.chatrelpaymentID INNER JOIN tblchatrelpayment t3 ON t3.Id = l.chatrelpaymentID LEFT JOIN tblgreenbook t2 ON t2.sGBID = l.sGBId LEFT JOIN lnkgbchatreldonation l4 ON t3.Id = l4.chatrelpaymentID LEFT JOIN lstauthregion l5 ON l5.ID = l.nAuthRegionID WHERE l.nArrearsAmount IS NULL LIMIT @records;";

            string sql = @"SET session sql_mode = ''; SELECT t.sGBID, t.sChatrelReceiptNumber, t.dtPayment, t2.sFirstName,  t.sPaidByGBId, t.sPaymentCurrency, l.nChatrelAmount*l.nConversionRate AS nChatrelAmount, l.nChatrelMeal*l.nConversionRate AS nChatrelMeal, l.nCurrentChatrelSalaryAmt*l.nConversionRate AS nCurrentChatrelSalaryAmt, l.dtCurrentChatrelFrom, l.dtCurrentChatrelTo, concat(date_format(dtCurrentChatrelFrom, '%Y'), '-', date_format(dtCurrentChatrelTo, '%y')) AS sFinancialYear, l2.nArrears, l2.dtArrearsFrom, l2.dtArrearsTo, l4.nChatrelBusinessDonationAmt, l4.nChatrelAdditionalDonationAmt, t.nChatrelTotalAmount, l5.sAuthRegion, t.sPaymentMode FROM tblchatrelpayment t LEFT JOIN lnkgbchatrel l ON t.id = l.chatrelpaymentID LEFT JOIN (SELECT l3.chatrelpaymentID, sum(l3.nArrearsAmount*l3.nConversionRate) AS nArrears, min(l3.dtArrearsFrom) AS dtArrearsFrom, max(l3.dtArrearsTo) AS dtArrearsTo FROM lnkgbchatrel l3 WHERE l3.nArrearsAmount IS NOT NULL GROUP BY l3.sChatrelReceiptNumber ) AS l2 ON l2.chatrelpaymentID = t.Id LEFT JOIN lnkgbchatreldonation l4 ON t.Id = l4.chatrelpaymentID LEFT JOIN tblgreenbook t2 ON t2.sGBID = t.sGBId  LEFT JOIN lstauthregion l5 ON l5.ID = l.nAuthRegionID OR l5.ID = l4.nAuthRegionID WHERE l.nArrearsAmount IS NULL AND t.sChatrelReceiptNumber IS NOT NULL LIMIT @records;";


            int records = Convert.ToInt32(CTAConfigRepository.GetValueByKey("SelectTotalRecordCount"));
            
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("records", records);
                command.CommandType = CommandType.Text;
                command.Connection = _connection;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                var result = tables[0].AsEnumerable().Select(row => new
                {
                    sGBID = row.Field<string>("sGBID"),
                    sChatrelReceiptNumber = row.Field<string>("sChatrelReceiptNumber"),
                    dtPayment = row.Field<DateTime?>("dtPayment"),
                    sFirstName = row.Field<string>("sFirstName"),
                    sPaidByGBId = row.Field<string>("sPaidByGBId"),
                    sPaymentCurrency = row.Field<string>("sPaymentCurrency"),
                    nChatrelAmount = row.Field<decimal?>("nChatrelAmount"),
                    nChatrelMeal = row.Field<decimal?>("nChatrelMeal"),
                    nCurrentChatrelSalaryAmt = row.Field<decimal?>("nCurrentChatrelSalaryAmt"),
                    dtCurrentChatrelFrom = row.Field<DateTime?>("dtCurrentChatrelFrom"),
                    dtCurrentChatrelTo = row.Field<DateTime?>("dtCurrentChatrelTo"),
                    sFinancialYear = row.Field<string>("sFinancialYear"),
                    nArrears = row.Field<decimal?>("nArrears"),
                    dtArrearsFrom = row.Field<DateTime?>("dtArrearsFrom"),
                    dtArrearsTo = row.Field<DateTime?>("dtArrearsTo"),
                    nChatrelBusinessDonationAmt = row.Field<decimal?>("nChatrelBusinessDonationAmt"),
                    nChatrelAdditionalDonationAmt = row.Field<decimal?>("nChatrelAdditionalDonationAmt"),
                    nChatrelTotalAmount = row.Field<decimal>("nChatrelTotalAmount"),
                    sAuthRegion = row.Field<string>("sAuthRegion"),
                    sPaymentMode = row.Field<string>("sPaymentMode"),
                });

                return result;
            }

        }
        #endregion

        #region Get Payment received breakup

        public IEnumerable<Object> GetPaymentBreakup(string sChatrelReceiptNumber)
        {
            string sql = @"SELECT t.dtPayment, t.sGBId, t.nChatrelYear, t.nChatrelTotalAmount AS nReceiptTotal, t.sChatrelReceiptNumber, t.sPaymentMode, t.sPaymentCurrency, t.sPaidByGBId, concat(date_format(l.dtCurrentChatrelFrom, '%Y'), '-', date_format(l.dtCurrentChatrelTo, '%y')) AS sFinancialYear, l.nChatrelAmount*l.nConversionRate AS nChatrelAmount, l.nChatrelMeal*l.nConversionRate AS nChatrelMeal, l.nCurrentChatrelSalaryAmt*l.nConversionRate AS nCurrentChatrelSalaryAmt, l.nChatrelLateFeesValue*l.nConversionRate AS nChatrelLateFeesValue, l.nArrearsAmount*l.nConversionRate AS TotalArrears, l.nChatrelTotalAmount, l.dtArrearsFrom, l.dtArrearsTo, l3.sAuthRegion, NULL AS nChatrelBusinessDonationAmt, NULL AS nChatrelAdditionalDonationAmt FROM tblchatrelpayment t INNER JOIN lnkgbchatrel l ON t.Id = l.chatrelpaymentID LEFT JOIN lstauthregion l3 ON l3.ID = l.nAuthRegionID WHERE t.sChatrelReceiptNumber = @sChatrelReceiptNumber UNION SELECT t2.dtPayment, t2.sGBId, t2.nChatrelYear, t2.nChatrelTotalAmount, t2.sChatrelReceiptNumber, t2.sPaymentMode, t2.sPaymentCurrency, t2.sPaidByGBId, concat((t2.nChatrelYear), '-', (substr(t2.nChatrelYear, 3)+1)) AS sFinancialYear, NULL, NULL, NULL, NULL, NULL,(l2.nChatrelBusinessDonationAmt + l2.nChatrelAdditionalDonationAmt), NULL, NULL, l4.sAuthRegion, l2.nChatrelBusinessDonationAmt, l2.nChatrelAdditionalDonationAmt FROM tblchatrelpayment t2 INNER JOIN lnkgbchatreldonation l2 ON t2.Id = l2.chatrelpaymentID LEFT JOIN lstauthregion l4 ON l4.ID = l2.nAuthRegionID WHERE t2.sChatrelReceiptNumber = @sChatrelReceiptNumber;";

            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sChatrelReceiptNumber", sChatrelReceiptNumber);
                command.CommandType = CommandType.Text;
                command.Connection = _connection;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                var result = tables[0].AsEnumerable().Select(row => new
                {
                    dtPayment = row.Field<DateTime?>("dtPayment"),
                    sGBID = row.Field<string>("sGBID"),
                    nChatrelYear = row.Field<int?>("nChatrelYear"),
                    nReceiptTotal = row.Field<decimal>("nReceiptTotal"),
                    sChatrelReceiptNumber = row.Field<string>("sChatrelReceiptNumber"),
                    sPaymentMode = row.Field<string>("sPaymentMode"),
                    sPaymentCurrency = row.Field<string>("sPaymentCurrency"),
                    sPaidByGBId = row.Field<string>("sPaidByGBId"),
                    sFinancialYear = row.Field<string>("sFinancialYear"),
                    nChatrelAmount = row.Field<decimal?>("nChatrelAmount"),
                    nChatrelMeal = row.Field<decimal?>("nChatrelMeal"),
                    nCurrentChatrelSalaryAmt = row.Field<decimal?>("nCurrentChatrelSalaryAmt"),
                    nChatrelLateFeesValue = row.Field<decimal?>("nChatrelLateFeesValue"),
                    nArrears = row.Field<decimal?>("TotalArrears"),
                    nChatrelTotalAmount = row.Field<decimal?>("nChatrelTotalAmount"),
                    dtArrearsFrom = row.Field<DateTime?>("dtArrearsFrom"),
                    dtArrearsTo = row.Field<DateTime?>("dtArrearsTo"),
                    sAuthRegion = row.Field<string>("sAuthRegion"),
                    nChatrelBusinessDonationAmt = row.Field<decimal?>("nChatrelBusinessDonationAmt"),
                    nChatrelAdditionalDonationAmt = row.Field<decimal?>("nChatrelAdditionalDonationAmt"),
                });

                return result;
            }
        }
        #endregion

        

        //#region Populate Records
        //public override ChatrelPaymentVM PopulateRecord(MySqlDataReader reader)
        //{
        //    ChatrelPaymentVM chatrelPaymentVM = new ChatrelPaymentVM
        //    {

        //    }
        //}
        //#endregion
    }
}
