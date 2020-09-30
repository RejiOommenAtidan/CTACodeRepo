using CTADBL.BaseClassRepositories.Transactions;
using CTADBL.Repository;
using CTADBL.ViewModels;
using MySql.Data.MySqlClient;
using System.Collections.Generic;

namespace CTADBL.ViewModelsRepositories
{
    public class FeatureUserrightsVMRepository : ADORepository<FeatureUserrightsVM>
    {
        #region Constructor
        private FeatureUserrightsRepository _featureUserrightsRepository;
        public FeatureUserrightsVMRepository(string connectionString) : base(connectionString)
        {
            _featureUserrightsRepository = new FeatureUserrightsRepository(connectionString);
        }
        #endregion

        #region Populate Records
        public override FeatureUserrightsVM PopulateRecord(MySqlDataReader reader)
        {
            FeatureUserrightsVM featureUserrightsVM  = new FeatureUserrightsVM();
            featureUserrightsVM.oFeatureUserrights = _featureUserrightsRepository.PopulateRecord(reader);
            featureUserrightsVM.sUserRightsName = (string)reader["sUserRightsName"];
            featureUserrightsVM.sFeature = (string)reader["sFeature"];
            return featureUserrightsVM;
        }
        #endregion

        #region Get
        public IEnumerable<FeatureUserrightsVM> GetFeatureUserrights()
        {
            string sql = @"SELECT 
	                        `link`.`Id`,
	                        `link`.`nFeatureID`,
	                        `link`.`nUserRightsID`,
	                        IF(nRights, 1, 0) nRights,
	                        `link`.`dtEntered`,
	                        `link`.`nEnteredBy`,
                            `feature`.`sFeature`,
                            `userright`.`sUserRightsName`
                        FROM `lnkfeatureuserrights`as link
                        INNER JOIN lstfeature AS feature ON link.nFeatureId = feature.Id
                        INNER JOIN lstuserrights AS userright ON link.nUserRightsID = userright.Id
                        ORDER BY `link`.`Id`;";
            using (var command = new MySqlCommand(sql))
            {
                return GetRecords(command);
            }
        }
        #endregion
    }
}
