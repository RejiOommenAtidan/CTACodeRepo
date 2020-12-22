using CTADBL.BaseClasses.Masters;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace CTADBL.BaseClassRepositories.Masters
{
    public class FeatureRepository : ADORepository<Feature>
    {
        #region Constructor
        public FeatureRepository(string connectionString) : base(connectionString)
        {
        }
        #endregion

        #region Add Call
        public void Add(Feature feature)
        {
            var builder = new SqlQueryBuilder<Feature>(feature);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Update Call
        public void Update(Feature feature)
        {
            var builder = new SqlQueryBuilder<Feature>(feature);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Delete Call
        public void Delete(Feature feature)
        {
            var builder = new SqlQueryBuilder<Feature>(feature);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get Feature/Features
        public IEnumerable<Feature> GetAllFeatures()
        {
            string sql = @"SELECT `Id`,
                            `sFeature`,
                            `dtEntered`,
                            `nEnteredBy`,
                            `dtUpdated`,
                            `nUpdatedBy`
                        FROM `lstfeature`;";
            using (var command = new MySqlCommand(sql))
            {
                return GetRecords(command);
            }
        }

        public Feature GetFeatureById(string Id)
        {
            string sql = @"SELECT `Id`,
                            `sFeature`,
                            `dtEntered`,
                            `nEnteredBy`,
                            `dtUpdated`,
                            `nUpdatedBy`
                        FROM `lstfeature`
                        WHERE `Id`= @Id;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("Id", Id);
                return GetRecord(command);
            }
        }
        #endregion

        #region Populate Feature Records
        public override Feature PopulateRecord(MySqlDataReader reader)
        {
            Feature feature = new Feature();
            feature.Id= (int)reader["Id"];
            feature.sFeature = (string)reader["sFeature"];
            //Common Props
            feature.dtEntered = (DateTime)(reader["dtEntered"]);
            feature.nEnteredBy = (int)reader["nEnteredBy"];
            feature.dtUpdated = (DateTime)(reader["dtUpdated"]);
            feature.nUpdatedBy = (int)reader["nUpdatedBy"];
            return feature;
        }
        #endregion
    }
}
