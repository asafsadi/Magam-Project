using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MAGAM.Models;

namespace MAGAM.Models
{
    public class Product
    {
        string name;
        long serial;
        int prodTime;
        List<string> Materials = new List<string>();

        public string Name { get => name; set => name = value; }
        public long Serial { get => serial; set => serial = value; }
        public int ProdTime { get => prodTime; set => prodTime = value; }
        public List<string> Materials1 { get => Materials; set => Materials = value; }
    }
}