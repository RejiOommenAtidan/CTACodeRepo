using CTADBL.BaseClasses.Masters;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace CTADBL.BaseClassRepositories.Masters
{
    public class MadebTypeRepository : ADORepository<MadebType>
    {
        #region Constructor
        public MadebTypeRepository(string connectionString) : base(connectionString)
        {

        }
        #endregion

        #region MadebType Add Call
        public int Add(MadebType madeb)
        {
            var builder = new SqlQueryBuilder<MadebType>(madeb);
            return ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region MadebType Update Call
        public int Update(MadebType madeb)
        {
            var builder = new SqlQueryBuilder<MadebType>(madeb);
            return ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region MadebType Delete Call
        public int Delete(MadebType madeb)
        {
            var builder = new SqlQueryBuilder<MadebType>(madeb);
            return ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get MadebType(s) Call 
        public IEnumerable<MadebType> GetAllMadebTypes()
        {
            // DBAs across the country are having strokes over this next command!
            using (var command = new MySqlCommand("SELECT Id, sMadebType, sMadebDisplayName, sMadebDisplayKey, nMadebFeatureId, dtEntered, nEnteredBy, dtUpdated, nUpdatedBy FROM lstmadebtype"))
            {
                return GetRecords(command);
            }
        }
        public MadebType GetMadebTypeById(string id)
        {
            using (var command = new MySqlCommand("SELECT Id, sMadebType, sMadebDisplayName, sMadebDisplayKey, nMadebFeatureId, dtEntered, nEnteredBy, dtUpdated, nUpdatedBy FROM lstmadebtype WHERE ID = @id"))
            {
                command.Parameters.AddWithValue("id", id);
                return GetRecord(command);
            }
        }
        #endregion

        #region Populate MadebType Records
        public override MadebType PopulateRecord(MySqlDataReader reader)
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

            return new MadebType
            {
                Id = (int)reader["Id"],
                sMadebType = (string)reader["sMadebType"],
                nMadebFeatureId = (int)reader["nMadebFeatureId"],
                sMadebDisplayName = (string)reader["sMadebDisplayName"],
                sMadebDisplayKey = (string)reader["sMadebDisplayKey"],
                dtEntered = dtEntered,
                nEnteredBy = (int)reader["nEnteredBy"],
                dtUpdated = dtUpdated,
                nUpdatedBy = (int)reader["nUpdatedBy"]
            };
        }
        #endregion
    }
}
