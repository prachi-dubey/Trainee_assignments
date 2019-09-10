var starvalue = null;

$(document).ready(function() {
  var sidenavbar = new sidenav();
  var booksTile = new book();

  sidenavbar.getSideNav();
  booksTile.getSubDetails('java');

  $('#sidebar').on('click', 'li', function() {
     var name = sidenavbar.getSubName($(this));
     booksTile.getSubDetails(name);
  });

  // $('#humburger').on('click', function() {
  //   $('#sidebar').toggleClass('hidden');
  // });

});

// function bindEvents() {
//   $(window).resize(function() {
//     console.log($(window).width());
//     var screenWidth = $(window).width();
//     if(screenWidth < 780) {
//       $('#humburger').toggleClass('hidden');
//       $('#sidebar').toggleClass('hidden');
//     }
//   });
// }
