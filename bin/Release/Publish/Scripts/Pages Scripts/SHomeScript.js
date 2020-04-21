//SHOME_SCRIPT


//retrieving today's date into 'today'

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;


var products = new Array();



var Orders = new Array();

$(document).ready(function () {

    ajaxCall("GET", "../api/Order", "", succGet, errorGet)

});

//adding hours to Date object
Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}



//when data received from database its been pushed into the calendar as an array divided to 'title','start','end' and description

function succGet(data) {

    console.log(data);
    for (o in data) {
        var descriptions = 'פרטי הזמנה: \n שם מוצר: ' + data[o]["Description"] + ', \n' + 'מק"ט: ' + data[o]["Makat"] + ', \n' + 'שם לקוח: ' + data[o]["CustomerName"] + ', \n' + 'מספר לקוח: ' + data[o]["CustomerId"] + ', \n' + 'אורך: ' + data[o]["Length"] + ' מטר , \n' + 'תאריך אספקה: ' + data[o]["DueDate"] + '.';
        Orders.push({ title: data[o]["Description"], start: new Date(data[o]["ProdDate"]), end: new Date(data[o]["ProdDate"]).addHours(data[o]["ReqProcessTime"]), description: descriptions });

    }

    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['interaction', 'dayGrid', 'timeGrid', 'list'],
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },




        defaultDate: today,



        navLinks: true, 

        weekNumbers: true,
        weekNumbersWithinDays: true,
        weekNumberCalculation: 'ISO',

        editable: true,
        eventLimit: true, 

        eventRender: function (info) {
            $(info.el).tooltip({ title: info.event.extendedProps.description });
        },
        events: Orders

    });

    calendar.render();
}

function errorGet(err) {
    console.log(err);
}







document.addEventListener('DOMContentLoaded', function () {

});