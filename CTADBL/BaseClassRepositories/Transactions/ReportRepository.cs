﻿using CTADBL.BaseClasses.Transactions;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace CTADBL.BaseClassRepositories.Transactions
{
    public class ReportRepository
    {
        private static MySqlConnection _connection;
        

        #region Constructor
        public ReportRepository(string connectionString)
        {
            _connection = new MySqlConnection(connectionString);
            
        }
        #endregion


        public IEnumerable<Object> GetReportGreenBookIssuedOverAll(int sMadebDisplayKey, DateTime dtRecordFrom, DateTime dtRecordTo, string sGroupBy ,string sOrderBy)
        {

            using (var command = new MySqlCommand("spReportGreenBookIssuedOverAll"))
            {
                command.Parameters.AddWithValue("sMadebDisplayKey", sMadebDisplayKey);
                command.Parameters.AddWithValue("dtRecordFrom", dtRecordFrom);
                command.Parameters.AddWithValue("dtRecordTo", dtRecordTo);
                command.Parameters.AddWithValue("sGroupBy", sGroupBy);
                command.Parameters.AddWithValue("sOrderBy", sOrderBy);

                command.Connection = _connection;
                command.CommandType = CommandType.StoredProcedure;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                if (tables != null && tables.Count > 0)
                {
                    var relationDetails = tables[0].AsEnumerable().Select(row => new {

                        IndividualPlace = row.Field<string>("IndividualPlace"),
                        nCount = row.Field<System.Int64>("nCount"),
                    }).ToList();
                    return relationDetails;
                }
                return null;
            }



        }
        public IEnumerable<Object> GetReportGreenBookIssuedIndividual(int sMadebDisplayKey, DateTime dtRecordFrom, DateTime dtRecordTo, string sOrderBy)
        {

            using (var command = new MySqlCommand("spReportGreenBookIssuedIndividual"))
            {
                command.Parameters.AddWithValue("sMadebDisplayKey", sMadebDisplayKey);
                command.Parameters.AddWithValue("dtRecordFrom", dtRecordFrom);
                command.Parameters.AddWithValue("dtRecordTo", dtRecordTo);
                command.Parameters.AddWithValue("sOrderBy", sOrderBy);
                var sPlace = "";
                if (sOrderBy == "lstcountry.sCountry") {
                    sPlace = "sCountry";
                }
                else if (sOrderBy == "lstauthregion.sAuthRegion")   
                {
                    sPlace = "sAuthRegion";
                }
                command.Connection = _connection;
                command.CommandType = CommandType.StoredProcedure;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                if (tables != null && tables.Count > 0)
                {
                    var relationDetails = tables[0].AsEnumerable().Select(row => new {

                        nGBId = row.Field<int?>("nGBId"),
                        sName = row.Field<string>("sName"),
                      
                        dtIssuedDate = row.Field<DateTime?>("dtIssuedDate"),
                        nBookNo = row.Field<int?>("nBookNo"),
                        sPlace = row.Field<string>(sPlace),
                        
                    }).ToList();
                    return relationDetails;
                }
                return null;
            }



        }


        public IEnumerable<Object> GetReportCTABelow6Years(string sOrderBy)
        {

            using (var command = new MySqlCommand("spReportCTABelow6Years"))
            {
                command.Parameters.AddWithValue("sOrderBy", sOrderBy);


                command.Connection = _connection;
                command.CommandType = CommandType.StoredProcedure;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                if (tables != null && tables.Count > 0)
                {
                    var relationDetails = tables[0].AsEnumerable().Select(row => new {
                        sGBId = row.Field<string>("sGBId"),
                        sName = row.Field<string>("sName"),
                        
                        dtDOB = row.Field<DateTime>("dtDOB"),
                        sPlace = row.Field<string>("sPlace"),


                    }).ToList();
                    return relationDetails;
                }
                return null;
            }
        }
        public IEnumerable<Object> GetReportCTANewEntryFromDay(DateTime dtRecordFrom)
        {

            using (var command = new MySqlCommand("spReportCTANewEntryFromDay"))
            {
                command.Parameters.AddWithValue("dtRecordFrom", dtRecordFrom);


                command.Connection = _connection;
                command.CommandType = CommandType.StoredProcedure;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                if (tables != null && tables.Count > 0)
                {
                    var relationDetails = tables[0].AsEnumerable().Select(row => new {
                        sGBId = row.Field<string>("sGBId"),
                     
                        sName = row.Field<string>("sName"),
                        dtEntered = row.Field<DateTime>("dtEntered"),
                        sFullName = row.Field<string>("sFullName"),
                        sOffice = row.Field<string>("sOffice"),


                    }).ToList();
                    return relationDetails;
                }
                return null;
            }
        }


        public IEnumerable<Object> GetReportCTAChangesLogForChildren(DateTime dtRecordFrom)
        {

            using (var command = new MySqlCommand("spReportCTAChangesLogForChildren"))
            {
                command.Parameters.AddWithValue("dtRecordFrom", dtRecordFrom);


                command.Connection = _connection;
                command.CommandType = CommandType.StoredProcedure;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                if (tables != null && tables.Count > 0)
                {
                    var relationDetails = tables[0].AsEnumerable().Select(row => new {
                        sGBId = row.Field<string>("sGBId"),
                        sName = row.Field<string>("sName"),
                        sFeature = row.Field<string>("sFeature"),
                        sFieldValuesOld = row.Field<string>("sFieldValuesOld"),
                        sFieldValuesNew = row.Field<string>("sFieldValuesNew"),
                        sFullName = row.Field<string>("sFullName"),
                        dtEntered = row.Field<DateTime>("dtEntered"),


                    }).ToList();
                    return relationDetails;
                }
                return null;
            }
        }

        public IEnumerable<Object> GetReportCTAChangesLog(DateTime dtRecordFrom)
        {

            using (var command = new MySqlCommand("spReportCTAChangesLog"))
            {
                command.Parameters.AddWithValue("dtRecordFrom", dtRecordFrom);


                command.Connection = _connection;
                command.CommandType = CommandType.StoredProcedure;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                if (tables != null && tables.Count > 0)
                {
                    var relationDetails = tables[0].AsEnumerable().Select(row => new {
                        sGBId = row.Field<string>("sGBId"),
                        sName = row.Field<string>("sName"),
                        sFeature = row.Field<string>("sFeature"),
                        sFieldValuesOld = row.Field<string>("sFieldValuesOld"),
                        sFieldValuesNew = row.Field<string>("sFieldValuesNew"),
                        sFullName = row.Field<string>("sFullName"),
                        dtEntered = row.Field<DateTime>("dtEntered"),


                    }).ToList();
                    return relationDetails;
                }
                return null;
            }
        }
        public IEnumerable<Object> GetReportCTADeceasedRegionOrCountryWise(DateTime dtRecordFrom, DateTime dtRecordTo, string sOrderBy)
        {

            using (var command = new MySqlCommand("spReportCTADeceasedRegionOrCountryWise"))
            {
                command.Parameters.AddWithValue("dtRecordFrom", dtRecordFrom);
                command.Parameters.AddWithValue("dtRecordTo", dtRecordTo);
                command.Parameters.AddWithValue("sOrderBy", sOrderBy);


                command.Connection = _connection;
                command.CommandType = CommandType.StoredProcedure;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                if (tables != null && tables.Count > 0)
                {
                    var relationDetails = tables[0].AsEnumerable().Select(row => new {
                        sGBID = row.Field<string>("sGBID"),
                        sName = row.Field<string>("sName"),
                        
                        dtDOB = row.Field<DateTime>("dtDOB"),
                        dtDeceased = row.Field<DateTime>("dtDeceased"),
                        sPlace = row.Field<string>("sPlace"),
                        DeathAge = row.Field<double>("DeathAge"),


                    }).ToList();
                    return relationDetails;
                }
                return null;
            }
        }

        public IEnumerable<Object> GetReportCTAMadebRegionOrCountryWise(int sMadebDisplayKey, DateTime dtRecordFrom, DateTime dtRecordTo, string sOrderBy)
        {

            using (var command = new MySqlCommand("spReportCTAMadebRegionOrCountryWise"))
            {
                command.Parameters.AddWithValue("sMadebDisplayKey", sMadebDisplayKey);
                command.Parameters.AddWithValue("dtRecordFrom", dtRecordFrom);
                command.Parameters.AddWithValue("dtRecordTo", dtRecordTo);
                command.Parameters.AddWithValue("sOrderBy", sOrderBy);


                command.Connection = _connection;
                command.CommandType = CommandType.StoredProcedure;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                if (tables != null && tables.Count > 0)
                {
                    var relationDetails = tables[0].AsEnumerable().Select(row => new {
                        sPlaceName = row.Field<string>("sPlaceName"),
                        sPlaceID = row.Field<string>("sPlaceID").ToString(),
                        MadebIssued = row.Field<decimal>("MadebIssued"),
                        MadebRejected = row.Field<decimal>("MadebRejected"),
                        MadebDouble = row.Field<decimal>("MadebDouble"),
                        MadebCancelled = row.Field<decimal>("MadebCancelled"),
                        MadebPending = row.Field<decimal>("MadebPending"),
                        MadebTotalReceived = row.Field<Int64>("MadebTotalReceived"),
         


                    }).ToList();
                    return relationDetails;
                }
                return null;
            }
        }


    }
}
