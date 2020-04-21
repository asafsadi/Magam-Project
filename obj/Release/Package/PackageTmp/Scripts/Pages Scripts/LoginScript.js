//LOG_IN SCRIPT

var Usersmap = new Map();


$(document).ready(function () {


    ajaxCall("GET", "../api/User", "", succGetU, errorGetU)

});





//creats a key-value map of users and passwords from database
function succGetU(data) {

    console.log(data);

    for (u in data) {
        Usersmap.set(data[u]["Email"], data[u]["Password"]);
    }
    console.log(Usersmap);


}

function errorGetU(err) {
    console.log(err);
}






//verifying all fields according to the users map and making sure fields are not empty.

function Verify_UP() {
    var msg = "אנא הכנס את הפרטים הבאים: "
    var uname = document.getElementById("Uname").value;
    var pass = document.getElementById("password").value;
    if (uname == "")
        msg = msg + "שם משתמש ";
    if (pass == "")
        msg = msg + "סיסמא ";
    if (uname != "" && pass != "") {
        if (Usersmap.get(uname) == pass) {
            window.location.href = 'SHome.html';
        }
        else (alert("משתמש או סיסמא שגויים"))




    }
    else alert(msg);
}





