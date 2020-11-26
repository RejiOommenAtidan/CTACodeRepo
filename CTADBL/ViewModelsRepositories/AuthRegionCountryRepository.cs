using CTADBL.Repository;
using CTADBL.ViewModels;
using MySql.Data.MySqlClient;
using System.Collections.Generic;

namespace CTADBL.ViewModelsRepositories
{
    public class AuthRegionCountryRepository : ADORepository<AuthRegionCountry>
    {
        #region Constructor
        public AuthRegionCountryRepository(string connectionString) : base(connectionString)
        {

        }
        #endregion

        #region Populate Records
        public override AuthRegionCountry PopulateRecord(MySqlDataReader reader)
        {
            return new AuthRegionCountry
            {
                Id = (int)reader["ID"],
                sAuthRegion = (string)reader["sAuthRegion"],
                sCountryID = (string)reader["sCountryID"],
                sCurrencyCode = (string)reader["sCurrencyCode"],
                sCountry = (string)reader["sCountry"]
            };
        }
        #endregion

        #region Get
        public IEnumerable<AuthRegionCountry> GetAuthRegionsCountryName()
        {
            using (var command = new MySqlCommand("SELECT a.ID, a.sAuthRegion, a.sCountryID, a.sCurrencyCode, c.sCountry FROM lstauthregion as a INNER JOIN lstcountry as c ON a.sCountryID = c.sCountryID order by a.ID"))
            {
                return GetRecords(command);
            }
        }
        #endregion
    }
}
