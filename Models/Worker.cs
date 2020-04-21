using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MAGAM.Models;


namespace MAGAM.Models
{
    public class Worker
    {
        string name;
        int id;
        int level;
        string dateOfBirth;
        string startWork;
        string adress;
        string phone;
        List<int> MachineSpecs = new List<int>();

        public string Name { get => name; set => name = value; }
        public int Id { get => id; set => id = value; }
        public int Level { get => level; set => level = value; }
        public string DateOfBirth { get => dateOfBirth; set => dateOfBirth = value; }
        public string StartWork { get => startWork; set => startWork = value; }
        public string Adress { get => adress; set => adress = value; }
        public string Phone { get => phone; set => phone = value; }
        public List<int> MachineSpecs1 { get => MachineSpecs; set => MachineSpecs = value; }

        public int insert()
        {
            DBservices dbs = new DBservices();
            int numAffected = dbs.InsertWorker(this);
            return numAffected;
        }
    }
}