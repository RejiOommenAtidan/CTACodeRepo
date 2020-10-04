using CTADBL.BaseClasses.Masters;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace CTADBL.BaseClassRepositories.Masters
{
    public class CTAConfigRepository : ADORepository<CTAConfig>
    {
        #region Constructor
        public CTAConfigRepository(string connectionString) : base(connectionString)
        {
        }
        #endregion

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
