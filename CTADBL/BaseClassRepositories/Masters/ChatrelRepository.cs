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
    public class ChatrelRepository : ADORepository<Chatrel>
    {
        private static MySqlConnection _connection;
        #region Constructor
        public ChatrelRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
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


        #region Get Historic values of Chatrel Key for each year starting from Chatrel Year to Current Year

        public Dictionary<int, dynamic> YearWiseValue(string chatrelConfigKey)
        {
            string sql = @"WITH recursive mycte(yr, val) AS
                           (
                                SELECT year(dtchatrelfrom),
                                        nchatrelvalue
                                FROM   lstchatrel
                                WHERE  schatrelkey = @chatrelConfigKey
                                AND    year(dtchatrelfrom) =
                                        (
                                                SELECT min(year(dtchatrelfrom))
                                                FROM   lstchatrel
                                                WHERE  schatrelkey = @chatrelConfigKey)
                                UNION ALL
                                SELECT    yr+1,
                                            COALESCE(lstchatrel.nchatrelvalue, val)
                                FROM      mycte
                                LEFT JOIN lstchatrel
                                ON        year(lstchatrel.dtchatrelfrom) = (yr+1)
                                AND       lstchatrel.schatrelkey = @chatrelConfigKey
                                WHERE     yr < year(curdate())
                          )
                          SELECT    mycte.yr,
                                    COALESCE(lstchatrel.nchatrelvalue, val) AS val
                          FROM      mycte
                          LEFT JOIN lstchatrel
                          ON        mycte.yr = year(lstchatrel.dtchatrelfrom)
                          AND       lstchatrel.schatrelkey = @chatrelConfigKey
                          ORDER BY  yr;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("chatrelConfigKey", chatrelConfigKey);
                command.Connection = _connection;
                command.CommandType = CommandType.Text;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                Dictionary<int, dynamic> dict = tables[0].AsEnumerable().ToDictionary<DataRow, int, dynamic>(row => Convert.ToInt32(row.Field<System.UInt64>("yr")), row => row.Field<dynamic>("val"));
                return dict;
            }
             
        }

        #endregion

        #region Populate Chatrel Records
        public override Chatrel PopulateRecord(MySqlDataReader reader)
        {
            Chatrel chatrel = new Chatrel();
            chatrel.Id = (int)reader["Id"];
            chatrel.sChatrelKey = (string)reader["sChatrelKey"];
            chatrel.nChatrelValue = (int)reader["nChatrelValue"];
            chatrel.dtChatrelFrom = reader.IsDBNull("dtChatrelFrom") ? null : (DateTime?)(reader["dtChatrelFrom"]);
            chatrel.dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"]);
            chatrel.nEnteredBy = (int)reader["nEnteredBy"];
            return chatrel;
        }
        #endregion
    }
}
