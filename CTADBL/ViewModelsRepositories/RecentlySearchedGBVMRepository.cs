using CTADBL.Repository;
using CTADBL.ViewModels;
using CTADBL.BaseClasses.Transactions;
using CTADBL.QueryBuilder;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using CTADBL.BaseClassRepositories.Transactions;

namespace CTADBL.ViewModelsRepositories
{
    public class RecentlySearchedGBVMRepository : ADORepository<RecentlySearchedGBVM>
    {
        private RecentlySearchedGBRepository _recentlySearchedGBRepository;
        #region Constructor
        public RecentlySearchedGBVMRepository(string connectionString) : base(connectionString)
        {
            _recentlySearchedGBRepository = new RecentlySearchedGBRepository(connectionString);
        }
        #endregion



        #region Get Call
        public IEnumerable<RecentlySearchedGBVM> GetRecentSearches(int records, int nUserId)
        {
            //string sql = @"SELECT `tblrecentlysearchedgb`.`ID`, `tblrecentlysearchedgb`.`nGBID`, `tblrecentlysearchedgb`.`nUserID`, `tblrecentlysearchedgb`.`dtEntered`, `tblrecentlysearchedgb`.`nEnteredBy`, lnkgbdocument.binFileDoc AS sPhoto FROM `tblrecentlysearchedgb` LEFT JOIN lnkgbdocument ON concat (tblrecentlysearchedgb.nGBID, '') = lnkgbdocument.sGBId AND lnkgbdocument.sDocType = 'Photo Identity' WHERE tblrecentlysearchedgb.nUserID = @nUserId  ORDER BY dtEntered DESC LIMIT @records;";

            string sql = "SELECT myresult.nGBID, myresult.m, doc.binFileDoc AS sPhoto FROM (SELECT nGBID, MAX(id) AS m FROM tblrecentlysearchedgb tr WHERE nUserID = @nUserId GROUP BY nGBID ORDER BY m DESC) AS myresult LEFT JOIN lnkgbdocument doc ON doc.sGBId = CONCAT(myresult.nGBID + '') AND lnkgbdocument.sDocType = 'Photo Identity' ORDER BY myresult.m DESC LIMIT @records ; ";

            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("nUserId", nUserId);
                command.Parameters.AddWithValue("records", records);
                return GetRecords(command);
            }
        }
        #endregion

        #region Populate records

        public override RecentlySearchedGBVM PopulateRecord(MySqlDataReader reader)
        {
            string? sPhoto = null;
            if (!reader.IsDBNull("sPhoto"))
            {
                byte[] img = (byte[])reader["sPhoto"];
                sPhoto = Convert.ToBase64String(img);
            }

            RecentlySearchedGBVM recentlySearchedGBVM = new RecentlySearchedGBVM
            {
                //recentlySearchedGB = _recentlySearchedGBRepository.PopulateRecord(reader),
                nGBID = (int)reader["nGBID"],
                sPhoto = sPhoto
            };
            return recentlySearchedGBVM;
        }

        #endregion
    }
}
