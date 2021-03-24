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
using System.Threading.Tasks;
using TimeZoneConverter;

namespace ChatrelDBL.BaseClassRepositories.Transactions
{
    public class ChatrelPaymentRepository : ADORepository<ChatrelPayment>
    {
        private GreenbookRepository _greenbookRepository;
        private ChatrelRepository _chatrelRepository;
        private AuthRegionRepository _authRegionRepository;
        private GBChatrelRepository _gbChatrelRepository;
        private static MySqlConnection _connection;

        private decimal _nChatrelAmountUSD, _nChatrelAmountINR;
        private decimal _nChatrelMealUSD, _nChatrelMealINR;
        private decimal _nChatrelSalaryAmtUSD, _nChatrelSalaryAmtINR;
        private decimal _nChatrelChildAmtUSD, _nChatrelChildAmtINR;
        private int _nChatrelLateFeesPercentage, _nChatrelLateFeesPercentageUSD, _nChatrelLateFeesPercentageINR;
        private int _nChatrelStartYear;
        private decimal _dLateFees;
        private int _FYStartMonth = 4;
        private int _FYStartDate = 1;
        private int _FYEndMonth = 3;
        private int _FYEndDate = 31;
        private int _currentYear = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("Eastern Standard Time")).Month <= 3 ? TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("Eastern Standard Time")).Year - 1 : TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("Eastern Standard Time")).Year;
        private bool inGracePeriod = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("Eastern Standard Time")).Month > 3 && TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("Eastern Standard Time")).Month < 5;
        private decimal _nPending;
        private Dictionary<int, dynamic> _chatrelAmountUSD;
        private Dictionary<int, dynamic> _chatrelMealUSD;
        private Dictionary<int, dynamic> _chatrelSalaryUSD;
        private Dictionary<int, dynamic> _chatrelChildMonthlyUSD;
        private Dictionary<int, dynamic> _chatrelAmountINR;
        private Dictionary<int, dynamic> _chatrelMealINR;
        private Dictionary<int, dynamic> _chatrelSalaryINR;
        private Dictionary<int, dynamic> _chatrelChildMonthlyINR;


        private Dictionary<int, dynamic> _chatrelAmount;
        private Dictionary<int, dynamic> _chatrelMeal;
        private Dictionary<int, dynamic> _chatrelSalary;
        private Dictionary<int, dynamic> _chatrelChildMonthly;
        private Dictionary<int, dynamic> _chatrelMidTeen;

        private enum Status { Adult = 1, TurningAdult, TurningMidTeen, MidTeen, Child, TurningChild, Baby }


        #region Constructor
        public ChatrelPaymentRepository(string connectionString) : base(connectionString)
        {
            _greenbookRepository = new GreenbookRepository(connectionString);
            _chatrelRepository = new ChatrelRepository(connectionString);
            _authRegionRepository = new AuthRegionRepository(connectionString);
            _gbChatrelRepository = new GBChatrelRepository(connectionString);
            _connection = new MySqlConnection(connectionString);

            IEnumerable<Chatrel> chatrelValues = _chatrelRepository.GetAllChatrel();

            //_nChatrelAmountUSD = chatrelValues.Where(key => key.sChatrelKey == "USDYearChatrelAmount").Select(key => key.nChatrelValue).FirstOrDefault();
            //_nChatrelMealUSD = chatrelValues.Where(key => key.sChatrelKey == "USDYearChatrelMeal").Select(key => key.nChatrelValue).FirstOrDefault();
            //_nChatrelSalaryAmtUSD = chatrelValues.Where(key => key.sChatrelKey == "USDYearChatrelSalaryAmt").Select(key => key.nChatrelValue).FirstOrDefault();
            _nChatrelLateFeesPercentageUSD = chatrelValues.Where(key => key.sChatrelKey == "USDChatrelLateFeesPercentage").Select(key => key.nChatrelValue).FirstOrDefault();
            //_nChatrelChildAmtUSD = chatrelValues.Where(key => key.sChatrelKey == "USDChildMonthChatrelAmount").Select(key => key.nChatrelValue).FirstOrDefault();

            //_nChatrelAmountINR = chatrelValues.Where(key => key.sChatrelKey == "INRYearChatrelAmount").Select(key => key.nChatrelValue).FirstOrDefault();
            //_nChatrelMealINR = chatrelValues.Where(key => key.sChatrelKey == "INRYearChatrelMeal").Select(key => key.nChatrelValue).FirstOrDefault();
            //_nChatrelSalaryAmtINR = chatrelValues.Where(key => key.sChatrelKey == "INRYearChatrelSalaryAmt").Select(key => key.nChatrelValue).FirstOrDefault();
            _nChatrelLateFeesPercentageINR = chatrelValues.Where(key => key.sChatrelKey == "INRChatrelLateFeesPercentage").Select(key => key.nChatrelValue).FirstOrDefault();
            //_nChatrelChildAmtINR = chatrelValues.Where(key => key.sChatrelKey == "INRChildMonthChatrelAmount").Select(key => key.nChatrelValue).FirstOrDefault();

            //_nChatrelAmount = chatrelValues.Where(key => key.sChatrelKey == "USDYearChatrelAmount").Select(key => key.nChatrelValue).FirstOrDefault();
            //_nChatrelMeal = chatrelValues.Where(key => key.sChatrelKey == "USDYearChatrelMeal").Select(key => key.nChatrelValue).FirstOrDefault();
            //_nChatrelSalaryAmt = chatrelValues.Where(key => key.sChatrelKey == "USDYearChatrelSalaryAmt").Select(key => key.nChatrelValue).FirstOrDefault();
            //_nChatrelLateFeesPercentage = chatrelValues.Where(key => key.sChatrelKey == "USDChatrelLateFeesPercentage").Select(key => key.nChatrelValue).FirstOrDefault();
            _nChatrelStartYear = chatrelValues.Where(key => key.sChatrelKey == "ChatrelStartYear").Select(key => key.nChatrelValue).FirstOrDefault() - 1;

            ChatrelRepository.Init(connectionString);
            _chatrelAmountUSD = ChatrelRepository.ChatrelAmountUSD;
            _chatrelMealUSD = ChatrelRepository.ChatrelMealUSD;
            _chatrelSalaryUSD = ChatrelRepository.ChatrelSalaryUSD;
            _chatrelChildMonthlyUSD = ChatrelRepository.ChatrelChildMonthlyUSD;

            _chatrelAmountINR = ChatrelRepository.ChatrelAmountINR;
            _chatrelMealINR = ChatrelRepository.ChatrelMealINR;
            _chatrelSalaryINR = ChatrelRepository.ChatrelSalaryINR;
            _chatrelChildMonthlyINR = ChatrelRepository.ChatrelChildMonthlyINR;
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



        #region Display Payment Record for a GBID
        public Object DisplayChatrelPayment(string sGBID)
        {
            _nPending = 0.00m;
            Greenbook greenbook = _greenbookRepository.GetGreenbookByGBID(sGBID);
            if (greenbook == null)
            {
                return "Greenbook ID does not Exist.";
            }
            //AuthRegion authRegion = _authRegionRepository.GetAuthRegionById(greenbook.nAuthRegionID.ToString());
            int authRegionId = _gbChatrelRepository.GetLatestAuthRegionID(sGBID);
            AuthRegion authRegion = _authRegionRepository.GetAuthRegionById(authRegionId.ToString());
            AuthRegion authRegionProfile = _authRegionRepository.GetAuthRegionById(greenbook.nAuthRegionID.ToString());
            int paidUntil = GetPaidUntil(greenbook);
            if (paidUntil <= 0)
            {
                return "Paid Until Value not found";
            }
            int pendingYears = _currentYear - paidUntil;
            if (pendingYears <= 0)
            {
                int[] years = GetToFromChatrelYear(sGBID);
                int chatrelFrom = 0, chatrelTo = 0;
                if (years != null)
                {
                    chatrelFrom = years[0];
                    chatrelTo = years[1];
                }
                
                GBChatrel current = _gbChatrelRepository.GetChatrelByGBIDForYear(sGBID, _currentYear);
                current.Id = 0;
                current.chatrelpaymentID = 0;
                current.sChatrelReceiptNumber = "";
                current.nChatrelAmount = 0.00m;
                current.nChatrelMeal = 0.00m;
                current.nChatrelTotalAmount = 0.00m;
                current.sPaymentCurrency = ChatrelPayment.USD;
                List<GBChatrel> gbChatrel = new List<GBChatrel>();
                gbChatrel.Add(current);

                ChatrelPayment chatrel = new ChatrelPayment
                {
                    sPaymentCurrency = ChatrelPayment.USD,
                    nChatrelTotalAmount = 0.00m,
                    sGBId = sGBID,
                    nChatrelYear = _currentYear,
                    sPaymentMode = ChatrelPayment.Online
                };

                GBChatrelDonation donation = new GBChatrelDonation
                {
                    sGBId = sGBID,
                    nAuthRegionID = gbChatrel[0].nAuthRegionID,
                    sCountryID = gbChatrel[0].sCountryID,
                    nChatrelAdditionalDonationAmt = 0,
                    nChatrelBusinessDonationAmt = 0,
                    sPaymentCurrency = ChatrelPayment.USD,
                    sAuthRegionCurrency = gbChatrel[0].sAuthRegionCurrency
                };

                var response = new { gbChatrel[0].nAuthRegionID, greenbook.sCountryID, authRegionProfile = authRegionProfile.sAuthRegion, nPaidUntil = new DateTime(paidUntil + 1, _FYEndMonth, _FYEndDate), message = "No Outstandings", sName = String.Format("{0} {1}", greenbook.sFirstName, greenbook.sLastName), chatrelPayment = chatrel, gbChatrels = gbChatrel, gbChatrelDonation = donation, nSalaryUSD = (decimal)_chatrelSalaryUSD[paidUntil], chatrelFrom , chatrelTo };

                return response;
                //return (new { message = "No Outstandings", currency = authRegion.sCurrencyCode });


            }


            if (authRegion.sCountryID == "IN" || authRegion.sCountryID == "BT" || authRegion.sCountryID == "NP")
            {
                //Point the dictionaries accordingly

                _nChatrelLateFeesPercentage = _nChatrelLateFeesPercentageINR;
                _chatrelAmount = _chatrelAmountINR;
                _chatrelMeal = _chatrelMealINR;
                _chatrelSalary = _chatrelSalaryINR;
                _chatrelMidTeen = _chatrelAmountINR; //same as adult
                _chatrelChildMonthly = _chatrelChildMonthlyINR;
            }
            else
            {


                _nChatrelLateFeesPercentage = _nChatrelLateFeesPercentageUSD;
                _chatrelAmount = _chatrelAmountUSD;
                _chatrelMeal = _chatrelMealUSD;
                _chatrelSalary = _chatrelSalaryUSD;
                _chatrelChildMonthly = _chatrelChildMonthlyUSD;
            }



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
                Id = 0,
                sGBId = sGBID,
                nChatrelYear = _currentYear,
                nChatrelTotalAmount = nChatrelTotalAmount + arrears,
                sPaymentCurrency = ChatrelPayment.USD,
                sPaymentMode = ChatrelPayment.Online
            };


            GBChatrelDonation gbChatrelDonation = new GBChatrelDonation
            {
                sGBId = sGBID,
                sPaymentCurrency = ChatrelPayment.USD,
                nChatrelAdditionalDonationAmt = 0,
                nChatrelBusinessDonationAmt = 0
            };


            var result = new { nAuthRegionID = authRegion.ID, greenbook.sCountryID, authRegionProfile = authRegionProfile.sAuthRegion, nPaidUntil = new DateTime(paidUntil + 1, _FYEndMonth, _FYEndDate), sName = String.Format("{0} {1}", greenbook.sFirstName, greenbook.sLastName), chatrelPayment = chatrelPayment, gbChatrels, gbChatrelDonation };
            return result;
        }
        #endregion


        #region GetOutstanding Details
        private IEnumerable<Object> GetOutstandingDetails(Greenbook greenbook, AuthRegion authRegion)
        {
            int paidUntil = GetPaidUntil(greenbook);

            int pendingYears = _currentYear - paidUntil;

            bool indianRegion = authRegion.sCountryID == "IN" || authRegion.sCountryID == "BT" || authRegion.sCountryID == "NP";
            List<Object> list = new List<Object>();
            for (int i = 1; i <= pendingYears; i++)
            {

                DateTime?[] dates = GetDatesFromYear(paidUntil + i);
                DateTime? start = dates[0];
                DateTime? end = dates[1];

                decimal chatrelBasic = (decimal)_chatrelAmount[paidUntil + i];
                decimal chatrelBasicUSD = _chatrelAmountUSD[paidUntil + i];
                decimal chatrelBasicINR = _chatrelAmountINR[paidUntil + i];
                decimal chatrelMeal = (decimal)_chatrelMeal[paidUntil + i];
                decimal chatrelMealUSD = _chatrelMealUSD[paidUntil + i];
                decimal chatrelMealINR = _chatrelMealINR[paidUntil + i];
                decimal chatrelSalary = (decimal)_chatrelSalary[paidUntil + i];
                decimal chatrelSalaryUSD = (decimal)_chatrelSalaryUSD[paidUntil + i];
                decimal chatrelSalaryINR = (decimal)_chatrelSalaryINR[paidUntil + i];
                decimal chatrelChildMonthly = (decimal)_chatrelChildMonthly[paidUntil + i];
                decimal chatrelChildMonthlyUSD = (decimal)_chatrelChildMonthlyUSD[paidUntil + i];
                decimal chatrelChildMonthlyINR = (decimal)_chatrelChildMonthlyINR[paidUntil + i];

                //decimal chatrelMidTeenINR = (decimal)_chatrelMidTeen[paidUntil + i];

                _dLateFees = (chatrelBasic + chatrelMeal) * _nChatrelLateFeesPercentage / 100;

                Status status = indianRegion ? CheckStatusINR(paidUntil + i, (DateTime)greenbook.dtDOB) : CheckStatus(paidUntil + i, (DateTime)greenbook.dtDOB);

                //if(status == Status.Adult)
                //{
                //    if (i == (pendingYears - 1) && inGracePeriod)
                //    {
                //        var gracepending = new { nChatrelYear = paidUntil + i, dtCurrentChatrelFrom = start, dtCurrentChatrelTo = end, nChatrelAmount = chatrelBasic, nChatrelMeal = chatrelMeal, nCurrentChatrelSalaryAmt = 0, nChatrelLateFeesPercentage = _nChatrelLateFeesPercentage, nChatrelLateFeesValue = 0, nArrearsAmount = (chatrelBasic + chatrelMeal), nChatrelTotalAmount = (chatrelBasic + chatrelMeal), dtArrearsFrom = start, dtArrearsTo = end, greenbook.nAuthRegionID, greenbook.sGBID, authRegion.sCountryID, sAuthRegionCurrency = authRegion.sCurrencyCode, sPaymentCurrency = ChatrelPayment.INR, nConversionRate = 0.00m, nChatrelUSD = chatrelBasicUSD, nChatrelINR = chatrelBasicINR, nChatrelMealUSD = chatrelMealUSD, nChatrelMealINR = chatrelMealINR, nSalaryUSD = chatrelSalaryUSD, nSalaryINR = chatrelSalaryINR, isChild = false };
                //        list.Add(gracepending);
                //        _nPending += chatrelBasic + chatrelMeal;
                //        continue;
                //    }
                //    if(i == pendingYears) // Current Year
                //    {
                //        var current = new { nChatrelYear = _currentYear, dtCurrentChatrelFrom = start, dtCurrentChatrelTo = end, nChatrelAmount = chatrelBasic, nChatrelMeal = chatrelMeal, nCurrentChatrelSalaryAmt = 0, nChatrelLateFeesPercentage = _nChatrelLateFeesPercentage, nChatrelLateFeesValue = 0, nChatrelTotalAmount = (chatrelBasic + chatrelMeal), dtDateFrom = start, dtDateTo = end, greenbook.nAuthRegionID, greenbook.sGBID, authRegion.sCountryID, sAuthRegionCurrency = authRegion.sCurrencyCode, sPaymentCurrency = ChatrelPayment.INR, nConversionRate = 0.00m, nChatrelUSD = chatrelBasicUSD, nChatrelINR = chatrelBasicINR, nChatrelMealUSD = chatrelMealUSD, nChatrelMealINR = chatrelMealINR, nSalaryUSD = chatrelSalaryUSD, nSalaryINR = chatrelSalaryINR, isChild = false };
                //        list.Add(current);
                //        //_nPending += _nChatrelAmount + _nChatrelMeal;
                //        continue;
                //    }
                //    var apending = new { nChatrelYear = paidUntil + i, dtCurrentChatrelFrom = start, dtCurrentChatrelTo = end, nChatrelAmount = chatrelBasic, nChatrelMeal = chatrelMeal, nCurrentChatrelSalaryAmt = 0, nChatrelLateFeesPercentage = _nChatrelLateFeesPercentage, nChatrelLateFeesValue = _dLateFees, nArrearsAmount = (chatrelBasic + chatrelMeal + _dLateFees), nChatrelTotalAmount = (chatrelBasic + chatrelMeal + _dLateFees), dtArrearsFrom = start, dtArrearsTo = end, greenbook.nAuthRegionID, greenbook.sGBID, authRegion.sCountryID, sAuthRegionCurrency = authRegion.sCurrencyCode, sPaymentCurrency = ChatrelPayment.INR, nConversionRate = 0.00m, nChatrelUSD = chatrelBasicUSD, nChatrelINR = chatrelBasicINR, nChatrelMealUSD = chatrelMealUSD, nChatrelMealINR = chatrelMealINR, nSalaryUSD = chatrelSalaryUSD, nSalaryINR = chatrelSalaryINR, isChild = false };
                //    list.Add(apending);
                //    _nPending += chatrelBasic + chatrelMeal + _dLateFees;
                //    continue;
                //}


                //int months = 0;
                //int childMonths = 0;

                //if (status == Status.TurningAdult)
                //{
                //    months = indianRegion ? 12 :  AdultMonths(paidUntil + i, (DateTime)greenbook.dtDOB);
                //    meal = chatrelMeal;
                //    mealUSD = _chatrelMealUSD[paidUntil + i];
                //    mealINR = _chatrelMealINR[paidUntil + i];
                //    isChild = false;

                //}
                //if(status == Status.MidTeen)
                //{
                //    months = 12;
                //}
                //if(status == Status.TurningMidTeen)
                //{
                //    months = MidTeenMonths(paidUntil + i, (DateTime)greenbook.dtDOB);
                //}
                //if(status == Status.TurningChild)
                //{
                //    childMonths = ChildMonths(paidUntil + i, (DateTime)greenbook.dtDOB);
                //}
                //var nChatrelChildAmt = status == Status.TurningChild ? childMonths * chatrelChildMonthly  : (months * chatrelBasic / 12) + ((12 - months) * chatrelChildMonthly);
                //var nChatrelChildUSD = status == Status.TurningChild ? childMonths * chatrelChildMonthlyUSD : (months * chatrelBasicUSD / 12) + ((12 - months) * chatrelChildMonthlyUSD) ;
                //var nChatrelChildINR = status == Status.TurningChild ? childMonths * chatrelChildMonthlyINR : (months * chatrelBasicINR / 12) + ((12 - months) * chatrelChildMonthlyINR) ;

                decimal nChatrelChildAmt = 0.00m, nChatrelChildUSD = 0.00m, nChatrelChildINR = 0.00m;
                decimal meal = 0.00m, mealUSD = 0.00m, mealINR = 0.00m;
                bool isChild = true;

                switch (status)
                {
                    case Status.Adult:
                        nChatrelChildAmt = chatrelBasic;
                        nChatrelChildUSD = chatrelBasicUSD;
                        nChatrelChildINR = chatrelBasicINR;
                        meal = chatrelMeal;
                        mealUSD = chatrelMealUSD;
                        mealINR = chatrelMealINR;
                        isChild = false;
                        break;

                    case Status.TurningAdult:
                        int adultMonths = AdultMonths(paidUntil + i, (DateTime)greenbook.dtDOB);
                        meal = chatrelMeal;
                        mealUSD = chatrelMealUSD;
                        mealINR = chatrelMealINR;
                        isChild = false;
                        if (indianRegion)
                        {
                            nChatrelChildAmt = (chatrelBasic);
                            nChatrelChildUSD = (adultMonths * chatrelBasicUSD / 12) + ((12 - adultMonths) * chatrelChildMonthlyUSD);
                            nChatrelChildINR = (chatrelBasicINR);
                        }
                        else
                        {
                            nChatrelChildAmt = (adultMonths * chatrelBasic / 12) + ((12 - adultMonths) * chatrelChildMonthly);
                            nChatrelChildUSD = (adultMonths * chatrelBasicUSD / 12) + ((12 - adultMonths) * chatrelChildMonthlyUSD);
                            nChatrelChildINR = (chatrelBasicINR);
                        }

                        break;

                    case Status.MidTeen:
                        nChatrelChildAmt = indianRegion ? chatrelBasic : 12 * chatrelChildMonthly;
                        nChatrelChildUSD = 12 * chatrelChildMonthlyUSD;
                        nChatrelChildINR = chatrelBasicINR;
                        break;

                    case Status.TurningMidTeen:
                        int midTeenMonths = MidTeenMonths(paidUntil + i, (DateTime)greenbook.dtDOB);
                        if (indianRegion)
                        {
                            nChatrelChildAmt = (midTeenMonths * chatrelBasic / 12) + ((12 - midTeenMonths) * chatrelChildMonthly);
                            nChatrelChildUSD = (12 * chatrelChildMonthlyUSD);
                            nChatrelChildINR = (midTeenMonths * chatrelBasicINR / 12) + ((12 - midTeenMonths) * chatrelChildMonthlyINR);
                        }
                        else
                        {
                            nChatrelChildAmt = (12 * chatrelChildMonthly);
                            nChatrelChildUSD = (12 * chatrelChildMonthlyUSD);
                            nChatrelChildINR = (midTeenMonths * chatrelBasicINR / 12) + ((12 - midTeenMonths) * chatrelChildMonthlyINR);
                        }
                        break;

                    case Status.Child:
                        nChatrelChildAmt = 12 * chatrelChildMonthly;
                        nChatrelChildUSD = 12 * chatrelChildMonthlyUSD;
                        nChatrelChildINR = 12 * chatrelChildMonthlyINR;
                        break;

                    case Status.TurningChild:
                        int childMonths = ChildMonths(paidUntil + i, (DateTime)greenbook.dtDOB);
                        nChatrelChildAmt = childMonths * chatrelChildMonthly;
                        nChatrelChildUSD = childMonths * chatrelChildMonthlyUSD;
                        nChatrelChildINR = childMonths * chatrelChildMonthlyINR;
                        break;
                }



                decimal lateFees = (nChatrelChildAmt + meal) * _nChatrelLateFeesPercentage / 100;

                if (i == (pendingYears - 1) && inGracePeriod)
                {
                    var gracepending = new { nChatrelYear = paidUntil + i, dtCurrentChatrelFrom = start, dtCurrentChatrelTo = end, nChatrelAmount = Math.Round(nChatrelChildAmt, 2), nChatrelMeal = meal, nCurrentChatrelSalaryAmt = 0, nChatrelLateFeesPercentage = _nChatrelLateFeesPercentage, nChatrelLateFeesValue = 0, nArrearsAmount = (nChatrelChildAmt + meal), nChatrelTotalAmount = Math.Round((nChatrelChildAmt + meal), 2), dtArrearsFrom = start, dtArrearsTo = end, nAuthRegionID = authRegion.ID, greenbook.sGBID, authRegion.sCountryID, sAuthRegionCurrency = authRegion.sCurrencyCode, sPaymentCurrency = ChatrelPayment.USD, nConversionRate = 0.00m, nChatrelUSD = Math.Round(nChatrelChildUSD, 2), nChatrelINR = Math.Round(nChatrelChildINR, 2), nChatrelMealUSD = mealUSD, nChatrelMealINR = mealINR, nSalaryUSD = chatrelSalaryUSD, nSalaryINR = chatrelSalaryINR, isChild };

                    list.Add(gracepending);

                    _nPending += nChatrelChildAmt + meal;

                    continue;
                }
                if (i == pendingYears) // Current Year
                {
                    var current = new { nChatrelYear = _currentYear, dtCurrentChatrelFrom = start, dtCurrentChatrelTo = end, nChatrelAmount = Math.Round(nChatrelChildAmt, 2), nChatrelMeal = meal, nCurrentChatrelSalaryAmt = 0, nChatrelLateFeesPercentage = _nChatrelLateFeesPercentage, nChatrelLateFeesValue = 0, nChatrelTotalAmount = Math.Round(nChatrelChildAmt + meal, 2), dtDateFrom = start, dtDateTo = end, nAuthRegionID = authRegion.ID, greenbook.sGBID, authRegion.sCountryID, sAuthRegionCurrency = authRegion.sCurrencyCode, sPaymentCurrency = ChatrelPayment.USD, nConversionRate = 0.00m, nChatrelUSD = Math.Round(nChatrelChildUSD, 2), nChatrelINR = Math.Round(nChatrelChildINR, 2), nChatrelMealUSD = mealUSD, nChatrelMealINR = mealINR, nSalaryUSD = chatrelSalaryUSD, nSalaryINR = chatrelSalaryINR, isChild };

                    list.Add(current);

                    continue;
                }
                var pending = new { nChatrelYear = paidUntil + i, dtCurrentChatrelFrom = start, dtCurrentChatrelTo = end, nChatrelAmount = Math.Round(nChatrelChildAmt, 2), nChatrelMeal = meal, nCurrentChatrelSalaryAmt = 0, nChatrelLateFeesPercentage = _nChatrelLateFeesPercentage, nChatrelLateFeesValue = lateFees, nArrearsAmount = (nChatrelChildAmt + +meal + lateFees), nChatrelTotalAmount = Math.Round((nChatrelChildAmt + meal + lateFees), 2), dtArrearsFrom = start, dtArrearsTo = end, nAuthRegionID = authRegion.ID, greenbook.sGBID, authRegion.sCountryID, sAuthRegionCurrency = authRegion.sCurrencyCode, sPaymentCurrency = ChatrelPayment.USD, nConversionRate = 0.00m, nChatrelUSD = Math.Round(nChatrelChildUSD, 2), nChatrelINR = Math.Round(nChatrelChildINR, 2), nChatrelMealUSD = mealUSD, nChatrelMealINR = mealINR, nSalaryUSD = chatrelSalaryUSD, nSalaryINR = chatrelSalaryINR, isChild };

                list.Add(pending);
                _nPending += nChatrelChildAmt + meal + lateFees;
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
            var obj = DisplayChatrelPayment(sGBID);
            if (obj.ToString() == "Greenbook ID does not Exist.")
            {
                return -1;
            }
            var chatrel = (object)obj.GetType().GetProperty("chatrelPayment")?.GetValue(obj, null);
            var nChatrelTotalAmount = (decimal)chatrel?.GetType().GetProperty("nChatrelTotalAmount")?.GetValue(chatrel, null);

            return nChatrelTotalAmount;
            //if (String.IsNullOrWhiteSpace(sGBID) || String.IsNullOrEmpty(sGBID))
            //{
            //    return 0.00m;
            //}
            //Greenbook greenbook = _greenbookRepository.GetGreenbookByGBID(sGBID);
            //AuthRegion authRegion = _authRegionRepository.GetAuthRegionById(greenbook.nAuthRegionID.ToString());
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

            //int paidUntil = GetPaidUntil(sGBID);
            //int pendingYears = (_currentYear - 1) - paidUntil;
            ////decimal currentDues = _nChatrelAmount + _nChatrelMeal;

            //decimal arrears = (pendingYears) * (_nChatrelAmount + _nChatrelMeal);
            //decimal penalty = 0.00m;
            //if(inGracePeriod)
            //{
            //    penalty = ((pendingYears - 1) * (_nChatrelAmount + _nChatrelMeal) * _nChatrelLateFeesPercentage / 100);
            //}
            //else
            //{
            //    penalty = ((pendingYears) * (_nChatrelAmount + _nChatrelMeal) * _nChatrelLateFeesPercentage / 100);
            //}

            //decimal totalDues = Math.Round(arrears + penalty, 2);
            //return totalDues;
        }
        #endregion

        #region Get Paid Until year
        private int GetPaidUntil(Greenbook greenbook)
        {
            string paidtill = greenbook.sPaidUntil;
            try
            {
                int paidUntil = Convert.ToInt32(paidtill);
                return paidUntil;
            }
            catch (Exception ex)
            {
                return 0;
            }


            //int paidUntil = _nChatrelStartYear;
            //if (!String.IsNullOrEmpty(paidtill) || !String.IsNullOrWhiteSpace(paidtill))
            //{
            //    paidUntil = Convert.ToInt32(paidtill) ;
            //    paidUntil = (paidUntil < _nChatrelStartYear ? _nChatrelStartYear : paidUntil);
            //}
            //return paidUntil;
        }
        #endregion

        #region Check Age status Non-INR
        private Status CheckStatus(int year, DateTime dtDOB)
        {
            DateTime startOfYear = new DateTime(year, _FYStartMonth, _FYStartDate);
            DateTime endOfYear = new DateTime(year + 1, _FYEndMonth, _FYEndDate);
            if (IsAdult(startOfYear, dtDOB))
            {
                return Status.Adult;
            }
            if (IsChild(startOfYear, dtDOB) && IsAdult(endOfYear, dtDOB))
            {
                return Status.TurningAdult;
            }
            if (IsChild(startOfYear, dtDOB) && IsChild(endOfYear, dtDOB))
            {
                return Status.Child;
            }
            if (!IsAdult(startOfYear, dtDOB) && !IsChild(startOfYear, dtDOB) && IsChild(endOfYear, dtDOB))
            {
                return Status.TurningChild;
            }

            else
            {
                return Status.Baby;
            }


        }
        #endregion

        #region Check Age Status for India, Bhutan, Nepal (INR)
        private Status CheckStatusINR(int year, DateTime dtDOB)
        {
            DateTime startOfYear = new DateTime(year, _FYStartMonth, _FYStartDate);
            DateTime endOfYear = new DateTime(year + 1, _FYEndMonth, _FYEndDate);
            if (IsAdult(startOfYear, dtDOB))
            {
                return Status.Adult;
            }
            if (IsMidTeenINR(startOfYear, dtDOB) && IsAdult(endOfYear, dtDOB))
            {
                return Status.TurningAdult;
            }
            if (IsMidTeenINR(startOfYear, dtDOB) && IsMidTeenINR(endOfYear, dtDOB))
            {
                return Status.MidTeen;
            }
            if (IsChildINR(startOfYear, dtDOB) && IsMidTeenINR(endOfYear, dtDOB))
            {
                return Status.TurningMidTeen;
            }
            if (IsChildINR(startOfYear, dtDOB) && IsChildINR(endOfYear, dtDOB))
            {
                return Status.Child;
            }

            if (!IsAdult(startOfYear, dtDOB) && !IsChildINR(startOfYear, dtDOB) && !IsMidTeenINR(startOfYear, dtDOB) && IsChildINR(endOfYear, dtDOB))
            {
                return Status.TurningChild;
            }

            else
            {
                return Status.Baby;
            }
        }
        #endregion

        #region Find if child for NON-INR
        private bool IsChild(DateTime date, DateTime dtDOB)
        {
            int dob = int.Parse(dtDOB.ToString("yyyyMMdd"));
            int compare = int.Parse(date.ToString("yyyyMMdd"));
            int age = (compare - dob) / 10000;
            return age < 18 && age > 5;
        }
        #endregion

        #region Find if child status for India, Bhutan, Nepal
        private bool IsChildINR(DateTime date, DateTime dtDOB)
        {
            int dob = int.Parse(dtDOB.ToString("yyyyMMdd"));
            int compare = int.Parse(date.ToString("yyyyMMdd"));
            int age = (compare - dob) / 10000;
            return age < 15 && age > 5;
        }
        #endregion

        #region Find if child turning midteen for India, Bhutan, Nepal
        private bool IsMidTeenINR(DateTime date, DateTime dtDOB)
        {
            int dob = int.Parse(dtDOB.ToString("yyyyMMdd"));
            int compare = int.Parse(date.ToString("yyyyMMdd"));
            int age = (compare - dob) / 10000;
            return age > 14 && age < 18;
        }
        #endregion

        #region Find if Adult
        private bool IsAdult(DateTime date, DateTime dtDOB)
        {
            int dob = int.Parse(dtDOB.ToString("yyyyMMdd"));
            int compare = int.Parse(date.ToString("yyyyMMdd"));
            int age = (compare - dob) / 10000;
            return age > 17;
        }
        #endregion

        #region Find if child is turning Adult in given year. If yes, return number of months of Adult
        private int AdultMonths(int year, DateTime dtDOB)
        {

            //if(isChild(new DateTime(year, _FYStartMonth, _FYStartDate), dtDOB) && !isChild(new DateTime(year + 1, _FYEndMonth, _FYEndDate), dtDOB))
            //{


            //}
            return (((year + 1) - dtDOB.AddYears(18).Year) * 12) + _FYEndMonth - dtDOB.Month + 1;
        }
        #endregion

        #region Find if Baby is turning Child in given year. If yes, return number of months of being Child
        private int ChildMonths(int year, DateTime dtDOB)
        {
            return (((year + 1) - dtDOB.AddYears(6).Year) * 12) + _FYEndMonth - dtDOB.Month + 1;
        }
        #endregion

        #region Find if Child turning midteen in given year. If yes, return number of months of begin midteen
        private int MidTeenMonths(int year, DateTime dtDOB)
        {
            return (((year + 1) - dtDOB.AddYears(15).Year) * 12) + _FYEndMonth - dtDOB.Month + 1;
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
                        dPending = String.IsNullOrEmpty(row.Field<string>("sGBIDRelation")) ? null : DisplayChatrelPayment(row.Field<string>("sGBIDRelation")),
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
            //string sql = @"SELECT   pymt.sChatrelReceiptNumber,
            //                        pymt.dtEntered,
            //                        pymt.dtArrearsFrom AS dtPeriodFrom,
            //                        STR_TO_DATE(CONCAT(pymt.nChatrelYear, '-03', '-31'), '%Y-%m-%d') AS dtPeriodTo,
            //                        pymt.sGBID,
            //                        gb.sFirstName,
            //                        gb.sLastName,
            //                        CASE
            //                                    WHEN lnkrel.nRelationID = 1 THEN 'Father'
            //                                    WHEN lnkrel.nRelationID = 2 THEN 'Mother'
            //                                    WHEN lnkrel.nRelationID = 3 THEN 'Spouse'
            //                                    WHEN pymt.sGBId = pymt.sPaidByGBId THEN 'Self'
            //                                    ELSE 'Friend'
            //                        END
            //                        AS sRelation
            //            FROM       tblchatrelpayment AS pymt
            //            INNER JOIN tblgreenbook      AS gb
            //            ON         pymt.sGBId = gb.sGBId
            //            LEFT JOIN  lnkgbrelation AS lnkrel
            //            ON         lnkrel.sGBID = pymt.sPaidByGBId
            //            AND        lnkrel.sGBIDRelation = pymt.sGBID
            //            WHERE      pymt.sPaidByGBId = @sGBID;";
            //string sql = @"SELECT   pymt.dtPayment,
            //                        pymt.sPaidByGBId,
            //                        pymt.sGBID AS sGBIDPaidFor,
            //                        pymt.sPaymentCurrency,
            //                        pymt.nChatrelTotalAmount,
            //                        pymt.sChatrelReceiptNumber,
            //                        pymt.sPaymentStatus,
            //                        pymt.sPaymentMode,
            //                        gb.sFirstName,
            //                        gb.sLastName,
            //                        gb.sCountryID as sCountryIDPaidFor,
            //                        CASE
            //                                    WHEN lnkrel.nRelationID = 1 THEN 'Father'
            //                                    WHEN lnkrel.nRelationID = 2 THEN 'Mother'
            //                                    WHEN lnkrel.nRelationID = 3 THEN 'Spouse'
            //                                    WHEN pymt.sGBId = pymt.sPaidByGBId THEN 'Self'
            //                                    ELSE 'Friend'
            //                        END
            //                        AS sRelation
            //            FROM       tblchatrelpayment AS pymt
            //            INNER JOIN tblgreenbook      AS gb
            //            ON         pymt.sGBId = gb.sGBId
            //            LEFT JOIN  lnkgbrelation AS lnkrel
            //            ON         lnkrel.sGBID = pymt.sPaidByGBId
            //            AND        lnkrel.sGBIDRelation = pymt.sGBID
            //            WHERE      pymt.sPaidByGBId = @sGBID or pymt.sGBID = @sGBID; ";
            string sql = @"SELECT   pymt.dtPayment,            pymt.sPaidByGBId,
                                    pymt.sGBID AS sGBIDPaidFor,
                                    pymt.sPaymentCurrency,
                                    pymt.nChatrelTotalAmount,
                                    pymt.sChatrelReceiptNumber,
                                    pymt.sPaymentStatus,
                                    pymt.sPaymentMode,
                                    gb.sFirstName,
                                    gb.sLastName,
                                    gb.sCountryID as sCountryIDPaidFor,
                                    CASE 
                                    	WHEN pymt.sGBId = pymt.sPaidByGBId 
                                    	THEN 'Self'
                                        ELSE 'Friend'
                                    END
                                    AS sRelation
                        FROM       tblchatrelpayment AS pymt
                        INNER JOIN tblgreenbook      AS gb
                        ON         pymt.sGBId = gb.sGBId
                        WHERE      pymt.sPaidByGBId = @sGBID or pymt.sGBID = @sGBID;";
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
                        dtPayment = row.Field<DateTime>("dtPayment"),
                        sChatrelReceiptNumber = row.Field<string>("sChatrelReceiptNumber"),
                        sPaidByGBId = row.Field<string>("sPaidByGBId"),
                        sGBIDPaidFor = row.Field<string>("sGBIDPaidFor"),
                        sCountryIDPaidFor = row.Field<string>("sCountryIDPaidFor"),
                        sFirstName = row.Field<string>("sFirstName"),
                        sLastName = row.Field<string>("sLastName"),
                        sRelation = row.Field<string>("sRelation"),
                        sPaymentCurrency = row.Field<string>("sPaymentCurrency"),
                        nChatrelTotalAmount = row.Field<decimal>("nChatrelTotalAmount"),
                        sPaymentMode = row.Field<string>("sPaymentMode"),
                        sPaymentStatus = row.Field<string>("sPaymentStatus")

                    }).ToList();
                    return paymentHistory;
                }
                return null;
            }
        }
        #endregion

        #region Verify Friend Details
        public bool VerifyFriendDetails( string sGBID, DateTime dtDOB)
        {
            Greenbook greenbook = _greenbookRepository.GetGreenbookByGBID(sGBID);
            if (greenbook != null)
            {
                if (greenbook.dtDOB == dtDOB)
                {
                    return true;
                }
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
                                    `tblchatrelpayment`.`nChatrelYear`,
                                    `tblchatrelpayment`.`nChatrelTotalAmount`,
                                    `tblchatrelpayment`.`sChatrelReceiptNumber`,
                                    `tblchatrelpayment`.`sPaymentStatus`,
                                    `tblchatrelpayment`.`sPaymentMode`,
                                    `tblchatrelpayment`.`sPaymentCurrency`,
                                    `tblchatrelpayment`.`sPaidByGBId`,
                                    `tblchatrelpayment`.`sPayPal_Status`,
                                    `tblchatrelpayment`.`sPayPal_ID`,
                                    `tblchatrelpayment`.`sPayPal_Currency_Code`,
                                    `tblchatrelpayment`.`sPayPal_Currency_Value`,
                                    `tblchatrelpayment`.`sPayPal_Response_Object`,
                                    `tblchatrelpayment`.`dtPayment`,
                                    `tblchatrelpayment`.`dtEntered`,
                                    `tblchatrelpayment`.`nEnteredBy`,
                                    `tblchatrelpayment`.`dtUpdated`,
                                    `tblchatrelpayment`.`nUpdatedBy`
                                FROM `tblchatrelpayment`
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
                                    `tblchatrelpayment`.`nChatrelYear`,
                                    `tblchatrelpayment`.`nChatrelTotalAmount`,
                                    `tblchatrelpayment`.`sChatrelReceiptNumber`,
                                    `tblchatrelpayment`.`sPaymentStatus`,
                                    `tblchatrelpayment`.`sPaymentMode`,
                                    `tblchatrelpayment`.`sPaymentCurrency`,
                                    `tblchatrelpayment`.`sPaidByGBId`,
                                    `tblchatrelpayment`.`sPayPal_Status`,
                                    `tblchatrelpayment`.`sPayPal_ID`,
                                    `tblchatrelpayment`.`sPayPal_Currency_Code`,
                                    `tblchatrelpayment`.`sPayPal_Currency_Value`,
                                    `tblchatrelpayment`.`sPayPal_Response_Object`,
                                    `tblchatrelpayment`.`dtPayment`,
                                    `tblchatrelpayment`.`dtEntered`,
                                    `tblchatrelpayment`.`nEnteredBy`,
                                    `tblchatrelpayment`.`dtUpdated`,
                                    `tblchatrelpayment`.`nUpdatedBy`
                                FROM `tblchatrelpayment`
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
                                    `tblchatrelpayment`.`nChatrelYear`,
                                    `tblchatrelpayment`.`nChatrelTotalAmount`,
                                    `tblchatrelpayment`.`sChatrelReceiptNumber`,
                                    `tblchatrelpayment`.`sPaymentStatus`,
                                    `tblchatrelpayment`.`sPaymentMode`,
                                    `tblchatrelpayment`.`sPaymentCurrency`,
                                    `tblchatrelpayment`.`sPaidByGBId`,
                                    `tblchatrelpayment`.`sPayPal_Status`,
                                    `tblchatrelpayment`.`sPayPal_ID`,
                                    `tblchatrelpayment`.`sPayPal_Currency_Code`,
                                    `tblchatrelpayment`.`sPayPal_Currency_Value`,
                                    `tblchatrelpayment`.`sPayPal_Response_Object`,
                                    `tblchatrelpayment`.`dtPayment`,
                                    `tblchatrelpayment`.`dtEntered`,
                                    `tblchatrelpayment`.`nEnteredBy`,
                                    `tblchatrelpayment`.`dtUpdated`,
                                    `tblchatrelpayment`.`nUpdatedBy`
                                FROM `tblchatrelpayment`
                                WHERE sGBID = @sGBID";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBID", sGBID);
                return GetRecords(command);
            }
        }

        public ChatrelPayment GetChatrelPaymentByGBIDForYear(string sGBID, int year)
        {
            string sql = @"SELECT `tblchatrelpayment`.`Id`,
                                    `tblchatrelpayment`.`sGBId`,
                                    `tblchatrelpayment`.`nChatrelYear`,
                                    `tblchatrelpayment`.`nChatrelTotalAmount`,
                                    `tblchatrelpayment`.`sChatrelReceiptNumber`,
                                    `tblchatrelpayment`.`sPaymentStatus`,
                                    `tblchatrelpayment`.`sPaymentMode`,
                                    `tblchatrelpayment`.`sPaymentCurrency`,
                                    `tblchatrelpayment`.`sPaidByGBId`,
                                    `tblchatrelpayment`.`sPayPal_Status`,
                                    `tblchatrelpayment`.`sPayPal_ID`,
                                    `tblchatrelpayment`.`sPayPal_Currency_Code`,
                                    `tblchatrelpayment`.`sPayPal_Currency_Value`,
                                    `tblchatrelpayment`.`sPayPal_Response_Object`,
                                    `tblchatrelpayment`.`dtPayment`,
                                    `tblchatrelpayment`.`dtEntered`,
                                    `tblchatrelpayment`.`nEnteredBy`,
                                    `tblchatrelpayment`.`dtUpdated`,
                                    `tblchatrelpayment`.`nUpdatedBy`
                                FROM `tblchatrelpayment`
                                WHERE sGBID = @sGBID
                                AND nChatrelYear = @year";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBID", sGBID);
                command.Parameters.AddWithValue("year", year);
                return GetRecord(command);
            }
        }

        #endregion

        #region Get Chatrel Year range for a GBID (if Paid)
        private int[] GetToFromChatrelYear(string sGBID)
        {
            string sql = "SET SESSION sql_mode = '';SELECT min(l2.nChatrelYear), max(nChatrelYear) FROM lnkgbchatrel l2 WHERE l2.sGBId = @sGBID AND l2.chatrelpaymentID = (SELECT max(l2.chatrelpaymentID) FROM lnkgbchatrel l2 WHERE l2.nChatrelYear = (SELECT max(l.nChatrelYear) FROM lnkgbchatrel l WHERE sGBId = @sGBID GROUP BY sGBId) AND l2.sGBId  = @sGBID and l2.nChatrelAmount != 0.00 );";
            using(MySqlCommand command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBID", sGBID);
                command.Connection = _connection;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTable dt = ds.Tables[0];
                if(dt.Rows[0][0].GetType().Name != "DBNull")
                {
                    int min = Convert.ToInt32(dt.Rows[0][0]);
                    int max = Convert.ToInt32(dt.Rows[0][1]);
                    return new[] { min, max };
                }
                return null;
                
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
                nChatrelYear = (int)reader["nChatrelYear"],
                nChatrelTotalAmount = (decimal)reader["nchatrelTotalAmount"],
                sChatrelReceiptNumber = (string)reader["sChatrelReceiptNumber"],
                sPaidByGBId = reader.IsDBNull("sPaidByGBId") ? null : (string)reader["sPaidByGBId"],
                sPaymentStatus = reader.IsDBNull("sPaymentStatus") ? null : (string)reader["sPaymentStatus"],
                sPaymentMode = reader.IsDBNull("sPaymentMode") ? null : (string)reader["sPaymentMode"],
                sPaymentCurrency = reader.IsDBNull("sPaymentCurrency") ? null : (string)reader["sPaymentCurrency"],
                sPayPal_Status = reader.IsDBNull("sPayPal_Status") ? null : (string)reader["sPayPal_Status"],
                sPayPal_ID = reader.IsDBNull("sPayPal_ID") ? null : (string)reader["sPayPal_ID"],
                sPayPal_Currency_Code = reader.IsDBNull("sPayPal_Currency_Code") ? null : (string)reader["sPayPal_Currency_Code"],
                sPayPal_Currency_Value = reader.IsDBNull("sPayPal_Currency_Value") ? null : (string)reader["sPayPal_Currency_Value"],
                sPayPal_Response_Object = reader.IsDBNull("sPayPal_Response_Object") ? null : (string)reader["sPayPal_Response_Object"],
                dtPayment = (DateTime)(reader["dtPayment"]),
                dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"]),
                nEnteredBy = (int)reader["nEnteredBy"],
                dtUpdated = reader.IsDBNull("dtUpdated") ? null : (DateTime?)(reader["dtUpdated"]),
                nUpdatedBy = (int)reader["nUpdatedBy"],
            };
            return chatrelPayment;
        }
        #endregion
    }
}
