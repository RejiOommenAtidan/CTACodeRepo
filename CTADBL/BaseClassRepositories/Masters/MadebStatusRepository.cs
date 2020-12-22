using CTADBL.BaseClasses.Masters;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace CTADBL.BaseClassRepositories.Masters
{
    public class MadebStatusRepository : ADORepository<MadebStatus>
    {
        private MySqlConnection _connection;
        #region Constructor
        public MadebStatusRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
        }
        #endregion

        #region Get Call
        public IEnumerable<MadebStatus> GetMadebStatuses()
        {
           using (var command = new MySqlCommand("SELECT Id, sMadebStatus, dtEntered, nEnteredBy, dtUpdated, nUpdatedBy FROM lstmadebstatus"))
            {
                IEnumerable<MadebStatus> statuses = GetRecords(command);
                return statuses;
            }
        }
        #endregion

        #region Populate 
        public override MadebStatus PopulateRecord(MySqlDataReader reader)
        {
            MadebStatus status = new MadebStatus();
            status.Id = (int)reader["Id"];
            status.sMadebStatus = (string)reader["sMadebStatus"];
            status.dtEntered = (DateTime)(reader["dtEntered"]);
            status.nEnteredBy = (int)reader["nEnteredBy"];
            status.dtUpdated = (DateTime)(reader["dtUpdated"]);
            status.nUpdatedBy = (int)reader["nUpdatedBy"];
            
            return status;
        }
        #endregion
    }
}
