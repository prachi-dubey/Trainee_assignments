function Sidenav() {
  this.prepareNavData = function() { //preparenavdata
    var template = null;
    $.get("template/side-nav.html", function(template, Status) {
      var output = Mustache.render(template );
      $('#sidebar').html(output);
    });
  };
}

var getSubject = function(subject) {
  $('#sidebar li').removeClass('highlight');
  $('.data a:contains('+subject+')').parent().addClass("highlight");
  var app = new App();
  app.setSubName(subject.toLowerCase());
};
