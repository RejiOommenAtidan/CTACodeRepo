using CTADBL.BaseClasses.Transactions;
using CTADBL.Repository;
using CTADBL.ViewModels;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

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

        #region GetAllMadebs
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
                            `sTypeIssued`
                        FROM `tblmadeb` 
                        INNER JOIN `lstauthregion` on `tblmadeb`.`nAuthRegionID` = `lstauthregion`.`ID`
                        INNER JOIN `lsttypeissued` on `tblmadeb`.`nIssuedOrNotID` = `lsttypeissued`.`Id`;";
            using (var command = new MySqlCommand(sql))
            {
                return GetRecords(command);
            }
        }
        #endregion

        #region Get Madeb by Id
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
                            `sTypeIssued`
                        FROM `tblmadeb` 
                        INNER JOIN `lstauthregion` on `tblmadeb`.`nAuthRegionID` = `lstauthregion`.`ID`
                        INNER JOIN `lsttypeissued` on `tblmadeb`.`nIssuedOrNotID` = `lsttypeissued`.`Id`
                        WHERE `tblmadeb`.`Id`=@Id;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("Id", Id);
                return GetRecord(command);
            }
        }
        #endregion

        #region Get Madebs by Madeb Types
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
                            `sTypeIssued`
                        FROM `tblmadeb` 
                        INNER JOIN `lstauthregion` on `tblmadeb`.`nAuthRegionID` = `lstauthregion`.`ID`
                        INNER JOIN `lsttypeissued` on `tblmadeb`.`nIssuedOrNotID` = `lsttypeissued`.`Id`
                        WHERE nMadebTypeID=@madebType;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("madebType", madebType);
                return GetRecords(command);
            }
        }
        #endregion

        #region Get Madeb by form number
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
                            `sTypeIssued`
                        FROM `tblmadeb` 
                        INNER JOIN `lstauthregion` on `tblmadeb`.`nAuthRegionID` = `lstauthregion`.`ID`
                        INNER JOIN `lsttypeissued` on `tblmadeb`.`nIssuedOrNotID` = `lsttypeissued`.`Id`
                        WHERE nFormNumber=@formNumber";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("formNumber", formNumber);
                return GetRecord(command);
            }
        }
        #endregion

        #region Get Madeb(s) by Authority Region
        public IEnumerable<MadebAuthRegionVM> GetMadebsByAuthRegion(int authRegion)
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
                            `sTypeIssued`
                        FROM `tblmadeb` 
                        INNER JOIN `lstauthregion` on `tblmadeb`.`nAuthRegionID` = `lstauthregion`.`ID`
                        INNER JOIN `lsttypeissued` on `tblmadeb`.`nIssuedOrNotID` = `lsttypeissued`.`Id`
                        WHERE nAuthRegionID=@nAuthRegionID;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("nAuthRegionID", authRegion);
                return GetRecords(command);
            }
        }
        #endregion

        #region Get Madeb(s) by Issue Action
        public IEnumerable<MadebAuthRegionVM> GetMadebsByIssueAction(int issueAction)
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
                            `sTypeIssued`
                        FROM `tblmadeb` 
                        INNER JOIN `lstauthregion` on `tblmadeb`.`nAuthRegionID` = `lstauthregion`.`ID`
                        INNER JOIN `lsttypeissued` on `tblmadeb`.`nIssuedOrNotID` = `lsttypeissued`.`Id`
                        WHERE nIssuedOrNotID=@nIssuedOrNotID;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("nIssuedOrNotID", issueAction);
                return GetRecords(command);
            }
        }

        #endregion

        #endregion

        #region Populate Madeb Records
        public override MadebAuthRegionVM PopulateRecord(MySqlDataReader reader)
        {
            return new MadebAuthRegionVM
            {
                madeb = new Madeb
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
                    nReceiptNo = reader.IsDBNull("nCurrentGBSno") ? null : (int?)(reader["nCurrentGBSno"]),
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
                },
                sAuthRegion = (string) reader["sAuthRegion"],
                sTypeIssued = (string) reader["sTypeIssued"]
                
            };
        }
        #endregion
    }
}
