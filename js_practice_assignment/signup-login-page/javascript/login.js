function Login() {
  this.prepareLoginData = function() {
    $.get("../template/login.html", function(template, status) {
      var output = Mustache.render(template);
      $('#wrapper').html(output);
      $('.logout').addClass('hide');
      $("form[name='login']").validate({
          onfocusout: function(element) {
            this.element(element);
          },
          submitHandler: onLoginSubmit
       });
    });
  }

  function onLoginSubmit(form) {
   event.preventDefault();
   var inputs = $("form[name='login'] :input");
   var personData = {};
   inputs.each(function() {
     personData[this.name] = $(this).val();
   });
   var authHelper = new AuthHelper();
   var storedDetail = authHelper.getData();

   for (var i = 0; i < storedDetail.length; i++) {
     if ( (personData.email === storedDetail[i].email) && (personData.password === storedDetail[i].password)) {
        storedDetail[i].isloggedIn = true;
        storedDetail[i].name = storedDetail[i].name.charAt(0).toUpperCase() + storedDetail[i].name.substr(1);
        storedDetail[i].gender = storedDetail[i].gender.charAt(0).toUpperCase() + storedDetail[i].gender.substr(1);
       $('#login-error').text("");
     } else {
       $('#login-error').text("Please enter valid email and password");
     }
   }
   authHelper.setData(storedDetail);
   document.getElementById('login-app').reset();

   var loginDetail =  authHelper.getLoginDetails();
   if(loginDetail) {
     var dashboardData = new Dashboard();
     dashboardData.prepareDashboard(loginDetail);
     $('.logout').removeClass('hide');
     $('.logout img').attr("src", loginDetail.profileImg);
   }
 }
}
