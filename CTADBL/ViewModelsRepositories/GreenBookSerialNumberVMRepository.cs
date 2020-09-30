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

        #region Constructor
        public GreenBookSerialNumberVMRepository(string connectionString) : base(connectionString)
        {
            _greenBookSerialNumberRepository = new GreenBookSerialNumberRepository(connectionString);
        }
        #endregion

        #region Get Calls

        public IEnumerable<GreenBookSerialNumberVM> GetGreenBookSerialNumbers(int records = 0)
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
                             LIMIT 10) as gbsn
                             LEFT JOIN tblgreenbook AS grbk
                             ON gbsn.sGBId = grbk.sGBID
                             LEFT JOIN lstmadebtype AS md
                             ON gbsn.nMadebTypeId = md.Id
                             LEFT JOIN lstauthregion AS au
                             ON gbsn.nAuthRegionId = au.ID";

            //sql += records > 0 ? (@" LIMIT " + records + ";") : sql += ";";

            using (var command = new MySqlCommand(sql))
            {
                IEnumerable<GreenBookSerialNumberVM> result = GetRecords(command);
                result = result.OrderBy(a => a.greenBookSerialNumber.nBookNo);
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