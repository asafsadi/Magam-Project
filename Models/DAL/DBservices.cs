using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Web.Configuration;
using System.Data;
using System.Text;
using MAGAM.Models;
using System.Globalization;

/// <summary>
/// DBServices is a class created by me to provides some DataBase Services
/// </summary>
public class DBservices
{
    public SqlDataAdapter da;
    public DataTable dt;

    public DBservices()
    {
        
    }

    //--------------------------------------------------------------------------------------------------
    // This method creates a connection to the database according to the connectionString name in the web.config 
    //--------------------------------------------------------------------------------------------------
    public SqlConnection connect(String conString)
    {

        // read the connection string from the configuration file
        string cStr = WebConfigurationManager.ConnectionStrings[conString].ConnectionString;
        SqlConnection con = new SqlConnection(cStr);
        con.Open();
        return con;
    }

    private SqlCommand CreateCommand(String CommandSTR, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = CommandSTR;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.Text; // the type of the command, can also be stored procedure

        return cmd;
    }


    //This function insert new worker to the database
    public int InsertWorker(Worker worker)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("connectionString"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertCommandorder(worker);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);

        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    // Build the Insert command String for InsertWorker 
    private String BuildInsertCommandorder(Worker worker)
    {
        String command1;

        StringBuilder sb1 = new StringBuilder();
        // use a string builder to create the dynamic string
        sb1.AppendFormat("Values('{0}', '{1}' ,'{2}','{3}','{4}','{5}')", worker.Id, worker.Name, worker.DateOfBirth, worker.StartWork, worker.Adress, worker.Phone);
        String prefix1 = "INSERT INTO Worker_2020 ([id],[workerName],[DateOfBirth],[DateStartWork],[AddressWorker],[phone])";
        command1 = prefix1 + sb1.ToString();
        return command1;
    }

