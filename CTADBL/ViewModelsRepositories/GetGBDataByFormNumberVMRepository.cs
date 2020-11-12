using CTADBL.BaseClasses.Masters;
using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Transactions;
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
        private readonly GivenGBIDRepository _givenGBIDRepository;
        private readonly MadebRepository _madebRepository;
        public GetGBDataByFormNumberVMRepository(string connectionString)
        {
            _connection = new MySqlConnection(connectionString);
            _givenGBIDRepository = new GivenGBIDRepository(connectionString);
            _madebRepository = new MadebRepository(connectionString);
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
            GivenGBIDMadebVM _oGivenGBIDMadebVM = new GivenGBIDMadebVM();
            _oGivenGBIDMadebVM.oGivenGBID = new GivenGBID();
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
                                sAuthRegion = (string)reader["sAuthRegion"],
                                sCountryID = (string)reader["sCountryID"]
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
                                sCountry = (string)reader["sCountry"],
                                sCountryID = (string)reader["sCountryID"]
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
                                sQualification = (string)reader["sQualification"],
                                sQualificationID = (string)reader["sQualificationID"]
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
                                sDOBApproxName = (string)reader["sDOBApproxName"],
                                sDOBApproxID = (string)reader["sDOBApproxID"]
                            });
                        }

                        // Next Result Set
                        reader.NextResult();
                        #endregion

                        #region Madeb Object
                        //Madeb Single Record Population
                        while (reader.Read())
                        {
                            _oGivenGBIDMadebVM.oGivenGBID.nGBId = (int)reader["nGBId"];
                            _oGivenGBIDMadebVM.oMadeb = _madebRepository.PopulateRecord(reader);
                            //_oGivenGBIDMadebVM.oMadeb.Id = (int)reader["tblMadeb.Id"];
                            //_oGivenGBIDMadebVM.oMadeb._id = reader.IsDBNull("tblMadeb._Id") ? null : (int?)(reader["tblMadeb._Id"]);
                            //_oGivenGBIDMadebVM.oMadeb.nFormNumber = (int)reader["tblMadeb.nFormNumber"];
                            //_oGivenGBIDMadebVM.oMadeb.sGBID = reader.IsDBNull("tblMadeb.sGBID") ? null : (string)(reader["tblMadeb.sGBID"]);
                            //_oGivenGBIDMadebVM.oMadeb.nMadebTypeID = reader.IsDBNull("tblMadeb.nMadebTypeID") ? null : (int?)(reader["tblMadeb.nMadebTypeID"]);
                            //_oGivenGBIDMadebVM.oMadeb.sName = (string)reader["tblMadeb.sName"];
                            //_oGivenGBIDMadebVM.oMadeb.sFathersName = reader.IsDBNull("tblMadeb.sFathersName") ? null : (string)(reader["tblMadeb.sFathersName"]);
                            //_oGivenGBIDMadebVM.oMadeb.nAuthRegionID = (int)reader["tblMadeb.nAuthRegionID"];
                            //_oGivenGBIDMadebVM.oMadeb.dtReceived = (DateTime)reader["tblMadeb.dtReceived"];
                            //_oGivenGBIDMadebVM.oMadeb.dtIssueAction = (DateTime)reader["tblMadeb.dtIssueAction"];
                            //_oGivenGBIDMadebVM.oMadeb.nIssuedOrNotID = (int)reader["tblMadeb.nIssuedOrNotID"];
                            //_oGivenGBIDMadebVM.oMadeb.nType = (int)reader["tblMadeb.nType"];
                            //_oGivenGBIDMadebVM.oMadeb.sChangeField = reader.IsDBNull("tblMadeb.sChangeField") ? null : (string)(reader["tblMadeb.sChangeField"]);
                            //_oGivenGBIDMadebVM.oMadeb.sOfficeOfTibetan = reader.IsDBNull("tblMadeb.sOfficeOfTibetan") ? null : (string)(reader["tblMadeb.sOfficeOfTibetan"]);
                            //_oGivenGBIDMadebVM.oMadeb.sDocumentAttached = reader.IsDBNull("tblMadeb.sDocumentAttached") ? null : (string)(reader["tblMadeb.sDocumentAttached"]);
                            //_oGivenGBIDMadebVM.oMadeb.nCurrentGBSno = reader.IsDBNull("tblMadeb.nCurrentGBSno") ? null : (int?)(reader["tblMadeb.nCurrentGBSno"]);
                            //_oGivenGBIDMadebVM.oMadeb.nPreviousGBSno = reader.IsDBNull("tblMadeb.nPreviousGBSno") ? null : (int?)(reader["tblMadeb.nPreviousGBSno"]);
                            //_oGivenGBIDMadebVM.oMadeb.nSaneyFormNo = reader.IsDBNull("tblMadeb.nSaneyFormNo") ? null : (int?)(reader["tblMadeb.nSaneyFormNo"]);
                            //_oGivenGBIDMadebVM.oMadeb.nReceiptNo = reader.IsDBNull("tblMadeb.nCurrentGBSno") ? null : (int?)(reader["tblMadeb.nCurrentGBSno"]);
                            //_oGivenGBIDMadebVM.oMadeb.dtEmailSend = reader.IsDBNull("tblMadeb.dtEmailSend") ? null : (DateTime?)(reader["tblMadeb.dtEmailSend"]);
                            //_oGivenGBIDMadebVM.oMadeb.sAlias = reader.IsDBNull("tblMadeb.sAlias") ? null : (string)(reader["tblMadeb.sAlias"]);
                            //_oGivenGBIDMadebVM.oMadeb.sApprovedReject = reader.IsDBNull("tblMadeb.sApprovedReject") ? null : (string)(reader["tblMadeb.sApprovedReject"]);
                            //_oGivenGBIDMadebVM.oMadeb.dtReject = reader.IsDBNull("tblMadeb.dtReject") ? null : (DateTime?)(reader["tblMadeb.dtReject"]);
                            //_oGivenGBIDMadebVM.oMadeb.dtReturnEmail = reader.IsDBNull("tblMadeb.dtReturnEmail") ? null : (DateTime?)(reader["tblMadeb.dtReturnEmail"]);
                            ////Common Prop
                            //_oGivenGBIDMadebVM.oMadeb.dtEntered = reader.IsDBNull("tblMadeb.dtEntered") ? null : (DateTime?)(reader["tblMadeb.dtEntered"]);
                            //_oGivenGBIDMadebVM.oMadeb.nEnteredBy = (int)reader["tblMadeb.nEnteredBy"];
                            //_oGivenGBIDMadebVM.oMadeb.dtUpdated = reader.IsDBNull("tblMadeb.dtUpdated") ? null : (DateTime?)(reader["tblMadeb.dtUpdated"]);
                            //_oGivenGBIDMadebVM.oMadeb.nUpdatedBy = (int)reader["tblMadeb.nUpdatedBy"];
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
                            oGivenGBIDMadebVM = _oGivenGBIDMadebVM
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
