using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MAGAM.Models;

namespace MAGAM.Controllers
{
    public class MaterialController : ApiController
    {
        // GET api/<controller>
        public List<MaterialType> Get()
        {
            MaterialType newMaterial = new MaterialType();
            return newMaterial.getMaterials();

        }

    }
}