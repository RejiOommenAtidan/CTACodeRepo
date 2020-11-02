using CTADBL.BaseClasses.Masters;
using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Masters;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Asn1;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Linq;

namespace CTADBL.BaseClassRepositories.Transactions
{
    public class ChatrelPaymentRepository : ADORepository<ChatrelPayment>
    {
        private GreenbookRepository _greenbookRepository;
        private ChatrelRepository _chatrelRepository;

        private int _nChatrelAmount;
        private int _nChatrelMeal;
        private int _nChatrelSalaryAmt;
        private int _nChatrelLateFeesPercentage;
        private int _nChatrelStartYear;
        private decimal _dLateFees;
        private int _FYStartMonth = 4;
        private int _FYStartDate = 1;
        private int _FYEndMonth = 3;
        private int _FYEndDate = 31;
        private int _currentYear = DateTime.Now.Year;


        #region Constructor
        public ChatrelPaymentRepository(string connectionString) : base(connectionString)
        {
            _greenbookRepository = new GreenbookRepository(connectionString);
            _chatrelRepository = new ChatrelRepository(connectionString);


            IEnumerable<Chatrel> chatrelValues = _chatrelRepository.GetAllChatrel();

            _nChatrelAmount = chatrelValues.Where(key => key.sChatrelKey == "ChatrelAmount").Select(key => key.nChatrelValue).FirstOrDefault();
            _nChatrelMeal = chatrelValues.Where(key => key.sChatrelKey == "ChatrelMeal").Select(key => key.nChatrelValue).FirstOrDefault();
            _nChatrelSalaryAmt = chatrelValues.Where(key => key.sChatrelKey == "ChatrelSalaryAmt").Select(key => key.nChatrelValue).FirstOrDefault();
            _nChatrelLateFeesPercentage = chatrelValues.Where(key => key.sChatrelKey == "ChatrelLateFeesPercentage").Select(key => key.nChatrelValue).FirstOrDefault();
            _nChatrelStartYear = chatrelValues.Where(key => key.sChatrelKey == "ChatrelStartYear").Select(key => key.nChatrelValue).FirstOrDefault() - 1;
            _dLateFees = (decimal)(_nChatrelAmount + _nChatrelMeal) * _nChatrelLateFeesPercentage / 100;

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


        #region Create Payment Record for a GBID
        public Object DisplayChatrelPayment(string sGBID)
        {
            Greenbook greenbook = _greenbookRepository.GetGreenbookByGBID(sGBID);
            int paidUntil = GetPaidUntil(sGBID);
            DateTime[] dates = GetDatesFromYear(paidUntil + 1);
            ChatrelPayment chatrelPayment = new ChatrelPayment
            {
                Id = -1,
                nchatrelAmount = _nChatrelAmount,
                nchatrelMeal = _nChatrelMeal,
                nchatrelLateFeesPercentage = _nChatrelLateFeesPercentage,
                nArrearsAmount = (int)CheckPendingAmount(sGBID),
                nAuthRegionID = greenbook.nAuthRegionID,
                sCountryID = greenbook.sCountryID,
                nchatrelYear = _currentYear,
                sGBId = sGBID,
                dtArrearsFrom = dates[0],
                dtArrearsTo = new DateTime(_currentYear, _FYEndMonth, _FYEndDate)
                
            };
            var result = new { chatrelPayment = chatrelPayment, gbChatrels = GetOutstandingDetails(greenbook) };
            return result;
        }
        #endregion


        #region GetOutstanding Details
        private IEnumerable<Object> GetOutstandingDetails(Greenbook greenbook)
        {
            int paidUntil = GetPaidUntil(greenbook.sGBID);
            int pendingYears = _currentYear - paidUntil;
            List<Object> list = new List<Object>();
            for (int i = 1; i < pendingYears; i++)
            {
                DateTime[] dates = GetDatesFromYear(paidUntil + i);
                DateTime start = dates[0];
                DateTime end = dates[1];
                var pending = new { nChatrelAmount = _nChatrelAmount, nChatrelMeal = _nChatrelMeal, nChatrelYear = paidUntil + i, nArrearsAmount = _dLateFees, dtArrearsFrom = start, dtArrearsTo = end, greenbook.nAuthRegionID, greenbook.sGBID, greenbook.sCountryID };

                list.Add(pending);
            }
            DateTime[] currDates = GetDatesFromYear(_currentYear);

            var current = new { nChatrelAmount = _nChatrelAmount, nChatrelMeal = _nChatrelMeal, nChatrelYear = _currentYear, dtDateFrom = currDates[0], dtDateTo = currDates[1], greenbook.nAuthRegionID, greenbook.sGBID, greenbook.sCountryID };
            list.Add(current);
            return list;
        }
        #endregion

        #region Get Financial year Dates from Year
        private DateTime[] GetDatesFromYear(int year)
        {
            DateTime s = new DateTime(year, _FYStartMonth, _FYStartDate);
            DateTime e = new DateTime(year + 1, _FYEndMonth, _FYEndDate);
            DateTime[] years = { s, e };
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
            decimal penalty = (arrears * _nChatrelLateFeesPercentage / 100);
            decimal totalDues = Math.Round(currentDues + arrears + penalty, 2);
            return totalDues;
        }
        #endregion

        #region Get Paid Until year
        private int GetPaidUntil(string sGBID)
        {
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
