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
                        FROM `tblgivengbid`
                        WHERE nGivenOrNot = 0
                        ORDER BY nFormNo DESC;";
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
            GivenGBID givenGBID = new GivenGBID();

            givenGBID.Id = (int)reader["Id"];
            givenGBID._id = reader.IsDBNull("_Id") ? null : (int?)(reader["_Id"]);
            givenGBID.nGBId = (int)reader["nGBId"];
            givenGBID.nFormNo = (int)reader["nFormNo"];
            givenGBID.dtDate = reader.IsDBNull("dtDate") ? null : (DateTime?)(reader["dtDate"]);
            givenGBID.nGivenOrNot = (int)reader["nGivenOrNot"];
            givenGBID.nActive = (int)reader["nActive"];
            //Common Props
            givenGBID.dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"]);
            givenGBID.nEnteredBy = (int)reader["nEnteredBy"];
            givenGBID.dtUpdated = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"]);
            givenGBID.nUpdatedBy = (int)reader["nUpdatedBy"];

            return givenGBID;
        }
        #endregion
    }
}
