using CTADBL.BaseClasses.Masters;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;

namespace CTADBL.BaseClassRepositories.Masters
{
    public class ChartelRepository : ADORepository<Chartel>
    {
        #region Constructor
        public ChartelRepository(string connectionString) : base(connectionString)
        {
        }
        #endregion

        #region Add Call
        public void Add(Chartel chartel)
        {
            var builder = new SqlQueryBuilder<Chartel>(chartel);
            ExecuteCommand(builder.GetInsertCommand());
        }
        #endregion

        #region Update Call
        public void Update(Chartel chartel)
        {
            var builder = new SqlQueryBuilder<Chartel>(chartel);
            ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Delete Call
        public void Delete(Chartel chartel)
        {
            var builder = new SqlQueryBuilder<Chartel>(chartel);
            ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get Chartel
        public IEnumerable<Chartel> GetAllChartel()
        {
            string sql = @"SELECT `Id`,
                            `sChartelKey`,
                            `nChartelValue`,
                            `dtChartelFrom`,
                            `dtEntered`,
                            `nEnteredBy`
                        FROM `lstchartel`;";
            using (var command = new MySqlCommand(sql))
            {
                return GetRecords(command);
            }
        }

        public Chartel GetChartelById(string Id)
        {
            string sql = @"SELECT `Id`,
                            `sChartelKey`,
                            `nChartelValue`,
                            `dtChartelFrom`,
                            `dtEntered`,
                            `nEnteredBy`
                        FROM `lstchartel`
                        WHERE Id = @Id;";
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("Id", Id);
                return GetRecord(command);
            }
        }
        #endregion

        #region Populate Chartel Records
        public override Chartel PopulateRecord(MySqlDataReader reader)
        {
            Chartel chartel = new Chartel();
            chartel.Id = (int)reader["Id"];
            chartel.sChartelKey = (string)reader["sChartelKey"];
            chartel.nChartelValue = (int?)reader["nChartelValue"];
            chartel.dtChartelFrom = reader.IsDBNull("dtChartelFrom") ? null : (DateTime?)(reader["dtChartelFrom"]);
            chartel.dtEntered = reader.IsDBNull("dtEntered") ? null : (DateTime?)(reader["dtEntered"]);
            chartel.nEnteredBy = (int)reader["nEnteredBy"];
            return chartel;
        }
        #endregion
    }
}
