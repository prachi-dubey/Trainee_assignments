var bookData = {};
var starvalue = null;

$(window).resize(function() {
  getScreenInfo();
});

$(document).ready(function() {
  getSubDetails();
  $('#sidebar li').on('click', getSubName);

  $('#stars span').on('click' , starRating);
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
    bookData = data;
    booksContainer(data);
  });
}

function booksContainer(data) {
  var template = $('#book-template').html();
  var formatData = parseData(data);
  var output = Mustache.render(template, formatData);
  $('#loading-status').addClass('hidden');
  $('#books-wrapper').html(output);
  console.log("data append");
  getScreenInfo();

  $('.btn').on( "click", bookDetail);
}

function parseData(data) {
  var bookDetail = data;
  var books  = data.books;
  console.log(books);
  for(var i = 0; i < books.length; i++ ) {
    var title = books[i].title;
    books[i].shortTitle = shortData(title, 25);
    var subtitle = books[i].subtitle;
    books[i].shortSubtitle = shortData(subtitle, 47);
  }
  // console.log(bookDetail);
  return bookDetail;
}

function shortData(text, size) {
    var len = text.length;
    if (len >= size) {
        text = text.substring(0, size) + "...";
    }
    return text;
};

function bookDetail() {
  $('#open-modal').modal('show');
  var bookIsbn = null;
  bookIsbn = $(this).data('detail');
  // console.log(bookIsbn);
  showDetails(bookIsbn);
}

function showDetails(bookIsbn) {
  console.log(bookData);
  var books  = bookData.books;
  for(i = 0; i < books.length; i++) {
    if(books[i].isbn13 == bookIsbn) {  //$('.thumbnail').find('img').attr("src");
      $('#book-img').attr("src",books[i].image);
      // console.log(tmp);
      $('#book-name').text(books[i].title);
      $('#book-detail').text(books[i].subtitle);
      $('#book-price').text(books[i].price);
      $('#book-url').text(books[i].url);
      break;
    }
  }
}

function starRating() {
    var onStar = $(this).data('value');
    // console.log(onStar);
    var test = $(this).parent().children();   console.log(test);
    if(starvalue > onStar) {
      $(test).removeClass('selected');
    }

    for (i = 0; i < onStar; i++) {
      $(test[i]).addClass('selected');
    }
    $('#star-text').text(onStar+'/5');
    starvalue = onStar;
    console.log(starvalue);
}
