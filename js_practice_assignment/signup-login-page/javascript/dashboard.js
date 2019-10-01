var loginData = null;

function Dashboard() {
  this.prepareDashboard = function(personDetail) {
    loginData = personDetail;
    $.get("../template/dashboard.html", function(templateHome, Status) {
     checkFormate(personDetail);
      $('.logout').removeClass('hide');
      var logoutLogo = $(templateHome).filter('#logout-logo').html();
      var output = Mustache.render(logoutLogo, personDetail );
      $('#logout').html(output);

      var basicTemplate = $(templateHome).filter('#dashboard-data').html();
      var outputDashboard = Mustache.render(basicTemplate, personDetail );
      $('#wrapper').html(outputDashboard);

      history.pushState({ page: 1}, "dashboard", "#dashboard");

      var homeData = new Home();
      homeData.prepareHome(personDetail);
    });
  }
}

function checkFormate(personDetail) {
  personDetail.name = personDetail.name.charAt(0).toUpperCase() + personDetail.name.substr(1);
  personDetail.gender = personDetail.gender.charAt(0).toUpperCase() + personDetail.gender.substr(1);
  // console.log(personDetail.name);
}

function profileTab() {
  var profileData = new Profile();
  profileData.prepareProfile(loginData);
}

function home() {
  var homeData = new Home();
  homeData.prepareHome(loginData);
}

function switchToTab(event, tabName) {
  console.log(event);
  $('#tabs li').removeClass('active');
  $(event).addClass('active')

  switch (tabName) {
    case 'home':
          home();
          break;
    case 'profile':
          profileTab();
          break;
      default: console.log('abcd ');
               break;
  }


    // $('.tab-content.active').removeClass('active');
    // $('.tab-content[data-tab-content='+tab+']').addClass('active');
}
