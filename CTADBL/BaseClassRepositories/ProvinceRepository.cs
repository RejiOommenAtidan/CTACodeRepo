using CTADBL.BaseClasses;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace CTADBL.BaseClassRepositories
{
    public class ProvinceRepository : ADORepository<Province>
    {
        public ProvinceRepository(string connectionString) : base(connectionString)
        {

        }

        #region Province Add Call
        public void Add(Province province)
        {
            var builder = new SqlQueryBuilder<Province>(province);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Province Update Call
        public void Update(Province province)
        {
            var builder = new SqlQueryBuilder<Province>(province);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Province Delete Call
        public void Delete(Province province)
        {
            var builder = new SqlQueryBuilder<Province>(province);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get Province(s) Call 
        public IEnumerable<Province> GetAllProvinces()
        {
            using (var command = new MySqlCommand("SELECT Id, sProvince, dtEntered, nEnteredBy, dtUpdated, nUpdatedBy FROM lstprovince"))
            {
                return GetRecords(command);
            }
        }
        public Province GetProvinceById(string id)
        {
            using (var command = new MySqlCommand("SELECT Id, sProvince, dtEntered, nEnteredBy, dtUpdated, nUpdatedBy FROM lstprovince WHERE ID = @id"))
            {
                command.Parameters.AddWithValue("id", id);
                return GetRecord(command);
            }
        }
        #endregion

        #region Populate Province Records
        public override Province PopulateRecord(MySqlDataReader reader)
        {
            //reader.get
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
                dtUpdated = (DateTime)reader["dtEntered"];
            }

            return new Province
            {
                Id = (int)reader["Id"],
                sProvince = (string)reader["sProvince"],
                nEnteredBy = (int)reader["nEnteredBy"],
                nUpdatedBy = (int)reader["nUpdatedBy"],
                dtEntered = dtEntered,
                dtUpdated = dtUpdated
            };
        }
        #endregion
    }
}
