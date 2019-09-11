var bookDetail = {};
var starValue = null;
var storeIsbn = null;

function Book() {
};

Book.prototype.getSubDetails = function(subject) {
  $('#books-wrapper').empty();
  storeIsbn = null;
  $('#loading-status').removeClass('hidden');
  var url = 'https://api.itbook.store/1.0/search/' + subject;
  $.get(url, function(data, status) {
    bookDetail = data;
    booksContainer(storeIsbn);
  });
};

function booksContainer(storeIsbn) {
  var bookTemplate = null;
  $.get("template/books.html", function(templateData, Status) {
    bookTemplate = $(templateData).filter('#book-template').html();
    var formatData = parseData(bookDetail);
    var output = Mustache.render(bookTemplate, formatData);
    $('#loading-status').addClass('hidden');
    $('#books-wrapper').html(output);
    bindEvents();
  });
}

function bindEvents() {
  $('button').on( "click", bookMoreDetail);
}

function parseData(bookDetail) {
  var books  = bookDetail.books;
  for(var i = 0; i < books.length; i++ ) {
    var title = books[i].title;
    books[i].shortTitle = shortData(title, 25);
    var subtitle = books[i].subtitle;
    books[i].shortSubtitle = shortData(subtitle, 47);
    if(!storeIsbn) {
      books[i].star = 3;
    }
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

function bookMoreDetail() {
  $('#open-modal').modal('show');
  var bookIsbn = $(this).data('detail');
  console.log(bookIsbn);
  showDetails(bookIsbn);
}

function showDetails(bookIsbn) {
  var books  = bookDetail.books;
  for(i = 0; i < books.length; i++) {
    if(books[i].isbn13 == bookIsbn) {
      storeIsbn = bookIsbn;
      var url = 'https://api.itbook.store/1.0/books/' + bookIsbn;
      $.get(url, function(data, status) {
        $('#book-img').attr("src",data.image);
        $('#book-name').text(data.title);
        $('#book-detail').text(data.desc);
        $('#book-price').text(data.price);
        $('#book-url').text(data.url);
        $("#modal-star span").removeClass('selected');
        for(i = 0; i < 3 ; i++) {
          $("#modal-star span").eq(i).addClass('selected');
        }
        $('#modal-star span').on('mouseover', mouseOverRating).on('mouseout', mouseOutRating);
        $('#modal-star span').on('click', getRating);
      });
    }
  }
}

function getRating(event) {
  $('#modal-star span').off('mouseout');
  $('#modal-star span').off('mouseover');
  var onStar = $(this).data('value');
  var test = $(this).parent().children();
  if(starValue > onStar) {
    $(test).removeClass('selected');
  }

  for (i = 0; i < onStar; i++) {
    $(test[i]).addClass('selected');
    if(starValue == 1 && onStar == 1) {
      $(test).removeClass('selected');
      onStar = 0;
      break;
    }
  }
  $('#star-modal').text(onStar+'/5');
  starValue = onStar;
  var books  = bookDetail.books;
  for(i = 0; i < books.length; i++) {
    if(books[i].isbn13 == storeIsbn) {
      books[i].star = starValue;
      break;
    }
  }
}

function updateRating() {
 $('#books-wrapper').empty();
 booksContainer(storeIsbn);
}

function mouseOverRating(event) {
  var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
  $(this).parent().children('#modal-star span').each(function(e) {
    if (e < onStar) {
      $(this).addClass('selected');
    } else {
      $(this).removeClass('selected');
    }
  });
}

function mouseOutRating() {
  $(this).parent().children('#modal-star span').each(function(e) {
  $(this).removeClass('selected');
 });
}
