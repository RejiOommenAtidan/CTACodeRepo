using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Transactions;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using CTADBL.ViewModels;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace CTADBL.ViewModelsRepositories
{
    public class GreenBookVMRepository : ADORepository<GreenBookVM>
    {
        private static MySqlConnection _connection;
        private GreenbookRepository _greenbookRepository;
        private GBChildrenRepository _gbChildrenRepository;
        private IssueBookRepository _issueBookRepository;
        private GBNoteRepository _gbNoteRepository;
        private GBDocumentRepository _gbDocumentRepository;

        #region Constructor
        public GreenBookVMRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
            _greenbookRepository = new GreenbookRepository(connectionString);
            _gbChildrenRepository = new GBChildrenRepository(connectionString);
            _issueBookRepository = new IssueBookRepository(connectionString);
            _gbNoteRepository = new GBNoteRepository(connectionString);
            _gbDocumentRepository = new GBDocumentRepository(connectionString);
        }
        #endregion

        #region Get GreenBookVM
        public IEnumerable<GreenBookVM> GetGreenbookVMRecord(string parameter, string value)
        {
            string operation = parameter == "sGBID" ? "=" : "LIKE";
            value = parameter == "sGBID" ? value : value + "%";

            string sql = String.Format(@"SELECT gb.sGBID, ar.sAuthRegion, gb.sFirstName, gb.sMiddleName, gb.sLastName, gb.sFamilyName, gb.sGender, gb.dtDOB, gb.sDOBApprox, gb.sBirthPlace, gb.sBirthCountryID, gb.sOriginVillage, pr.sProvince, gb.sMarried, gb.sOtherDocuments, gb.sResidenceNumber, qu.sQualification, occ.sOccupationDesc , gb.sAliasName, gb.sOldGreenBKNo, gb.sFstGreenBkNo,  gb.dtFormDate,  gb.sFathersName, frel.sgbidrelation as sFathersGBID, gb.sMothersName,  mrel.sgbidrelation as sMothersGBID,  gb.sSpouseName, srel.sgbidrelation as sSpouseGBID, gb.nChildrenM, gb.nChildrenF, gb.sAddress1, gb.sAddress2, gb.sCity, gb.sState, gb.sPCode, gb.sCountryID, gb.sEmail, gb.sPhone, gb.sfax, gb.dtDeceased, gb.sBookIssued, gb.dtValidityDate, gb.sPaidUntil, gb.TibetanName, gb.TBUPlaceOfBirth, gb.TBUOriginVillage, gb.TBUFathersName, gb.TBUMothersName, gb.TBUSpouseName  FROM tblgreenbook as gb LEFT JOIN lstauthregion AS ar ON ar.ID = gb.nAuthRegionID LEFT JOIN lstprovince AS pr ON pr.Id = gb.sOriginProvinceID LEFT JOIN lstqualification AS qu ON qu.sQualificationID = gb.sQualificationID LEFT JOIN lstoccupation AS occ ON occ.Id = gb.sOccupationID LEFT JOIN lnkgbrelation AS frel ON gb.sGBID = frel.sGBID and frel.nrelationid = 1  LEFT JOIN lnkgbrelation AS mrel ON gb.sGBID = mrel.sGBID and mrel.nrelationid = 2 LEFT JOIN lnkgbrelation AS srel ON gb.sGBID = srel.sGBID and srel.nrelationid = 3 WHERE gb.{0} {1} @value", parameter, operation);
            
            try
            {
                using (var command = new MySqlCommand(sql))
                {

                    //command.Parameters.AddWithValue("parameter", "gb." + parameter);
                    command.Parameters.AddWithValue("value", value);
                    return GetRecords(command);
                }
            }
            catch(Exception ex)
            {
                
                return null;
            }
        }
        #endregion


        public GreenBookVM GetDetails(GreenBookVM gvm)
        {
            gvm.children = _gbChildrenRepository.GetGBChildrenByGBIDParent(gvm.greenBook.sGBID);
            gvm.booksIssued = _issueBookRepository.GetIssueBookByGbId(Convert.ToInt32(gvm.greenBook.sGBID));
            gvm.gbNotes = _gbNoteRepository.GetGBNoteByGBID(gvm.greenBook.sGBID);
            gvm.gbDocuments = _gbDocumentRepository.GetGBDocumentsByGBID(gvm.greenBook.sGBID);
            return gvm;
        }


        #region Populate Records
        public override GreenBookVM PopulateRecord(MySqlDataReader reader)
        {

            GreenBookVM gvm = new GreenBookVM
            {
                greenBook =  new Greenbook 
                {
                    sGBID = reader.IsDBNull("sGBID") ? null : (string)reader["sGBID"],
                    sFirstName = reader.IsDBNull("sFirstName") ? null : (string)reader["sFirstName"],
                    sMiddleName = reader.IsDBNull("sMiddleName") ? null : (string)reader["sMiddleName"],
                    sLastName = reader.IsDBNull("sLastName") ? null : (string)reader["sLastName"],
                    sFamilyName = reader.IsDBNull("sFamilyName") ? null : (string)reader["sFamilyName"],
                    sGender = reader.IsDBNull("sGender") ? null : (string)reader["sGender"],
                    dtDOB = reader.IsDBNull("dtDOB") ? null : (DateTime?)(reader["dtDOB"]),
                    sDOBApprox = reader.IsDBNull("sDOBApprox") ? null : (string)reader["sDOBApprox"],
                    sBirthPlace = reader.IsDBNull("sBirthPlace") ? null : (string)reader["sBirthPlace"],
                    sBirthCountryID = reader.IsDBNull("sBirthCountryID") ? null : (string)reader["sBirthCountryID"],
                    sOriginVillage = reader.IsDBNull("sOriginVillage") ? null : (string)reader["sOriginVillage"],
                    sMarried = reader.IsDBNull("sMarried") ? null : (string)reader["sMarried"],
                    sOtherDocuments = (string)reader["sOtherDocuments"],
                    sResidenceNumber = reader.IsDBNull("sResidenceNumber") ? null : (string)reader["sResidenceNumber"],
                    sAliasName = (string)reader["sAliasName"],
                    sOldGreenBKNo = reader.IsDBNull("sOldGreenBKNo") ? null : (string)reader["sOldGreenBKNo"],
                    sFstGreenBkNo = reader.IsDBNull("sFstGreenBkNo") ? null : (string)reader["sFstGreenBkNo"],
                    dtFormDate = reader.IsDBNull("dtFormDate") ? null : (DateTime?)(reader["dtFormDate"]),
                    sFathersName = reader.IsDBNull("sFathersName") ? null : (string)reader["sFathersName"],
                    sMothersName = reader.IsDBNull("sMothersName") ? null : (string)reader["sMothersName"],
                    sSpouseName = reader.IsDBNull("sSpouseName") ? null : (string)reader["sSpouseName"],
                    nChildrenM = (int)reader["nChildrenM"],
                    nChildrenF = (int)reader["nChildrenF"],
                    sAddress1 = reader.IsDBNull("sAddress1") ? null : (string)reader["sAddress1"],
                    sAddress2 = reader.IsDBNull("sAddress2") ? null : (string)reader["sAddress2"],
                    sCity = reader.IsDBNull("sCity") ? null : (string)reader["sCity"],
                    sState = reader.IsDBNull("sState") ? null : (string)reader["sState"],
                    sPCode = reader.IsDBNull("sPCode") ? null : (string)reader["sPCode"],
                    sCountryID = reader.IsDBNull("sCountryID") ? null : (string)reader["sCountryID"],
                    sEmail = reader.IsDBNull("sEmail") ? null : (string)reader["sEmail"],
                    sPhone = reader.IsDBNull("sPhone") ? null : (string)reader["sPhone"],
                    sFax = reader.IsDBNull("sFax") ? null : (string)reader["sFax"],
                    dtDeceased = reader.IsDBNull("dtDeceased") ? null : (DateTime?)(reader["dtDeceased"]),
                    sBookIssued = reader.IsDBNull("sBookIssued") ? null : (string)reader["sBookIssued"],
                    dtValidityDate = reader.IsDBNull("dtValidityDate") ? null : (DateTime?)(reader["dtValidityDate"]),
                    sPaidUntil = (string)reader["sPaidUntil"],
                    TibetanName = (string)reader["TibetanName"],
                    TBUPlaceOfBirth = (string)reader["TBUPlaceOfBirth"],
                    TBUOriginVillage = (string)reader["TBUOriginVillage"],
                    TBUFathersName = (string)reader["TBUFathersName"],
                    TBUMothersName = (string)reader["TBUMothersName"],
                    TBUSpouseName = (string)reader["TBUSpouseName"],
                },
                sAuthRegion = reader.IsDBNull("sAuthRegion") ? null : (string)reader["sAuthRegion"],
                sProvince = reader.IsDBNull("sProvince") ? null : (string)reader["sProvince"],
                sQualification = reader.IsDBNull("sQualification") ? null : (string)reader["sQualification"],
                sOccupationDesc = reader.IsDBNull("sOccupationDesc") ? null : (string)reader["sOccupationDesc"],
                sFathersGBID = reader.IsDBNull("sFathersGBID") ? null : (string)reader["sFathersGBID"],
                sMothersGBID = reader.IsDBNull("sMothersGBID") ? null : (string)reader["sMothersGBID"],
                sSpouseGBID = reader.IsDBNull("sSpouseGBID") ? null : (string)reader["sSpouseGBID"]
            };
            //gvm.children = _gbChildrenRepository.GetGBChildrenByGBIDParent(gvm.greenBook.sGBID);
            //gvm.booksIssued = _issueBookRepository.GetIssueBookByGbId(Convert.ToInt32(gvm.greenBook.sGBID));
            //gvm.gbNotes = _gbNoteRepository.GetGBNoteByGBID(gvm.greenBook.sGBID);
            //gvm.gbDocuments = _gbDocumentRepository.GetGBDocumentsByGBID(gvm.greenBook.sGBID);
            return gvm;
        }
        #endregion
    }
}
