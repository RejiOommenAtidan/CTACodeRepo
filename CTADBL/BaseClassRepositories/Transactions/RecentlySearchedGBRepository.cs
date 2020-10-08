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
        public IEnumerable<RecentlySearchedGB> GetRecentlySearchedGB(int records, int nUserId)
        {
            string sql = @"SELECT `ID`,
                            `nGBID`,
                            `nUserID`,
                            `dtEntered`,
                            `nEnteredBy`
                        FROM `tblrecentlysearchedgb`
                        WHERE nUserID = @nUserId
                        ORDER BY dtEntered DESC
                        LIMIT @records ;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("nUserId", nUserId);
                command.Parameters.AddWithValue("records", records);
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
            RecentlySearchedGB recentlySearchedGB = new RecentlySearchedGB
            
            {
                ID = (int)reader["ID"],
                nEnteredBy = (int)reader["nEnteredBy"],
                nGBID = (int)reader["nGBID"],
                nUserID = (int)reader["nUserID"],
                dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"])

            };

            return recentlySearchedGB;
        }
        #endregion
    }
}
