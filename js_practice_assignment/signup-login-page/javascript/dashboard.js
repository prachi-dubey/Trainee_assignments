function Dashboard() {

  this.prepareDashboard = function(personDetail) {
    var active = 'active';
    var tabsName = ["Home", "Profile", "Friends", "Messages"];
    $.get("../template/dashboard.html", function(template, status) {
      personDetail.tabs = tabsName;
      var outputDashboard = Mustache.render(template, personDetail);
      $('#wrapper').html(outputDashboard);

      history.pushState({ page: 1}, "dashboard", "#/dashboard");
      $('.show-tab-data').first().addClass('active');
      var homeData = new Home();
      homeData.prepareHome();

      $('.show-tab-data').on('click', function() {
        var tabName = $(this).data('tab-content')
        $('#tabs li').removeClass(active);
        $(this).addClass(active);
        switch (tabName) {
          case 'Home':
                homeData.prepareHome();
                break;
          case 'Profile':
                var profileData = new Profile();
                profileData.prepareProfile(personDetail);
                break;
          case 'Friends':
                var friends = new Friends();
                friends.prepareFriends();
          default:
                // homeData.prepareHome(personDetail);
                return;
                // break;
        }
      });
    });
  };
}
