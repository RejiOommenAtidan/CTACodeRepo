using CTADBL.BaseClasses;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
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
            // DBAs across the country are having strokes over this next command!
            using (var command = new MySqlCommand("SELECT Id, sProvince FROM lstprovince"))
            {
                return GetRecords(command);
            }
        }
        public Province GetProvinceById(string id)
        {
            using (var command = new MySqlCommand("SELECT Id, sProvince FROM lstprovince WHERE ID = @id"))
            {
                command.Parameters.AddWithValue("id", id);
                return GetRecord(command);
            }
        }
        #endregion

        #region Populate Province Records
        public override Province PopulateRecord(MySqlDataReader reader)
        {
            return new Province
            {
                Id = (int)reader["Id"],
                sProvince = (string)reader["sProvince"]
            };
        }
        #endregion
    }
}
