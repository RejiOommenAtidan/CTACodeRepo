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
            this.tabControl1 = new System.Windows.Forms.TabControl();
            this.tabPage2 = new System.Windows.Forms.TabPage();
            this.comboBox1 = new System.Windows.Forms.ComboBox();
            this.label4 = new System.Windows.Forms.Label();
            this.lblResultRelation = new System.Windows.Forms.Label();
            this.btnNoGBID = new System.Windows.Forms.Button();
            this.tabPage1 = new System.Windows.Forms.TabPage();
            this.lblResult = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.btnImageMigration = new System.Windows.Forms.Button();
            this.txtImagePath = new System.Windows.Forms.TextBox();
            this.txtLogFolderPath = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.progressBarProcess = new System.Windows.Forms.ProgressBar();
            this.labelRecordCount = new System.Windows.Forms.Label();
            this.tabControl1.SuspendLayout();
            this.tabPage2.SuspendLayout();
            this.tabPage1.SuspendLayout();
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
            // tabControl1
            // 
            this.tabControl1.Controls.Add(this.tabPage2);
            this.tabControl1.Controls.Add(this.tabPage1);
            this.tabControl1.Location = new System.Drawing.Point(10, 88);
            this.tabControl1.Name = "tabControl1";
            this.tabControl1.SelectedIndex = 0;
            this.tabControl1.Size = new System.Drawing.Size(767, 463);
            this.tabControl1.TabIndex = 16;
            // 
            // tabPage2
            // 
            this.tabPage2.Controls.Add(this.labelRecordCount);
            this.tabPage2.Controls.Add(this.comboBox1);
            this.tabPage2.Controls.Add(this.label4);
            this.tabPage2.Controls.Add(this.lblResultRelation);
            this.tabPage2.Controls.Add(this.btnNoGBID);
            this.tabPage2.Location = new System.Drawing.Point(4, 24);
            this.tabPage2.Name = "tabPage2";
            this.tabPage2.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage2.Size = new System.Drawing.Size(759, 435);
            this.tabPage2.TabIndex = 1;
            this.tabPage2.Text = "Relation Dirty Data";
            this.tabPage2.UseVisualStyleBackColor = true;
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
            // tabPage1
            // 
            this.tabPage1.Controls.Add(this.lblResult);
            this.tabPage1.Controls.Add(this.label3);
            this.tabPage1.Controls.Add(this.btnImageMigration);
            this.tabPage1.Controls.Add(this.txtImagePath);
            this.tabPage1.Location = new System.Drawing.Point(4, 24);
            this.tabPage1.Name = "tabPage1";
            this.tabPage1.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage1.Size = new System.Drawing.Size(759, 435);
            this.tabPage1.TabIndex = 0;
            this.tabPage1.Text = "Image Migration";
            this.tabPage1.UseVisualStyleBackColor = true;
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
            // txtLogFolderPath
            // 
            this.txtLogFolderPath.Location = new System.Drawing.Point(137, 42);
            this.txtLogFolderPath.Name = "txtLogFolderPath";
            this.txtLogFolderPath.Size = new System.Drawing.Size(639, 23);
            this.txtLogFolderPath.TabIndex = 19;
            this.txtLogFolderPath.Text = "D:\\Reji\\CTA-Chartel\\CTADataMigrationAndSupport\\Report\\";
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
            // labelRecordCount
            // 
            this.labelRecordCount.AutoSize = true;
            this.labelRecordCount.Location = new System.Drawing.Point(47, 417);
            this.labelRecordCount.Name = "labelRecordCount";
            this.labelRecordCount.Size = new System.Drawing.Size(0, 15);
            this.labelRecordCount.TabIndex = 4;
            // 
            // CTAApp
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(789, 596);
            this.Controls.Add(this.progressBarProcess);
            this.Controls.Add(this.txtLogFolderPath);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.tabControl1);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.txtConnectionString);
            this.Name = "CTAApp";
            this.Text = "CTA Data Support";
            this.Load += new System.EventHandler(this.CTAApp_Load);
            this.tabControl1.ResumeLayout(false);
            this.tabPage2.ResumeLayout(false);
            this.tabPage2.PerformLayout();
            this.tabPage1.ResumeLayout(false);
            this.tabPage1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private System.Windows.Forms.TextBox txtConnectionString;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TabControl tabControl1;
        private System.Windows.Forms.TabPage tabPage1;
        private System.Windows.Forms.Label lblResult;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Button btnImageMigration;
        private System.Windows.Forms.TextBox txtImagePath;
        private System.Windows.Forms.TabPage tabPage2;
        private System.Windows.Forms.ComboBox comboBox1;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label lblResultRelation;
        private System.Windows.Forms.Button btnNoGBID;
        private System.Windows.Forms.TextBox txtLogFolderPath;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.ProgressBar progressBarProcess;
        private System.Windows.Forms.Label labelRecordCount;
    }
}

