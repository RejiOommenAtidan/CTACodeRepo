﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using MySql.Data.MySqlClient;
using System.IO;
using System.Xml;
using System.Data.SqlClient;
using Ubiety.Dns.Core.Records;
using System.Resources;
using System.Text.RegularExpressions;

namespace CTADataMigrationAndSupport
{
    public partial class CTAApp : Form
    {

        const string DB1Name = "ctadb";
        const string DB2Name = "chatreldb";
        const string insertString = "INSERT INTO `queryLabelTableName` ( queryLabelColumnNames ) SELECT queryLabelColumnNames FROM `queryLabelDBName`.`queryLabelTableName` WHERE `Id` in ( queryLabelIdValue ); ";
        //const string updateString = "UPDATE `queryLabelTableName` SET queryLabelColumnNames WHERE `Id` = queryLabelIdValue";
        const string updateString = "UPDATE `queryLabelTableName` as `dest`, ( SELECT queryLabelColumnNames FROM `ctadb`. `queryLabelTableName` WHERE `id` = queryLabelIdValue ) AS `src` SET queryLabelUpdateColumnNames WHERE `dest`.`id` = queryLabelIdValue ; ";
        const string deleteString = "DELETE FROM `queryLabelTableName` WHERE `id` = queryLabelIdValue; ";

        public CTAApp()
        {
            InitializeComponent();
        }

        #region Profile Migration

        private void btnImageMigration_Click(object sender, EventArgs e)
        {
            string connetionString = null;
            MySqlConnection cnn;
            //connetionString = "Server=127.0.0.1;Port=3306;Database=ctadb;Uid=root;allow zero datetime=no";
            //string sLogFolderPath = @"D:\Reji\Chatrel\CTAImageFile-DataMigration\CTAImageUploadFromFolder\CTAImageUploadFromFolder\";
            //string sPathPrifix = @"C:\xampp\htdocs\GreenBook\gb\images\";
            string sLogFolderPath = txtLogFolderPath.Text;

            connetionString = txtConnectionString.Text;
            string sPathPrifix = txtImagePath.Text;

            progressBarProcess.Value = 0;
            progressBarProcess.Refresh();


            cnn = new MySqlConnection(connetionString);
            try
            {
                cnn.Open();

                //string query = "SELECT sGBID FROM tblGreenBook";
                string query = "select sGBID from tblgreenbook where sGBId Not in (SELECT sGBId FROM lnkgbdocument)";
                //string query = "select sGBID from tblgreenbook where sBookIssued like '%2012%'";
                //string query = "select sGBID from tblgreenbook where sBookIssued like '%2011%'";
                //string query = "select sGBID from tblgreenbook where sBookIssued like '%2010%'";
                //string query = "select sGBID from tblgreenbook where sBookIssued like '%2009%'";
                //string query = "select sGBID from tblgreenbook where sBookIssued like '%2008%'";
                //string query = "select sGBID from tblgreenbook where sBookIssued like '%2007%'";
                //string query = "select sGBID from tblgreenbook where sBookIssued like '%2006%'";
                //string query = "select sGBID from tblgreenbook  where sBookIssued like '%2005%' and  sCountryID !='IN'";
                //string query = "select sGBID from tblgreenbook  where sBookIssued like '%2005%' and sCountryID ='IN' and nChildrenM = 0 and nChildrenF = 0";
                //string query = "select sGBID from tblgreenbook  where sBookIssued like '%2005%' and sCountryID ='IN' and nChildrenM = 0 and nChildrenF = 0 and sDOBApprox = 'N' and  sGender = 'M'";
                //string query = "select sGBID from tblgreenbook  where sBookIssued like '%2005%' and sCountryID ='IN' and nChildrenM = 0 and nChildrenF = 0 and sDOBApprox = 'N' and  sGender = 'F'";
                //string query = "select sGBID from tblgreenbook  where sBookIssued like '%2005%' and sCountryID ='IN' and nChildrenM = 0 and nChildrenF = 0 and sDOBApprox = 'M' ";
                //string query = "select sGBID from tblgreenbook  where sBookIssued like '%2005%' and sCountryID ='IN' and nChildrenM = 0 and nChildrenF = 0 and sDOBApprox = 'Y'";
                //string query = "select sGBID from tblgreenbook  where sBookIssued like '%2005%' and sCountryID ='IN' and nChildrenM = 0 and nChildrenF = 0 and sDOBApprox = 'D'";
                //string query = "select sGBID from tblgreenbook  where sBookIssued like '%2005%' and sCountryID ='IN' and nChildrenM = 0 and nChildrenF in (1,2,3,4,5)";
                //string query = "select sGBID from tblgreenbook  where sBookIssued like '%2005%' and sCountryID ='IN' and nChildrenM = 0 and nChildrenF > 5";
                //string query = "select sGBID from tblgreenbook  where sBookIssued like '%2005%' and sCountryID ='IN' and nChildrenM in (1,2,3,4,5)";
                //string query = "select sGBID from tblgreenbook  where sBookIssued like '%2005%' and sCountryID ='IN' and nChildrenM > 5";
                //string query = "select sGBID from tblgreenbook where sBookIssued like '%2004%'";
                //string query = "select sGBID from tblgreenbook where sBookIssued like '%2003%'";
                //string query = "select sGBID from tblgreenbook where sGBID = 0000000";
                MySqlCommand cmd = new MySqlCommand(query, cnn);
                MySqlDataAdapter returnVal = new MySqlDataAdapter(query, cnn);
                DataTable dt = new DataTable("tblGreenBook");
                returnVal.Fill(dt);
                string sStartProcess = DateTime.Now.ToString();
                Int64 nInsertedFileCount = 0;
                Int64 nNotFoundFileCount = 0;
                StringBuilder sbLogging = new StringBuilder();

                if (dt != null || dt.Rows.Count > 0)
                {
                    progressBarProcess.Minimum = 0;
                    progressBarProcess.Maximum = dt.Rows.Count;
                    progressBarProcess.Step = 1;
                }
                else
                {
                    progressBarProcess.Minimum = 0;
                    progressBarProcess.Maximum = 1;
                    progressBarProcess.Step = 1;
                    progressBarProcess.PerformStep();
                }

                //Iterate through Items 
                foreach (DataRow row in dt.Rows)
                {
                    progressBarProcess.PerformStep();

                    if (row["sGBID"] == DBNull.Value)
                    {
                        continue;
                    }

                    // Make sure 7 digit GB number
                    string sGBNum = row["sGBID"].ToString().Trim();
                    if (sGBNum.Length != 7)
                    {
                        if (sGBNum.Length == 1) { sGBNum = "000000" + sGBNum; }
                        else if (sGBNum.Length == 2) { sGBNum = "00000" + sGBNum; }
                        else if (sGBNum.Length == 3) { sGBNum = "0000" + sGBNum; }
                        else if (sGBNum.Length == 4) { sGBNum = "000" + sGBNum; }
                        else if (sGBNum.Length == 5) { sGBNum = "00" + sGBNum; }
                        else if (sGBNum.Length == 6) { sGBNum = "0" + sGBNum; }
                    }

                    //Generate Path to find the image
                    string s1stFolder = sGBNum.Substring(0, 2);
                    string s2ndFolder = sGBNum.Substring(2, 2);
                    string sPathWithFileName = s1stFolder + @"\" + s2ndFolder + @"\g" + sGBNum + ".jpg";
                    string sFileName = @"g" + sGBNum + ".jpg";
                    FileStream fs;
                    BinaryReader br;

                    string sFullPath = sPathPrifix + sPathWithFileName;
                    if (File.Exists(sFullPath))
                    {

                        if (checkBoxDummyProfile.Checked)
                        {
                            // To check the last chartecter digit from sGBId
                            string sLastDigit = sGBNum.Substring(sGBNum.Length - 1, 1);
                            sFileName = sLastDigit + ".jpg";
                            sFullPath = textBoxDummyProfilePath.Text + sFileName; 
                        }

                        byte[] ImageData;
                        fs = new FileStream(sFullPath, FileMode.Open, FileAccess.Read);
                        br = new BinaryReader(fs);
                        ImageData = br.ReadBytes((int)fs.Length);
                        br.Close();
                        fs.Close();

                        string cmdString = "INSERT INTO lnkgbdocument(nRegisterDate, sGBId, sTitle, sDocType, binFileDoc, sFileExtension, dtEntered, nEnteredBy) " +
                                            "VALUES(@nRegisterDate,@sGBId,@sTitle,@sDocType,@binFileDoc,@sFileExtension,@dtEntered,@nEnteredBy)";

                        cmd = new MySqlCommand(cmdString, cnn);

                        cmd.Parameters.Add("@nRegisterDate", MySqlDbType.Int64);
                        cmd.Parameters.Add("@sGBId", MySqlDbType.VarChar, 255);
                        cmd.Parameters.Add("@sTitle", MySqlDbType.VarChar, 255);
                        cmd.Parameters.Add("@sDocType", MySqlDbType.VarChar, 255);
                        cmd.Parameters.Add("@binFileDoc", MySqlDbType.Blob);
                        cmd.Parameters.Add("@sFileExtension", MySqlDbType.VarChar, 255);
                        cmd.Parameters.Add("@dtEntered", MySqlDbType.DateTime);
                        cmd.Parameters.Add("@nEnteredBy", MySqlDbType.Int32);

                        cmd.Parameters["@nRegisterDate"].Value = DBNull.Value;
                        cmd.Parameters["@sGBId"].Value = row["sGBID"].ToString();
                        cmd.Parameters["@sTitle"].Value = sFileName;
                        cmd.Parameters["@sDocType"].Value = "Photo Identity";
                        cmd.Parameters["@binFileDoc"].Value = ImageData;
                        cmd.Parameters["@sFileExtension"].Value = "jpg";
                        cmd.Parameters["@dtEntered"].Value = DateTime.Now;
                        cmd.Parameters["@nEnteredBy"].Value = 1;
                        int RowsAffected = cmd.ExecuteNonQuery();
                        nInsertedFileCount++;
                        lblResult.Text = @"GB Id: " + sGBNum;
                        sbLogging.AppendLine("Green Book Id: " + sGBNum);
                    }
                    else
                    {
                        lblResult.Text = @"File NOT Exists: " + row["sGBID"].ToString().Trim();
                        sbLogging.AppendLine("Image Not Exist for Green Book Id: " + sGBNum);
                        nNotFoundFileCount++;

                    }
                    this.Refresh();
                    lblResult.Text += " - " + nInsertedFileCount.ToString() + "/" + dt.Rows.Count.ToString();
                    //lblResult.Refresh();
                    this.Refresh();
                    Application.DoEvents();

                }

                //this.CloseConnection();
                //DataTable dt = new DataTable("CharacterInfo");
                //return dt;

                string sEndProcess = DateTime.Now.ToString();

                cnn.Close();
                lblResult.Text = "============================";
                lblResult.Text += Environment.NewLine + "                Summary";
                lblResult.Text += Environment.NewLine + "============================";
                lblResult.Text += Environment.NewLine + "Start Process: " + sStartProcess;
                lblResult.Text += Environment.NewLine + "End Process: " + sEndProcess;
                lblResult.Text += Environment.NewLine + "Number of Images Inserted: " + nInsertedFileCount.ToString();
                lblResult.Text += Environment.NewLine + "Number of Images Not found: " + nNotFoundFileCount.ToString();
                lblResult.Text += Environment.NewLine + "============================";

                sbLogging.AppendLine("===================================");
                sbLogging.AppendLine("             Summary");
                sbLogging.AppendLine("===================================");
                sbLogging.AppendLine("Start Process: " + sStartProcess);
                sbLogging.AppendLine("End Process: " + sEndProcess);
                sbLogging.AppendLine("Number of Images Inserted: " + nInsertedFileCount.ToString());
                sbLogging.AppendLine("Number of Images Not found: " + nNotFoundFileCount.ToString());
                sbLogging.AppendLine("===================================");

                File.AppendAllText(sLogFolderPath + "log-" + Guid.NewGuid().ToString() + ".txt", sbLogging.ToString());
                sbLogging.Clear();
            }
            catch (Exception ex)
            {
                lblResult.Text += Environment.NewLine + ex.ToString();
            }

        }

        #endregion


        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void label3_Click(object sender, EventArgs e)
        {

        }


        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void txtImagePath_TextChanged(object sender, EventArgs e)
        {

        }

        private void CTAApp_Load(object sender, EventArgs e)
        {

        }

