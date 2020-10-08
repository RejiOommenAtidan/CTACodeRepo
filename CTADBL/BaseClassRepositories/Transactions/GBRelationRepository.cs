using CTADBL.BaseClasses.Transactions;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;


namespace CTADBL.BaseClassRepositories.Transactions
{
    public class GBRelationRepository : ADORepository<GBRelation>
    {
        private static MySqlConnection _connection;
        #region Constructor
        public GBRelationRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
        }
        #endregion

        #region Populate Records
        public override GBRelation PopulateRecord(MySqlDataReader reader)
        {
            GBRelation gbRelation = new GBRelation
            {
                Id = (int)reader["Id"],
                sGBID = reader.IsDBNull("sGBID") ? null : (string)reader["sGBID"],
                sGBIDRelation = reader.IsDBNull("sGBIDRelation") ? null : (string)reader["sGBIDRelation"],
                nRelationID = (int)reader["nRelationID"]
            };
            return gbRelation;
        }
        #endregion

    }
}
