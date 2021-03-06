﻿using CTADBL.BaseClassRepositories.Masters;
using CTADBL.BaseClassRepositories.Transactions;
using CTADBL.Entities;
using CTAWebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CTAWebAPI.Controllers.Transactions
{
    [Authorize]
    [EnableCors("AllowOrigin")]
    //[APIKeyAuth]
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly ChatrelRepository _chartelRepository;
        private readonly GBChatrelRepository _gbChartelRepository;
        private readonly CTALogger _ctaLogger;
        public PaymentsController(DBConnectionInfo info)
        {
            _info = info;
            _ctaLogger = new CTALogger(_info);
            _chartelRepository = new ChatrelRepository(_info.sConnectionString);
            _gbChartelRepository = new GBChatrelRepository(_info.sConnectionString);
        }
        #endregion

        #region Get Calls
        #endregion

        #region Add Call
        #endregion

        #region Update Call
        #endregion

        #region Delete Call
        #endregion
    }
}