        private void btnNoGBID_Click(object sender, EventArgs e)
        {
            string connetionString = null;
            MySqlConnection cnn;
            connetionString = txtConnectionString.Text;
            string sLogFolderPath = txtLogFolderPath.Text;
            string sPathPrifix = txtImagePath.Text;
            Int64 nDirtyRecordCount = 0;
            Int32 nNumberButNotFound = 0;
            Int32 nStringWithEmpty = 0;
            Int32 nNotNumberButString = 0;
            StringBuilder sbLogging = new StringBuilder();

            progressBarProcess.Value = 0;
            progressBarProcess.Refresh();

            if (comboBox1.SelectedItem == null)
            {
                lblResultRelation.Text = "Please select Relation";
                return;
            }

            else if (comboBox1.SelectedItem.ToString() != "Children")
            {

                lblResultRelation.Text = comboBox1.SelectedItem.ToString();
                string sSearchColumn = string.Empty;
                switch (comboBox1.SelectedItem.ToString())
                {
                    case "Father":
                        // code block
                        sSearchColumn = "sFathersGBID";
                        break;
                    case "Mother":
                        // code block
                        sSearchColumn = "sMothersGBID";

                        break;
                    case "Spouse":
                        // code block
                        sSearchColumn = "sSpouseGBID";

                        break;
                    default:
                        // code block
                        lblResultRelation.Text = "Invalid selection!";
                        return;
                        //break;
                }



                cnn = new MySqlConnection(connetionString);
                try
                {
                    cnn.Open();
                    //string query = "SELECT sGBID FROM tblGreenBook";
                    string query = "select sGBID," + sSearchColumn + " from tblgreenbook ";
                    //string query = "select sGBID," + sSearchColumn + " from tblgreenbook where sBookIssued like '%2012%'";
                    MySqlCommand cmd = new MySqlCommand(query, cnn);
                    MySqlDataAdapter returnVal = new MySqlDataAdapter(query, cnn);
                    DataTable dt = new DataTable("tblGreenBook");
                    returnVal.Fill(dt);
                    string sStartProcess = DateTime.Now.ToString();
                    if (dt != null || dt.Rows.Count > 0)
                    {
                        progressBarProcess.Minimum = 0;
                        progressBarProcess.Maximum = dt.Rows.Count;
                        progressBarProcess.Step = 1;
                    }
                    else
                    {
                        progressBarProcess.Minimum = 0;
                        progressBarProcess.Maximum = 1;
                        progressBarProcess.Step = 1;
                        progressBarProcess.PerformStep();
                    }

                    //Iterate through Items 
                    foreach (DataRow row in dt.Rows)
                    {
                        progressBarProcess.PerformStep();

                        if (row["sGBID"] == DBNull.Value || row[sSearchColumn] == DBNull.Value)
                        {
                            continue;
                        }

                        //If the sSearchColumn value is numeric
                        if (Int64.TryParse(row[sSearchColumn].ToString(), out long longValue))
                        {
                            //this is number
                            query = "select sGBID from tblgreenbook where sGBID = '" + row[sSearchColumn].ToString() + "'";
                            MySqlCommand cmdExist = new MySqlCommand(query, cnn);
                            MySqlDataAdapter returnValExist = new MySqlDataAdapter(query, cnn);
                            DataTable dtExist = new DataTable("tblGreenBook");
                            returnValExist.Fill(dtExist);

                            if (dtExist == null || dtExist.Rows.Count <= 0)
                            {
                                nDirtyRecordCount++;
                                nNumberButNotFound++;
                                lblResultRelation.Text = @"GB Id: " + row["sGBID"].ToString() + @"   sSearchColumn: " + row[sSearchColumn].ToString();
                                sbLogging.AppendLine("Green Book Id: " + row["sGBID"].ToString() + @"   sSearchColumn: " + row[sSearchColumn].ToString());
                                continue;
                            }
                        }
                        else  // this is string
                        {
                            if (row[sSearchColumn].ToString().Trim() == string.Empty)
                            {
                                nDirtyRecordCount++;
                                nStringWithEmpty++;
                                lblResultRelation.Text = @"GB Id: " + row["sGBID"].ToString() + @"   sSearchColumn: " + row[sSearchColumn].ToString();
                                sbLogging.AppendLine("Green Book Id: " + row["sGBID"].ToString() + @"   sSearchColumn: " + row[sSearchColumn].ToString());
                                continue;
                            }
                            else
                            {
                                nDirtyRecordCount++;
                                nNotNumberButString++;
                                lblResultRelation.Text = @"GB Id: " + row["sGBID"].ToString() + @"   " + sSearchColumn + ": " + row[sSearchColumn].ToString();
                                sbLogging.AppendLine("Green Book Id: " + row["sGBID"].ToString() + @"   " + sSearchColumn + ": " + row[sSearchColumn].ToString());
                                continue;
                            }
                        }

                        this.Refresh();
                        Application.DoEvents();
                    }

                    string sEndProcess = DateTime.Now.ToString();

                    lblResultRelation.Text = @" ===================================";
                    lblResultRelation.Text += Environment.NewLine + "             Summary Count";
                    lblResultRelation.Text += Environment.NewLine + "===================================";
                    lblResultRelation.Text += Environment.NewLine + "Start Process: " + sStartProcess;
                    lblResultRelation.Text += Environment.NewLine + "End Process: " + sEndProcess;
                    lblResultRelation.Text += Environment.NewLine + "Total Records: " + dt.Rows.Count;
                    lblResultRelation.Text += Environment.NewLine + "Dirty Records Count for " + sSearchColumn + ": " + nDirtyRecordCount.ToString();
                    lblResultRelation.Text += Environment.NewLine + "Number But Not found for " + sSearchColumn + ": " + nNumberButNotFound.ToString();
                    lblResultRelation.Text += Environment.NewLine + "String with Empty for " + sSearchColumn + ": " + nStringWithEmpty.ToString();
                    lblResultRelation.Text += Environment.NewLine + "Not Number But String for " + sSearchColumn + ": " + nNotNumberButString.ToString();
                    lblResultRelation.Text += Environment.NewLine + "===================================";

                    sbLogging.AppendLine("===================================");
                    sbLogging.AppendLine("             Summary Count");
                    sbLogging.AppendLine("===================================");
                    sbLogging.AppendLine("Start Process: " + sStartProcess);
                    sbLogging.AppendLine("End Process: " + sEndProcess);
                    sbLogging.AppendLine("Total Records: " + dt.Rows.Count);
                    sbLogging.AppendLine("Dirty Records Count for " + sSearchColumn + ": " + nDirtyRecordCount.ToString());
                    sbLogging.AppendLine("Number But Not found for " + sSearchColumn + ": " + nNumberButNotFound.ToString());
                    sbLogging.AppendLine("String with Empty for " + sSearchColumn + ": " + nStringWithEmpty.ToString());
                    sbLogging.AppendLine("Not Number But String for " + sSearchColumn + ": " + nNotNumberButString.ToString());
                    sbLogging.AppendLine("===================================");

                    File.AppendAllText(sLogFolderPath + "DirtyRecords-" + sSearchColumn + "-" + Guid.NewGuid().ToString() + ".txt", sbLogging.ToString());
                    sbLogging.Clear();


                    cnn.Close();

                }
                catch (Exception ex)
                {
                    lblResultRelation.Text += Environment.NewLine + ex.ToString();
                }
            }
            else
            {
                cnn = new MySqlConnection(connetionString);
                try
                {
                    cnn.Open();
                    //string sSearchColumn = string.Empty;
                    //sSearchColumn = 
                    string query = "SELECT sGBIDParent FROM lnkgbchildren";
                    MySqlCommand cmd = new MySqlCommand(query, cnn);
                    MySqlDataAdapter returnVal = new MySqlDataAdapter(query, cnn);
                    DataTable dt = new DataTable("tblGreenBook");
                    returnVal.Fill(dt);
                    string sStartProcess = DateTime.Now.ToString();
                    if (dt != null || dt.Rows.Count > 0)
                    {
                        progressBarProcess.Minimum = 0;
                        progressBarProcess.Maximum = dt.Rows.Count;
                        progressBarProcess.Step = 1;
                    }
                    else
                    {
                        progressBarProcess.Minimum = 0;
                        progressBarProcess.Maximum = 1;
                        progressBarProcess.Step = 1;
                        progressBarProcess.PerformStep();
                    }

                    //Iterate through Items 
                    Int64 nRecordCount = 0;
                    foreach (DataRow row in dt.Rows)
                    {
                        progressBarProcess.PerformStep();

                        if (row["sGBIDParent"] == DBNull.Value)
                        {
                            continue;
                        }
                        //If the sSearchColumn value is numeric
                        if (Int64.TryParse(row["sGBIDParent"].ToString(), out long longValue))
                        {
                            //this is number
                            query = "select sGBID from tblgreenbook where sGBID = '" + row["sGBIDParent"].ToString() + "'";
                            MySqlCommand cmdExist = new MySqlCommand(query, cnn);
                            MySqlDataAdapter returnValExist = new MySqlDataAdapter(query, cnn);
                            DataTable dtExist = new DataTable("tblGreenBook");
                            returnValExist.Fill(dtExist);

                            if (dtExist == null || dtExist.Rows.Count <= 0)
                            {
                                nDirtyRecordCount++;
                                nNumberButNotFound++;
                                lblResultRelation.Text = @"GB Id: " + row["sGBIDParent"].ToString();
                                sbLogging.AppendLine("Green Book Id: " + row["sGBIDParent"].ToString());
                                continue;
                            }
                        }
                        else  // this is string
                        {
                            if (row["sGBID"].ToString().Trim() == string.Empty)
                            {
                                nDirtyRecordCount++;
                                nStringWithEmpty++;
                                lblResultRelation.Text = @"GB Id: " + row["sGBIDParent"].ToString();
                                sbLogging.AppendLine("Green Book Id: " + row["sGBIDParent"].ToString());
                                continue;
                            }
                            else
                            {
                                nDirtyRecordCount++;
                                nNotNumberButString++;
                                lblResultRelation.Text = @"GB Id: " + row["sGBIDParent"].ToString();
                                sbLogging.AppendLine("Green Book Id: " + row["sGBIDParent"].ToString());
                                continue;
                            }
                        }

                        nRecordCount++;
                        labelRecordCount.Text = nRecordCount.ToString() + @"\" + dt.Rows.Count.ToString();
                        this.Refresh();
                        Application.DoEvents();
                    }
                    string sEndProcess = DateTime.Now.ToString();

                    lblResultRelation.Text = @"===================================";
                    lblResultRelation.Text += Environment.NewLine + "             Summary Count";
                    lblResultRelation.Text += Environment.NewLine + "===================================";
                    lblResultRelation.Text += Environment.NewLine + "Start Process: " + sStartProcess;
                    lblResultRelation.Text += Environment.NewLine + "End Process: " + sEndProcess;
                    lblResultRelation.Text += Environment.NewLine + "Total Records: " + dt.Rows.Count;
                    lblResultRelation.Text += Environment.NewLine + "Dirty Records Count for Child: " + nDirtyRecordCount.ToString();
                    lblResultRelation.Text += Environment.NewLine + "Number But Not found for Child: " + nNumberButNotFound.ToString();
                    lblResultRelation.Text += Environment.NewLine + "String with Empty for Child: " + nStringWithEmpty.ToString();
                    lblResultRelation.Text += Environment.NewLine + "Not Number But String for Child: " + nNotNumberButString.ToString();
                    lblResultRelation.Text += Environment.NewLine + "===================================";

                    sbLogging.AppendLine("===================================");
                    sbLogging.AppendLine("             Summary Count");
                    sbLogging.AppendLine("===================================");
                    sbLogging.AppendLine("Start Process: " + sStartProcess);
                    sbLogging.AppendLine("End Process: " + sEndProcess);
                    sbLogging.AppendLine("Total Records: " + dt.Rows.Count);
                    sbLogging.AppendLine("Dirty Records Count for Child: " + nDirtyRecordCount.ToString());
                    sbLogging.AppendLine("Number But Not found for Child: " + nNumberButNotFound.ToString());
                    sbLogging.AppendLine("String with Empty for Child: " + nStringWithEmpty.ToString());
                    sbLogging.AppendLine("Not Number But String for Child: " + nNotNumberButString.ToString());
                    sbLogging.AppendLine("===================================");

                    File.AppendAllText(sLogFolderPath + "DirtyRecords-Children-" + Guid.NewGuid().ToString() + ".txt", sbLogging.ToString());
                    sbLogging.Clear();


                    cnn.Close();
                }
                catch (Exception ex)
                {
                    lblResultRelation.Text += Environment.NewLine + ex.ToString();
                }
            }
        }


