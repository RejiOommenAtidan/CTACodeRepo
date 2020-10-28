using CTADBL.BaseClasses.Masters;
using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Masters;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace CTADBL.BaseClassRepositories.Transactions
{
    public class ChatrelPaymentRepository : ADORepository<ChatrelPayment>
    {
        private GreenbookRepository _greenbookRepository;
        private ChatrelRepository _chatrelRepository;

        private int chatrelAmount;
        private int chatrelMeal;
        private int chatrelSalaryAmt;
        private int chatrelLateFeePercentage;
        private int chatrelStartYear;


        #region Constructor
        public ChatrelPaymentRepository(string connectionString) : base(connectionString)
        {
            _greenbookRepository = new GreenbookRepository(connectionString);
            _chatrelRepository = new ChatrelRepository(connectionString);


            IEnumerable<Chatrel> chatrelValues = _chatrelRepository.GetAllChatrel();
            chatrelAmount = chatrelValues.Where(key => key.sChatrelKey == "chatrelAmount").Select(key => key.nChatrelValue).FirstOrDefault();
            chatrelMeal = chatrelValues.Where(key => key.sChatrelKey == "chatrelMeal").Select(key => key.nChatrelValue).FirstOrDefault();
            chatrelSalaryAmt = chatrelValues.Where(key => key.sChatrelKey == "chatrelSalaryAmt").Select(key => key.nChatrelValue).FirstOrDefault();
            chatrelLateFeePercentage = chatrelValues.Where(key => key.sChatrelKey == "chatrelLateFeePercentage").Select(key => key.nChatrelValue).FirstOrDefault();
            chatrelStartYear = chatrelValues.Where(key => key.sChatrelKey == "chatrelStartYear").Select(key => key.nChatrelValue).FirstOrDefault();
        }
        #endregion

        #region Add Call
        public int Add(ChatrelPayment chatrelPayment)
        {


            var builder = new SqlQueryBuilder<ChatrelPayment>(chatrelPayment);
            return ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Update Call
        public void Update(ChatrelPayment chatrelPayment)
        {
            var builder = new SqlQueryBuilder<ChatrelPayment>(chatrelPayment);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion



        #region Split into multiple years
        public IEnumerable<GBChatrel> SplitChatrel(ChatrelPayment payment)
        {
            return null;

        }
        #endregion


        #region GetOutstanding Details

        public Object GetOutstandingDetails(string sGBID)
        {
            int pendingYears = GetPendingYears(sGBID);
            for(int i = 0; i < pendingYears; i++)
            {
                
            }
            return null;
        }

        #endregion

        #region
        public decimal CheckPendingAmount(string sGBID)
        {

            int pendingYears = GetPendingYears(sGBID);

            decimal currentDues = chatrelAmount + chatrelMeal;
            decimal arrears = (pendingYears) * (chatrelAmount + chatrelMeal);
            decimal penalty = (arrears * chatrelLateFeePercentage / 100);
            
            decimal totalDues = Math.Round(currentDues + arrears + penalty, 2);
            return totalDues;
        }

        #endregion

        #region

        private int GetPendingYears(string sGBID)
        {
            int currentYear = DateTime.Today.Year;
            int paidUntil = Convert.ToInt32(_greenbookRepository.GetGreenbookByGBID(sGBID).sPaidUntil);

            paidUntil = (paidUntil < chatrelStartYear ? chatrelStartYear : paidUntil);
            
            int pendingYears = currentYear - paidUntil;
            
            return pendingYears;
        }

        #endregion


        //#region Delete Call
        //public void Delete(ChatrelPayment chatrelPayment)
        //{
        //    var builder = new SqlQueryBuilder<ChatrelPayment>(chatrelPayment);
        //    ExecuteCommand(builder.GetDeleteCommand());
        //}
        //#endregion

        #region Get Calls

        public IEnumerable<ChatrelPayment> GetAllChatrelPayments()
        {
            string sql = @"SELECT `tblchatrelpayment`.`Id`,
                            `tblchatrelpayment`.`sGBId`,
                            `tblchatrelpayment`.`nchatrelAmount`,
                            `tblchatrelpayment`.`nchatrelMeal`,
                            `tblchatrelpayment`.`nchatrelYear`,
                            `tblchatrelpayment`.`nchatrelLateFeesPercentage`,
                            `tblchatrelpayment`.`nArrearsAmount`,
                            `tblchatrelpayment`.`dtArrearsFrom`,
                            `tblchatrelpayment`.`dtArrearsTo`,
                            `tblchatrelpayment`.`nchatrelSalaryAmt`,
                            `tblchatrelpayment`.`dtchatrelSalaryFrom`,
                            `tblchatrelpayment`.`dtchatrelSalaryTo`,
                            `tblchatrelpayment`.`nchatrelBusinessDonationAmt`,
                            `tblchatrelpayment`.`nchatrelTotalAmount`,
                            `tblchatrelpayment`.`nchatrelRecieptNumber`,
                            `tblchatrelpayment`.`nAuthRegionID`,
                            `tblchatrelpayment`.`sCountryID`,
                            `tblchatrelpayment`.`sPaymentStatus`,
                            `tblchatrelpayment`.`sPaymentMode`,
                            `tblchatrelpayment`.`sPaymentCurrency`,
                            `tblchatrelpayment`.`dtEntered`,
                            `tblchatrelpayment`.`nEnteredBy`
                        FROM `ctadb`.`tblchatrelpayment`
                        LIMIT @limit;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("limit", Convert.ToInt32(CTAConfigRepository.GetValueByKey("SelectTotalRecordCount")));
                return GetRecords(command);
            }
    
        }

        public ChatrelPayment GetChatrelPayment(string Id)
        {
            string sql = @"SELECT `tblchatrelpayment`.`Id`,
                            `tblchatrelpayment`.`sGBId`,
                            `tblchatrelpayment`.`nchatrelAmount`,
                            `tblchatrelpayment`.`nchatrelMeal`,
                            `tblchatrelpayment`.`nchatrelYear`,
                            `tblchatrelpayment`.`nchatrelLateFeesPercentage`,
                            `tblchatrelpayment`.`nArrearsAmount`,
                            `tblchatrelpayment`.`dtArrearsFrom`,
                            `tblchatrelpayment`.`dtArrearsTo`,
                            `tblchatrelpayment`.`nchatrelSalaryAmt`,
                            `tblchatrelpayment`.`dtchatrelSalaryFrom`,
                            `tblchatrelpayment`.`dtchatrelSalaryTo`,
                            `tblchatrelpayment`.`nchatrelBusinessDonationAmt`,
                            `tblchatrelpayment`.`nchatrelTotalAmount`,
                            `tblchatrelpayment`.`nchatrelRecieptNumber`,
                            `tblchatrelpayment`.`nAuthRegionID`,
                            `tblchatrelpayment`.`sCountryID`,
                            `tblchatrelpayment`.`sPaymentStatus`,
                            `tblchatrelpayment`.`sPaymentMode`,
                            `tblchatrelpayment`.`sPaymentCurrency`,
                            `tblchatrelpayment`.`dtEntered`,
                            `tblchatrelpayment`.`nEnteredBy`
                        FROM `ctadb`.`tblchatrelpayment`
                        WHERE Id = @Id";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("Id", Id);
                return GetRecord(command);
            }
        }


        public IEnumerable<ChatrelPayment> GetChatrelPaymentByGBID(string sGBID)
        {
            string sql = @"SELECT `tblchatrelpayment`.`Id`,
                            `tblchatrelpayment`.`sGBId`,
                            `tblchatrelpayment`.`nchatrelAmount`,
                            `tblchatrelpayment`.`nchatrelMeal`,
                            `tblchatrelpayment`.`nchatrelYear`,
                            `tblchatrelpayment`.`nchatrelLateFeesPercentage`,
                            `tblchatrelpayment`.`nArrearsAmount`,
                            `tblchatrelpayment`.`dtArrearsFrom`,
                            `tblchatrelpayment`.`dtArrearsTo`,
                            `tblchatrelpayment`.`nchatrelSalaryAmt`,
                            `tblchatrelpayment`.`dtchatrelSalaryFrom`,
                            `tblchatrelpayment`.`dtchatrelSalaryTo`,
                            `tblchatrelpayment`.`nchatrelBusinessDonationAmt`,
                            `tblchatrelpayment`.`nchatrelTotalAmount`,
                            `tblchatrelpayment`.`nchatrelRecieptNumber`,
                            `tblchatrelpayment`.`nAuthRegionID`,
                            `tblchatrelpayment`.`sCountryID`,
                            `tblchatrelpayment`.`sPaymentStatus`,
                            `tblchatrelpayment`.`sPaymentMode`,
                            `tblchatrelpayment`.`sPaymentCurrency`,
                            `tblchatrelpayment`.`dtEntered`,
                            `tblchatrelpayment`.`nEnteredBy`
                        FROM `ctadb`.`tblchatrelpayment`
                        WHERE sGBID = @sGBID";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBID", sGBID);
                return GetRecords(command);
            }
        }

        #endregion

        #region Populate records

        public override ChatrelPayment PopulateRecord(MySqlDataReader reader)
        {
            ChatrelPayment chatrelPayment = new ChatrelPayment
            {
                Id = (int)reader["Id"],
                sGBId = reader.IsDBNull("sGBId") ? null : (string)reader["sGBId"],
                nchatrelAmount = reader.IsDBNull("nArrearsAmount") ? null : (int?)reader["nArrearsAmount"],
                nchatrelMeal = reader.IsDBNull("nchatrelMeal") ? null : (int?)reader["nchatrelMeal"],
                nchatrelYear = reader.IsDBNull("nchatrelYear") ? null : (int?)reader["nchatrelYear"],
                nchatrelLateFeesPercentage = reader.IsDBNull("nchatrelLateFeesPercentage") ? null : (int?)reader["nchatrelLateFeesPercentage"],
                nArrearsAmount = reader.IsDBNull("nArrearsAmount") ? null : (int?)reader["nArrearsAmount"],
                dtArrearsFrom = reader.IsDBNull("dtArrearsFrom") ? null : (DateTime?)(reader["dtArrearsFrom"]),
                dtArrearsTo = reader.IsDBNull("dtArrearsFrom") ? null : (DateTime?)(reader["dtArrearsFrom"]),
                nchatrelSalaryAmt = reader.IsDBNull("nchatrelSalaryAmt") ? null : (int?)reader["nchatrelSalaryAmt"],
                dtchatrelSalaryFrom = reader.IsDBNull("dtArrearsFrom") ? null : (DateTime?)(reader["dtArrearsFrom"]),
                dtchatrelSalaryTo = reader.IsDBNull("dtArrearsFrom") ? null : (DateTime?)(reader["dtArrearsFrom"]),
                nchatrelBusinessDonationAmt = reader.IsDBNull("nchatrelBusinessDonationAmt") ? null : (int?)reader["nchatrelBusinessDonationAmt"],
                nchatrelTotalAmount = reader.IsDBNull("nchatrelTotalAmount") ? null : (int?)reader["nchatrelTotalAmount"],
                nchatrelRecieptNumber = reader.IsDBNull("nArrearsAmount") ? null : (int?)reader["nArrearsAmount"],
                nAuthRegionID = reader.IsDBNull("nAuthRegionID") ? null : (int?)reader["nAuthRegionID"],
                sCountryID = reader.IsDBNull("sCountryID") ? null : (string)reader["sCountryID"],
                sPaymentStatus = reader.IsDBNull("sPaymentStatus") ? null : (string)reader["sPaymentStatus"],
                sPaymentMode = reader.IsDBNull("sPaymentMode") ? null : (string)reader["sPaymentMode"],
                sPaymentCurrency = reader.IsDBNull("sPaymentCurrency") ? null : (string)reader["sPaymentCurrency"],
                dtEntered = reader.IsDBNull("dtArrearsFrom") ? null : (DateTime?)(reader["dtArrearsFrom"]),
                nEnteredBy = (int)reader["nEnteredBy"]
            };
            return chatrelPayment;
        }
        #endregion
    }
}
