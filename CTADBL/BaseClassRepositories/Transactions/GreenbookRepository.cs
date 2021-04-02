using CTADBL.BaseClasses.Transactions;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using TimeZoneConverter;

namespace CTADBL.BaseClassRepositories.Transactions
{
    
    public class GreenbookRepository : ADORepository<Greenbook>
    {
        private static MySqlConnection _connection;
        private GivenGBIDRepository _givenGBIDRepository;
        private GBRelationRepository _gbRelationRepository;
        #region Constructor
        public GreenbookRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
            _givenGBIDRepository = new GivenGBIDRepository(connectionString);
            _gbRelationRepository = new GBRelationRepository(connectionString);
        }
        #endregion

        #region Add Green Book
        public void Add(Greenbook greenbook)
        {
            _connection.Open();
            MySqlTransaction transaction = _connection.BeginTransaction();
            try
            {
                var builder = new SqlQueryBuilder<Greenbook>(greenbook);
                MySqlCommand command = builder.GetInsertCommand();
                command.Transaction = transaction;
                command.Connection = _connection;
                int a = command.ExecuteNonQuery();
                if (a < 1)
                {
                    transaction.Rollback();
                    _connection.Close();
                    return;
                }
                #region Firing Update Query to Change bGivenOrNot to true

                int updatedRows = _givenGBIDRepository.UpdateGivenOrNot(Convert.ToInt32(greenbook.sGBID), command);
                if (updatedRows == 0)
                {
                    transaction.Rollback();
                    _connection.Close();
                    return;
                }
                #endregion

                #region Relations Table Addition

                //Father - 1
                if (!string.IsNullOrEmpty(greenbook.sFathersGBID))
                {
                    Greenbook fatherGB = GetGreenbookByGBID(greenbook.sFathersGBID);
                    if (fatherGB != null)
                    {
                        GBRelation fatherRelation = new GBRelation
                        {
                            sGBID = greenbook.sGBID,
                            sGBIDRelation = greenbook.sFathersGBID,
                            nRelationID = 1,
                            dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time")),
                            dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time")),
                            nEnteredBy = greenbook.nEnteredBy,
                            nUpdatedBy = greenbook.nUpdatedBy
                        };
                        var fbuilder = new SqlQueryBuilder<GBRelation>(fatherRelation);
                        command.CommandText = fbuilder.GetInsertCommand().CommandText;
                        command.ExecuteNonQuery();
                    }
                }
                //Mother - 2
                if (!string.IsNullOrEmpty(greenbook.sMothersGBID))
                {
                    Greenbook motherGB = GetGreenbookByGBID(greenbook.sMothersGBID);
                    if (motherGB != null)
                    {
                        GBRelation motherRelation = new GBRelation
                        {
                            sGBID = greenbook.sGBID,
                            sGBIDRelation = greenbook.sMothersGBID,
                            nRelationID = 2,
                            dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time")),
                            dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time")),
                            nEnteredBy = greenbook.nEnteredBy,
                            nUpdatedBy = greenbook.nUpdatedBy
                        };
                        var mbuilder = new SqlQueryBuilder<GBRelation>(motherRelation);
                        command.CommandText = mbuilder.GetInsertCommand().CommandText;
                        command.ExecuteNonQuery();

                    }
                }
                //Spouse - 3
                if (!string.IsNullOrEmpty(greenbook.sSpouseGBID))
                {
                    Greenbook spouseGB = GetGreenbookByGBID(greenbook.sSpouseGBID);
                    if (spouseGB != null)
                    {
                        GBRelation spouseRelation = new GBRelation
                        {
                            sGBID = greenbook.sGBID,
                            sGBIDRelation = greenbook.sSpouseGBID,
                            nRelationID = 3,
                            dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time")),
                            dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time")),
                            nEnteredBy = greenbook.nEnteredBy,
                            nUpdatedBy = greenbook.nUpdatedBy
                        };
                        var sbuilder = new SqlQueryBuilder<GBRelation>(spouseRelation);
                        command.CommandText = sbuilder.GetInsertCommand().CommandText;
                        command.ExecuteNonQuery();
                    }
                }
                transaction.Commit();
                _connection.Close();
                #endregion
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                _connection.Close();
                throw;
            }
            
        }
        #endregion

