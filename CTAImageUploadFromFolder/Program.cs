using MySql.Data.MySqlClient;
using System;
using System.Data;
using System.IO;
using System.Text;

namespace CTAImageUploadFromFolder
{
    class Program
    {

        static void Main(string[] args)
        {
            string connetionString = null;
            MySqlConnection cnn;
            connetionString = "Server=127.0.0.1;Port=3306;Database=ctadb;Uid=root;allow zero datetime=no";
            string sLogFolderPath = @"D:\Reji\Chartel\CTAImageFile-DataMigration\CTAImageUploadFromFolder\CTAImageUploadFromFolder\";
            string sPathPrifix = @"C:\xampp\htdocs\GreenBook\gb\images\";

            cnn = new MySqlConnection(connetionString);
            try
            {
                cnn.Open();

                string query = "SELECT sGBID FROM tblGreenBook";
                MySqlCommand cmd = new MySqlCommand(query, cnn);
                MySqlDataAdapter returnVal = new MySqlDataAdapter(query, cnn);
                DataTable dt = new DataTable("tblGreenBook");
                returnVal.Fill(dt);
                string sStartProcess = DateTime.Now.ToString();
                Int64 nInsertedFileCount = 0;
                Int64 nNotFoundFileCount = 0;
                StringBuilder sbLogging = new StringBuilder();

               //Iterate through Items 
                foreach (DataRow row in dt.Rows)
                {
                    if (row["sGBID"] == DBNull.Value)
                    {
                        continue;
                    }
                    
                    // Make sure 7 digit GB number
                    string sGBNum = row["sGBID"].ToString().Trim();
                    if (sGBNum.Length != 7)
                    {
                        if (sGBNum.Length == 1) { sGBNum = "000000" + sGBNum; }
                            else if (sGBNum.Length == 2) {sGBNum = "00000" + sGBNum;}
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
                        Console.WriteLine(@"GB Id: " + sGBNum);
                        sbLogging.AppendLine("Green Book Id: " + sGBNum);
                    }
                    else
                    {
                        Console.WriteLine(@"File NOT Exists: " + row["sGBID"].ToString().Trim());
                        sbLogging.AppendLine("Image Not Exist for Green Book Id: " + sGBNum);
                        nNotFoundFileCount++;
                       
                    }
                    
                }

                //this.CloseConnection();
                //DataTable dt = new DataTable("CharacterInfo");
                //return dt;

                string sEndProcess = DateTime.Now.ToString();

                cnn.Close();
                Console.WriteLine("===================================");
                Console.WriteLine("            Summary");
                Console.WriteLine("===================================");
                Console.WriteLine("Start Process: " + sStartProcess);
                Console.WriteLine("End Process: " + sEndProcess);
                Console.WriteLine("Number of Images Inserted: " + nInsertedFileCount.ToString());
                Console.WriteLine("Number of Images Not found: " + nNotFoundFileCount.ToString());
                Console.WriteLine("===================================");

                sbLogging.AppendLine("===================================");
                sbLogging.AppendLine("            Summary");
                sbLogging.AppendLine("===================================");
                sbLogging.AppendLine("Start Process: " + sStartProcess);
                sbLogging.AppendLine("End Process: " + sEndProcess);
                sbLogging.AppendLine("Number of Images Inserted: " + nInsertedFileCount.ToString());
                sbLogging.AppendLine("Number of Images Not found: " + nNotFoundFileCount.ToString());
                sbLogging.AppendLine("===================================");

                File.AppendAllText(sLogFolderPath + "log.txt", sbLogging.ToString());
                sbLogging.Clear();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            Console.ReadKey();
        }
    }
}
