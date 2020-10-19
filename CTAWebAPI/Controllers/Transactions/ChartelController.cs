using CTADBL.BaseClassRepositories.Masters;
using CTADBL.BaseClassRepositories.Transactions;
using CTADBL.Entities;
using CTAWebAPI.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CTAWebAPI.Controllers.Transactions
{
    [EnableCors("AllowOrigin")]
    //[APIKeyAuth]
    [Route("api/[controller]")]
    [ApiController]
    public class ChartelController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly ChartelRepository _chartelRepository;
        private readonly GBChartelRepository _gbChartelRepository;
        private readonly CTALogger _ctaLogger;
        public ChartelController(DBConnectionInfo info)
        {
            _info = info;
            _ctaLogger = new CTALogger(_info);
            _chartelRepository = new ChartelRepository(_info.sConnectionString);
            _gbChartelRepository = new GBChartelRepository(_info.sConnectionString);
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
