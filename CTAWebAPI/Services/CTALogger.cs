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
        public CTALogger(DBConnectionInfo info)
        {
            _info = info;
            _actionLoggerRepository = new ActionLoggerRepository(_info.sConnectionString);
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
        public void LogRecord(string sActionType,string sModuleName,string sEventName,string sDescription, [Optional] string sStackTrace, [Optional] int? nEnteredBy)
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
                throw new Exception("Exception Occured while Logging, Exception Message: "+ex.Message);
            }
            #endregion
        }
        #endregion
    }
}
