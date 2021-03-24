using ChatrelDBL.Services;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatrelDBL.Services
{
    public class EncryptionTest
    {
        private static MySqlConnection _connection;

        public EncryptionTest(string connectionString)
        {
            _connection = new MySqlConnection(connectionString);
        }

        public void RunTest()
        {
            DataTable dt = new DataTable();
            DataTable dt1;
            string sql = "SELECT Id, sFirstName, sLastName FROM tblgreenbook ORDER BY Id DESC LIMIT 10;";
            using (var command = new MySqlCommand(sql))
            {
                command.Connection = _connection;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                mySqlDataAdapter.Fill(dt);
                dt1 = dt.Clone();
                foreach(DataRow row in dt.Rows)
                {
                    row[1] = DataEncryption.EncryptString(row[1].ToString());
                    row[2] = DataEncryption.EncryptString(row[2].ToString());
                    dt1.ImportRow(row);
                }
                foreach (DataRow row in dt1.Rows)
                {
                    row[2] = DataEncryption.DecryptString(row[2].ToString());
                }
                string finish = "Done";
            }

            
            using (var command =  new MySqlCommand())
            {
                string sql2 = String.Empty;

                foreach(DataRow row in dt.Rows)
                {
                    sql2 += String.Format("UPDATE tblgreenbook SET sFirstName = '{0}', sLastName = '{1}' WHERE Id = {2}; ", row[1], row[2], row[0]);
                }
                command.Connection = _connection;
                command.CommandText = sql2;
                //command.ExecuteNonQuery();
            }
        }
    }
}
