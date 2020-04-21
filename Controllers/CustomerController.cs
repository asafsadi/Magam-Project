using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MAGAM.Models;

namespace MAGAM.Controllers
{
    public class CustomerController : ApiController
    {
        // GET api/<controller>
        public List<Customer> Get()
        {
            Customer newCustomer = new Customer();
            return newCustomer.getCustomers();

        }

        // POST api/<controller>
        public void Post([FromBody]Customer customer)
        {
            customer.insert();
        }

    }
}