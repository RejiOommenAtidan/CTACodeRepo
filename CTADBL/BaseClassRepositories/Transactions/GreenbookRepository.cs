using CTADBL.BaseClasses.Transactions;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

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
            int a = ExecuteCommand(builder.GetInsertCommand());
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
                            `sMiddleName`,
                            `sLastName`,
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
            Greenbook g = new Greenbook();
            g.Id = (int)reader["Id"];
            //TODO:
            //_id= (int)reader["_Id"];
            g.sGBID = (string)reader["sGBID"];
            g.nAuthRegionID = (int)reader["nAuthRegionID"];
            g.sFirstName = (string)reader["sFirstName"];
            g.sMiddleName = reader.IsDBNull("sMiddleName") ? null : (string)reader["sMiddleName"];
            g.sLastName = reader.IsDBNull("sLastName") ? null : (string)reader["sLastName"];
            g.sFamilyName = reader.IsDBNull("sFamilyName") ? null : (string)reader["sFamilyName"];
            g.sGender = (string)reader["sFamilyName"];
            g.dtDOB = (DateTime)reader["dtDOB"];
            g.sDOBApprox = (string)reader["sDOBApprox"];
            g.sBirthPlace = (string)reader["sBirthPlace"];
            g.sBirthCountryID = (string)reader["sBirthCountryID"];
            g.sOriginVillage = (string)reader["sOriginVillage"];
            g.sOriginProvinceID = (string)reader["sOriginProvinceID"];
            g.sMarried = (string)reader["sMarried"];
            g.sOtherDocuments = (string)reader["sOtherDocuments"];
            g.sResidenceNumber = (string)reader["sResidenceNumber"];
            g.sQualificationID = (string)reader["sQualificationID"];
            g.sOccupationID = (string)reader["sOccupationID"];
            g.sAliasName = (string)reader["sAliasName"];
            g.sOldGreenBKNo = (string)reader["sOldGreenBKNo"];
            g.sFstGreenBkNo = (string)reader["sFstGreenBkNo"];
            g.dtFormDate = (DateTime)reader["dtFormDate"];
            g.sFathersName = (string)reader["sFathersName"];
            g.sFathersID = (string)reader["sFathersID"];
            g.sFathersGBID = (string)reader["sFathersGBID"];
            g.sMothersName = (string)reader["sMothersName"];
            g.sMothersID = (string)reader["sMothersID"];
            g.sMothersGBID = (string)reader["sMothersGBID"];
            g.sSpouseName = (string)reader["sSpouseName"];
            g.sSpouseID = (string)reader["sSpouseID"];
            g.sSpouseGBID = (string)reader["sSpouseGBID"];
            g.nChildrenM = (int)reader["nChildrenM"];
            g.nChildrenF = (int)reader["nChildrenF"];
            g.sAddress1 = (string)reader["sAddress1"];
            g.sAddress2 = (string)reader["sAddress2"];
            g.sCity = (string)reader["sAddress2"];
            g.sState = (string)reader["sState"];
            g.sPCode = (string)reader["sPCode"];
            g.sCountryID = (string)reader["sCountryID"];
            g.sEmail = (string)reader["sEmail"];
            g.sPhone = (string)reader["sPhone"];
            g.sFax = (string)reader["sFax"];
            g.dtDeceased = reader.IsDBNull("dtDeceased") ? null : (DateTime?)(reader["dtDeceased"]);
            g.sBookIssued = reader.IsDBNull("sBookIssued") ? null : (string)reader["sBookIssued"];
            g.dtValidityDate = reader.IsDBNull("dtValidityDate") ? null : (DateTime?)(reader["dtValidityDate"]);
            g.sEnteredDateTime = (string)reader["sEnteredDateTime"];
            g.sPaidUntil = (string)reader["sPaidUntil"];
            g.TibetanName = (string)reader["TibetanName"];
            g.TBUPlaceOfBirth = (string)reader["TBUPlaceOfBirth"];
            g.TBUOriginVillage = (string)reader["TBUOriginVillage"];
            g.TBUFathersName = (string)reader["TBUFathersName"];
            g.TBUMothersName = (string)reader["TBUMothersName"];
            g.TBUSpouseName = (string)reader["TBUSpouseName"];
            //Common Props
            g.dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"]);
            g.nEnteredBy = (int)reader["nEnteredBy"];
            g.dtUpdated = reader.IsDBNull("dtUpdated") ? null : (DateTime?)(reader["dtUpdated"]);
            g.nUpdatedBy = (int)reader["nUpdatedBy"];

            return g;
        }
        #endregion
    }
}
