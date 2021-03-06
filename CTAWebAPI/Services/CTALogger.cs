﻿using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Transactions;
using CTADBL.Entities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using TimeZoneConverter;

namespace CTAWebAPI.Services
{
    public class CTALogger
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly ActionLoggerRepository _actionLoggerRepository;
        public static AuditLogRepository _auditLogRepository;
        public CTALogger(DBConnectionInfo info)
        {
            _info = info;
            _actionLoggerRepository = new ActionLoggerRepository(_info.sConnectionString);
            //_auditLogRepository = new AuditLogRepository(_info.sConnectionString);
        }
        #endregion

        #region Log Record
        /// <summary>
        /// Logs Record in Action Logger table in DB
        /// </summary>
        /// <param name="sActionType">Action Type</param>
        /// <param name="sModuleName">Module Name</param>
        /// <param name="sEventName">Event Name</param>
        /// <param name="sDescription">Description</param>
        /// <param name="sStackTrace">Stack Trace</param>
        /// <param name="nEnteredBy">User ID</param>
        public void LogRecord(string sActionType, string sModuleName, string sEventName, string sDescription, [Optional] string sStackTrace, int nEnteredBy = 1)
        {
            #region Add Record
            try
            {
                ActionLogger actionLogger = new ActionLogger()
                {
                    sActionType = sActionType,
                    sModuleName = sModuleName,
                    sEventName = sEventName,
                    sDescription = sDescription,
                    sStackTrace = sStackTrace,
                    dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time")),
                    nEnteredBy = nEnteredBy
                };
                _actionLoggerRepository.Add(actionLogger);
            }
            catch (Exception ex)
            {
                throw new Exception("Exception Occured while Logging, Exception Message: " + ex.Message);
            }
            #endregion
        }
        #endregion

        #region Audit Logger
        /// <summary>
        /// Audit Log for Every Edit Across System
        /// </summary>
        /// <typeparam name="T">Type</typeparam>
        /// <param name="oOld">Old Object</param>
        /// <param name="oNew">New Object</param>
        /// <param name="sGBID">GB ID</param>
        /// <param name="nRegionID">Region ID</param>
        /// <param name="nFeatureID">Feature ID</param>
        /// <param name="nRecordID">Record ID</param>
        /// <param name="nEnteredBy">UserID UI</param>
        public static void LogAuditRecord<T>(T oOld, T oNew, string sGBID, int? nRegionID, int nFeatureID, int nRecordID, int nEnteredBy) where T : class
        {
            #region Add Audit Record
            try
            {
                string sDifference = CTAAuditLogger.ReturnStrings(oOld, oNew);
                //if (sDifference != null & sDifference[0] != "" && sDifference[1] != "")
                if(sDifference != "[]")
                {
                    AuditLog auditLogger = new AuditLog()
                    {
                        dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time")),
                        nFeatureID = nFeatureID,
                        nRegionID = nRegionID,
                        nRecordID = nRecordID,
                        sGBID = sGBID,
                        //sFieldValuesOld = sDifference[0],
                        //sFieldValuesNew = sDifference[1],
                        sFieldValuesOld = sDifference,
                        sFieldValuesNew = "",
                        nEnteredBy = nEnteredBy
                    };
                    _auditLogRepository.Add(auditLogger);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Exception Occured while Audit Logging, Exception Message: " + ex.Message);
            }
            #endregion
        }

        public static void LogAuditRecordComplex(Dictionary<string, dynamic> dict1, Dictionary<string, dynamic> dict2, string sGBID, int? nRegionID, int nFeatureID, int nRecordID, int nEnteredBy)
        {
            List<object> changes = new List<object>();
            foreach (var item in dict1)
            {
                var oldValue = dict1[item.Key];
                var newValue = dict2[item.Key];
                var change = new { Field = item.Key.Replace("_"," "), PreviousValue = oldValue, NewValue = newValue };
                changes.Add(change);
            }
            string changesStr = JsonConvert.SerializeObject(changes);
            if (changesStr != "[]")
            {
                AuditLog auditLogger = new AuditLog()
                {
                    dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time")),
                    nFeatureID = nFeatureID,
                    nRegionID = nRegionID,
                    nRecordID = nRecordID,
                    sGBID = sGBID,
                    sFieldValuesOld = changesStr,
                    sFieldValuesNew = "",
                    nEnteredBy = nEnteredBy
                };
                _auditLogRepository.Add(auditLogger);
            }
        }
        #endregion  
    }
}
