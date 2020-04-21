using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace MAGAM.Models
{
    public class Order
    {
        int id;
        string makat;
        string description;
        int customerId;
        string customerName;
        DateTime dueDate;
        int length;
        int machineId;
        int reqProcessTime;
        string prodDate;
        DateTime recvDdate;

        public int Id { get => id; set => id = value; }
        public string Makat { get => makat; set => makat = value; }
        public string Description { get => description; set => description = value; }
        public int CustomerId { get => customerId; set => customerId = value; }
        public string CustomerName { get => customerName; set => customerName = value; }
        public DateTime DueDate { get => dueDate; set => dueDate = value; }
        public int Length { get => length; set => length = value; }
        public int MachineId { get => machineId; set => machineId = value; }
        public int ReqProcessTime { get => reqProcessTime; set => reqProcessTime = value; }
        public string ProdDate { get => prodDate; set => prodDate = value; }
        public DateTime RecvDdate { get => recvDdate; set => recvDdate = value; }


        public List<Order> getOrders()
        {
            DBservices db = new DBservices();
            List<Order> listOrdersArr = db.getOrders();
            return listOrdersArr;
        }


        // this function insert the new order and retrieves all orders from the database and sends to the function that arranges them
        public int insert()
        {
          DBservices db = new DBservices();
          int numAffected = db.InsertOrder(this);
          OrderList Olist = new OrderList(db.getOrders());
          Olist.arrangeOrders();
          Olist.setproddate();
          return Olist.updateModel();


        }

       
    }
}