using MySql.Data.MySqlClient;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Data.SqlTypes;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace CTAWebAPI.Services
{
    public class DuplicateCheck<T> where T : class
    {
        #region Constructor
        private readonly T _item;
        private static MySqlConnection _connection;
        private bool duplicate = false;
        public DuplicateCheck(T item, string connectionString)
        {
            _item = item;
            _connection = new MySqlConnection(connectionString);
        }
        #endregion

        #region Check
        public bool IsDuplicate(int id, string[] properties, out string message)
        {
            var tableAttr = Attribute.GetCustomAttribute(typeof(T),
                typeof(TableAttribute));
            string table = tableAttr != null ? (tableAttr as TableAttribute).Name : String.Empty;
            string s = String.Join(", ", properties);
            string sql = String.Format(@"SELECT {0} FROM {1} WHERE Id != {2}", s, table, id);
            Dictionary<string, dynamic> dict = _item.GetType().GetProperties(BindingFlags.Instance | BindingFlags.Public).ToDictionary(prop => prop.Name, prop => (dynamic)prop.GetValue(_item, null));
            using (var command = new MySqlCommand(sql))
            {
                command.Connection = _connection;
                command.CommandType = CommandType.Text;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                foreach(DataRow row in tables[0].Rows)
                {
                    //PropertyInfo commonPI = type.GetProperty(pi.Name);
                    //object[] displayNameAttributeCommon = commonPI.GetCustomAttributes(typeof(DisplayNameAttribute), false);
                    //string sDisplayNameCommon = displayNameAttributeCommon.Length > 0 ? (displayNameAttributeCommon[0] as DisplayNameAttribute).DisplayName : pi.Name;
                    foreach (string prop in properties)
                    {
                        var dbValue = row[prop].ToString().ToUpper();
                        var objValue = dict[prop].ToString().ToUpper();
                        if(dbValue == objValue)
                        {
                            message = String.Format("{0} already exists", prop);
                            return true;
                        }
                    }
                    
                }
                message = "";
                return false;
            }
        }
        #endregion
    }
}
