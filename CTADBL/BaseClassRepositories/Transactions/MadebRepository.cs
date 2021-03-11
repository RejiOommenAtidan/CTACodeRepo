using CTADBL.BaseClasses.Masters;
using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Masters;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using TimeZoneConverter;

namespace CTADBL.BaseClassRepositories.Transactions
{
    public class MadebRepository : ADORepository<Madeb>
    {

        private static MySqlConnection _connection;
        private GreenbookRepository _greenbookRepository;
        private MadebTypeRepository _madebTypeRepository;

        #region Constructor
        public MadebRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
            _greenbookRepository = new GreenbookRepository(connectionString);
            _madebTypeRepository = new MadebTypeRepository(connectionString);
        }
        #endregion

        #region Madeb Add
        public string Add(Madeb madeb)
        {
            if (madeb.nMadebTypeID > 1)
            {
                // We check if gbid passed, exists.
                if (!GBIDExists(madeb.sGBID))
                {
                    return ("GBID does not exist.");
                }
            }
            madeb.nFormNumber = VerifyAndGetUniqueFormNumber(madeb.nFormNumber, madeb.nMadebTypeID);
            var builder = new SqlQueryBuilder<Madeb>(madeb);
            int rowsAffected = ExecuteCommand(builder.GetInsertCommand());
            if(rowsAffected > 0)
            {
                MadebType madebType = _madebTypeRepository.GetMadebTypeById(madeb.nMadebTypeID.ToString());
                if(madebType.nMadebLastFormNumber < madeb.nFormNumber)
                {
                    madebType.nMadebLastFormNumber = madeb.nFormNumber;
                }
                _madebTypeRepository.Update(madebType);
            }
            return rowsAffected > 0 ? "Success" : "Insert Failed";
        }
        #endregion

        #region Madeb Update 
        public string Update(Madeb madeb)
        {
            if (madeb.nMadebTypeID > 1)
            {
                // We check if gbid passed, exists.
                if (!GBIDExists(madeb.sGBID))
                {
                    return ("GBID does not exist.");
                }
            }
            Madeb existingMadeb = GetMadebById(madeb.Id.ToString());
            if (existingMadeb.nFormNumber != madeb.nFormNumber)
            {
                madeb.nFormNumber = VerifyAndGetUniqueFormNumber(madeb.nFormNumber, madeb.nMadebTypeID);
            }
            var builder = new SqlQueryBuilder<Madeb>(madeb);
            int rowsAffected = ExecuteCommand(builder.GetUpdateCommand());
            if (rowsAffected > 0)
            {
                MadebType madebType = _madebTypeRepository.GetMadebTypeById(madeb.nMadebTypeID.ToString());
                if (madebType.nMadebLastFormNumber < madeb.nFormNumber)
                {
                    madebType.nMadebLastFormNumber = madeb.nFormNumber;
                }
                _madebTypeRepository.Update(madebType);
            }
            return rowsAffected > 0 ? "Success" : "Update Failed"; ;
        }

        #region Add GBID to Sarso Form
        public bool AddGBIDByFormNo(int nFormNumber,DateTime dtReceived, string sGBID)
        {
            Madeb madeb = GetMadebByFormNumber(nFormNumber, 1);
            //if(madeb.nMadebTypeID != 1)
            //{
            //    return false;
            //}
            madeb.sGBID = sGBID;
            madeb.nIssuedOrNotID = 1;
            madeb.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
            madeb.dtIssueAction = dtReceived;
            this.Update(madeb);
            return true;
        }
        #endregion

