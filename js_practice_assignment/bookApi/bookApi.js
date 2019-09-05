$(window).resize(function() {
  getScreenInfo();
});

$(document).ready(function() {
  getSubDetails();
  $('#sidebar li').on( "click", getSubName);
});

function showSidebar() {
   $('#sidebar').removeClass('hidden');
}

function getSubName() {
  $('#sidebar li').removeClass('highlight');
  $(this).addClass('highlight');
  var subject = null;
  subject = $(this).data('book');
  // console.log(subject);
  getSubDetails(subject);
}

function getSubDetails(subject) {
  // console.log(subject);
  if(subject) {
    $('#books-wrapper').empty();
  }
  $('#loading-status').removeClass('hidden');
  if(!subject) {
    subject = 'java';
  }
  var url = 'https://api.itbook.store/1.0/search/' + subject;
  console.log(url);
  $.get(url, function(data, status) {
    // console.log("data: ");
    // console.log(data);
    // console.log("Status: " + status);
    booksContainer(data);
  });
}

function booksContainer(data) {
  var template = $('#book-template').html();
  var formatData = parseData(data);
  var output = Mustache.render(template, formatData);
  $('#loading-status').addClass('hidden');
  $('#books-wrapper').html(output);
  getScreenInfo();
}

function getScreenInfo() {
  var screenWidth = $(window).width();
  if(screenWidth < 780) {
    $('#humburger').toggleClass('hidden');
    $('#sidebar').toggleClass('hidden');
  }
}

function shortData(text, size) {
    var len = text.length;
    if (len >= size) {
        text = text.substring(0, size) + "...";
    }
    return text;
};

function parseData(data) {
//   console.log(data);
  var books  = data.books;
  for(var i = 0; i < books.length; i++ ) {
    var title = books[i].title;
    books[i].title = shortData(title, 25);
    var subtitle = books[i].subtitle;
    books[i].subtitle = shortData(subtitle, 47);
  }
  console.log(data);
  return data;
}

// function imgLoad(image) {
//     // image.imgload = "";
//     image.src = "download.png";
//     return true;
// }

function init() {
 var imgDefer = $('img');
 console.log(imgDefer);
  var test = $(imgDefer[i]).attr('data-src');
  for (var i=0; i<imgDefer.length; i++) {
    console.log("differ");
    console.log(test);
    if(test) {
    $(imgDefer[i]).attr('src',test);
    }
  }
}

window.onload = init;
// document.onload = init;
