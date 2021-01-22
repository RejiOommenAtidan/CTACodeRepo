using ChatrelDBL.BaseClasses.Transactions;
using ChatrelDBL.BaseClassRepositories.Transactions;
using ChatrelDBL.QueryBuilder;
using ChatrelDBL.Repository;
using ChatrelDBL.ViewModels;
using MySql.Data.MySqlClient;
using QRCoder;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;

namespace ChatrelDBL.ViewModelsRepositories
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

        public Object Add(ChatrelPaymentVM chatrelPaymentVM)
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


                chatrelPayment.dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
                chatrelPayment.dtPayment = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
                chatrelPayment.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
                chatrelPayment.sPaymentStatus = ChatrelPayment.Success;
                greenbook.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
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
                        chatrel.dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
                        chatrel.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
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

                    Object receipt = GetReceipt(chatrelPayment.sChatrelReceiptNumber);
                    //return ("Records inserted successfully.");
                    return receipt;

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
            string sql = "SELECT IFNULL(MAX(CAST(sChatrelReceiptNumber AS UNSIGNED)) + 1, 1) AS value FROM tblchatrelpayment WHERE sPaymentMode = @sPaymentMode;";
            using (var command = new MySqlCommand(sql))
            {
                _connection.Open();
                command.Parameters.AddWithValue("sPaymentMode", sPaymentMode);
                command.Connection = _connection;
                command.CommandType = CommandType.Text;

                int maxNumber = Convert.ToInt32(command.ExecuteScalar());
                _connection.Close();
                return String.Format("{0}", maxNumber);
            }

        }

        public Object GetReceipt(string sReceiptNumber)
        {
            string sql = @"SET session sql_mode = ''; SELECT t.sGBID, CAST((date_format(curdate(), '%Y%m%d') -  date_format(t2.dtdob, '%Y%m%d'))/10000 AS UNSIGNED) AS nAge, t.sChatrelReceiptNumber, t.dtPayment, t2.sCountryID, t2.sFirstName, t2.sLastName, t.sPaidByGBId, t.sPaymentCurrency, ROUND(l.nChatrelAmount*l.nConversionRate, 2) AS nChatrelAmount, ROUND(l.nChatrelMeal*l.nConversionRate, 2) AS nChatrelMeal, ROUND(l.nCurrentChatrelSalaryAmt*l.nConversionRate, 2) AS nCurrentChatrelSalaryAmt, l2.nArrears, l2.nLateFees, l2.dtArrearsFrom, l2.dtArrearsTo, l4.nChatrelBusinessDonationAmt, l4.nChatrelAdditionalDonationAmt, t.nChatrelTotalAmount FROM tblchatrelpayment t LEFT JOIN lnkgbchatrel l ON t.id = l.chatrelpaymentID LEFT JOIN (SELECT l3.chatrelpaymentID, ROUND(sum(l3.nArrearsAmount*l3.nConversionRate - l3.nChatrelLateFeesValue*l3.nConversionRate), 2) AS nArrears, sum(l3.nChatrelLateFeesValue*l3.nConversionRate) AS nLateFees, min(l3.dtArrearsFrom) AS dtArrearsFrom, max(l3.dtArrearsTo) AS dtArrearsTo FROM lnkgbchatrel l3 WHERE l3.nArrearsAmount IS NOT NULL GROUP BY l3.sChatrelReceiptNumber ) AS l2 ON l2.chatrelpaymentID = t.Id LEFT JOIN lnkgbchatreldonation l4 ON t.Id = l4.chatrelpaymentID LEFT JOIN tblgreenbook t2 ON t2.sGBID = t.sGBId  LEFT JOIN lstauthregion l5 ON l5.ID = l.nAuthRegionID OR l5.ID = l4.nAuthRegionID WHERE l.nArrearsAmount IS NULL AND t.sChatrelReceiptNumber = @sReceiptNumber";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sReceiptNumber", sReceiptNumber);
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
                    sCountryID = row.Field<string>("sCountryID"),
                    nAge = Convert.ToInt32(row.Field<System.UInt64>("nAge")),
                    sChatrelReceiptNumber = row.Field<string>("sChatrelReceiptNumber"),
                    sPaidByGBId = row.Field<string>("sPaidByGBId"),
                    dtPayment = row.Field<DateTime>("dtPayment"),
                    sPaymentCurrency = row.Field<string>("sPaymentCurrency"),
                    nChatrelAmount = row.Field<decimal?>("nChatrelAmount"),
                    nChatrelMeal = row.Field<decimal?>("nChatrelMeal"),
                    nCurrentChatrelSalaryAmt = row.Field<decimal?>("nCurrentChatrelSalaryAmt"),

                    nArrears = row.Field<decimal?>("nArrears"),
                    nLateFees = row.Field<decimal?>("nLateFees"),
                    dtArrearsFrom = row.Field<DateTime?>("dtArrearsFrom"),
                    dtArrearsTo = row.Field<DateTime?>("dtArrearsTo"),
                    nChatrelBusinessDonationAmt = row.Field<decimal?>("nChatrelBusinessDonationAmt"),
                    nChatrelAdditionalDonationAmt = row.Field<decimal?>("nChatrelAdditionalDonationAmt"),
                    nChatrelTotalAmount = row.Field<decimal>("nChatrelTotalAmount")
                }).FirstOrDefault();

                if(result != null)
                {
                    string qrcode = QRCode(result.sGBID, result.dtPayment, result.sChatrelReceiptNumber);
                    var receipt = new { receipt = result, qrcode };
                    return receipt;
                }
                return null;
            }
        }

        public string QRCode(string sGBID, DateTime dtPayment, string sReceiptNumber)
        {
            string qrText = String.Format(@"GB ID: {0}, Date: {1}, Receipt Number: {2}", sGBID, dtPayment.ToString("dd-MM-yyyy"), sReceiptNumber);
            QRCodeGenerator _qrCode = new QRCodeGenerator();
            QRCodeData _qrCodeData = _qrCode.CreateQrCode(qrText, QRCodeGenerator.ECCLevel.Q);
            QRCode qrCode = new QRCode(_qrCodeData);
            Bitmap qrCodeImage = qrCode.GetGraphic(20);
            byte[] bytes = BitmapToBytesCode(qrCodeImage);
            return Convert.ToBase64String(bytes);
        }

        private static Byte[] BitmapToBytesCode(Bitmap image)
        {
            using (MemoryStream stream = new MemoryStream())
            {
                image.Save(stream, System.Drawing.Imaging.ImageFormat.Png);
                return stream.ToArray();
            }
        }

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
