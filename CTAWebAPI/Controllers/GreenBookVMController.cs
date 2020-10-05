using CTADBL.Entities;
using CTADBL.ViewModels;
using CTADBL.ViewModelsRepositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;


namespace CTAWebAPI.Controllers
{
    [EnableCors("AllowOrigin")]
    //[APIKeyAuth]
    [Route("api/[controller]")]
    [ApiController]
    public class GreenBookVMController : ControllerBase
    {
        
        private readonly DBConnectionInfo _info;
        private GreenBookVMRepository _greenBookVMRepository;
        #region Constructor
        public GreenBookVMController(DBConnectionInfo info)
        {
            _info = info;
            _greenBookVMRepository = new GreenBookVMRepository(_info.sConnectionString);
        }
        #endregion

        
    }
}
