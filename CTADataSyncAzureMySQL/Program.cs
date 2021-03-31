using MySql.Data.MySqlClient;
using System;
using System.Data;
using System.IO;
using System.Text;
using CTADBL.Services;

namespace CTADataSyncAzureMySQL
{
    class Program
    {
       
        static void Main(string[] args)
        {
            string strDB1AdminConnection = string.Empty;
            string strDB2ChatrelConnection = string.Empty;
            string strAdminDBName = string.Empty;
            string strChatrelDBName = string.Empty;
            string strLogPath = string.Empty;

            string dir = Directory.GetCurrentDirectory();
            string fullpath = dir +  "\\CTADataSyncConfig.txt";
            string[] ctaConfig = File.ReadAllLines(fullpath);
            
            for (int i = 0; i < ctaConfig.Length; i++)
            {
                string str = ctaConfig[i].ToString();
                string[] strSplit = str.Split(" : ");
                if (strSplit[0].ToString().Trim() == "DB1AdminConnection")
                {
                    strDB1AdminConnection = strSplit[1].ToString().Trim();
                }
                else if (strSplit[0].ToString().Trim() == "DB2ChatrelConnection")
                {
                    strDB2ChatrelConnection = strSplit[1].ToString().Trim();
                }
                else if (strSplit[0].ToString().Trim() == "AdminDBName")
                {
                    strAdminDBName = strSplit[1].ToString().Trim();
                }
                else if (strSplit[0].ToString().Trim() == "ChatrelDBName")
                {
                    strChatrelDBName = strSplit[1].ToString().Trim();
                }
                else if (strSplit[0].ToString().Trim() == "LogPath")
                {
                    strLogPath = strSplit[1].ToString().Trim();
                }
            }

            if (strDB1AdminConnection.Length > 0 &&
                strDB2ChatrelConnection.Length > 0 &&
                strAdminDBName.Length > 0 &&
                strChatrelDBName.Length > 0 &&
                strLogPath.Length > 0 
                )
            {
                DataSyncOperation.DataSyncDB(strDB1AdminConnection,
                           strDB2ChatrelConnection,
                           strAdminDBName,
                           strChatrelDBName,
                           strLogPath);
            }


            // Console.WriteLine("Hello World!");
            return;

        }


    }



     class DataSyncOperation
    {
        //const string insertString = "INSERT INTO `queryLabelTableName` ( queryLabelColumnNames ) SELECT queryLabelColumnNames FROM `queryLabelDBName`.`queryLabelTableName` WHERE `Id` in ( queryLabelIdValue ); ";
        //const string updateString = "UPDATE `queryLabelTableName` SET queryLabelColumnNames WHERE `Id` = queryLabelIdValue";
        //const string updateString = "UPDATE `queryLabelTableName` as `dest`, ( SELECT queryLabelColumnNames FROM `queryLabelDBName`. `queryLabelTableName` WHERE `id` = queryLabelIdValue ) AS `src` SET queryLabelUpdateColumnNames WHERE `dest`.`id` = queryLabelIdValue ; ";
        const string deleteString = "DELETE FROM `queryLabelTableName` WHERE `id` = queryLabelIdValue; ";

        const string insertString = "INSERT INTO `queryLabelTableName` ( queryLabelColumnNames ) VALUES ";
        const string updateString = "UPDATE `queryLabelTableName` as `dest` SET queryLabelUpdateColumnNames WHERE `dest`.`id` = queryLabelIdValue ; ";


        public static void DataSyncDB(string strDB1AdminConnection, string strDB2ChatrelConnection, string strAdminDBName, string strChatrelDBName, string strLogPath)
        {

            StringBuilder stringBuilderQuery = new StringBuilder();
            StringBuilder stringBuilderAudit = new StringBuilder();
            string sLogFolderPath = strLogPath;

            string strQuery = string.Empty;
            string connetionStringDB1 = null;
            string connetionStringDB2 = null;
            string DB1Name = strAdminDBName;
            string DB2Name = strChatrelDBName;
            MySqlConnection cnnDB1;
            MySqlConnection cnnDB2;
            connetionStringDB1 = strDB1AdminConnection;
            connetionStringDB2 = strDB2ChatrelConnection;

            DateTime dtMigrationDate = Convert.ToDateTime("10-02-2021 00:00:00");


            //lstChatrel Sync
            try
            {
                stringBuilderAudit.Append(Environment.NewLine + "Starting - " + DateTime.Now.ToString());

                cnnDB1 = new MySqlConnection(connetionStringDB1);
                cnnDB1.Open();


                cnnDB2 = new MySqlConnection(connetionStringDB2);
                cnnDB2.Open();

                stringBuilderAudit.Append(Environment.NewLine + "lstChatrel - Syncing Process....");
                //1. Sync Datatable - lstChatrel
                strQuery = Sync_lstChatrel_Table(cnnDB1, cnnDB2, DB1Name, DB2Name);
                if (strQuery != string.Empty) { stringBuilderQuery.AppendLine(strQuery); }
                strQuery = string.Empty;


                stringBuilderAudit.Append(Environment.NewLine + "lstAuthRegion - Syncing Process....");
                //2. Sync Datatable - lstAuthRegion
                strQuery = Sync_lstAuthRegion_Table(cnnDB1, cnnDB2, DB1Name, DB2Name);
                if (strQuery != string.Empty) { stringBuilderQuery.AppendLine(strQuery); }
                strQuery = string.Empty;

                stringBuilderAudit.Append(Environment.NewLine + "lstCountry - Syncing Process....");
                //3. Sync Datatable - lstCountry
                strQuery = Sync_lstCountry_Table(cnnDB1, cnnDB2, DB1Name, DB2Name);
                if (strQuery != string.Empty) { stringBuilderQuery.AppendLine(strQuery); }
                strQuery = string.Empty;


                stringBuilderAudit.Append(Environment.NewLine + "tblGreenbook - Syncing Process....");
                //4. Sync Datatable - tblGreenbook
                strQuery = Sync_tblGreenbook_Table(cnnDB1, cnnDB2, DB1Name, DB2Name);
                if (strQuery != string.Empty) { stringBuilderQuery.AppendLine(strQuery); }
                strQuery = string.Empty;



                stringBuilderAudit.Append(Environment.NewLine + "lnkGBChatrel - Syncing Process....");
                //5. Sync Datatable - lnkGBChatrel
                strQuery = Sync_lnkGBChatrel_Table(cnnDB1, cnnDB2, DB1Name, DB2Name, "Offline");
                if (strQuery != string.Empty) { stringBuilderQuery.AppendLine(strQuery); }
                strQuery = string.Empty;
                strQuery = Sync_lnkGBChatrel_Table(cnnDB2, cnnDB1, DB2Name, DB1Name, "Online");
                if (strQuery != string.Empty) { stringBuilderQuery.AppendLine(strQuery); }
                strQuery = string.Empty;

                stringBuilderAudit.Append(Environment.NewLine + "lnkGBChatrelDonation - Syncing Process....");
                //6. Sync Datatable - lnkGBChatrelDonation
                strQuery = Sync_lnkGBChatrelDonation_Table(cnnDB1, cnnDB2, DB1Name, DB2Name, "Offline");
                if (strQuery != string.Empty) { stringBuilderQuery.AppendLine(strQuery); }
                strQuery = string.Empty;
                strQuery = Sync_lnkGBChatrelDonation_Table(cnnDB2, cnnDB1, DB2Name, DB1Name, "Online");
                if (strQuery != string.Empty) { stringBuilderQuery.AppendLine(strQuery); }
                strQuery = string.Empty;


                stringBuilderAudit.Append(Environment.NewLine + "tblChatrelPayment - Syncing Process....");
                //7. Sync Datatable - tblChatrelPayment
                strQuery = Sync_tblChatrelPayment_Table(cnnDB1, cnnDB2, DB1Name, DB2Name, "Offline");
                if (strQuery != string.Empty) { stringBuilderQuery.AppendLine(strQuery); }
                strQuery = string.Empty;
                strQuery = Sync_tblChatrelPayment_Table(cnnDB2, cnnDB1, DB2Name, DB1Name, "Online");
                if (strQuery != string.Empty) { stringBuilderQuery.AppendLine(strQuery); }
                strQuery = string.Empty;



                //Updating the DB CTALastSyncDateTime value to now 
                string Querystring = "UPDATE `lstctaconfig` SET`sValue` = now(), `dtUpdated` = now() WHERE `sKey` = 'CTALastSyncDateTime'";
                executeQueryInDB(cnnDB1, Querystring);
                stringBuilderQuery.Append("CTALastSyncDateTime updated till " + DateTime.Now.ToString());

                stringBuilderAudit.Append(Environment.NewLine + "Sync the two Databases");
                stringBuilderAudit.Append(Environment.NewLine + "Ended - " + DateTime.Now.ToString());

                strQuery = string.Empty;

                cnnDB1.Close();
                cnnDB2.Close();

                File.AppendAllText(sLogFolderPath + "log-" + Guid.NewGuid().ToString() + ".txt", stringBuilderQuery.ToString());
                File.AppendAllText(sLogFolderPath + "Audit-" + Guid.NewGuid().ToString() + ".txt", stringBuilderAudit.ToString());
                stringBuilderQuery.Clear();

            }
            catch (Exception ex)
            {
                //email

                stringBuilderAudit.Append(ex.ToString());
                stringBuilderQuery.Append(strQuery);
                stringBuilderQuery.Append(ex.Message);
                File.AppendAllText(sLogFolderPath + "log-" + Guid.NewGuid().ToString() + ".txt", stringBuilderQuery.ToString());
                File.AppendAllText(sLogFolderPath + "Audit-" + Guid.NewGuid().ToString() + ".txt", stringBuilderAudit.ToString());
                stringBuilderQuery.Clear();
            }
        }

