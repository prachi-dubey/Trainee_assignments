var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var monthYear = null;
var storeEventData = {};
var selectedMonth = null;
var selectedYear = null;
var calendarWrapper = $("#week-wrap");

$(document).ready(function() {
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

function setMonthAndYear(selectedMonth, selectedYear) {
  var date = new Date();
  if(selectedMonth) {
     date.setMonth(selectedMonth);
   }
  if(selectedYear) {
     date.setFullYear(selectedYear);
   }
  monthYear = date;
  prepareCalendar(date);
}

function eventsOnDate(monthEvents, date, selMonth) {
  var events = [];
  for (var x = 0; x < monthEvents.length; x++) {
    var title = monthEvents ? monthEvents[x].title : null;
    var fdate = monthEvents ? monthEvents[x].fdate : null;
    var ldate = monthEvents ? monthEvents[x].ldate : null;

    var eventFdate = fdate.getDate();
    var eventFmonth = fdate.getMonth();

    var eventLdate = ldate.getDate();
    var eventLmonth = ldate.getMonth();
    if ((eventFmonth == eventLmonth) && (date >= eventFdate && date <= eventLdate)) {
      events.push(title);
    } else if((eventFmonth < eventLmonth) && (eventFmonth == selMonth)) {
      if(eventFdate <= date) {
        events.push(title);
      }
    }  // greater if
  }  //end of for
  return events;
}

function prepareCalendar(date) {
  var currentMonth = new Date().getMonth();                    //give month currently
  var currentYear = new Date().getFullYear();                    //give month currently
  var currentDate = new Date().getDate();

  var selDate = date.getDate();
  var selMonth = date.getMonth();
  var selYear = date.getFullYear();
  $("#curr-month").val(selMonth);
  $("#curr-year").val(selYear);

  var firstDate = new Date(selYear, selMonth, 1);     // month first date
  var lastDate = new Date(selYear, selMonth + 1, 0);  //month last date

  var monthFirstDay = firstDate.getDay();
  var monthLastDay = lastDate.getDay();
  var monthTotalDay = lastDate.getDate();

  var calendarView = "";

  for (var i = 0; i < 7 ; i++) {
    calendarView += "<div class='week-color block day'>" + weekday[i] +"</div>";   //adding weekdays blog
  }

  for (var i = 0; i < monthFirstDay; i++) {
    calendarView += "<div class='empty block'></div>";          //adding empty blog
  }

  var yearEvents =  storeEventData[selYear];             // check event
  var monthEvents = [];
  if(yearEvents) {
    monthEvents = yearEvents[selMonth];
  }

  for (var i = 1; i <= monthTotalDay; i++) {
    if(selYear < currentYear) {
      calendarView += "<div class='block day'>" + i  + "</div>";
    } else if (selYear == currentYear && selMonth < currentMonth) {
      calendarView += "<div class='block day'>" + i  + "</div>";
    } else if (selDate < i || selMonth > currentMonth || selYear > currentYear) {
      if(monthEvents && monthEvents.length ) {
        var events = eventsOnDate(monthEvents, i, selMonth);
        if (events.length) {
          calendarView += "<div class='block day event-line' data-toggle='tooltip' data-placement='auto' title='" + events.join(', ')  + "'>"
        } else {
          calendarView += "<div class='block day'>";
        }
      } else {
        calendarView += "<div class='block day'>";
      }
     calendarView += "<span class='addEvent glyphicon glyphicon-plus' data-date='" + i + "' data-toggle='modal'></span>"+ i  + "</div>";
   } else if (selDate == i && selMonth == currentMonth && selYear == currentYear) {
      if(monthEvents && monthEvents.length ) {
        var events = eventsOnDate(monthEvents, i, selMonth);
        if (events.length) {
          calendarView += "<div class='block day current-date event-line' data-toggle='tooltip' data-placement='auto' title='" + events.join(', ')  + "'>"
        } else {
          calendarView += "<div class='block current-date day'>";
        }
     }  else {
        calendarView += "<div class='block current-date day'>" ;      //foucs current date
      }
      calendarView += "<span class='addEvent glyphicon glyphicon-plus' data-date='" + i + "' data-toggle='modal'></span>"+ i  + "</div>";
    } else {
      calendarView += "<div class='block day'>" + i  + "</div>";     //adding date
    }
  }

  if (weekday != 6) {
      for (var i = monthLastDay; i < 6; i++) {
        calendarView += "<div class='empty block'></div>";              //adding empty blog
      }
  }

  calendarWrapper.append(calendarView);
  bindEvents();
}

function bindEvents() {
  $('.addEvent').on( "click", displayEventModal);

  $('[data-toggle="tooltip"]').tooltip({
    position: top
  });

  $('#open-modal').on('hidden.bs.modal', function() {
    $("#add-title").val("");
    $('#first-date').val("");
    $('#last-date').val("");
  });
}

function displayEventModal() {
  $('#open-modal').modal('show');
  var eventClickDate = null;
  // console.log(this);
  eventClickDate = $(this).data('date');                 //give data attribute
  console.log(eventClickDate);

  monthYear.setDate(eventClickDate);
  eventDefaltDate = (monthYear.getMonth()+ 1) + "/" + eventClickDate + "/" + monthYear.getFullYear();
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

  console.log(eventFirstDate);
  console.log(eventLastDate);

  var eventStartDate = new Date(startYear, startMonth, startdate);
  while ((eventStartDate < eventLastDate) || (eventStartDate.getMonth() == endMonth)) {
    var year = eventStartDate.getFullYear();
    var month = eventStartDate.getMonth();
    var eventText = {title: eventTitle, ldate: eventLastDate};
    if ((month <= endMonth) && (startMonth != endMonth) ) { //&& (startMonth != endMonth) && (startMonth != month)) && (monthYear.getMonth() != month)
      eventText['fdate'] = new Date(year, month, 1);
    } else {
      eventText['fdate'] = eventFirstDate;
    }
    if (!storeEventData[year]) {
      storeEventData[year] = {};
    }
    if (storeEventData[year][month]) {
      storeEventData[year][month].push(eventText);
    } else {
      storeEventData[year][month] = [eventText];
    }

    eventStartDate = new Date(eventStartDate.setMonth(eventStartDate.getMonth() + 1));
  }

   console.log(storeEventData);
   calendarWrapper.empty();
   setMonthAndYear(monthYear.getMonth(), monthYear.getFullYear());
}
