using CTADBL.BaseClasses.Transactions;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace CTADBL.BaseClassRepositories.Transactions
{
    public class GBDocumentRepository : ADORepository<GBDocument>
    {
        #region Constructor
        private static MySqlConnection _connection;
        public GBDocumentRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
        }
        #endregion

        #region Get Calls
        public IEnumerable<Object> GetGBDocumentsByGBID(string sGBID)
        {
            string sql = String.Format(@"SELECT l.Id, sGBID, sTitle, sDocType, binFileDoc, sFileExtension, nRegisterDate, l.dtEntered, l.nEnteredBy, l.dtUpdatedBy, l.nUpdatedBy, t.sFullName FROM lnkgbdocument l LEFT JOIN tbluser t ON t.id = l.nEnteredBy WHERE sGBID = @sGBID;");

            try
            {
                using (var command = new MySqlCommand(sql))
                {
                    command.Parameters.AddWithValue("sGBID", sGBID);
                    command.Connection = _connection;
                    command.CommandType = CommandType.Text;
                    MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                    DataSet ds = new DataSet();
                    mySqlDataAdapter.Fill(ds);
                    DataTableCollection tables = ds.Tables;
                    var result = tables[0].AsEnumerable().Select(row => new
                    {
                        Id = row.Field<int>("Id"),
                        sGBID = row.Field<string>("sGBID"),
                        sTitle = row.Field<string>("sTitle"),
                        sDocType = row.Field<string>("sDocType"),
                        binFileDoc = Convert.ToBase64String(row.Field<byte[]>("binFileDoc")),
                        sFileExtension = row.Field<string>("sFileExtension"),
                        nRegisterDate = row.Field<int?>("nRegisterDate"),
                        dtEntered = row.Field<DateTime>("dtEntered"),
                        sFullName = row.Field<string?>("sFullName"),

                    });
                    //return GetRecords(command);
                    return result;
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

        public IEnumerable<GBDocument> GetAllGBDocumentsByGBID(string sGBID)
        {
            string sql = @"SELECT`id`,
                           `sGBId`,
                           `sTitle`,
                           `sDocType`,
                           `binFileDoc`,
                           `sFileExtension`,
                           `nRegisterDate`,
                           `dtEntered`,
                           `nEnteredBy`,
                            `dtUpdated`,
                            `nUpdatedBy`
                        FROM `lnkgbdocument`
                        WHERE sGBID = @sGBID;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBID", sGBID);
                return GetRecords(command);
            }

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
                dtEntered = (DateTime)reader["dtEntered"],
                dtUpdated = (DateTime)reader["dtUpdated"],
                nEnteredBy = (int)(reader["nEnteredBy"]),
                nUpdatedBy = (int)(reader["nUpdatedBy"]),
                binFileDoc = binFileDoc
            };
            return document;
        }
        #endregion

        #region Add Call
        public void Add(GBDocument gbdocument)
        {
            gbdocument.binFileDoc = gbdocument.binFileDoc.Substring(gbdocument.binFileDoc.IndexOf("base64,") + 7);
            byte[] newbytes = Convert.FromBase64String(gbdocument.binFileDoc);
            gbdocument.binFileDoc = string.Empty;
            var builder = new SqlQueryBuilder<GBDocument>(gbdocument);
            
            MySqlCommand command = builder.GetInsertCommand();

            _connection.Open();
            MySqlTransaction transaction = _connection.BeginTransaction();
            command.Transaction = transaction;
            command.Connection = _connection;

            try
            {
               
                command.ExecuteNonQuery();
                long insertId = command.LastInsertedId;
                string sql = @"UPDATE lnkgbdocument SET binFileDoc = @newbytes WHERE id = @insertId;";
                command.CommandText = sql;
                command.CommandType = CommandType.Text;
                command.Parameters.AddWithValue("newbytes", newbytes);
                command.Parameters.AddWithValue("insertId", insertId);
                command.Transaction = transaction;
                command.ExecuteNonQuery();
                transaction.Commit();
            }
            catch (MySqlException ex)
            {
                transaction.Rollback();
            }
        }
        #endregion

        #region Update Call
        public void Update(GBDocument gbdocument)
        {
            gbdocument.binFileDoc = gbdocument.binFileDoc.Substring(gbdocument.binFileDoc.IndexOf("base64,") + 7);
            byte[] newbytes = Convert.FromBase64String(gbdocument.binFileDoc);
            var builder = new SqlQueryBuilder<GBDocument>(gbdocument);
            gbdocument.binFileDoc = string.Empty;
            //ExecuteCommand(builder.GetUpdateCommand());
            MySqlCommand command = builder.GetUpdateCommand();

            _connection.Open();
            MySqlTransaction transaction = _connection.BeginTransaction();
            command.Transaction = transaction;
            command.Connection = _connection;

            try
            {

                command.ExecuteNonQuery();
                //long insertId = command.LastInsertedId;
                string sql = @"UPDATE lnkgbdocument SET binFileDoc = @newbytes WHERE id = @updatedId;";
                command.CommandText = sql;
                command.CommandType = CommandType.Text;
                command.Parameters.AddWithValue("newbytes", newbytes);
                command.Parameters.AddWithValue("updatedId", gbdocument.Id);
                command.Transaction = transaction;
                command.ExecuteNonQuery();
                transaction.Commit();
            }
            catch (MySqlException ex)
            {
                transaction.Rollback();
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
    }
}
