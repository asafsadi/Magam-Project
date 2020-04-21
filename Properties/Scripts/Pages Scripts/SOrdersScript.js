


//creates an object 'today' with dodays date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;

var products = new Array();

//calculates the days between today and due date than decides its index for the prediction
function daysDiff(dateF, dateU) {
    var Difference_In_Time = dateU.getTime() - dateF.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    if (Difference_In_Days < 7) {
        return 1;
    } else if (Difference_In_Days < 14) {
        return 2;
    } else if (Difference_In_Days < 21) {
        return 3;
    } else return 4;
}


//converts lenght of a product into an index for the prediction
function lengthToIndex(len) {
    if (len < 15) {
        return 1;
    } else if (len < 19) {
        return 2;
    } else return 3;
}

//retrieving only date without the time
function getdateonly(date) {
    return ('' + new Date(date).getFullYear() + '-' + String(new Date(date).getMonth() + 1).padStart(2, '0') + '-' + new Date(date).getDate());

}



var Orders = new Array();

$(document).ready(function () {
    ajaxCall("GET", "../api/Order", "", succGet, errorGet)

});


//pushes to the datatable the invitations as well as its prediction (calling the decision tree from within the predict.js file) using the indexes created
function succGet(data) {

    console.log(data);
    for (o in data) {

        Orders.push([data[o]["Description"], data[o]["Makat"], data[o]["CustomerName"], data[o]["CustomerId"], data[o]["Length"], '' + getdateonly(data[o]["DueDate"]), predictIsOnTime(4, daysDiff(new Date(today), new Date(data[o]["DueDate"])), lengthToIndex(data[o]["Length"]), hollidaysInMonths[0][new Date(today).getMonth() + 1], 3)]);
    }
    $('#orders').DataTable({
        data: Orders,
        columns: [
            { title: "שם מוצר" },
            { title: 'מק"ט' },
            { title: "שם לקוח" },
            { title: "מס' לקוח" },
            { title: "אורך" },
            { title: "ת.אספקה" },
            { title: "מוכן בזמן" }

        ]
    });
}

function errorGet(err) {
    console.log(err);
}