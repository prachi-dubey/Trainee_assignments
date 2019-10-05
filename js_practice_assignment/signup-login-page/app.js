$(document).ready(function() {
  checkSession();
});

function changeRoute(pageName) {
  if(pageName == 'login') {
    var login = new Login();
    login.prepareLoginData();
    history.pushState({ page: 1}, "login", "#login");
    var logout = new AuthHelper();
    logout.logoutUser();
  } else if(pageName == 'signup') {
    $('#signup').tab('show');
    var signupData = new Signup();
    signupData.prepareSignupData();
    history.pushState({ page: 1}, "signup", "#signup");
  }
}

function checkSession() {
  var authHelper = new AuthHelper();
  var loginDetail =  authHelper.getLoginDetails();
  if(loginDetail) {
    var dashboardData = new Dashboard();
    dashboardData.prepareDashboard(loginDetail);
    $('.logout').removeClass('hide');
    $('.logout img').attr("src", loginDetail.profileImg);
    return;
  }
  var login = new Login();
  login.prepareLoginData();
  history.pushState({ page: 1}, "login", "#login");
}

window.onpopstate = function(event) {
  // alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
};

function AuthHelper() {

  this.logoutUser = function() {
    var storedDetail = JSON.parse(localStorage.getItem('personDetails'));
     for (var i = 0; i < storedDetail.length; i++) {
       if(storedDetail[i].isloggedIn) {
         storedDetail[i].isloggedIn = false;
         break;
       }
     }
    localStorage.setItem('personDetails', JSON.stringify(storedDetail));
  }

  this.getLoginDetails = function() {
    var storedDetail = JSON.parse(localStorage.getItem('personDetails'));
    if (storedDetail) {
      for (var i = 0; i < storedDetail.length; i++) {
        if (storedDetail[i].isloggedIn) {
          return storedDetail[i];
        }
      }
    } else {
      return false;
    }
  }

  this.setData = function(storedDetail) {
    localStorage.setItem('personDetails', JSON.stringify(storedDetail));
    var test = JSON.parse(localStorage.getItem('personDetails'));
    console.log(test);
  }

  this.getData = function() {
    var dataCheck = JSON.parse(localStorage.getItem('personDetails'));
    return dataCheck;
  }
}
