using CTADBL.BaseClasses.Transactions;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Drawing;

namespace CTADBL.BaseClassRepositories.Transactions
{
    public class GBDocumentRepository : ADORepository<GBDocument>
    {
        private static MySqlConnection _connection;

        #region Constructor
        public GBDocumentRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
        }
        #endregion


        #region
        public IEnumerable<GBDocument> GetGBDocumentsByGBID(string sGBID)
        {
            string sql = String.Format(@"SELECT Id, sGBID, sTitle, sDocType, binFileDoc, sFileExtension, nRegisterDate, dtEntered, nEnteredBy FROM lnkgbdocument WHERE sGBID = @sGBID AND sDocType != 'Photo Identity'");

            try
            {
                using (var command = new MySqlCommand(sql))
                {
                    command.Parameters.AddWithValue("sGBID", sGBID);
                    return GetRecords(command);
                }
            }
            catch(Exception ex)
            {
                return null;
            }
            
        }

        public GBDocument GetDocumentById(string id)
        {
            using (var command = new MySqlCommand("SELECT * FROM lnkgbdocument WHERE ID = @id"))
            {
                command.Parameters.AddWithValue("id", id);
                return GetRecord(command);
            }
        }
        #endregion

        #region Document Delete Call
        public int Delete(GBDocument gbdocument)
        {
            var builder = new SqlQueryBuilder<GBDocument>(gbdocument);
            return ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Populate Records
        public override GBDocument PopulateRecord(MySqlDataReader reader)
        {
            string? binFileDoc = null;
            if (!reader.IsDBNull("binFileDoc"))
            {
                byte[] img = (byte[])reader["binFileDoc"];
                binFileDoc = Convert.ToBase64String(img);
            }

            GBDocument document = new GBDocument
            {
                Id = (int)reader["Id"],
                sGBID = reader.IsDBNull("sGBID") ? null : (string)reader["sGBID"],
                sTitle = reader.IsDBNull("sTitle") ? null : (string)reader["sTitle"],
                sDocType = reader.IsDBNull("sDocType") ? null : (string)reader["sDocType"],
                sFileExtension = reader.IsDBNull("sFileExtension") ? null : (string?)reader["sFileExtension"],
                nRegisterDate = reader.IsDBNull("nRegisterDate") ? null : (int?)reader["nRegisterDate"],
                dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)reader["dtEntered"],
                nEnteredBy = reader.IsDBNull("nEnteredBy") ? null : (int?)reader["nEnteredBy"],
                binFileDoc = binFileDoc
            };
            return document;
        }
        #endregion
    }
}
