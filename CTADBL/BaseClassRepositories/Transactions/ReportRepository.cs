using CTADBL.BaseClasses.Transactions;
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


        public IEnumerable<Object> GetReportGreenBookIssuedIndividual(string sMadebDisplayKey, DateTime dtRecordFrom, DateTime dtRecordTo, string sGroupBy ,string sOrderBy)
        {

            using (var command = new MySqlCommand("spReportGreenBookIssuedIndividual"))
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
        public IEnumerable<Object> GetReportGreenBookIssuedOverAll(string sMadebDisplayKey, DateTime dtRecordFrom, DateTime dtRecordTo, string sOrderBy)
        {

            using (var command = new MySqlCommand("spReportGreenBookIssuedOverAll"))
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

                        nGBId = row.Field<int>("nGBId"),
                        sFirstName = row.Field<string>("sFirstName"),
                        sMiddleName = row.Field<string>("sMiddleName"),
                        sLastName = row.Field<string>("sLastName"),
                        dtIssuedDate = row.Field<DateTime>("dtIssuedDate"),
                        nBookNo = row.Field<int>("nBookNo"),
                        sAuthRegion = row.Field<string>("sAuthRegion"),
                        sCountryID = row.Field<string>("sCountryID"),
                    }).ToList();
                    return relationDetails;
                }
                return null;
            }



        }



    }
}
