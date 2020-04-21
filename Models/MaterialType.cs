using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MAGAM.Models;

namespace MAGAM.Models
{
    public class MaterialType
    {
        string makat;
        int machineId;
        int reqProcessTime;
        string description;

        public string Makat { get => makat; set => makat = value; }
        public int MachineId { get => machineId; set => machineId = value; }
        public int ReqProcessTime { get => reqProcessTime; set => reqProcessTime = value; }
        public string Description { get => description; set => description = value; }

        public List<MaterialType> getMaterials()
        {
            DBservices db = new DBservices();
            List<MaterialType> listMaterialsArr = db.getMaterials();
            return listMaterialsArr;
        }
    }
}