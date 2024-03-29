﻿namespace CTADataMigrationAndSupport
{
    partial class CTAApp
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.txtConnectionString = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.tabControlCTA = new System.Windows.Forms.TabControl();
            this.tabPageRelationDataClincing = new System.Windows.Forms.TabPage();
            this.labelRecordCount = new System.Windows.Forms.Label();
            this.comboBox1 = new System.Windows.Forms.ComboBox();
            this.label4 = new System.Windows.Forms.Label();
            this.lblResultRelation = new System.Windows.Forms.Label();
            this.btnNoGBID = new System.Windows.Forms.Button();
            this.tabPageImageMigration = new System.Windows.Forms.TabPage();
            this.checkBoxDummyProfile = new System.Windows.Forms.CheckBox();
            this.textBoxDummyProfilePath = new System.Windows.Forms.TextBox();
            this.lblResult = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.btnImageMigration = new System.Windows.Forms.Button();
            this.txtImagePath = new System.Windows.Forms.TextBox();
            this.tabPageDBUploadDocument = new System.Windows.Forms.TabPage();
            this.labelResult = new System.Windows.Forms.Label();
            this.buttonUploadDocument = new System.Windows.Forms.Button();
            this.textBoxDocumentPath = new System.Windows.Forms.TextBox();
            this.label5 = new System.Windows.Forms.Label();
            this.tabPageDummyData = new System.Windows.Forms.TabPage();
            this.labelStartTime = new System.Windows.Forms.Label();
            this.checkBoxMadebsAlias = new System.Windows.Forms.CheckBox();
            this.buttonMadebDummyData = new System.Windows.Forms.Button();
            this.checkBoxMadebFathersName = new System.Windows.Forms.CheckBox();
            this.checkBoxMadebName = new System.Windows.Forms.CheckBox();
            this.checkBoxTBUSpouseName = new System.Windows.Forms.CheckBox();
            this.checkBoxTBUMothersName = new System.Windows.Forms.CheckBox();
            this.checkBoxTBUFathersName = new System.Windows.Forms.CheckBox();
            this.checkBoxTBUOriginVillage = new System.Windows.Forms.CheckBox();
            this.checkBoxTBUPlaceOfBirth = new System.Windows.Forms.CheckBox();
            this.checkBoxTibetanName = new System.Windows.Forms.CheckBox();
            this.checkBoxsPCode = new System.Windows.Forms.CheckBox();
            this.checkBoxsAddress2 = new System.Windows.Forms.CheckBox();
            this.checkBoxsAddress1 = new System.Windows.Forms.CheckBox();
            this.checkBoxsEmail = new System.Windows.Forms.CheckBox();
            this.checkBoxsSpouseName = new System.Windows.Forms.CheckBox();
            this.checkBoxsMothersName = new System.Windows.Forms.CheckBox();
            this.checkBoxsFathersName = new System.Windows.Forms.CheckBox();
            this.checkBoxsPhone = new System.Windows.Forms.CheckBox();
            this.checkBoxsFamilyName = new System.Windows.Forms.CheckBox();
            this.checkBoxsLastName = new System.Windows.Forms.CheckBox();
            this.checkBoxsMiddleName = new System.Windows.Forms.CheckBox();
            this.checkBoxsFirstName = new System.Windows.Forms.CheckBox();
            this.labelDummyDataReport = new System.Windows.Forms.Label();
            this.label8 = new System.Windows.Forms.Label();
            this.buttonGenerateDummyData = new System.Windows.Forms.Button();
            this.tabPageDummyProfilePicture = new System.Windows.Forms.TabPage();
            this.labelDummyProfilePicture = new System.Windows.Forms.Label();
            this.buttonGenerateDummyProfilePicture = new System.Windows.Forms.Button();
            this.textBoxProfilePicturePath = new System.Windows.Forms.TextBox();
            this.label9 = new System.Windows.Forms.Label();
            this.tabPageBulkInsert = new System.Windows.Forms.TabPage();
            this.btnSave = new System.Windows.Forms.Button();
            this.btnUploadfile = new System.Windows.Forms.Button();
            this.label10 = new System.Windows.Forms.Label();
            this.textBox2 = new System.Windows.Forms.TextBox();
            this.tabPageEncryptData = new System.Windows.Forms.TabPage();
            this.labelStatusOfItems = new System.Windows.Forms.Label();
            this.buttonQAConn = new System.Windows.Forms.Button();
            this.labelStatusTime = new System.Windows.Forms.Label();
            this.chkBoxsLastName = new System.Windows.Forms.CheckBox();
            this.chkBoxsFirstName = new System.Windows.Forms.CheckBox();
            this.label7 = new System.Windows.Forms.Label();
            this.buttonGenerateEncryptData = new System.Windows.Forms.Button();
            this.txtLogFolderPath = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.progressBarProcess = new System.Windows.Forms.ProgressBar();
            this.tabControlCTA.SuspendLayout();
            this.tabPageRelationDataClincing.SuspendLayout();
            this.tabPageImageMigration.SuspendLayout();
            this.tabPageDBUploadDocument.SuspendLayout();
            this.tabPageDummyData.SuspendLayout();
            this.tabPageDummyProfilePicture.SuspendLayout();
            this.tabPageBulkInsert.SuspendLayout();
            this.tabPageEncryptData.SuspendLayout();
            this.SuspendLayout();
            // 
            // txtConnectionString
            // 
            this.txtConnectionString.Location = new System.Drawing.Point(137, 10);
            this.txtConnectionString.Name = "txtConnectionString";
            this.txtConnectionString.Size = new System.Drawing.Size(639, 23);
            this.txtConnectionString.TabIndex = 9;
            this.txtConnectionString.Text = "Server=ctamysqldb01.mysql.database.azure.com; Port=3306; Database=ctadb; Uid=ctam" +
    "ysqldba@ctamysqldb01; Pwd=ekXP9qVo$12na; SslMode=Preferred;";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(10, 13);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(121, 15);
            this.label1.TabIndex = 8;
            this.label1.Text = "DB Connection String";
            this.label1.Click += new System.EventHandler(this.label1_Click);
            // 
            // tabControlCTA
            // 
            this.tabControlCTA.Controls.Add(this.tabPageRelationDataClincing);
            this.tabControlCTA.Controls.Add(this.tabPageImageMigration);
            this.tabControlCTA.Controls.Add(this.tabPageDBUploadDocument);
            this.tabControlCTA.Controls.Add(this.tabPageDummyData);
            this.tabControlCTA.Controls.Add(this.tabPageDummyProfilePicture);
            this.tabControlCTA.Controls.Add(this.tabPageBulkInsert);
            this.tabControlCTA.Controls.Add(this.tabPageEncryptData);
            this.tabControlCTA.Location = new System.Drawing.Point(10, 88);
            this.tabControlCTA.Name = "tabControlCTA";
            this.tabControlCTA.SelectedIndex = 0;
            this.tabControlCTA.Size = new System.Drawing.Size(767, 463);
            this.tabControlCTA.TabIndex = 16;
            // 
            // tabPageRelationDataClincing
            // 
            this.tabPageRelationDataClincing.Controls.Add(this.labelRecordCount);
            this.tabPageRelationDataClincing.Controls.Add(this.comboBox1);
            this.tabPageRelationDataClincing.Controls.Add(this.label4);
            this.tabPageRelationDataClincing.Controls.Add(this.lblResultRelation);
            this.tabPageRelationDataClincing.Controls.Add(this.btnNoGBID);
            this.tabPageRelationDataClincing.Location = new System.Drawing.Point(4, 24);
            this.tabPageRelationDataClincing.Name = "tabPageRelationDataClincing";
            this.tabPageRelationDataClincing.Padding = new System.Windows.Forms.Padding(3);
            this.tabPageRelationDataClincing.Size = new System.Drawing.Size(759, 435);
            this.tabPageRelationDataClincing.TabIndex = 1;
            this.tabPageRelationDataClincing.Text = "Relation Dirty Data";
            this.tabPageRelationDataClincing.UseVisualStyleBackColor = true;
            // 
            // labelRecordCount
            // 
            this.labelRecordCount.AutoSize = true;
            this.labelRecordCount.Location = new System.Drawing.Point(47, 417);
            this.labelRecordCount.Name = "labelRecordCount";
            this.labelRecordCount.Size = new System.Drawing.Size(0, 15);
            this.labelRecordCount.TabIndex = 4;
            // 
            // comboBox1
            // 
            this.comboBox1.FormattingEnabled = true;
            this.comboBox1.Items.AddRange(new object[] {
            "Father",
            "Mother",
            "Spouse",
            "Children"});
            this.comboBox1.Location = new System.Drawing.Point(47, 42);
            this.comboBox1.Name = "comboBox1";
            this.comboBox1.Size = new System.Drawing.Size(210, 23);
            this.comboBox1.TabIndex = 3;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(47, 22);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(210, 15);
            this.label4.TabIndex = 2;
            this.label4.Text = "GreenBook With Relation But not GBID";
            // 
            // lblResultRelation
            // 
            this.lblResultRelation.AutoSize = true;
            this.lblResultRelation.Location = new System.Drawing.Point(47, 120);
            this.lblResultRelation.Name = "lblResultRelation";
            this.lblResultRelation.Size = new System.Drawing.Size(0, 15);
            this.lblResultRelation.TabIndex = 1;
            // 
            // btnNoGBID
            // 
            this.btnNoGBID.Location = new System.Drawing.Point(47, 71);
            this.btnNoGBID.Name = "btnNoGBID";
            this.btnNoGBID.Size = new System.Drawing.Size(210, 23);
            this.btnNoGBID.TabIndex = 0;
            this.btnNoGBID.Text = "Records No GBID";
            this.btnNoGBID.UseVisualStyleBackColor = true;
            this.btnNoGBID.Click += new System.EventHandler(this.btnNoGBID_Click);
            // 
            // tabPageImageMigration
            // 
            this.tabPageImageMigration.Controls.Add(this.checkBoxDummyProfile);
            this.tabPageImageMigration.Controls.Add(this.textBoxDummyProfilePath);
            this.tabPageImageMigration.Controls.Add(this.lblResult);
            this.tabPageImageMigration.Controls.Add(this.label3);
            this.tabPageImageMigration.Controls.Add(this.btnImageMigration);
            this.tabPageImageMigration.Controls.Add(this.txtImagePath);
            this.tabPageImageMigration.Location = new System.Drawing.Point(4, 24);
            this.tabPageImageMigration.Name = "tabPageImageMigration";
            this.tabPageImageMigration.Padding = new System.Windows.Forms.Padding(3);
            this.tabPageImageMigration.Size = new System.Drawing.Size(759, 435);
            this.tabPageImageMigration.TabIndex = 0;
            this.tabPageImageMigration.Text = "Image Migration";
            this.tabPageImageMigration.UseVisualStyleBackColor = true;
            // 
            // checkBoxDummyProfile
            // 
            this.checkBoxDummyProfile.AutoSize = true;
            this.checkBoxDummyProfile.Location = new System.Drawing.Point(270, 53);
            this.checkBoxDummyProfile.Name = "checkBoxDummyProfile";
            this.checkBoxDummyProfile.Size = new System.Drawing.Size(117, 19);
            this.checkBoxDummyProfile.TabIndex = 36;
            this.checkBoxDummyProfile.Text = "Is Dummy Profile";
            this.checkBoxDummyProfile.UseVisualStyleBackColor = true;
            this.checkBoxDummyProfile.CheckedChanged += new System.EventHandler(this.checkBoxDummyProfile_CheckedChanged);
            // 
            // textBoxDummyProfilePath
            // 
            this.textBoxDummyProfilePath.Location = new System.Drawing.Point(393, 51);
            this.textBoxDummyProfilePath.Name = "textBoxDummyProfilePath";
            this.textBoxDummyProfilePath.Size = new System.Drawing.Size(346, 23);
            this.textBoxDummyProfilePath.TabIndex = 35;
            this.textBoxDummyProfilePath.Text = "D:\\Reji\\CTA-Chatrel\\CTADataMigrationAndSupport\\avatars\\";
            // 
            // lblResult
            // 
            this.lblResult.AutoSize = true;
            this.lblResult.Location = new System.Drawing.Point(103, 89);
            this.lblResult.Name = "lblResult";
            this.lblResult.Size = new System.Drawing.Size(0, 15);
            this.lblResult.TabIndex = 21;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(27, 25);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(67, 15);
            this.label3.TabIndex = 18;
            this.label3.Text = "Image Path";
            // 
            // btnImageMigration
            // 
            this.btnImageMigration.Location = new System.Drawing.Point(100, 50);
            this.btnImageMigration.Name = "btnImageMigration";
            this.btnImageMigration.Size = new System.Drawing.Size(132, 23);
            this.btnImageMigration.TabIndex = 20;
            this.btnImageMigration.Text = "Image Data Migration";
            this.btnImageMigration.UseVisualStyleBackColor = true;
            this.btnImageMigration.Click += new System.EventHandler(this.btnImageMigration_Click);
            // 
            // txtImagePath
            // 
            this.txtImagePath.Location = new System.Drawing.Point(100, 21);
            this.txtImagePath.Name = "txtImagePath";
            this.txtImagePath.Size = new System.Drawing.Size(639, 23);
            this.txtImagePath.TabIndex = 19;
            this.txtImagePath.Text = "C:\\xampp\\htdocs\\GreenBook\\gb\\images\\";
            // 
            // tabPageDBUploadDocument
            // 
            this.tabPageDBUploadDocument.Controls.Add(this.labelResult);
            this.tabPageDBUploadDocument.Controls.Add(this.buttonUploadDocument);
            this.tabPageDBUploadDocument.Controls.Add(this.textBoxDocumentPath);
            this.tabPageDBUploadDocument.Controls.Add(this.label5);
            this.tabPageDBUploadDocument.Location = new System.Drawing.Point(4, 24);
            this.tabPageDBUploadDocument.Name = "tabPageDBUploadDocument";
            this.tabPageDBUploadDocument.Padding = new System.Windows.Forms.Padding(3);
            this.tabPageDBUploadDocument.Size = new System.Drawing.Size(759, 435);
            this.tabPageDBUploadDocument.TabIndex = 2;
            this.tabPageDBUploadDocument.Text = "DB Document Upload ";
            this.tabPageDBUploadDocument.UseVisualStyleBackColor = true;
            // 
            // labelResult
            // 
            this.labelResult.AutoSize = true;
            this.labelResult.Location = new System.Drawing.Point(123, 98);
            this.labelResult.Name = "labelResult";
            this.labelResult.Size = new System.Drawing.Size(0, 15);
            this.labelResult.TabIndex = 22;
            // 
            // buttonUploadDocument
            // 
            this.buttonUploadDocument.Location = new System.Drawing.Point(123, 49);
            this.buttonUploadDocument.Name = "buttonUploadDocument";
            this.buttonUploadDocument.Size = new System.Drawing.Size(167, 23);
            this.buttonUploadDocument.TabIndex = 2;
            this.buttonUploadDocument.Text = "CTADB Upload Document";
            this.buttonUploadDocument.UseVisualStyleBackColor = true;
            this.buttonUploadDocument.Click += new System.EventHandler(this.buttonUploadDocument_Click);
            // 
            // textBoxDocumentPath
            // 
            this.textBoxDocumentPath.Location = new System.Drawing.Point(123, 20);
            this.textBoxDocumentPath.Name = "textBoxDocumentPath";
            this.textBoxDocumentPath.Size = new System.Drawing.Size(614, 23);
            this.textBoxDocumentPath.TabIndex = 1;
            this.textBoxDocumentPath.Text = "D:\\Reji\\Chatrel\\upload\\";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(27, 28);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(90, 15);
            this.label5.TabIndex = 0;
            this.label5.Text = "Document Path";
            // 
            // tabPageDummyData
            // 
            this.tabPageDummyData.Controls.Add(this.labelStartTime);
            this.tabPageDummyData.Controls.Add(this.checkBoxMadebsAlias);
            this.tabPageDummyData.Controls.Add(this.buttonMadebDummyData);
            this.tabPageDummyData.Controls.Add(this.checkBoxMadebFathersName);
            this.tabPageDummyData.Controls.Add(this.checkBoxMadebName);
            this.tabPageDummyData.Controls.Add(this.checkBoxTBUSpouseName);
            this.tabPageDummyData.Controls.Add(this.checkBoxTBUMothersName);
            this.tabPageDummyData.Controls.Add(this.checkBoxTBUFathersName);
            this.tabPageDummyData.Controls.Add(this.checkBoxTBUOriginVillage);
            this.tabPageDummyData.Controls.Add(this.checkBoxTBUPlaceOfBirth);
            this.tabPageDummyData.Controls.Add(this.checkBoxTibetanName);
            this.tabPageDummyData.Controls.Add(this.checkBoxsPCode);
            this.tabPageDummyData.Controls.Add(this.checkBoxsAddress2);
            this.tabPageDummyData.Controls.Add(this.checkBoxsAddress1);
            this.tabPageDummyData.Controls.Add(this.checkBoxsEmail);
            this.tabPageDummyData.Controls.Add(this.checkBoxsSpouseName);
            this.tabPageDummyData.Controls.Add(this.checkBoxsMothersName);
            this.tabPageDummyData.Controls.Add(this.checkBoxsFathersName);
            this.tabPageDummyData.Controls.Add(this.checkBoxsPhone);
            this.tabPageDummyData.Controls.Add(this.checkBoxsFamilyName);
            this.tabPageDummyData.Controls.Add(this.checkBoxsLastName);
            this.tabPageDummyData.Controls.Add(this.checkBoxsMiddleName);
            this.tabPageDummyData.Controls.Add(this.checkBoxsFirstName);
            this.tabPageDummyData.Controls.Add(this.labelDummyDataReport);
            this.tabPageDummyData.Controls.Add(this.label8);
            this.tabPageDummyData.Controls.Add(this.buttonGenerateDummyData);
            this.tabPageDummyData.Location = new System.Drawing.Point(4, 24);
            this.tabPageDummyData.Name = "tabPageDummyData";
            this.tabPageDummyData.Padding = new System.Windows.Forms.Padding(3);
            this.tabPageDummyData.Size = new System.Drawing.Size(759, 435);
            this.tabPageDummyData.TabIndex = 3;
            this.tabPageDummyData.Text = "CTA Dummy Data";
            this.tabPageDummyData.UseVisualStyleBackColor = true;
            // 
            // labelStartTime
            // 
            this.labelStartTime.AutoSize = true;
            this.labelStartTime.Location = new System.Drawing.Point(21, 240);
            this.labelStartTime.Name = "labelStartTime";
            this.labelStartTime.Size = new System.Drawing.Size(60, 15);
            this.labelStartTime.TabIndex = 30;
            this.labelStartTime.Text = "Start Time";
            // 
            // checkBoxMadebsAlias
            // 
            this.checkBoxMadebsAlias.AutoSize = true;
            this.checkBoxMadebsAlias.Checked = true;
            this.checkBoxMadebsAlias.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxMadebsAlias.Location = new System.Drawing.Point(544, 128);
            this.checkBoxMadebsAlias.Name = "checkBoxMadebsAlias";
            this.checkBoxMadebsAlias.Size = new System.Drawing.Size(56, 19);
            this.checkBoxMadebsAlias.TabIndex = 29;
            this.checkBoxMadebsAlias.Text = "sAlias";
            this.checkBoxMadebsAlias.UseVisualStyleBackColor = true;
            // 
            // buttonMadebDummyData
            // 
            this.buttonMadebDummyData.Location = new System.Drawing.Point(544, 153);
            this.buttonMadebDummyData.Name = "buttonMadebDummyData";
            this.buttonMadebDummyData.Size = new System.Drawing.Size(183, 23);
            this.buttonMadebDummyData.TabIndex = 28;
            this.buttonMadebDummyData.Text = "Generate Madeb Dummy data";
            this.buttonMadebDummyData.UseVisualStyleBackColor = true;
            this.buttonMadebDummyData.Click += new System.EventHandler(this.buttonMadebDummyData_Click);
            // 
            // checkBoxMadebFathersName
            // 
            this.checkBoxMadebFathersName.AutoSize = true;
            this.checkBoxMadebFathersName.Checked = true;
            this.checkBoxMadebFathersName.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxMadebFathersName.Location = new System.Drawing.Point(544, 92);
            this.checkBoxMadebFathersName.Name = "checkBoxMadebFathersName";
            this.checkBoxMadebFathersName.Size = new System.Drawing.Size(101, 19);
            this.checkBoxMadebFathersName.TabIndex = 27;
            this.checkBoxMadebFathersName.Text = "sFathersName";
            this.checkBoxMadebFathersName.UseVisualStyleBackColor = true;
            // 
            // checkBoxMadebName
            // 
            this.checkBoxMadebName.AutoSize = true;
            this.checkBoxMadebName.Checked = true;
            this.checkBoxMadebName.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxMadebName.Location = new System.Drawing.Point(544, 52);
            this.checkBoxMadebName.Name = "checkBoxMadebName";
            this.checkBoxMadebName.Size = new System.Drawing.Size(63, 19);
            this.checkBoxMadebName.TabIndex = 26;
            this.checkBoxMadebName.Text = "sName";
            this.checkBoxMadebName.UseVisualStyleBackColor = true;
            // 
            // checkBoxTBUSpouseName
            // 
            this.checkBoxTBUSpouseName.AutoSize = true;
            this.checkBoxTBUSpouseName.Checked = true;
            this.checkBoxTBUSpouseName.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxTBUSpouseName.Location = new System.Drawing.Point(275, 178);
            this.checkBoxTBUSpouseName.Name = "checkBoxTBUSpouseName";
            this.checkBoxTBUSpouseName.Size = new System.Drawing.Size(117, 19);
            this.checkBoxTBUSpouseName.TabIndex = 25;
            this.checkBoxTBUSpouseName.Text = "TBUSpouseName";
            this.checkBoxTBUSpouseName.UseVisualStyleBackColor = true;
            // 
            // checkBoxTBUMothersName
            // 
            this.checkBoxTBUMothersName.AutoSize = true;
            this.checkBoxTBUMothersName.Checked = true;
            this.checkBoxTBUMothersName.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxTBUMothersName.Location = new System.Drawing.Point(147, 178);
            this.checkBoxTBUMothersName.Name = "checkBoxTBUMothersName";
            this.checkBoxTBUMothersName.Size = new System.Drawing.Size(123, 19);
            this.checkBoxTBUMothersName.TabIndex = 24;
            this.checkBoxTBUMothersName.Text = "TBUMothersName";
            this.checkBoxTBUMothersName.UseVisualStyleBackColor = true;
            // 
            // checkBoxTBUFathersName
            // 
            this.checkBoxTBUFathersName.AutoSize = true;
            this.checkBoxTBUFathersName.Checked = true;
            this.checkBoxTBUFathersName.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxTBUFathersName.Location = new System.Drawing.Point(27, 178);
            this.checkBoxTBUFathersName.Name = "checkBoxTBUFathersName";
            this.checkBoxTBUFathersName.Size = new System.Drawing.Size(117, 19);
            this.checkBoxTBUFathersName.TabIndex = 23;
            this.checkBoxTBUFathersName.Text = "TBUFathersName";
            this.checkBoxTBUFathersName.UseVisualStyleBackColor = true;
            // 
            // checkBoxTBUOriginVillage
            // 
            this.checkBoxTBUOriginVillage.AutoSize = true;
            this.checkBoxTBUOriginVillage.Checked = true;
            this.checkBoxTBUOriginVillage.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxTBUOriginVillage.Location = new System.Drawing.Point(275, 153);
            this.checkBoxTBUOriginVillage.Name = "checkBoxTBUOriginVillage";
            this.checkBoxTBUOriginVillage.Size = new System.Drawing.Size(115, 19);
            this.checkBoxTBUOriginVillage.TabIndex = 22;
            this.checkBoxTBUOriginVillage.Text = "TBUOriginVillage";
            this.checkBoxTBUOriginVillage.UseVisualStyleBackColor = true;
            // 
            // checkBoxTBUPlaceOfBirth
            // 
            this.checkBoxTBUPlaceOfBirth.AutoSize = true;
            this.checkBoxTBUPlaceOfBirth.Checked = true;
            this.checkBoxTBUPlaceOfBirth.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxTBUPlaceOfBirth.Location = new System.Drawing.Point(147, 153);
            this.checkBoxTBUPlaceOfBirth.Name = "checkBoxTBUPlaceOfBirth";
            this.checkBoxTBUPlaceOfBirth.Size = new System.Drawing.Size(113, 19);
            this.checkBoxTBUPlaceOfBirth.TabIndex = 21;
            this.checkBoxTBUPlaceOfBirth.Text = "TBUPlaceOfBirth";
            this.checkBoxTBUPlaceOfBirth.UseVisualStyleBackColor = true;
            // 
            // checkBoxTibetanName
            // 
            this.checkBoxTibetanName.AutoSize = true;
            this.checkBoxTibetanName.Checked = true;
            this.checkBoxTibetanName.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxTibetanName.Location = new System.Drawing.Point(27, 153);
            this.checkBoxTibetanName.Name = "checkBoxTibetanName";
            this.checkBoxTibetanName.Size = new System.Drawing.Size(97, 19);
            this.checkBoxTibetanName.TabIndex = 20;
            this.checkBoxTibetanName.Text = "TibetanName";
            this.checkBoxTibetanName.UseVisualStyleBackColor = true;
            // 
            // checkBoxsPCode
            // 
            this.checkBoxsPCode.AutoSize = true;
            this.checkBoxsPCode.Checked = true;
            this.checkBoxsPCode.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxsPCode.Location = new System.Drawing.Point(275, 128);
            this.checkBoxsPCode.Name = "checkBoxsPCode";
            this.checkBoxsPCode.Size = new System.Drawing.Size(66, 19);
            this.checkBoxsPCode.TabIndex = 19;
            this.checkBoxsPCode.Text = "sPCode";
            this.checkBoxsPCode.UseVisualStyleBackColor = true;
            // 
            // checkBoxsAddress2
            // 
            this.checkBoxsAddress2.AutoSize = true;
            this.checkBoxsAddress2.Checked = true;
            this.checkBoxsAddress2.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxsAddress2.Location = new System.Drawing.Point(147, 128);
            this.checkBoxsAddress2.Name = "checkBoxsAddress2";
            this.checkBoxsAddress2.Size = new System.Drawing.Size(79, 19);
            this.checkBoxsAddress2.TabIndex = 18;
            this.checkBoxsAddress2.Text = "sAddress2";
            this.checkBoxsAddress2.UseVisualStyleBackColor = true;
            // 
            // checkBoxsAddress1
            // 
            this.checkBoxsAddress1.AutoSize = true;
            this.checkBoxsAddress1.Checked = true;
            this.checkBoxsAddress1.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxsAddress1.Location = new System.Drawing.Point(27, 128);
            this.checkBoxsAddress1.Name = "checkBoxsAddress1";
            this.checkBoxsAddress1.Size = new System.Drawing.Size(79, 19);
            this.checkBoxsAddress1.TabIndex = 17;
            this.checkBoxsAddress1.Text = "sAddress1";
            this.checkBoxsAddress1.UseVisualStyleBackColor = true;
            // 
            // checkBoxsEmail
            // 
            this.checkBoxsEmail.AutoSize = true;
            this.checkBoxsEmail.Checked = true;
            this.checkBoxsEmail.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxsEmail.Location = new System.Drawing.Point(275, 77);
            this.checkBoxsEmail.Name = "checkBoxsEmail";
            this.checkBoxsEmail.Size = new System.Drawing.Size(60, 19);
            this.checkBoxsEmail.TabIndex = 16;
            this.checkBoxsEmail.Text = "sEmail";
            this.checkBoxsEmail.UseVisualStyleBackColor = true;
            // 
            // checkBoxsSpouseName
            // 
            this.checkBoxsSpouseName.AutoSize = true;
            this.checkBoxsSpouseName.Checked = true;
            this.checkBoxsSpouseName.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxsSpouseName.Location = new System.Drawing.Point(275, 103);
            this.checkBoxsSpouseName.Name = "checkBoxsSpouseName";
            this.checkBoxsSpouseName.Size = new System.Drawing.Size(101, 19);
            this.checkBoxsSpouseName.TabIndex = 15;
            this.checkBoxsSpouseName.Text = "sSpouseName";
            this.checkBoxsSpouseName.UseVisualStyleBackColor = true;
            // 
            // checkBoxsMothersName
            // 
            this.checkBoxsMothersName.AutoSize = true;
            this.checkBoxsMothersName.Checked = true;
            this.checkBoxsMothersName.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxsMothersName.Location = new System.Drawing.Point(147, 103);
            this.checkBoxsMothersName.Name = "checkBoxsMothersName";
            this.checkBoxsMothersName.Size = new System.Drawing.Size(107, 19);
            this.checkBoxsMothersName.TabIndex = 14;
            this.checkBoxsMothersName.Text = "sMothersName";
            this.checkBoxsMothersName.UseVisualStyleBackColor = true;
            // 
            // checkBoxsFathersName
            // 
            this.checkBoxsFathersName.AutoSize = true;
            this.checkBoxsFathersName.Checked = true;
            this.checkBoxsFathersName.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxsFathersName.Location = new System.Drawing.Point(27, 103);
            this.checkBoxsFathersName.Name = "checkBoxsFathersName";
            this.checkBoxsFathersName.Size = new System.Drawing.Size(101, 19);
            this.checkBoxsFathersName.TabIndex = 13;
            this.checkBoxsFathersName.Text = "sFathersName";
            this.checkBoxsFathersName.UseVisualStyleBackColor = true;
            // 
            // checkBoxsPhone
            // 
            this.checkBoxsPhone.AutoSize = true;
            this.checkBoxsPhone.Checked = true;
            this.checkBoxsPhone.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxsPhone.Location = new System.Drawing.Point(147, 78);
            this.checkBoxsPhone.Name = "checkBoxsPhone";
            this.checkBoxsPhone.Size = new System.Drawing.Size(65, 19);
            this.checkBoxsPhone.TabIndex = 12;
            this.checkBoxsPhone.Text = "sPhone";
            this.checkBoxsPhone.UseVisualStyleBackColor = true;
            // 
            // checkBoxsFamilyName
            // 
            this.checkBoxsFamilyName.AutoSize = true;
            this.checkBoxsFamilyName.Checked = true;
            this.checkBoxsFamilyName.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxsFamilyName.Location = new System.Drawing.Point(27, 78);
            this.checkBoxsFamilyName.Name = "checkBoxsFamilyName";
            this.checkBoxsFamilyName.Size = new System.Drawing.Size(98, 19);
            this.checkBoxsFamilyName.TabIndex = 11;
            this.checkBoxsFamilyName.Text = "sFamilyName";
            this.checkBoxsFamilyName.UseVisualStyleBackColor = true;
            // 
            // checkBoxsLastName
            // 
            this.checkBoxsLastName.AutoSize = true;
            this.checkBoxsLastName.Checked = true;
            this.checkBoxsLastName.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxsLastName.Location = new System.Drawing.Point(275, 52);
            this.checkBoxsLastName.Name = "checkBoxsLastName";
            this.checkBoxsLastName.Size = new System.Drawing.Size(84, 19);
            this.checkBoxsLastName.TabIndex = 10;
            this.checkBoxsLastName.Text = "sLastName";
            this.checkBoxsLastName.UseVisualStyleBackColor = true;
            // 
            // checkBoxsMiddleName
            // 
            this.checkBoxsMiddleName.AutoSize = true;
            this.checkBoxsMiddleName.Checked = true;
            this.checkBoxsMiddleName.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxsMiddleName.Location = new System.Drawing.Point(147, 52);
            this.checkBoxsMiddleName.Name = "checkBoxsMiddleName";
            this.checkBoxsMiddleName.Size = new System.Drawing.Size(100, 19);
            this.checkBoxsMiddleName.TabIndex = 9;
            this.checkBoxsMiddleName.Text = "sMiddleName";
            this.checkBoxsMiddleName.UseVisualStyleBackColor = true;
            // 
            // checkBoxsFirstName
            // 
            this.checkBoxsFirstName.AutoSize = true;
            this.checkBoxsFirstName.Checked = true;
            this.checkBoxsFirstName.CheckState = System.Windows.Forms.CheckState.Checked;
            this.checkBoxsFirstName.Location = new System.Drawing.Point(27, 53);
            this.checkBoxsFirstName.Name = "checkBoxsFirstName";
            this.checkBoxsFirstName.Size = new System.Drawing.Size(85, 19);
            this.checkBoxsFirstName.TabIndex = 8;
            this.checkBoxsFirstName.Text = "sFirstName";
            this.checkBoxsFirstName.UseVisualStyleBackColor = true;
            // 
            // labelDummyDataReport
            // 
            this.labelDummyDataReport.AutoSize = true;
            this.labelDummyDataReport.Location = new System.Drawing.Point(21, 280);
            this.labelDummyDataReport.Name = "labelDummyDataReport";
            this.labelDummyDataReport.Size = new System.Drawing.Size(0, 15);
            this.labelDummyDataReport.TabIndex = 7;
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.label8.Location = new System.Drawing.Point(27, 13);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(183, 21);
            this.label8.TabIndex = 5;
            this.label8.Text = "GreenBook Dummy Data";
            // 
            // buttonGenerateDummyData
            // 
            this.buttonGenerateDummyData.Location = new System.Drawing.Point(21, 214);
            this.buttonGenerateDummyData.Name = "buttonGenerateDummyData";
            this.buttonGenerateDummyData.Size = new System.Drawing.Size(210, 23);
            this.buttonGenerateDummyData.TabIndex = 4;
            this.buttonGenerateDummyData.Text = "Generate Dummy data";
            this.buttonGenerateDummyData.UseVisualStyleBackColor = true;
            this.buttonGenerateDummyData.Click += new System.EventHandler(this.buttonGenerateDummyData_Click);
            // 
            // tabPageDummyProfilePicture
            // 
            this.tabPageDummyProfilePicture.Controls.Add(this.labelDummyProfilePicture);
            this.tabPageDummyProfilePicture.Controls.Add(this.buttonGenerateDummyProfilePicture);
            this.tabPageDummyProfilePicture.Controls.Add(this.textBoxProfilePicturePath);
            this.tabPageDummyProfilePicture.Controls.Add(this.label9);
            this.tabPageDummyProfilePicture.Location = new System.Drawing.Point(4, 24);
            this.tabPageDummyProfilePicture.Name = "tabPageDummyProfilePicture";
            this.tabPageDummyProfilePicture.Padding = new System.Windows.Forms.Padding(3);
            this.tabPageDummyProfilePicture.Size = new System.Drawing.Size(759, 435);
            this.tabPageDummyProfilePicture.TabIndex = 5;
            this.tabPageDummyProfilePicture.Text = "CTA Dummy Profile Picture";
            this.tabPageDummyProfilePicture.UseVisualStyleBackColor = true;
            // 
            // labelDummyProfilePicture
            // 
            this.labelDummyProfilePicture.AutoSize = true;
            this.labelDummyProfilePicture.Location = new System.Drawing.Point(27, 154);
            this.labelDummyProfilePicture.Name = "labelDummyProfilePicture";
            this.labelDummyProfilePicture.Size = new System.Drawing.Size(0, 15);
            this.labelDummyProfilePicture.TabIndex = 36;
            // 
            // buttonGenerateDummyProfilePicture
            // 
            this.buttonGenerateDummyProfilePicture.Location = new System.Drawing.Point(27, 87);
            this.buttonGenerateDummyProfilePicture.Name = "buttonGenerateDummyProfilePicture";
            this.buttonGenerateDummyProfilePicture.Size = new System.Drawing.Size(210, 23);
            this.buttonGenerateDummyProfilePicture.TabIndex = 35;
            this.buttonGenerateDummyProfilePicture.Text = "Generate Dummy Profile Picture";
            this.buttonGenerateDummyProfilePicture.UseVisualStyleBackColor = true;
            this.buttonGenerateDummyProfilePicture.Click += new System.EventHandler(this.buttonGenerateDummyProfilePicture_Click);
            // 
            // textBoxProfilePicturePath
            // 
            this.textBoxProfilePicturePath.Location = new System.Drawing.Point(27, 45);
            this.textBoxProfilePicturePath.Name = "textBoxProfilePicturePath";
            this.textBoxProfilePicturePath.Size = new System.Drawing.Size(331, 23);
            this.textBoxProfilePicturePath.TabIndex = 34;
            this.textBoxProfilePicturePath.Text = "D:\\Reji\\CTA-Chatrel\\CTADataMigrationAndSupport\\avatars\\";
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.label9.Location = new System.Drawing.Point(27, 21);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(192, 21);
            this.label9.TabIndex = 33;
            this.label9.Text = "GreenBook Dummy Photo";
            // 
            // tabPageBulkInsert
            // 
            this.tabPageBulkInsert.Controls.Add(this.btnSave);
            this.tabPageBulkInsert.Controls.Add(this.btnUploadfile);
            this.tabPageBulkInsert.Controls.Add(this.label10);
            this.tabPageBulkInsert.Controls.Add(this.textBox2);
            this.tabPageBulkInsert.Location = new System.Drawing.Point(4, 24);
            this.tabPageBulkInsert.Name = "tabPageBulkInsert";
            this.tabPageBulkInsert.Size = new System.Drawing.Size(759, 435);
            this.tabPageBulkInsert.TabIndex = 6;
            this.tabPageBulkInsert.Text = "Chatrel Bulk Insert";
            this.tabPageBulkInsert.UseVisualStyleBackColor = true;
            // 
            // btnSave
            // 
            this.btnSave.Enabled = false;
            this.btnSave.Location = new System.Drawing.Point(524, 55);
            this.btnSave.Name = "btnSave";
            this.btnSave.Size = new System.Drawing.Size(96, 23);
            this.btnSave.TabIndex = 3;
            this.btnSave.Text = "Save Records";
            this.btnSave.UseVisualStyleBackColor = true;
            this.btnSave.Click += new System.EventHandler(this.btnSave_Click);
            // 
            // btnUploadfile
            // 
            this.btnUploadfile.Location = new System.Drawing.Point(524, 12);
            this.btnUploadfile.Name = "btnUploadfile";
            this.btnUploadfile.Size = new System.Drawing.Size(96, 23);
            this.btnUploadfile.TabIndex = 2;
            this.btnUploadfile.Text = "Upload file";
            this.btnUploadfile.UseVisualStyleBackColor = true;
            this.btnUploadfile.Click += new System.EventHandler(this.btnUploadfile_Click);
            // 
            // label10
            // 
            this.label10.AutoSize = true;
            this.label10.Location = new System.Drawing.Point(27, 19);
            this.label10.Name = "label10";
            this.label10.Size = new System.Drawing.Size(66, 15);
            this.label10.TabIndex = 1;
            this.label10.Text = "Choose file";
            // 
            // textBox2
            // 
            this.textBox2.Location = new System.Drawing.Point(123, 12);
            this.textBox2.Name = "textBox2";
            this.textBox2.Size = new System.Drawing.Size(394, 23);
            this.textBox2.TabIndex = 0;
            // 
            // tabPageEncryptData
            // 
            this.tabPageEncryptData.Controls.Add(this.labelStatusOfItems);
            this.tabPageEncryptData.Controls.Add(this.buttonQAConn);
            this.tabPageEncryptData.Controls.Add(this.labelStatusTime);
            this.tabPageEncryptData.Controls.Add(this.chkBoxsLastName);
            this.tabPageEncryptData.Controls.Add(this.chkBoxsFirstName);
            this.tabPageEncryptData.Controls.Add(this.label7);
            this.tabPageEncryptData.Controls.Add(this.buttonGenerateEncryptData);
            this.tabPageEncryptData.Location = new System.Drawing.Point(4, 24);
            this.tabPageEncryptData.Name = "tabPageEncryptData";
            this.tabPageEncryptData.Padding = new System.Windows.Forms.Padding(3);
            this.tabPageEncryptData.Size = new System.Drawing.Size(759, 435);
            this.tabPageEncryptData.TabIndex = 7;
            this.tabPageEncryptData.Text = "Chatrel Encrypt Data";
            this.tabPageEncryptData.UseVisualStyleBackColor = true;
            // 
            // labelStatusOfItems
            // 
            this.labelStatusOfItems.AutoSize = true;
            this.labelStatusOfItems.Font = new System.Drawing.Font("Segoe UI", 20F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.labelStatusOfItems.Location = new System.Drawing.Point(117, 170);
            this.labelStatusOfItems.Name = "labelStatusOfItems";
            this.labelStatusOfItems.Size = new System.Drawing.Size(136, 37);
            this.labelStatusOfItems.TabIndex = 37;
            this.labelStatusOfItems.Text = "Start Time";
            // 
            // buttonQAConn
            // 
            this.buttonQAConn.Location = new System.Drawing.Point(531, 17);
            this.buttonQAConn.Name = "buttonQAConn";
            this.buttonQAConn.Size = new System.Drawing.Size(210, 23);
            this.buttonQAConn.TabIndex = 36;
            this.buttonQAConn.Text = "Get Chatrel QA - Connection String";
            this.buttonQAConn.UseVisualStyleBackColor = true;
            this.buttonQAConn.Click += new System.EventHandler(this.buttonQAConn_Click);
            // 
            // labelStatusTime
            // 
            this.labelStatusTime.AutoSize = true;
            this.labelStatusTime.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.labelStatusTime.Location = new System.Drawing.Point(117, 143);
            this.labelStatusTime.Name = "labelStatusTime";
            this.labelStatusTime.Size = new System.Drawing.Size(71, 19);
            this.labelStatusTime.TabIndex = 35;
            this.labelStatusTime.Text = "Start Time";
            // 
            // chkBoxsLastName
            // 
            this.chkBoxsLastName.AutoSize = true;
            this.chkBoxsLastName.Checked = true;
            this.chkBoxsLastName.CheckState = System.Windows.Forms.CheckState.Checked;
            this.chkBoxsLastName.Location = new System.Drawing.Point(243, 56);
            this.chkBoxsLastName.Name = "chkBoxsLastName";
            this.chkBoxsLastName.Size = new System.Drawing.Size(84, 19);
            this.chkBoxsLastName.TabIndex = 34;
            this.chkBoxsLastName.Text = "sLastName";
            this.chkBoxsLastName.UseVisualStyleBackColor = true;
            // 
            // chkBoxsFirstName
            // 
            this.chkBoxsFirstName.AutoSize = true;
            this.chkBoxsFirstName.Checked = true;
            this.chkBoxsFirstName.CheckState = System.Windows.Forms.CheckState.Checked;
            this.chkBoxsFirstName.Location = new System.Drawing.Point(123, 56);
            this.chkBoxsFirstName.Name = "chkBoxsFirstName";
            this.chkBoxsFirstName.Size = new System.Drawing.Size(85, 19);
            this.chkBoxsFirstName.TabIndex = 33;
            this.chkBoxsFirstName.Text = "sFirstName";
            this.chkBoxsFirstName.UseVisualStyleBackColor = true;
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.label7.Location = new System.Drawing.Point(117, 16);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(152, 21);
            this.label7.TabIndex = 32;
            this.label7.Text = "Chatrel Encrypt Data";
            // 
            // buttonGenerateEncryptData
            // 
            this.buttonGenerateEncryptData.Location = new System.Drawing.Point(117, 95);
            this.buttonGenerateEncryptData.Name = "buttonGenerateEncryptData";
            this.buttonGenerateEncryptData.Size = new System.Drawing.Size(210, 23);
            this.buttonGenerateEncryptData.TabIndex = 31;
            this.buttonGenerateEncryptData.Text = "Generate Encrypt Data";
            this.buttonGenerateEncryptData.UseVisualStyleBackColor = true;
            this.buttonGenerateEncryptData.Click += new System.EventHandler(this.buttonGenerateEncryptData_Click);
            // 
            // txtLogFolderPath
            // 
            this.txtLogFolderPath.Location = new System.Drawing.Point(137, 42);
            this.txtLogFolderPath.Name = "txtLogFolderPath";
            this.txtLogFolderPath.Size = new System.Drawing.Size(639, 23);
            this.txtLogFolderPath.TabIndex = 19;
            this.txtLogFolderPath.Text = "D:\\Reji\\CTA-Chatrel\\CTADataMigrationAndSupport\\Report\\";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(41, 45);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(90, 15);
            this.label2.TabIndex = 18;
            this.label2.Text = "Log Folder Path";
            // 
            // progressBarProcess
            // 
            this.progressBarProcess.Location = new System.Drawing.Point(14, 561);
            this.progressBarProcess.Name = "progressBarProcess";
            this.progressBarProcess.Size = new System.Drawing.Size(763, 23);
            this.progressBarProcess.TabIndex = 20;
            // 
            // CTAApp
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(789, 596);
            this.Controls.Add(this.progressBarProcess);
            this.Controls.Add(this.txtLogFolderPath);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.tabControlCTA);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.txtConnectionString);
            this.Name = "CTAApp";
            this.Text = "CTA Data Support";
            this.Load += new System.EventHandler(this.CTAApp_Load);
            this.tabControlCTA.ResumeLayout(false);
            this.tabPageRelationDataClincing.ResumeLayout(false);
            this.tabPageRelationDataClincing.PerformLayout();
            this.tabPageImageMigration.ResumeLayout(false);
            this.tabPageImageMigration.PerformLayout();
            this.tabPageDBUploadDocument.ResumeLayout(false);
            this.tabPageDBUploadDocument.PerformLayout();
            this.tabPageDummyData.ResumeLayout(false);
            this.tabPageDummyData.PerformLayout();
            this.tabPageDummyProfilePicture.ResumeLayout(false);
            this.tabPageDummyProfilePicture.PerformLayout();
            this.tabPageBulkInsert.ResumeLayout(false);
            this.tabPageBulkInsert.PerformLayout();
            this.tabPageEncryptData.ResumeLayout(false);
            this.tabPageEncryptData.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private System.Windows.Forms.TextBox txtConnectionString;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TabControl tabControlCTA;
        private System.Windows.Forms.TabPage tabPageImageMigration;
        private System.Windows.Forms.Label lblResult;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Button btnImageMigration;
        private System.Windows.Forms.TextBox txtImagePath;
        private System.Windows.Forms.TabPage tabPageRelationDataClincing;
        private System.Windows.Forms.ComboBox comboBox1;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label lblResultRelation;
        private System.Windows.Forms.Button btnNoGBID;
        private System.Windows.Forms.TextBox txtLogFolderPath;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.ProgressBar progressBarProcess;
        private System.Windows.Forms.Label labelRecordCount;
        private System.Windows.Forms.TabPage tabPageDBUploadDocument;
        private System.Windows.Forms.Button buttonUploadDocument;
        private System.Windows.Forms.TextBox textBoxDocumentPath;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.TabPage tabPageDummyData;
        private System.Windows.Forms.CheckBox checkBoxTBUSpouseName;
        private System.Windows.Forms.CheckBox checkBoxTBUMothersName;
        private System.Windows.Forms.CheckBox checkBoxTBUFathersName;
        private System.Windows.Forms.CheckBox checkBoxTBUOriginVillage;
        private System.Windows.Forms.CheckBox checkBoxTBUPlaceOfBirth;
        private System.Windows.Forms.CheckBox checkBoxTibetanName;
        private System.Windows.Forms.CheckBox checkBoxsPCode;
        private System.Windows.Forms.CheckBox checkBoxsAddress2;
        private System.Windows.Forms.CheckBox checkBoxsAddress1;
        private System.Windows.Forms.CheckBox checkBoxsEmail;
        private System.Windows.Forms.CheckBox checkBoxsSpouseName;
        private System.Windows.Forms.CheckBox checkBoxsMothersName;
        private System.Windows.Forms.CheckBox checkBoxsFathersName;
        private System.Windows.Forms.CheckBox checkBoxsPhone;
        private System.Windows.Forms.CheckBox checkBoxsFamilyName;
        private System.Windows.Forms.CheckBox checkBoxsLastName;
        private System.Windows.Forms.CheckBox checkBoxsMiddleName;
        private System.Windows.Forms.CheckBox checkBoxsFirstName;
        private System.Windows.Forms.Label labelDummyDataReport;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.Button buttonGenerateDummyData;
        private System.Windows.Forms.TabPage tabPageDummyProfilePicture;
        private System.Windows.Forms.Button buttonGenerateDummyProfilePicture;
        private System.Windows.Forms.TextBox textBoxProfilePicturePath;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.Label labelDummyProfilePicture;
        private System.Windows.Forms.TabPage tabPageBulkInsert;
        private System.Windows.Forms.Button btnUploadfile;
        private System.Windows.Forms.Label label10;
        private System.Windows.Forms.TextBox textBox2;
        private System.Windows.Forms.Button btnSave;
        private System.Windows.Forms.Button buttonMadebDummyData;
        private System.Windows.Forms.CheckBox checkBoxMadebFathersName;
        private System.Windows.Forms.CheckBox checkBoxMadebName;
        private System.Windows.Forms.CheckBox checkBoxDummyProfile;
        private System.Windows.Forms.TextBox textBoxDummyProfilePath;
        private System.Windows.Forms.CheckBox checkBoxMadebsAlias;
        private System.Windows.Forms.TabPage tabPageEncryptData;
        private System.Windows.Forms.Label labelResult;
        private System.Windows.Forms.Label labelStartTime;
        private System.Windows.Forms.Label labelStatusTime;
        private System.Windows.Forms.CheckBox chkBoxsLastName;
        private System.Windows.Forms.CheckBox chkBoxsFirstName;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.Button buttonGenerateEncryptData;
        private System.Windows.Forms.Button buttonQAConn;
        private System.Windows.Forms.Label labelStatusOfItems;
    }
}

