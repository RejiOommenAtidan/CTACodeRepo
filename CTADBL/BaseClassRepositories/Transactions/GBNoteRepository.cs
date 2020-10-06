using CTADBL.BaseClasses.Transactions;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
namespace CTADBL.BaseClassRepositories.Transactions
{
    public class GBNoteRepository : ADORepository<GBNote>
    {
        private static MySqlConnection _connection;
        #region Constructor
        public GBNoteRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
        }
        #endregion

        #region Get Calls
        public IEnumerable<GBNote> GetGBNoteByGBID(string sGBID)
        {
            string sql = String.Format(@"SELECT Id, sGBID, sNote, dtEntered, nEnteredBy FROM lnkgbnote WHERE sGBID = @sGBID");
            try
            {
                using (var command = new MySqlCommand(sql))
                {

                    //command.Parameters.AddWithValue("parameter", "gb." + parameter);
                    command.Parameters.AddWithValue("sGBID", sGBID);
                    return GetRecords(command);
                }
            }
            catch (Exception ex)
            {

                return null;
            }
        }
        #endregion

        #region Populate Records
        public override GBNote PopulateRecord(MySqlDataReader reader)
        {
            GBNote note = new GBNote
            {
                Id = (int)reader["Id"],
                sGBID = reader.IsDBNull("sGBID") ? null : (string)reader["sGBID"],
                sNote = reader.IsDBNull("sNote") ? null : (string)reader["sNote"],
                dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"]),
                nEnteredBy = reader.IsDBNull("nEnteredBy") ? null : (int?)reader["nEnteredBy"]
            };

            return note;
        }
        #endregion
    }
}
