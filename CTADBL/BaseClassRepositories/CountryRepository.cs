using System;
using System.Collections.Generic;
using System.Text;
using CTADBL.BaseClasses;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;

namespace CTADBL.BaseClassRepositories
{
    public class CountryRepository : ADORepository<Country>
    {
        #region Constructor
        public CountryRepository(string connectionString) : base(connectionString)
        {

        }
        #endregion

        #region Country Add Call
        public void Add(Country country)
        {
            var builder = new SqlQueryBuilder<Country>(country);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Country Update Call
        public void Update(Country country)
        {
            var builder = new SqlQueryBuilder<Country>(country);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Country Delete Call
        public void Delete(Country country)
        {
            var builder = new SqlQueryBuilder<Country>(country);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get Country/Countries Call 
        public IEnumerable<Country> GetAllCountries()
        {
            // DBAs across the country are having strokes over this next command!
            using (var command = new MySqlCommand("SELECT ID, sCountryID, sCountry FROM lstCountry"))
            {
                return GetRecords(command);
            }
        }
        public Country GetCountryById(string id)
        {
            using (var command = new MySqlCommand("SELECT ID, sCountryID, sCountry FROM lstCountry WHERE ID = @id"))
            {
                command.Parameters.AddWithValue("id", id);
                return GetRecord(command);
            }
        }
        #endregion

        #region Populate Country Records
        public override Country PopulateRecord(MySqlDataReader reader)
        {
            return new Country
            {
                ID = (int)reader["ID"],
                sCountryID = (string)reader["sCountryID"],
                sCountry = (string)reader["sCountry"]
            };
        }
        #endregion
    }
}
