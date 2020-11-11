using CTADBL.BaseClasses.Transactions;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace CTADBL.BaseClassRepositories.Transactions
{
    public class FeatureUserrightsRepository : ADORepository<FeatureUserrights>
    {
        #region Constructor
        public FeatureUserrightsRepository(string connectionString) : base(connectionString)
        {
        }
        #endregion

        #region Add Call
        public void Add(FeatureUserrights featureUserrights)
        {
            var builder = new SqlQueryBuilder<FeatureUserrights>(featureUserrights);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Update Call
        public void Update(FeatureUserrights featureUserrights)
        {
            var builder = new SqlQueryBuilder<FeatureUserrights>(featureUserrights);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Delete Call
        public void Delete(FeatureUserrights featureUserrights)
        {
            var builder = new SqlQueryBuilder<FeatureUserrights>(featureUserrights);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get Feature User Rights
        public IEnumerable<FeatureUserrights> GetAllFeatureUserrights()
        {
            string sql = @"SELECT `Id`,
                            `nFeatureID`,
                            `nUserRightsID`,
                            `bRights`,
                            `dtEntered`,
                            `nEnteredBy`
                        FROM `lnkfeatureuserrights`;";
            using (var command = new MySqlCommand(sql))
            {
                return GetRecords(command);
            }
        }

        public FeatureUserrights GetFeatureUserrightsById(string Id)
        {
            string sql = @"SELECT `Id`,
                            `nFeatureID`,
                            `nUserRightsID`,
                            `bRights`,
                            `dtEntered`,
                            `nEnteredBy`
                        FROM `lnkfeatureuserrights`
                        WHERE Id = @Id;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("Id", Id);
                return GetRecord(command);
            }
        }

        public FeatureUserrights GetFeatureUserrightsByFeatureAnduserRighstId(int? nFeatureID,int? nUserRightsId)
        {
            string sql = @"SELECT `Id`,
                            `nFeatureID`,
                            `nUserRightsID`,
                            `bRights`,
                            `dtEntered`,
                            `nEnteredBy`
                        FROM `lnkfeatureuserrights`
                        WHERE nFeatureID = @nFeatureID AND nUserRightsID=@nUserRightsId;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("nFeatureID", nFeatureID);
                command.Parameters.AddWithValue("nUserRightsId", nUserRightsId);
                return GetRecord(command);
            }
        }
        #endregion

        #region Populate Feature User Rights Records
        public override FeatureUserrights PopulateRecord(MySqlDataReader reader)
        {
            FeatureUserrights featureUserrights = new FeatureUserrights();
            featureUserrights.Id = (int)reader["Id"];
            featureUserrights.nFeatureID = (int)reader["nFeatureID"]; ;
            featureUserrights.bRights = (bool)reader["bRights"]; ;
            featureUserrights.nUserRightsID = (int)reader["nUserRightsID"]; ;
            featureUserrights.dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"]);
            featureUserrights.nEnteredBy = (int)reader["nEnteredBy"];
            return featureUserrights;
        }
        #endregion
    }
}
