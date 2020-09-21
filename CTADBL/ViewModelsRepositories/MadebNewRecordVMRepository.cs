using System;
using System.Collections.Generic;
using System.Text;
using MySql.Data.MySqlClient;
using System.Data;
using CTADBL.QueryBuilder;
using CTADBL.ViewModels;
using CTADBL.Repository;
using CTADBL.BaseClasses;
using CTADBL.BaseClassRepositories;
using System.Linq;

namespace CTADBL.ViewModelsRepositories
{
    public class MadebNewRecordVMRepository : ADORepository<MadebNewRecordVM>
    {
        #region Constructor
        
        public MadebNewRecordVMRepository(string connectionString) : base(connectionString)
        {
          
        }
        #endregion

        #region Get New Madeb Record
        public List<MadebNewRecordVM> GetNewEmptyMadeb()
        {

            using (var command = new MySqlCommand("spGetNewMadebData"))
            {
                //command.Parameters.AddWithValue("id", id);
                List<MadebNewRecordVM> madebNewRecord = ExecuteStoredProc(command).ToList();
                return madebNewRecord;
            }


            
        }
        #endregion

        #region Populate Object on Get calls
        public override MadebNewRecordVM PopulateRecord(MySqlDataReader reader)
        {
            //reader.
            return base.PopulateRecord(reader);
        }
        #endregion
    }

}
