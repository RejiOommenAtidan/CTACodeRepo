using CTADBL.BaseClasses.Masters;
using CTADBL.ViewModels;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
namespace CTADBL.ViewModelsRepositories
{
    public class MakeListRepository
    {
        private string _connectionString;
        private static MySqlConnection _connection;

        #region Constructor
        public MakeListRepository(string connectionString)
        {
            _connectionString = connectionString;
            _connection = new MySqlConnection(connectionString);
        }
        #endregion


        #region Get Call

        public IEnumerable<MakeList> GetMakeListData(Dictionary<string, dynamic> dict)
        {
            string sql = @"select  gb.sFirstName, gb.sMiddleName, gb.sLastName, gb.sAliasName, gb.sFathersName, gb.sCity, gb.sOldGreenBkNo, gb.sGBID, gb.sAddress1 from tblgreenbook gb INNER JOIN tblgreenbookissued as gbi on CAST(gbi.ngbid AS CHAR) = gb.sgbid where gbi.dtIssuedDate >= @startDate and gbi.dtIssuedDate <= @endDate and gbi.nMadebTypeId = @nMadebTypeId and gbi.nAuthRegionId = @nAuthRegionId and gbi.nPrinted = @nPrinted ;";

            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("startDate", dict["startDate"]);
                command.Parameters.AddWithValue("endDate", dict["endDate"]);
                command.Parameters.AddWithValue("nMadebTypeId", dict["nMadebTypeId"]);
                command.Parameters.AddWithValue("nAuthRegionId", dict["nAuthRegionId"]);
                command.Parameters.AddWithValue("nPrinted", dict["nPrinted"]);
                command.Connection = _connection;
                command.CommandType = CommandType.Text;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                IEnumerable<MakeList> makeList = tables[0].AsEnumerable().Select(row => new MakeList { sFirstName = row.Field<string>("sFirstName"), sMiddleName = row.Field<string>("sMiddleName"), sLastName = row.Field<string>("sLastName"), sAliasName = row.Field<string>("sAliasName"), sFathersName = row.Field<string>("sFathersName"), sCity = row.Field<string>("sCity"), sOldGreenBkNo = row.Field<string>("sOldGreenBkNo"), sGBID = row.Field<string>("sGBID"), sAddress1 = row.Field<string>("sAddress1") }).ToList();
                return makeList;
            }
        }
        #endregion

        #region Set Printed 

        public string SetPrinted(Dictionary<string, dynamic> dict)
        {
            string sql = @"UPDATE tblgreenbookissued SET nPrinted = 1 WHERE dtIssuedDate >= @startDate AND dtIssuedDate <= @endDate AND nMadebTypeId = @nMadebTypeId AND nAuthRegionId = @nAuthRegionId AND nPrinted = 0" ;
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("startDate", dict["startDate"]);
                command.Parameters.AddWithValue("endDate", dict["endDate"]);
                command.Parameters.AddWithValue("nMadebTypeId", dict["nMadebTypeId"]);
                command.Parameters.AddWithValue("nAuthRegionId", dict["nAuthRegionId"]);
                //command.Parameters.AddWithValue("nPrinted", dict["nPrinted"]);
                command.Connection = _connection;
                command.CommandType = CommandType.Text;
                try
                {
                    _connection.Open();
                    int rowsAffected = command.ExecuteNonQuery();
                    return rowsAffected.ToString();
                }
                catch(Exception ex)
                {
                    return (ex.Message);
                }
                finally
                {
                    _connection.Close();
                }
                
                
            }
        }
        #endregion


    }

}
