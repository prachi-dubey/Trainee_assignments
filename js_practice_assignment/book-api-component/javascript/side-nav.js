function sidenav() {
}

sidenav.prototype.getSideNav = function() {
  var template = null;
  $.get("template/side-nav.html", function(template, Status) {
    var output = Mustache.render(template );
    $('#sidebar').html(output);
  });
};

sidenav.prototype.getSubName = function(selTab) {
  $('#sidebar li').removeClass('highlight');
  console.log(selTab);
  selTab.addClass('highlight');
  var subject = null;
  subject = selTab.data('book');
  return subject;
}
