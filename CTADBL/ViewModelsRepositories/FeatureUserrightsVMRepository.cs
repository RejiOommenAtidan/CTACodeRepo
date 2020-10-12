using CTADBL.BaseClasses.Masters;
using CTADBL.ViewModels;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace CTADBL.ViewModelsRepositories
{
    public class FeatureUserrightsVMRepository
    {
        #region Constructor
        private static MySqlConnection _connection;
        public FeatureUserrightsVMRepository(string connectionString)
        {
            _connection = new MySqlConnection(connectionString);
        }
        #endregion

        #region Get
        public FeatureUserrightsVM GetFeatureUserrights()
        {
            string sql = @"spGetFeatureUserRights";
            using (var command = new MySqlCommand(sql))
            {
                command.Connection = _connection;
                command.CommandType = CommandType.StoredProcedure;
                _connection.Open();
                FeatureUserrightsVM _oFeatureUserrightsVM = new FeatureUserrightsVM();
                List<FeatureUserrightsPivot> _lFeatureUserRightsPivot = new List<FeatureUserrightsPivot>();
                List<UserRights> _lUserrights = new List<UserRights>(); 
                List<Feature> _lFeature = new List<Feature>();
                try
                {

                    var reader = command.ExecuteReader();
                    try
                    {
                        #region Pivot
                        while (reader.Read())
                        {
                            List<int> userRightsList = new List<int>();
                            int i = 2; //bcz our rights starts from 2
                            while (i!=reader.FieldCount)
                            {
                                decimal singleUserright = (decimal)reader.GetValue(i);
                                userRightsList.Add(decimal.ToInt32(singleUserright));
                                i++;
                            }
                            _lFeatureUserRightsPivot.Add(new FeatureUserrightsPivot()
                            {
                                sFeature = (string)reader["sFeature"],
                                nFeatureID = (int?)reader["nFeatureID"],
                                aUserRights = userRightsList.ToArray()
                            });
                        }

                        // Next Result Set
                        reader.NextResult();
                        #endregion

                        #region User Rights 
                        while (reader.Read())
                        {
                            _lUserrights.Add(new UserRights()
                            {
                                Id = (int)reader["Id"],
                                sUserRightsName = (string)reader["sUserRightsName"],
                            });
                        }

                        // Next Result Set
                        reader.NextResult();
                        #endregion

                        #region Feature
                        while (reader.Read())
                        {
                            _lFeature.Add(new Feature()
                            {
                                Id = (int)reader["Id"],
                                sFeature = (string)reader["sFeature"],
                            });
                        }

                        // Next Result Set
                        reader.NextResult();
                        #endregion

                        #region Assign Properties before return
                        _oFeatureUserrightsVM.lFeatureUserRightsPivot = _lFeatureUserRightsPivot;
                        _oFeatureUserrightsVM.lFeatures = _lFeature;
                        _oFeatureUserrightsVM.lUserRights = _lUserrights; 
                        #endregion

                        return _oFeatureUserrightsVM;
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
