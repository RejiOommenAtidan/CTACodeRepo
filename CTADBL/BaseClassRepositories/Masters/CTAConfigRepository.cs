using CTADBL.BaseClasses.Masters;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
                                `nEnteredBy`
                            FROM `lstctaconfig`;";
            using (var command = new MySqlCommand(sql))
            {
                configs = GetRecords(command);
            }
        }

        public bool UpdateConfiguration(IEnumerable<CTAConfig> configs) 
        {
           //to do
            return true;
        }


        #region Get CTAConfig
        public IEnumerable<CTAConfig> GetAllConfig()
        {
            string sql = @"SELECT `Id`,
                                `sKey`,
                                `sValue`,
                                `dtEntered`,
                                `nEnteredBy`
                            FROM `lstctaconfig`;";
            using (var command = new MySqlCommand(sql))
            {
                return GetRecords(command);
            }
        }

        public CTAConfig GetConfigById(string Id)
        {
            string sql = @"SELECT `Id`,
                            `sKey`,
                            `sValue`,
                            `dtEntered`,
                            `nEnteredBy`
                        FROM `lstctaconfig`
                        WHERE Id = @Id;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("Id", Id);
                return GetRecord(command);
            }
        }

        
        public static dynamic GetValue(string key)
        {
            var value = configs.Where(con => con.sKey == key).Select(res => res.sValue).FirstOrDefault();
            return value;
        }
        
        
        public CTAConfig GetConfigByKey(string sKey)
        {
            string sql = @"SELECT `Id`,
                            `sKey`,
                            `sValue`,
                            `dtEntered`,
                            `nEnteredBy`
                        FROM `lstctaconfig`
                        WHERE sKey = @sKey;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sKey", sKey);
                return GetRecord(command);
            }
        }
        #endregion

        #region Populate CTAConfig Records
        public override CTAConfig PopulateRecord(MySqlDataReader reader)
        {
            CTAConfig ctaConfig = new CTAConfig();
            ctaConfig.Id = (int)reader["Id"];
            ctaConfig.sKey = (string)reader["sKey"]; ;
            ctaConfig.sValue = (string)reader["sValue"]; ;
            ctaConfig.nEnteredBy = (int)reader["nEnteredBy"];
            ctaConfig.dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"]); ;
            return ctaConfig;
        }
        #endregion
    }
}
