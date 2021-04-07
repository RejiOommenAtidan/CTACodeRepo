using CTADBL.BaseClasses.Masters;
using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Masters;
using CTADBL.QueryBuilder;
using CTADBL.Repository;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Asn1.Mozilla;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using TimeZoneConverter;

namespace CTADBL.BaseClassRepositories.Transactions
{
    public class GreenBookSerialNumberRepository :  ADORepository<GreenBookSerialNumber>
    {
        private static MySqlConnection _connection;
        private readonly CTAConfigRepository _ctaConfigRepository;
        private readonly MadebRepository _madebRepository;

        #region Constructor
        public GreenBookSerialNumberRepository(string connectionString) : base(connectionString)
        {
            _connection = new MySqlConnection(connectionString);
            _ctaConfigRepository = new CTAConfigRepository(connectionString);
            _madebRepository = new MadebRepository(connectionString);
        }
        #endregion

        #region Add Call
        public int Add(GreenBookSerialNumber gbsn)
        {
            _connection.Open();
            MySqlTransaction transaction = _connection.BeginTransaction();
            var builder = new SqlQueryBuilder<GreenBookSerialNumber>(gbsn);
            MySqlCommand command = builder.GetInsertCommand();
            try
            {
                command.Connection = _connection;
                command.Transaction = transaction;
                command.CommandTimeout = 60;
                int insertedRows = ExecuteCommandTransaction(command);
                if (insertedRows < 1)
                {
                    throw new Exception("Failed to Add new Greenbook Serial Record");
                }
                CTAConfig config = _ctaConfigRepository.GetConfigByKey("BookSerialNumber");
                config.sValue = gbsn.nBookNo.ToString();
                config.dtUpdated = gbsn.dtUpdated;
                config.nUpdatedBy = gbsn.nUpdatedBy;
                var cbuilder = new SqlQueryBuilder<CTAConfig>(config);
                cbuilder.GetUpdateCommandTransaction(command);
                //command.CommandText = cbuilder.GetUpdateCommand().CommandText;
                int updatedRows = ExecuteCommandTransaction(command);
                if(updatedRows < 1)
                {
                    throw new Exception("Failed to Update Config values");
                }
                _ctaConfigRepository.LoadValues();
                if(gbsn.nFormNumber != null)
                {
                    Madeb madeb = _madebRepository.GetMadebByGBIDAndFormNumber(gbsn.sGBID, (int)gbsn.nFormNumber, (int)gbsn.nMadebTypeId);
                    madeb.nCurrentGBSno = (int?)gbsn.nBookNo;
                    madeb.nIssuedOrNotID = 1;
                    madeb.dtUpdated = gbsn.dtUpdated;
                    madeb.nUpdatedBy = gbsn.nUpdatedBy;
                    _madebRepository.UpdateWithMySqlTransaction(madeb, command);
                }
                command.Transaction.Commit();
                _connection.Close();
                return insertedRows;
            }
            catch(Exception ex)
            {
                command.Transaction.Rollback();
                _connection.Close();
                throw;
            }
            
        }
        #endregion

        #region Update Call
        public int Update(GreenBookSerialNumber gbsn)
        {
            var builder = new SqlQueryBuilder<GreenBookSerialNumber>(gbsn);
            return ExecuteCommand(builder.GetUpdateCommand());
        }
        #endregion

        #region Update Call with MySql Transaction
        public int UpdateWithMySqlTransaction(GreenBookSerialNumber gbsn, GreenBookSerialNumber gbsnDB)
        {
            _connection.Open();
            var builder = new SqlQueryBuilder<GreenBookSerialNumber>(gbsn);
            using (MySqlCommand command = builder.GetUpdateCommandTransaction(new MySqlCommand()))
            {
                using(MySqlTransaction transaction = _connection.BeginTransaction())
                {
                    try
                    {
                        command.Connection = _connection;
                        command.Transaction = transaction;
                        command.CommandTimeout = 60;
                        int rowsUpdated = ExecuteCommandTransaction(command);
                        bool updatemadeb = true;
                        if (gbsn.nFormNumber == null)
                        {
                            if (gbsnDB.nMadebTypeId == 1)
                            {
                                updatemadeb = _madebRepository.UpdateSerialNumberWithMySqlTransaction(gbsnDB.sGBID, (int)gbsnDB.nFormNumber, (int)gbsnDB.nMadebTypeId, null, 1, command);
                            }
                            else
                            {
                                updatemadeb = _madebRepository.UpdateSerialNumberWithMySqlTransaction(gbsnDB.sGBID, (int)gbsnDB.nFormNumber, (int)gbsnDB.nMadebTypeId, null, null, command);
                            }
                        }
                        if (updatemadeb)
                        {
                            command.Transaction.Commit();
                            _connection.Close();
                            return rowsUpdated;
                        }
                        else
                        {
                            throw new Exception("Update of Madeb for Damaged Book Serial failed");
                        }

                    }
                    catch (Exception ex)
                    {
                        command.Transaction.Rollback();
                        _connection.Close();
                        throw;
                    }
                }
            }
            //MySqlTransaction transaction = _connection.BeginTransaction();
            //
            //MySqlCommand command = builder.GetUpdateCommand(new MySqlCommand());
            
        }
        #endregion

