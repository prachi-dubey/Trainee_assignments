var starValue = null;
var storeIsbn = null;

function Book() {
  this.getSubDetails = function(subject, pageNumber) {
    if(pageNumber == 1){
      $('.books').empty();
      $('.error').empty();
    }
    storeIsbn = null;
    $('#loading-status').removeClass('hidden');
    var url = 'https://api.itbook.store/1.0/search/' + subject + '/' + pageNumber ;
    $.get(url, function(data, status) {
      booksContainer(data, pageNumber);
    });
  };
};

function booksContainer(data, pageNumber) {
  if(data) {
    var bookTemplate = null;
    $.get("template/books.html", function(templateData, Status) {
      bookTemplate = $(templateData).filter('#book-template').html();
      var formatData = parseData(data);
      var output = Mustache.render(bookTemplate, formatData);
      $('#loading-status').addClass('hidden');
      if(pageNumber == 1) {
        $('.books').html(output);
      } else {
        $('.books').append(output);
      }
      $('.lazy').lazy({
        scrollDirection: 'vertical',
        // effectTime: 100,
        visibleOnly: true,
        onError: function(element) {
           console.log('error loading ' + element.data('src'));
       }
      });
    });
  } else {
     $('.error').text("No more results...");
  }
}

function parseData(data) {
  var books  = data.books;
  for(var i = 0; i < books.length; i++ ) {
    var title = books[i].title;
    books[i].shortTitle = shortData(title, 25);
    var subtitle = books[i].subtitle;
    books[i].shortSubtitle = shortData(subtitle, 47);
    books[i].star = 3;
    }
  return data;
}

function shortData(text, size) {
  var len = text.length;
  if (len >= size) {
    text = text.substring(0, size) + "...";
  }
  return text;
}

function getIsbn(bookIsbn) {
  console.log(bookIsbn);
  storeIsbn = bookIsbn;
  showDetails(bookIsbn);
}

function showDetails(bookIsbn) {
  var url = 'https://api.itbook.store/1.0/books/' + bookIsbn;
  $.get(url, function(data, status) {
    $.get("template/modal.html", function(modalTemplate, Status) {
      var output = Mustache.render(modalTemplate, data);
      $('#open-modal').html(output);
      $('#open-modal').modal('show');
      for(i = 0; i < 3 ; i++) {
        $("#modal-star span").eq(i).addClass('selected');
      }
      $('#modal-star span').on('mouseover', mouseOverRating).on('mouseout', mouseOutRating);
      $('#modal-star span').on('click', getRating);
    });
  });
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
}

function updateRating() {
  $('[data-detail='+ storeIsbn + ']').text(starValue);
}

function mouseOverRating(event) {
  var $cont = $(this);

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
