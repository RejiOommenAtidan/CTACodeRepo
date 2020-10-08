using CTADBL.BaseClasses.Transactions;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace CTADBL.BaseClassRepositories.Transactions
{
    public class RecentlySearchedGBRepository : ADORepository<RecentlySearchedGB>
    {
        #region Constructor
        public RecentlySearchedGBRepository(string connectionString) : base(connectionString)
        {
        }
        #endregion

        #region Get Recently Searched GBs
        public IEnumerable<RecentlySearchedGB> GetAllRecentlySearchedGB()
        {
            string sql = @"SELECT `ID`,
                            `nGBID`,
                            `nUserID`,
                            `dtEntered`,
                            `nEnteredBy`
                        FROM `tblrecentlysearchedgb`;";
            using (var command = new MySqlCommand(sql))
            {
                return GetRecords(command);
            }
        }
        #endregion


        #region Add record
        public void Add(RecentlySearchedGB recentlySearchedGB)
        {
            var builder = new SqlQueryBuilder<RecentlySearchedGB>(recentlySearchedGB);
            ExecuteCommand(builder.GetInsertCommand());
        }

        #endregion

        #region Populate Recently Searched GB Records
        public override RecentlySearchedGB PopulateRecord(MySqlDataReader reader)
        {
            
            return new RecentlySearchedGB
            {
                ID = (int)reader["ID"],
                nEnteredBy = (int)reader["nEnteredBy"],
                nGBID = (int)reader["nGBID"],
                nUserID = (int)reader["nUserID"],
                dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"])

            };
        }
        #endregion
    }
}
