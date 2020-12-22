using CTADBL.BaseClasses.Masters;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Data;

namespace CTADBL.BaseClassRepositories.Masters
{
    public class MaritalStatusRepository : ADORepository<MaritalStatus>
    {
        #region Constructor
        public MaritalStatusRepository(string connectionString) : base(connectionString)
        {
        }
        #endregion

        #region MaritalStatus Add Call
        public void Add(MaritalStatus maritalStatus)
        {
            var builder = new SqlQueryBuilder<MaritalStatus>(maritalStatus);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Update MaritalStatus Call
        public void Update(MaritalStatus maritalStatus)
        {
            var builder = new SqlQueryBuilder<MaritalStatus>(maritalStatus);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Delete MaritalStatus Call
        public void Delete(MaritalStatus maritalStatus)
        {
            var builder = new SqlQueryBuilder<MaritalStatus>(maritalStatus);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Populate MaritalStatus Records
        public override MaritalStatus PopulateRecord(MySqlDataReader reader)
        {
            return new MaritalStatus
            {
                Id = (int)reader["Id"],
                sMaritalStatusId = reader.IsDBNull("sMaritalStatusId") ? null : (string)reader["sMaritalStatusId"],
                sMaritalStatusText = reader.IsDBNull("sMaritalStatusText") ? null : (string)reader["sMaritalStatusText"],
                dtEntered = (DateTime)(reader["dtEntered"]),
                nEnteredBy = (int)reader["nEnteredBy"],
                dtUpdated = (DateTime)(reader["dtUpdated"]),
                nUpdatedBy = (int)reader["nUpdatedBy"],
            };
        }
        #endregion
    }
}
