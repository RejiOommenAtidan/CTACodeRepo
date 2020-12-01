﻿using ChatrelDBL.BaseClasses.Transactions;
using ChatrelDBL.BaseClassRepositories.Transactions;
using ChatrelDBL.QueryBuilder;
using ChatrelDBL.Repository;
using ChatrelDBL.ViewModels;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
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


                chatrelPayment.dtEntered = DateTime.Now;
                chatrelPayment.dtPayment = DateTime.Now;
                chatrelPayment.dtUpdated = DateTime.Now;
                chatrelPayment.sPaymentStatus = ChatrelPayment.Success;
                greenbook.dtUpdated = DateTime.Now;
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
