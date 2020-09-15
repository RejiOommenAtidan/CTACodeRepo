using CTADBL.BaseClasses;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

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
        #endregion

        #region Populate Madeb Records
        public override Madeb PopulateRecord(MySqlDataReader reader)
        {
            //reader.get
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
            return new Madeb
            {
                Id = (int)reader["Id"],
                //TODO:
                //_id = (int)reader["_Id"]
                nFormNumber = (int)reader["nFormNumber"],
                sGBID = (string)reader["sGBID"],
                nMadebTypeID = (int)reader["nMadebTypeID"],
                sName = (string)reader["sName"],
                sFathersName = (string)reader["sFathersName"],
                nAuthRegionID = (int)reader["nAuthRegionID"],
                dtReceived = (DateTime)reader["dtReceived"],
                dtIssueAction = (DateTime)reader["dtIssueAction"],
                nIssuedOrNot = (int)reader["nIssuedOrNot"],
                nType = (int)reader["nType"],
                sChangeField = (string)reader["sChangeField"],
                sOfficeOfTibetan = (string)reader["sOfficeOfTibetan"],
                sDocumentAttached = (string)reader["sDocumentAttached"],
                nCurrentGBSno = (int)reader["nCurrentGBSno"],
                nPreviousGBSno = (int)reader["nPreviousGBSno"],
                nSaneyFormNo = (int)reader["nSaneyFormNo"],
                nReceiptNo = (int)reader["nReceiptNo"],
                dtEmailSend = (DateTime)reader["dtEmailSend"],
                sAlias = (string)reader["sAlias"],
                sApprovedReject = (string)reader["sApprovedReject"],
                dtReject = (DateTime)reader["dtReject"],
                dtReturnEmail = (DateTime)reader["dtReturnEmail"],
                //Common Props
                dtEntered = dtEntered,
                nEnteredBy = (int)reader["nEnteredBy"],
                dtUpdated = dtUpdated,
                nUpdatedBy = (int)reader["nUpdatedBy"]
            };
        }
        #endregion
    }
}