        #region Chatrel

        private void buttonGetChartelNow_Click(object sender, EventArgs e)
        {
            string connetionString = null;
            MySqlConnection cnn;
            connetionString = txtConnectionString.Text;
            string sLogFolderPath = txtLogFolderPath.Text;
            string sPathPrifix = txtImagePath.Text;
            string sGBId = textBox1.Text;
            int nPaidUntil = 0;
            string sName = string.Empty;
            int nAuthRegionID = 0;
            string sCountryID = string.Empty;
            string sCurrencyCode = string.Empty;
            string sDOB = string.Empty;
            int nAge = 0;
            string isChild = string.Empty;
            cnn = new MySqlConnection(connetionString);
            progressBarProcess.Value = 0;
            progressBarProcess.Refresh();


            try
            {
                cnn.Open();

                //string query = "SELECT sGBID FROM tblGreenBook";
                string query = "SELECT tblgreenbook.sGBId, SUBSTRING(tblgreenbook.sPaidUntil,1,4) as sPaidUntil , concat(COALESCE(`sFirstName`,'') , ' ' , COALESCE(`sLastName`,'')) as sName , tblgreenbook.nAuthRegionID , lstauthregion.sCountryID  , lstauthregion.sCurrencyCode,  lstauthregion.sAuthRegion , tblgreenbook.dtdob ,  DATE_FORMAT(FROM_DAYS(DATEDIFF(now(),tblgreenbook.dtdob)),'%Y')+0 AS age,   DATE_FORMAT(FROM_DAYS(DATEDIFF(now(),tblgreenbook.dtdob)),'%Y')+0 >=6 and DATE_FORMAT(FROM_DAYS(DATEDIFF(now(),tblgreenbook.dtdob)),'%Y')+0 <18 AS IsChild FROM tblgreenbook  Left Outer Join lstauthregion on lstauthregion.ID = tblgreenbook.nAuthRegionID WHERE sGBId = '" + sGBId + "'";
                //string query = "select sGBID from tblgreenbook where sGBID = 0000000";
                MySqlCommand cmd = new MySqlCommand(query, cnn);
                MySqlDataAdapter returnVal = new MySqlDataAdapter(query, cnn);
                DataTable dt = new DataTable("tblgreenbook");
                returnVal.Fill(dt);

                if (dt != null && dt.Rows.Count > 0)
                {
                    //Calculate the chartel pending amount from dt.Rows[0]["sPaidUntil"]
                    nPaidUntil = dt.Rows[0]["sPaidUntil"] != "" ? Convert.ToInt32(dt.Rows[0]["sPaidUntil"]) : 2011;
                    sName = dt.Rows[0]["sName"].ToString();
                    nAuthRegionID = Convert.ToInt32(dt.Rows[0]["nAuthRegionID"]);
                    sCountryID = dt.Rows[0]["sCountryID"].ToString();
                    sCurrencyCode = dt.Rows[0]["sCurrencyCode"].ToString();
                    sDOB = dt.Rows[0]["dtDOB"].ToString();
                    nAge = Convert.ToInt32(dt.Rows[0]["age"]);
                    isChild = dt.Rows[0]["IsChild"].ToString();
                    labelChatrelResult.Text = nPaidUntil.ToString();
                    labelChatrelResult.Text = "Total Chatrel Balance: $" + getChatrelAmount(nPaidUntil, sCurrencyCode, isChild == "0" ? false : true) + " from the year " + nPaidUntil.ToString();
                    DataTable dtChatrelPending = getChatrelDataTable(nPaidUntil, sName, nAuthRegionID, sCountryID, sCurrencyCode, sDOB, isChild == "0" ? false : true);

                }
                else
                {
                    nPaidUntil = 2011;
                    labelChatrelResult.Text = "Invalid GB Id";
                }

                cnn.Close();

            }
            catch (Exception ex)
            {
                labelChatrelResult.Text += Environment.NewLine + ex.ToString();
            }


        }

        private string getChatrelAmount(int nChatrelYear, string sCurrencyCode, bool isChild)
        {

            double nChatrelAmount = sCurrencyCode == "USD" ? 36 : 48;
            double nChatrelMeal = sCurrencyCode == "USD" ? 10 : 10;
            double nChatrelSalaryAmt = sCurrencyCode == "USD" ? 50 : 0;
            double nChatrelLateFeesPercentage = sCurrencyCode == "USD" ? 10 : 10;
            double nChatrelStartYear = 2011;
            int nGracePeriodInMonths = 1;
            double nChatrelCurrentYear = DateTime.Today.Year;
            double nChatrelPendingYears = 0;
            decimal nLateFeeCharge = 0;
            //Calculate
            if (isChild)
            {
                nChatrelAmount = sCurrencyCode == "USD" ? 12 : 12;
            }

            if (nChatrelYear < nChatrelStartYear)
            {
                nChatrelYear = 2011;
            }

            nChatrelPendingYears = nChatrelCurrentYear - nChatrelYear;

            if (nChatrelPendingYears > 1)
            {
                nLateFeeCharge = (((Convert.ToDecimal(nChatrelAmount) + Convert.ToDecimal(nChatrelMeal)) * Convert.ToDecimal(nChatrelPendingYears)) * 10) / 100;
            }

            //Int64 nTotalChatrelAmount = ((nChatrelAmount + nChatrelMeal) * nChatrelPendingYears) + nLateFeeCharge;
            decimal nTotalChatrelAmount = Math.Round((Convert.ToDecimal(nChatrelAmount + nChatrelMeal) * Convert.ToDecimal(nChatrelPendingYears + 1)) + nLateFeeCharge, 2);

            label7.Text = "Calculation : (" + nChatrelAmount.ToString() + " + " + nChatrelMeal.ToString() + ") * (" + nChatrelPendingYears.ToString() + " + 1) + "
                + Math.Round(nLateFeeCharge, 2).ToString() + " = " + nTotalChatrelAmount.ToString("0.00");



            return nTotalChatrelAmount.ToString("0.00");
        }

        private DataTable getChatrelDataTable(int nChatrelYear, string sName, int nAuthRegionID, string sCountryID, string sCurrencyCode, string sDOB, bool isChild)
        {
            double nChatrelAmount = sCurrencyCode == "USD" ? 36 : 48;
            double nChatrelMeal = sCurrencyCode == "USD" ? 10 : 10;
            double nChatrelSalaryAmt = sCurrencyCode == "USD" ? 50 : 0;
            double nChatrelLateFeesPercentage = sCurrencyCode == "USD" ? 10 : 10;
            double nChatrelStartYear = 2011;
            int nGracePeriodInMonths = 1;
            double nChatrelCurrentYear = DateTime.Today.Year;
            double nChatrelPendingYears = 0;
            decimal nLateFeeCharge = 0;
            DateTime dtDOB = Convert.ToDateTime(sDOB);
            double dLateFee = 0;
            //Calculate
            if (isChild)
            {
                nChatrelAmount = 12;
            }


            if (nChatrelYear < nChatrelStartYear)
            {
                nChatrelYear = 2011;
            }

            nChatrelPendingYears = nChatrelCurrentYear - nChatrelYear;

            if (nChatrelPendingYears > 1)
            {
                nLateFeeCharge = (((Convert.ToDecimal(nChatrelAmount) + Convert.ToDecimal(nChatrelMeal)) * Convert.ToDecimal(nChatrelPendingYears)) * 10) / 100;
            }

            //Int64 nTotalChatrelAmount = ((nChatrelAmount + nChatrelMeal) * nChatrelPendingYears) + nLateFeeCharge;
            decimal nTotalChatrelAmount = Math.Round((Convert.ToDecimal(nChatrelAmount + nChatrelMeal) * Convert.ToDecimal(nChatrelPendingYears + 1)) + nLateFeeCharge, 2);

            label7.Text = "Calculation : (" + nChatrelAmount.ToString() + " + " + nChatrelMeal.ToString() + ") * (" + nChatrelPendingYears.ToString() + " + 1) + "
                + Math.Round(nLateFeeCharge, 2).ToString() + " = " + nTotalChatrelAmount.ToString("0.00");

            DataTable lnkGBChatrelPending = GetTable();
            int countRow = 0;
            for (int i = 0; i < nChatrelPendingYears; i++)
            {


                nChatrelAmount = getChartelAmountForChildYear(dtDOB, nChatrelYear, 1, Convert.ToInt32(sCurrencyCode == "USD" ? 36 : 48 / 12));
                if (nChatrelAmount == 0)
                {
                    nChatrelYear++;
                    continue;
                }
                if (i + 1 == nChatrelPendingYears && nGracePeriodInMonths > 0)
                {
                    dLateFee = DateTime.Now >= Convert.ToDateTime(nChatrelYear.ToString() + "-03-31").AddMonths(nGracePeriodInMonths) ? (((nChatrelAmount + nChatrelMeal) * nChatrelLateFeesPercentage) / 100d) : 0;
                }
                else
                {
                    dLateFee = (((nChatrelAmount + nChatrelMeal) * nChatrelLateFeesPercentage) / 100d);
                }
                //double dLateFee = (((nChatrelAmount + nChatrelMeal) * nChatrelLateFeesPercentage) / 100d);
                lnkGBChatrelPending.Rows.Add(
                    i + 1,
                    sName,
                    nChatrelAmount,
                    nChatrelMeal,
                    nChatrelYear,
                    dLateFee,
                    0,
                    0,
                    0,
                    (nChatrelAmount + nChatrelMeal + dLateFee),
                    DateTime.Now,
                    nAuthRegionID,
                    sCountryID,
                    sCurrencyCode);
                countRow++;
                nChatrelYear++;
            }
            nChatrelAmount = getChartelAmountForChildYear(dtDOB, nChatrelYear, 1, Convert.ToInt32(sCurrencyCode == "USD" ? 36 : 48 / 12));

            countRow++;

            lnkGBChatrelPending.Rows.Add(
                    countRow,
                    sName,
                    nChatrelAmount,
                    nChatrelMeal,
                    nChatrelYear,
                    0,
                    0,
                    0,
                    0,
                    (nChatrelAmount + nChatrelMeal + 0),
                    DateTime.Now,
                    nAuthRegionID,
                    sCountryID,
                    sCurrencyCode);

            //return nTotalChatrelAmount.ToString("0.00");
            return lnkGBChatrelPending;
        }

        private int getChartelAmountForChildYear(DateTime dtDOB, int CurrentYear, int ChildMonthChatrelAmount, int AdultMonthChatrelAmount)
        {
            string str = "31 Mar " + (CurrentYear + 1);
            DateTime endDateOfCurrentYear;

            if (DateTime.TryParse(str, out endDateOfCurrentYear))
            {
                TimeSpan ts = endDateOfCurrentYear - dtDOB;
                DateTime Age = DateTime.MinValue.AddDays(ts.Days);
                //MessageBox.Show(string.Format(" {0} Years {1} Month {2} Days", Age.Year - 1, Age.Month - 1, Age.Day - 1));

                if (Age.Year - 1 == 6)
                {
                    return Age.Month * ChildMonthChatrelAmount;
                }
                else if (Age.Year - 1 >= 7 && Age.Year - 1 <= 17)
                {
                    return 12 * ChildMonthChatrelAmount;
                }
                else if (Age.Year - 1 == 18)
                {
                    return ((12 - Age.Month) * ChildMonthChatrelAmount) + (Age.Month * AdultMonthChatrelAmount);
                }
                else if (Age.Year - 1 > 18)
                {
                    return 12 * AdultMonthChatrelAmount;
                }
                else
                {
                    return 0;
                }
            }
            else
            {
                return 0;
            }
        }

        static DataTable GetTable()
        {
            //we create a DataTable.
            //columns, each with a Type.
            DataTable table = new DataTable();
            table.Columns.Add("Id", typeof(int));
            table.Columns.Add("sName", typeof(string));
            table.Columns.Add("nChatrel", typeof(int));
            table.Columns.Add("nMeal", typeof(int));
            table.Columns.Add("nYear", typeof(int));
            table.Columns.Add("nLateFees", typeof(decimal));
            table.Columns.Add("nChatrelSalaryAmt", typeof(int));
            table.Columns.Add("nBusinessDonation", typeof(int));
            table.Columns.Add("nAdditionalDonation", typeof(int));
            table.Columns.Add("nTotalAmount", typeof(decimal));
            table.Columns.Add("dtPayment", typeof(DateTime));
            table.Columns.Add("nAuthRegionId", typeof(int));
            table.Columns.Add("sCountryId", typeof(string));
            table.Columns.Add("sCurrencyCode", typeof(string));

            return table;
        }