        #region Update Madeb TypeIssued after IssueBook 
        public void UpdateTypeIssued(string Id, int nIssuedOrNotID,DateTime dtIssuedDate, DateTime dtEntered)
        {
            Madeb madeb = GetMadebById(Id);
            if (madeb.nMadebTypeID == 1)
            {
                madeb.nIssuedOrNotID = nIssuedOrNotID;
                // As per discussion on 9th March, 2021 Issue action date in Sarso to be updated to Issued Date when book is issued.
                madeb.dtIssueAction = dtIssuedDate;
                madeb.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                this.Update(madeb);
            }
            else {
                madeb.nIssuedOrNotID = nIssuedOrNotID;
                madeb.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                if(madeb.nMadebTypeID == 2 || madeb.nMadebTypeID == 3)
                {
                    madeb.dtIssueAction = dtEntered;
                }
                else
                {
                    madeb.dtIssueAction = dtIssuedDate;
                }
                this.Update(madeb);
            }
            
        }
        #endregion

        #region Update Madeb with assigned serial numbers
        public void UpdateSerialNumber(string sGBID, int nFormNumber, int nMadebTypeId, int? nCurrentGBSno, int? nIssuedOrNotId)
        {
            Madeb madeb = GetMadebByGBIDAndFormNumber(sGBID, nFormNumber, nMadebTypeId);
            madeb.nCurrentGBSno = nCurrentGBSno;
            madeb.nIssuedOrNotID = nIssuedOrNotId;
            
            string msg = this.Update(madeb);

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
                             `nMadebStatusID`,
                            `sMadebStatusRemark`,   
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
                            `nMadebStatusID`,
                            `sMadebStatusRemark`,
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

        public IEnumerable<Madeb> GetMadebsByType(int madebType, int limit = 1000)
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
                            `nMadebStatusID`,
                            `sMadebStatusRemark`,
                            `dtEmailSend`,
                            `sAlias`,
                            `sApprovedReject`,
                            `dtReject`,
                            `dtReturnEmail`,
                            `dtEntered`,
                            `nEnteredBy`,
                            `dtUpdated`,
                            `nUpdatedBy`
                        FROM `tblmadeb` WHERE nMadebTypeID=@madebType
                        LIMIT @limit;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("madebType", madebType);
                command.Parameters.AddWithValue("limit", limit);
                return GetRecords(command);
            }
        }

        public Madeb GetMadebByFormNumber(int formNumber, int madebTypeID)
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
                            `nMadebStatusID`,
                            `sMadebStatusRemark`,
                            `dtReject`,
                            `dtReturnEmail`,
                            `dtEntered`,
                            `nEnteredBy`,
                            `dtUpdated`,
                            `nUpdatedBy`
                        FROM `tblmadeb`
                        WHERE nFormNumber=@formNumber
                        AND nMadebTypeID=@madebTypeID;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("formNumber", formNumber);
                command.Parameters.AddWithValue("madebTypeID", madebTypeID);
                return GetRecord(command);
            }
        }

        public Madeb GetMadebByGBIDAndFormNumber(string sGBID, int nFormNumber, int nMadebTypeId)
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
                            `nMadebStatusID`,
                            `sMadebStatusRemark`,
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
                        WHERE sGBID = @sGBID
                        AND nFormNumber=@nFormNumber
                        AND nMadebTypeId=@nMadebTypeId;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBID", sGBID);
                command.Parameters.AddWithValue("nFormNumber", nFormNumber);
                command.Parameters.AddWithValue("nMadebTypeId", nMadebTypeId); 
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
                            `nMadebStatusID`,
                            `sMadebStatusRemark`,
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
                                   FROM tblgivengbid 
                                   WHERE nFormNo IS NOT NULL)
                           AND tblmadeb.nMadebTypeID = 1 
                           AND tblmadeb.nMadebStatusID = 2
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
                             `tblmadeb`.`nFormNumber`,
                             `tblmadeb`.`sGBID`,
                             `tblmadeb`.`nMadebTypeID`,
                             `tblmadeb`.`sName`,
                             `tblmadeb`.`sFathersName`,
                             `tblmadeb`.`nAuthRegionID`,
                             `tblmadeb`.`dtReceived`,
                             `tblmadeb`.`dtIssueAction`,
                             `tblmadeb`.`nIssuedOrNotID`,
                             `tblmadeb`.`nType`,
                             `tblmadeb`.`sChangeField`,
                             `tblmadeb`.`sOfficeOfTibetan`,
                            `sDocumentAttached`,
                            `nCurrentGBSno`,
                            `nPreviousGBSno`,
                            `nSaneyFormNo`,
                            `nReceiptNo`,
                            `nMadebStatusID`,
                            `sMadebStatusRemark`,
                            `dtEmailSend`,
                            `sAlias`,
                            `sApprovedReject`,
                            `dtReject`,
                            `dtReturnEmail`,
                  			 `tblmadeb`.`dtEntered`,
                            `tblmadeb`.`nEnteredBy`,
                            `tblmadeb`.`dtUpdated`,
                            `tblmadeb`.`nUpdatedBy`,
                              `lstauthregion`.`sAuthRegion`,
                            `lsttypeissued`.`sTypeIssued`,
                            `lstmadebtype`.`sMadebDisplayName`
                          
                        FROM `tblmadeb`
                          LEFT JOIN `lstauthregion` on `tblmadeb`.`nAuthRegionID` = `lstauthregion`.`ID`
                        LEFT JOIN `lsttypeissued` on `tblmadeb`.`nIssuedOrNotID` = `lsttypeissued`.`Id`
                        LEFT JOIN `lstmadebtype` on `tblmadeb`.`nMadebTypeID` = `lstmadebtype`.`Id`
                        
                        WHERE `tblmadeb`.`nFormNumber` IN (SELECT nFormNumber FROM tblgreenbookserial where nFormNumber IS NOT NULL ) AND  `tblmadeb`.`nIssuedOrNotID` !=2 AND  `tblmadeb`.`sGBID` = @sGBId ORDER BY  `tblmadeb`.`Id` DESC";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBId", sGBId);
                command.Connection = _connection;
                command.CommandType = CommandType.Text;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                var forms = tables[0].AsEnumerable().Select(row => new {
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


        #region Helper methods


        #region Verify form number uniqueness for insert and updates & return appropriate number
        public int VerifyAndGetUniqueFormNumber(int nFormNumber, int nMadebTypeId)
        {

            using (var command = new MySqlCommand("spGetFormNumber"))
            {
                command.Connection = _connection;
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("formNumberIN", nFormNumber);
                command.Parameters.AddWithValue("nMadebId", nMadebTypeId);
                command.Parameters.Add("@result", MySqlDbType.UInt32);
                command.Parameters["@result"].Direction = ParameterDirection.Output;
                _connection.Open();
                int x = (int)command.ExecuteScalar();
                return x;
            }
        }
        #endregion

        #region Check if GBID exists in greenbook db

        public bool GBIDExists(string sGBID)
        {
            if(_greenbookRepository.GetGreenbookByGBID(sGBID) != null)
            {
                return true;
            }
            return false;
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
                nMadebTypeID = (int)(reader["nMadebTypeID"]),
                sName = reader.IsDBNull("sName") ? null : (string?)reader["sName"],
                sFathersName = reader.IsDBNull("sFathersName") ? null : (string?)(reader["sFathersName"]),
                nAuthRegionID = (int)reader["nAuthRegionID"],
                dtReceived = reader.IsDBNull("dtReceived") ? null : (DateTime?)reader["dtReceived"],
                dtIssueAction = reader.IsDBNull("dtIssueAction") ? null : (DateTime?)reader["dtIssueAction"],
                nIssuedOrNotID = reader.IsDBNull("nIssuedOrNotID") ? null : (int?)reader["nIssuedOrNotID"],
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
                nMadebStatusID = reader.IsDBNull("nMadebStatusID") ? null : (int?)(reader["nMadebStatusID"]),
                sMadebStatusRemark = reader.IsDBNull("sMadebStatusRemark") ? null : (string?)(reader["sMadebStatusRemark"]),
                //Common Props
                dtEntered = (DateTime)(reader["dtEntered"]),
                nEnteredBy = (int)reader["nEnteredBy"],
                dtUpdated = (DateTime)(reader["dtUpdated"]),
                nUpdatedBy = (int)reader["nUpdatedBy"]
            };
        }
        #endregion
        #endregion
    }
}
