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
    public class IssueBookRepository : ADORepository<IssueBook>
    {
        #region Constructor
        private static MySqlConnection _connection;
        private readonly MadebRepository _madebRepository;
        public IssueBookRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
            _madebRepository = new MadebRepository(connectionString);
        }
        #endregion

        #region IssueBook Add
        public void Add(IssueBook issueBook, string MadebId, int nIssuedOrNotID, DateTime dtIssuedDate)
        {
            _connection.Open();
            var builder = new SqlQueryBuilder<IssueBook>(issueBook);
            using(MySqlCommand command = builder.GetInsertCommandTransaction(new MySqlCommand()))
            {
                using(MySqlTransaction transaction = _connection.BeginTransaction())
                {
                    try
                    {
                        command.Connection = _connection;
                        command.Transaction = transaction;
                        command.CommandTimeout = 60;
                        int rowsInserted = ExecuteCommandTransaction(command);
                        if(rowsInserted < 1)
                        {
                            throw new Exception("Inserting Issuebook record failed");
                        }
                        string update = _madebRepository.UpdateTypeIssuedTransaction(MadebId, nIssuedOrNotID, dtIssuedDate, issueBook.dtEntered, command);
                        if(update != "Success")
                        {
                            throw new Exception("Update of Madeb failed for Issue action Id and Issued Action Date");
                        }
                        command.Transaction.Commit();
                        _connection.Close();
                    }
                    catch(Exception ex)
                    {
                        command.Transaction.Rollback();
                        _connection.Close();
                        throw;
                    }
                }
            }
        }
        #endregion

        #region IssueBook Update 
        public void Update(IssueBook issuebook)
        {
            var builder = new SqlQueryBuilder<IssueBook>(issuebook);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region IssueBook Delete
        public void Delete(IssueBook issuebook)
        {
            var builder = new SqlQueryBuilder<IssueBook>(issuebook);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get IssueBook
        public IssueBook GetIssueBookById(string Id)
        {
            string sql = @"SELECT `Id`,
                            `nGBId`,
                            `dtIssuedDate`,
                            `sWhyIssued`,
                            `nMadebTypeId`,
                            `nTypeIssuedId`,
                            `sFormNumber`,
                            `nWhereIssued`,
                            `nAuthRegionId`,
                            `bPrinted`,
                            `sRemarks`,
                            `dtEntered`,
                            `nEnteredBy`,
                            `dtUpdated`,
                            `nUpdatedBy`
                        FROM `tblgreenbookissued`
                        WHERE Id=@Id;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("Id", Id);
                return GetRecord(command);
            }
        }
        public IEnumerable<IssueBook> GetIssueBookByGbId(int nGBId)
        {
            string sql = @"SELECT `Id`,
                            `nGBId`,
                            `dtIssuedDate`,
                            `sWhyIssued`,
                            `nMadebTypeId`,
                            `nTypeIssuedId`,
                            `sFormNumber`,
                            `nWhereIssued`,
                            `nAuthRegionId`,
                            `bPrinted`,
                            `sRemarks`,
                            `dtEntered`,
                            `nEnteredBy`,
                            `dtUpdated`,
                            `nUpdatedBy`
                        FROM `tblgreenbookissued` WHERE nGBId=@nGBId;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("nGBId", nGBId);
                return GetRecords(command);
            }
        }

        public Object GetIssueBookJoin(int nGBId)
        {
            string sql = @"SELECT `tblgreenbookissued`.`Id`,
                            `nGBId`,
                            `dtIssuedDate`,
                            `sWhyIssued`,
                            `nMadebTypeId`,
                            `nTypeIssuedId`,
                            `sFormNumber`,
                            `nWhereIssued`,
                            `nAuthRegionId`,
                             `bPrinted`,
                            `sRemarks`,
                            `tblgreenbookissued`.`dtEntered`,
                            `tblgreenbookissued`.`nEnteredBy`,
                            `tblgreenbookissued`.`dtUpdated`,
                            `tblgreenbookissued`.`nUpdatedBy`,
                            `sAuthRegion`,
                            `sTypeIssued`,
                            `sMadebDisplayName`
                        FROM `tblgreenbookissued` 
                        LEFT JOIN `lstauthregion` on `tblgreenbookissued`.`nAuthRegionId` = `lstauthregion`.`ID`
                        LEFT JOIN `lsttypeissued` on `tblgreenbookissued`.`nTypeIssuedId` = `lsttypeissued`.`Id`
                        LEFT JOIN `lstmadebtype` on `tblgreenbookissued`.`nMadebTypeId` = `lstmadebtype`.`Id`
                        WHERE nGBId=@nGBId AND tblgreenbookissued.nTypeIssuedId = 2; ";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("nGBId", nGBId);
                command.Connection = _connection;
                command.CommandType = CommandType.Text;

                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                var forms = tables[0].AsEnumerable().Select(row => new {
                    Id = row.Field<int>("Id"),
                    nGBId = row.Field<int>("nGBId"),
                    dtIssuedDate = row.Field<DateTime?>("dtIssuedDate"),
                    sWhyIssued = row.Field<string?>("sWhyIssued"),
                    nMadebTypeId = row.Field<int?>("nMadebTypeId"),
                    nTypeIssuedId = row.Field<int?>("nTypeIssuedId"),
                    sFormNumber = row.Field<string>("sFormNumber"),
                    nWhereIssued = row.Field<int?>("nWhereIssued"),
                    nAuthRegionId = row.Field<int?>("nAuthRegionId"),
                    bPrinted = row.Field<bool>("bPrinted"),
                    sRemarks = row.Field<string>("sRemarks"),
                    dtEntered = row.Field<DateTime>("dtEntered"),
                    nEnteredBy = row.Field<int>("nEnteredBy"),
                    dtUpdated = row.Field<DateTime>("dtUpdated"),
                    nUpdatedBy = row.Field<int>("nUpdatedBy"),
                    sAuthRegion = row.Field<string>("sAuthRegion"),
                    sTypeIssued = row.Field<string>("sTypeIssued"),
                    sMadebDisplayName = row.Field<string>("sMadebDisplayName"), }).ToList();
                return forms;
            }
        }
        public Object GetLatestIssueBookJoin()
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
                       INNER JOIN (SELECT nFormNumber, nBookNo, nMadebTypeID FROM tblgreenbookserial where nFormNumber IS NOT NULL ORDER BY tblgreenbookserial.nBookNo DESC) as t2 ON tblmadeb.nFormNumber = t2.nFormNumber AND t2.nmadebtypeid = tblmadeb.nMadebTypeID 
                       WHERE `tblmadeb`.`nIssuedOrNotID` !=2  ORDER BY  t2.nbookno DESC, `tblmadeb`.`dtUpdated` DESC LIMIT 10; ";
            using (var command = new MySqlCommand(sql))
            {
               
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

        #region Populate Madeb Records
        public override IssueBook PopulateRecord(MySqlDataReader reader)
        {
            //reader.get
            int colIndex1 = reader.GetOrdinal("dtEntered");
            int colIndex2 = reader.GetOrdinal("dtUpdated");
            int colIndex3 = reader.GetOrdinal("dtIssuedDate");
           // int colIndex4 = reader.GetOrdinal("dtEmailSend");

            DateTime? dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"]);

            //DateTime? dtEntered = (Convert.IsDBNull(reader["dtEntered"]) ? null : (DateTime?)(reader["dtEntered"]));
            DateTime? dtUpdated = (Convert.IsDBNull(reader["dtUpdated"]) ? null : (DateTime?)(reader["dtUpdated"]));



            DateTime? dtIssuedDate = null;
            if (!reader.IsDBNull(colIndex3))
            {
                dtIssuedDate = (DateTime)reader["dtIssuedDate"];
            }
 

            return new IssueBook
            {
                Id = (int)reader["Id"],
                nGBID = reader.IsDBNull("nGBID") ? null : (int?)(reader["nGBID"]),
                dtIssuedDate = reader.IsDBNull("dtIssuedDate") ? null : (DateTime?)reader["dtIssuedDate"],
                sWhyIssued = reader.IsDBNull("sWhyIssued") ? null : (string)reader["sWhyIssued"],
                nMadebTypeId = reader.IsDBNull("nMadebTypeId") ? null : (int?)(reader["nMadebTypeId"]),
                sFormNumber = reader.IsDBNull("sFormNumber") ? null : (string)(reader["sFormNumber"]),
                nWhereIssued = reader.IsDBNull("nWhereIssued") ? null : (int?)(reader["nWhereIssued"]),
                nAuthRegionId = reader.IsDBNull("nAuthRegionId") ? null : (int?)(reader["nAuthRegionId"]),
                bPrinted = (bool)(reader["bPrinted"]),
                sRemarks = reader.IsDBNull("sRemarks") ? null : (string)(reader["sRemarks"]),
                //Common Props
                dtEntered = (DateTime)(reader["dtEntered"]),
                nEnteredBy = (int)reader["nEnteredBy"],
                dtUpdated = (DateTime)(reader["dtUpdated"]),
                nUpdatedBy = (int)reader["nUpdatedBy"],
                nTypeIssuedId = reader.IsDBNull("nTypeIssuedId") ? null : (int?)(reader["nTypeIssuedId"]),

            };
        }
        #endregion
    }
}
