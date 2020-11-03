using ChatrelDBL.BaseClasses.Masters;
using ChatrelDBL.QueryBuilder;
using ChatrelDBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;


namespace ChatrelDBL.BaseClassRepositories.Masters
{
    public class ChatrelConfigRepository : ADORepository<ChatrelConfig>
    {
        private static IEnumerable<ChatrelConfig> _configs;

        public static IEnumerable<ChatrelConfig> configs
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
        public ChatrelConfigRepository(string connectionString) : base(connectionString)
        {
            LoadValues();
        }
        #endregion

        private void LoadValues()
        {
            string sql = @"SELECT `Id`,
                                `sKey`,
                                `sValue`,
                                `dtUpdated`,
                                `nUpdatedBy`
                            FROM `lstctaconfig`;";
            using (var command = new MySqlCommand(sql))
            {
                configs = GetRecords(command);
            }
        }


        #region Get ChatrelConfig
        public IEnumerable<ChatrelConfig> GetAllConfig()
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

        public ChatrelConfig GetConfigById(string Id)
        {
            return configs.Where(con => con.Id == Convert.ToInt32(Id)).FirstOrDefault();
        }


        //public ChatrelConfig GetConfigById(string Id)
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

        public ChatrelConfig GetConfigByKey(string sKey)
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

        #region Populate ChatrelConfig Records
        public override ChatrelConfig PopulateRecord(MySqlDataReader reader)
        {
            ChatrelConfig chatrelConfig = new ChatrelConfig();
            chatrelConfig.Id = (int)reader["Id"];
            chatrelConfig.sKey = (string)reader["sKey"]; ;
            chatrelConfig.sValue = (string)reader["sValue"]; ;
            chatrelConfig.nUpdatedBy = (int)reader["nUpdatedBy"];
            chatrelConfig.dtUpdated = (DateTime)reader["dtUpdated"]; ;
            return chatrelConfig;
        }
        #endregion

        #region Add Call
        public void Add(ChatrelConfig chatrelConfig)
        {
            var builder = new SqlQueryBuilder<ChatrelConfig>(chatrelConfig);
            ExecuteCommand(builder.GetInsertCommand());
            LoadValues();
        }
        #endregion

        #region Update Call
        public void Update(ChatrelConfig chatrelConfig)
        {
            var builder = new SqlQueryBuilder<ChatrelConfig>(chatrelConfig);
            ExecuteCommand(builder.GetUpdateCommand());
            LoadValues();
        }
        #endregion

        #region Delete Call
        public void Delete(ChatrelConfig chatrelConfig)
        {
            var builder = new SqlQueryBuilder<ChatrelConfig>(chatrelConfig);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion
    }
}
