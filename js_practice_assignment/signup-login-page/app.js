$(document).ready(function() {
  checkSession();
});

function changeRoute(pageName) {
  var loginStr = 'login';
  var signupStr = 'signup';
  if(pageName == loginStr ) {
    var login = new Login();
    login.prepareLoginData();
    history.pushState({ page: 1}, loginStr , "#/login");
    var logout = new AuthHelper();
    logout.logoutUser();
  } else if(pageName == signupStr) {
    $('#signup').tab('show');
    var signupData = new Signup();
    signupData.prepareSignupData();
    history.pushState({ page: 1}, signupStr , "#/signup");
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
  history.pushState({ page: 1}, "login", "#/login");
}

window.onpopstate = function(event) {
  // alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
};

function AuthHelper() {
  var personDetailStr = 'personDetails';

  this.logoutUser = function() {
    var storedDetail = JSON.parse(localStorage.getItem(personDetailStr));
     for (var i = 0; i < storedDetail.length; i++) {
       if(storedDetail[i].isloggedIn) {
         storedDetail[i].isloggedIn = false;
         break;
       }
     }
    localStorage.setItem(personDetailStr, JSON.stringify(storedDetail));
  }

  this.getLoginDetails = function() {
    var storedDetail = JSON.parse(localStorage.getItem(personDetailStr));
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
    localStorage.setItem(personDetailStr, JSON.stringify(storedDetail));
  }

  this.getData = function() {
    var dataCheck = JSON.parse(localStorage.getItem(personDetailStr));
    return dataCheck;
  }

  this.setFollowersCount = function() {
    var storedDetail = JSON.parse(localStorage.getItem(personDetailStr));
     for (var i = 0; i < storedDetail.length; i++) {
       if(storedDetail[i].isloggedIn) {
         storedDetail[i].followingCounts = (storedDetail[i].following).length;
         break;
       }
     }
    localStorage.setItem(personDetailStr, JSON.stringify(storedDetail));
  }
}
