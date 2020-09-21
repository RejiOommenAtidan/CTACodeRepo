using CTADBL.BaseClasses.Transactions;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace CTADBL.BaseClassRepositories.Transactions
{
    public class GreenbookRepository : ADORepository<Greenbook>
    {
        #region Constructor
        public GreenbookRepository(string connectionString) : base(connectionString)
        {
        }
        #endregion

        #region Add Green Book
        public void Add(Greenbook greenbook)
        {
            var builder = new SqlQueryBuilder<Greenbook>(greenbook);
            int a =ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Update Green Book
        public void Update(Greenbook greenbook)
        {
            var builder = new SqlQueryBuilder<Greenbook>(greenbook);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Delete Green Book
        public void Delete(Greenbook greenbook)
        {
            var builder = new SqlQueryBuilder<Greenbook>(greenbook);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get Green Book/Books
        public IEnumerable<Greenbook> GetAllGreenBooks()
        {
            string sql = @"SELECT `Id`,
                            `sGBID`,
                            `nAuthRegionID`,
                            `sFirstName`,
                            `sSecondName`,
                            `sFamilyName`,
                            `sGender`,
                            `dtDOB`,
                            `sDOBApprox`,
                            `sBirthPlace`,
                            `sBirthCountryID`,
                            `sOriginVillage`,
                            `sOriginProvinceID`,
                            `sMarried`,
                            `sOtherDocuments`,
                            `sResidenceNumber`,
                            `sQualificationID`,
                            `sOccupationID`,
                            `sAliasName`,
                            `sOldGreenBKNo`,
                            `sFstGreenBkNo`,
                            `dtFormDate`,
                            `sFathersName`,
                            `sFathersID`,
                            `sFathersGBID`,
                            `sMothersName`,
                            `sMothersID`,
                            `sMothersGBID`,
                            `sSpouseName`,
                            `sSpouseID`,
                            `sSpouseGBID`,
                            `nChildrenM`,
                            `nChildrenF`,
                            `sAddress1`,
                            `sAddress2`,
                            `sCity`,
                            `sState`,
                            `sPCode`,
                            `sCountryID`,
                            `sEmail`,
                            `sPhone`,
                            `sFax`,
                            `dtDeceased`,
                            `sBookIssued`,
                            `dtValidityDate`,
                            `sPaidUntil`,
                            `sEnteredDateTime`,
                            `nEnteredBy`,
                            `nUpdatedBy`,
                            `dtEntered`,
                            `dtUpdated`,
                            `TibetanName`,
                            `TBUPlaceOfBirth`,
                            `TBUOriginVillage`,
                            `TBUFathersName`,
                            `TBUMothersName`,
                            `TBUSpouseName`
                        FROM `tblgreenbook`;";
            using (var command = new MySqlCommand(sql))
            {
                return GetRecords(command);
            }
        }

        public Greenbook GetGreenboookById(string Id)
        {
            string sql = @"SELECT `Id`,
                            `sGBID`,
                            `nAuthRegionID`,
                            `sFirstName`,
                            `sSecondName`,
                            `sFamilyName`,
                            `sGender`,
                            `dtDOB`,
                            `sDOBApprox`,
                            `sBirthPlace`,
                            `sBirthCountryID`,
                            `sOriginVillage`,
                            `sOriginProvinceID`,
                            `sMarried`,
                            `sOtherDocuments`,
                            `sResidenceNumber`,
                            `sQualificationID`,
                            `sOccupationID`,
                            `sAliasName`,
                            `sOldGreenBKNo`,
                            `sFstGreenBkNo`,
                            `dtFormDate`,
                            `sFathersName`,
                            `sFathersID`,
                            `sFathersGBID`,
                            `sMothersName`,
                            `sMothersID`,
                            `sMothersGBID`,
                            `sSpouseName`,
                            `sSpouseID`,
                            `sSpouseGBID`,
                            `nChildrenM`,
                            `nChildrenF`,
                            `sAddress1`,
                            `sAddress2`,
                            `sCity`,
                            `sState`,
                            `sPCode`,
                            `sCountryID`,
                            `sEmail`,
                            `sPhone`,
                            `sFax`,
                            `dtDeceased`,
                            `sBookIssued`,
                            `dtValidityDate`,
                            `sPaidUntil`,
                            `sEnteredDateTime`,
                            `nEnteredBy`,
                            `nUpdatedBy`,
                            `dtEntered`,
                            `dtUpdated`,
                            `TibetanName`,
                            `TBUPlaceOfBirth`,
                            `TBUOriginVillage`,
                            `TBUFathersName`,
                            `TBUMothersName`,
                            `TBUSpouseName`
                        FROM `tblgreenbook`
                        WHERE Id=@Id;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("Id", Id);
                return GetRecord(command);
            }
        }
        #endregion

        #region Populate Greenbook Records
        public override Greenbook PopulateRecord(MySqlDataReader reader)
        {
            int colIndex1 = reader.GetOrdinal("dtEntered");
            int colIndex2 = reader.GetOrdinal("dtUpdated");

            DateTime? dtEntered = null;
            DateTime? dtUpdated = null;
            if (!reader.IsDBNull(colIndex1))
            {
                dtEntered = (DateTime)reader["dtEntered"];
            }
            if (!reader.IsDBNull(colIndex2))
            {
                dtUpdated = (DateTime)reader["dtUpdated"];
            }
            return new Greenbook
            {
                Id = (int)reader["Id"],
                //TODO:
                //_id= (int)reader["_Id"],
                sGBID = (string)reader["sGBID"],
                nAuthRegionID = (int)reader["nAuthRegionID"],
                sFirstName = (string)reader["sFirstName"],
                sSecondName = (string)reader["sSecondName"],
                sFamilyName = (string)reader["sFamilyName"],
                sGender = (string)reader["sFamilyName"],
                dtDOB = (DateTime)reader["dtDOB"],
                sDOBApprox = (string)reader["sDOBApprox"],
                sBirthPlace = (string)reader["sBirthPlace"],
                sBirthCountryID = (string)reader["sBirthCountryID"],
                sOriginVillage = (string)reader["sOriginVillage"],
                sOriginProvinceID = (string)reader["sOriginProvinceID"],
                sMarried = (string)reader["sMarried"],
                sOtherDocuments = (string)reader["sOtherDocuments"],
                sResidenceNumber = (string)reader["sResidenceNumber"],
                sQualificationID = (string)reader["sQualificationID"],
                sOccupationID = (string)reader["sOccupationID"],
                sAliasName = (string)reader["sAliasName"],
                sOldGreenBKNo = (string)reader["sOldGreenBKNo"],
                sFstGreenBkNo = (string)reader["sFstGreenBkNo"],
                dtFormDate = (DateTime)reader["dtFormDate"],
                sFathersName = (string)reader["sFathersName"],
                sFathersID = (string)reader["sFathersID"],
                sFathersGBID = (string)reader["sFathersGBID"],
                sMothersName = (string)reader["sMothersName"],
                sMothersID = (string)reader["sMothersID"],
                sMothersGBID = (string)reader["sMothersGBID"],
                sSpouseName = (string)reader["sSpouseName"],
                sSpouseID = (string)reader["sSpouseID"],
                sSpouseGBID = (string)reader["sSpouseGBID"],
                nChildrenM = (int)reader["nChildrenM"],
                nChildrenF = (int)reader["nChildrenF"],
                sAddress1 = (string)reader["sAddress1"],
                sAddress2 = (string)reader["sAddress2"],
                sCity = (string)reader["sAddress2"],
                sState = (string)reader["sState"],
                sPCode = (string)reader["sPCode"],
                sCountryID = (string)reader["sCountryID"],
                sEmail = (string)reader["sEmail"],
                sPhone = (string)reader["sPhone"],
                sFax = (string)reader["sFax"],
                dtDeceased = (DateTime)reader["dtDeceased"],
                sBookIssued = (string)reader["sBookIssued"],
                dtValidityDate = (DateTime)reader["dtValidityDate"],
                sEnteredDateTime = (string)reader["sEnteredDateTime"],
                sPaidUntil = (string)reader["sPaidUntil"],
                TibetanName = (string)reader["TibetanName"],
                TBUPlaceOfBirth = (string)reader["TBUPlaceOfBirth"],
                TBUOriginVillage = (string)reader["TBUOriginVillage"],
                TBUFathersName = (string)reader["TBUFathersName"],
                TBUMothersName = (string)reader["TBUMothersName"],
                TBUSpouseName = (string)reader["TBUSpouseName"],
                //Common Props
                dtEntered = dtEntered,
                nEnteredBy = (int)reader["nEnteredBy"],
                dtUpdated = dtUpdated,
                nUpdatedBy = (int)reader["nUpdatedBy"]
            };
        }
        #endregion
    }
}
