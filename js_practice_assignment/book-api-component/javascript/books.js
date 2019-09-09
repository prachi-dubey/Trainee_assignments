var bookData = {};

function book() {
};

book.prototype.getSubDetails = function(subject) {
  if(subject) {
    $('#books-wrapper').empty();
  }
  $('#loading-status').removeClass('hidden');
  var url = 'https://api.itbook.store/1.0/search/' + subject;
  $.get(url, function(data, status) {
    bookData = data;
    booksContainer();
  });
}

function booksContainer() {
  var bookTemplate = null;
  $.get("template/books.html", function(templateData, Status) {
    bookTemplate = $(templateData).filter('#book-template').html();
    // console.log(bookTemplate);
    var formatData = parseData(bookData);
    var output = Mustache.render(bookTemplate, formatData);
    $('#loading-status').addClass('hidden');
    $('#books-wrapper').html(output);
    bindEvents();
  });
}


function bindEvents() {
  $('button').on( "click", bookDetail);
}

function parseData(data) {
  var bookDetail = data;
  var books  = data.books;
  for(var i = 0; i < books.length; i++ ) {
    var title = books[i].title;
    books[i].shortTitle = shortData(title, 25);
    var subtitle = books[i].subtitle;
    books[i].shortSubtitle = shortData(subtitle, 47);
  }
  return bookDetail;
}

function shortData(text, size) {
  var len = text.length;
  if (len >= size) {
    text = text.substring(0, size) + "...";
  }
  return text;
}

function bookDetail() {
  $('#open-modal').modal('show');
  var bookIsbn = null;
  bookIsbn = $(this).data('detail');
  showDetails(bookIsbn);
}

function showDetails(bookIsbn) {
  console.log(bookData);
  var books  = bookData.books;
  for(i = 0; i < books.length; i++) {
    if(books[i].isbn13 == bookIsbn) {
      $('#book-img').attr("src",books[i].image);
      $('#book-name').text(books[i].title);
      $('#book-detail').text(books[i].subtitle);
      $('#book-price').text(books[i].price);
      $('#book-url').text(books[i].url);
      var stars = $('#stars').html();
      $('#modal-star').html(stars);
      break;
    }
  }
}
