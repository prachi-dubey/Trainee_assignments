var subject =  localStorage.getItem('subject') || 'Java';
console.log(subject);
var pageNumber;
var sidenavbar = new Sidenav();
var booksTile = new Book();

function App() {
   this.setSubName = function (subName) {
    booksTile.getSubDetails(subName, pageNumber);
    subject = subName;
    pageNumber = 1;
  };
}

$(document).ready(function() {
  sidenavbar.prepareNavData(subject);
  pageNumber = 1;
  booksTile.getSubDetails(subject , pageNumber);
  checkScroll();
});

function checkScroll() {
  $(window).scroll(function (event) {
    var scrollValue = $(window).height() + $(window).scrollTop();
    if(($(window).height() + $(window).scrollTop()) >= $(document).height()) {
      pageNumber += 1;
      booksTile.getSubDetails(subject , pageNumber);
     }
  });
}
