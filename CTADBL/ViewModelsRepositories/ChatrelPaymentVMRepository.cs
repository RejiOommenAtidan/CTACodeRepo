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
using System.Threading.Tasks;
using TimeZoneConverter;

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
            if (gbChatrelDonation == null && chatrels == null)
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


                chatrelPayment.dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                chatrelPayment.dtPayment = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                chatrelPayment.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                chatrelPayment.sPaymentStatus = ChatrelPayment.Success;
                greenbook.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                greenbook.sPaidUntil = chatrelPayment.nChatrelYear.ToString();

                if (chatrels != null)
                {
                    foreach (var chatrel in chatrels)
                    {
                        chatrel.sChatrelReceiptNumber = chatrelPayment.sChatrelReceiptNumber;
                        //chatrel.sGBId = chatrelPayment.sGBId;
                        chatrel.sPaidByGBId = chatrelPayment.sPaidByGBId;
                        //chatrel.nChatrelLateFeesPercentage = chatrelPayment.nChatrelLateFeesPercentage;
                        chatrel.dtPayment = chatrelPayment.dtPayment;
                        chatrel.dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                        chatrel.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
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
                    if (chatrels != null)
                    {
                        foreach (var chatrel in chatrels)
                        {
                            chatrel.chatrelpaymentID = Convert.ToInt32(insertId);
                            var cbuilder = new SqlQueryBuilder<GBChatrel>(chatrel);
                            command.CommandText = cbuilder.GetInsertCommand().CommandText;
                            int rows = command.ExecuteNonQuery();
                        }
                    }
                    if (gbChatrelDonation != null)
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
        public async Task<IEnumerable<Object>> SearchUsers(string sGBID, string sFirstName, string sFathersName, string sMothersName)
        {
            // Set Limit of records
            int records = 50;
            string parameters = "";
            using (var command = new MySqlCommand())
            {
                command.Parameters.AddWithValue("sGBID", '%' + sGBID + '%');
                command.Parameters.AddWithValue("records", records);

                if (sFirstName != null && !String.IsNullOrEmpty(sFirstName.Trim()))
                {
                    //name = String.Format(@"t2.sFirstName LIKE '{0}' AND ", sFirstName);
                    parameters += $@" AND t2.sFirstName LIKE @sFirstName ";
                    command.Parameters.AddWithValue("sFirstName", sFirstName + '%');
                }
                if (sFathersName != null && !String.IsNullOrEmpty(sFathersName.Trim()))
                {
                    parameters += $@" AND t2.sFathersName LIKE @sFathersName ";
                    command.Parameters.AddWithValue("sFathersName", sFathersName + '%');
                }
                if (sMothersName != null && !String.IsNullOrEmpty(sMothersName.Trim()))
                {
                    parameters += $@" AND t2.sMothersName LIKE sMothersName ";
                    command.Parameters.AddWithValue("sMothersName", sMothersName + '%');
                }
                string sql = String.Format(@"set session sql_mode = '';SELECT t2.sGBId, t2.sFirstName, t2.sLastName, CAST((date_format(curdate(), '%Y%m%d') -  date_format(t2.dtdob, '%Y%m%d'))/10000 AS UNSIGNED) AS nAge, l.sAuthRegion, l2.sCountry, if(t2.dtDeceased IS NULL, 'Alive', 'Deceased' ) AS sStatus, max(t.dtPayment) as dtPayment FROM tblgreenbook t2 LEFT JOIN tblchatrelpayment t  ON t.sGBId = t2.sGBID LEFT JOIN lstauthregion l ON t2.nAuthRegionID = l.ID LEFT JOIN lstcountry l2 ON t2.sCountryID = l2.sCountryID WHERE t2.sGBId LIKE @sGBID {0} GROUP BY t2.sGBId LIMIT @records;", parameters);

                command.CommandText = sql;
                command.CommandType = CommandType.Text;
                command.Connection = _connection;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                await mySqlDataAdapter.FillAsync(ds);
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
            string sql = @"SELECT t.sGBID, t.sFirstName, t.sLastName, t.sGender, t.dtDOB, t.sFamilyName, l.sCountry, t.sCountryID, t.sLoginGmail, l2.sAuthRegion FROM  tblgreenbook t INNER JOIN lstcountry l ON l.sCountryID = t.sCountryID LEFT JOIN lstauthregion l2 ON t.nAuthRegionID = l2.ID WHERE t.sGBID = @sGBID;
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
                    sLoginGmail = row.Field<string>("sLoginGmail"),
                    sAuthRegion = row.Field<string>("sAuthRegion"),
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


        #region Get Chatrel List Quick (Chatrel List with Limited Columns + Search)

        public async Task<IEnumerable<Object>> GetQuickChatrelList(Dictionary<string, string> searchParams = null)
        {
            /* Search params :
             * 
             * 1. Payment Mode.
             * 2. Region
             * 3. Country
             * 4. Payment Date
             * 5. Receipt No.
             * 6. GB ID
             */

            string sql = @"SET session sql_mode = ''; SELECT t.sGBID, t.sChatrelReceiptNumber, concat(t.nChatrelYear, '-', (CAST(substring(t.nChatrelYear, 3) AS UNSIGNED)+1))  AS sFinancialYear, t.dtPayment, t2.sFirstName, t2.sLastName, CONCAT(t2.sFirstName,' ',IFNULL(t2.sLastName, '')) AS sName,  t.sPaidByGBId, t.sPaymentCurrency, t.nChatrelTotalAmount, t.sPaymentMode, l.sAuthRegion, l3.sCountry FROM tblchatrelpayment t LEFT JOIN tblgreenbook t2 ON t2.sGBID = t.sGBId LEFT JOIN lnkgbchatrel l2 ON t.id = l2.chatrelpaymentID AND l2.nArrearsAmount IS NULL LEFT JOIN lnkgbchatreldonation l4 ON l4.chatrelpaymentID = t.Id  LEFT JOIN lstauthregion l ON l.ID = l2.nAuthRegionID OR l.ID = l4.nAuthRegionID LEFT JOIN lstcountry l3 ON l3.sCountryID = l2.sCountryID OR l3.sCountryID = l4.sCountryID  WHERE t.sChatrelReceiptNumber IS NOT NULL ";
            using (var command = new MySqlCommand())
            {
                foreach (KeyValuePair<string, string> item in searchParams)
                {
                    if (item.Value != null)
                    {
                        if (item.Key == "dtPaymentFrom")
                        {
                            if (!String.IsNullOrEmpty(item.Value) && !String.IsNullOrWhiteSpace(item.Value))
                            {
                                sql += $@" AND t.dtPayment >= @{item.Key}";
                                command.Parameters.AddWithValue(item.Key, item.Value.ToString());
                            }
                            continue;
                        }
                        if (item.Key == "dtPaymentTo")
                        {
                            if (!String.IsNullOrEmpty(item.Value) && !String.IsNullOrWhiteSpace(item.Value))
                            {
                                sql += $@" AND t.dtPayment <= @{item.Key}";
                                command.Parameters.AddWithValue(item.Key, item.Value.ToString());
                            }
                            continue;
                        }
                        if (item.Key == "sAuthRegion")
                        {
                            sql += $@" AND l.{item.Key} LIKE @{item.Key}";
                            command.Parameters.AddWithValue(item.Key, item.Value.ToString() + '%');
                            continue;
                        }
                        if (item.Key == "sCountry")
                        {
                            sql += $@" AND l3.{item.Key} LIKE @{item.Key}";
                            command.Parameters.AddWithValue(item.Key, item.Value.ToString() + '%');
                            continue;
                        }
                        if (item.Key == "sFirstName" || item.Key == "sLastName")
                        {
                            sql += $@" AND t2.{item.Key} LIKE @{item.Key}";
                            command.Parameters.AddWithValue(item.Key, item.Value.ToString() + '%');
                            continue;
                        }
                        if (!String.IsNullOrEmpty(item.Value) && !String.IsNullOrWhiteSpace(item.Value))
                        {
                            sql += $@" AND t.{item.Key} LIKE @{item.Key}";
                            command.Parameters.AddWithValue(item.Key, item.Value.ToString() + '%');
                        }
                    }
                }
                int records = 50;
                sql += " ORDER BY t.dtPayment DESC LIMIT @records;";
                command.CommandText = sql;
                command.Parameters.AddWithValue("records", records);
                command.CommandType = CommandType.Text;
                command.Connection = _connection;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                await mySqlDataAdapter.FillAsync(ds);
                DataTableCollection tables = ds.Tables;
                var result = tables[0].AsEnumerable().Select(row => new
                {
                    sGBID = row.Field<string>("sGBID"),
                    sChatrelReceiptNumber = row.Field<string>("sChatrelReceiptNumber"),
                    sFinancialYear = row.Field<string>("sFinancialYear"),
                    dtPayment = row.Field<DateTime?>("dtPayment"),
                    sName = row.Field<string>("sName"),
                    sPaidByGBId = row.Field<string>("sPaidByGBId"),
                    sPaymentCurrency = row.Field<string>("sPaymentCurrency"),
                    nChatrelTotalAmount = row.Field<decimal>("nChatrelTotalAmount"),
                    sPaymentMode = row.Field<string>("sPaymentMode"),
                    sAuthRegion = row.Field<string>("sAuthRegion"),
                    sCountry = row.Field<string>("sCountry"),
                });

                return result;
            }
        }

        #endregion


        #region Get Chatrel List (Chatrel List - All Columns)
        public IEnumerable<Object> GetAllChatrelPayments()
        {
            //string sql = @"SET session sql_mode = ''; SELECT t.sGBID, t.sChatrelReceiptNumber, t.dtPayment, CONCAT(t2.sFirstName,' ',IFNULL(t2.sLastName, '')) AS sName,t2.sCountryID , t.sPaidByGBId, t.sPaymentCurrency, ROUND(l.nChatrelAmount*l.nConversionRate, 2) AS nChatrelAmount, ROUND(l.nChatrelMeal*l.nConversionRate, 2) AS nChatrelMeal, ROUND(l.nCurrentChatrelSalaryAmt*l.nConversionRate, 2) AS nCurrentChatrelSalaryAmt, l.dtCurrentChatrelFrom, l.dtCurrentChatrelTo, concat(date_format(dtCurrentChatrelFrom, '%Y'), '-', date_format(dtCurrentChatrelTo, '%y')) AS sFinancialYear, l2.nArrears, l2.dtArrearsFrom, l2.dtArrearsTo, l4.nChatrelBusinessDonationAmt, l4.nChatrelAdditionalDonationAmt, t.nChatrelTotalAmount, l5.sAuthRegion, t.sPaymentMode FROM tblchatrelpayment t LEFT JOIN lnkgbchatrel l ON t.id = l.chatrelpaymentID LEFT JOIN (SELECT l3.chatrelpaymentID, ROUND(sum(l3.nArrearsAmount*l3.nConversionRate), 2) AS nArrears, min(l3.dtArrearsFrom) AS dtArrearsFrom, max(l3.dtArrearsTo) AS dtArrearsTo FROM lnkgbchatrel l3 WHERE l3.nArrearsAmount IS NOT NULL GROUP BY l3.sChatrelReceiptNumber ) AS l2 ON l2.chatrelpaymentID = t.Id LEFT JOIN lnkgbchatreldonation l4 ON t.Id = l4.chatrelpaymentID LEFT JOIN tblgreenbook t2 ON t2.sGBID = t.sGBId  LEFT JOIN lstauthregion l5 ON l5.ID = l.nAuthRegionID OR l5.ID = l4.nAuthRegionID WHERE l.nArrearsAmount IS NULL AND t.sChatrelReceiptNumber IS NOT NULL ORDER BY t.dtPayment DESC LIMIT @records;";

            string sql = @"SET session sql_mode = ''; SELECT t.sGBID, t.sChatrelReceiptNumber, t.dtPayment, CONCAT(t2.sFirstName, ' ', IFNULL(t2.sLastName, '')) AS sName, t2.sCountryID , t.sPaidByGBId, t.sPaymentCurrency, COALESCE(ROUND(l.nChatrelAmount * l.nConversionRate, 2), 0) AS nChatrelAmount, COALESCE(ROUND(l.nChatrelMeal * l.nConversionRate, 2), 0) AS nChatrelMeal, COALESCE(ROUND(l.nCurrentChatrelSalaryAmt * l.nConversionRate, 2), 0) AS nCurrentChatrelSalaryAmt, l.dtCurrentChatrelFrom, l.dtCurrentChatrelTo, concat(date_format(dtCurrentChatrelFrom, '%Y'), '-', date_format(dtCurrentChatrelTo, '%y')) AS sFinancialYear, COALESCE(l2.nArrears, 0) AS nArrears, l2.dtArrearsFrom, l2.dtArrearsTo, COALESCE(l4.nChatrelBusinessDonationAmt, 0) AS nChatrelBusinessDonationAmt, COALESCE(l4.nChatrelAdditionalDonationAmt, 0) AS nChatrelAdditionalDonationAmt, t.nChatrelTotalAmount, l5.sAuthRegion, t.sPaymentMode FROM tblchatrelpayment t LEFT JOIN lnkgbchatrel l ON t.id = l.chatrelpaymentID LEFT JOIN(SELECT l3.chatrelpaymentID, ROUND(sum(l3.nArrearsAmount* l3.nConversionRate), 2) AS nArrears, min(l3.dtArrearsFrom) AS dtArrearsFrom, max(l3.dtArrearsTo) AS dtArrearsTo FROM lnkgbchatrel l3 WHERE l3.nArrearsAmount IS NOT NULL GROUP BY l3.sChatrelReceiptNumber ) AS l2 ON l2.chatrelpaymentID = t.Id LEFT JOIN lnkgbchatreldonation l4 ON t.Id = l4.chatrelpaymentID LEFT JOIN tblgreenbook t2 ON t2.sGBID = t.sGBId  LEFT JOIN lstauthregion l5 ON l5.ID = l.nAuthRegionID OR l5.ID = l4.nAuthRegionID WHERE l.nArrearsAmount IS NULL AND t.sChatrelReceiptNumber IS NOT NULL ORDER BY t.dtPayment DESC LIMIT @records;";

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
                    sName = row.Field<string>("sName"),
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
                    sCountryID = row.Field<string>("sCountryID")
                });

                return result;
            }

        }
        #endregion

        #region Get Payment received breakup (Chatrel Receipt)

        public IEnumerable<Object> GetPaymentBreakup(string sChatrelReceiptNumber)
        {
            //string sql = @"SELECT t.dtPayment, t.sGBId, t.nChatrelYear, t.nChatrelTotalAmount AS nReceiptTotal, t.sChatrelReceiptNumber, t.sPaymentMode, t.sPaymentCurrency, t.sPaidByGBId, concat(date_format(l.dtCurrentChatrelFrom, '%Y'), '-', date_format(l.dtCurrentChatrelTo, '%y')) AS sFinancialYear, ROUND(l.nChatrelAmount*l.nConversionRate, 2) AS nChatrelAmount, ROUND(l.nChatrelMeal*l.nConversionRate,2) AS nChatrelMeal, ROUND(l.nCurrentChatrelSalaryAmt*l.nConversionRate, 2) AS nCurrentChatrelSalaryAmt, ROUND(l.nChatrelLateFeesValue*l.nConversionRate, 2) AS nChatrelLateFeesValue, ROUND(l.nArrearsAmount*l.nConversionRate, 2) AS TotalArrears, l.nChatrelTotalAmount, l.dtArrearsFrom, l.dtArrearsTo, l3.sAuthRegion, NULL AS nChatrelBusinessDonationAmt, NULL AS nChatrelAdditionalDonationAmt FROM tblchatrelpayment t INNER JOIN lnkgbchatrel l ON t.Id = l.chatrelpaymentID LEFT JOIN lstauthregion l3 ON l3.ID = l.nAuthRegionID WHERE t.sChatrelReceiptNumber = @sChatrelReceiptNumber UNION SELECT t2.dtPayment, t2.sGBId, t2.nChatrelYear, t2.nChatrelTotalAmount, t2.sChatrelReceiptNumber, t2.sPaymentMode, t2.sPaymentCurrency, t2.sPaidByGBId, concat((t2.nChatrelYear), '-', (substr(t2.nChatrelYear, 3)+1)) AS sFinancialYear, NULL, NULL, NULL, NULL, NULL, ROUND((l2.nChatrelBusinessDonationAmt + l2.nChatrelAdditionalDonationAmt), 2), NULL, NULL, l4.sAuthRegion, ROUND(l2.nChatrelBusinessDonationAmt,2) AS nChatrelBusinessDonationAmt, ROUND(l2.nChatrelAdditionalDonationAmt, 2) AS nChatrelAdditionalDonationAmt FROM tblchatrelpayment t2 INNER JOIN lnkgbchatreldonation l2 ON t2.Id = l2.chatrelpaymentID LEFT JOIN lstauthregion l4 ON l4.ID = l2.nAuthRegionID WHERE t2.sChatrelReceiptNumber = @sChatrelReceiptNumber;";

            string sql = @"SELECT t.dtPayment, t.sGBId, t.nChatrelYear, format(t.nChatrelTotalAmount, 2) AS nReceiptTotal, t.sChatrelReceiptNumber, t.sPaymentMode, t.sPaymentCurrency, t.sPaidByGBId, concat((COALESCE(date_format(l.dtArrearsFrom, '%Y'), t.nChatrelYear)), '-', COALESCE(date_format(l.dtArrearsTo, '%y'), (substr(t.nChatrelYear, 3)+1))) AS sFinancialYear, format(l.nChatrelAmount*l.nConversionRate, 2) AS nChatrelAmount, format(l.nChatrelMeal*l.nConversionRate, 2) AS nChatrelMeal, format(l.nCurrentChatrelSalaryAmt*l.nConversionRate, 2) AS nCurrentChatrelSalaryAmt, format(l.nChatrelLateFeesValue*l.nConversionRate, 2) AS nChatrelLateFeesValue, format(l.nArrearsAmount*l.nConversionRate, 2) AS TotalArrears, format(l.nChatrelTotalAmount, 2) AS nChatrelTotalAmount, l.dtArrearsFrom, l.dtArrearsTo, COALESCE(l3.sAuthRegion, l4.sAuthRegion) AS sAuthRegion, format(l2.nChatrelBusinessDonationAmt, 2) AS nChatrelBusinessDonationAmt, format(l2.nChatrelAdditionalDonationAmt, 2) AS nChatrelAdditionalDonationAmt FROM tblchatrelpayment t LEFT JOIN lnkgbchatrel l ON t.Id = l.chatrelpaymentID LEFT JOIN lnkgbchatreldonation l2 ON t.Id = l2.chatrelpaymentID AND l.nArrearsAmount IS NULL LEFT JOIN lstauthregion l3 ON l3.ID = l.nAuthRegionID LEFT JOIN lstauthregion l4 ON l4.ID = l2.nAuthRegionID WHERE t.sChatrelReceiptNumber = @sChatrelReceiptNumber order by coalesce(l.dtArrearsFrom, l.dtCurrentChatrelFrom);";

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
                    nReceiptTotal = row.Field<string>("nReceiptTotal"),
                    sChatrelReceiptNumber = row.Field<string>("sChatrelReceiptNumber"),
                    sPaymentMode = row.Field<string>("sPaymentMode"),
                    sPaymentCurrency = row.Field<string>("sPaymentCurrency"),
                    sPaidByGBId = row.Field<string>("sPaidByGBId"),
                    sFinancialYear = row.Field<string>("sFinancialYear"),
                    nChatrelAmount = row.Field<string?>("nChatrelAmount"),
                    nChatrelMeal = row.Field<string?>("nChatrelMeal"),
                    nCurrentChatrelSalaryAmt = row.Field<string?>("nCurrentChatrelSalaryAmt"),
                    nChatrelLateFeesValue = row.Field<string?>("nChatrelLateFeesValue"),
                    nArrears = row.Field<string?>("TotalArrears"),
                    nChatrelTotalAmount = row.Field<string?>("nChatrelTotalAmount"),
                    dtArrearsFrom = row.Field<DateTime?>("dtArrearsFrom"),
                    dtArrearsTo = row.Field<DateTime?>("dtArrearsTo"),
                    sAuthRegion = row.Field<string>("sAuthRegion"),
                    nChatrelBusinessDonationAmt = row.Field<string?>("nChatrelBusinessDonationAmt"),
                    nChatrelAdditionalDonationAmt = row.Field<string?>("nChatrelAdditionalDonationAmt"),
                });

                return result;
            }
        }
        #endregion

        #region Chatrel Payment Report (Chatrel Report)
        public IEnumerable<Object> GetChatrelPaymentReport(ChatrelReportVM chatrelReportVM)
        {

            string addParams = String.Empty;

            //if(dtFrom == null && dtTo == null)
            //{
            //    int startyear = DateTime.Today.Month < 4 ? DateTime.Today.Year - 1 : DateTime.Today.Year;
            //    int endyear = startyear + 1;
            //    dtFrom = DateTime.Parse(startyear.ToString() + "-04-01");
            //    dtTo = DateTime.Parse(endyear.ToString() + "-03-31");
            //}

            if (chatrelReportVM.AuthRegions.Count() > 0)
            {
                addParams += "AND (";
                foreach (AuthRegion region in chatrelReportVM.AuthRegions)
                {
                    addParams += " sAuthRegion = '" + region.sAuthRegion + "' OR";
                }
                addParams = addParams.Substring(0, addParams.Length - 2);
                addParams += ")";
            }

            if (chatrelReportVM.Countries.Count() > 0)
            {
                addParams += "AND (";
                foreach (Country country in chatrelReportVM.Countries)
                {
                    addParams += " sCountry = '" + country.sCountry + "' OR";
                }
                addParams = addParams.Substring(0, addParams.Length - 2);
                addParams += ")";
            }

            int records = 5000;

            
            //string sql = String.Format(@"SET session sql_mode = ''; SELECT t.sGBID, t.sChatrelReceiptNumber, t.dtPayment, t2.sFirstName,t2.sLastName,  t2.sCountryID,t.sPaidByGBId, t.sPaymentCurrency, ROUND(l.nChatrelAmount*l.nConversionRate, 2) AS nChatrelAmount, ROUND(l.nChatrelMeal*l.nConversionRate, 2) AS nChatrelMeal, ROUND(l.nCurrentChatrelSalaryAmt*l.nConversionRate, 2) AS nCurrentChatrelSalaryAmt, l.dtCurrentChatrelFrom, l.dtCurrentChatrelTo, concat(date_format(dtCurrentChatrelFrom, '%Y'), '-', date_format(dtCurrentChatrelTo, '%y')) AS sFinancialYear, l2.nArrears, l2.dtArrearsFrom, l2.dtArrearsTo, l4.nChatrelBusinessDonationAmt, l4.nChatrelAdditionalDonationAmt, t.nChatrelTotalAmount, l5.sAuthRegion, t.sPaymentMode, l6.sCountry FROM tblchatrelpayment t LEFT JOIN lnkgbchatrel l ON t.id = l.chatrelpaymentID LEFT JOIN (SELECT l3.chatrelpaymentID, sum(l3.nArrearsAmount*l3.nConversionRate) AS nArrears, min(l3.dtArrearsFrom) AS dtArrearsFrom, max(l3.dtArrearsTo) AS dtArrearsTo FROM lnkgbchatrel l3 WHERE l3.nArrearsAmount IS NOT NULL GROUP BY l3.sChatrelReceiptNumber ) AS l2 ON l2.chatrelpaymentID = t.Id LEFT JOIN lnkgbchatreldonation l4 ON t.Id = l4.chatrelpaymentID LEFT JOIN tblgreenbook t2 ON t2.sGBID = t.sGBId  LEFT JOIN lstauthregion l5 ON l5.ID = l.nAuthRegionID OR l5.ID = l4.nAuthRegionID LEFT JOIN lstcountry l6 ON l6.sCountryID = l.sCountryID OR l6.sCountryID = l4.sCountryID WHERE l.nArrearsAmount IS NULL AND t.sChatrelReceiptNumber IS NOT NULL AND t.sPaymentMode = @sPaymentMode AND t.dtPayment >= @dtDateFrom AND t.dtPayment <= @dtDateTo {0} LIMIT @records ;", addParams);

            string sql = String.Format(@"SET session sql_mode = ''; SELECT t.sGBID, t.sChatrelReceiptNumber, t.dtPayment, t2.sFirstName,t2.sLastName,  t2.sCountryID,t.sPaidByGBId,t3.sCountryID as sPaidByCountryID, t.sPaymentCurrency, COALESCE(ROUND(l.nChatrelAmount * l.nConversionRate, 2), 0) AS nChatrelAmount, COALESCE(ROUND(l.nChatrelMeal * l.nConversionRate, 2), 0) AS nChatrelMeal, COALESCE(ROUND(l.nCurrentChatrelSalaryAmt * l.nConversionRate, 2), 0) AS nCurrentChatrelSalaryAmt, l.dtCurrentChatrelFrom, l.dtCurrentChatrelTo, concat(date_format(dtCurrentChatrelFrom, '%Y'), '-', date_format(dtCurrentChatrelTo, '%y')) AS sFinancialYear, COALESCE(l2.nArrears, 0) AS nArrears, l2.dtArrearsFrom, l2.dtArrearsTo, COALESCE(l4.nChatrelBusinessDonationAmt, 0) AS nChatrelBusinessDonationAmt, COALESCE(l4.nChatrelAdditionalDonationAmt, 0) AS nChatrelAdditionalDonationAmt, t.nChatrelTotalAmount, l5.sAuthRegion, t.sPaymentMode, l6.sCountry FROM tblchatrelpayment t LEFT JOIN lnkgbchatrel l ON t.id = l.chatrelpaymentID LEFT JOIN(SELECT l3.chatrelpaymentID, sum(l3.nArrearsAmount* l3.nConversionRate) AS nArrears, min(l3.dtArrearsFrom) AS dtArrearsFrom, max(l3.dtArrearsTo) AS dtArrearsTo FROM lnkgbchatrel l3 WHERE l3.nArrearsAmount IS NOT NULL GROUP BY l3.sChatrelReceiptNumber ) AS l2 ON l2.chatrelpaymentID = t.Id LEFT JOIN lnkgbchatreldonation l4 ON t.Id = l4.chatrelpaymentID LEFT JOIN tblgreenbook t2 ON t2.sGBID = t.sGBId LEFT JOIN tblgreenbook t3 on t.sPaidByGBId = t3.sGBID  LEFT JOIN lstauthregion l5 ON l5.ID = l.nAuthRegionID OR l5.ID = l4.nAuthRegionID LEFT JOIN lstcountry l6 ON l6.sCountryID = l.sCountryID OR l6.sCountryID = l4.sCountryID WHERE l.nArrearsAmount IS NULL AND t.sChatrelReceiptNumber IS NOT NULL AND t.sPaymentMode = @sPaymentMode AND t.dtPayment >= @dtDateFrom AND t.dtPayment <= @dtDateTo {0} LIMIT @records ;", addParams);


            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sPaymentMode", chatrelReportVM.sPaymentMode);
                command.Parameters.AddWithValue("records", records);
                command.Parameters.AddWithValue("dtDateFrom", chatrelReportVM.dtDateFrom);
                command.Parameters.AddWithValue("dtDateTo", chatrelReportVM.dtDateTo);
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
                    sLastName = row.Field<string>("sLastName"),
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
                    sCountry = row.Field<string>("sCountry"),
                    sCountryID = row.Field<string>("sCountryID"),
                    sPaidByCountryID = row.Field<string>("sPaidByCountryID")
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
