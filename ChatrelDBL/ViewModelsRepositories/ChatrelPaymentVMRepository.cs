using ChatrelDBL.BaseClasses.Transactions;
using ChatrelDBL.QueryBuilder;
using ChatrelDBL.Repository;
using ChatrelDBL.ViewModels;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Text;

namespace ChatrelDBL.ViewModelsRepositories
{
    public class ChatrelPaymentVMRepository : ADORepository<ChatrelPaymentVM>
    {

        private static MySqlConnection _connection;
        #region Constructor
        public ChatrelPaymentVMRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);

        }
        #endregion

        public string Add(ChatrelPaymentVM chatrelPaymentVM)
        {

            _connection.Open();
            ChatrelPayment chatrelPayment = chatrelPaymentVM.chatrelPayment;
            IEnumerable<GBChatrel> chatrels = chatrelPaymentVM.gbChatrels;
            chatrelPayment.dtEntered = DateTime.Now;

            var builder = new SqlQueryBuilder<ChatrelPayment>(chatrelPayment);
            MySqlCommand command = builder.GetInsertCommand();


            MySqlTransaction transaction = _connection.BeginTransaction();
            command.Transaction = transaction;
            command.Connection = _connection;

            try
            {
                command.ExecuteNonQuery();
                foreach (var chatrel in chatrels)
                {
                    chatrel.dtEntered = DateTime.Now;
                    var cbuilder = new SqlQueryBuilder<GBChatrel>(chatrel);
                    command = cbuilder.GetInsertCommand();
                    command.Connection = _connection;
                    command.Transaction = transaction;
                    command.ExecuteNonQuery();
                }
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
