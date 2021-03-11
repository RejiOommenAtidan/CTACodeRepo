using ChatrelDBL.BaseClasses.Transactions;
using ChatrelDBL.BaseClassRepositories.Transactions;
using ChatrelDBL.QueryBuilder;
using ChatrelDBL.Repository;
using ChatrelDBL.ViewModels;
using DinkToPdf;
using DinkToPdf.Contracts;
using MimeKit;
using MailKit.Net.Smtp;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using QRCoder;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
//using System.Net.Mail;
using System.Text;
using TimeZoneConverter;
using ChatrelDBL.BaseClassRepositories.Masters;

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

        private IConverter _converter;
        //private enum PaymentMode { Online = 1, Offline_WebAdmin, Offline_Bulk };
        //private enum PaymentStatus { Success =1, Failed}


    
        #region Constructor
        public ChatrelPaymentVMRepository(string connectionString, IConverter converter) : base(connectionString)
        {
            _converter = converter;
            _connection = new MySqlConnection(connectionString);
            _greenBookRepository = new GreenbookRepository(connectionString);

        }
        #endregion

        public Object Add(ChatrelPaymentVM chatrelPaymentVM , string sLoginGmail)
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
                    //chatrelPayment.sChatrelReceiptNumber = GenerateReceiptNo();
                    var digits = GenerateReceiptNo();
                  
                    var date = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("Eastern Standard Time")).ToString("ddMMyy");
                    var prefix = "";
                    if (digits.Length < 4)
                    {
                        prefix = string.Concat(Enumerable.Repeat("0", 4 - (digits.Length)));
                    }
                    else
                    {
                        prefix = "0";
                    }
                    var receiptNo = "E" + date + prefix + digits;
                    chatrelPayment.sChatrelReceiptNumber = receiptNo;

                }


                chatrelPayment.dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("Eastern Standard Time"));
                chatrelPayment.dtPayment = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("Eastern Standard Time"));
                chatrelPayment.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("Eastern Standard Time"));
                chatrelPayment.sPaymentStatus = ChatrelPayment.Success;
                greenbook.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("Eastern Standard Time"));
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
                        chatrel.dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("Eastern Standard Time"));
                        chatrel.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("Eastern Standard Time"));
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

                    // Object receipt = GetReceipt(chatrelPayment.sChatrelReceiptNumber);
                    //return ("Records inserted successfully.");
                    #region Receipt Email

                    var emailFrom = ChatrelConfigRepository.GetValueByKey("ChatrelAdminEmail").ToString();
                    var emailTo = sLoginGmail;
                    var senderPassword = ChatrelConfigRepository.GetValueByKey("ChatrelAdminEmailPassword").ToString();
                    var server = ChatrelConfigRepository.GetValueByKey("ChatrelEmailRelayServer").ToString();
                    var port = Convert.ToInt32(ChatrelConfigRepository.GetValueByKey("ChatrelEmailServerPort"));
                    bool ssl = Convert.ToBoolean(ChatrelConfigRepository.GetValueByKey("ChatrelEmailUseSSL"));

                    var mailText = String.Format("Hello, Thank You for your contribution !\n \nདྭང་བླངས་དཔྱ་དངུལ་དྲ་རྒྱའི་བརྒྱུད་གནང་བར་ཐུགས་རྗེ་ཆེ་ \nབོད་མིའི་སྒྲིག་འཛུགས་དཔལ་འབྱོར་ལས་ཁུངས་ནས། \nThe receipt for your Chatrel Payment is attached with the mail.\n\nRegards,\nCTA Team");
                    var mailHtml = "<p style = 'font-size:20px; '>Hello, Thank You for your contribution!<br/>" +
                        "<span style = 'font-size:1.7rem; '>དྭང་བླངས་དཔྱ་དངུལ་དྲ་རྒྱའི་བརྒྱུད་གནང་བར་ཐུགས་རྗེ་ཆེ་</span><br/>" +
                        "The receipt for your Chatrel Contribution is attached with the mail<br/>" +
                        "Regards,<br/>CTA Team</p>";
                    //attachment = attachment.Substring(attachment.IndexOf("base64,") + 7);

                    var attach = GetReceipt(chatrelPayment.sChatrelReceiptNumber);

                    MimeMessage message = new MimeMessage();
                    MailboxAddress from = new MailboxAddress("CTA Team", emailFrom);
                    MailboxAddress to = new MailboxAddress(greenbook.sFirstName+" "+greenbook.sLastName , emailTo);

                    BodyBuilder messageBody = new BodyBuilder();
                    
                    messageBody.HtmlBody = mailHtml;
                    //messageBody.TextBody = mailText;
                    messageBody.Attachments.Add("ChatrelReceipt-"+ chatrelPayment.sChatrelReceiptNumber+".pdf" , (byte[])attach);


                    message.From.Add(from);
                    message.To.Add(to);
                    //message.Subject = String.Format("Email from {0}, Green Book Id: {1}", sName, sGBID);

                    message.Subject = String.Format("Chatrel Receipt - {0}", chatrelPayment.sChatrelReceiptNumber);



                    message.Date = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("Eastern Standard Time"));
                    message.Body = messageBody.ToMessageBody();
                    // Message ready. Now to use smtp client to despatch message
                   SmtpClient smtpClient = new SmtpClient();
                    smtpClient.AuthenticationMechanisms.Remove("XOAUTH2");
                    smtpClient.Connect(server, port, ssl);
                    smtpClient.Authenticate(emailFrom, senderPassword);
                    smtpClient.Send(message);
                    smtpClient.Disconnect(true);
                    smtpClient.Dispose();
                    #endregion

                    return chatrelPayment.sChatrelReceiptNumber;

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
            string sql = "SELECT IFNULL(MAX(CAST(SUBSTRING(sChatrelReceiptNumber, 8, 4) AS UNSIGNED)) + 1, 1) AS value FROM tblchatrelpayment WHERE sPaymentMode = @sPaymentMode;";
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
               //DataTable dt = tables[0];
               // foreach(var row in dt.Rows)
               // {
               //     string sGBID = row["sGBID"],
               // }
                //
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
                     
                    
                    string qrcode = QRCode(result.sGBID, result.dtPayment, result.sChatrelReceiptNumber,result.nChatrelTotalAmount, result.sPaymentCurrency, result.sCountryID,result.dtArrearsFrom,result.dtArrearsTo);


                    var json = JsonConvert.SerializeObject(result);
                    var dictionary = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(json);

                    var file = GeneratePDF(json, qrcode);
                    var receipt = new { receipt = result, qrcode };
                    return file;
                    //return null;
                }
                return null;
            }
        }
        private byte[] GeneratePDF(string result, string qrcode)
        {
            var structure = new
            {
                sGBID = "",
                sFirstName = "",
                sLastName = "",
                sCountryID = "",
                nAge = 0,
                sChatrelReceiptNumber = "",
                sPaidByGBId = "",
                dtPayment = DateTime.Now,
                sPaymentCurrency = "",
                nChatrelAmount = 0.00m,
                nChatrelMeal = 0.00m,
                nCurrentChatrelSalaryAmt = 0.00m,



                nArrears = 0.00m,
                nLateFees = 0.00m,
                dtArrearsFrom = DateTime.Now,
                dtArrearsTo = DateTime.Now,
                nChatrelBusinessDonationAmt = 0.00m,
                nChatrelAdditionalDonationAmt = 0.00m,
                nChatrelTotalAmount = 0.00m
            };
            dynamic receipt = JObject.Parse(result);
            var x = receipt.nAge;
            var zeros = string.Concat(Enumerable.Repeat("0", 7 - (receipt.sGBID.Value.Length)));
            var gbid = zeros + receipt.sGBID.Value;
            var startYear = "";
            var endYear = "";
            var sCurrencyCode = receipt.sPaymentCurrency.Value == "USD" ? "$" : "₹";
            if (receipt.dtPayment.Value.Month < 4)
            {
                endYear = receipt.dtPayment.Value.Year.ToString();
            }
            else
            {
                endYear = (receipt.dtPayment.Value.Year + 1).ToString();
            }
            if (receipt.dtArrearsFrom?.Value == null)
            {
                if (receipt.dtPayment.Value.Month < 4)
                {
                    startYear = (receipt.dtPayment.Value.Year - 1).ToString();
                }
                else
                {
                    startYear = receipt.dtPayment.Value.Year.ToString();
                }
            }
            else
            {
                startYear = receipt.dtArrearsFrom.Value.Year.ToString();

            }
            var sChatrelYears = startYear + '-' + endYear;
            var globalSettings = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings { Top = 10 },
                DocumentTitle = "PDF Report",
                //  Out = @"E:\Employee_Report.pdf"
            };
            //string path = "/"CTABackground.PNG/"";
            string sb = $@"
                        <html>
                            <head>
                            <style>
                                body{{
                                background-repeat: no-repeat;
                               background-position: 50% 12%;
                               background-image:url('data:image/jpeg;base64,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');
                              
                                    }}
                            </style>                
                            </head>
                            <body>
                                <table id='mytable' class='mytable' cellspacing='0' style='border: 3px solid #000000'>
