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
        private static string _connectionString;
        public static Dictionary<int, dynamic> ChatrelAmountUSD;
        public static Dictionary<int, dynamic> ChatrelMealUSD;
        public static Dictionary<int, dynamic> ChatrelSalaryUSD;
        public static Dictionary<int, dynamic> ChatrelChildMonthlyUSD;

        public static Dictionary<int, dynamic> ChatrelAmountINR;
        public static Dictionary<int, dynamic> ChatrelMealINR;
        public static Dictionary<int, dynamic> ChatrelSalaryINR;
        public static Dictionary<int, dynamic> ChatrelChildMonthlyINR;

        private static bool Initialized = false;

        #region Constructor
        public ChatrelRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
        }
        #endregion

        #region Static Constructor
        static ChatrelRepository()
        {
           
            
        }
        #endregion

        #region Initialize static values 
        public static void Init(string conn)
        {

            if (!Initialized)
            {
                _connectionString = conn;
                MySqlConnection connection = new MySqlConnection(conn);
                ChatrelAmountUSD = YearWiseValue("USDYearChatrelAmount", connection);
                ChatrelMealUSD = YearWiseValue("USDYearChatrelMeal", connection);
                ChatrelSalaryUSD = YearWiseValue("USDYearChatrelSalaryAmt", connection);
                ChatrelChildMonthlyUSD = YearWiseValue("USDChildMonthChatrelAmount", connection);

                ChatrelAmountINR = YearWiseValue("INRYearChatrelAmount", connection);
                ChatrelMealINR = YearWiseValue("INRYearChatrelMeal", connection);
                ChatrelSalaryINR = YearWiseValue("INRYearChatrelSalaryAmt", connection);
                ChatrelChildMonthlyINR = YearWiseValue("INRChildMonthChatrelAmount", connection);

                Initialized = true;
            }
            
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
                            `nEnteredBy`,
                            `dtUpdated`,
                            `nUpdatedBy`
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
                            `nEnteredBy`,
                            `dtUpdated`,
                            `nUpdatedBy`
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
                            `nEnteredBy`,
                            `dtUpdated`,
                            `nUpdatedBy`
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

        private static Dictionary<int, dynamic> YearWiseValue(string chatrelConfigKey, MySqlConnection connection)
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
                          SELECT    CAST(mycte.yr AS UNSIGNED) AS yr,
                                    COALESCE(lstchatrel.nchatrelvalue, val) AS val
                          FROM      mycte
                          LEFT JOIN lstchatrel
                          ON        mycte.yr = year(lstchatrel.dtchatrelfrom)
                          AND       lstchatrel.schatrelkey = @chatrelConfigKey
                          ORDER BY  yr;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("chatrelConfigKey", chatrelConfigKey);
                command.Connection = connection;
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
            chatrel.dtEntered = (DateTime)reader["dtEntered"];
            chatrel.dtUpdated = (DateTime)reader["dtUpdated"];
            chatrel.nUpdatedBy = (int)reader["nUpdatedBy"];
            chatrel.nEnteredBy = (int)reader["nEnteredBy"];
            return chatrel;
        }
        #endregion
    }
}
