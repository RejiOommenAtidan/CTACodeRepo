using CTADBL.BaseClasses.Masters;
using CTADBL.ViewModels;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace CTADBL.ViewModelsRepositories
{
    public class MadebNewRecordVMRepository 
    {
        private string _connectionString;
        private static MySqlConnection _connection;

        #region Constructor
        public MadebNewRecordVMRepository(string connectionString) 
        {
            _connectionString = connectionString;
            _connection = new MySqlConnection(connectionString);
        }
        #endregion

        #region Get New Madeb Record
        public MadebNewRecordVM GetNewEmptyMadeb()
        {

            using (var command = new MySqlCommand("spGetNewMadebData"))
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
                List<TypeIssued> typeIssueds = tables[2].AsEnumerable().Select(row => new TypeIssued { Id = row.Field<int>("Id"), sTypeIssued = row.Field<string>("sTypeIssued") }).ToList();
                List<MadebStatus> madebStatuses = tables[3].AsEnumerable().Select(row => new MadebStatus { Id = row.Field<int>("Id"), sMadebStatus = row.Field<string>("sMadebStatus") }).ToList();
                var formNumber = Convert.ToInt32(tables[4].Select()[0][0]);

                MadebNewRecordVM madebNewRecord = new MadebNewRecordVM
                {
                    authRegions = authRegions,
                    madebTypes = madebTypes,
                    typeIssued = typeIssueds,
                    madebStatuses = madebStatuses,
                    nFormNumber = formNumber
                };
                return madebNewRecord;
            }
        }
        #endregion

        
        
        //#region Populate Object on Get calls
        //public MadebNewRecordVM PopulateRecord(MySqlDataReader reader)
        //{
        //    //reader.

        //    MySqlCommand command = new MySqlCommand()
        //    return null;
        //}
        //#endregion
    }

}
