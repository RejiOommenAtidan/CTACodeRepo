using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Transactions;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using CTADBL.ViewModels;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace CTADBL.ViewModelsRepositories
{
    public class GBRelationVMRepository : ADORepository<GBRelationVM>
    {
        private static MySqlConnection _connection;
        private readonly GBRelationRepository _gbRelationRepository;
        
        #region Constructor
        public GBRelationVMRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
            _gbRelationRepository = new GBRelationRepository(connectionString);
        }
        #endregion

        #region Get Call
        public GBRelationVM GetRelationsData(string sGBID)
        {
            //string sql = String.Format(@"SELECT gbrl.Id, gbrl.sGBID, gbrl.sGBIDRelation , gbrl.nRelationID, lstrl.sRelation FROM lnkgbrelation AS gbrl INNER JOIN tblgreenbook AS gb ON gb.sGBID = gbrl.sGBID LEFT JOIN lstrelation AS lstrl ON gbrl.nRelationID = lstrl.Id WHERE  gb.sGBID = @sGBID;");

            string sql = String.Format(@"SELECT 
                                            gb.sFathersName,
                                            gb.sFathersID,
                                            frel.sgbidrelation AS sFathersGBID,
                                            gb.sMothersName,
                                            gb.sMothersID,
                                            mrel.sgbidrelation AS sMothersGBID,
                                            gb.sSpouseName,
                                            gb.sSpouseID,
                                            srel.sgbidrelation AS sSpouseGBID,
                                            fdoc.binFileDoc AS sFathersPhoto,
                                            mdoc.binFileDoc AS sMothersPhoto,
                                            sdoc.binFileDoc AS sSpousePhoto
                                        FROM
                                            tblgreenbook AS gb
                                                LEFT JOIN
                                            lnkgbrelation AS frel ON gb.sGBID = frel.sGBID
                                                AND frel.nrelationid = 1
                                                LEFT JOIN
                                            lnkgbrelation AS mrel ON gb.sGBID = mrel.sGBID
                                                AND mrel.nrelationid = 2
                                                LEFT JOIN
                                            lnkgbrelation AS srel ON gb.sGBID = srel.sGBID
                                                AND srel.nrelationid = 3
                                                LEFT JOIN
                                            lnkgbdocument AS fdoc ON frel.sGBIDRelation = fdoc.sGBId
                                            LEFT JOIN
                                            lnkgbdocument AS mdoc ON mrel.sGBIDRelation = mdoc.sGBId
                                            LEFT JOIN
                                            lnkgbdocument AS sdoc ON srel.sGBIDRelation = sdoc.sGBId
                                        WHERE gb.sGBId = @sGBID;");

            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBID", sGBID);
                return GetRecord(command);
            }
        }
        #endregion



        #region Populate Records
        public override GBRelationVM PopulateRecord(MySqlDataReader reader)
        {
            string? sFathersPhoto = null;
            string? sMothersPhoto = null;
            string? sSpousePhoto = null;

            if (!reader.IsDBNull("sFathersPhoto"))
            {
                byte[] img = (byte[])reader["sFathersPhoto"];
                sFathersPhoto = Convert.ToBase64String(img);
            }
            if (!reader.IsDBNull("sMothersPhoto"))
            {
                byte[] img = (byte[])reader["sMothersPhoto"];
                sMothersPhoto = Convert.ToBase64String(img);
            }
            if (!reader.IsDBNull("sSpousePhoto"))
            {
                byte[] img = (byte[])reader["sSpousePhoto"];
                sSpousePhoto = Convert.ToBase64String(img);
            }

            GBRelationVM relation = new GBRelationVM
            {
                //gbRelation = _gbRelationRepository.PopulateRecord(reader),
                // sRelation = reader.IsDBNull("sRelation") ? null : (string)reader["sRelation"],
                sFathersName = reader.IsDBNull("sFathersName") ? null : (string)reader["sFathersName"],
                sFathersID = reader.IsDBNull("sFathersID") ? null : (string)reader["sFathersID"],
                sFathersGBID = reader.IsDBNull("sFathersGBID") ? null : (string)reader["sFathersGBID"],
                sFathersPhoto = sFathersPhoto,
                sMothersName = reader.IsDBNull("sMothersName") ? null : (string)reader["sMothersName"],
                sMothersID = reader.IsDBNull("sMothersID") ? null : (string)reader["sMothersID"],
                sMothersGBID = reader.IsDBNull("sMothersGBID") ? null : (string)reader["sMothersGBID"],
                sMothersPhoto = sMothersPhoto,
                sSpouseName = reader.IsDBNull("sSpouseName") ? null : (string)reader["sSpouseName"],
                sSpouseID = reader.IsDBNull("sSpouseID") ? null : (string)reader["sSpouseID"],
                sSpouseGBID = reader.IsDBNull("sSpouseGBID") ? null : (string)reader["sSpouseGBID"],
                sSpousePhoto = sSpousePhoto
            };
            return relation;

            
        }
        #endregion

    }
}
