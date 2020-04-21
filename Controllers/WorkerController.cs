using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MAGAM.Models;

namespace MAGAM.Controllers
{
    public class WorkerController : ApiController
    {
        // POST api/<controller>
        public void Post([FromBody]Worker worker)
        {
            worker.insert();
        }

    }
}