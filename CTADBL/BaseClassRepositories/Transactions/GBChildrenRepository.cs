using CTADBL.BaseClasses.Transactions;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace CTADBL.BaseClassRepositories.Transactions
{
    public class GBChildrenRepository : ADORepository<GBChildren>
    {
        #region Constructor
        private static MySqlConnection _connection;
        public GBChildrenRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
        }
        #endregion

        #region Get GBChildren
        public IEnumerable<GBChildren> GetGBChildrenByGBIDParent(string sGBIDParent)
        {
            string sql = @"SELECT Id, sGBIDParent, sName, dtDOB, sGender, sChildID, sGBIDChild, dtEntered, nEnteredBy FROM ctadb.lnkgbchildren WHERE sGBIDParent = @sGBIDParent;";


            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBIDParent", sGBIDParent);
                return GetRecords(command);
            }
        }

        public GBChildren GetGBChildrenById(string Id)
        {
            string sql = @"SELECT `Id`,
                            `sGBIDParent`,
                            `sName`,
                            `dtDOB`,
                            `sGender`,
                            `sChildID`,
                            `sGBIDChild`,
                            `dtEntered`,
                            `nEnteredBy`
                        FROM `lnkgbchildren`
                        WHERE Id = @Id;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("Id", Id);
                return GetRecord(command);
            }
        }
        #endregion

        #region Populate Greenbook Records
        public override GBChildren PopulateRecord(MySqlDataReader reader)
        {
            GBChildren children = new GBChildren
            {
                Id = (int)reader["Id"],
                sGBIDParent = reader.IsDBNull("sGBIDParent") ? null : (string)reader["sGBIDParent"],
                sName = reader.IsDBNull("sName") ? null : (string)reader["sName"],
                dtDOB = reader.IsDBNull("dtDOB") ? null : (DateTime?)(reader["dtDOB"]),
                sGender = reader.IsDBNull("sGender") ? null : (string)reader["sGender"],
                sChildID = reader.IsDBNull("sChildID") ? null : (string)reader["sChildID"],
                sGBIDChild = reader.IsDBNull("sGBIDChild") ? null : (string)reader["sGBIDChild"],
                dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"]),
                nEnteredBy = (int)(reader["nEnteredBy"])
            };
            
            
            
            return children;
        }
        #endregion

        #region Add Call
        public void Add(GBChildren gBChildren)
        {
            var builder = new SqlQueryBuilder<GBChildren>(gBChildren);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Update Call
        public void Update(GBChildren gBChildren)
        {
            var builder = new SqlQueryBuilder<GBChildren>(gBChildren);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Delete Call
        public void Delete(GBChildren gBChildren)
        {
            var builder = new SqlQueryBuilder<GBChildren>(gBChildren);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion
    }
}
