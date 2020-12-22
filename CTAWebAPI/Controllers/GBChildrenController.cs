using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Transactions;
using CTADBL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace CTAWebAPI.Controllers
{
    //[Authorize]
    [EnableCors("AllowOrigin")]
    //[APIKeyAuth]
    [Route("api/[controller]")]
    [ApiController]
    public class GBChildrenController : ControllerBase
    {
        private readonly DBConnectionInfo _info;
        private GBChildrenRepository _gbChildrenRepository;

        public GBChildrenController(DBConnectionInfo info)
        {
            _info = info;
            _gbChildrenRepository = new GBChildrenRepository(_info.sConnectionString);
        }
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetGBChildrenByGBIDParent(string sGBIDParent)
        {
            IEnumerable<GBChildren> children = _gbChildrenRepository.GetGBChildrenByGBIDParent(sGBIDParent);
            return Ok(children);
        }
    }
}
