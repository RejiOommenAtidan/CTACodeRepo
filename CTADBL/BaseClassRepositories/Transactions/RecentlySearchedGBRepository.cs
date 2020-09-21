using CTADBL.BaseClasses.Transactions;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

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

        #region Populate Recently Searched GB Records
        public override RecentlySearchedGB PopulateRecord(MySqlDataReader reader)
        {
            int colIndex1 = reader.GetOrdinal("dtEntered");
            DateTime? dtEntered = null;
            if (!reader.IsDBNull(colIndex1))
            {
                dtEntered = (DateTime)reader["dtEntered"];
            }
            return new RecentlySearchedGB
            {
                ID = (int)reader["ID"],
                nEnteredBy = (int)reader["nEnteredBy"],
                nGBID = (int)reader["nGBID"],
                nUserID = (int)reader["nUserID"],
                dtEntered = dtEntered
            };
        }
        #endregion
    }
}
