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

        #region Get Calls

        #region GetAll Given GBID
        public IEnumerable<GivenGBID> GetAllGivenGBID()
        {
            
            string sql = @"SELECT
                            `tblgivengbid`.`Id`,
                            `tblgivengbid`.`_Id`,
                            `tblgivengbid`.`nFormNo`,
                            `tblgivengbid`.`nGBId`,
                            `tblgivengbid`.`dtDate`,
                            `tblgivengbid`.`bGivenOrNot`,
                            `tblgivengbid`.`bActive`,
                            `tblgivengbid`.`dtEntered`,
                            `tblgivengbid`.`nEnteredBy`,
                            `tblgivengbid`.`dtUpdated`,
                            `tblgivengbid`.`nUpdatedBy`
                            FROM
                            `tblgivengbid`
                            INNER JOIN tblMadeb
                            on tblMadeb.nFormNumber = tblgivengbid.nFormNo
                            WHERE bGivenOrNot = 0 
                            AND bActive = 1
                            AND nMadebTypeID = 1
                            ORDER BY nFormNo DESC;";
            using (var command = new MySqlCommand(sql))
            {
                return GetRecords(command);
            }
        }
        #endregion

        #region Get Given GBID by Id
        public GivenGBID GetGivenGBID(string Id)
        {
            string sql = @"SELECT `Id`,
                            `_Id`,
                            `nGivenGBId`,
                            `nFormNo`,
                            `dtDate`,
                            `bGivenOrNot`,
                            `bActive`,
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

        #region Get Given GBID for a particular date
        public IEnumerable<GivenGBID> GetGivenGBIDByDate(DateTime date)
        {
            string sql = @"SELECT Id, _Id, nGBId, nFormNo, dtDate, bGivenOrNot, bActive, dtEntered, nEnteredBy, dtUpdated, nUpdatedBy FROM tblgivengbid t WHERE dtDate = @date;";

            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("date", date.ToString("yyyy-MM-dd"));
                var result = GetRecords(command);
                return result;
            }
        }
        #endregion

        #region Get Given GBID record by Form Number

        public GivenGBID GetGivenGBIDByFormNumber(int formNumber)
        {
            string sql = @"SELECT Id, _Id, nGBId, nFormNo, dtDate, bGivenOrNot, bActive, dtEntered, nEnteredBy, dtUpdated, nUpdatedBy FROM tblgivengbid t WHERE t.nFormNo = @formNumber;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("formNumber", formNumber);
                var result = GetRecord(command);
                return result;
            }
        }

        #endregion

        #endregion End all Get Calls

        #region Get Random GBID
        public int GetRandomGBID()
        {
            Random random = new Random();
            //string sql = @"select tblgivengbid.nGBId FROM tblgivengbid WHERE nGBID=@nGBID";
            string sql = @"SELECT t.sGBID FROM (SELECT t1.sGBID FROM tblauditlog t1 WHERE t1.nFeatureID=17 UNION SELECT t2.sGBID FROM tblgreenbook t2) AS t WHERE t.sGBID = @sGBID;";
            int randomgbid = 0;
            bool unused = false;
            _connection.Open();
            while (!unused)
            {
                using (var command = new MySqlCommand(sql))
                {
                    randomgbid = random.Next(999999, 10000000);
                    command.Connection = _connection;
                    command.CommandType = CommandType.Text;
                    command.Parameters.AddWithValue("sGBID", randomgbid.ToString());
                    
                    var result = command.ExecuteScalar();
                    
                    if(result == null)
                    {
                        unused = true;
                    }
                }
            }
            _connection.Close();

            return randomgbid;
        }
        #endregion

        #region Change Status for bGivenOrNot
        public int UpdateGivenOrNot(int nGBId, MySqlCommand command)
        {
            string sql = @"UPDATE tblgivengbid
                        SET bGivenOrNot = 1
                        WHERE nGBId = @nGBId;";

            command.CommandText = sql;
            command.Parameters.AddWithValue("nGBId", nGBId);
            int updateRows = command.ExecuteNonQuery();
            if(updateRows < 1)
            {
                command.Transaction.Rollback();
                return 0;
            }
            return updateRows;
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
            givenGBID.bGivenOrNot = (bool)reader["bGivenOrNot"];
            givenGBID.bActive = (bool)reader["bActive"];
            //Common Props
            givenGBID.dtEntered = (DateTime)(reader["dtEntered"]);
            givenGBID.nEnteredBy = (int)reader["nEnteredBy"];
            givenGBID.dtUpdated = (DateTime)(reader["dtEntered"]);
            givenGBID.nUpdatedBy = (int)reader["nUpdatedBy"];

            return givenGBID;
        }
        #endregion
    }
}