<tr>
    <td width='20'></td>
    <td width='300'></td>
    <td width='225'></td>
    <td width='225'></td>
    <td width='20'></td>
  </tr>
  <tr>
    <td width='20'></td>
    <td colSpan='1' height='35' align='left' valign='middle'><b><font face='Microsoft Himalaya' size='5' color='#000000'>༄༅། །བཙན་བྱོལ་བོད་མིའི་དཔྱ་དངུལ་བྱུང་འཛིན་ཨང་།</font></b></td>
    <td align='right'><b>Date:{receipt.dtPayment.Value.ToString("dd-MM-yyyy")}</b></td>
    <td align='right'><b>{receipt.sChatrelReceiptNumber.Value}</b></td>
    <td width='20'></td>
  </tr>
  <tr>
    <td width='20'></td>
    <td colspan='2' height='28' align='left' valign='middle'><b><font face='Microsoft Himalaya' size='4' color='#000000'>མིང་། {receipt.sFirstName.Value + receipt.sLastName.Value }</font><font size='4' color='#000000'></font></b></td>
    <td align='right' valign='middle'><b><font face='Microsoft Himalaya' size='4' color='#000000'>རང་ལོ། {receipt.nAge.Value}  </font></b></td>
    <td width='20'></td>
  </tr>
  <tr>
    <td colspan='5' height='27' align='left' valign='top'>
      <table>
        <tr>
          <td style='width:200px;padding-left:20px;border-top:2px solid #000000'><b><font face='Microsoft Himalaya' size='4' color='#000000'>དཔྱ་དེབ་ཨང་།</font></b></td>
          <td align='center' style='border:2px solid #000000' width='32'><b><font size='4' color='#000000'>{receipt.sCountryID.Value.ToString().Substring(0, 1) }</font></b></td>
          <td align='center' style='border-top:2px solid #000000;border-bottom:2px solid #000000;border-right:2px solid #000000' width='32'><b><font size='4' color='#000000'>{receipt.sCountryID.Value.ToString().Substring(1, 1) }</font></b></td>
          <td align='center' style='border-top:2px solid #000000;border-bottom:2px solid #000000;border-right:2px solid #000000' width='32'><b><font size='4' color='#000000'>{gbid.Substring(0, 1) }</font></b></td>
          <td align='center' style='border-top:2px solid #000000;border-bottom:2px solid #000000;border-right:2px solid #000000' width='32'><b><font size='4' color='#000000'>{gbid.Substring(1, 1) }</font></b></td>
          <td align='center' style='border-top:2px solid #000000;border-bottom:2px solid #000000;border-right:2px solid #000000' width='32'><b><font size='4' color='#000000'>{gbid.Substring(2, 1) }</font></b></td>
          <td align='center' style='border-top:2px solid #000000;border-bottom:2px solid #000000;border-right:2px solid #000000' width='32'><b><font size='4' color='#000000'>{gbid.Substring(3, 1) }</font></b></td>
          <td align='center' style='border-top:2px solid #000000;border-bottom:2px solid #000000;border-right:2px solid #000000' width='32'><b><font size='4' color='#000000'>{gbid.Substring(4, 1) }</font></b></td>
          <td align='center' style='border-top:2px solid #000000;border-bottom:2px solid #000000;border-right:2px solid #000000' width='32'><b><font size='4' color='#000000'>{gbid.Substring(5, 1) }</font></b></td>
          <td align='center' style='border-top:2px solid #000000;border-bottom:2px solid #000000;border-right:2px solid #000000' width='32'><b><font size='4' color='#000000'>{gbid.Substring(6, 1) }</font></b></td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td width='20'></td>
    <td colSpan='3' height='7' align='left' valign='top'><font face='Microsoft Himalaya' size='4' color='#000000'></font></td>
    <td width='20'></td>
  </tr>
  <tr>
    <td width='20' height='26' style='border-bottom:1px solid #000000'></td>
    <td colspan='2' style='border-bottom:1px solid #000000' align='left' valign='bottom'><b><font face='Microsoft Himalaya' size='4' color='#000000'>༡། དཔྱ་དངུལ།</font></b></td>
    <td style='border-bottom:2px solid #000000' align='left' valign='bottom'>
      <b>
        <font face='Microsoft Himalaya' size='4' color='#000000'>
          སྒོར།<!-- --> <!-- -->{(receipt.nChatrelAmount.Value != null ? (sCurrencyCode +receipt.nChatrelAmount.Value) : 0)}
        </font>
      </b>
    </td>
    <td width='20' style='border-bottom:2px solid #000000'></td>
  </tr>
  <tr>
    <td width='20' style='border-bottom:1px solid #000000' height='26'></td>
    <td colspan='2' style='border-bottom:1px solid #000000' align='left' valign='bottom'><b><font face='Microsoft Himalaya' size='4' color='#000000'>༢། ཟས་བཅད་དོད།</font></b></td>
    <td style='border-bottom:2px solid #000000' align='left' valign='bottom'><b><font face='Microsoft Himalaya' size='4' color='#000000'>སྒོར། {(receipt.nChatrelMeal.Value != null ? (sCurrencyCode + receipt.nChatrelMeal.Value) : 0)}   </font></b></td>
    <td width='20' style='border-bottom:2px solid #000000'></td>
  </tr>
  <tr>
    <td width='20' style='border-bottom:1px solid #000000' height='26'></td>
    <td colspan='2' style='border-bottom:1px solid #000000' align='left' valign='bottom'><b><font face='Microsoft Himalaya' size='4' color='#000000'>༣། ཕོགས་འབབ།</font></b></td>
    <td style='border-bottom:2px solid #000000' align='left' valign='bottom'>
      <b>
        <font face='Microsoft Himalaya' size='4' color='#000000'>

          སྒོར།<!-- --> <!-- -->{(receipt.nCurrentChatrelSalaryAmt.Value != null ? (sCurrencyCode + receipt.nCurrentChatrelSalaryAmt.Value) : 0)}  
        </font>
      </b>
    </td>
    <td width='20' style='border-bottom:2px solid #000000'></td>
  </tr>
  <tr>
    <td width='20' style='border-bottom:1px solid #000000' height='26'></td>
    <td colspan='2' style='border-bottom:1px solid #000000' align='left' valign='bottom'><b><font face='Microsoft Himalaya' size='4' color='#000000'>༤། ཚོང་ཁེའི་བློས་བཅད་ཞལ་འདེབས།</font></b></td>
    <td style='border-bottom:2px solid #000000' align='left' valign='bottom'>
      <b>
        <font face='Microsoft Himalaya' size='4' color='#000000'>
          སྒོར།<!-- --> <!-- -->{(receipt.nChatrelBusinessDonationAmt.Value != null ? (sCurrencyCode + receipt.nChatrelBusinessDonationAmt.Value) : 0)}  
        </font>
      </b>
    </td>
    <td width='20' style='border-bottom:2px solid #000000'></td>
  </tr>
  <tr>
    <td width='20' style='border-bottom:1px solid #000000' height='26'></td>
    <td colspan='2' style='border-bottom:1px solid #000000' align='left' valign='bottom'><b><font face='Microsoft Himalaya' size='4' color='#000000'>༥། དཔྱ་དངུལ་འབུལ་ཆད་འབབ།</font></b></td>
    <td style='border-bottom:2px solid #000000' align='left' valign='bottom'><b><font face='Microsoft Himalaya' size='4' color='#000000'>སྒོར །<!-- --> <!-- -->
  {(receipt.nArrears.Value != null ? (receipt.nArrears.Value +" (" +receipt.dtArrearsFrom.Value.Year + " - " + receipt.dtArrearsTo.Value.Year + " )" ): "")} <!-- --> <!-- -->  </font></b></td>
    <td width='20' style='border-bottom:2px solid #000000'></td>
  </tr>
  <tr>
    <td width='20' style='border-bottom:1px solid #000000' height='26'></td>
    <td colspan='2' style='border-bottom:1px solid #000000' align='left' valign='bottom'><b><font face='Microsoft Himalaya' size='4' color='#000000'>༦། འཕར་འབུལ་ཞལ་འདེབས།</font></b></td>
    <td style='border-bottom:2px solid #000000' align='left' valign='bottom'>
      <b>
        <font face='Microsoft Himalaya' size='4' color='#000000'>
          སྒོར།<!-- --> <!-- -->{(receipt.nChatrelAdditionalDonationAmt.Value != null ? (sCurrencyCode + receipt.nChatrelAdditionalDonationAmt.Value) : 0 )}  
        </font>
      </b>
    </td>
    <td width='20' style='border-bottom:2px solid #000000'></td>
  </tr>
  <tr>
    <td width='20'></td>
    <td colSpan='3' height='10' align='left' valign='top'><font face='Microsoft Himalaya' size='4' color='#000000'></font></td>
    <td width='20'></td>
  </tr>
  <tr>
    <td width='20' height='34'></td>
    <td colspan='2' align='left' valign='bottom'>
      <font face='Microsoft Himalaya' size='4' color='#000000'>
        <b>བཅས་བསྡོམས་</b> <!-- -->
      </font>
    </td>
    <td align='left' style='padding-left:30px' valign='bottom'>
      <b>
        <font face='Microsoft Himalaya' size='4' color='#000000'>
          སྒོར<!-- --> 
        </font>
        <font size='4' color='#000000'>{    sCurrencyCode+" " + receipt.nChatrelTotalAmount.Value}</font>
      </b>
    </td>
    <td width='20'></td>
  </tr>
  <tr>
    <td width='20' height='31'></td>
    <td colspan='2' align='left' valign='middle'>
      <font face='Microsoft Himalaya' size='4' color='#000000'>
        <b>
          ཕྱི་ལོ  {sChatrelYears}  ལོའི་དཔྱ་དངུལ་འབུལ་འབབ་རྩིས་འབུལ་བྱུང་བའི་འཛིན་དུ།<!-- --> 
        </b>
      </font>
    </td>
        <td align='left'> <img src='data:image/png;base64,{qrcode}' width='100' height='100'></td>
    <td width='20'></td>
  </tr>
  <tr>
    <td width='20'></td>
    <td colSpan='3' height='32' align='left' valign='top'><font face='Microsoft Himalaya' size='4' color='#000000'></font></td>
    <td width='20'></td>
  </tr>
  <tr>
    <td width='20' height='33'></td>
    <td colspan='3' align='left' valign='middle'><font face='Microsoft Himalaya' size='4' color='#000000'><b>བོད་རིགས་སྤྱི་མཐུན་ཚོགས་པའམ་བོད་རིགས་ཚོགས་པའི་ལས་དམ་དང་མཚན་རྟགས།     ཕྱི་ལོ༌       ཟླ་       ཚེས་     ལ།</b></font></td>
    <td width='20'></td>
  </tr>
  <tr>
    <td width='20'></td>
    <td colSpan='3' height='16' align='left' valign='top'><font size='2' color='#000000'>This is computer generated Chatrel receipt, no signature required.</font></td>
    <td width='20'></td>
  </tr>
  <tr>
    <td width='20'></td>
    <td colSpan='3' height='16' align='left' valign='top'><font size='2' color='#000000'>You are advised to update chatrel contribution on your Greenbook from Office of Tibet or concerned Tibetan Association/Tibetan Community at your own convenience. </font></td>
    <td width='20'></td>
  </tr>
  <tr>
    <td width='20'></td>
    <td colSpan='3' height='16' align='left' valign='top'><font face='Microsoft Himalaya' size='4' color='#000000'></font></td>
    <td width='20'></td>
  </tr>
