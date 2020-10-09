using CTADBL.Repository;
using CTADBL.ViewModels;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Text;

namespace CTADBL.ViewModelsRepositories
{
    public class FeatureUserrightsUIVMRepository : ADORepository<FeatureUserrightsUIVM>
    {
        #region Constructor
        public FeatureUserrightsUIVMRepository(string connectionString) : base(connectionString)
        {
        }
        #endregion

        #region Populate Records
        public override FeatureUserrightsUIVM PopulateRecord(MySqlDataReader reader)
        {
            FeatureUserrightsUIVM featureUserrightsUIVM = new FeatureUserrightsUIVM();
            featureUserrightsUIVM.nFeatureID= (int)reader["nFeatureID"];
            featureUserrightsUIVM.sFeature= (string)reader["sFeature"];
            featureUserrightsUIVM.nAdmin= (int)reader["Admin"];
            featureUserrightsUIVM.nEdit= (int)reader["Edit"];
            featureUserrightsUIVM.nBookIssue= (int)reader["Book Issue"];
            featureUserrightsUIVM.nEntry = (int)reader["Entry"];
            featureUserrightsUIVM.nSearch= (int)reader["Search"];
            return featureUserrightsUIVM;
        }
        #endregion

        #region Get
        public IEnumerable<FeatureUserrightsUIVM> GetFeatureUserrightsUI()
        {
            string sql = @"SELECT
                            lfu.nFeatureID,
                            lf.sFeature,
                            IF(SUM(CASE WHEN (lfu.nUserRightsID='5') THEN lfu.nRights ELSE null END),1,0) AS 'Admin',
                            IF(SUM(CASE WHEN (lfu.nUserRightsID='4') THEN lfu.nRights ELSE null END),1,0) AS 'Edit',
                            IF(SUM(CASE WHEN (lfu.nUserRightsID='3') THEN lfu.nRights ELSE null END),1,0) AS 'Book Issue',
                            IF(SUM(CASE WHEN (lfu.nUserRightsID='2') THEN lfu.nRights ELSE null END),1,0) AS 'Entry',
                            IF(SUM(CASE WHEN (lfu.nUserRightsID='1') THEN lfu.nRights ELSE null END),1,0) AS 'Search'
                            FROM
	                            lnkfeatureuserrights lfu
                            LEFT JOIN 
	                            lstfeature lf
                            ON 
	                            lf.Id = lfu.nFeatureID
                            GROUP BY
	                            lfu.nFeatureID;";
            using (var command = new MySqlCommand(sql))
            {
                return GetRecords(command);
            }
        }
        #endregion
    }
}
