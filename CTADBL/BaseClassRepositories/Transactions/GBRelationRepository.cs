using CTADBL.BaseClasses.Transactions;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System.Data;

namespace CTADBL.BaseClassRepositories.Transactions
{
    public class GBRelationRepository : ADORepository<GBRelation>
    {
        #region Constructor
        private static MySqlConnection _connection;
        public GBRelationRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
        }
        #endregion

        #region Populate Records
        public override GBRelation PopulateRecord(MySqlDataReader reader)
        {
            GBRelation gbRelation = new GBRelation
            {
                Id = (int)reader["Id"],
                sGBID = reader.IsDBNull("sGBID") ? null : (string)reader["sGBID"],
                sGBIDRelation = reader.IsDBNull("sGBIDRelation") ? null : (string)reader["sGBIDRelation"],
                nRelationID = (int)reader["nRelationID"]
            };
            return gbRelation;
        }
        #endregion

        #region Add Call
        public void Add(GBRelation gbRelation)
        {
            var builder = new SqlQueryBuilder<GBRelation>(gbRelation);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Update Call
        public void Update(GBRelation gBRelation)
        {
            var builder = new SqlQueryBuilder<GBRelation>(gBRelation);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Delete Call
        public void Delete(GBRelation gBRelation)
        {
            var builder = new SqlQueryBuilder<GBRelation>(gBRelation);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion
    }
}