        #region Sync Datatables
        #region Sync lstChatrel
        public static string Sync_lstChatrel_Table(MySqlConnection cnnDB1, MySqlConnection cnnDB2, string db1Name, string db2Name)
        {
            string queryLabelTableName = "lstchatrel";
            string queryLabelColumnNames = "`lstchatrel`.`Id`,`lstchatrel`.`sChatrelKey`,`lstchatrel`.`nChatrelValue`,`lstchatrel`.`dtChatrelFrom`,`lstchatrel`.`dtEntered`,`lstchatrel`.`nEnteredBy`,`lstchatrel`.`dtUpdated`,`lstchatrel`.`nUpdatedBy`";

            //GenerateQueryAndExecute
            return GenerateQueryAndExecute(cnnDB1, cnnDB2, queryLabelColumnNames, queryLabelTableName, db1Name, db2Name);

        }
        #endregion

        #region Sync lstAuthRegion
        public static string Sync_lstAuthRegion_Table(MySqlConnection cnnDB1, MySqlConnection cnnDB2, string db1Name, string db2Name)
        {
            string queryLabelTableName = "lstauthregion";
            string queryLabelColumnNames = "`lstauthregion`.`ID`,`lstauthregion`.`sAuthRegion`,`lstauthregion`.`sCountryID`,`lstauthregion`.`sCurrencyCode`,`lstauthregion`.`dtEntered`,`lstauthregion`.`nEnteredBy`,`lstauthregion`.`dtUpdated`,`lstauthregion`.`nUpdatedBy`";

            //GenerateQueryAndExecute
            return GenerateQueryAndExecute(cnnDB1, cnnDB2, queryLabelColumnNames, queryLabelTableName, db1Name, db2Name);

        }
        #endregion

        #region Sync lstChatrelconfig  (N/A)
        //Not Present in Main Admin Database
        #endregion

        #region Sync lstCountry
        public static string Sync_lstCountry_Table(MySqlConnection cnnDB1, MySqlConnection cnnDB2, string db1Name, string db2Name)
        {
            string queryLabelTableName = "lstcountry";
            string queryLabelColumnNames = "`lstcountry`.`ID`,`lstcountry`.`sCountryID`,`lstcountry`.`sCountry`,`lstcountry`.`nDefaultAuthRegionID`,`lstcountry`.`dtEntered`,`lstcountry`.`nEnteredBy`,`lstcountry`.`dtUpdated`,`lstcountry`.`nUpdatedBy`";

            //GenerateQueryAndExecute
            return GenerateQueryAndExecute(cnnDB1, cnnDB2, queryLabelColumnNames, queryLabelTableName, db1Name, db2Name);

        }
        #endregion

        #region Sync lstRelation
        //public static string Sync_lstRelation_Table(MySqlConnection cnnDB1, MySqlConnection cnnDB2, string db1Name, string db2Name)
        //{
        //    string queryLabelTableName = "lstrelation";
        //    string queryLabelColumnNames = "`lstrelation`.`Id`,`lstrelation`.`sRelation`,`lstrelation`.`dtEntered`,`lstrelation`.`nEnteredBy`,`lstrelation`.`dtUpdated`,`lstrelation`.`nUpdatedBy`";

        //    //GenerateQueryAndExecute
        //    return GenerateQueryAndExecute(cnnDB1, cnnDB2, queryLabelColumnNames, queryLabelTableName, db1Name, db2Name);

        //}
        #endregion

