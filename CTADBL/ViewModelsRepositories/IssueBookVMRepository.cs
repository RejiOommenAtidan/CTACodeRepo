using CTADBL.ViewModels;
using CTADBL.QueryBuilder;
using CTADBL.ViewModelsRepositories;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using CTADBL.BaseClassRepositories.Transactions;

namespace CTADBL.ViewModelsRepositories
{
    public class IssueBookVMRepository : ADORepository<IssueBookVM>
    {
        private static MySqlConnection _connection;
        private IssueBookRepository _issueBookRepository;

        #region Constructor
        public IssueBookVMRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
            _issueBookRepository = new IssueBookRepository(connectionString);
        }
        #endregion


        #region Get Call

        public IEnumerable<IssueBookVM> GetIssueBookByGbId(int nGBId)
        {
            string sql = String.Format(@"SELECT `gbi`.`Id`, `gbi`.`nGBId`, `gbi`.`dtIssuedDate`, `gbi`.`sWhyIssued`,`gbi`.`nMadebTypeId`, `gbi`.`nTypeIssuedId`,`gbi`.`sFormNumber`, `gbi`.`nWhereIssued`, `gbi`.`nAuthRegionId`, IF(`gbi`.`nPrinted`, 1, 0) AS nPrinted, `gbi`.`sRemarks`, `gbi`.`dtEntered`, `gbi`.`nEnteredBy`, `gbi`.`dtUpdated`, `gbi`.`nUpdatedBy`, au.sAuthRegion, md.sMadebDisplayName FROM `tblgreenbookissued` AS gbi LEFT JOIN lstauthregion AS au ON au.ID = gbi.nAuthRegionId LEFT JOIN lstmadebtype AS md ON md.Id = gbi.nMadebTypeId WHERE nGBId=@nGBId;");

            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("nGBID", nGBId);
                IEnumerable<IssueBookVM> issueBookVM = GetRecords(command);
                return issueBookVM;
            }
        }

        #endregion

        #region Populate records
        public override IssueBookVM PopulateRecord(MySqlDataReader reader)
        {

            IssueBookVM issueBookVM = new IssueBookVM
            {
                issueBook = _issueBookRepository.PopulateRecord(reader),
                sAuthRegion = reader.IsDBNull("sAuthRegion") ? null : (string)reader["sAuthRegion"],
                sMadebDisplayName = reader.IsDBNull("sMadebDisplayName") ? null : (string)reader["sMadebDisplayName"]
            };

            return issueBookVM;
        }
        #endregion
    }
}
