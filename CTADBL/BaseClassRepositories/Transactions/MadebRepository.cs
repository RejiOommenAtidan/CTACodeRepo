using CTADBL.BaseClasses.Transactions;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace CTADBL.BaseClassRepositories.Transactions
{
    public class MadebRepository : ADORepository<Madeb>
    {

        private static MySqlConnection _connection;
        #region Constructor
        public MadebRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
        }
        #endregion

        #region Madeb Add
        public void Add(Madeb madeb)
        {
            var builder = new SqlQueryBuilder<Madeb>(madeb);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Madeb Update 
        public void Update(Madeb madeb)
        {
            var builder = new SqlQueryBuilder<Madeb>(madeb);
            ExecuteCommand(builder.GetUpdateCommand());
        }

        #region Add GBID to Sarso Form
        public void AddGBIDByFormNo(int nFormNumber, string sGBID)
        {
            Madeb madeb = GetMadebByFormNumber(nFormNumber);
            madeb.sGBID = sGBID;
            madeb.dtUpdated = DateTime.Now;
            madeb.dtIssueAction = DateTime.Now;
            this.Update(madeb);
        }
        #endregion

        #region Update Madeb with assigned serial numbers
        public void UpdateSerialNumber(int nFormNumber, int nIssuedOrNotID, int? nCurrentGBSno, int? nPreviousGBSno = null)
        {
            Madeb madeb = GetMadebByFormNumber(nFormNumber);
            madeb.nCurrentGBSno = nCurrentGBSno;
            madeb.nPreviousGBSno = nPreviousGBSno;
            madeb.nIssuedOrNotID = nIssuedOrNotID;
            this.Update(madeb);
        }
        #endregion
        #endregion

        #region Madeb Delete
        public void Delete(Madeb madeb)
        {
            var builder = new SqlQueryBuilder<Madeb>(madeb);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get Madeb/Madebs
        public IEnumerable<Madeb> GetAllMadebs()
        {
            string sql = @"SELECT `Id`,
                            `_Id`,
                            `nFormNumber`,
                            `sGBID`,
                            `nMadebTypeID`,
                            `sName`,
                            `sFathersName`,
                            `nAuthRegionID`,
                            `dtReceived`,
                            `dtIssueAction`,
                            `nIssuedOrNotID`,
                            `nType`,
                            `sChangeField`,
                            `sOfficeOfTibetan`,
                            `sDocumentAttached`,
                            `nCurrentGBSno`,
                            `nPreviousGBSno`,
                            `nSaneyFormNo`,
                            `nReceiptNo`,
                            `dtEmailSend`,
                            `sAlias`,
                            `sApprovedReject`,
                            `dtReject`,
                            `dtReturnEmail`,
                            `dtEntered`,
                            `nEnteredBy`,
                            `dtUpdated`,
                            `nUpdatedBy`
                        FROM `tblmadeb`;";
            using (var command = new MySqlCommand(sql))
            {
                return GetRecords(command);
            }
        }

        public Madeb GetMadebById(string Id)
        {
            string sql = @"SELECT `Id`,
                            `_Id`,
                            `nFormNumber`,
                            `sGBID`,
                            `nMadebTypeID`,
                            `sName`,
                            `sFathersName`,
                            `nAuthRegionID`,
                            `dtReceived`,
                            `dtIssueAction`,
                            `nIssuedOrNotID`,
                            `nType`,
                            `sChangeField`,
                            `sOfficeOfTibetan`,
                            `sDocumentAttached`,
                            `nCurrentGBSno`,
                            `nPreviousGBSno`,
                            `nSaneyFormNo`,
                            `nReceiptNo`,
                            `dtEmailSend`,
                            `sAlias`,
                            `sApprovedReject`,
                            `dtReject`,
                            `dtReturnEmail`,
                            `dtEntered`,
                            `nEnteredBy`,
                            `dtUpdated`,
                            `nUpdatedBy`
                        FROM `tblmadeb`
                        WHERE Id=@Id;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("Id", Id);
                return GetRecord(command);
            }
        }
        
        public IEnumerable<Madeb> GetMadebsByType(int madebType)
        {
            string sql = @"SELECT `Id`,
                            `_Id`,
                            `nFormNumber`,
                            `sGBID`,
                            `nMadebTypeID`,
                            `sName`,
                            `sFathersName`,
                            `nAuthRegionID`,
                            `dtReceived`,
                            `dtIssueAction`,
                            `nIssuedOrNotID`,
                            `nType`,
                            `sChangeField`,
                            `sOfficeOfTibetan`,
                            `sDocumentAttached`,
                            `nCurrentGBSno`,
                            `nPreviousGBSno`,
                            `nSaneyFormNo`,
                            `nReceiptNo`,
                            `dtEmailSend`,
                            `sAlias`,
                            `sApprovedReject`,
                            `dtReject`,
                            `dtReturnEmail`,
                            `dtEntered`,
                            `nEnteredBy`,
                            `dtUpdated`,
                            `nUpdatedBy`
                        FROM `tblmadeb` WHERE nMadebTypeID=@madebType;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("madebType", madebType);
                return GetRecords(command);
            }
        }

        public Madeb GetMadebByFormNumber(int formNumber)
        {
            string sql = @"SELECT `Id`,
                            `_Id`,
                            `nFormNumber`,
                            `sGBID`,
                            `nMadebTypeID`,
                            `sName`,
                            `sFathersName`,
                            `nAuthRegionID`,
                            `dtReceived`,
                            `dtIssueAction`,
                            `nIssuedOrNotID`,
                            `nType`,
                            `sChangeField`,
                            `sOfficeOfTibetan`,
                            `sDocumentAttached`,
                            `nCurrentGBSno`,
                            `nPreviousGBSno`,
                            `nSaneyFormNo`,
                            `nReceiptNo`,
                            `dtEmailSend`,
                            `sAlias`,
                            `sApprovedReject`,
                            `dtReject`,
                            `dtReturnEmail`,
                            `dtEntered`,
                            `nEnteredBy`,
                            `dtUpdated`,
                            `nUpdatedBy`
                        FROM `tblmadeb`
                        WHERE nFormNumber=@formNumber;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("formNumber", formNumber);
                return GetRecord(command);
            }
        }

        public IEnumerable<Madeb> GetMadebByAuthRegion(int authRegion)
        {
            string sql = @"SELECT `Id`,
                            `_Id`,
                            `nFormNumber`,
                            `sGBID`,
                            `nMadebTypeID`,
                            `sName`,
                            `sFathersName`,
                            `nAuthRegionID`,
                            `dtReceived`,
                            `dtIssueAction`,
                            `nIssuedOrNotID`,
                            `nType`,
                            `sChangeField`,
                            `sOfficeOfTibetan`,
                            `sDocumentAttached`,
                            `nCurrentGBSno`,
                            `nPreviousGBSno`,
                            `nSaneyFormNo`,
                            `nReceiptNo`,
                            `dtEmailSend`,
                            `sAlias`,
                            `sApprovedReject`,
                            `dtReject`,
                            `dtReturnEmail`,
                            `dtEntered`,
                            `nEnteredBy`,
                            `dtUpdated`,
                            `nUpdatedBy`
                        FROM `tblmadeb`
                        WHERE nAuthRegionID=@nAuthRegionID;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("nAuthRegionID", authRegion);
                return GetRecords(command);
            }
        }


        public Object GetFormsWithoutGBId()
        {
            string sql = @"SELECT tblmadeb.nFormNumber, tblmadeb.dtReceived
                           FROM tblmadeb 
                           WHERE tblmadeb.nFormNumber 
                           NOT IN (SELECT nFormNo 
                                   FROM tblgivengbid) 
                           AND tblmadeb.nMadebTypeID = 1 
                           AND tblmadeb.nIssuedOrNotID = 1
                           ORDER BY tblmadeb.nFormNumber DESC";
            using (var command = new MySqlCommand(sql))
            {
                command.Connection = _connection;
                command.CommandType = CommandType.Text;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                var forms = tables[0].AsEnumerable().Select(row => new { 
                    nFormNumber = row.Field<int>("nFormNumber"), 
                    dtReceived = row.Field<DateTime?>("dtReceived") }).ToList();
                return forms;
            }
        }
        public Object GetMadebforIssueBook(string sGBId)
        {
            string sql = @"SELECT 
                           `tblmadeb`.`Id`,
                            `_Id`,
                            `nFormNumber`,
                            `sGBID`,
                            `nMadebTypeID`,
                            `sName`,
                            `sFathersName`,
                            `nAuthRegionID`,
                            `dtReceived`,
                            `dtIssueAction`,
                            `nIssuedOrNotID`,
                            `nType`,
                            `sChangeField`,
                            `sOfficeOfTibetan`,
                            `sDocumentAttached`,
                            `nCurrentGBSno`,
                            `nPreviousGBSno`,
                            `nSaneyFormNo`,
                            `nReceiptNo`,
                            `dtEmailSend`,
                            `sAlias`,
                            `sApprovedReject`,
                            `dtReject`,
                            `dtReturnEmail`,
                   `tblmadeb`.`dtEntered`,
                            `tblmadeb`.`nEnteredBy`,
                            `tblmadeb`.`dtUpdated`,
                            `tblmadeb`.`nUpdatedBy`,
                            `sAuthRegion`,
                            `sTypeIssued`,
                            `sMadebDisplayName`
                        FROM `tblmadeb`
                         LEFT JOIN `lstauthregion` on `tblmadeb`.`nAuthRegionID` = `lstauthregion`.`ID`
                        LEFT JOIN `lsttypeissued` on `tblmadeb`.`nIssuedOrNotID` = `lsttypeissued`.`Id`
                        LEFT JOIN `lstmadebtype` on `tblmadeb`.`nMadebTypeID` = `lstmadebtype`.`Id`
                        WHERE `nIssuedOrNotID` !=2 AND `sGBID` = @sGBId ORDER BY `Id` DESC";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBId", sGBId);
                command.Connection = _connection;
                command.CommandType = CommandType.Text;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                var forms = tables[0].AsEnumerable().Select(row =>   new {
                    Id = row.Field<int>("Id"),
                    sGBID = row.Field<string>("sGBID"),
                    dtReceived = row.Field<DateTime>("dtReceived"),
                    nMadebTypeID = row.Field<int>("nMadebTypeID"),
                    nAuthRegionID = row.Field<int>("nAuthRegionID"),
                    nFormNumber = row.Field<int>("nFormNumber"),
                    nIssuedOrNotID = row.Field<int>("nIssuedOrNotID"),
                    sAuthRegion = row.Field<string>("sAuthRegion"),
                    sTypeIssued = row.Field<string>("sTypeIssued"),
                    sMadebDisplayName = row.Field<string>("sMadebDisplayName"),



                }).ToList();
                return forms;
            }
        }


        #endregion

        #region Populate Madeb Records
        public override Madeb PopulateRecord(MySqlDataReader reader)
        {
            //int colIndex1 = reader.GetOrdinal("dtEntered");
            //int colIndex2 = reader.GetOrdinal("dtUpdated");
            //int colIndex3 = reader.GetOrdinal("dtReject");
            //int colIndex4 = reader.GetOrdinal("dtEmailSend");

            //DateTime? dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"]);

            ////DateTime? dtEntered = (Convert.IsDBNull(reader["dtEntered"]) ? null : (DateTime?)(reader["dtEntered"]));
            //DateTime? dtUpdated = (Convert.IsDBNull(reader["dtUpdated"]) ? null : (DateTime?)(reader["dtUpdated"]));

            ////DateTime? dtEntered = null;
            ////DateTime? dtUpdated = null;
            //DateTime? dtReject = null;
            //DateTime? dtEmailSend = null;
            ////if (!reader.IsDBNull(colIndex1))
            ////{
            ////    dtEntered = (DateTime)reader["dtEntered"];
            ////}
            ////if (!reader.IsDBNull(colIndex2))
            ////{
            ////    dtUpdated = (DateTime)reader["dtUpdated"];
            ////}
            //if (!reader.IsDBNull(colIndex3))
            //{
            //    dtReject = (DateTime)reader["dtReject"];
            //}
            //if (!reader.IsDBNull(colIndex4))
            //{
            //    dtEmailSend = (DateTime)reader["dtEmailSend"];
            //}


            return new Madeb
            {
                Id = (int)reader["Id"],
                //TODO:
                _id = reader.IsDBNull("_Id") ? null : (int?)(reader["_Id"]),
                nFormNumber = (int)reader["nFormNumber"],
                sGBID = reader.IsDBNull("sGBID") ? null : (string?)(reader["sGBID"]),
                nMadebTypeID = reader.IsDBNull("nMadebTypeID") ? null : (int?)(reader["nMadebTypeID"]),
                sName = reader.IsDBNull("sName") ? null : (string?)reader["sName"],
                sFathersName = reader.IsDBNull("sFathersName") ? null : (string?)(reader["sFathersName"]),
                nAuthRegionID = (int)reader["nAuthRegionID"],
                dtReceived = reader.IsDBNull("dtReceived") ? null : (DateTime?)reader["dtReceived"],
                dtIssueAction = reader.IsDBNull("dtIssueAction") ? null : (DateTime?)reader["dtIssueAction"],
                nIssuedOrNotID = (int)reader["nIssuedOrNotID"],
                nType = (int)reader["nType"],
                sChangeField = reader.IsDBNull("sChangeField") ? null : (string?)(reader["sChangeField"]),
                sOfficeOfTibetan = reader.IsDBNull("sOfficeOfTibetan") ? null : (string?)(reader["sOfficeOfTibetan"]),
                sDocumentAttached = reader.IsDBNull("sDocumentAttached") ? null : (string?)(reader["sDocumentAttached"]),
                nCurrentGBSno = reader.IsDBNull("nCurrentGBSno") ? null : (int?)(reader["nCurrentGBSno"]),
                nPreviousGBSno = reader.IsDBNull("nPreviousGBSno") ? null : (int?)(reader["nPreviousGBSno"]),
                nSaneyFormNo = reader.IsDBNull("nSaneyFormNo") ? null : (int?)(reader["nSaneyFormNo"]),
                nReceiptNo = reader.IsDBNull("nReceiptNo") ? null : (int?)(reader["nReceiptNo"]),
                dtEmailSend = reader.IsDBNull("dtEmailSend") ? null : (DateTime?)(reader["dtEmailSend"]),
                sAlias = reader.IsDBNull("sAlias") ? null : (string?)(reader["sAlias"]),
                sApprovedReject = reader.IsDBNull("sApprovedReject") ? null : (string?)(reader["sApprovedReject"]),
                dtReject = reader.IsDBNull("dtReject") ? null : (DateTime?)(reader["dtReject"]),
                dtReturnEmail = reader.IsDBNull("dtReturnEmail") ? null : (DateTime?)reader["dtReturnEmail"],
                //Common Props
                dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"]),
                nEnteredBy = (int)reader["nEnteredBy"],
                dtUpdated = reader.IsDBNull("dtUpdated") ? null : (DateTime?)(reader["dtUpdated"]),
                nUpdatedBy = (int)reader["nUpdatedBy"]
            };
        }
        #endregion
    }
}
