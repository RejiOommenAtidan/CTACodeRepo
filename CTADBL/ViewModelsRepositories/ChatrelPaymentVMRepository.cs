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
            Greenbook greenbook = _greenBookRepository.GetGreenbookByGBID(chatrelPayment.sGBId);
            
            if(chatrelPayment.sPaymentMode == ChatrelPayment.Online)
            {
                chatrelPayment.sChatrelReceiptNumber = GenerateReceiptNo();
            }
            
            
            chatrelPayment.dtEntered = DateTime.Now;
            chatrelPayment.dtPayment = DateTime.Now;
            chatrelPayment.dtUpdated = DateTime.Now;
            chatrelPayment.sPaymentStatus = ChatrelPayment.Success;
            greenbook.dtUpdated = DateTime.Now;
            greenbook.sPaidUntil = chatrelPayment.nChatrelYear.ToString();

            foreach (var chatrel in chatrels)
            {
                chatrel.sChatrelReceiptNumber = chatrelPayment.sChatrelReceiptNumber;
                //chatrel.sGBId = chatrelPayment.sGBId;
                chatrel.sPaidByGBId = chatrelPayment.sPaidByGBId;
                //chatrel.nChatrelLateFeesPercentage = chatrelPayment.nChatrelLateFeesPercentage;
                chatrel.dtPayment = chatrelPayment.dtPayment;
                chatrel.nEnteredBy = chatrelPayment.nEnteredBy;
                chatrel.dtEntered = DateTime.Now;
                chatrel.dtUpdated = DateTime.Now;
            }
            
            var builder = new SqlQueryBuilder<ChatrelPayment>(chatrelPayment);
            MySqlCommand command =  builder.GetInsertCommand();

            _connection.Open();
            MySqlTransaction transaction = _connection.BeginTransaction();
            command.Transaction = transaction;
            command.Connection = _connection;
            
            try
            {
                command.ExecuteNonQuery();
                long id = command.LastInsertedId;
                foreach (var chatrel in chatrels)
                {
                    chatrel.chatrelpaymentID = Convert.ToInt32(id);
                    var cbuilder = new SqlQueryBuilder<GBChatrel>(chatrel);
                    command.CommandText = cbuilder.GetInsertCommand().CommandText;
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
                catch(MySqlException mysqlException)
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
