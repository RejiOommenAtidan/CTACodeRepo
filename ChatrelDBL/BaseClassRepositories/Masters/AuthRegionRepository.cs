using ChatrelDBL.BaseClasses.Masters;
using ChatrelDBL.QueryBuilder;
using ChatrelDBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace ChatrelDBL.BaseClassRepositories.Masters
{
    public class AuthRegionRepository : ADORepository<AuthRegion>
    {
        #region Constructor
        public AuthRegionRepository(string connectionString) : base(connectionString)
        {

        }
        #endregion

        #region AuthRegion Add Call
        public int Add(AuthRegion region)
        {
            var builder = new SqlQueryBuilder<AuthRegion>(region);
            return ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region AuthRegion Update Call
        public int Update(AuthRegion region)
        {
            var builder = new SqlQueryBuilder<AuthRegion>(region);
            return ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region AuthRegion Delete Call
        public int Delete(AuthRegion region)
        {
            var builder = new SqlQueryBuilder<AuthRegion>(region);
            return ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get AuthRegion(s) Call 
        public IEnumerable<AuthRegion> GetAllAuthRegions()
        {
            // DBAs across the country are having strokes over this next command!
            using (var command = new MySqlCommand("SELECT ID, sAuthRegion, sCountryID, dtEntered, nEnteredBy, dtUpdated, nUpdatedBy FROM lstauthregion"))
            {
                return GetRecords(command);
            }
        }
        public AuthRegion GetAuthRegionById(string id)
        {
            using (var command = new MySqlCommand("SELECT ID,  sAuthRegion, sCountryID, dtEntered, nEnteredBy, dtUpdated, nUpdatedBy FROM lstauthregion WHERE ID = @id"))
            {
                command.Parameters.AddWithValue("id", id);
                return GetRecord(command);
            }
        }
        #endregion

        #region Populate AuthRegion Records
        public override AuthRegion PopulateRecord(MySqlDataReader reader)
        {
            int colIndex1 = reader.GetOrdinal("dtEntered");
            int colIndex2 = reader.GetOrdinal("dtUpdated");

            DateTime? dtEntered = null;
            DateTime? dtUpdated = null;
            if (!reader.IsDBNull(colIndex1))
            {
                dtEntered = (DateTime)reader["dtEntered"];
            }
            if (!reader.IsDBNull(colIndex2))
            {
                dtUpdated = (DateTime)reader["dtUpdated"];
            }
            return new AuthRegion
            {
                ID = (int)reader["ID"],
                sAuthRegion = (string)reader["sAuthRegion"],
                sCountryID = (string)reader["sCountryID"],
                dtEntered = dtEntered,
                nEnteredBy = (int)reader["nEnteredBy"],
                dtUpdated = dtUpdated,
                nUpdatedBy = (int)reader["nUpdatedBy"]
            };
        }
        #endregion
    }
}
