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
            #region Delete by passing object
            var builder = new SqlQueryBuilder<GivenGBID>(gbid);
            ExecuteCommand(builder.GetDeleteCommand());
            #endregion
        }

        public int DeleteGBID(int gbid)
        {
            #region Delete by passing id using stored procedure
            try
            {
                using (var command = new MySqlCommand(""))
                {
                    command.Connection = _connection;
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("sGBIDIN", gbid);
                    _connection.Open();
                    int rowsAffected = command.ExecuteNonQuery();
                    _connection.Close();
                    return rowsAffected;
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





        #region Get Random GBID
        public int GetRandomGBID()
        {
            Random random = new Random();
            string sql = @"select tblgivengbid.nGBId FROM tblgivengbid WHERE nGBID=@nGBID";
            int randomgbid = 0;
            bool unused = false;
            while (!unused)
            {
                using (var command = new MySqlCommand(sql))
                {
                    randomgbid = random.Next(999999, 10000000);
                    command.Connection = _connection;
                    command.CommandType = CommandType.Text;
                    command.Parameters.AddWithValue("nGBID", randomgbid);
                    _connection.Open();
                    var result = command.ExecuteScalar();
                    if(result == null)
                    {
                        unused = true;
                    }
                }
            }
            
            return randomgbid;
        }
        #endregion


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
