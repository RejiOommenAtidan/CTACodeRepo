using CTADBL.BaseClasses.Transactions;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using TimeZoneConverter;

namespace CTADBL.BaseClassRepositories.Transactions
{
    public class GBRelationRepository : ADORepository<GBRelation>
    {
        #region Constructor
        private static MySqlConnection _connection;
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

        #region Add Call
        public void Add(GBRelation gbRelation)
        {
            var builder = new SqlQueryBuilder<GBRelation>(gbRelation);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Update Call
        public void Update(GBRelation gBRelation)
        {
            var builder = new SqlQueryBuilder<GBRelation>(gBRelation);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Delete Call
        public void Delete(GBRelation gBRelation)
        {
            var builder = new SqlQueryBuilder<GBRelation>(gBRelation);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        public int HandleGreenBookUpdate(List<GBRelation> gbRelations)
        {
            try
            {
                foreach (var relation in gbRelations)
                {
                    GBRelation r;
                    if (String.IsNullOrEmpty(relation.sGBIDRelation) || String.IsNullOrWhiteSpace(relation.sGBIDRelation))
                    {
                        if (Exists(relation, out r))
                        {
                            Delete(r);
                        }
                        continue;
                    }

                    if (Exists(relation, out r))
                    {
                        r.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                        Update(r);
                    }
                    else
                    {
                        relation.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                        relation.dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                        relation.nEnteredBy = relation.nUpdatedBy;
                        Add(relation);
                    }
                }
                return 1;
            }
            catch (Exception)
            {
                return 0;
            }
        }



        private bool Exists(GBRelation gbRelation, out GBRelation relation)
        {
            GBRelation r = GetGBRelationByGBID(gbRelation.sGBID, gbRelation.nRelationID);
            relation = r;
            return r != null;
        }



        public GBRelation GetGBRelationByGBID(string sGBID, int nRelationID)
        {
            string sql = @"SELECT * FROM lnkgbrelation WHERE nRelationID = @nRelationID AND sGBID = @sGBID;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBID", sGBID);
                command.Parameters.AddWithValue("nRelationID", nRelationID);
                GBRelation relation = GetRecord(command);
                return relation;
            }
        }
    }
}