        #region Sync tblGreenbook
        public static string Sync_tblGreenbook_Table(MySqlConnection cnnDB1, MySqlConnection cnnDB2, string db1Name, string db2Name)
        {
            string queryLabelTableName = "tblgreenbook";
            string queryLabelColumnNames = "`tblgreenbook`.`Id`,`tblgreenbook`.`sGBID`,`tblgreenbook`.`nAuthRegionID`,`tblgreenbook`.`sFirstName`,`tblgreenbook`.`sLastName`," +
                "`tblgreenbook`.`dtDOB`,`tblgreenbook`.`sEmail`,`tblgreenbook`.`sPhone`,`tblgreenbook`.`dtDeceased`,`tblgreenbook`.`sCountryID`," +
                "`tblgreenbook`.`sLoginGmail`,`tblgreenbook`.`dtEntered`,`tblgreenbook`.`nEnteredBy`,`tblgreenbook`.`dtUpdated`," +
                "`tblgreenbook`.`nUpdatedBy`";
            string changeGBIds = GetLastUpdatedRecordsIDs(cnnDB1, "tblgreenbook", "sGBId");
            string strWhereclause = string.Empty;
            if (changeGBIds != string.Empty)
            {
                strWhereclause = " where sGBId in (" + changeGBIds + ") ";
            }
            else
            {
                strWhereclause = "No WhereClause";
            }

            //string strWhereclause = " where sGBId in ('" + GetLastSyncDateTime(cnnDB1, "lstctaconfig", "CTALastSyncDateTime") + "' ";
            //string strWhereclause = " where sgbid='86'";

            if (strWhereclause != "No WhereClause")
            {
                //GenerateQueryAndExecute
                return GenerateUpdateQueryAndExecuteBothDB(cnnDB1, cnnDB2, queryLabelColumnNames, queryLabelTableName, db1Name, db2Name, strWhereclause);
            }
            else
            {
                return string.Empty;
            }

        }
        #endregion

        #region Sync lnkGBChildren
        //public static string Sync_lnkGBChildren_Table(MySqlConnection cnnDB1, MySqlConnection cnnDB2, string db1Name, string db2Name)
        //{
        //    string queryLabelTableName = "lnkgbchildren";
        //    string queryLabelColumnNames = "`lnkgbchildren`.`Id`,`lnkgbchildren`.`sGBIDParent`,`lnkgbchildren`.`sName`,`lnkgbchildren`.`dtDOB`,`lnkgbchildren`.`sGender`,`lnkgbchildren`.`sChildID`,`lnkgbchildren`.`sGBIDChild`,"
        //            + "`lnkgbchildren`.`dtEntered`,`lnkgbchildren`.`nEnteredBy`,`lnkgbchildren`.`dtUpdated`,`lnkgbchildren`.`nUpdatedBy`";

        //    //GenerateQueryAndExecute
        //    return GenerateQueryAndExecute(cnnDB1, cnnDB2, queryLabelColumnNames, queryLabelTableName, db1Name, db2Name);


        //}
        #endregion

        #region Sync lnkGBFileDispute  (N/A)
        #endregion

        #region Sync lnkGBRelation
        //public static string Sync_lnkGBRelation_Table(MySqlConnection cnnDB1, MySqlConnection cnnDB2, string db1Name, string db2Name)
        //{
        //    string queryLabelTableName = "lnkgbrelation";
        //    string queryLabelColumnNames = "`lnkgbrelation`.`Id`,`lnkgbrelation`.`sGBID`,`lnkgbrelation`.`sGBIDRelation`,`lnkgbrelation`.`nRelationID`,`lnkgbrelation`.`dtEntered`,`lnkgbrelation`.`nEnteredBy`,"
        //            + "`lnkgbrelation`.`dtUpdated`,`lnkgbrelation`.`nUpdatedBy`";

        //    //GenerateQueryAndExecute
        //    return GenerateQueryAndExecute(cnnDB1, cnnDB2, queryLabelColumnNames, queryLabelTableName, db1Name, db2Name);

        //}
        #endregion

        #region Sync tblactionlogger (N/A)
        #endregion

        #region Sync tblauditlog (N/A)
        #endregion

        #region Sync lnkGBChatrelDonation
        public static string Sync_lnkGBChatrelDonation_Table(MySqlConnection cnnDB1, MySqlConnection cnnDB2, string db1Name, string db2Name, string sPaymentMode)
        {
            string queryLabelTableName = "lnkgbchatreldonation";
            string queryLabelColumnNames = "`lnkgbchatreldonation`.`Id`,`lnkgbchatreldonation`.`chatrelpaymentID`,`lnkgbchatreldonation`.`sGBId`,`lnkgbchatreldonation`.`nChatrelAdditionalDonationAmt`,`lnkgbchatreldonation`.`nChatrelBusinessDonationAmt`,"
                    + "`lnkgbchatreldonation`.`sChatrelReceiptNumber`,`lnkgbchatreldonation`.`nAuthRegionID`,`lnkgbchatreldonation`.`sCountryID`,`lnkgbchatreldonation`.`sPaymentCurrency`,`lnkgbchatreldonation`.`sAuthRegionCurrency`,"
                    + "`lnkgbchatreldonation`.`nConversionRate`,`lnkgbchatreldonation`.`sPaidByGBId`,`lnkgbchatreldonation`.`dtPayment`,`lnkgbchatreldonation`.`dtEntered`,`lnkgbchatreldonation`.`nEnteredBy`,"
                    + "`lnkgbchatreldonation`.`dtUpdated`,`lnkgbchatreldonation`.`nUpdatedBy`";
            string strWhereclause = " inner join tblchatrelpayment on tblchatrelpayment.ID = lnkgbchatreldonation.chatrelpaymentID Where tblchatrelpayment.sPaymentMode = '" + sPaymentMode + "'";

            //GenerateQueryAndExecute
            return GenerateQueryAndExecute(cnnDB1, cnnDB2, queryLabelColumnNames, queryLabelTableName, db1Name, db2Name, strWhereclause);

        }
        #endregion

