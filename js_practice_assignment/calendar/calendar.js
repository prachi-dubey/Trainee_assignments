var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var monthYear = null;
var storeEventData = {};
var calendarWrapper = $("#week-wrap");
var flag = 0;

$(document).ready(function() {
  var selectedMonth = null;
  var selectedYear = null;

  setMonthAndYear();

  $("select.sel-month").change(function() {
      selectedMonth = $(this).children("option:selected").val();
      calendarWrapper.empty();
      setMonthAndYear(selectedMonth, selectedYear);
  });

  $("select.sel-year").change(function() {
      selectedYear = $(this).children("option:selected").val();
      calendarWrapper.empty();
      setMonthAndYear(selectedMonth, selectedYear);
  });


});

function setMonthAndYear(month, year) {
  var date = new Date();
  if(month) {
     date.setMonth(month);
   }
  if(year) {
     date.setFullYear(year);
   }
  monthYear = date;
  prepareCalendar(date);
}

function prepareCalendar(date) {
  var currentMonth = new Date().getMonth();                    //give month currently
  var currentYear = new Date().getFullYear();                    //give month currently
  var currentDate = new Date().getDate();

  var selLastDate = date.getDate();
  var selMonth = date.getMonth();
  var selYear = date.getFullYear();
  $("#curr-month").val(selMonth);
  $("#curr-year").val(selYear);

  var firstDate = new Date(selYear, selMonth, 1);     // month first date
  var lastDate = new Date(selYear, selMonth + 1, 0);  //month last date

  var monthFirstDay = firstDate.getDay();
  var monthLastDay = lastDate.getDay();
  var monthTotalDay = lastDate.getDate();

  var calView = "";

  for (var i = 0; i < 7 ; i++) {
    calView += "<div class='week-color block day'>" + weekday[i] +"</div>";              //adding weekdays blog
  }

  for (var i = 0; i < monthFirstDay; i++) {
    calView += "<div class='empty block'></div>";                                       //adding empty blog
  }

  var yearEvents =  storeEventData[selYear];                                           // check event
  if(yearEvents) {
    var monthEvents = [];
    monthEvents = yearEvents[selMonth];
    var eventInMonth = monthEvents ? monthEvents.length : null;
  }

  for (var i = 1; i <= monthTotalDay; i++) {
    if(selYear < currentYear) {
      calView += "<div class='block day'>" + i  + "</div>";
    } else if (selYear == currentYear && selMonth < currentMonth) {
      calView += "<div class='block day'>" + i  + "</div>";
    } else if (selLastDate < i || selMonth > currentMonth || selYear > currentYear) {

      if(monthEvents) {
        for(var x = 0; x < eventInMonth; x++) {
        var title = monthEvents ? monthEvents[x].title : null;
        var fdate = monthEvents ? monthEvents[x].fdate : null;
        var ldate = monthEvents ? monthEvents[x].ldate : null;
        // console.log(fdate);
        var eventFdate = fdate.getDate();  // console.log("event first date " + eventFdate);
        var eventFmonth = fdate.getMonth(); // console.log("event first month " + eventFmonth);

        var eventLdate = ldate.getDate();   //console.log("event last date " + eventLdate);
        var eventLmonth = ldate.getMonth();  //console.log("event last month " + eventLmonth);

           if ( eventFmonth == eventLmonth ) {
             if (i >= eventFdate && i <= eventLdate )  {
              calView += "<div class='block day event-line' data-toggle='tooltip' data-placement='auto' title='" + title  + "'>" ;
            } else {
              console.log("run 1");
              calView += "<div class='block day'>";
            }
          } else if( eventFmonth < eventLmonth) {
                if(eventFmonth == selMonth) {
                  if( eventLdate < i && eventFdate <= i ) { flag = 1;
                    calView += "<div class='block day event-line' data-toggle='tooltip' data-placement='auto' title='" + title  + "'>" ;
                  }  else {
                    console.log("run 2");
                    calView += "<div class='block day'>";
                  }
                }
            }  // greater if

        }  //end of for
     } else {
       calView += "<div class='block day'>";
     }
      calView += "<span class='addEvent glyphicon glyphicon-plus' data-date='" + i + "' data-toggle='modal'></span>"+ i  + "</div>";
    } else if (selLastDate == i && selMonth == currentMonth && selYear == currentYear) {
      for(var x = 0; x < eventInMonth; x++) {
         var title = monthEvents ? monthEvents[x].title : null;
         var fdate = monthEvents ? monthEvents[x].fdate : null;
         var ldate = monthEvents ? monthEvents[x].ldate : null;
       }
        if(i == fdate) {
          calView += "<div class='current-date event-line' data-toggle='tooltip' data-placement='auto' title='" + title  + "'>" ;
        } else {
          calView += "<div class='block current-date day'>" ;      //foucs current date
         }
      calView += "<span class='addEvent glyphicon glyphicon-plus' data-date='" + i + "' data-toggle='modal'></span>"+ i  + "</div>";
    } else {
      calView += "<div class='block day'>" + i  + "</div>";     //adding date
    }
  }

  if(weekday != 6) {
      for(var i = monthLastDay; i < 6; i++) {
        calView += "<div class='empty block'></div>";              //adding empty blog
      }
  }

  calendarWrapper.append(calView);
  bindEvents();

  if( flag == 1) {
    // var tmp = fdate.getDate();          console.log("fdate " + tmp);
    var tmpMonth = fdate.getMonth();    console.log("fmonth " + tmpMonth);
    var tmpYear = fdate.getFullYear();  console.log("fyear " + tmpYear);
    var newEventFdate = new Date(tmpYear, tmpMonth+1, 1);  console.log(newEventFdate);
    yearEvents[eventLmonth] = [{ title: title, fdate: newEventFdate, ldate: ldate }];
    console.log("test me also");
    flag = 0;
  }

}

