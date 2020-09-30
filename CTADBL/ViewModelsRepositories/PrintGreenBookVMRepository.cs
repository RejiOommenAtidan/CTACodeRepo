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
            string sql = @"select gb.sCountryID, gb.sGBID, gb.dtDOB, gb.sDOBApprox, gb.TibetanName, gb.TBUOriginVillage, gbsn.nBookNo from (select nBookNo, sGBID FROM tblgreenbookserial ORDER BY nbookno desc limit 10) as gbsn inner join tblgreenbook as gb on gb.sGBID = gbsn.sGBID;";

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

        public void AddPreviousBookNo(IEnumerable<PrintGreenBookVM> result)
        {
            foreach (var item in result)
            {
                string sql = @"select nBookNo From tblgreenbookserial where sGBId = @sGBID";
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

            }
        }

        #endregion


        public override PrintGreenBookVM PopulateRecord(MySqlDataReader reader)
        {
            PrintGreenBookVM printGreenBookVM = new PrintGreenBookVM
            {
                sCountryID = (string)(reader["sCountryID"]),
                sGBID = (string)(reader["sGBID"]),
                dtDOB = (DateTime)(reader["dtDOB"]),
                sDOBApprox = (string)(reader["sDOBApprox"]),
                TibetanName = (string)(reader["TibetanName"]),
                TBUOriginVillage = (string)(reader["TBUOriginVillage"]),
                nCurrentBookNo = (int)(reader["nBookNo"])
            };
            
            return printGreenBookVM;
        }
    }
}