        #region Add Damaged Book Record

        #endregion

        #region Edit Book Record and Mark as Damaged Book
        #endregion

        #region Delete Call
        public int Delete(GreenBookSerialNumber gbsn)
        {
            var builder = new SqlQueryBuilder<GreenBookSerialNumber>(gbsn);
            return ExecuteCommand(builder.GetDeleteCommand());
        }
        #endregion

        #region Get Calls

        public IEnumerable<GreenBookSerialNumber> GetGreenBookSerialNumbers(int records = 0)
        {
            string sql = @"SELECT `tblgreenbookserial`.`Id`,
                         `tblgreenbookserial`.`nBookNo`,
                         `tblgreenbookserial`.`sGBId`,
                         `tblgreenbookserial`.`Remarks`,
                         `tblgreenbookserial`.`dtDate`,
                         `tblgreenbookserial`.`sName`,
                         `tblgreenbookserial`.`sCountryID`,
                         `tblgreenbookserial`.`nMadebTypeId`,
                         `tblgreenbookserial`.`nFormNumber`,
                         `tblgreenbookserial`.`sAuthRegion`,
                         `tblgreenbookserial`.`nAuthRegionId`,
                         `tblgreenbookserial`.`dtEntered`,
                         `tblgreenbookserial`.`nEnteredBy`,
                         `tblgreenbookserial`.`dtUpdated`,
                         `tblgreenbookserial`.`nUpdatedBy`
                         FROM `tblgreenbookserial` ORDER by nBookNo DESC";
            
            sql += records > 0 ? (@" LIMIT " + records + ";") : sql += ";";
            
            using (var command = new MySqlCommand(sql))
            {
                IEnumerable<GreenBookSerialNumber> result = GetRecords(command);
                return result;
                    
            }
        }

        public GreenBookSerialNumber GetGreenBookSerialNumberById(int id)
        {
            string sql = @"SELECT `tblgreenbookserial`.`Id`,
                         `tblgreenbookserial`.`nBookNo`,
                         `tblgreenbookserial`.`sGBId`,
                         `tblgreenbookserial`.`Remarks`,
                         `tblgreenbookserial`.`dtDate`,
                         `tblgreenbookserial`.`sName`,
                         `tblgreenbookserial`.`sCountryID`,
                         `tblgreenbookserial`.`nMadebTypeId`,
                         `tblgreenbookserial`.`nFormNumber`,
                         `tblgreenbookserial`.`sAuthRegion`,
                         `tblgreenbookserial`.`nAuthRegionId`,
                         `tblgreenbookserial`.`dtEntered`,
                         `tblgreenbookserial`.`nEnteredBy`,
                         `tblgreenbookserial`.`dtUpdated`,
                         `tblgreenbookserial`.`nUpdatedBy`
                         FROM `tblgreenbookserial`
                         WHERE `tblgreenbookserial`.`Id` = @id";

            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("id", id);
                return GetRecord(command);
            }
        }

