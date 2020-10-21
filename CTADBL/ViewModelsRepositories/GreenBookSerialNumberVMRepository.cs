﻿using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Transactions;
using CTADBL.Repository;
using CTADBL.ViewModels;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace CTADBL.ViewModelsRepositories
{
    public class GreenBookSerialNumberVMRepository : ADORepository<GreenBookSerialNumberVM>
    {
        private GreenBookSerialNumberRepository _greenBookSerialNumberRepository;
        private MySqlConnection _connection;

        #region Constructor
        public GreenBookSerialNumberVMRepository(string connectionString) : base(connectionString)
        {
            _greenBookSerialNumberRepository = new GreenBookSerialNumberRepository(connectionString);
            _connection = new MySqlConnection(connectionString);
        }
        #endregion

        #region Get Calls

        public IEnumerable<GreenBookSerialNumberVM> GetGreenBookSerialNumbers(int records)
        {
            string sql = @"SELECT md.sMadebType, au.sAuthRegion, concat(grbk.sFirstName, ' ' , IFNULL(grbk.sMiddleName, ''), ' ', IFNULL(grbk.sLastName, '')) as sName, gbsn.*  FROM (SELECT gb.Id, gb.nBookNo, gb.sGBId, gb.Remarks, gb.dtDate, gb.sName, gb.sCountryID, 
                             gb.nMadebTypeId, 
                             gb.nFormNumber, 
                             gb.nAuthRegionId, 
                             gb.dtEntered,
                             gb.nEnteredBy,
                             gb.dtUpdated,
                             gb.nUpdatedBy FROM tblgreenbookserial AS gb
                             order by gb.nBookNo DESC
                             LIMIT @records) as gbsn
                             LEFT JOIN tblgreenbook AS grbk
                             ON gbsn.sGBId = grbk.sGBID
                             LEFT JOIN lstmadebtype AS md
                             ON gbsn.nMadebTypeId = md.Id
                             LEFT JOIN lstauthregion AS au
                             ON gbsn.nAuthRegionId = au.ID";

            //sql += records > 0 ? (@" LIMIT " + records + ";") : sql += ";";

            using (var command = new MySqlCommand(sql))
            {
                

                command.Parameters.AddWithValue("records", records);
                IEnumerable<GreenBookSerialNumberVM> result = GetRecords(command);
                //result = result.OrderBy(a => a.greenBookSerialNumber.nBookNo);
                //result = result.Reverse();
                return result;

            }
        }

        public GreenBookSerialNumberVM GetGreenBookSerialNumberBySerialNumber(int serialNumber)
        {
            string sql = @"SELECT gb.Id, 
                         gb.nBookNo, 
                         gb.sGBId, 
                         gb.Remarks, 
                         gb.dtDate, 
                         gb.sName, 
                         gb.sCountryID, 
                         gb.nMadebTypeId, 
                         gb.nFormNumber, 
                         gb.nAuthRegionId, 
                         gb.dtEntered,
                         gb.nEnteredBy,
                         gb.dtUpdated,
                         gb.nUpdatedBy,
                         md.sMadebType, 
                         au.sAuthRegion 
                         FROM tblgreenbookserial AS gb 
                         LEFT JOIN lstmadebtype AS md 
                         ON gb.nMadebTypeId = md.Id 
                         LEFT JOIN lstauthregion AS au 
                         ON gb.nAuthRegionId = au.ID
                         WHERE gb.nBookNo = @serialNumber";

            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("serialNumber", serialNumber);
                return GetRecord(command);
            }
        }

        public IEnumerable<GreenBookSerialNumberVM> GetGreenBookByDateRange(DateTime start, DateTime end)
        {
            string startDate = start.ToString("yyyy-MM-dd");
            string endDate = end.ToString("yyyy-MM-dd");
            string sql = @"SELECT gb.Id, 
                         gb.nBookNo, 
                         gb.sGBId, 
                         gb.Remarks, 
                         gb.dtDate, 
                         gb.sName, 
                         gb.sCountryID, 
                         gb.nMadebTypeId, 
                         gb.nFormNumber, 
                         gb.nAuthRegionId, 
                         gb.dtEntered,
                         gb.nEnteredBy,
                         gb.dtUpdated,
                         gb.nUpdatedBy,
                         md.sMadebType, 
                         au.sAuthRegion 
                         FROM tblgreenbookserial AS gb 
                         LEFT JOIN lstmadebtype AS md 
                         ON gb.nMadebTypeId = md.Id 
                         LEFT JOIN lstauthregion AS au 
                         ON gb.nAuthRegionId = au.ID
                         WHERE gb.dtDate >= @startDate AND gb.dtDate <= @endDate ;";

            using (var command = new MySqlCommand(sql))
            {
                command.Parameters.AddWithValue("startDate", startDate);
                command.Parameters.AddWithValue("endDate", endDate);
                return GetRecords(command);
            }
        }
        #endregion


        public IEnumerable<Object> GetGreenBookSerialNumberAssignList()
        {
            //string sql = @"SELECT mdb.id, mdb.nFormNumber, mdb.sGBID, mdb.nMadebTypeID, mdb.sName, mdb.dtReceived, au.sAuthRegion, mdbtype.sMadebType FROM tblmadeb AS mdb LEFT JOIN lstauthregion au ON au.ID = mdb.nAuthRegionID LEFT JOIN lstmadebtype mdbtype ON mdbtype.Id = mdb.nMadebTypeID LEFT JOIN tblgivengbid on concat(tblgivengbid.ngbid + '')  = mdb.sgbid  WHERE mdb.nIssuedOrNotID = 1 AND tblgivengbid.nGivenOrNot = 1 AND mdb.sGBId IS NOT NULL ORDER BY mdb.dtUpdated DESC;";
            string sql = @"SELECT mdb.id, mdb.nFormNumber, mdb.sGBID, mdb.nMadebTypeID, mdb.sName, mdb.dtReceived, au.sAuthRegion, mdbtype.sMadebType FROM tblmadeb AS mdb LEFT JOIN lstauthregion au ON au.ID = mdb.nAuthRegionID LEFT JOIN lstmadebtype mdbtype ON mdbtype.Id = mdb.nMadebTypeID LEFT JOIN tblgivengbid on concat(tblgivengbid.ngbid + '')  = mdb.sgbid  WHERE tblgivengbid.nGivenOrNot = 1 AND mdb.sGBId IS NOT NULL and mdb.nFormNumber NOT IN (SELECT nFormNumber FROM tblgreenbookserial WHERE nFormNumber IS NOT NULL) ORDER BY mdb.dtUpdated DESC;";
            using (var command = new MySqlCommand(sql))
            {
                command.Connection = _connection;
                command.CommandType = CommandType.Text;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                DataSet ds = new DataSet();
                mySqlDataAdapter.Fill(ds);
                DataTableCollection tables = ds.Tables;
                var list = tables[0].AsEnumerable().Select(row => new { Id = row.Field<int>("Id"), nFormNumber = row.Field<int>("nFormNumber"), sGBID = row.Field<string>("sGBID"), sName = row.Field<string>("sName"), dtReceived = row.Field<DateTime?>("dtReceived"), sMadebType = row.Field<string>("sMadebType"), sAuthRegion = row.Field<string>("sAuthRegion") }).ToList();
                return list;
            }
        }


        #region Populate GreenBookSerialVM Records
        public override GreenBookSerialNumberVM PopulateRecord(MySqlDataReader reader)
        {
            return new GreenBookSerialNumberVM
            {
                greenBookSerialNumber = _greenBookSerialNumberRepository.PopulateRecord(reader),
                sAuthRegion = reader.IsDBNull("sAuthRegion") ? null : (string?)(reader["sAuthRegion"]),
                sMadebType = reader.IsDBNull("sMadebType") ? null : (string?)(reader["sMadebType"])
            };
        }
        #endregion
    }
}
