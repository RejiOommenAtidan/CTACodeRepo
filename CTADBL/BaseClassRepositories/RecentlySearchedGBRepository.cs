using CTADBL.BaseClasses;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System.Collections.Generic;

namespace CTADBL.BaseClassRepositories
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
                            `sEnteredDateTime`,
                            `nEnteredBy`
                        FROM `tblrecentlysearchedgb`;";
            using (var command = new MySqlCommand(sql))
            {
                return GetRecords(command);
            }
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
                sEnteredDateTime = (string)reader["sEnteredDateTime"]
            };
        }
        #endregion
    }
}
