using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Transactions;
using CTADBL.Entities;
using System;
using System.Runtime.InteropServices;

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
                    dtEntered = DateTime.Now,
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
                string[] sDifference = CTAAuditLogger.ReturnStrings(oOld, oNew);
                if (sDifference != null & sDifference[0] != "" && sDifference[1] != "")
                {
                    AuditLog auditLogger = new AuditLog()
                    {
                        dtEntered = DateTime.Now,
                        nFeatureID = nFeatureID,
                        nRegionID = nRegionID,
                        nRecordID = nRecordID,
                        sGBID = sGBID,
                        sFieldValuesOld = sDifference[0],
                        sFieldValuesNew = sDifference[1],
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
        #endregion  
    }
}
