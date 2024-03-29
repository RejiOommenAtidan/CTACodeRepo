﻿using CTADBL.BaseClasses.Masters;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace CTADBL.BaseClassRepositories.Masters
{
    public class MadebTypeRepository : ADORepository<MadebType>
    {
        #region Constructor
        public MadebTypeRepository(string connectionString) : base(connectionString)
        {

        }
        #endregion

        #region MadebType Add Call
        public int Add(MadebType madebType)
        {
            var builder = new SqlQueryBuilder<MadebType>(madebType);
            return ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region MadebType Update Call
        #region Update MadebType
        public int Update(MadebType madebType)
        {
            var builder = new SqlQueryBuilder<MadebType>(madebType);
            return ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Update MadebType with Transaction
        public int UpdateWithMySqlTransaction(MadebType madebType, MySqlCommand command)
        {
            var builder = new SqlQueryBuilder<MadebType>(madebType);
            builder.GetUpdateCommandTransaction(command); // Will this work? We are not catching back the command. But since it is passed with reference, should work.
            int rowsUpdated = ExecuteCommandTransaction(command);
            return rowsUpdated;
        }
        #endregion
        #endregion


        #region MadebType Delete Call
        public int Delete(MadebType madebType)
        {
            var builder = new SqlQueryBuilder<MadebType>(madebType);
            return ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get MadebType(s) Call 
        public IEnumerable<MadebType> GetAllMadebTypes()
        {
            // DBAs across the country are having strokes over this next command!
            using (var command = new MySqlCommand("SELECT Id, sMadebType, sMadebDisplayName, sMadebDisplayKey, nMadebFeatureId, nMadebLastFormNumber, dtEntered, nEnteredBy, dtUpdated, nUpdatedBy FROM lstmadebtype"))
            {
                return GetRecords(command);
            }
        }
        public MadebType GetMadebTypeById(string id)
        {
            using (var command = new MySqlCommand("SELECT Id, sMadebType, sMadebDisplayName, sMadebDisplayKey, nMadebFeatureId, nMadebLastFormNumber, dtEntered, nEnteredBy, dtUpdated, nUpdatedBy FROM lstmadebtype WHERE ID = @id"))
            {
                command.Parameters.AddWithValue("id", id);
                return GetRecord(command);
            }
        }
        #endregion

        #region Populate MadebType Records
        public override MadebType PopulateRecord(MySqlDataReader reader)
        {
            return new MadebType
            {
                Id = (int)reader["Id"],
                sMadebType = (string)reader["sMadebType"],
                nMadebFeatureId = (int)reader["nMadebFeatureId"],
                sMadebDisplayName = (string)reader["sMadebDisplayName"],
                sMadebDisplayKey = (string)reader["sMadebDisplayKey"],
                nMadebLastFormNumber =(int)reader["nMadebLastFormNumber"],
                dtEntered = (DateTime)reader["dtEntered"],
                nEnteredBy = (int)reader["nEnteredBy"],
                dtUpdated = (DateTime)reader["dtUpdated"],
                nUpdatedBy = (int)reader["nUpdatedBy"]
            };
        }
        #endregion
    }
}
