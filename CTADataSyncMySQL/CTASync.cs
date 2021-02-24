using MySql.Data.MySqlClient;
//using MySqlConnector;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace CTADataSyncMySQL
{
    public partial class CTASync : Form
    {
        public CTASync()
        {
            InitializeComponent();
        }
        
        const string insertString = "INSERT INTO `queryLabelTableName` ( queryLabelColumnNames ) SELECT queryLabelColumnNames FROM `queryLabelDBName`.`queryLabelTableName` WHERE `Id` in ( queryLabelIdValue ); ";
        //const string updateString = "UPDATE `queryLabelTableName` SET queryLabelColumnNames WHERE `Id` = queryLabelIdValue";
        const string updateString = "UPDATE `queryLabelTableName` as `dest`, ( SELECT queryLabelColumnNames FROM `queryLabelDBName`. `queryLabelTableName` WHERE `id` = queryLabelIdValue ) AS `src` SET queryLabelUpdateColumnNames WHERE `dest`.`id` = queryLabelIdValue ; ";
        const string deleteString = "DELETE FROM `queryLabelTableName` WHERE `id` = queryLabelIdValue; ";

        private void buttonSyncDB_Click(object sender, EventArgs e)
        {

            StringBuilder stringBuilderQuery = new StringBuilder();
            string sLogFolderPath = txtLogFolderPath.Text;

            string strQuery = string.Empty;
            string connetionStringDB1 = null;
            string connetionStringDB2 = null;
            string DB1Name = textBoxAdminDBName.Text;
            string DB2Name = textBoxChatrelDBName.Text;
            MySqlConnection cnnDB1;
            MySqlConnection cnnDB2;
            //connetionStringDB1 = "Server=127.0.0.1;Port=3306;Database=ctadb;Uid=root;allow zero datetime=no";
            //connetionStringDB2 = "Server=127.0.0.1;Port=3306;Database=chatreldb;Uid=root;allow zero datetime=no";
            connetionStringDB1 = textBoxDB1.Text;
            connetionStringDB2 = textBoxDB2.Text;
            // Set cursor as hourglass
            Cursor.Current = Cursors.WaitCursor;
            DateTime dtMigrationDate = Convert.ToDateTime("10-02-2021 00:00:00");
            
            progressBarProcess.Value = 0;
            progressBarProcess.Refresh();



            progressBarProcess.Minimum = 0;
            progressBarProcess.Maximum = 10;
            progressBarProcess.Step = 1;

            //lstChatrel Sync
            try
            {
                cnnDB1 = new MySqlConnection(connetionStringDB1);
                cnnDB1.Open();


                cnnDB2 = new MySqlConnection(connetionStringDB2);
                cnnDB2.Open();

                //labelSyncReport.Text = "lstChatrel - Syncing Process....";
                //1. Sync Datatable - lstChatrel
                strQuery = Sync_lstChatrel_Table(cnnDB1, cnnDB2, DB1Name, DB2Name);
                ProgressBarOneStep();
                if (strQuery != string.Empty) { stringBuilderQuery.AppendLine(strQuery); }
                strQuery = string.Empty;


                labelSyncReport.Text = "lstAuthRegion - Syncing Process....";
                //2. Sync Datatable - lstAuthRegion
                strQuery = Sync_lstAuthRegion_Table(cnnDB1, cnnDB2, DB1Name, DB2Name);
                ProgressBarOneStep();
                if (strQuery != string.Empty) { stringBuilderQuery.AppendLine(strQuery); }
                strQuery = string.Empty;

                labelSyncReport.Text = "lstCountry - Syncing Process....";
                //3. Sync Datatable - lstCountry
                strQuery = Sync_lstCountry_Table(cnnDB1, cnnDB2, DB1Name, DB2Name);
                ProgressBarOneStep();
                if (strQuery != string.Empty) { stringBuilderQuery.AppendLine(strQuery); }
                strQuery = string.Empty;

                labelSyncReport.Text = "lstRelation - Syncing Process....";
                //4. Sync Datatable - lstRelation
                strQuery = Sync_lstRelation_Table(cnnDB1, cnnDB2, DB1Name, DB2Name);
                ProgressBarOneStep();
                if (strQuery != string.Empty) { stringBuilderQuery.AppendLine(strQuery); }
                strQuery = string.Empty;

                this.Refresh();
                Application.DoEvents();



                //labelSyncReport.Text = "lnkGBChildren - Syncing Process....";
                ////6. Sync Datatable - lnkGBChildren
                //strQuery = Sync_lnkGBChildren_Table(cnnDB1, cnnDB2, DB1Name, DB2Name);
                //ProgressBarOneStep();
                //if (strQuery != string.Empty) { stringBuilderQuery.AppendLine(strQuery); }
                //strQuery = string.Empty;

                //labelSyncReport.Text = "lnkGBRelation - Syncing Process....";
                ////7. Sync Datatable - lnkGBRelation
                //strQuery = Sync_lnkGBRelation_Table(cnnDB1, cnnDB2, DB1Name, DB2Name);
                //ProgressBarOneStep();
                //if (strQuery != string.Empty) { stringBuilderQuery.AppendLine(strQuery); }
                //strQuery = string.Empty;
                //ProgressBarOneStep();
                //ProgressBarOneStep();
                //ProgressBarOneStep();
                //ProgressBarOneStep();
                ProgressBarOneStep();
                ProgressBarOneStep();

                labelSyncReport.Text = "tblGreenbook - Syncing Process....";
                //5. Sync Datatable - tblGreenbook
                strQuery = Sync_tblGreenbook_Table(cnnDB1, cnnDB2, DB1Name, DB2Name);
                ProgressBarOneStep();
                if (strQuery != string.Empty) { stringBuilderQuery.AppendLine(strQuery); }
                strQuery = string.Empty;
                ProgressBarOneStep();

               

                labelSyncReport.Text = "lnkGBChatrel - Syncing Process....";
                //8. Sync Datatable - lnkGBChatrel
                strQuery = Sync_lnkGBChatrel_Table(cnnDB1, cnnDB2, DB1Name, DB2Name, "Offline");
                if (strQuery != string.Empty) { stringBuilderQuery.AppendLine(strQuery); }
                strQuery = string.Empty;
                strQuery = Sync_lnkGBChatrel_Table(cnnDB2, cnnDB1, DB2Name, DB1Name, "Online");
                if (strQuery != string.Empty) { stringBuilderQuery.AppendLine(strQuery); }
                strQuery = string.Empty;
                ProgressBarOneStep();

                labelSyncReport.Text = "lnkGBChatrelDonation - Syncing Process....";
                //9. Sync Datatable - lnkGBChatrelDonation
                strQuery = Sync_lnkGBChatrelDonation_Table(cnnDB1, cnnDB2, DB1Name, DB2Name, "Offline");
                if (strQuery != string.Empty) { stringBuilderQuery.AppendLine(strQuery); }
                strQuery = string.Empty;
                strQuery = Sync_lnkGBChatrelDonation_Table(cnnDB2, cnnDB1, DB2Name, DB1Name, "Online");
                if (strQuery != string.Empty) { stringBuilderQuery.AppendLine(strQuery); }
                strQuery = string.Empty;
                ProgressBarOneStep();


                labelSyncReport.Text = "tblChatrelPayment - Syncing Process....";
                //10. Sync Datatable - tblChatrelPayment
                strQuery = Sync_tblChatrelPayment_Table(cnnDB1, cnnDB2, DB1Name, DB2Name, "Offline");
                if (strQuery != string.Empty) { stringBuilderQuery.AppendLine(strQuery); }
                strQuery = string.Empty;
                strQuery = Sync_tblChatrelPayment_Table(cnnDB2, cnnDB1, DB2Name, DB1Name, "Online");
                if (strQuery != string.Empty) { stringBuilderQuery.AppendLine(strQuery); }
                strQuery = string.Empty;
                ProgressBarOneStep();
                labelSyncReport.Text = "Sync the two Databases";
                strQuery = string.Empty;

                cnnDB1.Close();
                cnnDB2.Close();


                File.AppendAllText(sLogFolderPath + "log-" + Guid.NewGuid().ToString() + ".txt", stringBuilderQuery.ToString());
                stringBuilderQuery.Clear();


                // Set cursor as default arrow
                Cursor.Current = Cursors.Default;

            }
            catch (Exception ex)
            {
                labelSyncReport.Text += Environment.NewLine + ex.ToString();
                stringBuilderQuery.AppendLine(strQuery);
                stringBuilderQuery.AppendLine(ex.Message);
                File.AppendAllText(sLogFolderPath + "log-" + Guid.NewGuid().ToString() + ".txt", stringBuilderQuery.ToString());
                stringBuilderQuery.Clear();

                // Set cursor as default arrow
                Cursor.Current = Cursors.Default;
            }
        }



        private void ProgressBarOneStep()
        {
            progressBarProcess.PerformStep();
            this.Refresh();
            Application.DoEvents();
        }

        #region Sync Datatables
        #region Sync lstChatrel
        public string Sync_lstChatrel_Table(MySqlConnection cnnDB1, MySqlConnection cnnDB2, string db1Name, string db2Name)
        {
            string queryLabelTableName = "lstchatrel";
            string queryLabelColumnNames = "`lstchatrel`.`Id`,`lstchatrel`.`sChatrelKey`,`lstchatrel`.`nChatrelValue`,`lstchatrel`.`dtChatrelFrom`,`lstchatrel`.`dtEntered`,`lstchatrel`.`nEnteredBy`,`lstchatrel`.`dtUpdated`,`lstchatrel`.`nUpdatedBy`";

            //GenerateQueryAndExecute
            return GenerateQueryAndExecute(cnnDB1, cnnDB2, queryLabelColumnNames, queryLabelTableName, db1Name, db2Name);

        }
        #endregion

        #region Sync lstAuthRegion
        public string Sync_lstAuthRegion_Table(MySqlConnection cnnDB1, MySqlConnection cnnDB2, string db1Name, string db2Name)
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
        public string Sync_lstCountry_Table(MySqlConnection cnnDB1, MySqlConnection cnnDB2, string db1Name, string db2Name)
        {
            string queryLabelTableName = "lstcountry";
            string queryLabelColumnNames = "`lstcountry`.`ID`,`lstcountry`.`sCountryID`,`lstcountry`.`sCountry`,`lstcountry`.`nDefaultAuthRegionID`,`lstcountry`.`dtEntered`,`lstcountry`.`nEnteredBy`,`lstcountry`.`dtUpdated`,`lstcountry`.`nUpdatedBy`";

            //GenerateQueryAndExecute
            return GenerateQueryAndExecute(cnnDB1, cnnDB2, queryLabelColumnNames, queryLabelTableName, db1Name, db2Name);

        }
        #endregion

        #region Sync lstRelation
        public string Sync_lstRelation_Table(MySqlConnection cnnDB1, MySqlConnection cnnDB2, string db1Name, string db2Name)
        {
            string queryLabelTableName = "lstrelation";
            string queryLabelColumnNames = "`lstrelation`.`Id`,`lstrelation`.`sRelation`,`lstrelation`.`dtEntered`,`lstrelation`.`nEnteredBy`,`lstrelation`.`dtUpdated`,`lstrelation`.`nUpdatedBy`";

            //GenerateQueryAndExecute
            return GenerateQueryAndExecute(cnnDB1, cnnDB2, queryLabelColumnNames, queryLabelTableName, db1Name, db2Name);

        }
        #endregion

        #region Sync tblGreenbook
        public string Sync_tblGreenbook_Table(MySqlConnection cnnDB1, MySqlConnection cnnDB2, string db1Name, string db2Name)
        {
            string queryLabelTableName = "tblgreenbook";
            string queryLabelColumnNames = "`tblgreenbook`.`Id`,`tblgreenbook`.`sGBID`,`tblgreenbook`.`nAuthRegionID`,`tblgreenbook`.`sFirstName`,`tblgreenbook`.`sLastName`," +
                "`tblgreenbook`.`dtDOB`,`tblgreenbook`.`sEmail`,`tblgreenbook`.`sPhone`,`tblgreenbook`.`dtDeceased`,`tblgreenbook`.`sCountryID`,`tblgreenbook`.`sPaidUntil`," +
                "`tblgreenbook`.`sLoginGmail`,`tblgreenbook`.`dtLastSuccessfullLogin`,`tblgreenbook`.`dtEntered`,`tblgreenbook`.`nEnteredBy`,`tblgreenbook`.`dtUpdated`," +
                "`tblgreenbook`.`nUpdatedBy`";
            //string strWhereclause = " where dtUpdated > DATE_SUB(now(), INTERVAL 3 DAY)";
            string strWhereclause = " where sgbid='86'";

            //GenerateQueryAndExecute
            return GenerateUpdateQueryAndExecuteBothDB(cnnDB1, cnnDB2, queryLabelColumnNames, queryLabelTableName, db1Name, db2Name, strWhereclause);

        }
        #endregion

        #region Sync lnkGBChildren
        public string Sync_lnkGBChildren_Table(MySqlConnection cnnDB1, MySqlConnection cnnDB2, string db1Name, string db2Name)
        {
            string queryLabelTableName = "lnkgbchildren";
            string queryLabelColumnNames = "`lnkgbchildren`.`Id`,`lnkgbchildren`.`sGBIDParent`,`lnkgbchildren`.`sName`,`lnkgbchildren`.`dtDOB`,`lnkgbchildren`.`sGender`,`lnkgbchildren`.`sChildID`,`lnkgbchildren`.`sGBIDChild`,"
                    + "`lnkgbchildren`.`dtEntered`,`lnkgbchildren`.`nEnteredBy`,`lnkgbchildren`.`dtUpdated`,`lnkgbchildren`.`nUpdatedBy`";

            //GenerateQueryAndExecute
            return GenerateQueryAndExecute(cnnDB1, cnnDB2, queryLabelColumnNames, queryLabelTableName, db1Name, db2Name);


        }
        #endregion

        #region Sync lnkGBFileDispute  (N/A)
        #endregion

        #region Sync lnkGBRelation
        public string Sync_lnkGBRelation_Table(MySqlConnection cnnDB1, MySqlConnection cnnDB2, string db1Name, string db2Name)
        {
            string queryLabelTableName = "lnkgbrelation";
            string queryLabelColumnNames = "`lnkgbrelation`.`Id`,`lnkgbrelation`.`sGBID`,`lnkgbrelation`.`sGBIDRelation`,`lnkgbrelation`.`nRelationID`,`lnkgbrelation`.`dtEntered`,`lnkgbrelation`.`nEnteredBy`,"
                    + "`lnkgbrelation`.`dtUpdated`,`lnkgbrelation`.`nUpdatedBy`";

            //GenerateQueryAndExecute
            return GenerateQueryAndExecute(cnnDB1, cnnDB2, queryLabelColumnNames, queryLabelTableName, db1Name, db2Name);

        }
        #endregion

        #region Sync tblactionlogger (N/A)
        #endregion

        #region Sync tblauditlog (N/A)
        #endregion

        #region Sync lnkGBChatrelDonation
        public string Sync_lnkGBChatrelDonation_Table(MySqlConnection cnnDB1, MySqlConnection cnnDB2, string db1Name, string db2Name, string sPaymentMode)
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
        public string Sync_lnkGBChatrel_Table(MySqlConnection cnnDB1, MySqlConnection cnnDB2, string db1Name, string db2Name, string sPaymentMode)
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
        public string Sync_tblChatrelPayment_Table(MySqlConnection cnnDB1, MySqlConnection cnnDB2, string db1Name, string db2Name, string sPaymentMode)
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

        public string ExecuteForUpdateTblGreenbook(MySqlConnection cnnDB1, MySqlConnection cnnDB2, string queryLabelColumnNames, string queryLabelTableName, string db1Name, string db2Name, string optionalWhereClause = "No WhereClause")
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
                    strQuerys += executeInsertQueryByIds(cnnDB2, queryLabelTableName, queryLabelColumnNames, db1Name, insertIdsCommaSeperated);
                }
                

            }
            return strQuerys;
        }


        public string GenerateQueryAndExecute(MySqlConnection cnnDB1, MySqlConnection cnnDB2, string queryLabelColumnNames, string queryLabelTableName, string db1Name, string db2Name, string optionalWhereClause = "No WhereClause")
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
                    strQuerys += executeInsertQueryByIds(cnnDB2, queryLabelTableName, queryLabelColumnNames, db1Name, insertIdsCommaSeperated);

                }
                if (updateIdsCommaSeperated != string.Empty)
                {
                    strQuerys += executeUpdateQueryByIds(cnnDB2, queryLabelTableName, queryLabelColumnNames, db1Name, updateIdsCommaSeperated);
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
        public DataTable getDifferentRecords(string resultName, DataTable FirstDataTable, DataTable SecondDataTable, bool Return1st)
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


        public string executeInsertQueryByIds(MySqlConnection cnnDB
                                            , string queryLabelTableName
                                            , string queryLabelColumnNames
                                            , string queryLabelDBName
                                            , string queryLabelIdValue
                                        )
        {
            string strInsertString = insertString;
            strInsertString = strInsertString.Replace("queryLabelTableName", queryLabelTableName);
            strInsertString = strInsertString.Replace("queryLabelColumnNames", queryLabelColumnNames);
            strInsertString = strInsertString.Replace("queryLabelDBName", queryLabelDBName);
            strInsertString = strInsertString.Replace("queryLabelIdValue", queryLabelIdValue);

            executeQueryInDB(cnnDB, strInsertString);
            return strInsertString;
        }



        public string executeUpdateQueryByIds(MySqlConnection cnnDB
                                            , string queryLabelTableName
                                            , string queryLabelColumnNames
                                            , string queryLabelDBName
                                            , string queryLabelIdValue
                                        )
        {
            string updatecols = string.Empty;
            string strUpdateQueryStrings = string.Empty;
            string strUpdateQuery = updateString;
            string[] strAColumns = queryLabelColumnNames.Split(',');
            string[] strIdValues = queryLabelIdValue.Split(',');
            foreach (var Ids in strIdValues)
            {
                foreach (var col in strAColumns)
                {
                    if (updatecols == string.Empty)
                    {
                        updatecols = col.Replace(queryLabelTableName, "dest") + " = " + col.Replace(queryLabelTableName, "src");
                    }
                    else
                    {
                        updatecols += ", " + col.Replace(queryLabelTableName, "dest") + " = " + col.Replace(queryLabelTableName, "src");
                    }
                }

                strUpdateQuery = updateString.Replace("queryLabelTableName", queryLabelTableName);
                strUpdateQuery = strUpdateQuery.Replace("queryLabelColumnNames", queryLabelColumnNames);
                strUpdateQuery = strUpdateQuery.Replace("queryLabelUpdateColumnNames", updatecols);
                strUpdateQuery = strUpdateQuery.Replace("queryLabelDBName", queryLabelDBName);
                strUpdateQuery = strUpdateQuery.Replace("queryLabelIdValue", Ids);

                executeQueryInDB(cnnDB, strUpdateQuery);
                strUpdateQueryStrings += strUpdateQuery;


            }

            //Logging all Update Strings

            return strUpdateQueryStrings;

        }


        public string executeDeleteQueryByIds(MySqlConnection cnnDB, string queryLabelTableName
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

        public void executeQueryInDB(MySqlConnection DBConn, string strQuery)
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
        public string getIdsAndUpdateTblGreenBook(MySqlConnection dbConn, DataTable addEditRecords, string dbName, string queryLabelTableName, string queryLabelColumnNames)
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
                    string Querystring = "update tblGreenbook " +
                                            "set spaiduntil = if (month(now()) > 3 , year(now()), year(now()) - 1  )" +
                                             "where sgbid = '" + sgbId + "';";

                    executeQueryInDB(dbConn, Querystring);
                }
            }



            return insertIds;
        }
        #endregion

        #region getInsertIds
        public string getInsertIdsCommaSeprated(MySqlConnection dbConn, DataTable addEditRecords, string dbName, string queryLabelTableName, string queryLabelColumnNames)
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
        public string getUpdateIdsCommaSeprated(MySqlConnection dbConn, DataTable addEditRecords, string dbName, string queryLabelTableName, string queryLabelColumnNames)
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
        public string getDeleteIdsCommaSeprated(MySqlConnection dbConn, DataTable deletedRecords, string dbName, string queryLabelTableName, string queryLabelColumnNames)
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

        public string getIDsCommaSeperated(DataTable dtTable)
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

        public string GenerateUpdateQueryAndExecuteBothDB(MySqlConnection cnnDB1, MySqlConnection cnnDB2, string queryLabelColumnNames, string queryLabelTableName, string db1Name, string db2Name, string optionalWhereClause = "No WhereClause")
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
                //DataTable dtDeletedRecords = getDifferentRecords("ResultSet", dtDB1, dtDB2, false);

                //log the difference in records
                //create database script for changing in Chatrel Database
                if (dtAddedEditedRecords != null && dtAddedEditedRecords.Rows.Count > 0)
                {
                    updateIdsCommaSeperated = getUpdateIdsCommaSeprated(cnnDB2, dtAddedEditedRecords, db2Name, queryLabelTableName, queryLabelColumnNames);
                }

                if (updateIdsCommaSeperated != string.Empty)
                {
                    strQuerys += executeUpdateQueryByIds(cnnDB2, queryLabelTableName, queryLabelColumnNames, db1Name, updateIdsCommaSeperated);
                }

            }
            return strQuerys;
        }
    }
}
