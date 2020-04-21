using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MAGAM.Models;

namespace MAGAM.Controllers
{
    public class OrderController : ApiController
    {
        // GET api/<controller>
        public List<Order> Get()
        {
            Order newOrder = new Order();
            return newOrder.getOrders();

        }

        // POST api/<controller>
        public void Post([FromBody]Order order)
        {
            order.insert();
        }


    }
}