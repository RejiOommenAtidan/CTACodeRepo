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
            List<MaritalStatus> _lMaritalStatuses = new List<MaritalStatus>();
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

                        #region Marital Status
                        while (reader.Read())
                        {
                            _lMaritalStatuses.Add(new MaritalStatus()
                            {
                                Id = (int)reader["Id"],
                                sMaritalStatusId = (string)reader["sMaritalStatusId"],
                                sMaritalStatusText = (string)reader["sMaritalStatusText"]
                            });
                        }
                        #endregion

                        // Next Result Set
                        reader.NextResult();

                        #region Madeb Object
                        //Madeb Single Record Population
                        while (reader.Read())
                        {
                            _oGivenGBIDMadebVM.oGivenGBID.nGBId = (int)reader["nGBId"];
                            _oGivenGBIDMadebVM.oMadeb = _madebRepository.PopulateRecord(reader);
                            
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
                            oGivenGBIDMadebVM = _oGivenGBIDMadebVM,
                            lMaritalStatuses = _lMaritalStatuses
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