        #region Sync lnkGBChatrel
        public static string Sync_lnkGBChatrel_Table(MySqlConnection cnnDB1, MySqlConnection cnnDB2, string db1Name, string db2Name, string sPaymentMode)
        {

            string queryLabelTableName = "lnkgbchatrel";
            string queryLabelColumnNames = "`lnkgbchatrel`.`Id`,`lnkgbchatrel`.`chatrelpaymentID`,`lnkgbchatrel`.`sGBId`,`lnkgbchatrel`.`nChatrelAmount`,`lnkgbchatrel`.`nChatrelMeal`,`lnkgbchatrel`.`nChatrelYear`,"
                    + "`lnkgbchatrel`.`nChatrelLateFeesPercentage`,`lnkgbchatrel`.`nChatrelLateFeesValue`,`lnkgbchatrel`.`nArrearsAmount`,`lnkgbchatrel`.`dtArrearsFrom`,`lnkgbchatrel`.`dtArrearsTo`,"
                    + "`lnkgbchatrel`.`nCurrentChatrelSalaryAmt`,`lnkgbchatrel`.`dtCurrentChatrelFrom`,`lnkgbchatrel`.`dtCurrentChatrelTo`,`lnkgbchatrel`.`nChatrelTotalAmount`,`lnkgbchatrel`.`sChatrelReceiptNumber`,"
                    + "`lnkgbchatrel`.`nAuthRegionID`,`lnkgbchatrel`.`sCountryID`,`lnkgbchatrel`.`sPaymentCurrency`,`lnkgbchatrel`.`sAuthRegionCurrency`,`lnkgbchatrel`.`nConversionRate`,`lnkgbchatrel`.`sPaidByGBId`,"
                    + "`lnkgbchatrel`.`dtPayment`,`lnkgbchatrel`.`dtEntered`,`lnkgbchatrel`.`nEnteredBy`,`lnkgbchatrel`.`dtUpdated`,`lnkgbchatrel`.`nUpdatedBy`";
            string strWhereclause = " inner join tblchatrelpayment on tblchatrelpayment.ID = lnkgbchatrel.chatrelpaymentID Where tblchatrelpayment.sPaymentMode = '" + sPaymentMode + "'";

            //GenerateQueryAndExecute
            return GenerateQueryAndExecute(cnnDB1, cnnDB2, queryLabelColumnNames, queryLabelTableName, db1Name, db2Name, strWhereclause);
        }
        #endregion

        #region Sync tblChatrelPayment
        public static string Sync_tblChatrelPayment_Table(MySqlConnection cnnDB1, MySqlConnection cnnDB2, string db1Name, string db2Name, string sPaymentMode)
        {

            string queryLabelTableName = "tblchatrelpayment";
            string queryLabelColumnNames = "`tblchatrelpayment`.`Id`,`tblchatrelpayment`.`sGBId`,`tblchatrelpayment`.`nChatrelYear`,`tblchatrelpayment`.`nChatrelTotalAmount`,`tblchatrelpayment`.`sChatrelReceiptNumber`,"
                    + "`tblchatrelpayment`.`sPaymentStatus`,`tblchatrelpayment`.`sPaymentMode`,`tblchatrelpayment`.`sPaymentCurrency`,`tblchatrelpayment`.`sPaidByGBId`,`tblchatrelpayment`.`sPayPal_Status`,"
                    + "`tblchatrelpayment`.`sPayPal_ID`,`tblchatrelpayment`.`sPayPal_Currency_Code`,`tblchatrelpayment`.`sPayPal_Currency_Value`,`tblchatrelpayment`.`sPayPal_Response_Object`,`tblchatrelpayment`.`dtPayment`,"
                    + "`tblchatrelpayment`.`dtEntered`,`tblchatrelpayment`.`nEnteredBy`,`tblchatrelpayment`.`dtUpdated`,`tblchatrelpayment`.`nUpdatedBy`";
            string strWhereclause = " Where sPaymentMode = '" + sPaymentMode + "'";

            //ExecuteForUpdateTblGreenbook
            ExecuteForUpdateTblGreenbook(cnnDB1, cnnDB2, queryLabelColumnNames, queryLabelTableName, db1Name, db2Name, strWhereclause);

            //GenerateQueryAndExecute
            return GenerateQueryAndExecute(cnnDB1, cnnDB2, queryLabelColumnNames, queryLabelTableName, db1Name, db2Name, strWhereclause);


        }
        #endregion

        #endregion

        #region Common methods

        public static string GetLastSyncDateTime(MySqlConnection cnnDB1, string queryLabelTableName, string keywordForSyncDateTime)
        {

            string queryDB1 = "SELECT sKey, sValue FROM `" + queryLabelTableName + "` where sKey='" + keywordForSyncDateTime + "' ";
            MySqlDataAdapter returnValDB1 = new MySqlDataAdapter(queryDB1, cnnDB1);
            DataTable dtDB1 = new DataTable(queryLabelTableName);
            returnValDB1.Fill(dtDB1);

            if (dtDB1 != null && dtDB1.Rows.Count > 0)
            {
                return dtDB1.Rows[0]["sValue"].ToString();
            }
            else
            {
                return DateTime.Today.AddDays(-2).ToString();
            }


        }

        public static string SetLastSyncDateTime(MySqlConnection cnnDB1, string queryLabelTableName, string keywordForSyncDateTime)
        {

            string queryDB1 = "SELECT sKey, sValue FROM `" + queryLabelTableName + "` where sKey='" + keywordForSyncDateTime + "' ";
            MySqlDataAdapter returnValDB1 = new MySqlDataAdapter(queryDB1, cnnDB1);
            DataTable dtDB1 = new DataTable(queryLabelTableName);
            returnValDB1.Fill(dtDB1);

            if (dtDB1 != null && dtDB1.Rows.Count > 0)
            {
                return dtDB1.Rows[0]["sValue"].ToString();
            }
            else
            {
                return DateTime.Today.AddDays(-2).ToString();
            }


        }

