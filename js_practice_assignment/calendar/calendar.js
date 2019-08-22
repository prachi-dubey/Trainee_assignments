var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//2015 2025

setMonthAndYear();

$("select.sel-month").change(function() {
    var selectedMonth = $(this).children("option:selected").val();
    $("#week-wrap").empty();
    setMonthAndYear(selectedMonth);
});

function setMonthAndYear(month) {
  var d = new Date();
  if(month) {
     d.setMonth(month);
   }
  prepareCalendar(d);
}

function prepareCalendar (date) {
  var checkMonth = new Date().getMonth();                    //give month currently

  var currentDate = date.getDate();
  var currentMonth = date.getMonth();
  var currentYear = date.getFullYear();
  $("#curr-month").val(currentMonth);

  var firstDate = new Date(currentYear, currentMonth, 1);     // month first date
  var lastDate = new Date(currentYear, currentMonth + 1, 0);  //month last date

  var firstDay = firstDate.getDay();
  var lastDay = lastDate.getDay();
  var totalDate = lastDate.getDate();

  var liHtml = "";
  for(var i = 0; i < 7 ; i++) {
    liHtml += "<div class='week-color block day'>" + weekday[i] +"</div>";              //adding weekdays blog
  }

  for(var i = 0; i < firstDay; i++) {
    liHtml += "<div class='empty block'></div>";              //adding empty blog
  }

  for(var i = 1; i <= totalDate; i++) {
    if(currentDate == i && currentMonth == checkMonth) {                                  //foucs current date
      liHtml += "<div class='block current-date day'>" + i  + "</div>";       //adding date
    } else {
      liHtml += "<div class='block day'>" + i  + "</div>";       //adding date
    }
  }

  if(weekday != 6) {
      for(var i = lastDay; i < 6; i++) {
        liHtml += "<div class='empty block'></div>";              //adding empty blog
      }
  }
  $("#week-wrap").append(liHtml);
}
