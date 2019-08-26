var monthYear = null;
var currentDateLoc = null;
var storeEventData = {};

$(document).ready(function() {
  var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var selectedMonth = null;
  var selectedYear = null;

  setMonthAndYear();

  $("select.sel-month").change(function() {
      selectedMonth = $(this).children("option:selected").val();
      console.log("in month");
      $("#week-wrap").empty();
      setMonthAndYear(selectedMonth, selectedYear);
  });

  $("select.sel-year").change(function() {
      selectedYear = $(this).children("option:selected").val();
      $("#week-wrap").empty();
      setMonthAndYear(selectedMonth, selectedYear);
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
      calView += "<div class='empty block'></div>";              //adding empty blog
    }

    for (var i = 1; i <= monthTotalDay; i++) {
      if(selYear < currentYear) {
        calView += "<div class='block day'>" + i  + "</div>";
      } else if (selYear == currentYear && selMonth < currentMonth) {
        calView += "<div class='block day'>" + i  + "</div>";
      } else if (selLastDate < i || selMonth > currentMonth || selYear > currentYear) {
        calView += "<div class='block day' data-block-date='" + i +"'>" ;
        calView += "<span class='addEvent glyphicon glyphicon-plus' data-date='" + i + "' data-toggle='modal'></span>"+ i  + "</div>";
      } else if (selLastDate == i && selMonth == currentMonth && selYear == currentYear) {
        calView += "<div class='block current-date day' data-block-date='" + i +"'>" ;      //foucs current date
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

    $("#week-wrap").append(calView);
    bindEvents();
  }

});

function bindEvents() {
  $('.addEvent').on('click', function() {
    displayEventModal($(this));
  });

  $('#open-modal').on('hidden.bs.modal', function() {
    $("#add-title").val("");
    $('#first-date').val("");
    $('#last-date').val("");
  });
}

function displayEventModal($this) {
  $('#open-modal').modal();
  var date = $this.data('date');                 //give data attribute
  currentDateLoc = $this.parent().siblings();

  monthYear.setDate(date);
  eventDefaltDate = (monthYear.getMonth()+ 1) + "/" + date + "/" + monthYear.getFullYear();
  $('#first-date').val(eventDefaltDate);
  $('#first-date, #last-date').datepicker({
   minDate: new Date()
  });

  $('#first-date').on('change', function() {
    var minDateEvent = $(this).datepicker('getDate');
    $("#last-date").datepicker( "option", "minDate", minDateEvent );
  });
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
  var eventText = { title: eventTitle, fdate: startdate, ldate: endDate };

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
  console.log(storeEventData);
  
//   for(i = testArray[0]; i <= testArray[3]; i++) {
//     $(currentDateLoc).siblings('.block[data-block-date="'+ i +'"]').addClass('text-primary');
//   }

}