        public static string GetLastUpdatedRecordsIDs(MySqlConnection cnnDB1, string queryLabelTableName, string queryLabelIDColumnName)
        {
            string Ids = string.Empty;

            string queryDB1 = "SELECT " + queryLabelIDColumnName + " FROM `" + queryLabelTableName + "` ";
            queryDB1 += " where dtUpdated > '" + GetLastSyncDateTime(cnnDB1, "lstctaconfig", "CTALastSyncDateTime") + "' ";
            MySqlDataAdapter returnValDB1 = new MySqlDataAdapter(queryDB1, cnnDB1);
            DataTable dtDB1 = new DataTable(queryLabelTableName);
            returnValDB1.Fill(dtDB1);

            if (dtDB1 != null && dtDB1.Rows.Count > 0)
            {
                foreach (DataRow row in dtDB1.Rows)
                {
                    if (Ids == string.Empty)
                    {
                        Ids = "'" + row[queryLabelIDColumnName].ToString() + "'";
                    }
                    else
                    {
                        Ids += ", '" + row[queryLabelIDColumnName].ToString() + "'";
                    }

                }
                return Ids;
            }
            else
            {
                return string.Empty;
            }


        }
        public static string ExecuteForUpdateTblGreenbook(MySqlConnection cnnDB1, MySqlConnection cnnDB2, string queryLabelColumnNames, string queryLabelTableName, string db1Name, string db2Name, string optionalWhereClause = "No WhereClause")
        {
            string insertIdsCommaSeperated = string.Empty;
            string updateIdsCommaSeperated = string.Empty;
            string deleteIdsCommaSeperated = string.Empty;
            string insertQuery = string.Empty;
            string updateQuery = string.Empty;
            string deleteQuery = string.Empty;
            string strQuerys = string.Empty;
            //string DB1Name = textBoxAdminDBName.Text;
            //string DB2Name = textBoxChatrelDBName.Text;

            string queryDB1 = "SELECT " + queryLabelColumnNames + " FROM `" + queryLabelTableName + "` ";
            if (optionalWhereClause != "No WhereClause") { queryDB1 += optionalWhereClause; }
            MySqlDataAdapter returnValDB1 = new MySqlDataAdapter(queryDB1, cnnDB1);
            DataTable dtDB1 = new DataTable(queryLabelTableName);
            returnValDB1.Fill(dtDB1);

            string queryDB2 = "SELECT " + queryLabelColumnNames + " FROM `" + queryLabelTableName + "` ";
            if (optionalWhereClause != "No WhereClause") { queryDB2 += optionalWhereClause; }
            MySqlDataAdapter returnValDB2 = new MySqlDataAdapter(queryDB2, cnnDB2);
            DataTable dtDB2 = new DataTable("c" + queryLabelTableName);
            returnValDB2.Fill(dtDB2);

            if (AreTablesTheSame(dtDB1, dtDB2))
            {
                //log with no changes
            }
            else
            {

                //getDifferentRecords(string resultName, DataTable FirstDataTable, DataTable SecondDataTable, bool Return1st)
                //When Return1st is true: ResultDataTable contains Adds Or Updates found in SecondDataTable as compared to FirstDataTable
                //When Return1st is false: ResultDataTable contains Deletes Or Updates found in FirstDataTable as compared to SecondDataTable

                DataTable dtAddedEditedRecords = getDifferentRecords("ResultSet", dtDB1, dtDB2, true);


                //log the difference in records
                //create database script for changing in Chatrel Database
                if (dtAddedEditedRecords != null && dtAddedEditedRecords.Rows.Count > 0)
                {
                    insertIdsCommaSeperated = getIdsAndUpdateTblGreenBook(cnnDB2, dtAddedEditedRecords, db2Name, queryLabelTableName, queryLabelColumnNames);

                }

                //Execute Database Script
                if (insertIdsCommaSeperated != string.Empty)
                {
                    strQuerys += executeInsertQueryByIds(cnnDB2, queryLabelTableName, queryLabelColumnNames, db1Name, insertIdsCommaSeperated, dtDB1);
                }


            }
            return strQuerys;
        }


        public static string GenerateQueryAndExecute(MySqlConnection cnnDB1, MySqlConnection cnnDB2, string queryLabelColumnNames, string queryLabelTableName, string db1Name, string db2Name, string optionalWhereClause = "No WhereClause")
        {
            string insertIdsCommaSeperated = string.Empty;
            string updateIdsCommaSeperated = string.Empty;
            string deleteIdsCommaSeperated = string.Empty;
            string insertQuery = string.Empty;
            string updateQuery = string.Empty;
            string deleteQuery = string.Empty;
            string strQuerys = string.Empty;
            //string DB1Name = textBoxAdminDBName.Text;
            //string DB2Name = textBoxChatrelDBName.Text;

            string queryDB1 = "SELECT " + queryLabelColumnNames + " FROM `" + queryLabelTableName + "` ";
            if (optionalWhereClause != "No WhereClause") { queryDB1 += optionalWhereClause; }
            MySqlDataAdapter returnValDB1 = new MySqlDataAdapter(queryDB1, cnnDB1);
            DataTable dtDB1 = new DataTable(queryLabelTableName);
            returnValDB1.Fill(dtDB1);

            string queryDB2 = "SELECT " + queryLabelColumnNames + " FROM `" + queryLabelTableName + "` ";
            if (optionalWhereClause != "No WhereClause") { queryDB2 += optionalWhereClause; }
            MySqlDataAdapter returnValDB2 = new MySqlDataAdapter(queryDB2, cnnDB2);
            DataTable dtDB2 = new DataTable("c" + queryLabelTableName);
            returnValDB2.Fill(dtDB2);

            if (AreTablesTheSame(dtDB1, dtDB2))
            {
                //log with no changes
            }
            else
            {

                //getDifferentRecords(string resultName, DataTable FirstDataTable, DataTable SecondDataTable, bool Return1st)
                //When Return1st is true: ResultDataTable contains Adds Or Updates found in SecondDataTable as compared to FirstDataTable
                //When Return1st is false: ResultDataTable contains Deletes Or Updates found in FirstDataTable as compared to SecondDataTable

                DataTable dtAddedEditedRecords = getDifferentRecords("ResultSet", dtDB1, dtDB2, true);
                DataTable dtDeletedRecords = getDifferentRecords("ResultSet", dtDB1, dtDB2, false);

                //log the difference in records
                //create database script for changing in Chatrel Database
                if (dtAddedEditedRecords != null && dtAddedEditedRecords.Rows.Count > 0)
                {
                    insertIdsCommaSeperated = getInsertIdsCommaSeprated(cnnDB2, dtAddedEditedRecords, db2Name, queryLabelTableName, queryLabelColumnNames);
                    updateIdsCommaSeperated = getUpdateIdsCommaSeprated(cnnDB2, dtAddedEditedRecords, db2Name, queryLabelTableName, queryLabelColumnNames);
                }

                if (dtDeletedRecords != null && dtDeletedRecords.Rows.Count > 0)
                {
                    deleteIdsCommaSeperated = getDeleteIdsCommaSeprated(cnnDB1, dtDeletedRecords, db1Name, queryLabelTableName, queryLabelColumnNames);
                }

                //Execute Database Script
                if (insertIdsCommaSeperated != string.Empty)
                {
                    strQuerys += executeInsertQueryByIds(cnnDB2, queryLabelTableName, queryLabelColumnNames, db1Name, insertIdsCommaSeperated, dtDB1);

                }
                if (updateIdsCommaSeperated != string.Empty)
                {
                    strQuerys += executeUpdateQueryByIds(cnnDB2, queryLabelTableName, queryLabelColumnNames, db1Name, updateIdsCommaSeperated, dtDB1);
                }
                if (deleteIdsCommaSeperated != string.Empty)
                {
                    strQuerys += executeDeleteQueryByIds(cnnDB2, queryLabelTableName, deleteIdsCommaSeperated);
                }

            }
            return strQuerys;
        }

        public static bool AreTablesTheSame(DataTable tbl1, DataTable tbl2)
        {
            if (tbl1.Rows.Count != tbl2.Rows.Count || tbl1.Columns.Count != tbl2.Columns.Count)
                return false;


            for (int i = 0; i < tbl1.Rows.Count; i++)
            {
                for (int c = 0; c < tbl1.Columns.Count; c++)
                {
                    if (!Equals(tbl1.Rows[i][c], tbl2.Rows[i][c]))
                        return false;
                }
            }
            return true;
        }


