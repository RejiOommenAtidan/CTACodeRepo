using CTADBL.BaseClasses.Masters;
using CTADBL.BaseClasses.Transactions;
using CTADBL.ViewModels;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
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
            List<AuthRegion> _lAuthRegion = new List<AuthRegion>();
            List<Country> _lCountry = new List<Country>();
            List<Province> _lProvince = new List<Province>();
            List<Qualification> _lQualification = new List<Qualification>();
            List<Occupation> _lOccupation = new List<Occupation>();
            List<DOBApprox> _lDOBApprox = new List<DOBApprox>();
            Madeb _oMadeb = new Madeb();
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
                        #region AuthRegion
                        //AuthRegions Population
                        while (reader.Read())
                        {
                            _lAuthRegion.Add(new AuthRegion()
                            {
                                ID = (int)reader["ID"],
                                sAuthRegion = (string)reader["sAuthRegion"]
                            });
                        }

                        // Next Result Set
                        reader.NextResult();
                        #endregion

                        #region Country
                        //Country Population
                        while (reader.Read())
                        {
                            _lCountry.Add(new Country()
                            {
                                ID = (int)reader["ID"],
                                sCountry = (string)reader["sCountry"]
                            });
                        }

                        // Next Result Set
                        reader.NextResult();
                        #endregion

                        #region Province
                        //Province Population
                        while (reader.Read())
                        {
                            _lProvince.Add(new Province()
                            {
                                Id = (int)reader["Id"],
                                sProvince = (string)reader["sProvince"]
                            });
                        }

                        // Next Result Set
                        reader.NextResult();
                        #endregion

                        #region Qualification
                        //Qualification Population
                        while (reader.Read())
                        {
                            _lQualification.Add(new Qualification()
                            {
                                Id = (int)reader["Id"],
                                sQualification = (string)reader["sQualification"]
                            });
                        }

                        // Next Result Set
                        reader.NextResult();
                        #endregion

                        #region Occupation
                        //Occupation Population
                        while (reader.Read())
                        {
                            _lOccupation.Add(new Occupation()
                            {
                                Id = (int)reader["Id"],
                                sOccupationDesc = (string)reader["sOccupationDesc"]
                            });
                        }

                        // Next Result Set
                        reader.NextResult();
                        #endregion

                        #region DOB Approx
                        //DOBApprox Population
                        while (reader.Read())
                        {
                            _lDOBApprox.Add(new DOBApprox()
                            {
                                Id = (int)reader["Id"],
                                sDOBApproxName = (string)reader["sDOBApproxName"]
                            });
                        }

                        // Next Result Set
                        reader.NextResult();
                        #endregion

                        #region Madeb Object
                        //Madeb Single Record Population
                        while (reader.Read())
                        {
                            _oMadeb.Id = (int)reader["Id"];
                            //TODO:
                            _oMadeb._id = reader.IsDBNull("_Id") ? null : (int?)(reader["_Id"]);
                            _oMadeb.nFormNumber = (int)reader["nFormNumber"];
                            _oMadeb.sGBID = reader.IsDBNull("sGBID") ? null : (string?)(reader["sGBID"]);
                            _oMadeb.nMadebTypeID = reader.IsDBNull("nMadebTypeID") ? null : (int?)(reader["nMadebTypeID"]);
                            _oMadeb.sName = (string)reader["sName"];
                            _oMadeb.sFathersName = reader.IsDBNull("sFathersName") ? null : (string?)(reader["sFathersName"]);
                            _oMadeb.nAuthRegionID = (int)reader["nAuthRegionID"];
                            _oMadeb.dtReceived = (DateTime)reader["dtReceived"];
                            _oMadeb.dtIssueAction = (DateTime)reader["dtIssueAction"];
                            _oMadeb.nIssuedOrNotID = (int)reader["nIssuedOrNotID"];
                            _oMadeb.nType = (int)reader["nType"];
                            _oMadeb.sChangeField = reader.IsDBNull("sChangeField") ? null : (string?)(reader["sChangeField"]);
                            _oMadeb.sOfficeOfTibetan = reader.IsDBNull("sOfficeOfTibetan") ? null : (string?)(reader["sOfficeOfTibetan"]);
                            _oMadeb.sDocumentAttached = reader.IsDBNull("sDocumentAttached") ? null : (string?)(reader["sDocumentAttached"]);
                            _oMadeb.nCurrentGBSno = reader.IsDBNull("nCurrentGBSno") ? null : (int?)(reader["nCurrentGBSno"]);
                            _oMadeb.nPreviousGBSno = reader.IsDBNull("nPreviousGBSno") ? null : (int?)(reader["nPreviousGBSno"]);
                            _oMadeb.nSaneyFormNo = reader.IsDBNull("nSaneyFormNo") ? null : (int?)(reader["nSaneyFormNo"]);
                            _oMadeb.nReceiptNo = reader.IsDBNull("nCurrentGBSno") ? null : (int?)(reader["nCurrentGBSno"]);
                            _oMadeb.dtEmailSend = reader.IsDBNull("dtEmailSend") ? null : (DateTime?)(reader["dtEmailSend"]);
                            _oMadeb.sAlias = reader.IsDBNull("sAlias") ? null : (string?)(reader["sAlias"]);
                            _oMadeb.sApprovedReject = reader.IsDBNull("sApprovedReject") ? null : (string?)(reader["sApprovedReject"]);
                            _oMadeb.dtReject = reader.IsDBNull("dtReject") ? null : (DateTime?)(reader["dtReject"]);
                            _oMadeb.dtReturnEmail = (DateTime)reader["dtReturnEmail"];
                            //Common Prop
                            _oMadeb.dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"]);
                            _oMadeb.nEnteredBy = (int)reader["nEnteredBy"];
                            _oMadeb.dtUpdated = reader.IsDBNull("dtUpdated") ? null : (DateTime?)(reader["dtUpdated"]);
                            _oMadeb.nUpdatedBy = (int)reader["nUpdatedBy"];
                        }
                        #endregion

                        return new GetGBDataByFormNumberVM
                        {
                            lAuthRegion = _lAuthRegion,
                            lCountry = _lCountry,
                            lProvince = _lProvince,
                            lQualification = _lQualification,
                            lOccupation = _lOccupation,
                            lDOBApprox = _lDOBApprox,
                            oMadeb = _oMadeb
                        };
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
            }
        }
        #endregion
    }
}
