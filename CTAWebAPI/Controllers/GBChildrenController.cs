using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Transactions;
using CTADBL.Entities;
using CTAWebAPI.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace CTAWebAPI.Controllers
{
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
