using System;
using System.Collections.Generic;
using System.Text;
using MySql.Data.MySqlClient;
using System.Data;
using CTADBL.QueryBuilder;
using CTADBL.ViewModels;
using CTADBL.Repository;

namespace CTADBL.ViewModelsRepositories
{
    public class MadebAuthRegionVMRepository : ADORepository <MadebAuthRegionVM>
    {
        #region Constructor
        public MadebAuthRegionVMRepository(string connectionString) : base(connectionString)
        {
        }
        #endregion

        #region Get Madeb/Madebs
        public IEnumerable<MadebAuthRegionVM> GetAllMadebs()
        {
            string sql = @"SELECT `tblmadeb`.`Id`,
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
                            `tblmadeb`.`dtEntered`,
                            `tblmadeb`.`nEnteredBy`,
                            `tblmadeb`.`dtUpdated`,
                            `tblmadeb`.`nUpdatedBy`,
                            `sAuthRegion`
                        FROM `tblmadeb` 
                        INNER JOIN `lstauthregion` on `tblmadeb`.`nAuthRegionID` = `lstauthregion`.`ID`;";
            using (var command = new MySqlCommand(sql))
            {
                return GetRecords(command);
            }
        }

        public MadebAuthRegionVM GetMadebById(string Id)
        {
            string sql = @"SELECT `tblmadeb`.`Id`,
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
                            `tblmadeb`.`dtEntered`,
                            `tblmadeb`.`nEnteredBy`,
                            `tblmadeb`.`dtUpdated`,
                            `tblmadeb`.`nUpdatedBy`,
                            `sAuthRegion`
                        FROM `tblmadeb` 
                        INNER JOIN `lstauthregion` on `tblmadeb`.`nAuthRegionID` = `lstauthregion`.`ID`
                        WHERE `tblmadeb`.`Id`=@Id;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("Id", Id);
                return GetRecord(command);
            }
        }
        public IEnumerable<MadebAuthRegionVM> GetMadebsByType(int madebType)
        {
            string sql = @"SELECT `tblmadeb`.`Id`,
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
                            `tblmadeb`.`dtEntered`,
                            `tblmadeb`.`nEnteredBy`,
                            `tblmadeb`.`dtUpdated`,
                            `tblmadeb`.`nUpdatedBy`,
                            `sAuthRegion`
                        FROM `tblmadeb` 
                        INNER JOIN `lstauthregion` on `tblmadeb`.`nAuthRegionID` = `lstauthregion`.`ID`
                        WHERE nMadebTypeID=@madebType;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("madebType", madebType);
                return GetRecords(command);
            }
        }

        public MadebAuthRegionVM GetMadebByFormNumber(int formNumber)
        {
            string sql = @"SELECT `tblmadeb`.`Id`,
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
                            `tblmadeb`.`dtEntered`,
                            `tblmadeb`.`nEnteredBy`,
                            `tblmadeb`.`dtUpdated`,
                            `tblmadeb`.`nUpdatedBy`,
                            `sAuthRegion`
                        FROM `tblmadeb` 
                        INNER JOIN `lstauthregion` on `tblmadeb`.`nAuthRegionID` = `lstauthregion`.`ID`
                        WHERE nFormNumber=@formNumber";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("formNumber", formNumber);
                return GetRecord(command);
            }
        }

        public IEnumerable<MadebAuthRegionVM> GetMadebByAuthRegion(int authRegion)
        {
            string sql = @"SELECT `tblmadeb`.`Id`,
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
                            `tblmadeb`.`dtEntered`,
                            `tblmadeb`.`nEnteredBy`,
                            `tblmadeb`.`dtUpdated`,
                            `tblmadeb`.`nUpdatedBy`,
                            `sAuthRegion`
                        FROM `tblmadeb` 
                        INNER JOIN `lstauthregion` on `tblmadeb`.`nAuthRegionID` = `lstauthregion`.`ID`
                        WHERE nAuthRegionID=@nAuthRegionID;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("nAuthRegionID", authRegion);
                return GetRecords(command);
            }
        }
        #endregion


        #region Populate Madeb Records
        public override MadebAuthRegionVM PopulateRecord(MySqlDataReader reader)
        {
            return new MadebAuthRegionVM
            {
                madeb = new BaseClasses.Madeb
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
                },
                sAuthRegion = (string) reader["sAuthRegion"]
            };
        }
        #endregion
    }
}
