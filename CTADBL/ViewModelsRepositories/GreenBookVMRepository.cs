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
    public class GreenBookVMRepository : ADORepository<GreenBookVM>
    {
        private static MySqlConnection _connection;
        private GreenbookRepository _greenbookRepository;
        private GBChildrenRepository _gbChildrenRepository;
        private IssueBookVMRepository _issueBookVMRepository;
        private GBNoteRepository _gbNoteRepository;
        private GBDocumentRepository _gbDocumentRepository;
        private AuditLogVMRepository _auditLogVMRepository;
        private RecentlySearchedGBRepository _recentlySearchedGBRepository;
        private GBRelationVMRepository _gbRelationVMRepository;

        #region Constructor
        public GreenBookVMRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
            _greenbookRepository = new GreenbookRepository(connectionString);
            _gbChildrenRepository = new GBChildrenRepository(connectionString);
            _issueBookVMRepository = new IssueBookVMRepository(connectionString);
            _gbNoteRepository = new GBNoteRepository(connectionString);
            _gbDocumentRepository = new GBDocumentRepository(connectionString);
            _auditLogVMRepository = new AuditLogVMRepository(connectionString);
            _recentlySearchedGBRepository = new RecentlySearchedGBRepository(connectionString);
            _gbRelationVMRepository = new GBRelationVMRepository(connectionString);
        }
        #endregion

        #region Get Basic Details of GreenBook by GBID
        public GreenBookVM GetBasicDetailsFromGBID(string sGBID)
        {
            string sql = String.Format(@"SELECT gb.sGBID, ar.sAuthRegion, gb.sFirstName, gb.sMiddleName, gb.sLastName, gb.sFamilyName, gb.sFathersName, gb.sMothersName, gb.sGender, gb.dtDOB, gb.sDOBApprox, gb.sBirthPlace, gb.sBirthCountryID,  bctry.sCountry AS sBirthCountry, gb.sOriginVillage, pr.sProvince, gb.sMarried, gb.sOtherDocuments, gb.sResidenceNumber, qu.sQualification, occ.sOccupationDesc , gb.sAliasName, gb.sOldGreenBKNo, gb.sFstGreenBkNo,  gb.dtFormDate, gb.nChildrenM, gb.nChildrenF, gb.sAddress1, gb.sAddress2, gb.sCity, gb.sState, gb.sPCode, gb.sCountryID, ctry.sCountry AS sCountry, gb.sEmail, gb.sPhone, gb.sfax, gb.dtDeceased, gb.sBookIssued, gb.dtValidityDate, gb.sPaidUntil, gb.TibetanName, gb.TBUPlaceOfBirth, gb.TBUOriginVillage, gb.TBUFathersName, gb.TBUMothersName, gb.TBUSpouseName, us.sFullName AS sEnteredBy, doc.binFileDoc AS sPhoto FROM tblgreenbook as gb LEFT JOIN lstcountry ctry ON ctry.sCountryID = gb.sCountryID LEFT JOIN lstcountry bctry ON bctry.sCountryID = gb.sBirthCountryID  LEFT JOIN tbluser AS us ON us.Id = gb.nEnteredBy LEFT JOIN lstauthregion AS ar ON ar.ID = gb.nAuthRegionID LEFT JOIN lstprovince AS pr ON pr.Id = gb.sOriginProvinceID LEFT JOIN lstqualification AS qu ON qu.sQualificationID = gb.sQualificationID LEFT JOIN lstoccupation AS occ ON occ.Id = gb.sOccupationID LEFT JOIN lnkgbdocument AS doc ON gb.sGBId = doc.sGBId WHERE gb.sGBID = @sGBID;");

            try
            {
                using (var command = new MySqlCommand(sql))
                {

                    //command.Parameters.AddWithValue("parameter", "gb." + parameter);
                    command.Parameters.AddWithValue("sGBID", sGBID);
                    return GetRecord(command);
                }
            }
            catch (Exception ex)
            {

                return null;
            }
        }
        #endregion

        #region Get Basic Personal Details of GreenBook Holder
        public Object GetPersonalDetailsFromGBID(string sGBID)
        {
            //string sql = @"SELECT ar.sAuthRegion, gb.nAuthRegionID, gb.sFirstName, gb.sMiddleName, gb.sLastName, gb.sFamilyName, gb.sFathersName, gb.sMothersName FROM tblgreenbook as gb LEFT JOIN lstauthregion ar ON ar.ID = gb.nAuthRegionID WHERE gb.sGBID = @sGBID;";

            string sql = @"SELECT ar.sAuthRegion, gb.nAuthRegionID, gb.sFirstName, gb.sMiddleName, gb.sLastName, gb.sFamilyName, gb.sFathersName, gb.sMothersName, (SELECT Max(nBookNo) FROM tblgreenbookserial t2 WHERE sGBID = @sGBID ) AS sPreviousSrNo FROM tblgreenbook as gb LEFT JOIN lstauthregion ar ON ar.ID = gb.nAuthRegionID WHERE gb.sGBID = @sGBID;";

            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBID", sGBID);
                command.Connection = _connection;
                command.CommandType = CommandType.Text;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                var result = tables[0].AsEnumerable().Select(row => new
                {
                    sAuthRegion = row.Field<string>("sAuthRegion"),
                    nAuthRegionID = row.Field<int>("nAuthRegionID"),
                    sFirstName = row.Field<string>("sFirstName"),
                    sMiddleName = row.Field<string>("sMiddleName"),
                    sLastName = row.Field<string>("sLastName"),
                    sFamilyName = row.Field<string>("sFamilyName"),
                    sFathersName = row.Field<string>("sFathersName"),
                    sMothersName = row.Field<string>("sMothersName"),
                    sPreviousSrNo = row.Field<string>("sPreviousSrNo")
                }).FirstOrDefault();
                return result;
            }
        }
        #endregion




        #region Get GreenBookVM with Multiple search paramters.
        public GreenBookVM GetGreenbookVMRecord(string parameter, string value)
        {
            //string operation = parameter == "sGBID" ? "=" : "LIKE";
            string operation = "=";
            //value = parameter == "sGBID" ? value : value + "%";

            string sql = String.Format(@"SELECT gb.sGBID, ar.sAuthRegion, gb.sFirstName, gb.sMiddleName, gb.sLastName, gb.sFamilyName, gb.sFathersName, gb.sMothersName, gb.sGender, gb.dtDOB, gb.sDOBApprox, gb.sBirthPlace, gb.sBirthCountryID,  bctry.sCountry AS sBirthCountry, gb.sOriginVillage, pr.sProvince, gb.sMarried, gb.sOtherDocuments, gb.sResidenceNumber, qu.sQualification, occ.sOccupationDesc , gb.sAliasName, gb.sOldGreenBKNo, gb.sFstGreenBkNo,  gb.dtFormDate, gb.nChildrenM, gb.nChildrenF, gb.sAddress1, gb.sAddress2, gb.sCity, gb.sState, gb.sPCode, gb.sCountryID, ctry.sCountry AS sCountry, gb.sEmail, gb.sPhone, gb.sfax, gb.dtDeceased, gb.sBookIssued, gb.dtValidityDate, gb.sPaidUntil, gb.TibetanName, gb.TBUPlaceOfBirth, gb.TBUOriginVillage, gb.TBUFathersName, gb.TBUMothersName, gb.TBUSpouseName, us.sFullName AS sEnteredBy, doc.binFileDoc AS sPhoto FROM tblgreenbook as gb LEFT JOIN lstcountry ctry ON ctry.sCountryID = gb.sCountryID LEFT JOIN lstcountry bctry ON bctry.sCountryID = gb.sBirthCountryID  LEFT JOIN tbluser AS us ON us.Id = gb.nEnteredBy LEFT JOIN lstauthregion AS ar ON ar.ID = gb.nAuthRegionID LEFT JOIN lstprovince AS pr ON pr.Id = gb.sOriginProvinceID LEFT JOIN lstqualification AS qu ON qu.sQualificationID = gb.sQualificationID LEFT JOIN lstoccupation AS occ ON occ.Id = gb.sOccupationID LEFT JOIN lnkgbdocument AS doc ON gb.sGBId = doc.sGBId AND doc.sDocType = 'Photo Identity' WHERE gb.{0} {1} @value", parameter, operation);
            
            try
            {
                using (var command = new MySqlCommand(sql))
                {

                    //command.Parameters.AddWithValue("parameter", "gb." + parameter);
                    command.Parameters.AddWithValue("value", value);
                    return GetRecord(command);
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
            gvm.relations = _gbRelationVMRepository.GetRelationsData(gvm.greenBook.sGBID);
            gvm.children = _gbChildrenRepository.GetGBChildrenByGBIDParent(gvm.greenBook.sGBID);
            gvm.booksIssued = _issueBookVMRepository.GetIssueBookByGbId(Convert.ToInt32(gvm.greenBook.sGBID));
            gvm.gbNotes = _gbNoteRepository.GetGBNoteByGBID(gvm.greenBook.sGBID);
            gvm.gbDocuments = _gbDocumentRepository.GetGBDocumentsByGBID(gvm.greenBook.sGBID);
            gvm.auditLogs = _auditLogVMRepository.GetAuditLogsByGBID(gvm.greenBook.sGBID);
            return gvm;
        }


        public GreenBookVM GetDetailsFromGBID(string sGBID, int nUserId)
        {
            try
            {
                GreenBookVM greenBookVM = GetDetails(GetGreenbookVMRecord("sGBID", sGBID));
                RecentlySearchedGB recentlySearched = new RecentlySearchedGB
                {
                    dtEntered = DateTime.Now,
                    nEnteredBy = nUserId,
                    nGBID = Convert.ToInt32(sGBID),
                    nUserID = nUserId
                };
                _recentlySearchedGBRepository.Add(recentlySearched);
                return greenBookVM;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        #region Quick Result Approach

        public IEnumerable<Object> GetQuickResult(string parameter, string value)
        {
            //string operation = parameter == "sGBID" ? "=" : "LIKE";
            string operation = "LIKE";
            //value = parameter == "sGBID" ? value : value + "%";
            value = value.Trim() + "%";
            string join = String.Empty;
            string field = String.Empty;
            string where = String.Empty;
            switch (parameter)
            {
                case "sFathersGBID":
                    join = String.Format(@"LEFT JOIN lnkgbrelation AS rel ON gb.sGBID = rel.sGBID AND rel.nrelationid = 1");
                    field = String.Format(@", rel.sGBIDRelation AS {0}", parameter);
                    where = @"rel.sGBIDRelation";
                    break;
                case "sMothersGBID":
                    join = String.Format(@"LEFT JOIN lnkgbrelation AS rel ON gb.sGBID = rel.sGBID AND rel.nrelationid = 2");
                    field = String.Format(@", rel.sGBIDRelation AS {0}", parameter);
                    where = @"rel.sGBIDRelation";
                    break;
                case "sSpouseGBID":
                    join = String.Format(@"LEFT JOIN lnkgbrelation AS rel ON gb.sGBID = rel.sGBID AND rel.nrelationid = 3");
                    field = String.Format(@", rel.sGBIDRelation AS {0}", parameter);
                    where = @"rel.sGBIDRelation";
                    break;
                default:
                    join = String.Empty;
                    field = ", gb." + parameter;
                    where = "gb." + parameter;
                    break;
            }
            
            string sql = String.Format(@"SELECT gb.Id, gb.sGBID, gb.sFirstName, gb.sMiddleName, gb.sLastName, gb.sFamilyName, gb.dtDOB, CAST(year(curdate()) - year(dtDOB) AS UNSIGNED) as nAge,  gb.sFathersName, gb.sMothersName, gb.sCity, gb.sCountryID {0} FROM tblgreenbook as gb {1} WHERE {2} {3} @value ORDER BY {2} LIMIT 500", field, join, where, operation);

            using (var command = new MySqlCommand(sql))
            {

                //command.Parameters.AddWithValue("parameter", "gb." + parameter);
                command.Parameters.AddWithValue("value", value);

                command.Connection = _connection;
                command.CommandType = CommandType.Text;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);

                DataTableCollection tables = ds.Tables;
                var result = tables[0].AsEnumerable().Select(row => new
                {
                    Id= row.Field<int>("Id"),
                    sGBID = row.Field<string>("sGBID"),
                    sFirstName = row.Field<string>("sFirstName"),
                    sMiddleName = row.Field<string>("sMiddleName"),
                    sLastName = row.Field<string>("sLastName"),
                    sFamilyName = row.Field<string>("sFamilyName"),
                    dtDOB = row.Field<DateTime>("dtDOB"),
                    nAge = Convert.ToInt32(row.Field<System.UInt64>("nAge")),
                    sFathersName = row.Field<string>("sFathersName"),
                    sMothersName = row.Field<string>("sMothersName"),
                    sCity = row.Field<string>("sCity"),
                    sCountryID = row.Field<string>("sCountryID"),
                    searchField = parameter,
                    searchResult = row.Field<string>(parameter)
                });

                return result;
            }
        }
        #endregion

        public IEnumerable<Object> GetQuickResultComplex(DetailedSearchVM detailedSearch)
        {
            string addToSql = "";
            Dictionary<string, dynamic> parameters = detailedSearch.GetType().GetProperties().ToDictionary(prop => prop.Name, prop => prop.GetValue(detailedSearch, null));

            foreach (KeyValuePair<string, dynamic> item in parameters)
            {
                if (item.Value != null)
                {
                    if (item.Key == "nFromAge")
                    {
                        //if(item.Value.GetType().ToString() != "System.Int32")
                        //{
                        //    continue;
                        //}

                        if (item.Value > 0)
                        {
                            int year = DateTime.Now.Year - Convert.ToInt32(item.Value);
                            addToSql += String.Format(@"year(gb.dtDOB) <= {0} and ", year);
                        }
                        
                    }
                    else if (item.Key == "nToAge")
                    {
                        if (item.Value > 0)
                        {
                            int year = DateTime.Now.Year - Convert.ToInt32(item.Value);
                            addToSql += String.Format(@"year(gb.dtDOB) >= {0} and ", year);
                        }
                        
                    }
                    else if(item.Key == "dtDOB")
                    {
                        if (!String.IsNullOrEmpty(item.Value) && !String.IsNullOrWhiteSpace(item.Value))
                        {
                            addToSql += String.Format(@"gb.{0} = '{1}' and ", item.Key, item.Value);
                        }
                        
                    }
                    else
                    {
                        if(!String.IsNullOrEmpty(item.Value) && !String.IsNullOrWhiteSpace(item.Value))
                        addToSql += String.Format(@"gb.{0} LIKE '{1}%' and ", item.Key, item.Value);
                    }
                }
            }

            string sql = String.Format(@"SELECT gb.Id, gb.sGBID, gb.sFirstName, gb.sMiddleName, gb.sLastName, gb.sFamilyName, gb.dtDOB, CAST(year(curdate()) - year(dtDOB) AS UNSIGNED) as Age,  gb.sFathersName, gb.sMothersName, gb.sCity, gb.sCountryID  FROM tblgreenbook as gb WHERE {0} 1 = 1 LIMIT 500", addToSql);

            using (var command = new MySqlCommand(sql))
            {
                command.Connection = _connection;
                command.CommandType = CommandType.Text;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                var result = tables[0].AsEnumerable().Select(row => new
                {
                    Id = row.Field<int>("Id"),
                    sGBID = row.Field<string>("sGBID"),
                    sFirstName = row.Field<string>("sFirstName"),
                    sMiddleName = row.Field<string>("sMiddleName"),
                    sLastName = row.Field<string>("sLastName"),
                    sFamilyName = row.Field<string>("sFamilyName"),
                    dtDOB = row.Field<DateTime>("dtDOB"),
                    nAge = Convert.ToInt32(row.Field<System.UInt64>("Age")),
                    sFathersName = row.Field<string>("sFathersName"),
                    sMothersName = row.Field<string>("sMothersName"),
                    sCity = row.Field<string>("sCity"),
                    sCountryID = row.Field<string>("sCountryID")

                });

                return result;
            }
        }

        #region Populate Records
        public override GreenBookVM PopulateRecord(MySqlDataReader reader)
        {
            string? sPhoto = null;
            if (!reader.IsDBNull("sPhoto"))
            {
                byte[] img = (byte[])reader["sPhoto"];
                sPhoto = Convert.ToBase64String(img);
            }
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
                    //sFathersID = reader.IsDBNull("sFathersID") ? null : (string)reader[@"sFathersID"],
                    //sFathersGBID = reader.IsDBNull("sFathersGBID") ? null : (string)reader["sFathersGBID"],
                    sMothersName = reader.IsDBNull("sMothersName") ? null : (string)reader["sMothersName"],
                    //sMothersID = reader.IsDBNull("sMothersID") ? null : (string)reader["sMothersID"],
                    //sMothersGBID = reader.IsDBNull("sMothersGBID") ? null : (string)reader["sMothersGBID"],
                    //sSpouseName = reader.IsDBNull("sSpouseName") ? null : (string)reader["sSpouseName"],
                    //sSpouseID = reader.IsDBNull("sSpouseID") ? null : (string)reader["sSpouseID"],
                    //sSpouseGBID = reader.IsDBNull("sSpouseGBID") ? null : (string)reader["sSpouseGBID"],
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
                    TBUSpouseName = (string)reader["TBUSpouseName"]
                },
                sAuthRegion = reader.IsDBNull("sAuthRegion") ? null : (string)reader["sAuthRegion"],
                sProvince = reader.IsDBNull("sProvince") ? null : (string)reader["sProvince"],
                sQualification = reader.IsDBNull("sQualification") ? null : (string)reader["sQualification"],
                sOccupationDesc = reader.IsDBNull("sOccupationDesc") ? null : (string)reader["sOccupationDesc"],
                //sFathersGBID = reader.IsDBNull("sFathersGBID") ? null : (string)reader["sFathersGBID"],
                //sMothersGBID = reader.IsDBNull("sMothersGBID") ? null : (string)reader["sMothersGBID"],
                //sSpouseGBID = reader.IsDBNull("sSpouseGBID") ? null : (string)reader["sSpouseGBID"],
                sBirthCountry = reader.IsDBNull("sBirthCountry") ? null : (string)reader["sBirthCountry"],
                sCountry = reader.IsDBNull("sCountry") ? null : (string)reader["sCountry"],
                sEnteredBy = reader.IsDBNull("sEnteredBy") ? null : (string)reader["sEnteredBy"],
                sPhoto = sPhoto
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
