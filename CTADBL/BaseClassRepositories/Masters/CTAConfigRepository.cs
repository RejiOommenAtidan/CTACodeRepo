using CTADBL.BaseClasses.Masters;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace CTADBL.BaseClassRepositories.Masters
{
    public class CTAConfigRepository : ADORepository<CTAConfig>
    {
        private static IEnumerable<CTAConfig> _configs;

        public static IEnumerable<CTAConfig> configs
        {
            get
            {
                return _configs;

            }
            set
            {
                _configs = value;
            }
        }

        #region Constructor
        public CTAConfigRepository(string connectionString) : base(connectionString)
        {
            LoadValues();
        }
        #endregion

        private void LoadValues()
        {
            string sql = @"SELECT `Id`,
                                `sKey`,
                                `sValue`,
                                `dtEntered`,
                                `nEnteredBy`,
                                `dtUpdated`,
                                `nUpdatedBy`
                            FROM `lstctaconfig`;";
            using (var command = new MySqlCommand(sql))
            {
                configs = GetRecords(command);
            }
        }


        #region Get CTAConfig
        public IEnumerable<CTAConfig> GetAllConfig()
        {

            return configs;
            //string sql = @"SELECT `Id`,
            //                    `sKey`,
            //                    `sValue`,
            //                    `dtEntered`,
            //                    `nEnteredBy`
            //                FROM `lstctaconfig`;";
            //using (var command = new MySqlCommand(sql))
            //{
            //    return GetRecords(command);
            //}
        }

        public CTAConfig GetConfigById(string Id)
        {
            return configs.Where(con => con.Id == Convert.ToInt32(Id)).FirstOrDefault();
        }

        
        //public CTAConfig GetConfigById(string Id)
        //{
        //    string sql = @"SELECT `Id`,
        //                    `sKey`,
        //                    `sValue`,
        //                    `dtEntered`,
        //                    `nEnteredBy`
        //                FROM `lstctaconfig`
        //                WHERE Id = @Id;";
        //    using (var command = new MySqlCommand(sql))
        //    {
        //        command.Parameters.AddWithValue("Id", Id);
        //        return GetRecord(command);
        //    }
        //}

        public static dynamic GetValueByKey(string key)
        {
            var value = configs.Where(con => con.sKey == key).Select(res => res.sValue).FirstOrDefault();
            return value;
        }

        public CTAConfig GetConfigByKey(string sKey)
        {
            return configs.Where(con => con.sKey == sKey).FirstOrDefault();


            //string sql = @"SELECT `Id`,
            //                `sKey`,
            //                `sValue`,
            //                `dtEntered`,
            //                `nEnteredBy`
            //            FROM `lstctaconfig`
            //            WHERE sKey = @sKey;";
            //using (var command = new MySqlCommand(sql))
            //{
            //    command.Parameters.AddWithValue("sKey", sKey);
            //    return GetRecord(command);
            //}
        }
        #endregion

        #region Populate CTAConfig Records
        public override CTAConfig PopulateRecord(MySqlDataReader reader)
        {
            CTAConfig ctaConfig = new CTAConfig();
            ctaConfig.Id = (int)reader["Id"];
            ctaConfig.sKey = (string)reader["sKey"]; 
            ctaConfig.sValue = (string)reader["sValue"];
            ctaConfig.nEnteredBy = (int)reader["nEnteredBy"];
            ctaConfig.dtEntered = (DateTime)reader["dtEntered"];
            ctaConfig.nUpdatedBy = (int)reader["nUpdatedBy"];
            ctaConfig.dtUpdated = (DateTime)reader["dtUpdated"];
            return ctaConfig;
        }
        #endregion

        #region Add Call
        public void Add(CTAConfig ctaConfig)
        {
            var builder = new SqlQueryBuilder<CTAConfig>(ctaConfig);
            ExecuteCommand(builder.GetInsertCommand());
            LoadValues();
        }
        #endregion

        #region Update Call
        public void Update(CTAConfig ctaConfig)
        {
            var builder = new SqlQueryBuilder<CTAConfig>(ctaConfig);
            ExecuteCommand(builder.GetUpdateCommand());
            LoadValues();
        }
        #endregion

        #region Delete Call
        public void Delete(CTAConfig ctaConfig)
        {
            var builder = new SqlQueryBuilder<CTAConfig>(ctaConfig);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion
    }
}