function bindEvents() {
  $('.addEvent').on('click', function() {
    displayEventModal($(this));
  });

  $('[data-toggle="tooltip"]').tooltip({
    position: top
  });

  $('#open-modal').on('hidden.bs.modal', function() {
    $("#add-title").val("");
    $('#first-date').val("");
    $('#last-date').val("");
  });

}

var addEventDate = null;
function displayEventModal($this) {
  $('#open-modal').modal('show');
  addEventDate = $this.data('date');                 //give data attribute

  monthYear.setDate(addEventDate);
  eventDefaltDate = (monthYear.getMonth()+ 1) + "/" + addEventDate + "/" + monthYear.getFullYear();
  $('#first-date').val(eventDefaltDate);

  $('.input-group-addon').on('click', function() {
    $(this).siblings('.showDatepicker').datepicker("show");
  });

  $('#first-date, #last-date').datepicker({
   minDate: new Date()
  });

  $('#first-date').on('change', function() {
    var minDateEvent = $(this).datepicker('getDate');
    $("#last-date").datepicker( "option", "minDate", minDateEvent );
  });
  $("#last-date").datepicker( "option", "minDate", eventDefaltDate );


}

function storeEvent() {
  var eventTitle = $("#add-title").val();
   if(!eventTitle) {
     $("#error-msg").text("plz add event title !");
     return false;
   } else {
      $("#error-msg").text("");
   }

  var eventLastDate = $('#last-date').val();
  if (!eventLastDate) {
    $("#error-msg").text("plz fill date !");
    return false;
  }

  var eventFirstDate = $('#first-date').datepicker('getDate');
  eventLastDate = $('#last-date').datepicker('getDate');

  if(eventFirstDate > eventLastDate) {
    $("#error-msg").text("plz fill valid Date !");
    return false;
  }

  $("#open-modal").modal('hide');

  setEvent(eventTitle, eventFirstDate, eventLastDate);
}

function setEvent(eventTitle, eventFirstDate, eventLastDate) {

  var startdate = eventFirstDate.getDate();      //date
  var startMonth = eventFirstDate.getMonth();
  var startYear = eventFirstDate.getFullYear();

  var endDate = eventLastDate.getDate();      //date
  var endMonth = eventLastDate.getMonth();
  var endYear = eventLastDate.getFullYear();
  // var eventText = { title: eventTitle, fdate: startdate, ldate: endDate };

  var eventText = { title: eventTitle, fdate: eventFirstDate, ldate: eventLastDate }

  if(storeEventData[startYear]) {
    if(storeEventData[startYear][startMonth]) {
      storeEventData[startYear][startMonth].push(eventText);
    } else {
      storeEventData[startYear][startMonth] = [eventText];
    }
  } else {
    storeEventData[startYear] = {
      [startMonth]: [eventText]
    }
  }

  console.log(addEventDate);

  calendarWrapper.empty();
  setMonthAndYear(startMonth, startYear)
  console.log(storeEventData);
}
