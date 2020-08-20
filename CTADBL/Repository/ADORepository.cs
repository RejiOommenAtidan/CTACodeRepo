using MySql.Data.MySqlClient;
using System.Collections.Generic;
using System.Data;

namespace CTADBL.Repository
{
    public abstract class ADORepository<T> where T : class
    {
        #region Constructor
        private static MySqlConnection _connection;
        public ADORepository(string connectionString)
        {
            _connection = new MySqlConnection(connectionString);
        }
        #endregion

        #region Generic Populate Record
        public virtual T PopulateRecord(MySqlDataReader reader)
        {
            return null;
        }
        #endregion

        #region Generic Get Record/Records
        protected IEnumerable<T> GetRecords(MySqlCommand command)
        {
            var list = new List<T>();
            command.Connection = _connection;
            _connection.Open();
            try
            {
                var reader = command.ExecuteReader();
                try
                {
                    while (reader.Read())
                        list.Add(PopulateRecord(reader));
                }
                finally
                {
                    // Always call Close when done reading.
                    reader.Close();
                }
            }
            finally
            {
                _connection.Close();
            }
            return list;
        }
        protected T GetRecord(MySqlCommand command)
        {
            T record = null;
            command.Connection = _connection;
            _connection.Open();
            try
            {
                var reader = command.ExecuteReader();
                try
                {
                    while (reader.Read())
                    {
                        record = PopulateRecord(reader);
                        break;
                    }
                }
                finally
                {
                    // Always call Close when done reading.
                    reader.Close();
                }
            }
            finally
            {
                _connection.Close();
            }
            return record;
        }
        #endregion

        #region Generic SP Call
        protected IEnumerable<T> ExecuteStoredProc(MySqlCommand command)
        {
            var list = new List<T>();
            command.Connection = _connection;
            command.CommandType = CommandType.StoredProcedure;
            _connection.Open();
            try
            {
                var reader = command.ExecuteReader();
                try
                {
                    while (reader.Read())
                    {
                        var record = PopulateRecord(reader);
                        if (record != null) list.Add(record);
                    }
                }
                finally
                {
                    // Always call Close when done reading.
                    reader.Close();
                }
            }
            finally
            {
                _connection.Close();
            }
            return list;
        }
        #endregion

        #region Generic Execute Command Call
        protected void ExecuteCommand(MySqlCommand command)
        {
            command.Connection = _connection;
            command.CommandType = CommandType.Text;
            _connection.Open();
            try
            {
                command.ExecuteNonQuery();
            }
            finally
            {
                _connection.Close();
            }
        } 
        #endregion
    }
}