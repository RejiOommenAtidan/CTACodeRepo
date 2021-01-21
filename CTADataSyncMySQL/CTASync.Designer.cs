
namespace CTADataSyncMySQL
{
    partial class CTASync
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
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
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.LabelDB1ConnStr = new System.Windows.Forms.Label();
            this.labelDB2ConnStr = new System.Windows.Forms.Label();
            this.textBoxDB1 = new System.Windows.Forms.TextBox();
            this.textBoxDB2 = new System.Windows.Forms.TextBox();
            this.buttonSyncDB = new System.Windows.Forms.Button();
            this.labelSyncReport = new System.Windows.Forms.Label();
            this.progressBarProcess = new System.Windows.Forms.ProgressBar();
            this.txtLogFolderPath = new System.Windows.Forms.TextBox();
            this.labelLogFolderPath = new System.Windows.Forms.Label();
            this.textBoxAdminDBName = new System.Windows.Forms.TextBox();
            this.labelDB1Name = new System.Windows.Forms.Label();
            this.textBoxChatrelDBName = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // LabelDB1ConnStr
            // 
            this.LabelDB1ConnStr.AutoSize = true;
            this.LabelDB1ConnStr.Location = new System.Drawing.Point(29, 28);
            this.LabelDB1ConnStr.Name = "LabelDB1ConnStr";
            this.LabelDB1ConnStr.Size = new System.Drawing.Size(134, 13);
            this.LabelDB1ConnStr.TabIndex = 0;
            this.LabelDB1ConnStr.Text = "CTA GreenBook Database";
            // 
            // labelDB2ConnStr
            // 
            this.labelDB2ConnStr.AutoSize = true;
            this.labelDB2ConnStr.Location = new System.Drawing.Point(50, 67);
            this.labelDB2ConnStr.Name = "labelDB2ConnStr";
            this.labelDB2ConnStr.Size = new System.Drawing.Size(113, 13);
            this.labelDB2ConnStr.TabIndex = 1;
            this.labelDB2ConnStr.Text = "CTA Chatrel Database";
            // 
            // textBoxDB1
            // 
            this.textBoxDB1.Location = new System.Drawing.Point(169, 25);
            this.textBoxDB1.Name = "textBoxDB1";
            this.textBoxDB1.Size = new System.Drawing.Size(430, 20);
            this.textBoxDB1.TabIndex = 2;
            this.textBoxDB1.Text = "Server=ctamysqldb01.mysql.database.azure.com; Port=3306; Database=ctadb; Uid=ctam" +
    "ysqldba@ctamysqldb01; Pwd=some_pass; SslMode=Preferred;";
            // 
            // textBoxDB2
            // 
            this.textBoxDB2.Location = new System.Drawing.Point(169, 64);
            this.textBoxDB2.Name = "textBoxDB2";
            this.textBoxDB2.Size = new System.Drawing.Size(430, 20);
            this.textBoxDB2.TabIndex = 3;
            this.textBoxDB2.Text = "Server=ctamysqldb01.mysql.database.azure.com; Port=3306; Database=chatreldb; Uid=" +
    "ctamysqldba@ctamysqldb01;Pwd=some_pass; SslMode=Preferred;";
            // 
            // buttonSyncDB
            // 
            this.buttonSyncDB.Location = new System.Drawing.Point(524, 193);
            this.buttonSyncDB.Name = "buttonSyncDB";
            this.buttonSyncDB.Size = new System.Drawing.Size(75, 23);
            this.buttonSyncDB.TabIndex = 4;
            this.buttonSyncDB.Text = "Sync DB";
            this.buttonSyncDB.UseVisualStyleBackColor = true;
            this.buttonSyncDB.Click += new System.EventHandler(this.buttonSyncDB_Click);
            // 
            // labelSyncReport
            // 
            this.labelSyncReport.AutoSize = true;
            this.labelSyncReport.Location = new System.Drawing.Point(28, 223);
            this.labelSyncReport.Name = "labelSyncReport";
            this.labelSyncReport.Size = new System.Drawing.Size(216, 13);
            this.labelSyncReport.TabIndex = 5;
            this.labelSyncReport.Text = "Sync the CTA Admin and Chatrel Databases";
            // 
            // progressBarProcess
            // 
            this.progressBarProcess.Location = new System.Drawing.Point(12, 385);
            this.progressBarProcess.Name = "progressBarProcess";
            this.progressBarProcess.Size = new System.Drawing.Size(607, 23);
            this.progressBarProcess.TabIndex = 6;
            // 
            // txtLogFolderPath
            // 
            this.txtLogFolderPath.Location = new System.Drawing.Point(169, 150);
            this.txtLogFolderPath.Name = "txtLogFolderPath";
            this.txtLogFolderPath.Size = new System.Drawing.Size(430, 20);
            this.txtLogFolderPath.TabIndex = 8;
            this.txtLogFolderPath.Text = "d:\\log\\";
            // 
            // labelLogFolderPath
            // 
            this.labelLogFolderPath.AutoSize = true;
            this.labelLogFolderPath.Location = new System.Drawing.Point(81, 153);
            this.labelLogFolderPath.Name = "labelLogFolderPath";
            this.labelLogFolderPath.Size = new System.Drawing.Size(82, 13);
            this.labelLogFolderPath.TabIndex = 7;
            this.labelLogFolderPath.Text = "Log Folder Path";
            // 
            // textBoxAdminDBName
            // 
            this.textBoxAdminDBName.Location = new System.Drawing.Point(169, 103);
            this.textBoxAdminDBName.Name = "textBoxAdminDBName";
            this.textBoxAdminDBName.Size = new System.Drawing.Size(117, 20);
            this.textBoxAdminDBName.TabIndex = 10;
            this.textBoxAdminDBName.Text = "ctadb";
            // 
            // labelDB1Name
            // 
            this.labelDB1Name.AutoSize = true;
            this.labelDB1Name.Location = new System.Drawing.Point(78, 106);
            this.labelDB1Name.Name = "labelDB1Name";
            this.labelDB1Name.Size = new System.Drawing.Size(85, 13);
            this.labelDB1Name.TabIndex = 9;
            this.labelDB1Name.Text = "Admin DB Name";
            // 
            // textBoxChatrelDBName
            // 
            this.textBoxChatrelDBName.Location = new System.Drawing.Point(482, 103);
            this.textBoxChatrelDBName.Name = "textBoxChatrelDBName";
            this.textBoxChatrelDBName.Size = new System.Drawing.Size(117, 20);
            this.textBoxChatrelDBName.TabIndex = 12;
            this.textBoxChatrelDBName.Text = "chatreldb";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(391, 106);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(89, 13);
            this.label1.TabIndex = 11;
            this.label1.Text = "Chatrel DB Name";
            // 
            // CTASync
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(631, 420);
            this.Controls.Add(this.textBoxChatrelDBName);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.textBoxAdminDBName);
            this.Controls.Add(this.labelDB1Name);
            this.Controls.Add(this.txtLogFolderPath);
            this.Controls.Add(this.labelLogFolderPath);
            this.Controls.Add(this.progressBarProcess);
            this.Controls.Add(this.labelSyncReport);
            this.Controls.Add(this.buttonSyncDB);
            this.Controls.Add(this.textBoxDB2);
            this.Controls.Add(this.textBoxDB1);
            this.Controls.Add(this.labelDB2ConnStr);
            this.Controls.Add(this.LabelDB1ConnStr);
            this.Name = "CTASync";
            this.Text = "CTA Sync Databases";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label LabelDB1ConnStr;
        private System.Windows.Forms.Label labelDB2ConnStr;
        private System.Windows.Forms.TextBox textBoxDB1;
        private System.Windows.Forms.TextBox textBoxDB2;
        private System.Windows.Forms.Button buttonSyncDB;
        private System.Windows.Forms.Label labelSyncReport;
        private System.Windows.Forms.ProgressBar progressBarProcess;
        private System.Windows.Forms.TextBox txtLogFolderPath;
        private System.Windows.Forms.Label labelLogFolderPath;
        private System.Windows.Forms.TextBox textBoxAdminDBName;
        private System.Windows.Forms.Label labelDB1Name;
        private System.Windows.Forms.TextBox textBoxChatrelDBName;
        private System.Windows.Forms.Label label1;
    }
}

