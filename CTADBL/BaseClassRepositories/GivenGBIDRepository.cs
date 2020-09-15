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
                            `nGivenGBId`,
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
                //IF(nGivenOrNot, 1, 0) nGivenOrNot,
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
                nGivenGBId = (int)reader["nGivenGBId"],
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
