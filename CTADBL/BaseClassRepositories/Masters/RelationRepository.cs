using CTADBL.BaseClasses.Masters;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace CTADBL.BaseClassRepositories.Masters
{
    public class RelationRepository : ADORepository<Relation>
    {
        #region Constructor
        public RelationRepository(string connectionString) : base(connectionString)
        {
        }
        #endregion

        #region Relation Add Call
        public void Add(Relation relation)
        {
            var builder = new SqlQueryBuilder<Relation>(relation);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Update Relation Call
        public void Update(Relation relation)
        {
            var builder = new SqlQueryBuilder<Relation>(relation);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Delete Relation Call
        public void Delete(Relation relation)
        {
            var builder = new SqlQueryBuilder<Relation>(relation);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get Relation Call (SP & Normal)
        public IEnumerable<Relation> GetAllRelation()
        {
            // DBAs across the country are having strokes over this next command!
            using (var command = new MySqlCommand("SELECT * FROM lstrelation"))
            {
                return GetRecords(command);
            }
        }

        public Relation GetRelationById(string id)
        {
            // PARAMETERIZED QUERIES!
            using (var command = new MySqlCommand("SELECT * FROM lstrelation WHERE Id = @id"))
            {
                //command.Parameters.Add(new ObjectParameter("id", id));
                command.Parameters.AddWithValue("id", id);
                return GetRecord(command);
            }
        }



        #endregion

        #region Populate Relation Records
        public override Relation PopulateRecord(MySqlDataReader reader)
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
            return new Relation
            {
                Id = (int)reader["Id"],
                sRelation = (string)reader["sRelation"],
                nEnteredBy = (int)reader["nEnteredBy"],
                nUpdatedBy = (int)reader["nUpdatedBy"],
                dtEntered = dtEntered,
                dtUpdated = dtUpdated

            };
        }
        #endregion
    }
}
