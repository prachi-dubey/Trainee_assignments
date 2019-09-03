$(document).ready(function() {
  console.log("Your screen resolution is: " );
  console.log(screen.width);
  getScreenInfo(screen.width);

  getBookDetail();
  $('li').on('click', getSubName);
});

function getSubName() {
  $('.side-nav-left li').removeClass('highlight');

  var clickSub = null;
  clickSub = $(this).data('book');
  console.log(clickSub);
  $(this).addClass('highlight');

  if(screen.width < 780){
    $('#sidebar').addClass('hidden');
  }
  getBookDetail(clickSub)
}

function getBookDetail(clickSub) {
  // console.log(clickSub);
  if(clickSub) {
    $('#books-wrapper').empty();
  }
  $('#loading-status').removeClass('hidden');
  var test = clickSub ? clickSub : 'java';
  var tmp = 'https://api.itbook.store/1.0/search/'+ test +''; console.log(tmp);
  $.get('https://api.itbook.store/1.0/search/'+ test +'', function(data, status) {
  console.log("data: ");
  console.log(data);
  // console.log("Status: " + status);
  booksContainer(data);
  });
}

function booksContainer(data) {
  var template = $('#book-api').html();
  var output = Mustache.render(template, data);
  $('#loading-status').addClass('hidden');
  $('#books-wrapper').html(output);
}

function showSidebar() {
   $('#sidebar').removeClass('hidden');
}

function getScreenInfo(screenWidth) {
  if(screenWidth < 780) {                 //console.log("i am small device");
    $('#humburger').removeClass('hidden');
    $('#sidebar').addClass('hidden');
  } else {                               //console.log("i am big device");
    $('#humburger').addClass('hidden');
    $('#sidebar').removeClass('hidden');
  }
}
