$(document).ready(function () {

    $("#pForm").submit(f1);

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


//Creates a worker object from the elements values and adding the object to DB using POST request
function AddWorker() {
    Worker = {
        Name: $("#name").val(),
        Id: $("#id").val(),
        Level: ($("#level").val()),
        DateOfBirth: ($("#dateOfBirth").val()),
        StartWork: ($("#startWork").val()),
        Adress: $("#adress").val(),
        Phone: $("#phone").val(),

    }
    ajaxCall("POST", "../api/Worker", JSON.stringify(Worker), success, error);

}

// This function is called in case of a success
function success() {
    alert("עובד התווסף בהצלחה למערכת");
    window.location.reload();

}

// This function is called in case of an error
function error(err) {
    alert("error");
}

function f1() {
    AddWorker();
    return false;
}