        #endregion

        #region Dummy Data
        private void buttonGenerateDummyData_Click(object sender, EventArgs e)
        {
            #region program
            string connetionString = null;
            MySqlConnection cnn;
            connetionString = txtConnectionString.Text;
            string sLogFolderPath = txtLogFolderPath.Text;
            string sDummyColumn = string.Empty;
            string sDummyData = string.Empty;
            string sFirstNameData = string.Empty;
            string sMiddleNameData = string.Empty;
            string sLastNameData = string.Empty;
            string sFamilyNameData = string.Empty;
            string sPhoneData = string.Empty;
            string sEmailData = string.Empty;
            string sFathersNameData = string.Empty;
            string sMothersNameData = string.Empty;
            string sSpouseNameData = string.Empty;
            string sAddress1Data = string.Empty;
            string sAddress2Data = string.Empty;
            string sPCodeData = string.Empty;
            string TibetanNameData = string.Empty;
            string TBUPlaceOfBirthData = string.Empty;
            string TBUOriginVillageData = string.Empty;
            string TBUFathersNameData = string.Empty;
            string TBUMothersNameData = string.Empty;
            string TBUSpouseNameData = string.Empty;
            string updateString = string.Empty;
            progressBarProcess.Value = 0;
            progressBarProcess.Refresh();

            if (checkBoxsFirstName.Checked) { sDummyColumn += sDummyColumn.Length > 0 ? ", " + checkBoxsFirstName.Text : checkBoxsFirstName.Text; }
            if (checkBoxsMiddleName.Checked) { sDummyColumn += sDummyColumn.Length > 0 ? ", " + checkBoxsMiddleName.Text : checkBoxsMiddleName.Text; }
            if (checkBoxsLastName.Checked) { sDummyColumn += sDummyColumn.Length > 0 ? ", " + checkBoxsLastName.Text : checkBoxsLastName.Text; }
            if (checkBoxsFamilyName.Checked) { sDummyColumn += sDummyColumn.Length > 0 ? ", " + checkBoxsFamilyName.Text : checkBoxsFamilyName.Text; }
            if (checkBoxsPhone.Checked) { sDummyColumn += sDummyColumn.Length > 0 ? ", " + checkBoxsPhone.Text : checkBoxsPhone.Text; }
            if (checkBoxsEmail.Checked) { sDummyColumn += sDummyColumn.Length > 0 ? ", " + checkBoxsEmail.Text : checkBoxsEmail.Text; }
            if (checkBoxsFathersName.Checked) { sDummyColumn += sDummyColumn.Length > 0 ? ", " + checkBoxsFathersName.Text : checkBoxsFathersName.Text; }
            if (checkBoxsMothersName.Checked) { sDummyColumn += sDummyColumn.Length > 0 ? ", " + checkBoxsMothersName.Text : checkBoxsMothersName.Text; }
            if (checkBoxsSpouseName.Checked) { sDummyColumn += sDummyColumn.Length > 0 ? ", " + checkBoxsSpouseName.Text : checkBoxsSpouseName.Text; }
            if (checkBoxsAddress1.Checked) { sDummyColumn += sDummyColumn.Length > 0 ? ", " + checkBoxsAddress1.Text : checkBoxsAddress1.Text; }
            if (checkBoxsAddress2.Checked) { sDummyColumn += sDummyColumn.Length > 0 ? ", " + checkBoxsAddress2.Text : checkBoxsAddress2.Text; }
            if (checkBoxsPCode.Checked) { sDummyColumn += sDummyColumn.Length > 0 ? ", " + checkBoxsPCode.Text : checkBoxsPCode.Text; }
            if (checkBoxTibetanName.Checked) { sDummyColumn += sDummyColumn.Length > 0 ? ", " + checkBoxTibetanName.Text : checkBoxTibetanName.Text; }
            if (checkBoxTBUPlaceOfBirth.Checked) { sDummyColumn += sDummyColumn.Length > 0 ? ", " + checkBoxTBUPlaceOfBirth.Text : checkBoxTBUPlaceOfBirth.Text; }
            if (checkBoxTBUOriginVillage.Checked) { sDummyColumn += sDummyColumn.Length > 0 ? ", " + checkBoxTBUOriginVillage.Text : checkBoxTBUOriginVillage.Text; }
            if (checkBoxTBUFathersName.Checked) { sDummyColumn += sDummyColumn.Length > 0 ? ", " + checkBoxTBUFathersName.Text : checkBoxTBUFathersName.Text; }
            if (checkBoxTBUMothersName.Checked) { sDummyColumn += sDummyColumn.Length > 0 ? ", " + checkBoxTBUMothersName.Text : checkBoxTBUMothersName.Text; }
            if (checkBoxTBUSpouseName.Checked) { sDummyColumn += sDummyColumn.Length > 0 ? ", " + checkBoxTBUSpouseName.Text : checkBoxTBUSpouseName.Text; }

            if (sDummyColumn.Length <= 0)
            {
                labelDummyDataReport.Text = "Please select Column";
            }
            else
            {

                cnn = new MySqlConnection(connetionString);
                try
                {
                    cnn.Open();
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook Limit 1000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook  where sBookIssued like '%2012%'";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook  where sBookIssued like '%2011%'";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook  where sBookIssued like '%2010%'";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook  where sBookIssued like '%2009%'";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook  where sBookIssued like '%2008%'";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook  where sBookIssued like '%2007%'";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook  where sBookIssued like '%2006%'";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook  where sBookIssued like '%2005%' and  sCountryID !='IN'";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook  where sBookIssued like '%2005%' and sCountryID ='IN' and nChildrenM = 0 and nChildrenF = 0";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook  where sBookIssued like '%2005%' and sCountryID ='IN' and nChildrenM = 0 and nChildrenF = 0 and sDOBApprox = 'N' and  sGender = 'M'";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook  where sBookIssued like '%2005%' and sCountryID ='IN' and nChildrenM = 0 and nChildrenF = 0 and sDOBApprox = 'N' and  sGender = 'F'";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook  where sBookIssued like '%2005%' and sCountryID ='IN' and nChildrenM = 0 and nChildrenF = 0 and sDOBApprox = 'M' ";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook  where sBookIssued like '%2005%' and sCountryID ='IN' and nChildrenM = 0 and nChildrenF = 0 and sDOBApprox = 'Y'";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook  where sBookIssued like '%2005%' and sCountryID ='IN' and nChildrenM = 0 and nChildrenF = 0 and sDOBApprox = 'D'";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook  where sBookIssued like '%2005%' and sCountryID ='IN' and nChildrenM = 0 and nChildrenF in (1,2,3,4,5)";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook  where sBookIssued like '%2005%' and sCountryID ='IN' and nChildrenM = 0 and nChildrenF > 5";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook  where sBookIssued like '%2005%' and sCountryID ='IN' and nChildrenM in (1,2,3,4,5)";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook  where sBookIssued like '%2005%' and sCountryID ='IN' and nChildrenM > 5";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook  where sBookIssued like '%2004%'";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook  where sBookIssued like '%2003%'";
                    string query = "select sGBID," + sDummyColumn + " from tblgreenbook  where sBookIssued is null";

                    //select * from tblgreenbook  where sBookIssued is null;

                    // where sBookIssued like '%2012%'
                    MySqlCommand cmd = new MySqlCommand(query, cnn);
                    MySqlDataAdapter returnVal = new MySqlDataAdapter(query, cnn);
                    DataTable dt = new DataTable("tblGreenBook");
                    returnVal.Fill(dt);
                    string sStartProcess = DateTime.Now.ToString();
                    Int64 nInsertedFileCount = 0;
                    Int64 nNotUpdateCount = 0;
                    StringBuilder sbLogging = new StringBuilder();

                    if (dt != null || dt.Rows.Count > 0)
                    {
                        progressBarProcess.Minimum = 0;
                        progressBarProcess.Maximum = dt.Rows.Count;
                        progressBarProcess.Step = 1;
                    }
                    else
                    {
                        progressBarProcess.Minimum = 0;
                        progressBarProcess.Maximum = 1;
                        progressBarProcess.Step = 1;
                        progressBarProcess.PerformStep();
                    }

                    //Iterate through Items 
                    foreach (DataRow row in dt.Rows)
                    {
                        progressBarProcess.PerformStep();
                        updateString = string.Empty;

                        if (row["sGBID"] == DBNull.Value)
                        {
                            continue;
                        }

                        string sGBNum = row["sGBID"].ToString().Trim();
                        if (sDummyColumn.Contains("sFirstName")) { sFirstNameData = row["sFirstName"].ToString().Trim(); }
                        if (sDummyColumn.Contains("sMiddleName")) { sMiddleNameData = row["sMiddleName"].ToString().Trim(); }
                        if (sDummyColumn.Contains("sLastName")) { sLastNameData = row["sLastName"].ToString().Trim(); }
                        if (sDummyColumn.Contains("sFamilyName")) { sFamilyNameData = row["sFamilyName"].ToString().Trim(); }
                        if (sDummyColumn.Contains("sPhone")) { sPhoneData = row["sPhone"].ToString().Trim(); }
                        if (sDummyColumn.Contains("sEmail")) { sEmailData = row["sEmail"].ToString().Trim(); }
                        if (sDummyColumn.Contains("sFathersName")) { sFathersNameData = row["sFathersName"].ToString().Trim(); }
                        if (sDummyColumn.Contains("sMothersName")) { sMothersNameData = row["sMothersName"].ToString().Trim(); }
                        if (sDummyColumn.Contains("sSpouseName")) { sSpouseNameData = row["sSpouseName"].ToString().Trim(); }
                        if (sDummyColumn.Contains("sAddress1")) { sAddress1Data = row["sAddress1"].ToString().Trim(); }
                        if (sDummyColumn.Contains("sAddress2")) { sAddress2Data = row["sAddress2"].ToString().Trim(); }
                        if (sDummyColumn.Contains("sPCode")) { sPCodeData = row["sPCode"].ToString().Trim(); }
                        if (sDummyColumn.Contains("TibetanName")) { TibetanNameData = row["TibetanName"].ToString().Trim(); }
                        if (sDummyColumn.Contains("TBUPlaceOfBirth")) { TBUPlaceOfBirthData = row["TBUPlaceOfBirth"].ToString().Trim(); }
                        if (sDummyColumn.Contains("TBUOriginVillage")) { TBUOriginVillageData = row["TBUOriginVillage"].ToString().Trim(); }
                        if (sDummyColumn.Contains("TBUFathersName")) { TBUFathersNameData = row["TBUFathersName"].ToString().Trim(); }
                        if (sDummyColumn.Contains("TBUMothersName")) { TBUMothersNameData = row["TBUMothersName"].ToString().Trim(); }
                        if (sDummyColumn.Contains("TBUSpouseName")) { TBUSpouseNameData = row["TBUSpouseName"].ToString().Trim(); }

                        if (sFirstNameData.Length > 0) { updateString += updateString.Length <= 0 ? "`sFirstName` = @sFirstName " : ", `sFirstName` = @sFirstName "; }
                        if (sMiddleNameData.Length > 0) { updateString += updateString.Length <= 0 ? "`sMiddleName` = @sMiddleName " : ", `sMiddleName` = @sMiddleName "; }
                        if (sLastNameData.Length > 0) { updateString += updateString.Length <= 0 ? "`sLastName` = @sLastName " : ", `sLastName` = @sLastName "; }
                        if (sFamilyNameData.Length > 0) { updateString += updateString.Length <= 0 ? "`sFamilyName` = @sFamilyName " : ", `sFamilyName` = @sFamilyName "; }
                        if (sPhoneData.Length > 0) { updateString += updateString.Length <= 0 ? "`sPhone` = @sPhone " : ", `sPhone` = @sPhone "; }
                        if (sEmailData.Length > 0) { updateString += updateString.Length <= 0 ? "`sEmail` = @sEmail " : ", `sEmail` = @sEmail "; }
                        if (sFathersNameData.Length > 0) { updateString += updateString.Length <= 0 ? "`sFathersName` = @sFathersName " : ", `sFathersName` = @sFathersName "; }
                        if (sMothersNameData.Length > 0) { updateString += updateString.Length <= 0 ? "`sMothersName` = @sMothersName " : ", `sMothersName` = @sMothersName "; }
                        if (sSpouseNameData.Length > 0) { updateString += updateString.Length <= 0 ? "`sSpouseName` = @sSpouseName " : ", `sSpouseName` = @sSpouseName "; }
                        if (sAddress1Data.Length > 0) { updateString += updateString.Length <= 0 ? "`sAddress1` = @sAddress1 " : ", `sAddress1` = @sAddress1 "; }
                        if (sAddress2Data.Length > 0) { updateString += updateString.Length <= 0 ? "`sAddress2` = @sAddress2 " : ", `sAddress2` = @sAddress2 "; }
                        if (sPCodeData.Length > 0) { updateString += updateString.Length <= 0 ? "`sPCode` = @sPCode " : ", `sPCode` = @sPCode "; }
                        if (TibetanNameData.Length > 0) { updateString += updateString.Length <= 0 ? "`TibetanName` = @TibetanName " : ", `TibetanName` = @TibetanName "; }
                        if (TBUPlaceOfBirthData.Length > 0) { updateString += updateString.Length <= 0 ? "`TBUPlaceOfBirth` = @TBUPlaceOfBirth " : ", `TBUPlaceOfBirth` = @TBUPlaceOfBirth "; }
                        if (TBUOriginVillageData.Length > 0) { updateString += updateString.Length <= 0 ? "`TBUOriginVillage` = @TBUOriginVillage " : ", `TBUOriginVillage` = @TBUOriginVillage "; }
                        if (TBUFathersNameData.Length > 0) { updateString += updateString.Length <= 0 ? "`TBUFathersName` = @TBUFathersName " : ", `TBUFathersName` = @TBUFathersName "; }
                        if (TBUMothersNameData.Length > 0) { updateString += updateString.Length <= 0 ? "`TBUMothersName` = @TBUMothersName " : ", `TBUMothersName` = @TBUMothersName "; }
                        if (TBUSpouseNameData.Length > 0) { updateString += updateString.Length <= 0 ? "`TBUSpouseName` = @TBUSpouseName " : ", `TBUSpouseName` = @TBUSpouseName "; }

                        if (updateString != string.Empty)
                        {
                            string cmdString = "UPDATE `tblgreenbook`  SET " + updateString + "WHERE `sGBID` = @sGBID;";



                            cmd = new MySqlCommand(cmdString, cnn);

                            cmd.Parameters.Add("@sGBId", MySqlDbType.VarChar, 255);
                            cmd.Parameters["@sGBId"].Value = row["sGBID"].ToString();


                            if (sFirstNameData.Length > 0)
                            {
                                cmd.Parameters.Add("@sFirstName", MySqlDbType.VarChar, 255);
                                cmd.Parameters["@sFirstName"].Value = RandomDummyData(sFirstNameData.Length, sFirstNameData, false);
                            }
                            if (sMiddleNameData.Length > 0)
                            {
                                cmd.Parameters.Add("@sMiddleName", MySqlDbType.VarChar, 255);
                                cmd.Parameters["@sMiddleName"].Value = RandomDummyData(sMiddleNameData.Length, sMiddleNameData, false);
                            }
                            if (sLastNameData.Length > 0)
                            {
                                cmd.Parameters.Add("@sLastName", MySqlDbType.VarChar, 255);
                                cmd.Parameters["@sLastName"].Value = RandomDummyData(sLastNameData.Length, sLastNameData, false);
                            }
                            if (sFamilyNameData.Length > 0)
                            {
                                cmd.Parameters.Add("@sFamilyName", MySqlDbType.VarChar, 255);
                                cmd.Parameters["@sFamilyName"].Value = RandomDummyData(sFamilyNameData.Length, sFamilyNameData, false);
                            }
                            if (sPhoneData.Length > 0)
                            {
                                cmd.Parameters.Add("@sPhone", MySqlDbType.VarChar, 255);
                                cmd.Parameters["@sPhone"].Value = RandomDummyPhoneData(sPhoneData.Length, sPhoneData, true);
                            }
                            if (sEmailData.Length > 0)
                            {
                                cmd.Parameters.Add("@sEmail", MySqlDbType.VarChar, 255);
                                cmd.Parameters["@sEmail"].Value = RandomDummyEmailData(sEmailData.Length, sEmailData, false);
                            }
                            if (sFathersNameData.Length > 0)
                            {
                                cmd.Parameters.Add("@sFathersName", MySqlDbType.VarChar, 255);
                                cmd.Parameters["@sFathersName"].Value = RandomDummyData(sFathersNameData.Length, sFathersNameData, false);
                            }
                            if (sMothersNameData.Length > 0)
                            {
                                cmd.Parameters.Add("@sMothersName", MySqlDbType.VarChar, 255);
                                cmd.Parameters["@sMothersName"].Value = RandomDummyData(sMothersNameData.Length, sMothersNameData, false);
                            }
                            if (sSpouseNameData.Length > 0)
                            {
                                cmd.Parameters.Add("@sSpouseName", MySqlDbType.VarChar, 255);
                                cmd.Parameters["@sSpouseName"].Value = RandomDummyData(sSpouseNameData.Length, sSpouseNameData, false);
                            }

                            if (sAddress1Data.Length > 0)
                            {
                                cmd.Parameters.Add("@sAddress1", MySqlDbType.VarChar, 255);
                                cmd.Parameters["@sAddress1"].Value = RandomDummyData(sAddress1Data.Length, sAddress1Data, false);
                            }
                            if (sAddress2Data.Length > 0)
                            {
                                cmd.Parameters.Add("@sAddress2", MySqlDbType.VarChar, 255);
                                cmd.Parameters["@sAddress2"].Value = RandomDummyData(sAddress2Data.Length, sAddress2Data, false);
                            }
                            if (sPCodeData.Length > 0)
                            {
                                cmd.Parameters.Add("@sPCode", MySqlDbType.VarChar, 255);
                                cmd.Parameters["@sPCode"].Value = RandomDummyData(sPCodeData.Length, sPCodeData, false);
                            }

                            if (TibetanNameData.Length > 0)
                            {
                                cmd.Parameters.Add("@TibetanName", MySqlDbType.VarChar, 255);
                                cmd.Parameters["@TibetanName"].Value = RandomDummyData(TibetanNameData.Length, TibetanNameData, false);
                            }
                            if (TBUPlaceOfBirthData.Length > 0)
                            {
                                cmd.Parameters.Add("@TBUPlaceOfBirth", MySqlDbType.VarChar, 255);
                                cmd.Parameters["@TBUPlaceOfBirth"].Value = RandomDummyData(TBUPlaceOfBirthData.Length, TBUPlaceOfBirthData, false);
                            }
                            if (TBUOriginVillageData.Length > 0)
                            {
                                cmd.Parameters.Add("@TBUOriginVillage", MySqlDbType.VarChar, 255);
                                cmd.Parameters["@TBUOriginVillage"].Value = RandomDummyData(TBUOriginVillageData.Length, TBUOriginVillageData, false);
                            }

                            if (TBUFathersNameData.Length > 0)
                            {
                                cmd.Parameters.Add("@TBUFathersName", MySqlDbType.VarChar, 255);
                                cmd.Parameters["@TBUFathersName"].Value = RandomDummyData(TBUFathersNameData.Length, TBUFathersNameData, false);
                            }
                            if (TBUMothersNameData.Length > 0)
                            {
                                cmd.Parameters.Add("@TBUMothersName", MySqlDbType.VarChar, 255);
                                cmd.Parameters["@TBUMothersName"].Value = RandomDummyData(TBUMothersNameData.Length, TBUMothersNameData, false);
                            }
                            if (TBUSpouseNameData.Length > 0)
                            {
                                cmd.Parameters.Add("@TBUSpouseName", MySqlDbType.VarChar, 255);
                                cmd.Parameters["@TBUSpouseName"].Value = RandomDummyData(TBUSpouseNameData.Length, TBUSpouseNameData, false);
                            }


                            int RowsAffected = cmd.ExecuteNonQuery();
                            labelDummyDataReport.Text = @"GB Id: " + sGBNum;
                            sbLogging.AppendLine("Green Book Id: " + sGBNum);

                        }
                        else
                        {
                            labelDummyDataReport.Text = @"GB Id Not Updated: " + sGBNum;
                            sbLogging.AppendLine("Green Book Id Not Updated: " + sGBNum);
                            nNotUpdateCount++;
                        }
                        nInsertedFileCount++;
                        labelDummyDataReport.Text += " - " + nInsertedFileCount.ToString() + "/" + dt.Rows.Count.ToString();
                        //labelDummyDataReport.Refresh();
                        this.Refresh();
                        Application.DoEvents();

                    }

                    string sEndProcess = DateTime.Now.ToString();

                    cnn.Close();
                    labelDummyDataReport.Text = "============================";
                    labelDummyDataReport.Text += Environment.NewLine + "                Summary";
                    labelDummyDataReport.Text += Environment.NewLine + "============================";
                    labelDummyDataReport.Text += Environment.NewLine + "Start Process: " + sStartProcess;
                    labelDummyDataReport.Text += Environment.NewLine + "End Process: " + sEndProcess;
                    labelDummyDataReport.Text += Environment.NewLine + "Column Selected for Update: " + sDummyColumn.ToString();
                    labelDummyDataReport.Text += Environment.NewLine + "Number of GB Updated: " + nInsertedFileCount.ToString();
                    labelDummyDataReport.Text += Environment.NewLine + "Number of GB Not Updated: " + nNotUpdateCount.ToString();
                    labelDummyDataReport.Text += Environment.NewLine + "============================";

                    sbLogging.AppendLine("===================================");
                    sbLogging.AppendLine("             Summary");
                    sbLogging.AppendLine("===================================");
                    sbLogging.AppendLine("Start Process: " + sStartProcess);
                    sbLogging.AppendLine("End Process: " + sEndProcess);
                    sbLogging.AppendLine("Column Selected for Update: " + sDummyColumn.ToString());
                    sbLogging.AppendLine("Number of GB Updated: " + nInsertedFileCount.ToString());
                    sbLogging.AppendLine("Number of GB Not Updated: " + nNotUpdateCount.ToString());
                    sbLogging.AppendLine("===================================");

                    File.AppendAllText(sLogFolderPath + "Dummy Data log-" + Guid.NewGuid().ToString() + ".txt", sbLogging.ToString());
                    sbLogging.Clear();
                }
                catch (Exception ex)
                {
                    labelDummyDataReport.Text = Environment.NewLine + ex.ToString();
                }

            }
            #endregion

        }

        
        public static string RandomDummyPhoneData(int length, string orginalString, bool isNumber)
        {
            string[] columnDatasplit = orginalString.Split(" ");
            string tempData = string.Empty;
            string dummyData = string.Empty;

            for (int i = 0; i < columnDatasplit.Length; i++)
            {
                if (columnDatasplit[i].Trim() == "")
                {
                    continue;
                }
                else
                {
                    if (columnDatasplit[i].Contains("+"))
                    {
                        //tempData = RandomString(columnDatasplit[i].Substring(0, columnDatasplit[i].IndexOf("@")).Length, isNumber) + "@" + RandomString(7, isNumber) + ".com";
                        //dummyData = tempData.ToLower();
                        tempData = RandomString(columnDatasplit[i].Length, isNumber);
                        int[] tempDataIndex = AllIndexesOf(columnDatasplit[i], "+", false);
                        for (int tmp = 0; tmp < tempDataIndex.Length; tmp++)
                        {
                            char[] ch = tempData.ToCharArray();
                            ch[tempDataIndex[tmp]] = '+'; // index starts at 0!
                            tempData = new string(ch);
                        }

                        if (tempData.Length > 0)
                        {
                            dummyData += dummyData.Length <= 0 ? char.ToUpper(tempData[0]) + tempData.Substring(1).ToLower() : " " + char.ToUpper(tempData[0]) + tempData.Substring(1).ToLower(); ;
                        }
                        else
                        {
                            dummyData = string.Empty;
                        }

                        //columnDatasplit[i] columnDatasplit[i].Substring(0, columnDatasplit[i].IndexOf("+")).Length;
                    }
                    else
                    {
                        tempData = RandomString(columnDatasplit[i].Length, isNumber);
                        if (tempData.Length > 0)
                        {
                            dummyData += dummyData.Length <= 0 ? char.ToUpper(tempData[0]) + tempData.Substring(1).ToLower() : " " + char.ToUpper(tempData[0]) + tempData.Substring(1).ToLower(); ;
                        }
                        else
                        {
                            dummyData = string.Empty;
                        }
                    }
                }
            }

            return dummyData;

        }

