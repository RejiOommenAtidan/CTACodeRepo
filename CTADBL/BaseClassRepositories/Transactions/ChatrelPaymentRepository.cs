using CTADBL.BaseClasses.Masters;
using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Masters;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using CTADBL.ViewModelsRepositories;
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
        private AuthRegionRepository _authRegionRepository;
        private GBRelationVMRepository _gbRelationVMRepository;
        private static MySqlConnection _connection;

        private decimal _nChatrelAmount;
        private decimal _nChatrelMeal;
        private decimal _nChatrelSalaryAmt;
        private int _nChatrelLateFeesPercentage;
        private int _nChatrelStartYear;
        private decimal _dLateFees;
        private int _FYStartMonth = 4;
        private int _FYStartDate = 1;
        private int _FYEndMonth = 3;
        private int _FYEndDate = 31;
        private int _currentYear = DateTime.Now.Month <= 3 ? DateTime.Now.Year - 1 : DateTime.Now.Year;
        private bool inGracePeriod = DateTime.Now.Month > 3 && DateTime.Now.Month < 5;


        #region Constructor
        public ChatrelPaymentRepository(string connectionString) : base(connectionString)
        {
            _greenbookRepository = new GreenbookRepository(connectionString);
            _chatrelRepository = new ChatrelRepository(connectionString);
            _authRegionRepository = new AuthRegionRepository(connectionString);
            _connection = new MySqlConnection(connectionString);

            IEnumerable<Chatrel> chatrelValues = _chatrelRepository.GetAllChatrel();

            _nChatrelAmount = chatrelValues.Where(key => key.sChatrelKey == "ChatrelAmount").Select(key => key.nChatrelValue).FirstOrDefault();
            _nChatrelMeal = chatrelValues.Where(key => key.sChatrelKey == "ChatrelMeal").Select(key => key.nChatrelValue).FirstOrDefault();
            _nChatrelSalaryAmt = chatrelValues.Where(key => key.sChatrelKey == "ChatrelSalaryAmt").Select(key => key.nChatrelValue).FirstOrDefault();
            _nChatrelLateFeesPercentage = chatrelValues.Where(key => key.sChatrelKey == "ChatrelLateFeesPercentage").Select(key => key.nChatrelValue).FirstOrDefault();
            _nChatrelStartYear = chatrelValues.Where(key => key.sChatrelKey == "ChatrelStartYear").Select(key => key.nChatrelValue).FirstOrDefault() - 1;
            _dLateFees = (_nChatrelAmount + _nChatrelMeal) * _nChatrelLateFeesPercentage / 100;

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


        #region Display Payment Record for a GBID
        public Object DisplayChatrelPayment(string sGBID)
        {
            Greenbook greenbook = _greenbookRepository.GetGreenbookByGBID(sGBID);
            AuthRegion authRegion = _authRegionRepository.GetAuthRegionById(greenbook.nAuthRegionID.ToString());
            int paidUntil = GetPaidUntil(sGBID);
            int pendingYears = _currentYear - paidUntil;
            if (pendingYears <= 0)
            {
                return ("No Outstandings");
            }
            decimal arrears = CheckPendingAmount(sGBID);
            DateTime?[] dates = { null, null };
            if(arrears > 0)
            {
                dates = GetDatesFromYear(paidUntil + 1);
                dates[1] = new DateTime(_currentYear, _FYEndMonth, _FYEndDate);
            }
            
            ChatrelPayment chatrelPayment = new ChatrelPayment
            {
                Id = -1,
                nChatrelAmount = decimal.Round(_nChatrelAmount,2),
                nChatrelMeal = _nChatrelMeal,
                nChatrelLateFeesPercentage = _nChatrelLateFeesPercentage,
                nChatrelSalaryAmt = 0,
                nArrearsAmount = CheckPendingAmount(sGBID),
                nChatrelTotalAmount = _nChatrelAmount + _nChatrelMeal + arrears,
                nAuthRegionID = greenbook.nAuthRegionID,
                sCountryID = authRegion.sCountryID,
                nChatrelYear = _currentYear,
                sGBId = sGBID,
                dtArrearsFrom = dates[0],
                dtArrearsTo = dates[1]
                
            };
            var result = new { nPaidUntil = new DateTime(paidUntil+1, _FYEndMonth, _FYEndDate), sName = String.Format("{0} {1}", greenbook.sFirstName, greenbook.sLastName),  chatrelPayment = chatrelPayment, gbChatrels = GetOutstandingDetails(greenbook, authRegion) };
            return result;
        }
        #endregion


        #region GetOutstanding Details
        private IEnumerable<Object> GetOutstandingDetails(Greenbook greenbook, AuthRegion authRegion)
        {
            int paidUntil = GetPaidUntil(greenbook.sGBID);
            int pendingYears = _currentYear - paidUntil;
            List<Object> list = new List<Object>();
            for (int i = 1; i < pendingYears; i++)
            {
                DateTime?[] dates = GetDatesFromYear(paidUntil + i);
                DateTime? start = dates[0];
                DateTime? end = dates[1];
                if (i == (pendingYears - 1) && inGracePeriod)
                {
                    var gracepending = new { nChatrelYear = paidUntil + i, nChatrelAmount = _nChatrelAmount, nChatrelMeal = _nChatrelMeal, nChatrelSalaryAmt = 0, lateFees = 0, nArrearsAmount = (_nChatrelAmount + _nChatrelMeal), nChatrelTotalAmount = (_nChatrelAmount + _nChatrelMeal + _dLateFees), dtArrearsFrom = start, dtArrearsTo = end, greenbook.nAuthRegionID, greenbook.sGBID, authRegion.sCountryID };
                    list.Add(gracepending);
                    continue;
                }
                var pending = new { nChatrelYear = paidUntil + i, nChatrelAmount = _nChatrelAmount, nChatrelMeal = _nChatrelMeal, nChatrelSalaryAmt = 0, lateFees = _dLateFees, nArrearsAmount = (_nChatrelAmount + _nChatrelMeal + _dLateFees),  nChatrelTotalAmount = (_nChatrelAmount + _nChatrelMeal + _dLateFees), dtArrearsFrom = start, dtArrearsTo = end,  greenbook.nAuthRegionID, greenbook.sGBID, authRegion.sCountryID };

                // Check if we are in grace period in the previous year to current.

               
                list.Add(pending);
            }
            DateTime?[] currDates = GetDatesFromYear(_currentYear);

            var current = new { nChatrelAmount = _nChatrelAmount, nChatrelMeal = _nChatrelMeal, nChatrelYear = _currentYear, lateFees = 0, nChatrelTotalAmount = (_nChatrelAmount + _nChatrelMeal), dtDateFrom = currDates[0], dtDateTo = currDates[1], nChatrelSalaryAmt = 0, greenbook.nAuthRegionID, greenbook.sGBID, authRegion.sCountryID };
            list.Add(current);
            return list;
        }
        #endregion

        #region Get Financial year Dates from Year
        private DateTime?[] GetDatesFromYear(int year)
        {
            DateTime? s = new DateTime(year, _FYStartMonth, _FYStartDate);
            DateTime? e = new DateTime(year + 1, _FYEndMonth, _FYEndDate);
            DateTime?[] years = { s, e };
            return years;
        }
        #endregion

        #region Check Pending Amount
        private decimal CheckPendingAmount(string sGBID)
        {

            int paidUntil = GetPaidUntil(sGBID);
            int pendingYears = (_currentYear - 1) - paidUntil;
            //decimal currentDues = _nChatrelAmount + _nChatrelMeal;
            decimal arrears = (pendingYears) * (_nChatrelAmount + _nChatrelMeal);
            decimal penalty = 0.00m;
            if(inGracePeriod)
            {
                penalty = ((pendingYears - 1) * (_nChatrelAmount + _nChatrelMeal) * _nChatrelLateFeesPercentage / 100);
            }
            else
            {
                penalty = ((pendingYears) * (_nChatrelAmount + _nChatrelMeal) * _nChatrelLateFeesPercentage / 100);
            }
            
            decimal totalDues = Math.Round(arrears + penalty, 2);
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

        #region Get Family details
        public IEnumerable<Object> GetFamilyDetails(string sGBID)
        {
            string sql = @"SELECT frel.sGBIDRelation,
                                   gb1.sfirstname AS sName,
                                   gb1.dtDOB,
                                   TIMESTAMPDIFF(YEAR, gb1.dtDOB, CURDATE()) AS nAge,
                                   gb1.sPaidUntil,
                                   CASE
                                     WHEN frel.nrelationid = 1 THEN 'Father'
                                     WHEN frel.nrelationid = 2 THEN 'Mother'
                                     WHEN frel.nrelationid = 3 THEN 'Spouse'
                                   END 
                                   AS sRelation
                            FROM   lnkgbrelation AS frel
                                   LEFT JOIN tblgreenbook AS gb
                                          ON gb.sgbid = frel.sgbid
                                   LEFT JOIN tblgreenbook AS gb1
                                          ON frel.sgbidrelation = gb1.sgbid
                            WHERE  gb.sgbid = @sGBID
                            UNION
                            SELECT child.sgbidchild,
                                   child.sname,
                                   child.dtdob,
                                   TIMESTAMPDIFF(YEAR, child.dtdob, CURDATE()) AS nAge,
                                   gb1.spaiduntil,
                                   CASE
                                     WHEN child.sgender = 'M' THEN 'Son'
                                     WHEN child.sgender = 'F' THEN 'Daughter'
                                   end AS Relation
                            FROM   lnkgbchildren AS child
                                   LEFT JOIN tblgreenbook AS gb
                                          ON gb.sgbid = child.sgbidparent
                                   LEFT JOIN tblgreenbook AS gb1
                                          ON child.sgbidchild = gb1.sgbid
                            WHERE  gb.sgbid = @sGBID; ";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBID", sGBID);
                command.Connection = _connection;
                command.CommandType = CommandType.Text;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                if(tables != null && tables.Count > 0)
                {
                    var relationDetails = tables[0].AsEnumerable().Select(row => new {
                        sGBIDRelation = row.Field<string>("sGBIDRelation"),
                        sName = row.Field<string>("sName"),
                        dtDOB = row.Field<DateTime?>("dtDOB"),
                        nAge = row.Field<int>("nAge"),
                        sPaidUntil = row.Field<string>("sPaidUntil"),
                        sRelation = row.Field<string>("sRelation"),
                    }).ToList();
                    return relationDetails;
                }
                return null;
            }

            

        }
        #endregion

        #region Get Payment History
        
        public IEnumerable<Object> GetPaymentHistory(string sGBID)
        {
            string sql = @"SELECT   pymt.nChatrelRecieptNumber,
                                    pymt.dtEntered,
                                    pymt.dtArrearsFrom AS dtPeriodFrom,
                                    STR_TO_DATE(CONCAT(pymt.nChatrelYear, '-03', '-31'), '%Y-%m-%d') AS dtPeriodTo,
                                    gb.sFirstName,
                                    CASE
                                                WHEN lnkrel.nRelationID = 1 THEN 'Father'
                                                WHEN lnkrel.nRelationID = 2 THEN 'Mother'
                                                WHEN lnkrel.nRelationID = 3 THEN 'Spouse'
                                                WHEN pymt.sGBId = pymt.sPaidByGBId THEN 'Self'
                                                ELSE 'Friend'
                                    END
                                    AS sRelation
                        FROM       tblchatrelpayment AS pymt
                        INNER JOIN tblgreenbook      AS gb
                        ON         pymt.sGBId = gb.sGBId
                        LEFT JOIN  lnkgbrelation AS lnkrel
                        ON         lnkrel.sGBID = pymt.sPaidByGBId
                        AND        lnkrel.sGBIDRelation = pymt.sGBID
                        WHERE      pymt.sPaidByGBId = @sGBID;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBID", sGBID);
                command.Connection = _connection;
                command.CommandType = CommandType.Text;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                if (tables != null && tables.Count > 0)
                {
                    var paymentHistory = tables[0].AsEnumerable().Select(row => new {
                        nChatrelRecieptNumber = row.Field<int>("nChatrelRecieptNumber"),
                        dtEntered = row.Field<DateTime>("dtEntered"),
                        dtPeriodFrom = row.Field<DateTime>("dtPeriodFrom"),
                        dtPeriodTo = row.Field<DateTime>("dtPeriodTo"),
                        sFirstName = row.Field<string>("sFirstName"),
                        sRelation = row.Field<string>("sRelation")
                    }).ToList();
                    return paymentHistory;
                }
                return null;
            }



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
                nChatrelAmount = reader.IsDBNull("nChatrelAmount") ? null : (decimal?)reader["nChatrelAmount"],
                nChatrelMeal = reader.IsDBNull("nchatrelMeal") ? null : (decimal?)reader["nchatrelMeal"],
                nChatrelYear = reader.IsDBNull("nchatrelYear") ? null : (int?)reader["nchatrelYear"],
                nChatrelLateFeesPercentage = reader.IsDBNull("nchatrelLateFeesPercentage") ? null : (int?)reader["nchatrelLateFeesPercentage"],
                nArrearsAmount = reader.IsDBNull("nArrearsAmount") ? null : (decimal?)reader["nArrearsAmount"],
                dtArrearsFrom = reader.IsDBNull("dtArrearsFrom") ? null : (DateTime?)(reader["dtArrearsFrom"]),
                dtArrearsTo = reader.IsDBNull("dtArrearsTo") ? null : (DateTime?)(reader["dtArrearsTo"]),
                nChatrelSalaryAmt = reader.IsDBNull("nchatrelSalaryAmt") ? null : (decimal?)reader["nchatrelSalaryAmt"],
                dtChatrelSalaryFrom = reader.IsDBNull("dtChatrelSalaryFrom") ? null : (DateTime?)(reader["dtChatrelSalaryFrom"]),
                dtChatrelSalaryTo = reader.IsDBNull("dtChatrelSalaryTo") ? null : (DateTime?)(reader["dtChatrelSalaryTo"]),
                nChatrelAdditionalDonationAmt = reader.IsDBNull("nChatrelAdditionalDonationAmt") ? null : (decimal?)reader["nChatrelAdditionalDonationAmt"],
                nChatrelBusinessDonationAmt = reader.IsDBNull("nchatrelBusinessDonationAmt") ? null : (decimal?)reader["nchatrelBusinessDonationAmt"],
                nChatrelTotalAmount = reader.IsDBNull("nchatrelTotalAmount") ? null : (decimal?)reader["nchatrelTotalAmount"],
                nChatrelRecieptNumber = reader.IsDBNull("nChatrelRecieptNumber") ? null : (int?)reader["nChatrelRecieptNumber"],
                nAuthRegionID = reader.IsDBNull("nAuthRegionID") ? null : (int?)reader["nAuthRegionID"],
                sCountryID = reader.IsDBNull("sCountryID") ? null : (string)reader["sCountryID"],
                sPaymentStatus = reader.IsDBNull("sPaymentStatus") ? null : (string)reader["sPaymentStatus"],
                sPaymentMode = reader.IsDBNull("sPaymentMode") ? null : (string)reader["sPaymentMode"],
                sPaymentCurrency = reader.IsDBNull("sPaymentCurrency") ? null : (string)reader["sPaymentCurrency"],
                dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"]),
                nEnteredBy = (int)reader["nEnteredBy"]
            };
            return chatrelPayment;
        }
        #endregion
    }
}