        #region Compare two DataTables and return a DataTable with DifferentRecords   
        public static DataTable getDifferentRecords(string resultName, DataTable FirstDataTable, DataTable SecondDataTable, bool Return1st)
        {
            ////Create Empty Table
            DataTable ResultDataTable = new DataTable(resultName);
            //Create Empty Table   
            //DataTable ResultDataTable = new DataTable("ResultDataTable");

            //use a Dataset to make use of a DataRelation object   
            using (DataSet ds = new DataSet())
            {
                //Add tables   
                ds.Tables.AddRange(new DataTable[] { FirstDataTable.Copy(), SecondDataTable.Copy() });

                //Get Columns for DataRelation   
                DataColumn[] firstColumns = new DataColumn[ds.Tables[0].Columns.Count];
                for (int i = 0; i < firstColumns.Length; i++)
                {
                    firstColumns[i] = ds.Tables[0].Columns[i];
                }

                DataColumn[] secondColumns = new DataColumn[ds.Tables[1].Columns.Count];
                for (int i = 0; i < secondColumns.Length; i++)
                {
                    secondColumns[i] = ds.Tables[1].Columns[i];
                }

                //Create DataRelation   
                DataRelation r1 = new DataRelation(string.Empty, firstColumns, secondColumns, false);
                ds.Relations.Add(r1);

                DataRelation r2 = new DataRelation(string.Empty, secondColumns, firstColumns, false);
                ds.Relations.Add(r2);

                //Create columns for return table   
                for (int i = 0; i < FirstDataTable.Columns.Count; i++)
                {
                    ResultDataTable.Columns.Add(FirstDataTable.Columns[i].ColumnName, FirstDataTable.Columns[i].DataType);
                }

                //If FirstDataTable Row not in SecondDataTable, Add to ResultDataTable.   
                ResultDataTable.BeginLoadData();
                if (Return1st)
                    foreach (DataRow parentrow in ds.Tables[0].Rows)
                    {
                        DataRow[] childrows = parentrow.GetChildRows(r1);
                        if (childrows == null || childrows.Length == 0)
                            ResultDataTable.LoadDataRow(parentrow.ItemArray, true);
                    }
                else
                    //If SecondDataTable Row not in FirstDataTable, Add to ResultDataTable.
                    foreach (DataRow parentrow in ds.Tables[1].Rows)
                    {
                        DataRow[] childrows = parentrow.GetChildRows(r2);
                        if (childrows == null || childrows.Length == 0)
                        {
                            DataRow[] rows = ds.Tables[0].Select("ID = " + parentrow.ItemArray[0]);
                            if (rows == null || rows.Length == 0)
                            {
                                //Only add if the record is deleted from FirstDataTable
                                ResultDataTable.LoadDataRow(parentrow.ItemArray, true);
                            }
                        }
                    }

                ResultDataTable.EndLoadData();
            }

            return ResultDataTable;
        }

        #endregion


        public static string executeInsertQueryByIds(MySqlConnection cnnDB
                                            , string queryLabelTableName
                                            , string queryLabelColumnNames
                                            , string queryLabelDBName
                                            , string queryLabelIdValue
                                            , DataTable db1tbl
                                        )
        {
            string strInsertString = insertString;
            strInsertString = strInsertString.Replace("queryLabelTableName", queryLabelTableName);
            strInsertString = strInsertString.Replace("queryLabelColumnNames", queryLabelColumnNames);

            strInsertString = strInsertString.Replace("queryLabelDBName", queryLabelDBName);
            strInsertString = strInsertString.Replace("queryLabelIdValue", queryLabelIdValue);
            strInsertString += generateInsertValuesFromQueryString( queryLabelColumnNames,  queryLabelIdValue,  db1tbl);

            executeQueryInDB(cnnDB, strInsertString);
            return strInsertString;
        }

        public static string generateInsertValuesFromQueryString(string queryLabelColumnNames, string queryLabelIdValue , DataTable db1tbl)
        {
            string[] strAColumns = queryLabelColumnNames.Split(',');
            string[] strIdValues = queryLabelIdValue.Split(',');
            string insertValues = string.Empty;
            DateTime dtResult;

            foreach (string item in strIdValues)
            {
                string expression = "Id =" + item.Trim();
                DataRow[] selectedRows = db1tbl.Select(expression);
                string insertTempValues = string.Empty;
                if (insertValues == string.Empty)
                {
                    insertValues = "("; 
                }
                else
                {
                    insertValues += ",(";
                }

                foreach (DataColumn strColumn in db1tbl.Columns)
                {
                    // insertValues += selectedRows[strColumn].ToString();
                    //string strColumnname = strColumn;
                    //strColumnname = strColumnname.Replace(db1tbl)


                    if (strColumn.ColumnName.StartsWith("dt"))
                    {
                        if (DateTime.TryParse(selectedRows[0][strColumn.ColumnName].ToString(), out dtResult))
                        {
                            insertTempValues = dtResult.ToString("yyyy-MM-dd HH:mm:ss");
                        }
                        else
                        {
                            insertTempValues = "";
                        }

                    }
                    else
                    {
                        insertTempValues = selectedRows[0][strColumn.ColumnName].ToString();
                    }


                    if (strColumn.ColumnName.StartsWith("s") || strColumn.ColumnName.StartsWith("dt"))
                    {
                        //if ColumnName is sFirstName Or sLastName then replace the insertTempValues with encrypted data
                        if (strColumn.ColumnName.Trim() == "sFirstName" || strColumn.ColumnName.Trim() == "sLastName")
                        {
                            insertTempValues = getEncryptedValuesByActualData(insertTempValues);
                        }

                        if (insertTempValues != "")
                        {
                            insertValues += "'" + insertTempValues + "'";
                        }
                        else
                        {
                            insertValues += "null";
                        }
                    }
                    else
                    {
                        
                        if (insertTempValues != "")
                        {
                            insertValues += insertTempValues;
                        }
                        else
                        {
                            insertValues += "null";
                        }
                    }
                    insertValues += ",";
                }
                insertValues = insertValues.Substring(0, insertValues.Length - 1);
                insertValues += ")";
            }
            insertValues += ";";



            return insertValues;
        }

        private static string getEncryptedValuesByActualData(string insertTempValues)
        {
            //return insertTempValues;
            return DataEncryption.EncryptString(insertTempValues,"@TiD#nC^A3,zD69#]qX");
        }

