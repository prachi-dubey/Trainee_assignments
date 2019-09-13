function Sidenav() {
  this.prepareNavData = function(subject) { //preparenavdata
    var template = null;
    $.get("template/side-nav.html", function(template, Status) {
      var output = Mustache.render(template );
      $('#sidebar').html(output);
      $('.data a:contains('+ subject +')').parent().addClass("highlight");
    });
  }
}

var getSubject = function(subject) {
  localStorage.setItem('subject', subject);
  $('#sidebar li').removeClass('highlight');
  $('.data a:contains('+subject+')').parent().addClass("highlight");
  var app = new App();
  app.setSubName(subject.toLowerCase());
};
