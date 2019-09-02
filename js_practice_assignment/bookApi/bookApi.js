$(document).ready(function(){

    $.get('https://api.itbook.store/1.0/search/java', function(data, status) {
      console.log("data: ");
      console.log(data);
      console.log("Status: " + status);
      getBookData(data);
    });
});

function getBookData(data) {
  console.log("i am in function data: ");
  // console.log(data);
  var bookArray = data.books;
  console.log(bookArray);
  console.log(bookArray.length);
  var title = "";
  var img = "";
  var subtitle = "";
  var bookHtml = "";
  for(var i = 0; i < 8; i++) {
    title = bookArray[i].title;  // console.log(title);
    img = bookArray[i].image;  //console.log(img);
    subtitle = bookArray[i].subtitle;// console.log(subtitle);

    bookHtml += "<div class='thumbnail'>";
    bookHtml += "<img src="+ img +" alt="+ title +">"
    bookHtml += "<div class='caption'> <h3>"+ title +"</h3>";
    bookHtml += "<p>"+ subtitle +"</p>";
    bookHtml += "<p><a href='#' class='btn btn-primary' role='button'>More details</a> </p>";
    bookHtml += "</div>";
    bookHtml += "</div>";

    console.log(bookHtml);
  }
  $("#book-wrapper").append(bookHtml);
}
