namespace CTADataMigrationAndSupport
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
            this.lblResult = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.btnImageMigration = new System.Windows.Forms.Button();
            this.txtImagePath = new System.Windows.Forms.TextBox();
            this.tabPageCTAChartel = new System.Windows.Forms.TabPage();
            this.label7 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.labelChatrelResult = new System.Windows.Forms.Label();
            this.buttonGetChartelNow = new System.Windows.Forms.Button();
            this.textBox1 = new System.Windows.Forms.TextBox();
            this.label5 = new System.Windows.Forms.Label();
            this.tabPageDummyData = new System.Windows.Forms.TabPage();
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
            this.txtLogFolderPath = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.progressBarProcess = new System.Windows.Forms.ProgressBar();
            this.tabControlCTA.SuspendLayout();
            this.tabPageRelationDataClincing.SuspendLayout();
            this.tabPageImageMigration.SuspendLayout();
            this.tabPageCTAChartel.SuspendLayout();
            this.tabPageDummyData.SuspendLayout();
            this.tabPageDummyProfilePicture.SuspendLayout();
            this.tabPageBulkInsert.SuspendLayout();
            this.SuspendLayout();
            // 
            // txtConnectionString
            // 
            this.txtConnectionString.Location = new System.Drawing.Point(137, 10);
            this.txtConnectionString.Name = "txtConnectionString";
            this.txtConnectionString.Size = new System.Drawing.Size(639, 23);
            this.txtConnectionString.TabIndex = 9;
            this.txtConnectionString.Text = "Server=127.0.0.1;Port=3306;Database=ctadb;Uid=root;allow zero datetime=no";
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
            this.tabControlCTA.Controls.Add(this.tabPageCTAChartel);
            this.tabControlCTA.Controls.Add(this.tabPageDummyData);
            this.tabControlCTA.Controls.Add(this.tabPageDummyProfilePicture);
            this.tabControlCTA.Controls.Add(this.tabPageBulkInsert);
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
            // tabPageCTAChartel
            // 
            this.tabPageCTAChartel.Controls.Add(this.label7);
            this.tabPageCTAChartel.Controls.Add(this.label6);
            this.tabPageCTAChartel.Controls.Add(this.labelChatrelResult);
            this.tabPageCTAChartel.Controls.Add(this.buttonGetChartelNow);
            this.tabPageCTAChartel.Controls.Add(this.textBox1);
            this.tabPageCTAChartel.Controls.Add(this.label5);
            this.tabPageCTAChartel.Location = new System.Drawing.Point(4, 24);
            this.tabPageCTAChartel.Name = "tabPageCTAChartel";
            this.tabPageCTAChartel.Padding = new System.Windows.Forms.Padding(3);
            this.tabPageCTAChartel.Size = new System.Drawing.Size(759, 435);
            this.tabPageCTAChartel.TabIndex = 2;
            this.tabPageCTAChartel.Text = "CTA Chartel";
            this.tabPageCTAChartel.UseVisualStyleBackColor = true;
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Location = new System.Drawing.Point(83, 147);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(73, 15);
            this.label7.TabIndex = 5;
            this.label7.Text = "Calculation :";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(83, 113);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(520, 15);
            this.label6.TabIndex = 4;
            this.label6.Text = "Calculation : ((nChartelAmount + nChartelMeal)* (nChartelPendingYears + 1)) + nLa" +
    "teFeeCharge;";
            // 
            // labelChatrelResult
            // 
            this.labelChatrelResult.AutoSize = true;
            this.labelChatrelResult.Location = new System.Drawing.Point(83, 69);
            this.labelChatrelResult.Name = "labelChatrelResult";
            this.labelChatrelResult.Size = new System.Drawing.Size(38, 15);
            this.labelChatrelResult.TabIndex = 3;
            this.labelChatrelResult.Text = "label6";
            // 
            // buttonGetChartelNow
            // 
            this.buttonGetChartelNow.Location = new System.Drawing.Point(243, 20);
            this.buttonGetChartelNow.Name = "buttonGetChartelNow";
            this.buttonGetChartelNow.Size = new System.Drawing.Size(75, 23);
            this.buttonGetChartelNow.TabIndex = 2;
            this.buttonGetChartelNow.Text = "Chatrel Data";
            this.buttonGetChartelNow.UseVisualStyleBackColor = true;
            this.buttonGetChartelNow.Click += new System.EventHandler(this.buttonGetChartelNow_Click);
            // 
            // textBox1
            // 
            this.textBox1.Location = new System.Drawing.Point(83, 20);
            this.textBox1.Name = "textBox1";
            this.textBox1.Size = new System.Drawing.Size(153, 23);
            this.textBox1.TabIndex = 1;
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(42, 28);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(35, 15);
            this.label5.TabIndex = 0;
            this.label5.Text = "GBId:";
            // 
            // tabPageDummyData
            // 
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
            // checkBoxTBUSpouseName
            // 
            this.checkBoxTBUSpouseName.AutoSize = true;
            this.checkBoxTBUSpouseName.Location = new System.Drawing.Point(275, 178);
            this.checkBoxTBUSpouseName.Name = "checkBoxTBUSpouseName";
            this.checkBoxTBUSpouseName.Size = new System.Drawing.Size(118, 19);
            this.checkBoxTBUSpouseName.TabIndex = 25;
            this.checkBoxTBUSpouseName.Text = "TBUSpouseName";
            this.checkBoxTBUSpouseName.UseVisualStyleBackColor = true;
            // 
            // checkBoxTBUMothersName
            // 
            this.checkBoxTBUMothersName.AutoSize = true;
            this.checkBoxTBUMothersName.Location = new System.Drawing.Point(147, 178);
            this.checkBoxTBUMothersName.Name = "checkBoxTBUMothersName";
            this.checkBoxTBUMothersName.Size = new System.Drawing.Size(124, 19);
            this.checkBoxTBUMothersName.TabIndex = 24;
            this.checkBoxTBUMothersName.Text = "TBUMothersName";
            this.checkBoxTBUMothersName.UseVisualStyleBackColor = true;
            // 
            // checkBoxTBUFathersName
            // 
            this.checkBoxTBUFathersName.AutoSize = true;
            this.checkBoxTBUFathersName.Location = new System.Drawing.Point(27, 178);
            this.checkBoxTBUFathersName.Name = "checkBoxTBUFathersName";
            this.checkBoxTBUFathersName.Size = new System.Drawing.Size(118, 19);
            this.checkBoxTBUFathersName.TabIndex = 23;
            this.checkBoxTBUFathersName.Text = "TBUFathersName";
            this.checkBoxTBUFathersName.UseVisualStyleBackColor = true;
            // 
            // checkBoxTBUOriginVillage
            // 
            this.checkBoxTBUOriginVillage.AutoSize = true;
            this.checkBoxTBUOriginVillage.Location = new System.Drawing.Point(275, 153);
            this.checkBoxTBUOriginVillage.Name = "checkBoxTBUOriginVillage";
            this.checkBoxTBUOriginVillage.Size = new System.Drawing.Size(116, 19);
            this.checkBoxTBUOriginVillage.TabIndex = 22;
            this.checkBoxTBUOriginVillage.Text = "TBUOriginVillage";
            this.checkBoxTBUOriginVillage.UseVisualStyleBackColor = true;
            // 
            // checkBoxTBUPlaceOfBirth
            // 
            this.checkBoxTBUPlaceOfBirth.AutoSize = true;
            this.checkBoxTBUPlaceOfBirth.Location = new System.Drawing.Point(147, 153);
            this.checkBoxTBUPlaceOfBirth.Name = "checkBoxTBUPlaceOfBirth";
            this.checkBoxTBUPlaceOfBirth.Size = new System.Drawing.Size(114, 19);
            this.checkBoxTBUPlaceOfBirth.TabIndex = 21;
            this.checkBoxTBUPlaceOfBirth.Text = "TBUPlaceOfBirth";
            this.checkBoxTBUPlaceOfBirth.UseVisualStyleBackColor = true;
            // 
            // checkBoxTibetanName
            // 
            this.checkBoxTibetanName.AutoSize = true;
            this.checkBoxTibetanName.Location = new System.Drawing.Point(27, 153);
            this.checkBoxTibetanName.Name = "checkBoxTibetanName";
            this.checkBoxTibetanName.Size = new System.Drawing.Size(98, 19);
            this.checkBoxTibetanName.TabIndex = 20;
            this.checkBoxTibetanName.Text = "TibetanName";
            this.checkBoxTibetanName.UseVisualStyleBackColor = true;
            // 
            // checkBoxsPCode
            // 
            this.checkBoxsPCode.AutoSize = true;
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
            this.tabPageCTAChartel.ResumeLayout(false);
            this.tabPageCTAChartel.PerformLayout();
            this.tabPageDummyData.ResumeLayout(false);
            this.tabPageDummyData.PerformLayout();
            this.tabPageDummyProfilePicture.ResumeLayout(false);
            this.tabPageDummyProfilePicture.PerformLayout();
            this.tabPageBulkInsert.ResumeLayout(false);
            this.tabPageBulkInsert.PerformLayout();
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
        private System.Windows.Forms.TabPage tabPageCTAChartel;
        private System.Windows.Forms.Button buttonGetChartelNow;
        private System.Windows.Forms.TextBox textBox1;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label labelChatrelResult;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.Label label6;
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
    }
}

