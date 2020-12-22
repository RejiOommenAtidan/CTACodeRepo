using CTADBL.BaseClasses.Masters;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace CTADBL.BaseClassRepositories.Masters
{
    public class TypeIssuedRepository : ADORepository<TypeIssued>
    {
        #region Constructor
        public TypeIssuedRepository(string connectionString) : base(connectionString)
        {
        }
        #endregion

        #region  Add TypeIssued Call
        public void Add(TypeIssued typeissued)
        {
            var builder = new SqlQueryBuilder<TypeIssued>(typeissued);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Update TypeIssued Call
        public void Update(TypeIssued typeissued)
        {
            var builder = new SqlQueryBuilder<TypeIssued>(typeissued);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Delete TypeIssued Call
        public void Delete(TypeIssued typeissued)
        {
            var builder = new SqlQueryBuilder<TypeIssued>(typeissued);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get TypeIssued Call (SP)
        public IEnumerable<TypeIssued> GetAllTypeIssued()
        {
            // DBAs across the country are having strokes over this next command!
            using (var command = new MySqlCommand("SELECT * FROM lsttypeissued"))
            {
                return GetRecords(command);
            }
        }

        public TypeIssued GetTypeIssuedById(string id)
        {
            // PARAMETERIZED QUERIES!
            using (var command = new MySqlCommand("SELECT * FROM lsttypeissued WHERE Id = @id"))
            {
                //command.Parameters.Add(new ObjectParameter("id", id));
                command.Parameters.AddWithValue("id", id);
                return GetRecord(command);
            }
        }



        #endregion

        #region Populate TypeIssued Records
        public override TypeIssued PopulateRecord(MySqlDataReader reader)
        {
            return new TypeIssued
            {
                Id = (int)reader["Id"],
                sTypeIssued = (string)reader["sTypeIssued"],
                nEnteredBy = (int)reader["nEnteredBy"],
                nUpdatedBy = (int)reader["nUpdatedBy"],
                dtEntered = (DateTime)reader["dtEntered"],
                dtUpdated = (DateTime)reader["dtUpdated"]
            };
        }
        #endregion
    }
}
