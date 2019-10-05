function Dashboard() {

  this.prepareDashboard = function(personDetail) {
    var active = 'active';
    $.get("../template/dashboard.html", function(template, Status) {
      personDetail.name = personDetail.name.charAt(0).toUpperCase() + personDetail.name.substr(1);
      personDetail.gender = personDetail.gender.charAt(0).toUpperCase() + personDetail.gender.substr(1);

      var outputDashboard = Mustache.render(template, personDetail);
      $('#wrapper').html(outputDashboard);

      history.pushState({ page: 1}, "dashboard", "#dashboard");
      var homeData = new Home();
      homeData.prepareHome(personDetail);

      $('.show-tab-data').on('click', function() {
        var tabName = $(this).data('tab-content')
        $('#tabs li').removeClass(active);
        $(this).addClass(active);
        switch (tabName) {
          case 'home':
                homeData.prepareHome(personDetail);
                break;
          case 'profile':
                var profileData = new Profile();
                profileData.prepareProfile(personDetail);
                break;
          default:
                // homeData.prepareHome(personDetail);
                return;
                // break;
        }
      });
    });
  };
}