        #region Update Green Book
        public void Update(Greenbook greenbook)
        {
            var builder = new SqlQueryBuilder<Greenbook>(greenbook);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Update Green Book Google Account
        public bool UpdateGoogleAccount(string sGBID,string sLoginGmail, string userId, DateTime dtUpdated)
        {
            
            string sql = @"UPDATE tblgreenbook SET sLoginGmail = @sLoginGmail, dtUpdated = @dtUpdated, nUpdatedBy = @nUpdatedBy where sGBID = @sGBID;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sLoginGmail", sLoginGmail);
                command.Parameters.AddWithValue("sGBID", sGBID);
                command.Parameters.AddWithValue("dtUpdated", dtUpdated);
                command.Parameters.AddWithValue("nUpdatedBy", userId);
                command.Connection = _connection;
                //MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                //mySqlDataAdapter
                _connection.Open();
                int result = command.ExecuteNonQuery();
                _connection.Close();
                if (result == 1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
               
            }

        }
        #endregion

        #region Delete Green Book
        public void Delete(Greenbook greenbook)
        {
            var builder = new SqlQueryBuilder<Greenbook>(greenbook);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion


        #region Delete Green Book Stored Procedure
        public int DeleteGreenBook(string sGBID)
        {
            #region Delete by passing id using stored procedure
            try
            {
                using (var command = new MySqlCommand("spDeleteGreenBook"))
                {
                    command.Connection = _connection;
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("sGBIDIN", sGBID);
                    command.Parameters.Add("result", MySqlDbType.Int16);
                    command.Parameters["result"].Direction = ParameterDirection.Output;
                    _connection.Open();
                    int rowsAffected = command.ExecuteNonQuery();
                    _connection.Close();
                    int rows = Convert.ToInt16(command.Parameters["result"].Value);
                    return rows;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return 0;
            }
            #endregion
        }
        #endregion


        #region Get GreenBook few details for New Entry page
        public IEnumerable<Object> GetGreenBooks(int records)
        {
            string sql = @"SELECT `Id`,
                            `sGBID`,
                            `sFirstName`,
                            `sLastName`,
                            `dtDOB` FROM `tblgreenbook`
                        ORDER BY Id DESC,
                                dtUpdated DESC 
                        LIMIT @records;";
            using (var command = new MySqlCommand(sql))
            {
                command.Connection = _connection;
                command.CommandType = CommandType.Text;
                command.Parameters.AddWithValue("records", records);
                command.Connection = _connection;
                DataSet ds = new DataSet();
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                var result = tables[0].AsEnumerable().Select(row => new
                {
                    Id = row.Field<int>("Id"),
                    sGBID = row.Field< string>("sGBID").ToString(),
                    sFirstName = row.Field<string>("sFirstName"),
                    sLastName = row.Field<string>("sLastName"),
                    dtDOB = row.Field<DateTime?>("dtDOB"),
                });
                return result;
            }
        }
        #endregion


        #region Get Green Book/Books
        public IEnumerable<Greenbook> GetAllGreenBooks(int records)
        {
            string sql = @"SELECT `Id`,
                            `_Id`,
                            `sGBID`,
                            `nAuthRegionID`,
                            `sFirstName`,
                            `sMiddleName`,
                            `sLastName`,
                            `sFamilyName`,
                            `sGender`,
                            `dtDOB`,
                            `sDOBApprox`,
                            `sBirthPlace`,
                            `sBirthCountryID`,
                            `sOriginVillage`,
                            `sOriginProvinceID`,
                            `sMarried`,
                            `sOtherDocuments`,
                            `sResidenceNumber`,
                            `sQualificationID`,
                            `sOccupationID`,
                            `sAliasName`,
                            `sOldGreenBKNo`,
                            `sFstGreenBkNo`,
                            `dtFormDate`,
                            `sFathersName`,
                            `sFathersID`,
                            `sFathersGBID`,
                            `sMothersName`,
                            `sMothersID`,
                            `sMothersGBID`,
                            `sSpouseName`,
                            `sSpouseID`,
                            `sSpouseGBID`,
                            `nChildrenM`,
                            `nChildrenF`,
                            `sAddress1`,
                            `sAddress2`,
                            `sCity`,
                            `sState`,
                            `sPCode`,
                            `sCountryID`,
                            `sEmail`,
                            `sPhone`,
                            `sFax`,
                            `dtDeceased`,
                            `sBookIssued`,
                            `dtValidityDate`,
                            `sPaidUntil`,
                            `TibetanName`,
                            `TBUPlaceOfBirth`,
                            `TBUOriginVillage`,
                            `TBUFathersName`,
                            `TBUMothersName`,
                            `TBUSpouseName`,
                            `sLoginGmail`,
                            `dtLastSuccessfullLogin`,
                            `sEnteredDateTime`,
                            `dtEntered`,                            
                            `nEnteredBy`,
                            `dtUpdated`,
                            `nUpdatedBy`
                        FROM `tblgreenbook`
                        ORDER BY Id DESC,
                        dtUpdated DESC 
                        LIMIT @records;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("records", records);
                return GetRecords(command);
            }
        }

        public Greenbook GetGreenboookById(string Id)
        {
            string sql = @"SELECT `Id`,
                            `_Id`,
                            `sGBID`,
                            `nAuthRegionID`,
                            `sFirstName`,
                            `sMiddleName`,
                            `sLastName`,
                            `sFamilyName`,
                            `sGender`,
                            `dtDOB`,
                            `sDOBApprox`,
                            `sBirthPlace`,
                            `sBirthCountryID`,
                            `sOriginVillage`,
                            `sOriginProvinceID`,
                            `sMarried`,
                            `sOtherDocuments`,
                            `sResidenceNumber`,
                            `sQualificationID`,
                            `sOccupationID`,
                            `sAliasName`,
                            `sOldGreenBKNo`,
                            `sFstGreenBkNo`,
                            `dtFormDate`,
                            `sFathersName`,
                            `sFathersID`,
                            `sFathersGBID`,
                            `sMothersName`,
                            `sMothersID`,
                            `sMothersGBID`,
                            `sSpouseName`,
                            `sSpouseID`,
                            `sSpouseGBID`,
                            `nChildrenM`,
                            `nChildrenF`,
                            `sAddress1`,
                            `sAddress2`,
                            `sCity`,
                            `sState`,
                            `sPCode`,
                            `sCountryID`,
                            `sEmail`,
                            `sPhone`,
                            `sFax`,
                            `dtDeceased`,
                            `sBookIssued`,
                            `dtValidityDate`,
                            `sPaidUntil`,
                            `TibetanName`,
                            `TBUPlaceOfBirth`,
                            `TBUOriginVillage`,
                            `TBUFathersName`,
                            `TBUMothersName`,
                            `TBUSpouseName`,
                            `sLoginGmail`,
                            `dtLastSuccessfullLogin`,
                            `sEnteredDateTime`,
                            `dtEntered`,
                            `nEnteredBy`,
                            `dtUpdated`,
                            `nUpdatedBy`
                        FROM `tblgreenbook`
                        WHERE Id=@Id;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("Id", Id);
                return GetRecord(command);
            }
        }
        #endregion

