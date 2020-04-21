using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MAGAM.Models;

namespace MAGAM.Models
{
    public class User
    {
        string email;
        string password;

        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }

        public List<User> getUsers()
        {
            DBservices db = new DBservices();
            List<User> listUsersArr = db.getUsers();
            return listUsersArr;
        }
    }
}