    //This function fetches the users data from the database
    public List<User> getUsers()
    {
        List<User> newListUsers = new List<User>();

        SqlConnection con = null;

        try
        {
            con = connect("connectionString"); // create the connection
            string getThisPLS = "SELECT * FROM Users_2020";
            SqlCommand cmd = new SqlCommand(getThisPLS, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            

            while (dr.Read())
            {   // Read till the end of the data into a row
                User U = new User();
                U.Email = (string)dr["Email"];
                U.Password = (string)dr["password"];


                newListUsers.Add(U);
            }

            return newListUsers;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }



        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //This function inserts the new order data into the database
    public int InsertOrder(Order order)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("connectionString"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertCommandorder(order);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);

        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    // Build the Insert command String for InsertOrder 
    private String BuildInsertCommandorder(Order order)
    {
        String command1;
        DateTime Sday = DateTime.Today;
        string today = Sday.Year + "-" + Sday.Month + "-" + Sday.Day; ;
        string d = order.DueDate.Year + "-" + order.DueDate.Month + "-" + order.DueDate.Day;


        StringBuilder sb1 = new StringBuilder();
        // use a string builder to create the dynamic string
        sb1.AppendFormat("Values('{0}', '{1}' ,'{2}','{3}','{4}','{5}','{6}','{7}')", order.Makat, order.Description, order.CustomerId, order.CustomerName, d , order.Length, today ,today);
        String prefix1 = "INSERT INTO OrderOfCustomer_2020 ([makat],[description],[customerId],[customerName],[dueDate],[length],[receiveDate],[prodDate])";
        command1 = prefix1 + sb1.ToString();
        return command1;
    }

    //This function fetches the orders data from the database
    public List<Order> getOrders()
    {
        Order temp = new Order();
        List<Order> newListWorkOrders = new List<Order>();

        SqlConnection con = null;

        try
        {
            con = connect("connectionString"); // create the connection
            string getThisPLS = "select OrderOfCustomer_2020.orderId,OrderOfCustomer_2020.makat,OrderOfCustomer_2020.description,OrderOfCustomer_2020.customerId,OrderOfCustomer_2020.customerName,OrderOfCustomer_2020.dueDate,OrderOfCustomer_2020.length,OrderOfCustomer_2020.prodDate,OrderOfCustomer_2020.receiveDate,MaterialType_2020.MachineId,MaterialType_2020.reqProcessTime from OrderOfCustomer_2020 inner join MaterialType_2020 on OrderOfCustomer_2020.makat = MaterialType_2020.makat";
            SqlCommand cmd = new SqlCommand(getThisPLS, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
           

            while (dr.Read())
            {
                Order W = new Order();
                W.Id = (int)Convert.ToInt32(dr["orderId"]);
                W.Makat = (string)dr["makat"];
                W.Description = (string)dr["description"];
                W.CustomerId = (int)Convert.ToInt32(dr["customerId"]);
                W.CustomerName = (string)dr["customerName"];
                W.DueDate = Convert.ToDateTime(dr["dueDate"]); ;
                W.Length = (int)Convert.ToInt32(dr["length"]);
                W.MachineId = (int)Convert.ToInt32(dr["machineId"]);
                W.ReqProcessTime = (int)Convert.ToInt32(dr["reqProcessTime"]) * (int)Convert.ToInt32(dr["length"])/60;
                W.ProdDate = (string)dr["prodDate"];
                W.RecvDdate = Convert.ToDateTime(dr["receiveDate"]);


                newListWorkOrders.Add(W);
            }

            return newListWorkOrders;
        }
        catch (Exception ex)
        {
            // write to log
            temp.Description = ex.Message;
            return new List<Order>() { temp };
        }



        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }


    //This function extracts the order data from the database
    public DBservices readOrders()
    {
        SqlConnection con = null;
        try
        {
            con = connect("ConnectionString");
            da = new SqlDataAdapter("select * from OrderOfCustomer_2020", con);
            SqlCommandBuilder builder = new SqlCommandBuilder(da);
            DataSet ds = new DataSet();
            da.Fill(ds);
            dt = ds.Tables[0];
        }

        catch (Exception ex)
        {
            // write errors to log file
            // try to handle the error
            throw ex;
        }

        finally
        {
            if (con != null)
            {
                con.Close();
            }
        }


        return this;

    }

    //This function updates the order table rows in the database
    public void update()
    {
        da.Update(dt);
    }

    //This function fetches the customers data from the database
    public List<Customer> getCustomers()
    {
        List<Customer> newListCustomers = new List<Customer>();

        SqlConnection con = null;

        try
        {
            con = connect("connectionString"); // create the connection
            string getThisPLS = "SELECT * FROM Customer_2020";
            SqlCommand cmd = new SqlCommand(getThisPLS, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            

            while (dr.Read())
            {   // Read till the end of the data into a row
                Customer C = new Customer();
                C.Id = (int)Convert.ToInt32(dr["id"]);
                C.Name = (string)dr["name"];
                C.Contact = (string)dr["contact"];
                C.Phone = (int)Convert.ToInt32(dr["phone"]);
                C.Email = (string)dr["email"];

                newListCustomers.Add(C);
            }

            return newListCustomers;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }



        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //This function fetches the products data from the database
    public List<MaterialType> getMaterials()
    {
        List<MaterialType> newListMaterials = new List<MaterialType>();

        SqlConnection con = null;

        try
        {
            con = connect("connectionString"); // create the connection
            string getThisPLS = "SELECT * FROM MaterialType_2020";
            SqlCommand cmd = new SqlCommand(getThisPLS, con);
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            

            while (dr.Read())
            {   // Read till the end of the data into a row
                MaterialType M = new MaterialType();
                M.Makat = (string)dr["makat"];
                M.MachineId = (int)Convert.ToInt32(dr["machineId"]);
                M.ReqProcessTime = (int)Convert.ToInt32(dr["reqProcessTime"]);
                M.Description = (string)dr["description"];




                newListMaterials.Add(M);
            }

            return newListMaterials;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }



        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    //This function insert new customer to the database
    public int InsertCustomer(Customer customer)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("connectionString"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertCommandorder(customer);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);

        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }
    }

    // Build the Insert command String for InsertCustomer
    private String BuildInsertCommandorder(Customer customer)
    {
        String command1;

        StringBuilder sb1 = new StringBuilder();
        // use a string builder to create the dynamic string
        sb1.AppendFormat("Values('{0}', '{1}' ,'{2}','{3}','{4}')", customer.Id, customer.Name, customer.Contact, customer.Phone, customer.Email);
        String prefix1 = "INSERT INTO Customer_2020 ([id],[name],[contact],[phone],[email])";
        command1 = prefix1 + sb1.ToString();
        return command1;
    }
}