using CTADBL.BaseClasses.Transactions;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace CTADBL.BaseClassRepositories.Transactions
{
    public class GBChartelRepository : ADORepository<GBChartel>
    {
        #region Constructor
        public GBChartelRepository(string connectionString) : base(connectionString)
        {
        }
        #endregion

        #region Add Call
        public void Add(GBChartel gbChartel)
        {
            var builder = new SqlQueryBuilder<GBChartel>(gbChartel);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Update Call
        public void Update(GBChartel gbChartel)
        {
            var builder = new SqlQueryBuilder<GBChartel>(gbChartel);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Delete Call
        public void Delete(GBChartel gbChartel)
        {
            var builder = new SqlQueryBuilder<GBChartel>(gbChartel);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get GB Chartel
        public IEnumerable<GBChartel> GetAllGBChartel()
        {
            string sql = @"SELECT `Id`,
                            `sGBId`,
                            `nChartelAmount`,
                            `nChartelMeal`,
                            `nChartelYear`,
                            `nChartelLateFeesPercentage`,
                            `nArrearsAmount`,
                            `dtArrearsFrom`,
                            `dtArrearsTo`,
                            `nChartelSalaryAmt`,
                            `dtChartelSalaryFrom`,
                            `dtChartelSalaryTo`,
                            `nChartelBusinessDonationAmt`,
                            `nChartelTotalAmount`,
                            `nChartelRecieptNumber`,
                            `nAuthRegionID`,
                            `sCountryID`,
                            `dtEntered`,
                            `nEnteredBy`
                        FROM `lnkgbchartel`;";
            using (var command = new MySqlCommand(sql))
            {
                return GetRecords(command);
            }
        }

        public GBChartel GetGBChartelById(string Id)
        {
            string sql = @"SELECT `Id`,
                            `sGBId`,
                            `nChartelAmount`,
                            `nChartelMeal`,
                            `nChartelYear`,
                            `nChartelLateFeesPercentage`,
                            `nArrearsAmount`,
                            `dtArrearsFrom`,
                            `dtArrearsTo`,
                            `nChartelSalaryAmt`,
                            `dtChartelSalaryFrom`,
                            `dtChartelSalaryTo`,
                            `nChartelBusinessDonationAmt`,
                            `nChartelTotalAmount`,
                            `nChartelRecieptNumber`,
                            `nAuthRegionID`,
                            `sCountryID`,
                            `dtEntered`,
                            `nEnteredBy`
                        FROM `lnkgbchartel`
                        WHERE Id = @Id;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("Id", Id);
                return GetRecord(command);
            }
        }
        #endregion

        #region Populate GBChartel Records
        public override GBChartel PopulateRecord(MySqlDataReader reader)
        {
            GBChartel gbChartel = new GBChartel();
            gbChartel.Id = (int)reader["Id"];
            gbChartel.sGBId = reader.IsDBNull("sGBId") ? null : (string)reader["sGBId"];
            gbChartel.nChartelAmount = (int)reader["nChartelAmount"];
            gbChartel.nChartelMeal = reader.IsDBNull("nChartelMeal") ? null : (int?)reader["nChartelMeal"];
            gbChartel.nChartelYear = reader.IsDBNull("nChartelYear") ? null : (int?)reader["nChartelYear"];
            gbChartel.nChartelLateFeesPercentage = reader.IsDBNull("nChartelLateFeesPercentage") ? null : (int?)reader["nChartelLateFeesPercentage"];
            gbChartel.nArrearsAmount = reader.IsDBNull("nArrearsAmount") ? null : (int?)reader["nArrearsAmount"];
            gbChartel.dtArrearsFrom = reader.IsDBNull("dtArrearsFrom") ? null : (DateTime?)(reader["dtArrearsFrom"]);
            gbChartel.dtArrearsTo = reader.IsDBNull("dtArrearsTo") ? null : (DateTime?)(reader["dtArrearsTo"]);
            gbChartel.nChartelSalaryAmt = reader.IsDBNull("nChartelSalaryAmt") ? null : (int?)reader["nChartelSalaryAmt"];
            gbChartel.dtChartelSalaryFrom = reader.IsDBNull("dtChartelSalaryFrom") ? null : (DateTime?)(reader["dtChartelSalaryFrom"]);
            gbChartel.dtChartelSalaryTo = reader.IsDBNull("dtChartelSalaryTo") ? null : (DateTime?)(reader["dtChartelSalaryTo"]);
            gbChartel.nChartelBusinessDonationAmt = reader.IsDBNull("nChartelBusinessDonationAmt") ? null : (int?)reader["nChartelBusinessDonationAmt"];
            gbChartel.nChartelTotalAmount = reader.IsDBNull("nChartelTotalAmount") ? null : (int?)reader["nChartelTotalAmount"];
            gbChartel.nChartelRecieptNumber = reader.IsDBNull("nChartelRecieptNumber") ? null : (int?)reader["nChartelRecieptNumber"];
            gbChartel.nAuthRegionID = reader.IsDBNull("nAuthRegionID") ? null : (int?)reader["nAuthRegionID"];
            gbChartel.sCountryID = reader.IsDBNull("sCountryID") ? null : (string)reader["sCountryID"];
            gbChartel.dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"]);
            gbChartel.nEnteredBy = (int)reader["nEnteredBy"];
            return gbChartel;
        }
        #endregion
    }
}
