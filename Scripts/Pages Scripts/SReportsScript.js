
var today = new Date();
var day = String(today.getDate()).padStart(2, '0');
var month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var year = today.getFullYear();
today = year + '/' + month + '/' + day;
var products = new Array();





$(document).ready(function () {

    ajaxCall("GET", "../api/Order", "", succGet, errorGet)


});

function succGet(data) {
    bulidpiechart(data);
    buildbarchart(data);
}


function bulidpiechart(data) {

    console.log(data);
    let ordersByCompany = {};

    for (o in data) {
        array = data[o].DueDate.split('-');
        console.log(array[1]);
        if (array[1] == month) {
            if (Object.keys(ordersByCompany).includes(data[o].CustomerName)) {
                //ממלאים את המערך, מגדילים את כמות ההזמנות של החברה בעוד 1
                ordersByCompany[data[o].CustomerName] = ordersByCompany[data[o].CustomerName] + 1;
            }
            else {
                //במידה והחברה לא קיימת עדיין במערך- והיא מופיעה לראשונה
                ordersByCompany[data[o].CustomerName] = 1;
            }
        }
    }
    //תציג בתור גרף פאי את מה שיש במערך ההזמנות לאותו חודש
    google.charts.load('current', { 'packages': ['corechart'] });
    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(function () { drawChart(ordersByCompany, month) });

}

function drawChart(ordersByCompany, month) {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Company');
    data.addColumn('number', 'Orders');

    //כדי להפוך את האובייקט למערך שצריך לשלוח לגוגל
    let rowsArray = [];


    let companiesArray = Object.keys(ordersByCompany);
    for (var i = 0; i < companiesArray.length; i++) {
        rowsArray.push([companiesArray[i], ordersByCompany[companiesArray[i]]]);
    }

    data.addRows(rowsArray);

    // Set chart options
    var options = {
        'title': 'Orders by customer in ' + month + ' month:',
        'width': 400,
        'height': 300
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

function buildbarchart(data) {

    console.log(data);
    let ordersByProduct = {};

    for (o in data) {
        //console.log(data[o].DueDate);
        //array = data[o].DueDate.split('-');


        if (Object.keys(ordersByProduct).includes(data[o].Makat)) {
            //ממלאים את המערך, מגדילים את כמות ההזמנות של החברה בעוד 1
            ordersByProduct[data[o].Makat] = ordersByProduct[data[o].Makat] + 1;
        }
        else {
            //במידה והחברה לא קיימת עדיין במערך- והיא מופיעה לראשונה
            ordersByProduct[data[o].Makat] = 1;
        }

    }
    //תציג בתור גרף עמודות את מה שיש במערך ההזמנות לאותו חודש
    google.charts.load('current', { 'packages': ['corechart'] });
    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(function () { drawChartB(ordersByProduct) });

}

function errorGet(err) {
    console.log(err);
}


function drawChartB(ordersByProduct) {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Product');
    data.addColumn('number', 'Orders');

    //כדי להפוך את האובייקט למערך שצריך לשלוח לגוגל
    let rowsArray = [];


    let ProductsArray = Object.keys(ordersByProduct);
    for (var i = 0; i < ProductsArray.length; i++) {
        rowsArray.push([ProductsArray[i], ordersByProduct[ProductsArray[i]]]);
    }

    data.addRows(rowsArray);

    // Set chart options
    var options = {
        'title': 'Orders by products ',
        'width': 800,
        'height': 300
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.ColumnChart(document.getElementById('bar_div'));
    chart.draw(data, options);
}


