using System;
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
using CTADBL.Services;

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
                //string query = "select count(*) into @var_2000 from tblgreenbook where year(dtentered) <= '2000'";
                //string query = "select count(*) into @var_2001 from tblgreenbook where year(dtentered) = '2001'";
                //string query = "select count(*) into @var_2002 from tblgreenbook where year(dtentered) = '2002'";
                string query = "select sGBID from tblgreenbook where year(dtentered) = 2003 and month(dtentered) > 7 and day(dtentered) >= 10";
                //string query = "select count(*) into @var_2003_2 from tblgreenbook where year(dtentered) = 2003 and month(dtentered) > 7 and day(dtentered) < 10";
                //string query = "select count(*) into @var_2003_3 from tblgreenbook where year(dtentered) = 2003 and month(dtentered) = 7 ";
                //string query = "select count(*) into @var_2003_4 from tblgreenbook where year(dtentered) = 2003 and month(dtentered) < 7 ";
                //string query = "select count(*) into @var_2004 from tblgreenbook where year(dtentered) = '2004'";
                //string query = "select count(*) into @var_2005 from tblgreenbook where year(dtentered) = '2005'";
                //string query = "select count(*) into @var_2006 from tblgreenbook where year(dtentered) = '2006'";
                //string query = "select count(*) into @var_2007 from tblgreenbook where year(dtentered) = '2007'";
                //string query = "select count(*) into @var_2008 from tblgreenbook where year(dtentered) = '2008'";
                //string query = "select count(*) into @var_2009 from tblgreenbook where year(dtentered) = '2009'";
                //string query = "select count(*) into @var_2010 from tblgreenbook where year(dtentered) = '2010'";
                //string query = "select count(*) into @var_2011 from tblgreenbook where year(dtentered) = '2011'";
                //string query = "select count(*) into @var_2012 from tblgreenbook where year(dtentered) = '2012'";
                //string query = "select count(*) into @var_2013 from tblgreenbook where year(dtentered) = '2013'";
                //string query = "select count(*) into @var_2014 from tblgreenbook where year(dtentered) = '2014'";
                //string query = "select count(*) into @var_2015 from tblgreenbook where year(dtentered) = '2015'";
                //string query = "select count(*) into @var_2016 from tblgreenbook where year(dtentered) = '2016'";
                //string query = "select count(*) into @var_2017 from tblgreenbook where year(dtentered) = '2017'";
                //string query = "select count(*) into @var_2018 from tblgreenbook where year(dtentered) = '2018'";
                //string query = "select count(*) into @var_2019 from tblgreenbook where year(dtentered) = '2019'";
                //string query = "select count(*) into @var_2020 from tblgreenbook where year(dtentered) >= '2020'";
                
                
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

                        string cmdString = "INSERT INTO lnkgbdocument(nRegisterDate, sGBId, sTitle, sDocType, binFileDoc, sFileExtension, dtEntered, nEnteredBy,dtUpdated,nUpdatedBy) " +
                                            "VALUES(@nRegisterDate,@sGBId,@sTitle,@sDocType,@binFileDoc,@sFileExtension,@dtEntered,@nEnteredBy,@dtEntered,@nEnteredBy)";

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
            labelStartTime.Text = DateTime.Now.ToString();

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
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 10000,10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 20000,10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 30000,10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 40000,10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 50000,10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 60000,10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 70000,10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 80000,10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 90000,10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 100000,10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 110000,10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 120000,10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 130000,10000";
                     //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 140000,10000";
                    string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 150000,10000";

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
                                cmd.Parameters["@sPCode"].Value = RandomDummyData(sPCodeData.Length, sPCodeData, true);
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
            labelStartTime.Text = DateTime.Now.ToString();

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
                    string query = "select ID as sGBID,nMadebTypeID," + sDummyColumn + " from tblmadeb";
                    //string query = "select ID as sGBID,nMadebTypeID," + sDummyColumn + " from tblmadeb where sAlias is not null Limit 5000";
                    //string query = "select ID as sGBID,nMadebTypeID," + sDummyColumn + " from tblmadeb nMadebTypeID = 4";
                   // string query = "select ID as sGBID,nMadebTypeID," + sDummyColumn + " from tblmadeb where nMadebTypeID != 2";
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

       

        private void ProgressBarOneStep()
        {
            progressBarProcess.PerformStep();
            this.Refresh();
            Application.DoEvents();
        }

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

        #region UploadDocument
        private void buttonUploadDocument_Click(object sender, EventArgs e)
        {
            string connetionString = null;
            MySqlConnection cnn;
            connetionString = "Server=127.0.0.1;Port=3306;Database=ctadb;Uid=root;Pwd=CTAD@t@2021;allow zero datetime=no";
            string sLogFolderPath = @"C:\log\";
            string sPathPrifix = @"C:\backup\upload\";
            //string sLogFolderPath = txtLogFolderPath.Text;

            //connetionString = txtConnectionString.Text;
            //string sPathPrifix = textBoxDocumentPath.Text;


            progressBarProcess.Value = 0;
            progressBarProcess.Refresh();


            cnn = new MySqlConnection(connetionString);
            try
            {
                cnn.Open();

                string query = "SELECT * FROM tmpgbdocument";



                MySqlCommand cmd = new MySqlCommand(query, cnn);
                MySqlDataAdapter returnVal = new MySqlDataAdapter(query, cnn);
                DataTable dt = new DataTable("tmpgbdocument");
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

                    // GB number
                    string sGBNum = row["sGBID"].ToString().Trim();
                    // GB number
                    string sFileName = row["imageFileName"].ToString().Trim();
                    FileStream fs;
                    BinaryReader br;
                    string sFullPath = sPathPrifix + sFileName;
                    if (File.Exists(sFullPath))
                    {

                        byte[] ImageData;
                        fs = new FileStream(sFullPath, FileMode.Open, FileAccess.Read);
                        br = new BinaryReader(fs);

                        ImageData = br.ReadBytes((int)fs.Length);

                        br.Close();
                        fs.Close();





                        string cmdString = "INSERT INTO lnkgbdocument(nRegisterDate, sGBId, sTitle, sDocType, binFileDoc, sFileExtension, dtEntered, nEnteredBy,dtUpdated,nUpdatedBy) " +
                                            "VALUES(@nRegisterDate,@sGBId,@sTitle,@sDocType,@binFileDoc,@sFileExtension,@dtEntered,@nEnteredBy,@dtEntered,@nEnteredBy)";

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
                        cmd.Parameters["@sTitle"].Value = row["sTitle"].ToString();
                        cmd.Parameters["@sDocType"].Value = "Support Document";
                        cmd.Parameters["@binFileDoc"].Value = ImageData;
                        cmd.Parameters["@sFileExtension"].Value = "File";
                        cmd.Parameters["@dtEntered"].Value = Convert.ToDateTime(row["nRegisterDate"].ToString());
                        cmd.Parameters["@nEnteredBy"].Value = 1;
                        int RowsAffected = cmd.ExecuteNonQuery();
                        nInsertedFileCount++;
                        labelResult.Text = @"GB Id: " + sGBNum;
                        sbLogging.AppendLine("Green Book Id: " + sGBNum);
                    }
                    else
                    {
                        labelResult.Text = @"File NOT Exists: " + row["sGBID"].ToString().Trim();
                        sbLogging.AppendLine("Document: " + sFileName + " Not Exist for Green Book Id: " + sGBNum);
                        nNotFoundFileCount++;

                    }
                    this.Refresh();
                    labelResult.Text += " - " + nInsertedFileCount.ToString() + "/" + dt.Rows.Count.ToString();
                    //labelResult.Refresh();
                    this.Refresh();
                    Application.DoEvents();

                }

                //this.CloseConnection();
                //DataTable dt = new DataTable("CharacterInfo");
                //return dt;

                string sEndProcess = DateTime.Now.ToString();

                cnn.Close();
                labelResult.Text = "============================";
                labelResult.Text += Environment.NewLine + "                Summary";
                labelResult.Text += Environment.NewLine + "============================";
                labelResult.Text += Environment.NewLine + "Start Process: " + sStartProcess;
                labelResult.Text += Environment.NewLine + "End Process: " + sEndProcess;
                labelResult.Text += Environment.NewLine + "Number of Images Inserted: " + nInsertedFileCount.ToString();
                labelResult.Text += Environment.NewLine + "Number of Images Not found: " + nNotFoundFileCount.ToString();
                labelResult.Text += Environment.NewLine + "============================";

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
                labelResult.Text += Environment.NewLine + ex.ToString();
            }
        }


        private bool IsPdf(string path)
        {
            var pdfString = "%PDF-";
            var pdfBytes = Encoding.ASCII.GetBytes(pdfString);
            var len = pdfBytes.Length;
            var buf = new byte[len];
            var remaining = len;
            var pos = 0;
            using (var f = File.OpenRead(path))
            {
                while (remaining > 0)
                {
                    var amtRead = f.Read(buf, pos, remaining);
                    if (amtRead == 0) return false;
                    remaining -= amtRead;
                    pos += amtRead;
                }
            }
            return pdfBytes.SequenceEqual(buf);
        }
        #endregion

        private void buttonGenerateEncryptData_Click(object sender, EventArgs e)
        {
            #region program
            string connetionString = null;
            MySqlConnection cnn;
            connetionString = txtConnectionString.Text;
            string sLogFolderPath = txtLogFolderPath.Text;
            string sDummyColumn = string.Empty;
            string sDummyData = string.Empty;
            string sFirstNameData = string.Empty;
            string sLastNameData = string.Empty;
            string updateString = string.Empty;
            progressBarProcess.Value = 0;
            progressBarProcess.Refresh();
            labelStatusTime.Text = DateTime.Now.ToString();
            StringBuilder sbLogging = new StringBuilder();


            if (chkBoxsFirstName.Checked) { sDummyColumn += sDummyColumn.Length > 0 ? ", " + chkBoxsFirstName.Text : chkBoxsFirstName.Text; }
            if (chkBoxsLastName.Checked) { sDummyColumn += sDummyColumn.Length > 0 ? ", " + chkBoxsLastName.Text : chkBoxsLastName.Text; }
            
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
                    string query = "select sGBID," + sDummyColumn + " from tblgreenbook where `sGBID` not in (select `sGBID` from tmpgreenbook)";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 10000,10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 20000,10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 30000,10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 40000,10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 50000,10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 60000,10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 70000,10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 80000,10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 90000,10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 100000,10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 110000,10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 120000,10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 130000,10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 140000,10000";
                    //string query = "select sGBID," + sDummyColumn + " from tblgreenbook LIMIT 150000,10000";

                    MySqlCommand cmd = new MySqlCommand(query, cnn);
                    MySqlDataAdapter returnVal = new MySqlDataAdapter(query, cnn);
                    DataTable dt = new DataTable("tblGreenBook");
                    returnVal.Fill(dt);
                    string sStartProcess = DateTime.Now.ToString();
                    Int64 nInsertedFileCount = 0;
                    Int64 nNotUpdateCount = 0;

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
                    int iCount = 0;
                    string totalItem = dt.Rows.Count.ToString();
                    
                    foreach (DataRow row in dt.Rows)
                    {
                        iCount += 1;
                        progressBarProcess.PerformStep();
                        updateString = string.Empty;

                        if (row["sGBID"] == DBNull.Value)
                        {
                            continue;
                        }

                        string sGBNum = row["sGBID"].ToString().Trim();
                        if (sDummyColumn.Contains("sFirstName")) { sFirstNameData = row["sFirstName"].ToString().Trim(); }
                        if (sDummyColumn.Contains("sLastName")) { sLastNameData = row["sLastName"].ToString().Trim(); }

                        if (sFirstNameData.Length > 0) { updateString += updateString.Length <= 0 ? "`sFirstName` = @sFirstName " : ", `sFirstName` = @sFirstName "; }
                        if (sLastNameData.Length > 0) { updateString += updateString.Length <= 0 ? "`sLastName` = @sLastName " : ", `sLastName` = @sLastName "; }

                        

                        if (updateString != string.Empty)
                        {
                            //string cmdString = "UPDATE `tblgreenbook`  SET " + updateString + " WHERE `sGBID` = @sGBID;";
                            string cmdString = "UPDATE `tblgreenbook`  SET " + updateString + " WHERE `sGBID` = @sGBID;INSERT INTO `tmpgreenbook`(`sGBID`)VALUES(@sGBID)";

                            cmd = new MySqlCommand(cmdString, cnn);

                            cmd.Parameters.Add("@sGBId", MySqlDbType.VarChar, 255);
                            cmd.Parameters["@sGBId"].Value = row["sGBID"].ToString();


                            if (sFirstNameData.Length > 0)
                            {
                                cmd.Parameters.Add("@sFirstName", MySqlDbType.VarChar, 255);
                                //cmd.Parameters["@sFirstName"].Value = RandomDummyData(sFirstNameData.Length, sFirstNameData, false);
                                cmd.Parameters["@sFirstName"].Value = getEncryptedValuesByActualData(sFirstNameData);
                                
                            }
                            if (sLastNameData.Length > 0)
                            {
                                cmd.Parameters.Add("@sLastName", MySqlDbType.VarChar, 255);
                                cmd.Parameters["@sLastName"].Value = getEncryptedValuesByActualData(sLastNameData);
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

                        labelStatusOfItems.Text = "("+ sGBNum + ") - " + iCount.ToString() + " / " + totalItem;

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

                    File.AppendAllText(sLogFolderPath + "Encrypted Data log-" + Guid.NewGuid().ToString() + ".txt", sbLogging.ToString());
                    sbLogging.Clear();
                }
                catch (Exception ex)
                {
                    labelDummyDataReport.Text = Environment.NewLine + ex.ToString();
                    sbLogging.AppendLine("===================================");
                    sbLogging.AppendLine(ex.ToString());
                    sbLogging.AppendLine(ex.Message.ToString());

                    File.AppendAllText(sLogFolderPath + "Encrypted Data log-" + Guid.NewGuid().ToString() + ".txt", sbLogging.ToString());
                    sbLogging.Clear();
                }

            }
            #endregion
        }

        private void buttonQAConn_Click(object sender, EventArgs e)
        {
            txtConnectionString.Text = "Server=ctamysqldb01.mysql.database.azure.com; Port=3306; Database=chatreldb; Uid=ctamysqldba@ctamysqldb01; Pwd=ekXP9qVo$12na; SslMode=Preferred;CheckParameters=False;";
            txtConnectionString.Text = "Server=chatrelmysqldb.mysql.database.azure.com; Port=3306; Database=chatreldbtemp; Uid=chatrelmysqladm@chatrelmysqldb; Pwd=P@w0r0D@890; SslMode=Preferred;";
        }

        private static string getEncryptedValuesByActualData(string insertTempValues)
        {
            //return insertTempValues;
            return DataEncryption.EncryptString(insertTempValues, "@TiD#nC^A3,zD69#]qX");
        }
    }
}
