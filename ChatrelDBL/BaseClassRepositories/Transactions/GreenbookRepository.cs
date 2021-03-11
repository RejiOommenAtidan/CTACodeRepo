using ChatrelDBL.BaseClasses.Transactions;
using ChatrelDBL.QueryBuilder;
using ChatrelDBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace ChatrelDBL.BaseClassRepositories.Transactions
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

        //#region Add Green Book
        //public void Add(Greenbook greenbook)
        //{
        //    var builder = new SqlQueryBuilder<Greenbook>(greenbook);
        //    int a = ExecuteCommand(builder.GetInsertCommand());
        //}
        //#endregion

        //#region Update Green Book
        //public void Update(Greenbook greenbook)
        //{
        //    var builder = new SqlQueryBuilder<Greenbook>(greenbook);
        //    ExecuteCommand(builder.GetUpdateCommand());
        //}
        //#endregion

        //#region Delete Green Book
        //public void Delete(Greenbook greenbook)
        //{
        //    var builder = new SqlQueryBuilder<Greenbook>(greenbook);
        //    ExecuteCommand(builder.GetDeleteCommand());
        //}
        //#endregion


        
        //#region Delete Green Book Stored Procedure
        //public int DeleteGreenBook(string sGBID)
        //{
        //    #region Delete by passing id using stored procedure
        //    try
        //    {
        //        using (var command = new MySqlCommand("spDeleteGreenBook"))
        //        {
        //            command.Connection = _connection;
        //            command.CommandType = CommandType.StoredProcedure;
        //            command.Parameters.AddWithValue("sGBIDIN", sGBID);
        //            command.Parameters.Add("result", MySqlDbType.Int16);
        //            command.Parameters["result"].Direction = ParameterDirection.Output;
        //            _connection.Open();
        //            int rowsAffected = command.ExecuteNonQuery();
        //            _connection.Close();
        //            int rows = Convert.ToInt16(command.Parameters["result"].Value);
        //            return rows;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine(ex.Message);
        //        return 0;
        //    }
        //    #endregion
        //}
        //#endregion
        

        //#region Get Green Book/Books
        //public IEnumerable<Greenbook> GetAllGreenBooks(int records)
        //{
        //    string sql = @"SELECT `Id`,
        //                    `sGBID`,
        //                    `nAuthRegionID`,
        //                    `sFirstName`,
        //                    `sMiddleName`,
        //                    `sLastName`,
        //                    `sFamilyName`,
        //                    `sGender`,
        //                    `dtDOB`,
                            
        //                    `sEmail`,
        //                    `sPhone`,
                            
        //                    `dtDeceased`,
        //                    `sCountryID`,
        //                    `sPaidUntil`,
        //                    `sLoginGmail`,
        //                    `dtLastSuccessfullLogin`,                           
        //                    `dtEntered`,
        //                    `nEnteredBy`,
        //                    `dtUpdated`,
        //                    `nUpdatedBy`
        //                FROM `tblgreenbook`;
        //                ORDER BY Id DESC,
        //                dtUpdated DESC 
        //                LIMIT @records;";
        //    using (var command = new MySqlCommand(sql))
        //    {
        //        command.Parameters.AddWithValue("records", records);
        //        return GetRecords(command);
        //    }
        //}

        //public Greenbook GetGreenboookById(string Id)
        //{
        //    string sql = @"SELECT `Id`,
        //                    `sGBID`,
        //                    `nAuthRegionID`,
        //                    `sFirstName`,
        //                    `sMiddleName`,
        //                    `sLastName`,
        //                    `sFamilyName`,
        //                    `sGender`,
        //                    `dtDOB`,
        //                    `sEmail`,
        //                    `sPhone`,
                            
        //                    `dtDeceased`,
        //                    `sCountryID`,
        //                    `sPaidUntil`,
        //                    `sLoginGmail`,
        //                    `dtLastSuccessfullLogin`,
        //                    `dtEntered`,
        //                    `nEnteredBy`,
        //                    `dtUpdated`,
        //                    `nUpdatedBy`
        //                FROM `tblgreenbook`
        //                WHERE Id=@Id;";
        //    using (var command = new MySqlCommand(sql))
        //    {
        //        command.Parameters.AddWithValue("Id", Id);
        //        return GetRecord(command);
        //    }
        //}
        //#endregion

        #region Get GreenBook by passing GreenBook Id.

        public Greenbook GetGreenbookByGBID(string sGBID)
        {
            string sql = @"SELECT `Id`,
                            `sGBID`,
                            `nAuthRegionID`,
                            `sFirstName`,
                            
                            `sLastName`,
                            
                            `dtDOB`,
                            
                            `sEmail`,
                            `sPhone`,
                            
                            `dtDeceased`,
                            `sCountryID`,
                            `sPaidUntil`,
                            `sLoginGmail`,
                            `dtLastSuccessfullLogin`,
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
            greenbook.sGBID = reader.IsDBNull("sGBID") ? null : (string)reader["sGBID"];
            greenbook.nAuthRegionID = (int)reader["nAuthRegionID"];
            greenbook.sFirstName = reader.IsDBNull("sFirstName") ? null : (string)reader["sFirstName"];
            //greenbook.sMiddleName = reader.IsDBNull("sMiddleName") ? null : (string)reader["sMiddleName"];
            greenbook.sLastName = reader.IsDBNull("sLastName") ? null : (string)reader["sLastName"];
            //greenbook.sFamilyName = reader.IsDBNull("sFamilyName") ? null : (string)reader["sFamilyName"];
            //greenbook.sGender = reader.IsDBNull("sGender") ? null : (string)reader["sGender"];
            greenbook.dtDOB = reader.IsDBNull("dtDOB") ? null : (DateTime?)(reader["dtDOB"]);
            //greenbook.sMarried = reader.IsDBNull("sMarried") ? null : (string)reader["sMarried"];
            //greenbook.sFathersName = reader.IsDBNull("sFathersName") ? null : (string)reader["sFathersName"];
            //greenbook.sFathersID = reader.IsDBNull("sFathersID") ? null : (string)reader["sFathersID"];
            //greenbook.sFathersGBID = reader.IsDBNull("sFathersGBID") ? null : (string)reader["sFathersGBID"];
            //greenbook.sMothersName = reader.IsDBNull("sMothersName") ? null : (string)reader["sMothersName"];
            //greenbook.sMothersID = reader.IsDBNull("sMothersID") ? null : (string)reader["sMothersID"];
            //greenbook.sMothersGBID = reader.IsDBNull("sMothersGBID") ? null : (string)reader["sMothersGBID"];
            //greenbook.sSpouseName = reader.IsDBNull("sSpouseName") ? null : (string)reader["sSpouseName"];
            //greenbook.sSpouseID = reader.IsDBNull("sSpouseID") ? null : (string)reader["sSpouseID"];
            //greenbook.sSpouseGBID = reader.IsDBNull("sSpouseGBID") ? null : (string)reader["sSpouseGBID"];
            //greenbook.nChildrenM = (int)reader["nChildrenM"];
            //greenbook.nChildrenF = (int)reader["nChildrenF"];
            greenbook.sEmail = reader.IsDBNull("sEmail") ? null : (string)reader["sEmail"];
            greenbook.sPhone = reader.IsDBNull("sPhone") ? null : (string)reader["sPhone"];
            //greenbook.sFax = reader.IsDBNull("sFax") ? null : (string)reader["sFax"];
            greenbook.dtDeceased = reader.IsDBNull("dtDeceased") ? null : (DateTime?)(reader["dtDeceased"]);
            greenbook.sCountryID = reader.IsDBNull("sCountryID") ? null : (string)reader["sCountryID"];
            greenbook.sPaidUntil = (string)reader["sPaidUntil"];
            greenbook.sLoginGmail = reader.IsDBNull("sLoginGmail") ? null : (string)reader["sLoginGmail"];
            greenbook.dtLastSuccessfullLogin = reader.IsDBNull("dtLastSuccessfullLogin") ? null : (DateTime?)reader["dtLastSuccessfullLogin"];
            
            //Common Props
            greenbook.dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"]);
            greenbook.nEnteredBy = (int)reader["nEnteredBy"];
            greenbook.dtUpdated = reader.IsDBNull("dtUpdated") ? null : (DateTime?)(reader["dtUpdated"]);
            greenbook.nUpdatedBy = (int)reader["nUpdatedBy"];

            return greenbook;
        }
        #endregion
    }
}
