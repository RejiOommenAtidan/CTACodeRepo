using CTADBL.BaseClasses.Masters;
using CTADBL.ViewModels;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace CTADBL.ViewModelsRepositories
{
    public class GreenBookSerialNewRecordRepository
    {
        private string _connectionString;
        private static MySqlConnection _connection;

        #region Constructor
        public GreenBookSerialNewRecordRepository (string connectionString)
        {
            _connectionString = connectionString;
            _connection = new MySqlConnection(connectionString);
        }
        #endregion


        #region Get New Madeb Record
        public GreenBookSerialNewRecord GetNewEmptyGreenBookSerialRecord()
        {

            using (var command = new MySqlCommand("spGetNewGreenBookSerialData"))
            {
                //command.Parameters.AddWithValue("id", id);
                command.Connection = _connection;
                command.CommandType = CommandType.StoredProcedure;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);

                DataTableCollection tables = ds.Tables;
                List<MadebType> madebTypes = tables[0].AsEnumerable().Select(row => new MadebType { Id = row.Field<int>("Id"), sMadebDisplayName = row.Field<string>("sMadebDisplayName") }).ToList();
                List<AuthRegion> authRegions = tables[1].AsEnumerable().Select(row => new AuthRegion { ID = row.Field<int>("ID"), sAuthRegion = row.Field<string>("sAuthRegion") }).ToList();
                var nBookNumber = Convert.ToInt32(tables[2].Select()[0][0]);

                GreenBookSerialNewRecord greenBookSerialNewRecord = new GreenBookSerialNewRecord
                {
                    authRegions = authRegions,
                    madebTypes = madebTypes,
                    nBookNo = nBookNumber
                };
                return greenBookSerialNewRecord;
            }
        }
        #endregion
    }
}
