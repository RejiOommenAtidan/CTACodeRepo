using CTADBL.Entities;
using CTADBL.ViewModelsRepositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CTAWebAPI.Controllers
{
    //[Authorize]
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
