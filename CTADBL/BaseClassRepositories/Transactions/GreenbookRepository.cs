using CTADBL.BaseClasses.Transactions;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace CTADBL.BaseClassRepositories.Transactions
{
    
    public class GreenbookRepository : ADORepository<Greenbook>
    {
        private static MySqlConnection _connection;
        #region Constructor
        public GreenbookRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
        }
        #endregion

        #region Add Green Book
        public void Add(Greenbook greenbook)
        {
            var builder = new SqlQueryBuilder<Greenbook>(greenbook);
            int a = ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Update Green Book
        public void Update(Greenbook greenbook)
        {
            var builder = new SqlQueryBuilder<Greenbook>(greenbook);
            ExecuteCommand(builder.GetUpdateCommand());
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
