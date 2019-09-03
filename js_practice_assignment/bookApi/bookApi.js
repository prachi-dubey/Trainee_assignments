$(document).ready(function(){
   getBookDetail()
   $('li').on('click', getSubName );
});

function getSubName() {
  $('.side-nav-left li').removeClass('highlight');

  var clickSub = null;
  clickSub = $(this).data('book');
  console.log(clickSub);
  $(this).addClass('highlight');
  getBookDetail(clickSub)
}

function getBookDetail(clickSub) {
  // console.log(clickSub);
  if(clickSub) {
    $('#books-wrapper').empty();
  }
  $('#loading').removeClass('hidden');
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
  $('#loading').addClass('hidden');
  $('#books-wrapper').html(output);
}

function myFunction() {
  var x = $("#myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