        public static string executeUpdateQueryByIds(MySqlConnection cnnDB
                                            , string queryLabelTableName
                                            , string queryLabelColumnNames
                                            , string queryLabelDBName
                                            , string queryLabelIdValue
                                            , DataTable db1tbl
                                        )
        {
            string updatecols = string.Empty;
            string strUpdateQueryStrings = string.Empty;
            string strUpdateQuery = updateString;
            string[] strAColumns = queryLabelColumnNames.Split(',');
            string[] strIdValues = queryLabelIdValue.Split(',');
            DateTime dtResult;
            string updateValue = string.Empty;

            foreach (var Ids in strIdValues)
            {
                string expression = "Id =" + Ids.Trim();
                DataRow[] selectedRows = db1tbl.Select(expression);
                string updateTempValues = string.Empty;

                foreach (DataColumn strColumn in db1tbl.Columns)
                {
                    if (strColumn.ColumnName.StartsWith("dt"))
                    {
                        if (DateTime.TryParse(selectedRows[0][strColumn.ColumnName].ToString(), out dtResult))
                        {
                            updateTempValues = dtResult.ToString("yyyy-MM-dd HH:mm:ss");
                        }
                        else
                        {
                            updateTempValues = "";
                        }

                    }
                    else
                    {
                        updateTempValues = selectedRows[0][strColumn.ColumnName].ToString();
                    }

                    if (strColumn.ColumnName.StartsWith("s") || strColumn.ColumnName.StartsWith("dt"))
                    {
                        //if ColumnName is sFirstName Or sLastName then replace the updateTempValues with encrypted data
                        if (strColumn.ColumnName.Trim() == "sFirstName" || strColumn.ColumnName.Trim() == "sLastName")
                        {
                            updateTempValues = getEncryptedValuesByActualData(updateTempValues);
                        }

                        if (updateTempValues != "" )
                        {
                            updateValue = "'" + updateTempValues + "'";
                        }
                        else
                        {
                            updateValue = "null";
                        }
                    }
                    else
                    {
                        if (updateTempValues != "")
                        {
                            updateValue = updateTempValues; 
                        }
                        else
                        {
                            updateValue = "null";
                        }
                    }

                    if (updatecols == string.Empty)
                    {
                        updatecols = "`dest`.`" + strColumn.ColumnName + "` = " + updateValue;
                    }
                    else
                    {
                        updatecols += ", `dest`.`" + strColumn.ColumnName + "` = " + updateValue;
                    }


                    //if (updatecols == string.Empty)
                    //{
                    //    updatecols = col.Replace(queryLabelTableName, "dest") + " = " + col.Replace(queryLabelTableName, "src");
                    //}
                    //else
                    //{
                    //    updatecols += ", " + col.Replace(queryLabelTableName, "dest") + " = " + col.Replace(queryLabelTableName, "src");
                    //}

                }

                strUpdateQuery = updateString.Replace("queryLabelTableName", queryLabelTableName);
                strUpdateQuery = strUpdateQuery.Replace("queryLabelColumnNames", queryLabelColumnNames);
                strUpdateQuery = strUpdateQuery.Replace("queryLabelUpdateColumnNames", updatecols);
                //strUpdateQuery = strUpdateQuery.Replace("queryLabelDBName", queryLabelDBName);
                strUpdateQuery = strUpdateQuery.Replace("queryLabelIdValue", Ids);

                executeQueryInDB(cnnDB, strUpdateQuery);
                strUpdateQueryStrings += strUpdateQuery;


            }

            //Logging all Update Strings

            return strUpdateQueryStrings;

        }


        public static string executeDeleteQueryByIds(MySqlConnection cnnDB, string queryLabelTableName
                                            , string queryLabelIdValue
                                        )
        {
            string deletecols = string.Empty;
            string strDeleteQueryStrings = string.Empty;
            string strDeleteQuery = deleteString;
            string[] strIdValues = queryLabelIdValue.Split(',');
            foreach (var Ids in strIdValues)
            {

                strDeleteQuery = deleteString.Replace("queryLabelTableName", queryLabelTableName);
                strDeleteQuery = strDeleteQuery.Replace("queryLabelIdValue", Ids);
                // strUpdateQuery += "; ";

                executeQueryInDB(cnnDB, strDeleteQuery);
                strDeleteQueryStrings += strDeleteQuery;

            }

            //Logging
            return strDeleteQueryStrings;
        }

        public static void executeQueryInDB(MySqlConnection DBConn, string strQuery)
        {
            MySqlCommand MyCommand2 = new MySqlCommand(strQuery, DBConn);
            MySqlDataReader MyReader2;
            MyReader2 = MyCommand2.ExecuteReader();
            while (MyReader2.Read())
            {
            }
            MyReader2.Close();
        }

        #region getIdsAndUpdateTblGreenBook
        public static string getIdsAndUpdateTblGreenBook(MySqlConnection dbConn, DataTable addEditRecords, string dbName, string queryLabelTableName, string queryLabelColumnNames)
        {

            string Ids = getIDsCommaSeperated(addEditRecords);
            string insertIds = string.Empty;

            string queryDB = "SELECT " + queryLabelColumnNames + " FROM `" + queryLabelTableName + "` where `Id` in (" + Ids + ")";
            MySqlDataAdapter returnValDB1 = new MySqlDataAdapter(queryDB, dbConn);
            DataTable dtDB = new DataTable("TableUpdatedRecords");
            returnValDB1.Fill(dtDB);

            string updateIds = getIDsCommaSeperated(dtDB);

            if (updateIds != "")
            {
                DataView dv = new DataView(addEditRecords);
                dv.RowFilter = "Id not in (" + updateIds + ")";

                insertIds = getIDsCommaSeperated(dv.ToTable());
            }
            else
            {
                if (dtDB != null && dtDB.Rows.Count > 0)
                {
                    insertIds = getIDsCommaSeperated(dtDB);
                }
                else
                {
                    insertIds = Ids;
                }
            }

            if (insertIds != "")
            {
                DataView dvInsert = new DataView(addEditRecords);
                dvInsert.RowFilter = "Id in (" + insertIds + ")";
                DataTable dtInsertingRecords = dvInsert.ToTable();

                foreach (DataRow item in dtInsertingRecords.Rows)
                {
                    string sgbId = item["sGBId"].ToString();
                    string nChatrelYear = item["nChatrelYear"].ToString();
                    string Querystring = "update tblGreenbook " +
                                            "set spaiduntil = '" + nChatrelYear + "'" +
                                             "where sgbid = '" + sgbId + "';";

                    executeQueryInDB(dbConn, Querystring);
                }
            }



            return insertIds;
        }
        #endregion

