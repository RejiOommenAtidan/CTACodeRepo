using CTADBL.BaseClasses.Masters;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace CTADBL.BaseClassRepositories.Masters
{
    public class OccupationRepository : ADORepository<Occupation>
    {
        #region Constructor
        public OccupationRepository(string connectionString) : base(connectionString)
        {

        }
        #endregion

        #region Occupation Add Call
        public int Add(Occupation occupation)
        {
            var builder = new SqlQueryBuilder<Occupation>(occupation);
            return ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Occupation Update Call
        public int Update(Occupation occupation)
        {
            var builder = new SqlQueryBuilder<Occupation>(occupation);
            return ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Occupation Delete Call
        public int Delete(Occupation occupation)
        {
            var builder = new SqlQueryBuilder<Occupation>(occupation);
            return ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get Occupation(s) Call 
        public IEnumerable<Occupation> GetAllOccupations()
        {
            // DBAs across the country are having strokes over this next command!
            using (var command = new MySqlCommand("SELECT Id, sOccupationDesc, sOccupationDescTibetan, dtEntered, nEnteredBy, dtUpdated, nUpdatedBy FROM lstoccupation"))
            {
                return GetRecords(command);
            }
        }
        public Occupation GetOccupationById(string id)
        {
            using (var command = new MySqlCommand("SELECT ID,  sOccupationDesc, sOccupationDescTibetan, dtEntered, nEnteredBy, dtUpdated, nUpdatedBy FROM lstoccupation WHERE ID = @id"))
            {
                command.Parameters.AddWithValue("id", id);
                return GetRecord(command);
            }
        }
        #endregion

        #region Populate Occupation Records
        public override Occupation PopulateRecord(MySqlDataReader reader)
        {
            return new Occupation
                {
                    Id = (int)reader["Id"],
                    sOccupationDesc = (string)reader["sOccupationDesc"],
                    sOccupationDescTibetan = (string)reader["sOccupationDescTibetan"],
                    dtEntered = (DateTime)reader["dtEntered"],
                    nEnteredBy = (int)reader["nEnteredBy"],
                    dtUpdated = (DateTime)reader["dtUpdated"],
                    nUpdatedBy = (int)reader["nUpdatedBy"]
                };
        }
        #endregion
    }
}