        #region Get GreenBook by passing GreenBook Id.

        public Greenbook GetGreenbookByGBID (string sGBID)
        {
            string sql = @"SELECT `Id`,
                            `_Id`,
                            `sGBID`,
                            `nAuthRegionID`,
                            `sFirstName`,
                            `sMiddleName`,
                            `sLastName`,
                            `sFamilyName`,
                            `sGender`,
                            `dtDOB`,
                            `sDOBApprox`,
                            `sBirthPlace`,
                            `sBirthCountryID`,
                            `sOriginVillage`,
                            `sOriginProvinceID`,
                            `sMarried`,
                            `sOtherDocuments`,
                            `sResidenceNumber`,
                            `sQualificationID`,
                            `sOccupationID`,
                            `sAliasName`,
                            `sOldGreenBKNo`,
                            `sFstGreenBkNo`,
                            `dtFormDate`,
                            `sFathersName`,
                            `sFathersID`,
                            `sFathersGBID`,
                            `sMothersName`,
                            `sMothersID`,
                            `sMothersGBID`,
                            `sSpouseName`,
                            `sSpouseID`,
                            `sSpouseGBID`,
                            `nChildrenM`,
                            `nChildrenF`,
                            `sAddress1`,
                            `sAddress2`,
                            `sCity`,
                            `sState`,
                            `sPCode`,
                            `sCountryID`,
                            `sEmail`,
                            `sPhone`,
                            `sFax`,
                            `dtDeceased`,
                            `sBookIssued`,
                            `dtValidityDate`,
                            `TibetanName`,
                            `TBUPlaceOfBirth`,
                            `TBUOriginVillage`,
                            `TBUFathersName`,
                            `TBUMothersName`,
                            `TBUSpouseName`,
                            `sLoginGmail`,
                            `dtLastSuccessfullLogin`,
                            `sPaidUntil`,
                            `sEnteredDateTime`,
                            `dtEntered`,
                            `nEnteredBy`,
                            `dtUpdated`,
                            `nUpdatedBy`
                        FROM `tblgreenbook`
                        WHERE sGBID=@sGBID;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBID", sGBID);
                return GetRecord(command);
            }
        }

        #endregion


        #region Chatrel Defaulter List

        public IEnumerable<object> GetDefaulterList(int? nAuthRegionID, string? sCountryID, out string message)
        {

            
            
            string sql = String.Empty;
            
            using (var command = new MySqlCommand())
            {
                if (nAuthRegionID != null)
                {
                    sql = @"SELECT t.sGBID, t.sFirstName, t.sLastName, t.sLoginGmail, t.sPaidUntil, null as sAuthRegion, null as sCountry, null as nTotal FROM tblgreenbook t INNER JOIN lstauthregion l2 ON l2.id = t.nAuthRegionID WHERE t.nAuthRegionID = @nAuthRegionID AND (t.sPaidUntil < (IF(MONTH(current_date()) > 3 , (YEAR(current_date()) - 1), (YEAR(current_date()) - 2))) OR t.sPaidUntil IS NULL OR t.sPaidUntil = '');";
                    command.Parameters.AddWithValue("nAuthRegionID", nAuthRegionID);
                    message = "Region";
                }
                else if (sCountryID != null)
                {
                    sql = @"SET SESSION sql_mode = '';SELECT null as sGBID, null as sFirstName, null as sLastName, null as sLoginGmail, null as sPaidUntil, null as sCountry, l2.sAuthRegion, CAST(count(l2.ID) as UNSIGNED) AS nTotal FROM tblgreenbook t inner JOIN lstauthregion l2 ON l2.id = t.nAuthRegionID AND l2.sCountryID=@sCountryID WHERE t.sPaidUntil < (IF(MONTH(current_date()) > 3 , (YEAR(current_date()) - 1), (YEAR(current_date()) - 2))) OR t.sPaidUntil IS NULL OR t.sPaidUntil = '' GROUP BY t.nAuthRegionID;";
                    command.Parameters.AddWithValue("sCountryID", sCountryID);
                    message = "Country";
                }
                else
                {
                    sql = @"SET SESSION sql_mode = '';SELECT null as sGBID, null as sFirstName, null as sLastName, null as sLoginGmail, null as sPaidUntil, null as sAuthRegion, l2.sCountry, CAST(count(l2.sCountryID) AS UNSIGNED) AS nTotal FROM tblgreenbook t inner JOIN lstauthregion l ON l.id = t.nAuthRegionID INNER JOIN lstcountry l2 ON l.sCountryID = l2.sCountryID WHERE t.sPaidUntil < (IF(MONTH(current_date()) > 3 , (YEAR(current_date()) - 1), (YEAR(current_date()) - 2))) OR t.sPaidUntil IS NULL OR t.sPaidUntil = '' GROUP BY l2.sCountryID;";
                    message = "All Countries";
                }
                command.CommandText = sql;
                command.Connection = _connection;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                var result = tables[0].AsEnumerable().Select(row => new
                {
                    sGBID = row.Field<string?>("sGBID"),
                    sFirstName = row.Field<string?>("sFirstName"),
                    sLastName = row.Field<string?>("sLastName"),
                    sLoginGmail = row.Field<string?>("sLoginGmail"),
                    sPaidUntil = row.Field<string?>("sPaidUntil"),
                    sCountry = row.Field<string?>("sCountry"),
                    sAuthRegion = row.Field<string?>("sAuthRegion"),
                    nTotal = row.Field<System.UInt64?>("nTotal"),

                });
                return result;
            }


        }
        #endregion

        #region Chatrel Summary Report

        public IEnumerable<object> GetSummaryReport(DateTime dtFrom,DateTime dtTo, string sPaymentMode, string sCountryID)
        {



            string sql = String.Empty;

            using (var command = new MySqlCommand())
            {
                if (sCountryID == null)
                {
                    sql = @"SET SESSION sql_mode = '';
SELECT CountryID,lst.sCountry,null as sAuthRegion  ,sPaymentCurrency, count(*) AS TotalContributors , null as TotalChatrel FROM (SELECT COALESCE(l.sCountryID, l2.sCountryID) AS CountryID, t.sPaymentCurrency, count(t.sGBId) AS sGBIdcount FROM tblchatrelpayment t  LEFT JOIN lnkgbchatrel l ON l.chatrelpaymentID = t.Id AND t.nChatrelYear = l.nChatrelYear LEFT JOIN lnkgbchatreldonation l2 ON l2.chatrelpaymentID = t.Id where t.dtPayment >= @dtFrom and t.dtPayment <= @dtTo and t.sPaymentMode=@sPaymaneMode GROUP BY t.sGBId) AS temp left join lstcountry lst on lst.sCountryID = temp.CountryID GROUP BY CountryID;";

                    command.Parameters.AddWithValue("sPaymaneMode", sPaymentMode);
                   command.Parameters.AddWithValue("dtFrom", dtFrom.ToString("yyyy-MM-dd"));
                    command.Parameters.AddWithValue("dtTo", dtTo.ToString("yyyy-MM-dd"));
                    
                }
                else
                {
                    sql = @"SET SESSION sql_mode = '';
SELECT CountryID, null as sCountry, l3.sAuthRegion ,sPaymentCurrency, count(*) AS TotalContributors, sum(TotalChatrel) AS TotalChatrel FROM (SELECT COALESCE(l.sCountryID, l2.sCountryID) AS CountryID, COALESCE(l.nAuthRegionID, l2.nAuthRegionID) AS nAuthRegionID, t.sPaymentCurrency, count(t.sGBId) AS sGBIdcount, sum(t.nChatrelTotalAmount) AS TotalChatrel FROM tblchatrelpayment t  LEFT JOIN lnkgbchatrel l ON l.chatrelpaymentID = t.Id AND t.nChatrelYear = l.nChatrelYear LEFT JOIN lnkgbchatreldonation l2 ON l2.chatrelpaymentID = t.Id where t.dtPayment >= @dtFrom and t.dtPayment <= @dtTo and t.sPaymentMode=@sPaymaneMode AND COALESCE(l.sCountryID, l2.sCountryID) = @sCountryID    GROUP BY t.sGBId) AS temp left join lstauthregion l3 on l3.ID = temp.nAuthRegionID GROUP BY nAuthRegionID;

";
                    command.Parameters.AddWithValue("sPaymaneMode", sPaymentMode);
                    command.Parameters.AddWithValue("dtFrom", dtFrom.ToString("yyyy-MM-dd"));
                    command.Parameters.AddWithValue("dtTo", dtTo.ToString("yyyy-MM-dd"));
                    command.Parameters.AddWithValue("sCountryID", sCountryID);
                    
                }
                
                command.CommandText = sql;
                command.Connection = _connection;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                var result = tables[0].AsEnumerable().Select(row => new
                {           
                    sCountryID = row.Field<string?>("CountryID"),
                    sCountry = row.Field<string?>("sCountry"),
                    sPaymentCurrency = row.Field<string?>("sPaymentCurrency"),
                    nCount = row.Field<System.Int64?>("TotalContributors"),
                    sAuthRegion= row.Field<string?>("sAuthRegion"),
                    nTotalChatrel = row.Field<System.Decimal?>("TotalChatrel"),

                });
                return result;
            }


        }
        #endregion

        #region Populate Greenbook Records
        public override Greenbook PopulateRecord(MySqlDataReader reader)
        {
            Greenbook greenbook = new Greenbook();
            greenbook.Id = (int)reader["Id"];
            //Checkout
            greenbook._id = reader.IsDBNull("_Id") ? null : (int?)reader["_Id"];
            greenbook.sGBID = reader.IsDBNull("sGBID") ? null : (string)reader["sGBID"];
            greenbook.nAuthRegionID = (int)reader["nAuthRegionID"];
            greenbook.sFirstName = reader.IsDBNull("sFirstName") ? null : (string)reader["sFirstName"];
            greenbook.sMiddleName = reader.IsDBNull("sMiddleName") ? null : (string)reader["sMiddleName"];
            greenbook.sLastName = reader.IsDBNull("sLastName") ? null : (string)reader["sLastName"];
            greenbook.sFamilyName = reader.IsDBNull("sFamilyName") ? null : (string)reader["sFamilyName"];
            greenbook.sGender = reader.IsDBNull("sGender") ? null : (string)reader["sGender"];
            greenbook.dtDOB = reader.IsDBNull("dtDOB") ? null : (DateTime?)(reader["dtDOB"]);
            greenbook.sDOBApprox = reader.IsDBNull("sDOBApprox") ? null : (string)reader["sDOBApprox"];
            greenbook.sBirthPlace = reader.IsDBNull("sBirthPlace") ? null : (string)reader["sBirthPlace"];
            greenbook.sBirthCountryID = reader.IsDBNull("sBirthCountryID") ? null : (string)reader["sBirthCountryID"];
            greenbook.sOriginVillage = reader.IsDBNull("sOriginVillage") ? null : (string)reader["sOriginVillage"];
            greenbook.sOriginProvinceID = reader.IsDBNull("sOriginProvinceID") ? null : (string)reader["sOriginProvinceID"];
            greenbook.sMarried = reader.IsDBNull("sMarried") ? null : (string)reader["sMarried"];
            greenbook.sOtherDocuments = (string)reader["sOtherDocuments"];
            greenbook.sResidenceNumber = reader.IsDBNull("sResidenceNumber") ? null : (string)reader["sResidenceNumber"];
            greenbook.sQualificationID = reader.IsDBNull("sQualificationID") ? null : (string)reader["sQualificationID"];
            greenbook.sOccupationID = reader.IsDBNull("sOccupationID") ? null : (string)reader["sOccupationID"];
            greenbook.sAliasName = reader.IsDBNull("sAliasName") ? null : (string)reader["sAliasName"];
            greenbook.sOldGreenBKNo = reader.IsDBNull("sOldGreenBKNo") ? null : (string)reader["sOldGreenBKNo"];
            greenbook.sFstGreenBkNo = reader.IsDBNull("sFstGreenBkNo") ? null : (string)reader["sFstGreenBkNo"];
            greenbook.dtFormDate = reader.IsDBNull("dtFormDate") ? null : (DateTime?)(reader["dtFormDate"]);
            greenbook.sFathersName = reader.IsDBNull("sFathersName") ? null : (string)reader["sFathersName"];
            greenbook.sFathersID = reader.IsDBNull("sFathersID") ? null : (string)reader["sFathersID"];
            greenbook.sFathersGBID = reader.IsDBNull("sFathersGBID") ? null : (string)reader["sFathersGBID"];
            greenbook.sMothersName = reader.IsDBNull("sMothersName") ? null : (string)reader["sMothersName"];
            greenbook.sMothersID = reader.IsDBNull("sMothersID") ? null : (string)reader["sMothersID"];
            greenbook.sMothersGBID = reader.IsDBNull("sMothersGBID") ? null : (string)reader["sMothersGBID"];
            greenbook.sSpouseName = reader.IsDBNull("sSpouseName") ? null : (string)reader["sSpouseName"];
            greenbook.sSpouseID = reader.IsDBNull("sSpouseID") ? null : (string)reader["sSpouseID"];
            greenbook.sSpouseGBID = reader.IsDBNull("sSpouseGBID") ? null : (string)reader["sSpouseGBID"];
            greenbook.nChildrenM = (int)reader["nChildrenM"];
            greenbook.nChildrenF = (int)reader["nChildrenF"];
            greenbook.sAddress1 = reader.IsDBNull("sAddress1") ? null : (string)reader["sAddress1"];
            greenbook.sAddress2 = reader.IsDBNull("sAddress2") ? null : (string)reader["sAddress2"];
            greenbook.sCity = reader.IsDBNull("sCity") ? null : (string)reader["sCity"];
            greenbook.sState = reader.IsDBNull("sState") ? null : (string)reader["sState"];
            greenbook.sPCode = reader.IsDBNull("sPCode") ? null : (string)reader["sPCode"];
            greenbook.sCountryID = reader.IsDBNull("sCountryID") ? null : (string)reader["sCountryID"];
            greenbook.sEmail = reader.IsDBNull("sEmail") ? null : (string)reader["sEmail"];
            greenbook.sPhone = reader.IsDBNull("sPhone") ? null : (string)reader["sPhone"];
            greenbook.sFax = reader.IsDBNull("sFax") ? null : (string)reader["sFax"];
            greenbook.dtDeceased = reader.IsDBNull("dtDeceased") ? null : (DateTime?)(reader["dtDeceased"]);
            greenbook.sBookIssued = reader.IsDBNull("sBookIssued") ? null : (string)reader["sBookIssued"];
            greenbook.dtValidityDate = reader.IsDBNull("dtValidityDate") ? null : (DateTime?)(reader["dtValidityDate"]);
            greenbook.sPaidUntil = (string)reader["sPaidUntil"];
            greenbook.TibetanName = (string)reader["TibetanName"];
            greenbook.TBUPlaceOfBirth = (string)reader["TBUPlaceOfBirth"];
            greenbook.TBUOriginVillage = (string)reader["TBUOriginVillage"];
            greenbook.TBUFathersName = (string)reader["TBUFathersName"];
            greenbook.TBUMothersName = (string)reader["TBUMothersName"];
            greenbook.TBUSpouseName = (string)reader["TBUSpouseName"];
            greenbook.sLoginGmail = reader.IsDBNull("sLoginGmail") ? null : (string)reader["sLoginGmail"];
            greenbook.dtLastSuccessfullLogin = reader.IsDBNull("dtLastSuccessfullLogin") ? null : (DateTime?)reader["dtLastSuccessfullLogin"];
            greenbook.sEnteredDateTime = reader.IsDBNull("sEnteredDateTime") ? null : (string)reader["sEnteredDateTime"];
            //Common Props
            greenbook.dtEntered = (DateTime)(reader["dtEntered"]);
            greenbook.nEnteredBy = (int)reader["nEnteredBy"];
            greenbook.dtUpdated = (DateTime)(reader["dtUpdated"]);
            greenbook.nUpdatedBy = (int)reader["nUpdatedBy"];

            return greenbook;
        }
        #endregion
    }
}
