using CTADBL.BaseClasses;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System.Collections.Generic;

namespace CTADBL.BaseClassRepositories
{
    public class MadebTypeRepository : ADORepository<MadebType>
    {
        #region Constructor
        public MadebTypeRepository(string connectionString) : base(connectionString)
        {

        }
        #endregion

        #region MadebType Add Call
        public void Add(MadebType madeb)
        {
            var builder = new SqlQueryBuilder<MadebType>(madeb);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region MadebType Update Call
        public void Update(MadebType madeb)
        {
            var builder = new SqlQueryBuilder<MadebType>(madeb);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region MadebType Delete Call
        public void Delete(MadebType madeb)
        {
            var builder = new SqlQueryBuilder<MadebType>(madeb);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get MadebType(s) Call 
        public IEnumerable<MadebType> GetAllMadebTypes()
        {
            // DBAs across the country are having strokes over this next command!
            using (var command = new MySqlCommand("SELECT Id, sMadebType FROM lstmadebtype"))
            {
                return GetRecords(command);
            }
        }
        public MadebType GetMadebTypeById(string id)
        {
            using (var command = new MySqlCommand("SELECT Id, sMadebType FROM lstmadebtype WHERE ID = @id"))
            {
                command.Parameters.AddWithValue("id", id);
                return GetRecord(command);
            }
        }
        #endregion

        #region Populate MadebType Records
        public override MadebType PopulateRecord(MySqlDataReader reader)
        {
            return new MadebType
            {
                Id = (int)reader["Id"],
                sMadebType = (string)reader["sMadebType"]
            };
        }
        #endregion
    }
}