        public static int[] AllIndexesOf(string str, string substr, bool ignoreCase = false)
        {
            if (string.IsNullOrWhiteSpace(str) ||
                string.IsNullOrWhiteSpace(substr))
            {
                throw new ArgumentException("String or substring is not specified.");
            }

            var indexes = new List<int>();
            int index = 0;

            while ((index = str.IndexOf(substr, index, ignoreCase ? StringComparison.OrdinalIgnoreCase : StringComparison.Ordinal)) != -1)
            {
                indexes.Add(index++);
            }

            return indexes.ToArray();
        }

        public static string RandomDummyEmailData(int length, string orginalString, bool isNumber)
        {
            string[] columnDatasplit = orginalString.Split(",");
            string tempData = string.Empty;
            string dummyData = string.Empty;

            for (int i = 0; i < columnDatasplit.Length; i++)
            {
                if (columnDatasplit[i].Trim() == "")
                {
                    continue;
                }
                else
                {
                    if (columnDatasplit[i].Contains("@"))
                    {
                        tempData = RandomString(columnDatasplit[i].Substring(0, columnDatasplit[i].IndexOf("@")).Length, isNumber) + "@" + RandomString(7, isNumber) + ".com";
                        dummyData = tempData.ToLower();
                    }
                    else
                    {
                        dummyData = string.Empty;
                    }
                }
            }

            return dummyData;

        }

