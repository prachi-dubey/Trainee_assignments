var subject =  localStorage.getItem('subject') || 'Java';
console.log(subject);
var pageNumber;
var sidenavbar = new Sidenav();
var booksTile = new Book();
var appData = new App();

function App() {
   this.setSubName = function (subName) {
    booksTile.getSubDetails(subName, pageNumber);
    subject = subName;
    pageNumber = 1;
  };

  this.getScreenInfo = function(hideSideBar) {
    var screenWidth = $(window).width();
    if(screenWidth < 780) {
      $('#humburger').removeClass('hide');
      $('#sidebar').addClass('hide');
    } else {
      $('#humburger').addClass('hide');
      $('#sidebar').removeClass('hide');
    }

    if(hideSideBar) {
      $('#sidebar').removeClass('show');
    }
  }
}

$(document).ready(function() {
  appData.getScreenInfo();

  sidenavbar.prepareNavData(subject);
  pageNumber = 1;
  booksTile.getSubDetails(subject , pageNumber);
  checkScroll();
});


function checkScroll() {
  $(window).scroll(function (event) {
    var scrollValue = $(window).height() + $(window).scrollTop();
    if(($(window).height() + $(window).scrollTop()) >= ($(document).height())) {
      pageNumber += 1;
      booksTile.getSubDetails(subject , pageNumber);
     }
  });
}

$(window).resize(function() {
  appData.getScreenInfo();
});

function showSideBar() {
  $('#sidebar').addClass('show');
}
