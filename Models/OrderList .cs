using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MAGAM.Models;
using System.Data;

namespace MAGAM.Models
{
    public class OrderList
    {
        public List<Order> OList;

        public OrderList(List<Order> olist)
        {
            this.OList = olist;
        }

        public void addOrder(Order o)
        {
            OList.Add(o);
        }

        public OrderList()
        {
        }

        //This function arranges the orders according to their importance
        public void arrangeOrders()
        {
             this.OList = this.OList.OrderBy(e => e.DueDate).ThenBy(e => e.ReqProcessTime).ToList();
        }

        //This function builds the date in a way that fits the calendar
        public string buildate(int shour,DateTime date)
        {
            string prodDate = null;
            if (date.Month > 9 && date.Day >9)
            {
                if (shour > 9)
                    prodDate = (date.Year + "-" + date.Month + "-" + date.Day + "T" + shour + ":00:00");
                else
                    prodDate = (date.Year + "-" + date.Month + "-" + date.Day + "T0" + shour + ":00:00");
            }
            else if(date.Month < 10 && date.Day > 9)
            {
                if (shour > 9)
                    prodDate = (date.Year + "-0" + date.Month + "-" + date.Day + "T" + shour + ":00:00");
                else
                    prodDate = (date.Year + "-0" + date.Month + "-" + date.Day + "T0" + shour + ":00:00");
            }
            else if(date.Month < 10 && date.Day < 10)
            {
                if (shour > 9)
                    prodDate = (date.Year + "-0" + date.Month + "-0" + date.Day + "T" + shour + ":00:00");
                else
                    prodDate = (date.Year + "-0" + date.Month + "-0" + date.Day + "T0" + shour + ":00:00");
            }
            else
            {
                if (shour > 9)
                    prodDate = (date.Year + "-" + date.Month + "-0" + date.Day + "T" + shour + ":00:00");
                else
                    prodDate = (date.Year + "-" + date.Month + "-0" + date.Day + "T0" + shour + ":00:00");
            }

            return prodDate;
        }

        //This function inserts the production date into the array
        public void insertProd(List<Order> WList)
        {
            for (int j = 0; j < this.OList.Count; j++)
            {
                for (int k = 0; k < (WList.Count - 1); k++)
                {
                    if (this.OList[j].Id == WList[k].Id)
                    {
                        this.OList[j].ProdDate = WList[k].ProdDate;
                    }
               }
            }
        }

        //This function resets the previous production date of each order
        public void setnull()
        {
            for (int t = 0; t < this.OList.Count; t++)
            {
                this.OList[t].ProdDate = null;
            }
        }


        //This function gives each order a production date by operating hours and in order of importance
        public void setproddate()
        {
            this.setnull();
            int numofmachines = 3;
            for (int i = 1; i <= numofmachines; i++)
            {
                List<Order> WList = new List<Order>();
                for (int j = 0; j < this.OList.Count; j++)
                {
                    if (this.OList[j].MachineId == i)
                    {
                        WList.Add(this.OList[j]);
                    }
                }
                int Shour = 7;
                DateTime Sday = DateTime.Today;
                Sday = Sday.AddDays(1);
                for (int k = 0; k < (WList.Count - 1); k++)
                {
                    int RPT = WList[k].ReqProcessTime;
                    if (WList[k].ProdDate == null)
                    {
                        WList[k].ProdDate = buildate(Shour, Sday);
                    }
                    double count = 0;
                    while (RPT >= 9)
                    {
                        count++;
                        RPT = RPT - 9;
                    }
                    Shour = Shour + RPT;
                    if (Shour >= 16)
                    {
                        count++;
                        Shour = Shour - 16 + 7;
                    }
                    Sday = Sday.AddDays(count);
                    WList[k + 1].ProdDate = buildate(Shour, Sday);
                }
                this.insertProd(WList);

            }
        }

        //This function updates the new order dates in the database
        public int updateModel()
        {

            DBservices dbs = new DBservices();
            dbs = dbs.readOrders();
            dbs.dt = OrdersTable(dbs.dt);
            dbs.update();
            return 0;
        }

        //This function updates the rows in the database
        public DataTable OrdersTable( DataTable dt)
        {
            foreach (DataRow dr in dt.Rows)
            {
                int thisId = (int)Convert.ToInt32(dr["orderId"]);
                for (int i = 0; i <this.OList.Count; i++)
                {
                    if (thisId == this.OList[i].Id)
                    {
                        dr["prodDate"] = this.OList[i].ProdDate;
                    }
                }

            }
            return dt;
        }
    }

}