        public static string RandomDummyData(int length, string orginalString, bool isNumber)
        {
            string[] columnDatasplit = orginalString.Split(" ");
            string tempData = string.Empty;
            string dummyData = string.Empty;

            for (int i = 0; i < columnDatasplit.Length; i++)
            {
                if (columnDatasplit[i].Trim() == "")
                {
                    continue;
                }
                else
                {
                    tempData = RandomString(columnDatasplit[i].Length, isNumber);
                    if (tempData.Length > 0)
                    {
                        dummyData += dummyData.Length <= 0 ? char.ToUpper(tempData[0]) + tempData.Substring(1).ToLower() : " " + char.ToUpper(tempData[0]) + tempData.Substring(1).ToLower(); ;
                    }
                    else
                    {
                        dummyData = string.Empty;
                    }
                }
            }

            return dummyData;

        }

        public static string RandomString(int length, bool isNumber)
        {
            const string charsCapital = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const string charsSmall = "abcdefghijklmnopqrstuvwxyz";
            const string charsSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            const string numberSet = "0123456789";
            var random = new Random();

            string chars = string.Empty;
            if (isNumber)
            {
                chars = numberSet;
            }
            else
            {
                chars = charsSet;
            }
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        #endregion

        #region Profile Dummy Picture

        private void buttonGenerateDummyProfilePicture_Click(object sender, EventArgs e)
        {
            progressBarProcess.Value = 0;
            progressBarProcess.Refresh();

            ProfilePictureDummyData();

        }

        private void ProfilePictureDummyData()
        {
            string connetionString = null;
            MySqlConnection cnn;
            connetionString = txtConnectionString.Text;
            string sLogFolderPath = txtLogFolderPath.Text;
            string sPathPrifix = txtImagePath.Text;
            
            cnn = new MySqlConnection(connetionString);
            try
            {
                cnn.Open();
                string sEndProcess = DateTime.Now.ToString();
                string query = "Select Id, sGBID from lnkgbdocument where binFileDoc is not null and sDocType = 'Photo Identity';";
                MySqlCommand cmd = new MySqlCommand(query, cnn);
                MySqlDataAdapter returnVal = new MySqlDataAdapter(query, cnn);
                DataTable dt = new DataTable("lnkgbdocument");
                returnVal.Fill(dt);
                string sStartProcess = DateTime.Now.ToString();
                Int64 nInsertedFileCount = 0;
                StringBuilder sbLogging = new StringBuilder();


                if (dt != null || dt.Rows.Count > 0)
                {
                    progressBarProcess.Minimum = 0;
                    progressBarProcess.Maximum = dt.Rows.Count;
                    progressBarProcess.Step = 1;
                }
                else
                {
                    progressBarProcess.Minimum = 0;
                    progressBarProcess.Maximum = 1;
                    progressBarProcess.Step = 1;
                    progressBarProcess.PerformStep();
                }

                //Iterate through Items 
                foreach (DataRow row in dt.Rows)
                {
                    progressBarProcess.PerformStep();

                    if (row["sGBID"] == DBNull.Value)
                    {
                        continue;
                    }
                    string IdNum = row["Id"].ToString().Trim();
                    string sGBNum = row["sGBID"].ToString().Trim();

                    // To check the last chartecter digit from sGBId
                    string sLastDigit = sGBNum.Substring(sGBNum.Length - 1, 1);
                    string sFileName = sLastDigit + ".jpg";
                    string sFullPath = textBoxProfilePicturePath.Text + sFileName;
                    FileStream fs;
                    BinaryReader br;

                    if (File.Exists(sFullPath))
                    {
                        byte[] ImageData;
                        fs = new FileStream(sFullPath, FileMode.Open, FileAccess.Read);
                        br = new BinaryReader(fs);
                        ImageData = br.ReadBytes((int)fs.Length);
                        br.Close();
                        fs.Close();

                        string cmdString = "UPDATE `lnkgbdocument` SET `binFileDoc` = @binFileDoc, `sFileExtension` = @sFileExtension WHERE `Id` = @Id;";
                        cmd = new MySqlCommand(cmdString, cnn);

                        cmd.Parameters.Add("@Id", MySqlDbType.VarChar, 255);
                        cmd.Parameters.Add("@binFileDoc", MySqlDbType.Blob);
                        cmd.Parameters.Add("@sFileExtension", MySqlDbType.VarChar, 255);

                        cmd.Parameters["@Id"].Value = IdNum;
                        cmd.Parameters["@binFileDoc"].Value = ImageData;
                        cmd.Parameters["@sFileExtension"].Value = "jpg";
                        int RowsAffected = cmd.ExecuteNonQuery();
                        nInsertedFileCount++;
                        labelDummyProfilePicture.Text = @"GB Id: " + sGBNum;
                        sbLogging.AppendLine("Green Book Id: " + sGBNum);
                    }
                    this.Refresh();
                    Application.DoEvents();
                }

                cnn.Close();
                labelDummyProfilePicture.Text = "============================";
                labelDummyProfilePicture.Text += Environment.NewLine + "                Summary";
                labelDummyProfilePicture.Text += Environment.NewLine + "============================";
                labelDummyProfilePicture.Text += Environment.NewLine + "Start Process: " + sStartProcess;
                labelDummyProfilePicture.Text += Environment.NewLine + "End Process: " + sEndProcess;
                labelDummyProfilePicture.Text += Environment.NewLine + "Number of Profile Dummy Images Inserted: " + nInsertedFileCount.ToString();
                labelDummyProfilePicture.Text += Environment.NewLine + "============================";

                sbLogging.AppendLine("===================================");
                sbLogging.AppendLine("             Summary");
                sbLogging.AppendLine("===================================");
                sbLogging.AppendLine("Start Process: " + sStartProcess);
                sbLogging.AppendLine("End Process: " + sEndProcess);
                sbLogging.AppendLine("Number of Images Inserted: " + nInsertedFileCount.ToString());
                sbLogging.AppendLine("===================================");

                File.AppendAllText(sLogFolderPath + "log-" + Guid.NewGuid().ToString() + ".txt", sbLogging.ToString());
                sbLogging.Clear();
            }
            catch (Exception ex)
            {
                labelDummyProfilePicture.Text += Environment.NewLine + ex.ToString();
            }
        }



        #endregion

        public static DataTable GetDataTabletFromCSVFile(string csv_file_path)
        {
            DataTable csvData = new DataTable();
            try
            {
                if (csv_file_path.EndsWith(".csv"))
                {
                    using (Microsoft.VisualBasic.FileIO.TextFieldParser csvReader = new Microsoft.VisualBasic.FileIO.TextFieldParser(csv_file_path))
                    {
                        csvReader.SetDelimiters(new string[] { "," });
                        csvReader.HasFieldsEnclosedInQuotes = true;
                        //read column
                        string[] colFields = csvReader.ReadFields();
                        foreach (string column in colFields)
                        {
                            DataColumn datecolumn = new DataColumn(column);
                            datecolumn.AllowDBNull = true;
                            csvData.Columns.Add(datecolumn);
                        }
                        while (!csvReader.EndOfData)
                        {
                            string[] fieldData = csvReader.ReadFields();
                            for (int i = 0; i < fieldData.Length; i++)
                            {
                                if (fieldData[i] == "")
                                {
                                    fieldData[i] = null;
                                }
                            }
                            csvData.Rows.Add(fieldData);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Exce " + ex);
            }
            return csvData;
        }

        private void btnUploadfile_Click(object sender, EventArgs e)
        {
            try
            {
                OpenFileDialog dialog = new OpenFileDialog();
                dialog.ShowDialog();
                int ImportedRecord = 0, inValidItem = 0;
                string SourceURl = "";
                btnSave.Enabled = true;
                if (dialog.FileName != "")
                {
                    if (dialog.FileName.EndsWith(".csv"))
                    {
                        DataTable dtNew = new DataTable();
                        dtNew = GetDataTabletFromCSVFile(dialog.FileName);

                        if (Convert.ToString(dtNew.Columns[0]).ToLower() != "sno" && Convert.ToString(dtNew.Columns[0]).ToLower() != "idno")
                        {
                            MessageBox.Show("Invalid Items File");
                            btnSave.Enabled = false;
                            return;
                        }

                        ChatrelPayment chatrelPayment = new ChatrelPayment();
                        foreach (DataRow row in dtNew.Rows)
                        {
                            chatrelPayment.Id = Convert.ToInt32(row["SNo"]);
                            chatrelPayment.nSNo = Convert.ToInt32(row["SNo"]);
                            chatrelPayment.sGBId = row["IDNo"].ToString();
                            chatrelPayment.sName = row["Name"].ToString();
                            chatrelPayment.sPaidBy = row["PaidBy"].ToString();
                            chatrelPayment.sCurrency = row["Currency"].ToString();
                            chatrelPayment.nChatrelAmount = Convert.ToInt32(row["Chatrel"]);
                            chatrelPayment.nChatrelMeal = Convert.ToInt32(row["Meal"]);
                            chatrelPayment.nChatrelSalaryAmt = Convert.ToInt32(row["Salary"]);
                            chatrelPayment.dtChatrelFrom = Convert.ToDateTime(row["From"] == DBNull.Value ? null : row["From"]);
                            chatrelPayment.dtChatrelTo = Convert.ToDateTime(row["To"] == DBNull.Value ? null : row["To"]);
                            chatrelPayment.sChatrelFinancialYear = row["FinancialYear"].ToString();
                            chatrelPayment.nChatrelArrearsPlusLateFees = Convert.ToInt32(row["ArrearsPlusLateFees"]);
                            chatrelPayment.dtArrearsFrom = Convert.ToDateTime(row["ArrearsFrom"] == DBNull.Value ? null : row["ArrearsFrom"]);
                            chatrelPayment.dtArrearsTo = Convert.ToDateTime(row["ArrearsTo"] == DBNull.Value ? null : row["ArrearsTo"]); 
                            chatrelPayment.nChatrelBusinessDonationAmt = Convert.ToInt32(row["BusinessDonation"]);
                            chatrelPayment.nChatrelAdditionalDonationAmt = Convert.ToInt32(row["AdditionalDonation"]);
                            chatrelPayment.nChatrelTotalAmount = Convert.ToInt32(row["TotalAmount"]);
                            chatrelPayment.nChatrelRecieptNumber = Convert.ToInt32(row["ChatrelRecieptNo"]);
                            chatrelPayment.dtChatrel = Convert.ToDateTime(row["ChatrelDate"] == DBNull.Value ? null : row["ChatrelDate"]);
                            chatrelPayment.sAuthRegionName = row["AuthorityRegion"].ToString();
                            chatrelPayment.sCountryName = row["Country"].ToString();
                            chatrelPayment.sChatrelStatus = "Success";
                            chatrelPayment.sChatrelMode = row["ModeOfChatrel"].ToString();

                        }

                        
                        if (dtNew != null && dtNew.Rows.Count > 0)
                        {
                            BulkToMySQL(dtNew);
                        }
                    }
                    else
                    {
                        MessageBox.Show("Selected File is Invalid, Please Select valid csv file.", "CTA Admin", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Exception " + ex);
            }
        }

        private void buttonMadebDummyData_Click(object sender, EventArgs e)
        {
            string connetionString = null;
            MySqlConnection cnn;
            connetionString = txtConnectionString.Text;
            //connetionString = "Server=127.0.0.1;Port=3306;Database=ctadb;Uid=root;allow zero datetime=no";

            string sLogFolderPath = txtLogFolderPath.Text;
            string sDummyColumn = string.Empty;
            string sDummyData = string.Empty;
            string sMadebNameData = string.Empty;
            string sFathersNameData = string.Empty;
            string sAliasData = string.Empty;
            string updateString = string.Empty;
            progressBarProcess.Value = 0;
            progressBarProcess.Refresh();

            if (checkBoxMadebName.Checked) { sDummyColumn += sDummyColumn.Length > 0 ? ", " + checkBoxMadebName.Text : checkBoxMadebName.Text; }
            if (checkBoxMadebFathersName.Checked) { sDummyColumn += sDummyColumn.Length > 0 ? ", " + checkBoxMadebFathersName.Text : checkBoxMadebFathersName.Text; }
            if (checkBoxMadebsAlias.Checked) { sDummyColumn += sDummyColumn.Length > 0 ? ", " + checkBoxMadebsAlias.Text : checkBoxMadebsAlias.Text; }

            if (sDummyColumn.Length <= 0)
            {
                labelDummyDataReport.Text = "Please select Column";
                return;
            }
            else
            {

                cnn = new MySqlConnection(connetionString);
                try
                {
                    cnn.Open();
                    //string query = "select ID as sGBID,nMadebTypeID," + sDummyColumn + " from tblmadeb";
                    //string query = "select ID as sGBID,nMadebTypeID," + sDummyColumn + " from tblmadeb where sAlias is not null Limit 5000";
                    string query = "select ID as sGBID,nMadebTypeID," + sDummyColumn + " from tblmadeb where sAlias is not null and nMadebTypeID = 4";
                    //string query = "select ID as sGBId," + sDummyColumn + " from tblmadeb";
                    //string query = "select ID as sGBId," + sDummyColumn + " from tblmadeb where id >= 38067";
                    MySqlCommand cmd = new MySqlCommand(query, cnn);
                    MySqlDataAdapter returnVal = new MySqlDataAdapter(query, cnn);
                    DataTable dt = new DataTable("tblmadeb");
                    returnVal.Fill(dt);
                    string sStartProcess = DateTime.Now.ToString();
                    Int64 nInsertedFileCount = 0;
                    Int64 nNotUpdateCount = 0;
                    StringBuilder sbLogging = new StringBuilder();

                    if (dt != null || dt.Rows.Count > 0)
                    {
                        progressBarProcess.Minimum = 0;
                        progressBarProcess.Maximum = dt.Rows.Count;
                        progressBarProcess.Step = 1;
                    }
                    else
                    {
                        progressBarProcess.Minimum = 0;
                        progressBarProcess.Maximum = 1;
                        progressBarProcess.Step = 1;
                        progressBarProcess.PerformStep();
                    }

                    //Iterate through Items 
                    foreach (DataRow row in dt.Rows)
                    {
                        progressBarProcess.PerformStep();
                        updateString = string.Empty;

                        if (row["sGBID"] == DBNull.Value)
                        {
                            continue;
                        }

                        string sGBNum = row["sGBID"].ToString().Trim();
                        if (sDummyColumn.Contains("sName")) { sMadebNameData = row["sName"].ToString().Trim(); }
                        if (sDummyColumn.Contains("sFathersName")) { 
                            sFathersNameData = row["sFathersName"].ToString().Trim(); }
                        if (sDummyColumn.Contains("sAlias"))
                        {
                            if (row["nMadebTypeID"].ToString().Trim() == "4" && row["sAlias"] != DBNull.Value)
                            {
                                sAliasData = row["sAlias"].ToString().Trim();
                            }
                            else
                            {
                                sAliasData = string.Empty;
                            }
                        }

                        if (sMadebNameData.Length > 0) { updateString += updateString.Length <= 0 ? "`sName` = @sName " : ", `sName` = @sName "; }
                        if (sFathersNameData.Length > 0) { updateString += updateString.Length <= 0 ? "`sFathersName` = @sFathersName " : ", `sFathersName` = @sFathersName "; }
                        if (sAliasData.Length > 0) { updateString += updateString.Length <= 0 ? "`sAlias` = @sAlias " : ", `sAlias` = @sAlias "; }
                        if (updateString != string.Empty)
                        {
                            string cmdString = "UPDATE `tblmadeb`  SET " + updateString + "WHERE `Id` = @sGBID;";

                            cmd = new MySqlCommand(cmdString, cnn);

                            cmd.Parameters.Add("@sGBId", MySqlDbType.VarChar, 255);
                            cmd.Parameters["@sGBId"].Value = row["sGBID"].ToString();


                            if (sMadebNameData.Length > 0)
                            {
                                cmd.Parameters.Add("@sName", MySqlDbType.VarChar, 255);
                                cmd.Parameters["@sName"].Value = RandomDummyData(sMadebNameData.Length, sMadebNameData, false);
                            }
                            if (sFathersNameData.Length > 0)
                            {
                                cmd.Parameters.Add("@sFathersName", MySqlDbType.VarChar, 255);
                                cmd.Parameters["@sFathersName"].Value = RandomDummyData(sFathersNameData.Length, sFathersNameData, false);
                            }
                            if (sAliasData.Length > 0)
                            {
                                cmd.Parameters.Add("@sAlias", MySqlDbType.VarChar, 255);
                                cmd.Parameters["@sAlias"].Value = RandomDummyData(sAliasData.Length, sAliasData, false);
                            }

                            int RowsAffected = cmd.ExecuteNonQuery();
                            labelDummyDataReport.Text = @"Madeb Id: " + sGBNum;
                            sbLogging.AppendLine("Madeb Id: " + sGBNum);

                        }
                        else
                        {
                            labelDummyDataReport.Text = @"Madeb Id Not Updated: " + sGBNum;
                            sbLogging.AppendLine("Madeb Id Not Updated: " + sGBNum);
                            nNotUpdateCount++;
                        }
                        nInsertedFileCount++;
                        labelDummyDataReport.Text += " - " + nInsertedFileCount.ToString() + "/" + dt.Rows.Count.ToString();
                        //labelDummyDataReport.Refresh();
                        this.Refresh();
                        Application.DoEvents();
                    }

                    string sEndProcess = DateTime.Now.ToString();

                    cnn.Close();
                    labelDummyDataReport.Text = "============================";
                    labelDummyDataReport.Text += Environment.NewLine + "                Summary";
                    labelDummyDataReport.Text += Environment.NewLine + "============================";
                    labelDummyDataReport.Text += Environment.NewLine + "Start Process: " + sStartProcess;
                    labelDummyDataReport.Text += Environment.NewLine + "End Process: " + sEndProcess;
                    labelDummyDataReport.Text += Environment.NewLine + "Column Selected for Update: " + sDummyColumn.ToString();
                    labelDummyDataReport.Text += Environment.NewLine + "Number of  Madeb Updated: " + nInsertedFileCount.ToString();
                    labelDummyDataReport.Text += Environment.NewLine + "Number of in Madeb Not Updated: " + nNotUpdateCount.ToString();
                    labelDummyDataReport.Text += Environment.NewLine + "============================";

                    sbLogging.AppendLine("===================================");
                    sbLogging.AppendLine("             Summary");
                    sbLogging.AppendLine("===================================");
                    sbLogging.AppendLine("Start Process: " + sStartProcess);
                    sbLogging.AppendLine("End Process: " + sEndProcess);
                    sbLogging.AppendLine("Column Selected for Update: " + sDummyColumn.ToString());
                    sbLogging.AppendLine("Number of Madeb Updated: " + nInsertedFileCount.ToString());
                    sbLogging.AppendLine("Number of in Madeb Not Updated: " + nNotUpdateCount.ToString());
                    sbLogging.AppendLine("===================================");

                    File.AppendAllText(sLogFolderPath + "Madeb Dummy Data log-" + Guid.NewGuid().ToString() + ".txt", sbLogging.ToString());
                    sbLogging.Clear();

                }
                catch (Exception ex)
                {
                    labelDummyDataReport.Text += Environment.NewLine + ex.ToString();
                }
            }
        }

        public class ChatrelPayment
        {
            #region Private  Properties 
            private int _Id;
            private int _nSNo;
            private string? _sGBId;
            private string? _sName;
            private string? _sPaidBy;
            private string? _sCurrency;
            private decimal? _nChatrelAmount;
            private decimal? _nChatrelMeal;
            private decimal? _nChatrelSalaryAmt;
            private DateTime? _dtChatrelFrom;
            private DateTime? _dtChatrelTo;
            private string? _sChatrelFinancialYear;
            private int? _nChatrelArrearsPlusLateFees;
            private DateTime? _dtArrearsFrom;
            private DateTime? _dtArrearsTo;
            private decimal? _nChatrelBusinessDonationAmt;
            private decimal? _nChatrelAdditionalDonationAmt;
            private decimal? _nChatrelTotalAmount;
            private int? _nChatrelRecieptNumber;
            private DateTime? _dtChatrel;
            private int? _nAuthRegionID;
            private string? _sAuthRegionName;
            private string? _sCountryID;
            private string? _sCountryName;
            private string? _sChatrelStatus;
            private string? _sChatrelMode;
            private DateTime? _dtEntered;
            private int _nEnteredBy;
            #endregion

            #region Public Properties
            public int Id { get { return _Id; } set { _Id = value; } }
            public int nSNo { get { return _nSNo; } set { _nSNo = value; } }
            public string? sGBId { get { return _sGBId; } set { _sGBId = value; } }
            public string? sName { get { return _sName; } set { _sName = value; } }
            public string? sPaidBy { get { return _sPaidBy; } set { _sPaidBy = value; } }
            public string? sCurrency { get { return _sCurrency; } set { _sCurrency = value; } }
            public decimal? nChatrelAmount { get { return _nChatrelAmount; } set { _nChatrelAmount = value; } }
            public decimal? nChatrelMeal { get { return _nChatrelMeal; } set { _nChatrelMeal = value; } }
            public decimal? nChatrelSalaryAmt { get { return _nChatrelSalaryAmt; } set { _nChatrelSalaryAmt = value; } }
            public DateTime? dtChatrelFrom { get { return _dtChatrelFrom; } set { _dtChatrelFrom = value; } }
            public DateTime? dtChatrelTo { get { return _dtChatrelTo; } set { _dtChatrelTo = value; } }
            public string? sChatrelFinancialYear { get { return _sChatrelFinancialYear; } set { _sChatrelFinancialYear = value; } }
            public int? nChatrelArrearsPlusLateFees { get { return _nChatrelArrearsPlusLateFees; } set { _nChatrelArrearsPlusLateFees = value; } }
            public DateTime? dtArrearsFrom { get { return _dtArrearsFrom; } set { _dtArrearsFrom = value; } }
            public DateTime? dtArrearsTo { get { return _dtArrearsTo; } set { _dtArrearsTo = value; } }
            public decimal? nChatrelBusinessDonationAmt { get { return _nChatrelBusinessDonationAmt; } set { _nChatrelBusinessDonationAmt = value; } }
            public decimal? nChatrelAdditionalDonationAmt { get { return _nChatrelAdditionalDonationAmt; } set { _nChatrelAdditionalDonationAmt = value; } }
            public decimal? nChatrelTotalAmount { get { return _nChatrelTotalAmount; } set { _nChatrelTotalAmount = value; } }
            public int? nChatrelRecieptNumber { get { return _nChatrelRecieptNumber; } set { _nChatrelRecieptNumber = value; } }
            public int? nAuthRegionID { get { return _nAuthRegionID; } set { _nAuthRegionID = value; } }
            public string? sAuthRegionName { get { return _sAuthRegionName; } set { _sAuthRegionName = value; } }
            public string? sCountryID { get { return _sCountryID; } set { _sCountryID = value; } }
            public string? sCountryName { get { return _sCountryName; } set { _sCountryName = value; } }
            public string? sChatrelStatus { get { return _sChatrelStatus; } set { _sChatrelStatus = value; } }
            public string? sChatrelMode { get { return _sChatrelMode; } set { _sChatrelMode = value; } }
            public DateTime? dtChatrel { get { return _dtChatrel; } set { _dtChatrel = value; } }
            public DateTime? dtEntered { get { return _dtEntered; } set { _dtEntered = value; } }
            public int nEnteredBy { get { return _nEnteredBy; } set { _nEnteredBy = value; } }

            #endregion
        }

        private void checkBoxDummyProfile_CheckedChanged(object sender, EventArgs e)
        {
            if (checkBoxDummyProfile.Checked)
            {
                textBoxDummyProfilePath.Visible = true;
            }
            else
            {
                textBoxDummyProfilePath.Visible = false;
            }
        }

        private void btnSave_Click(object sender, EventArgs e)
        {

        }

        private static void BulkToMySQL(DataTable dtNew)
        {
            string connetionString = null;
            MySqlConnection cnn;
            connetionString = "Server=127.0.0.1;Port=3306;Database=ctadb;Uid=root;allow zero datetime=no";
            StringBuilder sCommand = new StringBuilder("INSERT INTO `tblchatrelbulkdata`(`SNo`,`IDNo`,`Name`,`PaidBy`,`Currency`,`Chatrel`,`Meal`,`Salary`,`ChatrelFrom`,`ChatrelTo`,`FinancialYear`,`ArrearsPlusLateFees`,`ArrearsFrom`,`ArrearsTo`,`BusinessDonation`,`AdditionalDonation`,`TotalAmount`,`RecieptNo`,`ChatrelDate`,`Region`,`Country`,`ModeOfChatrel`,`dtEntered`,`nEnteredBy`,`dtUpdated`,`nUpdatedBy`) VALUES ");
            using (MySqlConnection mConnection = new MySqlConnection(connetionString))
            {
                List<string> Rows = new List<string>();

                foreach (DataRow row in dtNew.Rows)
                {
                    Rows.Add(string.Format("('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','{13}','{14}','{15}','{16}','{17}','{18}','{19}','{20}','{21}','{22}','{23}','{24}','{25}')"
                        , MySqlHelper.EscapeString(row["SNo"].ToString())
                        , MySqlHelper.EscapeString(row["IDNo"].ToString())
                        , MySqlHelper.EscapeString(row["Name"].ToString())
                        , MySqlHelper.EscapeString(row["PaidBy"].ToString())
                        , MySqlHelper.EscapeString(row["Currency"].ToString())
                        , MySqlHelper.EscapeString(row["Chatrel"].ToString())
                        , MySqlHelper.EscapeString(row["Meal"].ToString())
                        , MySqlHelper.EscapeString(row["Salary"].ToString())
                        , MySqlHelper.EscapeString(row["From"].ToString())
                        , MySqlHelper.EscapeString(row["To"].ToString())
                        , MySqlHelper.EscapeString(row["FinancialYear"].ToString())
                        , MySqlHelper.EscapeString(row["ArrearsPlusLateFees"].ToString())
                        , MySqlHelper.EscapeString(row["ArrearsFrom"].ToString())
                        , MySqlHelper.EscapeString(row["ArrearsTo"].ToString())
                        , MySqlHelper.EscapeString(row["BusinessDonation"].ToString())
                        , MySqlHelper.EscapeString(row["AdditionalDonation"].ToString())
                        , MySqlHelper.EscapeString(row["TotalAmount"].ToString())
                        , MySqlHelper.EscapeString(row["ChatrelRecieptNo"].ToString())
                        , MySqlHelper.EscapeString(row["ChatrelDate"].ToString())
                        , MySqlHelper.EscapeString(row["AuthorityRegion"].ToString())
                        , MySqlHelper.EscapeString(row["Country"].ToString())
                        , MySqlHelper.EscapeString(row["ModeOfChatrel"].ToString())
                        , DateTime.Now.ToString("yyyy-MM-dd H:mm:ss")
                        , 1
                        , DateTime.Now.ToString("yyyy-MM-dd H:mm:ss")
                        , 1
                        ));
                }
                sCommand.Append(string.Join(",", Rows));
                sCommand.Append(";");
                mConnection.Open();
                using (MySqlCommand myCmd = new MySqlCommand(sCommand.ToString(), mConnection))
                {
                    myCmd.CommandType = CommandType.Text;
                    myCmd.ExecuteNonQuery();
                }
            }
        }

        private void buttonSyncDB_Click(object sender, EventArgs e)
        {
            StringBuilder stringBuilderQuery = new StringBuilder();
            string sLogFolderPath = txtLogFolderPath.Text;

            string strQuery = string.Empty;
            string connetionStringDB1 = null;
            string connetionStringDB2 = null;
            MySqlConnection cnnDB1;
            MySqlConnection cnnDB2;
            //connetionStringDB1 = "Server=127.0.0.1;Port=3306;Database=ctadb;Uid=root;allow zero datetime=no";
            //connetionStringDB2 = "Server=127.0.0.1;Port=3306;Database=chatreldb;Uid=root;allow zero datetime=no";
            connetionStringDB1 = textBoxDB1.Text;
            connetionStringDB2 = textBoxDB2.Text;

            progressBarProcess.Value = 0;
            progressBarProcess.Refresh();



            progressBarProcess.Minimum = 0;
            progressBarProcess.Maximum = 10;
            progressBarProcess.Step = 1;

            //lstChatrel Sync
            try
            {
                cnnDB1 = new MySqlConnection(connetionStringDB1);
                cnnDB2 = new MySqlConnection(connetionStringDB2);

                cnnDB1.Open();
                cnnDB2.Open();

                labelSyncReport.Text = "lstChatrel - Syncing Process....";
                //1. Sync Datatable - lstChatrel
                strQuery = Sync_lstChatrel_Table(cnnDB1, cnnDB2, DB1Name, DB2Name);
                ProgressBarOneStep();
                if (strQuery != string.Empty){stringBuilderQuery.AppendLine(strQuery);}
                strQuery = string.Empty;


                labelSyncReport.Text = "lstAuthRegion - Syncing Process....";
                //2. Sync Datatable - lstAuthRegion
                strQuery = Sync_lstAuthRegion_Table(cnnDB1, cnnDB2, DB1Name, DB2Name);
                ProgressBarOneStep();
                if (strQuery != string.Empty){stringBuilderQuery.AppendLine(strQuery);}
                 strQuery = string.Empty;

                labelSyncReport.Text = "lstCountry - Syncing Process....";
                //3. Sync Datatable - lstCountry
                strQuery = Sync_lstCountry_Table(cnnDB1, cnnDB2, DB1Name, DB2Name);
                ProgressBarOneStep();
                if (strQuery != string.Empty){stringBuilderQuery.AppendLine(strQuery);}
                 strQuery = string.Empty;

                labelSyncReport.Text = "lstRelation - Syncing Process....";
                //4. Sync Datatable - lstRelation
                strQuery = Sync_lstRelation_Table(cnnDB1, cnnDB2, DB1Name, DB2Name);
                ProgressBarOneStep();
                if (strQuery != string.Empty){stringBuilderQuery.AppendLine(strQuery);}
                strQuery = string.Empty;

                labelSyncReport.Text = "tblGreenbook - Syncing Process....";
                //5. Sync Datatable - tblGreenbook
                strQuery = Sync_tblGreenbook_Table(cnnDB1, cnnDB2, DB1Name, DB2Name);
                ProgressBarOneStep();
                if (strQuery != string.Empty){stringBuilderQuery.AppendLine(strQuery);}
                 strQuery = string.Empty;

                labelSyncReport.Text = "lnkGBChildren - Syncing Process....";
                //6. Sync Datatable - lnkGBChildren
                strQuery = Sync_lnkGBChildren_Table(cnnDB1, cnnDB2, DB1Name, DB2Name);
                ProgressBarOneStep();
                if (strQuery != string.Empty){stringBuilderQuery.AppendLine(strQuery);}
                 strQuery = string.Empty;

                labelSyncReport.Text = "lnkGBRelation - Syncing Process....";
                //7. Sync Datatable - lnkGBRelation
                strQuery = Sync_lnkGBRelation_Table(cnnDB1, cnnDB2, DB1Name, DB2Name);
                ProgressBarOneStep();
                if (strQuery != string.Empty){stringBuilderQuery.AppendLine(strQuery);}
                strQuery = string.Empty;

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

            }
            catch (Exception ex)
            {
                labelDummyDataReport.Text += Environment.NewLine + ex.ToString();
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
            string queryLabelColumnNames = "`tblgreenbook`.`Id`,`tblgreenbook`.`sGBID`,`tblgreenbook`.`nAuthRegionID`,`tblgreenbook`.`sFirstName`,`tblgreenbook`.`sMiddleName`,`tblgreenbook`.`sLastName`"
                    + ",`tblgreenbook`.`sFamilyName`,`tblgreenbook`.`sGender`,`tblgreenbook`.`dtDOB`,`tblgreenbook`.`sMarried`,`tblgreenbook`.`sFathersName`,`tblgreenbook`.`sFathersID`"
                    + ",`tblgreenbook`.`sFathersGBID`,`tblgreenbook`.`sMothersName`,`tblgreenbook`.`sMothersID`,`tblgreenbook`.`sMothersGBID`,`tblgreenbook`.`sSpouseName`,`tblgreenbook`.`sSpouseID`"
                    + ",`tblgreenbook`.`sSpouseGBID`,`tblgreenbook`.`nChildrenM`,`tblgreenbook`.`nChildrenF`,`tblgreenbook`.`sEmail`,`tblgreenbook`.`sPhone`,`tblgreenbook`.`sFax`,`tblgreenbook`.`sPaidUntil`"
                    + ",`tblgreenbook`.`sLoginGmail`,`tblgreenbook`.`dtLastSuccessfullLogin`,`tblgreenbook`.`dtEntered`,`tblgreenbook`.`nEnteredBy`,`tblgreenbook`.`dtUpdated`,`tblgreenbook`.`nUpdatedBy`";

            //GenerateQueryAndExecute
            return GenerateQueryAndExecute(cnnDB1, cnnDB2, queryLabelColumnNames, queryLabelTableName, db1Name, db2Name);

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

            //GenerateQueryAndExecute
            return GenerateQueryAndExecute(cnnDB1, cnnDB2, queryLabelColumnNames, queryLabelTableName, db1Name, db2Name, strWhereclause);


        }
        #endregion

        #endregion


        public string GenerateQueryAndExecute(MySqlConnection cnnDB1, MySqlConnection cnnDB2, string queryLabelColumnNames, string queryLabelTableName, string db1Name, string db2Name, string optionalWhereClause = "No WhereClause")
        {
            string insertIdsCommaSeperated = string.Empty;
            string updateIdsCommaSeperated = string.Empty;
            string deleteIdsCommaSeperated = string.Empty;
            string insertQuery = string.Empty;
            string updateQuery = string.Empty;
            string deleteQuery = string.Empty;
            string strQuerys = string.Empty;

            string queryDB1 = "SELECT " + queryLabelColumnNames + " FROM `" + queryLabelTableName + "` ";
            if (optionalWhereClause != "No WhereClause") {queryDB1 += optionalWhereClause;}
            MySqlDataAdapter returnValDB1 = new MySqlDataAdapter(queryDB1, cnnDB1);
            DataTable dtDB1 = new DataTable(queryLabelTableName);
            returnValDB1.Fill(dtDB1);

            string queryDB2 = "SELECT " + queryLabelColumnNames + " FROM `" + queryLabelTableName + "` ";
            if (optionalWhereClause != "No WhereClause") { queryDB2 += optionalWhereClause;}
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
                    strQuerys += executeInsertQueryByIds(cnnDB2, queryLabelTableName, queryLabelColumnNames, DB1Name, insertIdsCommaSeperated);
                    
                }
                if (updateIdsCommaSeperated != string.Empty)
                {
                    strQuerys += executeUpdateQueryByIds(cnnDB2, queryLabelTableName, queryLabelColumnNames, DB1Name, updateIdsCommaSeperated);
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

                strUpdateQuery = strUpdateQuery.Replace("queryLabelTableName", queryLabelTableName);
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

                strDeleteQuery = strDeleteQuery.Replace("queryLabelTableName", queryLabelTableName);
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

        #region getInsertIds
        public string getInsertIdsCommaSeprated(MySqlConnection dbConn ,DataTable addEditRecords,string dbName, string queryLabelTableName, string queryLabelColumnNames)
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
                if (dtDB != null && dtDB.Rows.Count> 0)
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
        }
    }
