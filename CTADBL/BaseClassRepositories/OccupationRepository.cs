using System;
using System.Collections.Generic;
using System.Text;
using CTADBL.BaseClasses;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;

namespace CTADBL.BaseClassRepositories
{
    public class OccupationRepository : ADORepository<Occupation>
    {
        #region Constructor
        public OccupationRepository(string connectionString) : base(connectionString)
        {

        }
        #endregion


        #region Occupation Add Call
        public void Add(Occupation occupation)
        {
            var builder = new SqlQueryBuilder<Occupation>(occupation);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Occupation Update Call
        public void Update(Occupation occupation)
        {
            var builder = new SqlQueryBuilder<Occupation>(occupation);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Occupation Delete Call
        public void Delete(Occupation occupation)
        {
            var builder = new SqlQueryBuilder<Occupation>(occupation);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get Occupation(s) Call 
        public IEnumerable<Occupation> GetAllOccupations()
        {
            // DBAs across the country are having strokes over this next command!
            using (var command = new MySqlCommand("SELECT Id, sOccupationDesc, sOccupationDescTibetan FROM lstoccupation"))
            {
                return GetRecords(command);
            }
        }
        public Occupation GetOccupationById(string id)
        {
            using (var command = new MySqlCommand("SELECT ID,  sOccupationDesc, sOccupationDescTibetan FROM lstoccupation WHERE ID = @id"))
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
                sOccupationDescTibetan = (string)reader["sOccupationDescTibetan"]
            };
        }
        #endregion


    }


}
