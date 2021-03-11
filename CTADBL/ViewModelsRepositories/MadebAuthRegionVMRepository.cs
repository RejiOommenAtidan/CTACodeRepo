using CTADBL.BaseClasses.Masters;
using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Masters;
using CTADBL.BaseClassRepositories.Transactions;
using CTADBL.Repository;
using CTADBL.ViewModels;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace CTADBL.ViewModelsRepositories
{
    public class MadebAuthRegionVMRepository : ADORepository <MadebAuthRegionVM>
    {

        private MadebRepository _madebRepository;
        private MySqlConnection _connection;

        #region Constructor
        public MadebAuthRegionVMRepository(string connectionString) : base(connectionString)
        {
            _madebRepository = new MadebRepository(connectionString);
            _connection = new MySqlConnection(connectionString);
        }
        #endregion

        #region Get Madeb/Madebs

        #region GetAllMadebs
        public IEnumerable<MadebAuthRegionVM> GetAllMadebs()
        {
            string sql = @"SELECT `tblmadeb`.`Id`,
                            `_Id`,
                            `nFormNumber`,
                            `sGBID`,
                            `nMadebTypeID`,
                            `sName`,
                            `sFathersName`,
                            `nAuthRegionID`,
                            `dtReceived`,
                            `dtIssueAction`,
                            `nIssuedOrNotID`,
                            `nType`,
                            `sChangeField`,
                            `sOfficeOfTibetan`,
                            `sDocumentAttached`,
                            `nCurrentGBSno`,
                            `nPreviousGBSno`,
                            `nSaneyFormNo`,
                            `nReceiptNo`,
                            `dtEmailSend`,
                            `sAlias`,
                            `sApprovedReject`,
                            `dtReject`,
                            `dtReturnEmail`,
                            `tblmadeb`.`dtEntered`,
                            `tblmadeb`.`nEnteredBy`,
                            `tblmadeb`.`dtUpdated`,
                            `tblmadeb`.`nUpdatedBy`,
                            `sAuthRegion`,
                            `sTypeIssued`
                        FROM `tblmadeb` 
                        INNER JOIN `lstauthregion` on `tblmadeb`.`nAuthRegionID` = `lstauthregion`.`ID`
                        LEFT JOIN `lsttypeissued` on `tblmadeb`.`nIssuedOrNotID` = `lsttypeissued`.`Id`
                        ORDER BY `tblmadeb`.`Id` DESC;";
            using (var command = new MySqlCommand(sql))
            {
                return GetRecords(command);
            }
        }
        #endregion

        #region Get Madeb by Id
        public MadebAuthRegionVM GetMadebById(string Id)
        {
            string sql = @"SELECT `tblmadeb`.`Id`,
                            `_Id`,
                            `nFormNumber`,
                            `sGBID`,
                            `nMadebTypeID`,
                            `sName`,
                            `sFathersName`,
                            `nAuthRegionID`,
                            `dtReceived`,
                            `dtIssueAction`,
                            `nIssuedOrNotID`,
                            `nType`,
                            `sChangeField`,
                            `sOfficeOfTibetan`,
                            `sDocumentAttached`,
                            `nCurrentGBSno`,
                            `nPreviousGBSno`,
                            `nSaneyFormNo`,
                            `nReceiptNo`,
                            `dtEmailSend`,
                            `sAlias`,
                            `sApprovedReject`,
                            `dtReject`,
                            `dtReturnEmail`,
                            `tblmadeb`.`dtEntered`,
                            `tblmadeb`.`nEnteredBy`,
                            `tblmadeb`.`dtUpdated`,
                            `tblmadeb`.`nUpdatedBy`,
                            `sAuthRegion`,
                            `sTypeIssued`
                        FROM `tblmadeb` 
                        INNER JOIN `lstauthregion` on `tblmadeb`.`nAuthRegionID` = `lstauthregion`.`ID`
                        LEFT JOIN `lsttypeissued` on `tblmadeb`.`nIssuedOrNotID` = `lsttypeissued`.`Id`
                        WHERE `tblmadeb`.`Id`=@Id;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("Id", Id);
                return GetRecord(command);
            }
        }
        #endregion

        #region Get Madebs by Madeb Types
        public IEnumerable<MadebAuthRegionVM> GetMadebsByType(int madebType)
        {
            string sql = @"SELECT `tblmadeb`.`Id`,
                            `_Id`,
                            `nFormNumber`,
                            `sGBID`,
                            `nMadebTypeID`,
                            `sName`,
                            `sFathersName`,
                            `nAuthRegionID`,
                            `dtReceived`,
                            `dtIssueAction`,
                            `nIssuedOrNotID`,
                            `nType`,
                            `sChangeField`,
                            `sOfficeOfTibetan`,
                            `sDocumentAttached`,
                            `nCurrentGBSno`,
                            `nPreviousGBSno`,
                            `nSaneyFormNo`,
                            `nReceiptNo`,
                            `dtEmailSend`,
                            `sAlias`,
                            `sApprovedReject`,
                            `dtReject`,
                            `dtReturnEmail`,
                            `tblmadeb`.`dtEntered`,
                            `tblmadeb`.`nEnteredBy`,
                            `tblmadeb`.`dtUpdated`,
                            `tblmadeb`.`nUpdatedBy`,
                            `sAuthRegion`,
                            `sTypeIssued`, 
                            `lstmadebstatus`.`sMadebStatus`,
                            `tblmadeb`.`nMadebStatusID`,
                            `sMadebStatusRemark`
                        FROM `tblmadeb` 
                        LEFT JOIN `lstauthregion` on `tblmadeb`.`nAuthRegionID` = `lstauthregion`.`ID`
                        LEFT JOIN `lsttypeissued` on `tblmadeb`.`nIssuedOrNotID` = `lsttypeissued`.`Id`
                        LEFT JOIN `lstmadebstatus` ON `tblmadeb`.`nMadebStatusID` = `lstmadebstatus`.`ID`
                        WHERE `nMadebTypeID`= @madebType 
                        ORDER BY `tblmadeb`.`nFormNumber` DESC LIMIT @limit";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("madebType", madebType);
                int limit = Convert.ToInt32(CTAConfigRepository.GetValueByKey("MadebLoadDefaultRecordsNumber"));
                command.Parameters.AddWithValue("limit", limit);
                //command.Parameters.AddWithValue("limit", Convert.ToInt32(CTAConfigRepository.GetValueByKey("SelectTotalRecordCount")));
                //command.Connection = _connection;
                //MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                //DataSet ds = new DataSet();
                //mySqlDataAdapter.Fill(ds);
                //int records = ds.Tables[0].Rows.Count;
                return GetRecords(command);
                //return null;
            }
        }
        #endregion

        #region Get Madeb by form number
        public MadebAuthRegionVM GetMadebByFormNumber(int formNumber)
        {
            string sql = @"SELECT `tblmadeb`.`Id`,
                            `_Id`,
                            `nFormNumber`,
                            `sGBID`,
                            `nMadebTypeID`,
                            `sName`,
                            `sFathersName`,
                            `nAuthRegionID`,
                            `dtReceived`,
                            `dtIssueAction`,
                            `nIssuedOrNotID`,
                            `nType`,
                            `sChangeField`,
                            `sOfficeOfTibetan`,
                            `sDocumentAttached`,
                            `nCurrentGBSno`,
                            `nPreviousGBSno`,
                            `nSaneyFormNo`,
                            `nReceiptNo`,
                            `dtEmailSend`,
                            `sAlias`,
                            `sApprovedReject`,
                            `dtReject`,
                            `dtReturnEmail`,
                            `tblmadeb`.`dtEntered`,
                            `tblmadeb`.`nEnteredBy`,
                            `tblmadeb`.`dtUpdated`,
                            `tblmadeb`.`nUpdatedBy`,
                            `sAuthRegion`,
                            `sTypeIssued`
                        FROM `tblmadeb` 
                        INNER JOIN `lstauthregion` on `tblmadeb`.`nAuthRegionID` = `lstauthregion`.`ID`
                        LEFT JOIN `lsttypeissued` on `tblmadeb`.`nIssuedOrNotID` = `lsttypeissued`.`Id`
                        WHERE nFormNumber=@formNumber;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("formNumber", formNumber);
                return GetRecord(command);
            }
        }
        #endregion

        #region Get Madeb(s) by Authority Region
        public IEnumerable<MadebAuthRegionVM> GetMadebsByAuthRegion(int authRegion)
        {
            string sql = @"SELECT `tblmadeb`.`Id`,
                            `_Id`,
                            `nFormNumber`,
                            `sGBID`,
                            `nMadebTypeID`,
                            `sName`,
                            `sFathersName`,
                            `nAuthRegionID`,
                            `dtReceived`,
                            `dtIssueAction`,
                            `nIssuedOrNotID`,
                            `nType`,
                            `sChangeField`,
                            `sOfficeOfTibetan`,
                            `sDocumentAttached`,
                            `nCurrentGBSno`,
                            `nPreviousGBSno`,
                            `nSaneyFormNo`,
                            `nReceiptNo`,
                            `dtEmailSend`,
                            `sAlias`,
                            `sApprovedReject`,
                            `dtReject`,
                            `dtReturnEmail`,
                            `tblmadeb`.`dtEntered`,
                            `tblmadeb`.`nEnteredBy`,
                            `tblmadeb`.`dtUpdated`,
                            `tblmadeb`.`nUpdatedBy`,
                            `sAuthRegion`,
                            `sTypeIssued`
                        FROM `tblmadeb` 
                        INNER JOIN `lstauthregion` on `tblmadeb`.`nAuthRegionID` = `lstauthregion`.`ID`
                        LEFT JOIN `lsttypeissued` on `tblmadeb`.`nIssuedOrNotID` = `lsttypeissued`.`Id`
                        WHERE nAuthRegionID=@nAuthRegionID
                        ORDER BY `tblmadeb`.`Id` DESC;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("nAuthRegionID", authRegion);
                return GetRecords(command);
            }
        }
        #endregion

        #region Get Madeb(s) by Issue Action
        public IEnumerable<MadebAuthRegionVM> GetMadebsByIssueAction(int issueAction)
        {
            string sql = @"SELECT `tblmadeb`.`Id`,
                            `_Id`,
                            `nFormNumber`,
                            `sGBID`,
                            `nMadebTypeID`,
                            `sName`,
                            `sFathersName`,
                            `nAuthRegionID`,
                            `dtReceived`,
                            `dtIssueAction`,
                            `nIssuedOrNotID`,
                            `nType`,
                            `sChangeField`,
                            `sOfficeOfTibetan`,
                            `sDocumentAttached`,
                            `nCurrentGBSno`,
                            `nPreviousGBSno`,
                            `nSaneyFormNo`,
                            `nReceiptNo`,
                            `dtEmailSend`,
                            `sAlias`,
                            `sApprovedReject`,
                            `dtReject`,
                            `dtReturnEmail`,
                            `tblmadeb`.`dtEntered`,
                            `tblmadeb`.`nEnteredBy`,
                            `tblmadeb`.`dtUpdated`,
                            `tblmadeb`.`nUpdatedBy`,
                            `sAuthRegion`,
                            `sTypeIssued`
                        FROM `tblmadeb` 
                        INNER JOIN `lstauthregion` on `tblmadeb`.`nAuthRegionID` = `lstauthregion`.`ID`
                        LEFT JOIN `lsttypeissued` on `tblmadeb`.`nIssuedOrNotID` = `lsttypeissued`.`Id`
                        WHERE nIssuedOrNotID=@nIssuedOrNotID
                        ORDER BY `tblmadeb`.`Id` DESC;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("nIssuedOrNotID", issueAction);
                return GetRecords(command);
            }
        }
        #endregion
        #endregion

        #region Column Search Madebs

        public IEnumerable<MadebAuthRegionVM> ColumnSearchMadebs(int madebType, string madeb)
        {
            string addToSql = "";

            var dictionary = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(madeb);

            using (var command = new MySqlCommand())
            {
                foreach (KeyValuePair<string, dynamic> item in dictionary)
                {
                    if (item.Value != null)
                    {
                        if (item.Value.GetType() == typeof(Int32) || item.Value.GetType() == typeof(Int64))
                        {
                            addToSql += String.Format(@"{0} LIKE @{1} AND ", item.Key, item.Key);
                            command.Parameters.AddWithValue(item.Key.ToString(), item.Value + '%');
                        }

                        if (item.Value.GetType() == typeof(string))
                        {
                            if (!String.IsNullOrEmpty(item.Value) && !String.IsNullOrWhiteSpace(item.Value))
                            {
                                addToSql += String.Format(@"{0} LIKE @{1} AND ", item.Key, item.Key);
                                command.Parameters.AddWithValue(item.Key.ToString(),'%' + item.Value + '%');
                            }
                        }
                        if(item.Value.GetType() == typeof(DateTime))
                        {
                            
                            addToSql += String.Format(@"{0} = @{1} AND ", item.Key, item.Key);
                            command.Parameters.AddWithValue(item.Key.ToString(), item.Value.ToString("yyyy-MM-dd"));
                        }
                    }
                }
                if (String.IsNullOrEmpty(addToSql))
                {
                    return GetMadebsByType(madebType);
                }

                string sql = String.Format(@"SELECT `tblmadeb`.`Id`,
                            `_Id`,
                            `nFormNumber`,
                            `sGBID`,
                            `nMadebTypeID`,
                            `sName`,
                            `sFathersName`,
                            `nAuthRegionID`,
                            `dtReceived`,
                            `dtIssueAction`,
                            `nIssuedOrNotID`,
                            `nType`,
                            `sChangeField`,
                            `sOfficeOfTibetan`,
                            `sDocumentAttached`,
                            `nCurrentGBSno`,
                            `nPreviousGBSno`,
                            `nSaneyFormNo`,
                            `nReceiptNo`,
                            `dtEmailSend`,
                            `sAlias`,
                            `sApprovedReject`,
                            `dtReject`,
                            `dtReturnEmail`,
                            `tblmadeb`.`dtEntered`,
                            `tblmadeb`.`nEnteredBy`,
                            `tblmadeb`.`dtUpdated`,
                            `tblmadeb`.`nUpdatedBy`,
                            `sAuthRegion`,
                            `sTypeIssued`, 
                            `lstmadebstatus`.`sMadebStatus`,
                            `tblmadeb`.`nMadebStatusID`,
                            `sMadebStatusRemark`
                        FROM `tblmadeb` 
                        LEFT JOIN 
                             `lstauthregion` ON `tblmadeb`.`nAuthRegionID` = `lstauthregion`.`ID`
                        LEFT JOIN 
                             `lsttypeissued` ON `tblmadeb`.`nIssuedOrNotID` = `lsttypeissued`.`Id`
                        LEFT JOIN 
                             `lstmadebstatus` ON `tblmadeb`.`nMadebStatusID` = `lstmadebstatus`.`ID`
                        WHERE {0} 
                             `nMadebTypeID`= @madebType 
                        LIMIT 
                             @limit;", addToSql);
                command.CommandText = sql;
                command.Parameters.AddWithValue("madebType", madebType);
                command.Parameters.AddWithValue("limit", Convert.ToInt32(CTAConfigRepository.GetValueByKey("SelectTotalRecordCount")));
                return GetRecords(command);

            }
        }

        #endregion

        #region Custom Common Search
        public async Task<IEnumerable<MadebAuthRegionVM>> SearchMadebsAlternate(string a, int madebType)
        {
            string addToSql = String.Empty;

            using (var command = new MySqlCommand())
            {
                string sql = @"SELECT `tblmadeb`.`Id`,
                            `_Id`,
                            `nFormNumber`,
                            `sGBID`,
                            `nMadebTypeID`,
                            `sName`,
                            `sFathersName`,
                            `nAuthRegionID`,
                            `dtReceived`,
                            `dtIssueAction`,
                            `nIssuedOrNotID`,
                            `nType`,
                            `sChangeField`,
                            `sOfficeOfTibetan`,
                            `sDocumentAttached`,
                            `nCurrentGBSno`,
                            `nPreviousGBSno`,
                            `nSaneyFormNo`,
                            `nReceiptNo`,
                            `dtEmailSend`,
                            `sAlias`,
                            `sApprovedReject`,
                            `dtReject`,
                            `dtReturnEmail`,
                            `tblmadeb`.`dtEntered`,
                            `tblmadeb`.`nEnteredBy`,
                            `tblmadeb`.`dtUpdated`,
                            `tblmadeb`.`nUpdatedBy`,
                            `sAuthRegion`,
                            `sTypeIssued`, 
                            `lstmadebstatus`.`sMadebStatus`,
                            `tblmadeb`.`nMadebStatusID`,
                            `sMadebStatusRemark`
                        FROM `tblmadeb` 
                        LEFT JOIN 
                             `lstauthregion` ON `tblmadeb`.`nAuthRegionID` = `lstauthregion`.`ID`
                        LEFT JOIN 
                             `lsttypeissued` ON `tblmadeb`.`nIssuedOrNotID` = `lsttypeissued`.`Id`
                        LEFT JOIN 
                             `lstmadebstatus` ON `tblmadeb`.`nMadebStatusID` = `lstmadebstatus`.`ID`
                        WHERE `nMadebTypeID`= @madebType AND (";

                var properties = typeof(MadebAuthRegionVM).GetProperties();
                foreach (var property in properties)
                {
                    if(property.Name == "madeb")
                    {

                        var madebprops = typeof(Madeb).GetProperties();
                        foreach(var prop in madebprops)
                        if (prop.Name != "dtEntered" && prop.Name != "nEnteredBy" && prop.Name != "dtUpdated" && prop.Name != "nUpdatedBy" && prop.Name != "Id" && prop.Name != "_id" && prop.Name != "nMadebTypeID" && prop.Name != "nAuthRegionID" && prop.Name != "nIssuedOrNotID" && prop.Name != "nType" && prop.Name != "nMadebStatusID")
                        {
                            addToSql += prop.Name + " LIKE @" + prop.Name + " OR ";
                            command.Parameters.AddWithValue(prop.Name, '%' + a + '%');
                        }
                    }
                    else
                    {
                        addToSql += property.Name + " LIKE @" + property.Name + " OR ";
                        command.Parameters.AddWithValue(property.Name, '%' + a + '%');
                    }
                    
                        
                }
                
                addToSql = addToSql.Substring(0, (addToSql.Length - 3));
                sql += addToSql + ") LIMIT @limit ;";
                int limit = Convert.ToInt32(CTAConfigRepository.GetValueByKey("MadebLoadSearchRecordsNumber"));
                command.Parameters.AddWithValue("limit", limit);

                command.CommandText = sql;
                command.Parameters.AddWithValue("madebType", madebType);
                command.Connection = _connection;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                await mySqlDataAdapter.FillAsync(ds);
                DataTableCollection tables = ds.Tables;
                IEnumerable<MadebAuthRegionVM> result = tables[0].AsEnumerable().Select(row => new MadebAuthRegionVM
                {
                    madeb = new Madeb
                    {
                        Id = row.Field<int>("Id"),
                        _id = row.Field<int?>("_Id"),
                        nFormNumber = row.Field<int>("nFormNumber"),
                        sGBID = row.Field<string>("sGBID"),
                        nMadebTypeID = row.Field<int>("nMadebTypeID"),
                        sName = row.Field<string>("sName"),
                        sFathersName = row.Field<string>("sFathersName"),
                        nAuthRegionID = row.Field<int>("nAuthRegionID"),
                        dtReceived = row.Field<DateTime?>("dtReceived"),
                        dtIssueAction = row.Field<DateTime?>("dtIssueAction"),
                        nIssuedOrNotID = row.Field<int?>("nIssuedOrNotID"),
                        nType = row.Field<int>("nType"),
                        sChangeField = row.Field<string>("sChangeField"),
                        sOfficeOfTibetan = row.Field<string>("sOfficeOfTibetan"),
                        sDocumentAttached = row.Field<string>("sDocumentAttached"),
                        nCurrentGBSno = row.Field<int?>("nCurrentGBSno"),
                        nPreviousGBSno = row.Field<int?>("nPreviousGBSno"),
                        nReceiptNo = row.Field<int?>("nReceiptNo"),
                        dtEmailSend = row.Field<DateTime?>("dtEmailSend"),
                        sAlias = row.Field<string>("sAlias"),
                        sApprovedReject = row.Field<string>("sApprovedReject"),
                        dtReject = row.Field<DateTime?>("dtReject"),
                        dtReturnEmail = row.Field<DateTime?>("dtReturnEmail"),
                        nMadebStatusID = row.Field<int?>("nMadebStatusID"),
                        sMadebStatusRemark = row.Field<string>("sMadebStatusRemark"),
                        //Common Props
                        dtEntered = row.Field<DateTime>("dtEntered"),
                        nEnteredBy = row.Field<int>("nEnteredBy"),
                        dtUpdated = row.Field<DateTime>("dtUpdated"),
                        nUpdatedBy = row.Field<int>("nUpdatedBy"),
                    },
                    sAuthRegion = row.Field<string>("sAuthRegion"),
                    sMadebStatus = row.Field<string>("sMadebStatus"),
                    sTypeIssued = row.Field<string>("sTypeIssued"),
                });
                //int records = ds.Tables[0].Rows.Count;
                //command.Parameters.AddWithValue("limit", Convert.ToInt32(CTAConfigRepository.GetValueByKey("SelectTotalRecordCount")));
                return result;
                //return GetRecords(command);
            }
        }
        #endregion

        #region Populate Madeb Records
        public override MadebAuthRegionVM PopulateRecord(MySqlDataReader reader)
        {
            return new MadebAuthRegionVM
            {
                madeb = _madebRepository.PopulateRecord(reader),
                sAuthRegion = reader.IsDBNull("sAuthRegion") ? null : (string) reader["sAuthRegion"],
                sTypeIssued = reader.IsDBNull("sTypeIssued") ? null : (string?)(reader["sTypeIssued"]),
                sMadebStatus = reader.IsDBNull("sMadebStatus") ? null : (string?)(reader["sMadebStatus"]),
            };
        }
        #endregion
    }
}
