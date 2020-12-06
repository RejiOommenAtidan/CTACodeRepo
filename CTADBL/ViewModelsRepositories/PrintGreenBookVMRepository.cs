using CTADBL.BaseClasses.Masters;
using CTADBL.Repository;
using CTADBL.ViewModels;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;


namespace CTADBL.ViewModelsRepositories
{
    public class PrintGreenBookVMRepository : ADORepository<PrintGreenBookVM>
    {
        private string _connectionString;
        private static MySqlConnection _connection;

        #region Constructor
        public PrintGreenBookVMRepository(string connectionString) : base(connectionString)
        {
            _connectionString = connectionString;
            _connection = new MySqlConnection(connectionString);
        }
        #endregion

        #region Get Call
        public IEnumerable<PrintGreenBookVM> GetPrintList(int records = 0)
        {
            string sql = @"SELECT gb.sCountryID, gb.sGBID, CONCAT(gb.sFirstName, ' ' , IFNULL(gb.sMiddleName, ''), ' ', IFNULL(gb.sLastName, '')) AS sName, gb.dtDOB, gb.sDOBApprox, gb.TibetanName, gb.TBUOriginVillage, gbsn.nBookNo FROM (SELECT  max(nBookNo) AS nBookNo, sGBID FROM tblgreenbookserial GROUP BY sGBID ORDER BY nbookno DESC  LIMIT 10) AS gbsn INNER JOIN  tblgreenbook AS gb ON gb.sGBID = gbsn.sGBID;";

            //sql += records > 0 ? (@" LIMIT " + records + ";") : sql += ";";

            using (var command = new MySqlCommand(sql))
            {
                IEnumerable<PrintGreenBookVM> result = GetRecords(command);
                result = result.OrderBy(a => a.nCurrentBookNo);
                AddPreviousBookNo(result);
                //result = result.Reverse();
                return result;

            }
        }
        #endregion

        #region Insert Previous Book Number into object
        private void AddPreviousBookNo(IEnumerable<PrintGreenBookVM> result)
            {
            foreach (var item in result)
            {
                string sql = @"SELECT  nBookNo FROM  tblgreenbookserial WHERE  sGBId = @sGBID ORDER BY nBookNo DESC ";
                using (var command = new MySqlCommand(sql))
                {
                    command.Parameters.AddWithValue("sGBID", item.sGBID);
                    command.Connection = _connection;
                    MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                    DataSet ds = new DataSet();
                    mySqlDataAdapter.Fill(ds);
                    DataTableCollection tables = ds.Tables;
                    List<int> bookNos = tables[0].AsEnumerable().Select(row => row.Field<int>("nBookNo")).ToList();
                    if (bookNos.Count() > 1)
                    {
                        item.nPreviousBookNo = bookNos[1];
                    }
                }
                item.sTibetanDate = ChangeDateToTibetan((item.dtDOB.Value.ToString("yyyy-MM-dd")));

            }
        }
        #endregion

        #region Change Date to Tibetan Date
        private string ChangeDateToTibetan(string date)
        {
            // date = "2020-09-30"
            int[] english = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
            string[] tibetan = {"༠","༡","༢","༣","༤","༥","༦","༧","༨","༩"};
            string tibdate = "";
            for (int i = 0; i < date.Length; i++)
            {
                var value = date.Substring(i, 1);
                tibdate += value == "-" ? "།" : tibetan[Convert.ToInt32(value)];
            }
            return tibdate;
        }
        #endregion

        #region Get Green Book by passing GreenBookSerial Number.
        public PrintGreenBookVM GetGreenBookByGBID(string sGBID)
        {
            string sql = "SELECT gb.sCountryID, gb.sGBID, CONCAT(gb.sFirstName, ' ' , IFNULL(gb.sMiddleName, ''), ' ', IFNULL(gb.sLastName, '')) AS sName, gb.dtDOB, gb.sDOBApprox, gb.TibetanName, gb.TBUOriginVillage, gbsn.nBookNo FROM tblgreenbookserial AS gbsn INNER JOIN tblgreenbook AS gb ON gb.sGBID = gbsn.sGBID WHERE gbsn.sGBID = @sGBID ORDER BY gbsn.nBookNo DESC LIMIT 1;";

            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBID", sGBID);
                IEnumerable<PrintGreenBookVM> result = GetRecords(command);
                AddPreviousBookNo(result);
                //result = result.Reverse();
                return result.First();
            }
        }
        #endregion

        #region Populate records
        public override PrintGreenBookVM PopulateRecord(MySqlDataReader reader)
        {
            PrintGreenBookVM printGreenBookVM = new PrintGreenBookVM
            {
                sCountryID = (string)(reader["sCountryID"]),
                sGBID = (string)(reader["sGBID"]),
                sName = (string)(reader["sName"]),
                dtDOB = (DateTime)(reader["dtDOB"]),
                sDOBApprox = (string)(reader["sDOBApprox"]),
                TibetanName = (string)(reader["TibetanName"]),
                TBUOriginVillage = (string)(reader["TBUOriginVillage"]),
                nCurrentBookNo = (int)(reader["nBookNo"])
            };
            
            return printGreenBookVM;
        }
        #endregion
    }
}
