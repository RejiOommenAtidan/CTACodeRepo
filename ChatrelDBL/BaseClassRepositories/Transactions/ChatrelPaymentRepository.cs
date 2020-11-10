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
        private AuthRegionRepository _authRegionRepository;
        private static MySqlConnection _connection;

        private decimal _nChatrelAmount, _nChatrelAmountUSD, _nChatrelAmountINR;
        private decimal _nChatrelMeal, _nChatrelMealUSD, _nChatrelMealINR;
        private decimal _nChatrelSalaryAmt, _nChatrelSalaryAmtUSD, _nChatrelSalaryAmtINR;
        private decimal _nChatrelChildAmt, _nChatrelChildAmtUSD, _nChatrelChildAmtINR;
        private int _nChatrelLateFeesPercentage, _nChatrelLateFeesPercentageUSD, _nChatrelLateFeesPercentageINR;
        private int _nChatrelStartYear;
        private decimal _dLateFees;
        private int _FYStartMonth = 4;
        private int _FYStartDate = 1;
        private int _FYEndMonth = 3;
        private int _FYEndDate = 31;
        private int _currentYear = DateTime.Now.Month <= 3 ? DateTime.Now.Year - 1 : DateTime.Now.Year;
        private bool inGracePeriod = DateTime.Now.Month > 3 && DateTime.Now.Month < 5;
        private decimal _nPending = 0.00m;
        private enum Status { Adult = 1, TurningAdult, Child }


        #region Constructor
        public ChatrelPaymentRepository(string connectionString) : base(connectionString)
        {
            _greenbookRepository = new GreenbookRepository(connectionString);
            _chatrelRepository = new ChatrelRepository(connectionString);
            _authRegionRepository = new AuthRegionRepository(connectionString);
            _connection = new MySqlConnection(connectionString);

            IEnumerable<Chatrel> chatrelValues = _chatrelRepository.GetAllChatrel();

            _nChatrelAmountUSD = chatrelValues.Where(key => key.sChatrelKey == "USDYearChatrelAmount").Select(key => key.nChatrelValue).FirstOrDefault();
            _nChatrelMealUSD = chatrelValues.Where(key => key.sChatrelKey == "USDYearChatrelMeal").Select(key => key.nChatrelValue).FirstOrDefault();
            _nChatrelSalaryAmtUSD = chatrelValues.Where(key => key.sChatrelKey == "USDYearChatrelSalaryAmt").Select(key => key.nChatrelValue).FirstOrDefault();
            _nChatrelLateFeesPercentageUSD = chatrelValues.Where(key => key.sChatrelKey == "USDChatrelLateFeesPercentage").Select(key => key.nChatrelValue).FirstOrDefault();
            _nChatrelChildAmtUSD = chatrelValues.Where(key => key.sChatrelKey == "USDChildMonthChatrelAmount").Select(key => key.nChatrelValue).FirstOrDefault();

            _nChatrelAmountINR = chatrelValues.Where(key => key.sChatrelKey == "INRYearChatrelAmount").Select(key => key.nChatrelValue).FirstOrDefault();
            _nChatrelMealINR = chatrelValues.Where(key => key.sChatrelKey == "INRYearChatrelMeal").Select(key => key.nChatrelValue).FirstOrDefault();
            _nChatrelSalaryAmtINR = chatrelValues.Where(key => key.sChatrelKey == "INRYearChatrelSalaryAmt").Select(key => key.nChatrelValue).FirstOrDefault();
            _nChatrelLateFeesPercentageINR = chatrelValues.Where(key => key.sChatrelKey == "INRChatrelLateFeesPercentage").Select(key => key.nChatrelValue).FirstOrDefault();
            _nChatrelChildAmtINR = chatrelValues.Where(key => key.sChatrelKey == "INRChildMonthChatrelAmount").Select(key => key.nChatrelValue).FirstOrDefault();

            //_nChatrelAmount = chatrelValues.Where(key => key.sChatrelKey == "USDYearChatrelAmount").Select(key => key.nChatrelValue).FirstOrDefault();
            //_nChatrelMeal = chatrelValues.Where(key => key.sChatrelKey == "USDYearChatrelMeal").Select(key => key.nChatrelValue).FirstOrDefault();
            //_nChatrelSalaryAmt = chatrelValues.Where(key => key.sChatrelKey == "USDYearChatrelSalaryAmt").Select(key => key.nChatrelValue).FirstOrDefault();
            //_nChatrelLateFeesPercentage = chatrelValues.Where(key => key.sChatrelKey == "USDChatrelLateFeesPercentage").Select(key => key.nChatrelValue).FirstOrDefault();
            _nChatrelStartYear = chatrelValues.Where(key => key.sChatrelKey == "ChatrelStartYear").Select(key => key.nChatrelValue).FirstOrDefault() - 1;


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


            if (authRegion.sCountryID == "IN" || authRegion.sCountryID == "BT" || authRegion.sCountryID == "NP")
            {
                _nChatrelAmount = _nChatrelAmountINR;
                _nChatrelMeal = _nChatrelMealINR;
                _nChatrelSalaryAmt = _nChatrelSalaryAmtINR;
                _nChatrelLateFeesPercentage = _nChatrelLateFeesPercentageINR;
                _nChatrelChildAmt = _nChatrelChildAmtINR;
            }
            else
            {
                _nChatrelAmount = _nChatrelAmountUSD;
                _nChatrelMeal = _nChatrelMealUSD;
                _nChatrelSalaryAmt = _nChatrelSalaryAmtUSD;
                _nChatrelLateFeesPercentage = _nChatrelLateFeesPercentageUSD;
                _nChatrelChildAmt = _nChatrelChildAmtUSD;
            }
            _dLateFees = (_nChatrelAmount + _nChatrelMeal) * _nChatrelLateFeesPercentage / 100;


            var gbChatrels = GetOutstandingDetails(greenbook, authRegion);
            //decimal arrears = CheckPendingAmount(sGBID);
            decimal arrears = _nPending;
            DateTime?[] dates = { null, null };
            if (arrears > 0)
            {
                dates = GetDatesFromYear(paidUntil + 1);
                dates[1] = new DateTime(_currentYear, _FYEndMonth, _FYEndDate);
            }

            var item = gbChatrels.Last();
            var nChatrelTotalAmount = (decimal)item?.GetType().GetProperty("nChatrelTotalAmount")?.GetValue(item, null);
            var nChatrelAmount = (decimal)item?.GetType().GetProperty("nChatrelAmount")?.GetValue(item, null);
            var nChatrelMeal = Convert.ToDecimal(item?.GetType().GetProperty("nChatrelMeal")?.GetValue(item, null));


            ChatrelPayment chatrelPayment;

            chatrelPayment = new ChatrelPayment
            {
                Id = -1,
                nChatrelAmount = decimal.Round(nChatrelAmount, 2),
                nChatrelMeal = nChatrelMeal,
                nChatrelLateFeesPercentage = _nChatrelLateFeesPercentage,
                nChatrelSalaryAmt = 0,
                nArrearsAmount = arrears,
                nChatrelTotalAmount = nChatrelTotalAmount + arrears,
                nAuthRegionID = greenbook.nAuthRegionID,
                sCountryID = authRegion.sCountryID,
                nChatrelYear = _currentYear,
                sGBId = sGBID,
                dtArrearsFrom = dates[0],
                dtArrearsTo = dates[1]

            };




            var result = new { nDefaultSalaryAmount = _nChatrelSalaryAmt, nPaidUntil = new DateTime(paidUntil + 1, _FYEndMonth, _FYEndDate), sName = String.Format("{0} {1}", greenbook.sFirstName, greenbook.sLastName), chatrelPayment = chatrelPayment, gbChatrels };
            return result;
        }
        #endregion


        #region GetOutstanding Details
        private IEnumerable<Object> GetOutstandingDetails(Greenbook greenbook, AuthRegion authRegion)
        {
            int paidUntil = GetPaidUntil(greenbook.sGBID);

            int pendingYears = _currentYear - paidUntil;

            //if (authRegion.sCountryID == "IN" || authRegion.sCountryID == "BT" || authRegion.sCountryID == "NP")
            //{
            //    _nChatrelAmount = _nChatrelAmountINR;
            //    _nChatrelMeal = _nChatrelMealINR;
            //    _nChatrelSalaryAmt = _nChatrelSalaryAmtINR;
            //    _nChatrelLateFeesPercentage = _nChatrelLateFeesPercentageINR;
            //    _nChatrelChildAmt = _nChatrelChildAmtINR;
            //}
            //else
            //{
            //    _nChatrelAmount = _nChatrelAmountUSD;
            //    _nChatrelMeal = _nChatrelMealUSD;
            //    _nChatrelSalaryAmt = _nChatrelSalaryAmtUSD;
            //    _nChatrelLateFeesPercentage = _nChatrelLateFeesPercentageUSD;
            //    _nChatrelChildAmt = _nChatrelChildAmtUSD;
            //}

            //_dLateFees = (_nChatrelAmount + _nChatrelMeal) * _nChatrelLateFeesPercentage / 100;
            List<Object> list = new List<Object>();
            for (int i = 1; i <= pendingYears; i++)
            {
                DateTime?[] dates = GetDatesFromYear(paidUntil + i);
                DateTime? start = dates[0];
                DateTime? end = dates[1];
                //should we check for child
                //int age = (paidUntil + i + 1) - greenbook.dtDOB.Value.Year;
                var status = checkStatus(paidUntil + i, (DateTime)greenbook.dtDOB);

                if (status == Status.Adult)
                {
                    if (i == (pendingYears - 1) && inGracePeriod)
                    {
                        var gracepending = new { nChatrelYear = paidUntil + i, nChatrelAmount = _nChatrelAmount, nChatrelMeal = _nChatrelMeal, nChatrelSalaryAmt = 0, lateFees = 0, nArrearsAmount = (_nChatrelAmount + _nChatrelMeal), nChatrelTotalAmount = (_nChatrelAmount + _nChatrelMeal), dtArrearsFrom = start, dtArrearsTo = end, greenbook.nAuthRegionID, greenbook.sGBID, authRegion.sCountryID, authRegion.sCurrencyCode, nChatrelUSD = _nChatrelAmountUSD, nChatrelINR = _nChatrelAmountINR, nChatrelMealUSD = _nChatrelMealUSD, nChatrelMealINR = _nChatrelMealINR, nSalaryUSD = _nChatrelSalaryAmtUSD, nSalaryINR = _nChatrelSalaryAmtINR, isChild = false };
                        list.Add(gracepending);
                        _nPending += _nChatrelAmount + _nChatrelMeal;
                        continue;
                    }
                    if (i == pendingYears) // Current Year
                    {
                        var current = new { nChatrelAmount = _nChatrelAmount, nChatrelMeal = _nChatrelMeal, nChatrelYear = _currentYear, lateFees = 0, nChatrelTotalAmount = (_nChatrelAmount + _nChatrelMeal), dtDateFrom = start, dtDateTo = end, nChatrelSalaryAmt = 0, greenbook.nAuthRegionID, greenbook.sGBID, authRegion.sCountryID, authRegion.sCurrencyCode, nChatrelUSD = _nChatrelAmountUSD, nChatrelINR = _nChatrelAmountINR, nChatrelMealUSD = _nChatrelMealUSD, nChatrelMealINR = _nChatrelMealINR, nSalaryUSD = _nChatrelSalaryAmtUSD, nSalaryINR = _nChatrelSalaryAmtINR, isChild = false };
                        list.Add(current);
                        //_nPending += _nChatrelAmount + _nChatrelMeal;
                        continue;
                    }
                    var apending = new { nChatrelYear = paidUntil + i, nChatrelAmount = _nChatrelAmount, nChatrelMeal = _nChatrelMeal, nChatrelSalaryAmt = 0, lateFees = _dLateFees, nArrearsAmount = (_nChatrelAmount + _nChatrelMeal + _dLateFees), nChatrelTotalAmount = (_nChatrelAmount + _nChatrelMeal + _dLateFees), dtArrearsFrom = start, dtArrearsTo = end, greenbook.nAuthRegionID, greenbook.sGBID, authRegion.sCountryID, authRegion.sCurrencyCode, nChatrelUSD = _nChatrelAmountUSD, nChatrelINR = _nChatrelAmountINR, nChatrelMealUSD = _nChatrelMealUSD, nChatrelMealINR = _nChatrelMealINR, nSalaryUSD = _nChatrelSalaryAmtUSD, nSalaryINR = _nChatrelSalaryAmtINR, isChild = false };
                    list.Add(apending);
                    _nPending += _nChatrelAmount + _nChatrelMeal + _dLateFees;
                    continue;
                }

                int months = 0;

                if (status == Status.TurningAdult)
                //if(age == 18)
                {
                    months = adultMonths(paidUntil + i, (DateTime)greenbook.dtDOB);
                }
                var nChatrelChildAmt = (months * _nChatrelAmount / 12) + ((12 - months) * _nChatrelChildAmt);
                var nChatrelChildUSD = (months * _nChatrelAmountUSD / 12) + ((12 - months) * _nChatrelChildAmtUSD);
                var nChatrelChildINR = (months * _nChatrelAmountINR / 12) + ((12 - months) * _nChatrelChildAmtINR);
                decimal lateFees = nChatrelChildAmt * _nChatrelLateFeesPercentage / 100;

                if (i == (pendingYears - 1) && inGracePeriod)
                {
                    var gracepending = new { nChatrelYear = paidUntil + i, nChatrelAmount = nChatrelChildAmt, nChatrelMeal = 0, nChatrelSalaryAmt = 0, lateFees = 0, nArrearsAmount = (nChatrelChildAmt), nChatrelTotalAmount = (nChatrelChildAmt), dtArrearsFrom = start, dtArrearsTo = end, greenbook.nAuthRegionID, greenbook.sGBID, authRegion.sCountryID, authRegion.sCurrencyCode, nChatrelUSD = nChatrelChildUSD, nChatrelINR = nChatrelChildINR, nChatrelMealUSD = 0, nChatrelMealINR = 0, isChild = true };
                    list.Add(gracepending);
                    _nPending += nChatrelChildAmt;
                    continue;
                }
                if (i == pendingYears) // Current Year
                {
                    var current = new { nChatrelAmount = nChatrelChildAmt, nChatrelMeal = 0, nChatrelYear = _currentYear, lateFees = 0, nChatrelTotalAmount = nChatrelChildAmt, dtDateFrom = start, dtDateTo = end, nChatrelSalaryAmt = 0, greenbook.nAuthRegionID, greenbook.sGBID, authRegion.sCountryID, authRegion.sCurrencyCode, nChatrelUSD = nChatrelChildUSD, nChatrelINR = nChatrelChildINR, nChatrelMealUSD = 0, nChatrelMealINR = 0, isChild = true };
                    list.Add(current);
                    //_nPending += nChatrelChildAmt;
                    continue;
                }
                var pending = new { nChatrelYear = paidUntil + i, nChatrelAmount = nChatrelChildAmt, nChatrelMeal = 0, nChatrelSalaryAmt = 0, lateFees = lateFees, nArrearsAmount = (nChatrelChildAmt + lateFees), nChatrelTotalAmount = (nChatrelChildAmt + lateFees), dtArrearsFrom = start, dtArrearsTo = end, greenbook.nAuthRegionID, greenbook.sGBID, authRegion.sCountryID, authRegion.sCurrencyCode, nChatrelUSD = nChatrelChildUSD, nChatrelINR = nChatrelChildINR, nChatrelMealUSD = 0, nChatrelMealINR = 0, isChild = true };

                // Check if we are in grace period in the previous year to current.


                list.Add(pending);
                _nPending += nChatrelChildAmt + lateFees;
            }
            //DateTime?[] currDates = GetDatesFromYear(_currentYear);

            //var current = new { nChatrelAmount = _nChatrelAmount, nChatrelMeal = _nChatrelMeal, nChatrelYear = _currentYear, lateFees = 0, nChatrelTotalAmount = (_nChatrelAmount + _nChatrelMeal), dtDateFrom = currDates[0], dtDateTo = currDates[1], nChatrelSalaryAmt = 0, greenbook.nAuthRegionID, greenbook.sGBID, authRegion.sCountryID, authRegion.sCurrencyCode };
            //list.Add(current);
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
            if (String.IsNullOrWhiteSpace(sGBID) || String.IsNullOrEmpty(sGBID))
            {
                return 0.00m;
            }
            Greenbook greenbook = _greenbookRepository.GetGreenbookByGBID(sGBID);
            AuthRegion authRegion = _authRegionRepository.GetAuthRegionById(greenbook.nAuthRegionID.ToString());
            if (authRegion.sCountryID == "IN" || authRegion.sCountryID == "BT" || authRegion.sCountryID == "NP")
            {
                _nChatrelAmount = _nChatrelAmountINR;
                _nChatrelMeal = _nChatrelMealINR;
                _nChatrelSalaryAmt = _nChatrelSalaryAmtINR;
                _nChatrelLateFeesPercentage = _nChatrelLateFeesPercentageINR;
                _nChatrelChildAmt = _nChatrelChildAmtINR;
            }
            else
            {
                _nChatrelAmount = _nChatrelAmountUSD;
                _nChatrelMeal = _nChatrelMealUSD;
                _nChatrelSalaryAmt = _nChatrelSalaryAmtUSD;
                _nChatrelLateFeesPercentage = _nChatrelLateFeesPercentageUSD;
                _nChatrelChildAmt = _nChatrelChildAmtUSD;
            }

            int paidUntil = GetPaidUntil(sGBID);
            int pendingYears = (_currentYear - 1) - paidUntil;
            //decimal currentDues = _nChatrelAmount + _nChatrelMeal;

            decimal arrears = (pendingYears) * (_nChatrelAmount + _nChatrelMeal);
            decimal penalty = 0.00m;
            if (inGracePeriod)
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
            if (String.IsNullOrWhiteSpace(sGBID) || String.IsNullOrEmpty(sGBID))
            {
                return 0;
            }
            string paidtill = _greenbookRepository.GetGreenbookByGBID(sGBID).sPaidUntil;
            int paidUntil = 0;
            if (!String.IsNullOrEmpty(paidtill) || !String.IsNullOrWhiteSpace(paidtill))
            {
                paidUntil = Convert.ToInt32(paidtill);
                paidUntil = (paidUntil < _nChatrelStartYear ? _nChatrelStartYear : paidUntil);
            }
            return _nChatrelStartYear;
        }
        #endregion

        #region Check Age status
        private Status checkStatus(int year, DateTime dtDOB)
        {
            DateTime startOfYear = new DateTime(year, _FYStartMonth, _FYStartDate);
            DateTime endOfYear = new DateTime(year + 1, _FYEndMonth, _FYEndDate);
            if (isChild(startOfYear, dtDOB))
            {
                if (isChild(endOfYear, dtDOB))
                {
                    return Status.Child;
                }
                else
                {
                    return Status.TurningAdult;
                }
            }
            else
            {
                return Status.Adult;
            }
        }
        #endregion

        #region Find if child at end of the year
        private bool isChild(DateTime date, DateTime dtDOB)
        {
            int dob = int.Parse(dtDOB.ToString("yyyyMMdd"));
            int compare = int.Parse(date.ToString("yyyyMMdd"));
            int age = (compare - dob) / 10000;
            return age < 18;
        }
        #endregion

        #region Find if child is turning Adult in given year. If yes, return number of months of Adult
        private int adultMonths(int year, DateTime dtDOB)
        {

            //if(isChild(new DateTime(year, _FYStartMonth, _FYStartDate), dtDOB) && !isChild(new DateTime(year + 1, _FYEndMonth, _FYEndDate), dtDOB))
            //{


            //}
            return (((year + 1) - dtDOB.AddYears(18).Year) * 12) + _FYEndMonth - dtDOB.Month;
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
                if (tables != null && tables.Count > 0)
                {
                    var relationDetails = tables[0].AsEnumerable().Select(row => new {
                        sGBIDRelation = row.Field<string>("sGBIDRelation"),
                        dPending = String.IsNullOrEmpty(row.Field<string>("sGBIDRelation")) ? 0 : CheckPendingAmount(row.Field<string>("sGBIDRelation")) + _nChatrelAmount + _nChatrelMeal,
                        sName = row.Field<string>("sName"),
                        dtDOB = row.Field<DateTime?>("dtDOB"),
                        nAge = row.Field<long>("nAge"),
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
                                    pymt.sGBID,
                                    gb.sFirstName,
                                    gb.sLastName,
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
                        sGBID = row.Field<string>("sGBID"),
                        sFirstName = row.Field<string>("sFirstName"),
                        sLastName = row.Field<string>("sLastName"),
                        sRelation = row.Field<string>("sRelation")
                    }).ToList();
                    return paymentHistory;
                }
                return null;
            }
        }
        #endregion

        #region Verify Friend Details
        public bool VerifyFriendDetails(string sFirstName, string sLastName, string sGBID, DateTime dtDOB)
        {
            Greenbook greenbook = _greenbookRepository.GetGreenbookByGBID(sGBID);
            if (greenbook.sFirstName == sFirstName && greenbook.sLastName == sLastName && greenbook.dtDOB == dtDOB)
            {
                return true;
            }
            return false;
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
