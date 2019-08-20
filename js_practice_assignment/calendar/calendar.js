var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var d = new Date();

var currentDate = d.getDate();
// console.log(currentDate);

var currentMonth = d.getMonth();
var currentYear = d.getFullYear();

var firstDate = new Date(currentYear, currentMonth, 1);     // month first date
var lastDate = new Date(currentYear, currentMonth + 1, 0);  //month last date
console.log(firstDate);
// console.log(lastDate);

var weekdayNum = firstDate.getDay();
// console.log(weekdayNum);                   //4
// console.log(weekday[weekdayNum]);         //thursday                     // firstdate day

var totalDate = lastDate.getDate();
// console.log(totalDate);                     //31

$("ul li").each(function(index, value) {
  var liHtml ;
  var htmlWeekDay = $(value).text();
  if( htmlWeekDay == weekday[weekdayNum]) {
    for(var i = 1; i < weekdayNum; i++) {
      liHtml = "<li class='empty-block'></li>";              //adding empty blog
      $("#set-date-style").append(liHtml);
    }
    for(var j = 1; j <= totalDate; j++) {
      if(currentDate == j) {                                   //foucs current date
        liHtml += "<li ' class='block current-date'>" + j  + "</li>";       //adding date
      } else {
        liHtml += "<li class='block'>" + j  + "</li>";       //adding date
      }
    }           //end of for
  $("#set-date-style").append(liHtml);
 }     //end of if
});   //end of each function
