using CTADBL.BaseClasses.Masters;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace CTADBL.BaseClassRepositories.Masters
{
    public class ChatrelRepository : ADORepository<Chatrel>
    {
        #region Constructor
        public ChatrelRepository(string connectionString) : base(connectionString)
        {
        }
        #endregion

        #region Add Call
        public void Add(Chatrel chatrel)
        {
            var builder = new SqlQueryBuilder<Chatrel>(chatrel);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Update Call
        public void Update(Chatrel chatrel)
        {
            var builder = new SqlQueryBuilder<Chatrel>(chatrel);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Delete Call
        public void Delete(Chatrel chatrel)
        {
            var builder = new SqlQueryBuilder<Chatrel>(chatrel);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get Chatrel
        public IEnumerable<Chatrel> GetAllChatrel()
        {
            string sql = @"SELECT `Id`,
                            `sChatrelKey`,
                            `nChatrelValue`,
                            `dtChatrelFrom`,
                            `dtEntered`,
                            `nEnteredBy`
                        FROM `lstchatrel`;";
            using (var command = new MySqlCommand(sql))
            {
                return GetRecords(command);
            }
        }

        public Chatrel GetChatrelById(string Id)
        {
            string sql = @"SELECT `Id`,
                            `sChatrelKey`,
                            `nChatrelValue`,
                            `dtChatrelFrom`,
                            `dtEntered`,
                            `nEnteredBy`
                        FROM `lstchatrel`
                        WHERE Id = @Id;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("Id", Id);
                return GetRecord(command);
            }
        }

        public Chatrel GetChatrelByChatrelKey(string sChatrelKey)
        {
            string sql = @"SELECT `Id`,
                            `sChatrelKey`,
                            `nChatrelValue`,
                            `dtChatrelFrom`,
                            `dtEntered`,
                            `nEnteredBy`
                        FROM `lstchatrel`
                        WHERE sChatrelKey = @sChatrelKey;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sChatrelKey", sChatrelKey);
                return GetRecord(command);
            }
        }
        #endregion

        #region Populate Chatrel Records
        public override Chatrel PopulateRecord(MySqlDataReader reader)
        {
            Chatrel chatrel = new Chatrel();
            chatrel.Id = (int)reader["Id"];
            chatrel.sChatrelKey = (string)reader["sChatrelKey"];
            chatrel.nChatrelValue = (int?)reader["nChatrelValue"];
            chatrel.dtChatrelFrom = reader.IsDBNull("dtChatrelFrom") ? null : (DateTime?)(reader["dtChatrelFrom"]);
            chatrel.dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"]);
            chatrel.nEnteredBy = (int)reader["nEnteredBy"];
            return chatrel;
        }
        #endregion
    }
}
