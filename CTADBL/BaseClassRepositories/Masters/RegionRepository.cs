using CTADBL.BaseClasses.Masters;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace CTADBL.BaseClassRepositories.Masters
{
    public class RegionRepository : ADORepository<Region>
    {
        #region Constructor
        public RegionRepository(string connectionString) : base(connectionString)
        {
        }
        #endregion

        #region Region Add Call
        public void Add(Region region)
        {
            var builder = new SqlQueryBuilder<Region>(region);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Update Region Call
        public void Update(Region region)
        {
            var builder = new SqlQueryBuilder<Region>(region);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Delete Region Call
        public void Delete(Region region)
        {
            var builder = new SqlQueryBuilder<Region>(region);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get Region Call (SP & Normal)
        public IEnumerable<Region> GetAllRegion()
        {
            // DBAs across the country are having strokes over this next command!
            using (var command = new MySqlCommand("SELECT * FROM lstregion"))
            {
                return GetRecords(command);
            }
        }

        public Region GetRegionById(string id)
        {
            // PARAMETERIZED QUERIES!
            using (var command = new MySqlCommand("SELECT * FROM lstregion WHERE Id = @id"))
            {
                //command.Parameters.Add(new ObjectParameter("id", id));
                command.Parameters.AddWithValue("id", id);
                return GetRecord(command);
            }
        }



        #endregion

        #region Populate Region Records
        public override Region PopulateRecord(MySqlDataReader reader)
        {
            return new Region
            {
                Id = (int)reader["Id"],

                sRegion_name = (string)reader["sRegion_name"],
                sRegion_code = (string)reader["sRegion_code"],
                nEnteredBy = (int)reader["nEnteredBy"],
                nUpdatedBy = (int)reader["nUpdatedBy"],
                dtEntered = (DateTime)reader["dtEntered"],
                dtUpdated = (DateTime)reader["dtUpdated"]
            };
        }
        #endregion
    }
}
