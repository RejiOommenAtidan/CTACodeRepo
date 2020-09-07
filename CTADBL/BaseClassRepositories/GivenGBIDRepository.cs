using CTADBL.BaseClasses;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace CTADBL.BaseClassRepositories
{
    public class GivenGBIDRepository : ADORepository<GivenGBID>
    {
        #region Constructor
        public GivenGBIDRepository(string connectionString) : base(connectionString)
        {
        }
        #endregion

        #region Add Call
        public void Add(GivenGBID gbid)
        {
            var builder = new SqlQueryBuilder<GivenGBID>(gbid);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Update User Call
        public void Update(GivenGBID gbid)
        {
            var builder = new SqlQueryBuilder<GivenGBID>(gbid);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Delete User Call
        public void Delete(GivenGBID gbid)
        {
            var builder = new SqlQueryBuilder<GivenGBID>(gbid);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get User/Users Call
        public IEnumerable<GivenGBID> GetAllGivenGBID()
        {
            string sql = @"SELECT `Id`,
                            `nGivenGBId`,
                            `nFormNo`,
                            `dtDate`,
                            `nGivenOrNot`,
                            `nActive`,
                            `sEnteredDateTime`,
                            `nEnteredBy`,
                            `sUpdatedDateTime`,
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
                            `nGivenGBId`,
                            `nFormNo`,
                            `dtDate`,
                            `nGivenOrNot`,
                            `nActive`,
                            `sEnteredDateTime`,
                            `nEnteredBy`,
                            `sUpdatedDateTime`,
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

        #region Populate User Records
        public override GivenGBID PopulateRecord(MySqlDataReader reader)
        {
            return new GivenGBID
            {
                Id = (int)reader["Id"],
                nActive = (int)reader["nActive"],
                dtDate=(DateTime)reader["dtDate"],
                nEnteredBy= (int)reader["nEnteredBy"],
                nFormNo= (int)reader["nFormNo"],
                nGivenGBId=(int)reader["nGivenGBId"],
                nGivenOrNot=(int)reader["nGivenOrNot"],
                nUpdatedBy=(int)reader["nUpdatedBy"],
                sEnteredDateTime=(string)reader["sEnteredDateTime"],
                sUpdatedDateTime = (string)reader["sUpdatedDateTime"]
            };
        }
        #endregion
    }
}
