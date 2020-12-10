using CTADBL.BaseClasses.Masters;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace CTADBL.BaseClassRepositories.Masters
{
    public class AuthRegionRepository : ADORepository<AuthRegion>
    {
        private string _sConnectionString;
        #region Constructor
        public AuthRegionRepository(string connectionString) : base(connectionString)
        {
            _sConnectionString = connectionString;
        }
        #endregion

        #region AuthRegion Add Call
        public int Add(AuthRegion region)
        {
            
            
            var builder = new SqlQueryBuilder<AuthRegion>(region);
            return ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region AuthRegion Update Call
        public int Update(AuthRegion region)
        {
            var builder = new SqlQueryBuilder<AuthRegion>(region);
            return ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region AuthRegion Delete Call
        public int Delete(AuthRegion region)
        {
            var builder = new SqlQueryBuilder<AuthRegion>(region);
            return ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get AuthRegion(s) Call 
        public IEnumerable<AuthRegion> GetAllAuthRegions()
        {
            // DBAs across the country are having strokes over this next command!
            using (var command = new MySqlCommand("SELECT ID, sAuthRegion, sCountryID, sCurrencyCode, dtEntered, nEnteredBy, dtUpdated, nUpdatedBy FROM lstauthregion"))
            {
                return GetRecords(command);
            }
        }
        public AuthRegion GetAuthRegionById(string id)
        {
            using (var command = new MySqlCommand("SELECT ID,  sAuthRegion, sCountryID, sCurrencyCode, dtEntered, nEnteredBy, dtUpdated, nUpdatedBy FROM lstauthregion WHERE ID = @id"))
            {
                command.Parameters.AddWithValue("id", id);
                return GetRecord(command);
            }
        }
        #endregion

        #region Duplicity Check
        public bool isDuplicate(AuthRegion region, string[] properties, out string message)
        {
            string s = String.Join(", ", properties);
            string disp="";
            string objValue = "";
            foreach(string prop in properties)
            {
                objValue += region.GetType().GetProperty(prop).GetValue(region).ToString().ToUpper();
                disp += prop.Substring(1) + ", ";
            }
            string sql = String.Format(@"SELECT {0} FROM {1} WHERE Id != {2}", s, "lstauthregion", region.ID);
            using (var command = new MySqlCommand(sql))
            {
                command.Connection = new MySqlConnection(_sConnectionString);
                command.CommandType = CommandType.Text;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                foreach (DataRow row in tables[0].Rows)
                {
                    string dbValue = "";
                    foreach(string prop in properties)
                    {
                        dbValue += row[prop].ToString().ToUpper();
                    }
                    if (dbValue == objValue)
                    {
                        message = String.Format("{0} combination value Duplicate", disp);
                        return true;
                    }
                }

                
                message = "";
                return false;
            }
        }
             
        #endregion

        #region Populate AuthRegion Records
        public override AuthRegion PopulateRecord(MySqlDataReader reader)
        {
            int colIndex1 = reader.GetOrdinal("dtEntered");
            int colIndex2 = reader.GetOrdinal("dtUpdated");

            DateTime? dtEntered = null;
            DateTime? dtUpdated = null;
            if (!reader.IsDBNull(colIndex1))
            {
                dtEntered = (DateTime)reader["dtEntered"];
            }
            if (!reader.IsDBNull(colIndex2))
            {
                dtUpdated = (DateTime)reader["dtUpdated"];
            }
            return new AuthRegion
            {
                ID = (int)reader["ID"],
                sAuthRegion = (string)reader["sAuthRegion"],
                sCountryID = (string)reader["sCountryID"],
                sCurrencyCode = reader.IsDBNull("sCurrencyCode") ? null : (string)(reader["sCurrencyCode"]),
                dtEntered = dtEntered,
                nEnteredBy = (int)reader["nEnteredBy"],
                dtUpdated = dtUpdated,
                nUpdatedBy = (int)reader["nUpdatedBy"]
            };
        }
        #endregion
    }
}