        #region getInsertIds
        public static string getInsertIdsCommaSeprated(MySqlConnection dbConn, DataTable addEditRecords, string dbName, string queryLabelTableName, string queryLabelColumnNames)
        {

            string Ids = getIDsCommaSeperated(addEditRecords);
            string insertIds = string.Empty;

            string queryDB = "SELECT " + queryLabelColumnNames + " FROM `" + queryLabelTableName + "` where `Id` in (" + Ids + ")";
            MySqlDataAdapter returnValDB1 = new MySqlDataAdapter(queryDB, dbConn);
            DataTable dtDB = new DataTable("TableUpdatedRecords");
            returnValDB1.Fill(dtDB);

            string updateIds = getIDsCommaSeperated(dtDB);

            if (updateIds != "")
            {
                DataView dv = new DataView(addEditRecords);
                dv.RowFilter = "Id not in (" + updateIds + ")";

                insertIds = getIDsCommaSeperated(dv.ToTable());
            }
            else
            {
                if (dtDB != null && dtDB.Rows.Count > 0)
                {
                    insertIds = getIDsCommaSeperated(dtDB);
                }
                else
                {
                    insertIds = Ids;
                }
            }

            return insertIds;
        }
        #endregion

        #region getUpdateIds
        public static string getUpdateIdsCommaSeprated(MySqlConnection dbConn, DataTable addEditRecords, string dbName, string queryLabelTableName, string queryLabelColumnNames)
        {

            string Ids = getIDsCommaSeperated(addEditRecords);

            string queryDB = "SELECT " + queryLabelColumnNames + " FROM `" + queryLabelTableName + "` where `Id` in (" + Ids + ")";
            MySqlDataAdapter returnValDB1 = new MySqlDataAdapter(queryDB, dbConn);
            DataTable dtDB = new DataTable("TableUpdatedRecords");
            returnValDB1.Fill(dtDB);

            return getIDsCommaSeperated(dtDB);
        }
        #endregion

        #region getDeleteIds
        public static string getDeleteIdsCommaSeprated(MySqlConnection dbConn, DataTable deletedRecords, string dbName, string queryLabelTableName, string queryLabelColumnNames)
        {

            string Ids = getIDsCommaSeperated(deletedRecords);
            string deleteIds = string.Empty;
            string queryDB = "SELECT " + queryLabelColumnNames + " FROM `" + queryLabelTableName + "` where `Id` in (" + Ids + ")";
            MySqlDataAdapter returnValDB1 = new MySqlDataAdapter(queryDB, dbConn);
            DataTable dtDB = new DataTable("TableDeleteRecords");
            returnValDB1.Fill(dtDB);

            string updateIds = getIDsCommaSeperated(dtDB);

            if (updateIds != "")
            {
                DataView dv = new DataView(deletedRecords);
                dv.RowFilter = "Id not in (" + updateIds + ")";

                deleteIds = getIDsCommaSeperated(dv.ToTable());
            }
            else
            {
                if (dtDB != null && dtDB.Rows.Count > 0)
                {
                    deleteIds = getIDsCommaSeperated(dtDB);
                }
                else
                {
                    deleteIds = Ids;
                }
            }

            return deleteIds;
        }
        #endregion

        public static string getIDsCommaSeperated(DataTable dtTable)
        {
            string Ids = string.Empty;
            foreach (DataRow row in dtTable.Rows)
            {
                if (Ids == string.Empty)
                {
                    Ids = row["id"].ToString();
                }
                else
                {
                    Ids += ", " + row["id"].ToString();
                }
            }
            return Ids;
        }

        public static string GenerateUpdateQueryAndExecuteBothDB(MySqlConnection cnnDB1, MySqlConnection cnnDB2, string queryLabelColumnNames, string queryLabelTableName, string db1Name, string db2Name, string optionalWhereClause = "No WhereClause")
        {
            string insertIdsCommaSeperated = string.Empty;
            string updateIdsCommaSeperated = string.Empty;
            string deleteIdsCommaSeperated = string.Empty;
            string insertQuery = string.Empty;
            string updateQuery = string.Empty;
            string deleteQuery = string.Empty;
            string strQuerys = string.Empty;
            //string DB1Name = textBoxAdminDBName.Text;
            //string DB2Name = textBoxChatrelDBName.Text;

            string queryDB1 = "SELECT " + queryLabelColumnNames + " FROM `" + queryLabelTableName + "` ";
            if (optionalWhereClause != "No WhereClause") { queryDB1 += optionalWhereClause; }
            MySqlDataAdapter returnValDB1 = new MySqlDataAdapter(queryDB1, cnnDB1);
            DataTable dtDB1 = new DataTable(queryLabelTableName);
            returnValDB1.Fill(dtDB1);

            string queryDB2 = "SELECT " + queryLabelColumnNames + " FROM `" + queryLabelTableName + "` ";
            if (optionalWhereClause != "No WhereClause") { queryDB2 += optionalWhereClause; }
            MySqlDataAdapter returnValDB2 = new MySqlDataAdapter(queryDB2, cnnDB2);
            DataTable dtDB2 = new DataTable("c" + queryLabelTableName);
            returnValDB2.Fill(dtDB2);

            //decrypt sFirstname and sLastName
            dtDB2 = getDecryptedValues(dtDB2);

            if (AreTablesTheSame(dtDB1, dtDB2))
            {
                //log with no changes
            }
            else
            {

                //getDifferentRecords(string resultName, DataTable FirstDataTable, DataTable SecondDataTable, bool Return1st)
                //When Return1st is true: ResultDataTable contains Adds Or Updates found in SecondDataTable as compared to FirstDataTable
                //When Return1st is false: ResultDataTable contains Deletes Or Updates found in FirstDataTable as compared to SecondDataTable

                DataTable dtAddedEditedRecords = getDifferentRecords("ResultSet", dtDB1, dtDB2, true);
                DataTable dtDeletedRecords = getDifferentRecords("ResultSet", dtDB1, dtDB2, false);

                //log the difference in records
                //create database script for changing in Chatrel Database
                if (dtAddedEditedRecords != null && dtAddedEditedRecords.Rows.Count > 0)
                {
                    updateIdsCommaSeperated = getUpdateIdsCommaSeprated(cnnDB2, dtAddedEditedRecords, db2Name, queryLabelTableName, queryLabelColumnNames);
                }

                if (updateIdsCommaSeperated != string.Empty)
                {
                    strQuerys += executeUpdateQueryByIds(cnnDB2, queryLabelTableName, queryLabelColumnNames, db1Name, updateIdsCommaSeperated, dtDB1);
                }

            }
            return strQuerys;
        }

        private static DataTable getDecryptedValues(DataTable dtDB2)
        {
            foreach (DataRow row in dtDB2.Rows)
            {
                string strFirstName = row["sFirstName"].ToString();
                string strLastName = row["sLastName"].ToString();

                if (strFirstName.Trim().Length > 0)
                {
                    row["sFirstName"] = DataEncryption.DecryptString(strFirstName, "@TiD#nC^A3,zD69#]qX");
                }
                if (strLastName.Trim().Length > 0)
                {
                    row["sLastName"] = DataEncryption.DecryptString(strLastName, "@TiD#nC^A3,zD69#]qX");
                }

            }

            return dtDB2;
        }
        #endregion

    }
}
