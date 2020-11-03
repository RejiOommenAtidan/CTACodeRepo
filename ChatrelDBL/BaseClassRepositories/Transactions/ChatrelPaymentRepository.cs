using ChatrelDBL.BaseClasses.Masters;
using ChatrelDBL.BaseClasses.Transactions;
using ChatrelDBL.BaseClassRepositories.Masters;
using ChatrelDBL.QueryBuilder;
using ChatrelDBL.Repository;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Asn1;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace ChatrelDBL.BaseClassRepositories.Transactions
{
    public class ChatrelPaymentRepository : ADORepository<ChatrelPayment>
    {
        private GreenbookRepository _greenbookRepository;
        private ChatrelRepository _chatrelRepository;

        private int _nChatrelAmount;
        private int _nChatrelMeal;
        private int _nChatrelSalaryAmt;
        private int _nChatrelLateFeePercentage;
        private int _nChatrelStartYear;
        private decimal _dLateFees;
        private int _FYStartMonth = 4;
        private int _FYEndMonth = 3;
        private int _currentYear = DateTime.Now.Year;


        #region Constructor
        public ChatrelPaymentRepository(string connectionString) : base(connectionString)
        {
            _greenbookRepository = new GreenbookRepository(connectionString);
            _chatrelRepository = new ChatrelRepository(connectionString);


            IEnumerable<Chatrel> chatrelValues = _chatrelRepository.GetAllChatrel();
            _nChatrelAmount = chatrelValues.Where(key => key.sChatrelKey == "chatrelAmount").Select(key => key.nChatrelValue).FirstOrDefault();
            _nChatrelMeal = chatrelValues.Where(key => key.sChatrelKey == "chatrelMeal").Select(key => key.nChatrelValue).FirstOrDefault();
            _nChatrelSalaryAmt = chatrelValues.Where(key => key.sChatrelKey == "chatrelSalaryAmt").Select(key => key.nChatrelValue).FirstOrDefault();
            _nChatrelLateFeePercentage = chatrelValues.Where(key => key.sChatrelKey == "chatrelLateFeePercentage").Select(key => key.nChatrelValue).FirstOrDefault();
            _nChatrelStartYear = chatrelValues.Where(key => key.sChatrelKey == "chatrelStartYear").Select(key => key.nChatrelValue).FirstOrDefault();
            _dLateFees = (_nChatrelAmount + _nChatrelMeal) * _nChatrelLateFeePercentage / 100;

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



        #region Split Successful payment received into pending years
        public IEnumerable<GBChatrel> SplitChatrelPaymentReceived(ChatrelPayment payment)
        {
            return null;

        }
        #endregion


        #region Public Create Payment Record for a GBID
        public Object DisplayChatrelPayment(string sGBID)
        {
            Greenbook greenbook = _greenbookRepository.GetGreenbookByGBID(sGBID);
            ChatrelPayment chatrelPayment = new ChatrelPayment
            {
                Id = -1,
                nArrearsAmount = (int)CheckPendingAmount(sGBID),
                nAuthRegionID = greenbook.nAuthRegionID,
                //sCountryID = greenbook.sCountryID,
                nchatrelYear = _currentYear

            };
            var result = new { chatrelPayment = chatrelPayment, outstandingDetails = GetOutstandingDetails(sGBID) };
            return result;
        }
        #endregion


        #region GetOutstanding Details
        private IEnumerable<Object> GetOutstandingDetails(string sGBID)
        {
            int paidUntil = GetPaidUntil(sGBID);
            int pendingYears = _currentYear - paidUntil;
            List<Object> list = new List<Object>();
            for (int i = 1; i < pendingYears; i++)
            {
                string[] dates = GetDatesFromYear(paidUntil + i);
                string start = dates[0];
                string end = dates[1];
                var pending = new { nChatrelAmount = _nChatrelAmount, nChatrelMeal = _nChatrelMeal, nChatrelYear = paidUntil + i, dLateFees = _dLateFees, startDate = start, endDate = end };

                list.Add(pending);
            }
            string[] currDates = GetDatesFromYear(_currentYear);

            var current = new { nChatrelAmount = _nChatrelAmount, nChatrelMeal = _nChatrelMeal, nChatrelYear = _currentYear, dLateFees = _dLateFees, startDate = currDates[0], endDate = currDates[1] };
            list.Add(current);
            return list;
        }
        #endregion

        #region Get Financial year Dates from Year
        private string[] GetDatesFromYear(int year)
        {
            string start = String.Format("01/04/{0}", year);
            string end = String.Format("31/03/{0}", year + 1);
            string[] years = { start, end };
            return years;
        }
        #endregion

        #region Check Pending Amount
        private decimal CheckPendingAmount(string sGBID)
        {

            int paidUntil = GetPaidUntil(sGBID);
            int pendingYears = _currentYear - paidUntil;
            decimal currentDues = _nChatrelAmount + _nChatrelMeal;
            decimal arrears = (pendingYears) * (_nChatrelAmount + _nChatrelMeal);
            decimal penalty = (arrears * _nChatrelLateFeePercentage / 100);
            decimal totalDues = Math.Round(currentDues + arrears + penalty, 2);
            return totalDues;
        }
        #endregion

        #region Get Paid Until year
        private int GetPaidUntil(string sGBID)
        {
            int currentYear = DateTime.Today.Year;
            int paidUntil = Convert.ToInt32(_greenbookRepository.GetGreenbookByGBID(sGBID).sPaidUntil);

            paidUntil = (paidUntil < _nChatrelStartYear ? _nChatrelStartYear : paidUntil);



            return paidUntil;
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
                command.Parameters.AddWithValue("limit", Convert.ToInt32(ChatrelConfigRepository.GetValueByKey("SelectTotalRecordCount")));
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
