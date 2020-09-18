using MySql.Data.MySqlClient;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.SqlTypes;
using System.Linq;
using System.Reflection;
using System.Text;

namespace CTADBL.QueryBuilder
{
    public class SqlQueryBuilder<T> where T : class
    {
        #region Constructor
        private readonly T _item;
        public SqlQueryBuilder(T item)
        {
            _item = item;
        }
        #endregion

        #region Helper methods
        protected string GetTableName()
        {
            var tableAttr = Attribute.GetCustomAttribute(typeof(T),
                typeof(TableAttribute));
            return tableAttr != null
                ? (tableAttr as TableAttribute).Name
                : String.Empty;
        }
        private SqlString GetSqlValue(T item, PropertyInfo propertyInfo)
        {
            /* Changes by Rajen */

            var value = propertyInfo.GetValue(item);
            return new SqlString(value == null ? "NULL" : value.ToString());
            
            /* Changes by Rajen */
            //return new SqlString(propertyInfo.GetValue(item).ToString());
        }
        private string GetKeyFieldName()
        {
            var result = GetKeyField();
            return result.Name;
        }
        private string GetKeyFieldValue()
        {
            var result = GetKeyField();
            return result.GetValue(_item).ToString();
        }
        private PropertyInfo GetKeyField()
        {
            var keyField = _item
                .GetType()
                .GetProperties()
                .FirstOrDefault(e => Attribute.IsDefined(e, typeof(KeyAttribute)));
            if (keyField != null)
            {
                return keyField;
            }
            throw new Exception("Key on a property could not be found");
        }
        #endregion

        #region Insert
        public MySqlCommand GetInsertCommand()
        {
            var table = GetTableName();
            //var key = GetKeyField();
            //if (key == null)
            //    throw new Exception("No Key attribute was found.");
            if (String.IsNullOrEmpty(table))
                throw new Exception("No Table attribute was found.");
            var query = String.Format("INSERT INTO {0} SELECT {1}",
                table,
                GetInsertFieldList());
            return new MySqlCommand(query);
        }
        private string GetInsertFieldList()
        {
            var sb = new StringBuilder();
            var properties = _item.GetType().GetProperties();
            foreach (var propertyInfo in properties)
            {
                //if (propertyInfo!=key)
                //{
                    var property = GetSqlValue(_item, propertyInfo);
                    sb.Append(GetFormattedInsertField(propertyInfo, property));
                //}
            }
            var query = sb.ToString();
            return query.Remove(query.Length - 1);
        }
        private string GetFormattedInsertField(PropertyInfo propertyInfo, SqlString property)
        {
            // int
            var result = String.Format("{0} as {1},", property.Value, propertyInfo.Name);
            // string
            if (propertyInfo.PropertyType == typeof(string))
            {
                if(property.Value == "NULL")
                {
                    result = String.Format("{0} as {1},", property.Value, propertyInfo.Name);
                }
                else
                {
                    result = String.Format("'{0}' as {1},", property.Value, propertyInfo.Name);
                }
                
            }
            // datetime
            else if (propertyInfo.PropertyType == typeof(DateTime?) || propertyInfo.PropertyType == typeof(DateTime))
            {
                /* Begin Changes by Rajen*/
                
                var str = "NULL";
                if (property.Value != "NULL")
                {
                    str = DateTime.Parse(property.Value).ToString("yyyy-MM-dd HH:mm:ss");
                    result = String.Format("'{0}' as {1},", str, propertyInfo.Name);
                }
                else
                {
                    result = String.Format("{0} as {1},", str, propertyInfo.Name);
                }
                
                /* End Changes by Rajen */

                //result = String.Format("'{0:u}' as {1},", property.Value, propertyInfo.Name);
            }
            return result;
        }
        #endregion

        #region Update
        public MySqlCommand GetUpdateCommand()
        {
            var table = GetTableName();
            if (String.IsNullOrEmpty(table))
                throw new Exception("No Table attribute was found.");
            var query = String.Format("UPDATE {0} SET {1} WHERE {2}={3}",
                table,
                GetUpdateFieldList(),
                GetKeyFieldName(),
                GetKeyFieldValue());
            return new MySqlCommand(query);
        }
        private string GetUpdateFieldList()
        {
            var sb = new StringBuilder();
            var properties = _item.GetType().GetProperties();
            var keyField = GetKeyFieldName();
            foreach (var propertyInfo in properties)
            {
                if (keyField == propertyInfo.Name) continue;
                var property = GetSqlValue(_item, propertyInfo);
                sb.Append(GetFormattedUpdateField(propertyInfo, property));
            }
            var query = sb.ToString();
            return query.Remove(query.Length - 1);
        }
        private string GetFormattedUpdateField(PropertyInfo propertyInfo, SqlString property)
        {
            // int
            var result = String.Format("{0}={1},", propertyInfo.Name, property.Value);
            // string
            if (propertyInfo.PropertyType == typeof(string))
            {
                
                if(property.Value == "NULL")
                {
                    result = String.Format("{0}={1},", propertyInfo.Name, property.Value);
                }
                else
                {
                    result = String.Format("{0}='{1}',", propertyInfo.Name, property.Value);
                }
            }
            // datetime
            else if (propertyInfo.PropertyType == typeof(DateTime) || propertyInfo.PropertyType == typeof(DateTime?))
            {
                /* Begin Changes by Rajen */

                var str = "NULL";
                if (property.Value != "NULL")
                {
                    str = DateTime.Parse(property.Value).ToString("yyyy-MM-dd HH:mm:ss");
                    result = String.Format("{0}='{1}',", propertyInfo.Name, str);
                }
                else
                {
                    result = String.Format("{0}={1},", propertyInfo.Name, str);
                }

                /* End Changes by Rajen */

                //result = String.Format("{0}='{1:}',", propertyInfo.Name, property.Value);
            }
            return result;
        }
        #endregion

        #region Delete
        public MySqlCommand GetDeleteCommand()
        {
            var table = GetTableName();
            if (String.IsNullOrEmpty(table))
                throw new Exception("No Table attribute was found.");
            var query = String.Format("DELETE FROM {0} WHERE {1}={2}",
                table,
                GetKeyFieldName(),
                GetKeyFieldValue());
            return new MySqlCommand(query);
        }
        #endregion
    }
}
