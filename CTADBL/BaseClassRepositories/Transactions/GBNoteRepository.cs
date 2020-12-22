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
        #region Constructor
        private static MySqlConnection _connection;
        public GBNoteRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
        }
        #endregion

        #region Get Calls
        public IEnumerable<GBNote> GetGBNoteByGBID(string sGBID)
        {
            string sql = String.Format(@"SELECT Id, sGBID, sNote, dtEntered, nEnteredBy, dtUpdated, nUpdatedBy FROM lnkgbnote WHERE sGBID = @sGBID");
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

        public GBNote GetGBNoteById(string Id)
        {
            string sql = @"SELECT `Id`,
                            `sGBId`,
                            `sNote`,
                            `dtEntered`,
                            `nEnteredBy,
                            `dtUpdated`,
                            `nUpdatedBy`    
                        FROM `lnkgbnote`
                        WHERE Id = @Id;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("Id", Id);
                return GetRecord(command);
            }
        }

        #endregion

        #region Add Call
        public void Add(GBNote gbNote)
        {
            var builder = new SqlQueryBuilder<GBNote>(gbNote);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Update Call
        public void Update(GBNote gbNote)
        {
            var builder = new SqlQueryBuilder<GBNote>(gbNote);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Delete Call
        public void Delete(GBNote gbNote)
        {
            var builder = new SqlQueryBuilder<GBNote>(gbNote);
            ExecuteCommand(builder.GetDeleteCommand());
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
                dtEntered = (DateTime)(reader["dtEntered"]),
                nEnteredBy = (int)reader["nEnteredBy"],
                dtUpdated = (DateTime)(reader["dtUpdated"]),
                nUpdatedBy = (int)reader["nUpdatedBy"]
            };

            return note;
        }
        #endregion
    }
}
