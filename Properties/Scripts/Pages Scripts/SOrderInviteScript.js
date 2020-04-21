var prodToMakat = new Map();
var customerNameToID = new Map();

$(document).ready(function () {

    $("#pForm").submit(f1);
    ajaxCall("GET", "../api/Material", "", succGetM, errorGetM);
    ajaxCall("GET", "../api/Customer", "", succGetC, errorGetC)

    // activate a custom validation function when the element looses focus.
});




function checkCode() {
    if (this.value % 3 != 0) { // an example of validation that the code divides by 3
        this.validity.valid = false; // must set it to false to prevent the submit to the server
        this.setCustomValidity('Code is not valid, please enter a valid code');
    }
    else {
        this.validity.valid = true;
        this.setCustomValidity('');
    }
}




//creates an order object from the elements values and than adding it to DB using POST request

function AddOrder() {
    Order = {
        Makat: $("#makat").val(),
        Description: $("#Pnames").val(),
        CustomerId: ($("#customerId").val()),
        CustomerName: ($("#customerName").val()),
        StartWork: ($("#startWork").val()),
        DueDate: $("#dueDate").val(),
        Length: $("#length").val(),


    }
    ajaxCall("POST", "../api/Order", JSON.stringify(Order), success, error);


}

// This function is called in case of a success
function success() {
    window.location.reload();
}

// This function is called in case of an error
function error(err) {
    console.log(err);
}

//creates dynamiclly the combobox for products from DB
function succGetM(data) {

    console.log(data);
    for (m in data) {
        var comboprod = document.getElementById("Pnames");
        var option = document.createElement("option");
        option.text = '' + data[m]["Description"];
        prodToMakat.set('' + data[m]["Description"], '' + data[m]["Makat"]);
        comboprod.add(option);
    }

}

function errorGetM(err) {
    console.log(err);
}


//creates dynamiclly the combobox for customers from DB

function succGetC(data) {

    console.log(data);
    for (c in data) {
        var comboprod = document.getElementById("customerName");
        var option = document.createElement("option");
        option.text = '' + data[c]["Name"];
        customerNameToID.set('' + data[c]["Name"], '' + data[c]["Id"]);
        comboprod.add(option);
    }

}

function errorGetC(err) {
    console.log(err);
}

function f1() {
    AddOrder();
    return false;
}

function setMakat(pname) {
    document.getElementById("makat").value = prodToMakat.get(pname);
}


//shows new customer insertion elements
function setCustomerID(cname) {
    var newcusdiv = document.getElementById("newc");
    var firstpart = document.getElementById("first");
    var secondpart = document.getElementById("second");

    if (cname == "הוסף לקוח חדש") {
        firstpart.style.display = "none";
        secondpart.style.display = "none";
        newcusdiv.style.display = "block";
    } else {
        firstpart.style.display = "block";
        secondpart.style.display = "block";
        newcusdiv.style.display = "none";
        document.getElementById("customerId").value = customerNameToID.get(cname);
    }

}


//adds new customer to DB from new customer elements values
function addNewCustomer() {
    let name = document.getElementById("newname").value;
    let id = document.getElementById("newId").value;
    let contact = document.getElementById("newcname").value;
    let phone = document.getElementById("newphone").value;
    let email = document.getElementById("newemail").value;

    if ((name != "") && (id != "") && (contact != "") && (phone != "") && (email != "")) {
        customer = {
            Id: id,
            Name: name,
            Contact: contact,
            Phone: phone,
            Email: email,

        }
        ajaxCall("POST", "../api/Customer", JSON.stringify(customer), successCC, errorCC);
    } else alert("אנא מלא פרטי לקוח");

}


function successCC() {
    window.location.reload();
}

// This function is called in case of an error
function errorCC(err) {
    console.log(err);
}





