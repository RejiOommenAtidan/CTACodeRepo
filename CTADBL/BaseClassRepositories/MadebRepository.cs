using CTADBL.BaseClasses;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace CTADBL.BaseClassRepositories
{
    public class MadebRepository : ADORepository<Madeb>
    {
        #region Constructor
        public MadebRepository(string connectionString) : base(connectionString)
        {
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
                            `nIssuedOrNot`,
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
                            `nIssuedOrNot`,
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
                        WHERE Id=@Id";
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
                            `nIssuedOrNot`,
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
                            `nIssuedOrNot`,
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
                        WHERE nFormNumber=@formNumber";
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
                            `nIssuedOrNot`,
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
                        WHERE nAuthRegionID=@nAuthRegionID";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("nAuthRegionID", authRegion);
                return GetRecords(command);
            }
        }



        #endregion




        #region Populate Madeb Records
        public override Madeb PopulateRecord(MySqlDataReader reader)
        {
            //reader.get
            int colIndex1 = reader.GetOrdinal("dtEntered");
            int colIndex2 = reader.GetOrdinal("dtUpdated");
            int colIndex3 = reader.GetOrdinal("dtReject");
            int colIndex4 = reader.GetOrdinal("dtEmailSend");

            DateTime? dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"]);

            //DateTime? dtEntered = (Convert.IsDBNull(reader["dtEntered"]) ? null : (DateTime?)(reader["dtEntered"]));
            DateTime? dtUpdated = (Convert.IsDBNull(reader["dtUpdated"]) ? null : (DateTime?)(reader["dtUpdated"]));

            //DateTime? dtEntered = null;
            //DateTime? dtUpdated = null;
            DateTime? dtReject = null;
            DateTime? dtEmailSend = null;
            //if (!reader.IsDBNull(colIndex1))
            //{
            //    dtEntered = (DateTime)reader["dtEntered"];
            //}
            //if (!reader.IsDBNull(colIndex2))
            //{
            //    dtUpdated = (DateTime)reader["dtUpdated"];
            //}
            if (!reader.IsDBNull(colIndex3))
            {
                dtReject = (DateTime)reader["dtReject"];
            }
            if (!reader.IsDBNull(colIndex4))
            {
                dtEmailSend = (DateTime)reader["dtEmailSend"];
            }


            return new Madeb
            {
                Id = (int)reader["Id"],
                //TODO:
                _id = reader.IsDBNull("_Id") ? null : (int?)(reader["_Id"]),
                nFormNumber = (int)reader["nFormNumber"],
                sGBID = reader.IsDBNull("sGBID") ? null : (string?)(reader["sGBID"]),
                nMadebTypeID = reader.IsDBNull("nMadebTypeID") ? null : (int?)(reader["nMadebTypeID"]),
                sName = (string)reader["sName"],
                sFathersName = reader.IsDBNull("sFathersName") ? null : (string?)(reader["sFathersName"]),
                nAuthRegionID = (int)reader["nAuthRegionID"],
                dtReceived = (DateTime)reader["dtReceived"],
                dtIssueAction = (DateTime)reader["dtIssueAction"],
                nIssuedOrNot = (int)reader["nIssuedOrNot"],
                nType = (int)reader["nType"],
                sChangeField = reader.IsDBNull("sChangeField") ? null : (string?)(reader["sChangeField"]),
                sOfficeOfTibetan = reader.IsDBNull("sOfficeOfTibetan") ? null : (string?)(reader["sOfficeOfTibetan"]),
                sDocumentAttached = reader.IsDBNull("sDocumentAttached") ? null : (string?)(reader["sDocumentAttached"]),
                nCurrentGBSno = reader.IsDBNull("nCurrentGBSno") ? null : (int?)(reader["nCurrentGBSno"]),
                nPreviousGBSno = reader.IsDBNull("nPreviousGBSno") ? null : (int?)(reader["nPreviousGBSno"]),
                nSaneyFormNo = reader.IsDBNull("nSaneyFormNo") ? null : (int?)(reader["nSaneyFormNo"]),
                nReceiptNo = reader.IsDBNull("nCurrentGBSno") ? null : (int?)(reader["nCurrentGBSno"]),
                dtEmailSend = reader.IsDBNull("dtEmailSend") ? null : (DateTime?)(reader["dtEmailSend"]),
                sAlias = reader.IsDBNull("sAlias") ? null : (string?)(reader["sAlias"]),
                sApprovedReject = reader.IsDBNull("sApprovedReject") ? null : (string?)(reader["sApprovedReject"]),
                dtReject = reader.IsDBNull("dtReject") ? null : (DateTime?)(reader["dtReject"]),
                dtReturnEmail = (DateTime)reader["dtReturnEmail"],
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
