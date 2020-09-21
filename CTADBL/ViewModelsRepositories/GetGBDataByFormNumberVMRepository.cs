using CTADBL.ViewModels;
using MySql.Data.MySqlClient;
using System.Data;

namespace CTADBL.ViewModelsRepositories
{
    public class GetGBDataByFormNumberVMRepository
    {
        #region Constructor
        private static MySqlConnection _connection;
        public GetGBDataByFormNumberVMRepository(string connectionString)
        {
            _connection = new MySqlConnection(connectionString);
        }
        #endregion

        #region Get GB Data by Form Number
        public GetGBDataByFormNumberVM GetGBDataByFormNumber(int nFormNumberIN)
        {
            using (var command = new MySqlCommand("spGetNewGreenBookDataByFormNo"))
            {
                command.Parameters.AddWithValue("nFormNumberIN", nFormNumberIN);
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
                            //var record = PopulateRecord(reader);
                            //if (record != null) list.Add(record);
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
                return null;
            }
        }
        #endregion
    }
}
