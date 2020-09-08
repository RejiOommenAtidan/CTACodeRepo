using System;
using System.Collections.Generic;
using System.Text;
using CTADBL.BaseClasses;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;

namespace CTADBL.BaseClassRepositories
{
    public class AuthRegionRepository : ADORepository<AuthRegion>
    {
        #region Constructor
        public AuthRegionRepository(string connectionString) : base(connectionString)
        {

        }
        #endregion


        #region AuthRegion Add Call
        public void Add(AuthRegion region)
        {
            var builder = new SqlQueryBuilder<AuthRegion>(region);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region AuthRegion Update Call
        public void Update(AuthRegion region)
        {
            var builder = new SqlQueryBuilder<AuthRegion>(region);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region AuthRegion Delete Call
        public void Delete(AuthRegion region)
        {
            var builder = new SqlQueryBuilder<AuthRegion>(region);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get AuthRegion(s) Call 
        public IEnumerable<AuthRegion> GetAllAuthRegions()
        {
            // DBAs across the country are having strokes over this next command!
            using (var command = new MySqlCommand("SELECT ID, sAuthRegion, sCountryID FROM lstauthregion"))
            {
                return GetRecords(command);
            }
        }
        public AuthRegion GetAuthRegionById(string id)
        {
            using (var command = new MySqlCommand("SELECT ID,  sAuthRegion, sCountryID FROM lstauthregion WHERE ID = @id"))
            {
                command.Parameters.AddWithValue("id", id);
                return GetRecord(command);
            }
        }
        #endregion

        #region Populate AuthRegion Records
        public override AuthRegion PopulateRecord(MySqlDataReader reader)
        {
            return new AuthRegion
            {
                ID = (int)reader["ID"],
                sAuthRegion = (string)reader["sAuthRegion"],
                sCountryID = (string)reader["sCountryID"]
            };
        }
        #endregion


    }


}
