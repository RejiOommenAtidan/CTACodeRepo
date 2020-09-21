using CTADBL.BaseClasses.Masters;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace CTADBL.BaseClassRepositories.Masters
{
    public class QualificationRepository : ADORepository<Qualification>
    {
        #region Constructor
        public QualificationRepository(string connectionString) : base(connectionString)
        {
        }
        #endregion

        #region Qualification Add Call
        public void Add(Qualification qualification)
        {
            var builder = new SqlQueryBuilder<Qualification>(qualification);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Update Qualification Call
        public void Update(Qualification qualification)
        {
            var builder = new SqlQueryBuilder<Qualification>(qualification);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Delete Qualification Call
        public void Delete(Qualification qualification)
        {
            var builder = new SqlQueryBuilder<Qualification>(qualification);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get Qualification Call (SP & Normal)
        public IEnumerable<Qualification> GetAllQualification()
        {
            // DBAs across the country are having strokes over this next command!
            using (var command = new MySqlCommand("SELECT * FROM lstqualification"))
            {
                return GetRecords(command);
            }
        }

        public Qualification GetQualificationById(string id)
        {
            // PARAMETERIZED QUERIES!
            using (var command = new MySqlCommand("SELECT * FROM lstqualification WHERE Id = @id"))
            {
                //command.Parameters.Add(new ObjectParameter("id", id));
                command.Parameters.AddWithValue("id", id);
                return GetRecord(command);
            }
        }



        #endregion

        #region Populate Qualification Records
        public override Qualification PopulateRecord(MySqlDataReader reader)
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
            return new Qualification
            {
                Id = (int)reader["Id"],

                sQualificationID = (string)reader["sQualificationID"],
                sQualification = (string)reader["sQualification"],
                nEnteredBy = (int)reader["nEnteredBy"],
                nUpdatedBy = (int)reader["nUpdatedBy"],
                dtEntered = dtEntered,
                dtUpdated = dtUpdated

            };
        }
        #endregion
    }
}
