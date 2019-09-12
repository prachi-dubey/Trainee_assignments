var subject = null;
var pageNumber;
var sidenavbar = new Sidenav();
var booksTile = new Book();


function App() {
   this.setSubName = function (subName) {
    subject = subName;
    pageNumber = 1;
    booksTile.getSubDetails(subName, pageNumber);
  };
}

$(document).ready(function() {
  sidenavbar.prepareNavData();
  pageNumber = 1;
  booksTile.getSubDetails(subject , pageNumber);
  checkScroll();
});


function checkScroll() {
  $(window).scroll(function (event) {
    var scrollValue = $(window).height() + $(window).scrollTop();
    console.log(scrollValue);
    console.log($(document).height());
    if(($(window).height() + $(window).scrollTop()) >= $(document).height()) {
      pageNumber += 1;
      booksTile.getSubDetails(subject , pageNumber);
      //var docHeight = $(document).height();
      //documentHeight =+ docHeight;
    //  console.log(scrollValue + '   ' + docHeight + '  ' + pageNumber + '  ' + documentHeight);
    }
  });
}
