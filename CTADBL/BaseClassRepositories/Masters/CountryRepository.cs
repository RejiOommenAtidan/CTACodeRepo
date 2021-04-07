using CTADBL.BaseClasses.Masters;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace CTADBL.BaseClassRepositories.Masters
{
    public class CountryRepository : ADORepository<Country>
    {
        private MySqlConnection _connection;
        #region Constructor
        public CountryRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
        }
        #endregion

        #region Country Add Call
        public int Add(Country country)
        {
            var builder = new SqlQueryBuilder<Country>(country);
            return ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Country Update Call
        public int Update(Country country)
        {
            var builder = new SqlQueryBuilder<Country>(country);
            return ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Country Delete Call
        public int Delete(Country country)
        {
            var builder = new SqlQueryBuilder<Country>(country);
            return ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get Country/Countries Call 
        public IEnumerable<Country> GetAllCountries()
        {
            // DBAs across the country are having strokes over this next command!
            using (var command = new MySqlCommand("SELECT ID, sCountryID, sCountry, nDefaultAuthRegionID, dtEntered, nEnteredBy, dtUpdated, nUpdatedBy FROM lstCountry"))
            {
                return GetRecords(command);
            }
        }
        public Country GetCountryById(string id)
        {
            using (var command = new MySqlCommand("SELECT ID, sCountryID, sCountry, nDefaultAuthRegionID, dtEntered, nEnteredBy, dtUpdated, nUpdatedBy FROM lstCountry WHERE ID = @id"))
            {
                command.Parameters.AddWithValue("id", id);
                return GetRecord(command);
            }
        }

        public int GetDefaultAuthRegionID(string sCountryID)
        {
            using(var command = new MySqlCommand("SELECT nDefaultAuthRegionID FROM lstcountry WHERE sCountryID = @sCountryID;"))
            {
                command.Parameters.AddWithValue("sCountryID", sCountryID);
                _connection.Open();
                command.Connection = _connection;
                int authRegiondID = Convert.ToInt32(command.ExecuteScalar());
                _connection.Close();
                return authRegiondID;
            }
        }

        #endregion




        public bool CountryIdExists(string countryId)
        {
            using (var command = new MySqlCommand("SELECT ID, sCountryID, sCountry, dtEntered, nEnteredBy, dtUpdated, nUpdatedBy FROM lstCountry WHERE sCountryID = @id"))
            {
                command.Parameters.AddWithValue("id", countryId);
                Country country = GetRecord(command);
                if (country != null)// found country
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        #region Populate Country Records
        public override Country PopulateRecord(MySqlDataReader reader)
        {
            return new Country
            {
                ID = (int)reader["ID"],
                sCountryID = (string)reader["sCountryID"],
                sCountry = (string)reader["sCountry"],
                nDefaultAuthRegionID = reader.IsDBNull("nDefaultAuthRegionID") ? null : (int?)(reader["nDefaultAuthRegionID"]),
                dtEntered = (DateTime)(reader["dtEntered"]),
                nEnteredBy = (int)reader["nEnteredBy"],
                dtUpdated = (DateTime)reader["dtUpdated"],
                nUpdatedBy = (int)reader["nUpdatedBy"]
            };
        }
        #endregion
    }
}
