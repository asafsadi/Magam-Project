using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MAGAM.Models;

namespace MAGAM.Models
{
    public class Customer
    {
        int id;
        string name;
        string contact;
        int phone;
        string email;

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Contact { get => contact; set => contact = value; }
        public int Phone { get => phone; set => phone = value; }
        public string Email { get => email; set => email = value; }


        public List<Customer> getCustomers()
        {
            DBservices db = new DBservices();
            List<Customer> listCustomersArr = db.getCustomers();
            return listCustomersArr;
        }


        public int insert()
        {
            DBservices dbs = new DBservices();
            int numAffected = dbs.InsertCustomer(this);
            return numAffected;
        }
    }
}