        public GreenBookSerialNumber GetGreenBookSerialNumberBySerialNumber (int serialNumber)
        {
            string sql = @"SELECT `tblgreenbookserial`.`Id`,
                         `tblgreenbookserial`.`nBookNo`,
                         `tblgreenbookserial`.`sGBId`,
                         `tblgreenbookserial`.`Remarks`,
                         `tblgreenbookserial`.`dtDate`,
                         `tblgreenbookserial`.`sName`,
                         `tblgreenbookserial`.`sCountryID`,
                         `tblgreenbookserial`.`nMadebTypeId`,
                         `tblgreenbookserial`.`nFormNumber`,
                         `tblgreenbookserial`.`sAuthRegion`,
                         `tblgreenbookserial`.`nAuthRegionId`,
                         `tblgreenbookserial`.`dtEntered`,
                         `tblgreenbookserial`.`nEnteredBy`,
                         `tblgreenbookserial`.`dtUpdated`,
                         `tblgreenbookserial`.`nUpdatedBy`
                         FROM `tblgreenbookserial`
                         WHERE `tblgreenbookserial`.`nBookNo` = @serialNumber";
            
            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("serialNumber", serialNumber);
                return GetRecord(command);
            }
        }

        public IEnumerable<GreenBookSerialNumber> GetGreenBookByDateRange (DateTime start, DateTime end)
        {
            string startDate = start.ToString("yyyy-MM-dd");
            string endDate = end.ToString("yyyy-MM-dd");
            string sql = @"SELECT `tblgreenbookserial`.`Id`,
                         `tblgreenbookserial`.`nBookNo`,
                         `tblgreenbookserial`.`sGBId`,
                         `tblgreenbookserial`.`Remarks`,
                         `tblgreenbookserial`.`dtDate`,
                         `tblgreenbookserial`.`sName`,
                         `tblgreenbookserial`.`sCountryID`,
                         `tblgreenbookserial`.`nMadebTypeId`,
                         `tblgreenbookserial`.`nFormNumber`,
                         `tblgreenbookserial`.`sAuthRegion`,
                         `tblgreenbookserial`.`nAuthRegionId`,
                         `tblgreenbookserial`.`dtEntered`,
                         `tblgreenbookserial`.`nEnteredBy`,
                         `tblgreenbookserial`.`dtUpdated`,
                         `tblgreenbookserial`.`nUpdatedBy`
                         FROM `tblgreenbookserial`
                         WHERE `tblgreenbookserial`.`dtDate` >= @startDate AND `tblgreenbookserial`.`dtDate` <= @endDate ;";

            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("startDate", startDate);
                command.Parameters.AddWithValue("endDate", endDate);
                return GetRecords(command);
            }
        }

        public GreenBookSerialNumber GetEarliestGreenBookSerialByGBID(string sGBID)
        {
            string sql = @"SELECT grnbk.dtDate
                            , grnbk.sGBID
                            , grnbk.nBookNo
                            , grnbk.nMadebTypeId
                            FROM 
                                (SELECT min(dtDate) AS dtDate
                                    , sGBId 
                                    FROM `tblgreenbookserial` 
                                    WHERE sGBId = @sGBID) 
                                    AS t 
                                    INNER JOIN tblgreenbookserial grnbk 
                                    ON t.sgbid = grnbk.sGBId 
                                        AND t.dtDate = grnbk.dtDate;";

            using (var command =  new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("sGBID", sGBID);
                // Pending work
            }

            //Pending...
            return null;
        }

        #endregion

        public override GreenBookSerialNumber PopulateRecord(MySqlDataReader reader)
        {
            GreenBookSerialNumber gbsn = new GreenBookSerialNumber
            {
                Id = (int)reader["Id"],
                nBookNo = (int)reader["nBookNo"],
                sGBID = reader.IsDBNull("sGBID") ? null : (string?)(reader["sGBID"]),
                Remarks = reader.IsDBNull("Remarks") ? null : (string?)(reader["Remarks"]),
                dtDate = reader.IsDBNull("dtDate") ? null : (DateTime?)(reader["dtDate"]),
                sName = reader.IsDBNull("sName") ? null : (string?)(reader["sName"]),
                sCountryID = reader.IsDBNull("sCountryID") ? null : (string?)(reader["sCountryID"]),
                nMadebTypeId = reader.IsDBNull("nMadebTypeID") ? null : (int?)(reader["nMadebTypeID"]),
                nFormNumber = reader.IsDBNull("nFormNumber") ? null : (int?)(reader["nFormNumber"]),
                sAuthRegion = reader.IsDBNull("sAuthRegion") ? null : (string?)(reader["sAuthRegion"]),
                nAuthRegionId = reader.IsDBNull("nAuthRegionId") ? null : (int?)(reader["nAuthRegionId"]),
                //Common Props
                dtEntered = (DateTime)(reader["dtEntered"]),
                nEnteredBy = (int)reader["nEnteredBy"],
                dtUpdated = (DateTime)(reader["dtUpdated"]),
                nUpdatedBy = (int)reader["nUpdatedBy"]
            };
            return gbsn;
        }
    }
}