</table>
                            </body>
                        </html>";
            var objectSettings = new ObjectSettings
            {
                PagesCount = true,
                HtmlContent = sb,
                WebSettings = { DefaultEncoding = "utf-8" },
                //   HeaderSettings = { FontName = "Arial", FontSize = 9, Right = "Page [page] of [toPage]", Line = true },
                // FooterSettings = { FontName = "Arial", FontSize = 9, Line = true, Center = "Report Footer" }
            };
            var pdf = new HtmlToPdfDocument()
            {
                GlobalSettings = globalSettings,
                Objects = { objectSettings }
            };
           // _converter.Convert(pdf);
            var file = _converter.Convert(pdf);
           // return File(file, "application/pdf");
            return file;
            

        }

        public string QRCode(string sGBID, DateTime dtPayment, string sReceiptNumber, decimal nChatrelTotalAmount , string sPaymentCurrency,string sCountryID, DateTime? dtArrearesFrom = null, DateTime? dtArrearesTo = null)
        {
           
            var startYear = "";
            var endYear = "";
            if (dtPayment.Month < 4)
            {
                endYear = dtPayment.Year.ToString();
            }
            else
            {
                endYear = (dtPayment.Year + 1).ToString();
            }
            if (dtArrearesFrom == null) {
                if (dtPayment.Month < 4)
                {
                    startYear = (dtPayment.Year - 1).ToString();
                }
                else
                { 
                    startYear = dtPayment.Year.ToString();
                }
            }
            else
            {
                startYear = dtArrearesFrom?.Year.ToString();
               
            }
            var sChatrelYears = startYear + '-'+endYear;
            var sCurrencyCode = sPaymentCurrency=="USD" ? "$":"₹";
            
            string qrText = String.Format(@"GB ID: {6}{0}, Chatrel Amount: {1}{2}, Years of Chatrel: {3}, Receipt Number: {4}, Date: {5}", sGBID, sCurrencyCode, nChatrelTotalAmount.ToString(),sChatrelYears, sReceiptNumber ,dtPayment.ToString("dd-MM-yyyy"), sCountryID);
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
