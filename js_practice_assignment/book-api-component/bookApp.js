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

  $('#modal-star span').on('click', getRating);

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

function getRating() {
    var onStar = $(this).data('value');
    var test = $(this).parent().children();
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
