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
    public class GivenGBIDRepository : ADORepository<GivenGBID>
    {
        private static MySqlConnection _connection;

        #region Constructor
        public GivenGBIDRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
        }
        #endregion

        #region Add Call
        public void Add(GivenGBID gbid)
        {
            var builder = new SqlQueryBuilder<GivenGBID>(gbid);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Update Call
        public void Update(GivenGBID gbid)
        {
            var builder = new SqlQueryBuilder<GivenGBID>(gbid);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Delete Call
        public void Delete(GivenGBID gbid)
        {
            var builder = new SqlQueryBuilder<GivenGBID>(gbid);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get Given GBID/GBIDs Call
        public IEnumerable<GivenGBID> GetAllGivenGBID()
        {
            string sql = @"SELECT `Id`,
                            `_Id`,
                            `nGBId`,
                            `nFormNo`,
                            `dtDate`,
                            IF(nGivenOrNot, 1, 0) nGivenOrNot,
                            IF(nActive, 1, 0) nActive,
                            `dtEntered`,
                            `nEnteredBy`,
                            `dtUpdated`,
                            `nUpdatedBy`
                        FROM `tblgivengbid`;";
            using (var command = new MySqlCommand(sql))
            {
                return GetRecords(command);
            }
        }

        public GivenGBID GetGivenGBID(string Id)
        {
            string sql = @"SELECT `Id`,
                            `_Id`,
                            `nGivenGBId`,
                            `nFormNo`,
                            `dtDate`,
                            IF(nGivenOrNot, 1, 0) nGivenOrNot,
                            IF(nActive, 1, 0) nActive,
                            `dtEntered`,
                            `nEnteredBy`,
                            `dtUpdated`,
                            `nUpdatedBy`
                        FROM `tblgivengbid`
                        WHERE Id=@Id;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("Id", Id);
                return GetRecord(command);
            }
        }
        #endregion


        #region

        public int GetRandomGBID()
        {
            List<int> gbids = null;
            string sql = @"select tblgivengbid.nGBId FROM tblgivengbid";
            var watch = System.Diagnostics.Stopwatch.StartNew();
            using (var command = new MySqlCommand(sql))
            {
                command.Connection = _connection;
                command.CommandType = CommandType.Text;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                gbids = tables[0].AsEnumerable().Select(row => row.Field<int>("nGBId")).ToList();
                
            }
            Random random = new Random();

            int randomgbid = 0;
            bool found = false;
            while (!found)
            {
                randomgbid = random.Next(999999, 10000000);
                foreach (int gbid in gbids)
                {
                    if(gbid == randomgbid)
                    {
                        break;
                    }
                }
                found = true;
            }
            watch.Stop();
            long time = watch.ElapsedMilliseconds;
            return randomgbid;
        }

        #endregion

        public int GetRandomGBID2()
        {
            List<int> gbids = null;
            Random random = new Random();
            int randomgbid = random.Next(999999, 10000000);
            string sql = @"select tblgivengbid.nGBId FROM tblgivengbid WHERE nGBID=@nGBID";
            var watch = System.Diagnostics.Stopwatch.StartNew();
            using (var command = new MySqlCommand(sql))
            {
                command.Connection = _connection;
                command.CommandType = CommandType.Text;
                command.Parameters.AddWithValue("nGBID", randomgbid);
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                int rows = mySqlDataAdapter.Fill(ds);
                //DataTableCollection tables = ds.Tables;
                //gbids = tables[0].AsEnumerable().Select(row => row.Field<int>("nGBId")).ToList();

            }
            

            //int randomgbid = 0;
            //bool found = false;
            //while (!found)
            //{
            //    randomgbid = random.Next(999999, 10000000);
            //    foreach (int gbid in gbids)
            //    {
            //        if (gbid == randomgbid)
            //        {
            //            break;
            //        }
            //    }
            //    found = true;
            //}
            watch.Stop();
            long time = watch.ElapsedMilliseconds;
            return randomgbid;
        }


        #region Populate Given GBID Records
        public override GivenGBID PopulateRecord(MySqlDataReader reader)
        {
            //reader.get
            int colIndex1 = reader.GetOrdinal("dtEntered");
            int colIndex2 = reader.GetOrdinal("dtUpdated");
            int colIndex3 = reader.GetOrdinal("dtDate");

            DateTime? dtEntered = null;
            DateTime? dtUpdated = null;
            DateTime? dtDate = null;

            if (!reader.IsDBNull(colIndex1))
            {
                dtEntered = (DateTime)reader["dtEntered"];
            }

            if (!reader.IsDBNull(colIndex2))
            {
                dtUpdated = (DateTime)reader["dtUpdated"];
            }

            if (!reader.IsDBNull(colIndex3))
            {
                dtDate = (DateTime)reader["dtDate"];
            }

            return new GivenGBID
            {
                Id = (int)reader["Id"],
                //TODO:
                //_id = (int?)reader["_id"],
                nActive = (int)reader["nActive"],
                dtDate = dtDate,
                nFormNo = (int)reader["nFormNo"],
                nGBId = (int)reader["nGBId"],
                nGivenOrNot = (int)reader["nGivenOrNot"],
                //Common Props
                nEnteredBy = (int)reader["nEnteredBy"],
                nUpdatedBy = (int)reader["nUpdatedBy"],
                dtEntered = dtEntered,
                dtUpdated = dtUpdated
            };
        }
        #endregion
    }
}
