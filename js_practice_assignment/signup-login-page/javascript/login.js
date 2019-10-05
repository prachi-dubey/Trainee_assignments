function Login() {
  this.prepareLoginData = function() {
    var template = null;

    $.get("../template/login.html", function(template, Status) {
      var output = Mustache.render(template );
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
   var personDetail = {};
   var authHelper = new AuthHelper();
   var storedDetail = authHelper.getData();

   for (var i = 0; i < storedDetail.length; i++) {
     if ( (personData.email === storedDetail[i].email) && (personData.password === storedDetail[i].password)) {
        personDetail = storedDetail[i];
        storedDetail[i].isloggedIn = true;
       $('#login-error').text("");
     } else {
       $('#login-error').text("Please enter valid email and password");
     }
   }

   authHelper.setData(storedDetail);

   document.getElementById('login-app').reset();

   // var storedDetail =  authHelper.getData();
   // if(storedDetail) {
   //   for (var i = 0; i < storedDetail.length; i++) {
   //     if (storedDetail[i].isloggedIn) {
   //       var dashboardData = new Dashboard();
   //       dashboardData.prepareDashboard(storedDetail[i]);
   //       $('.logout').removeClass('hide');
   //       $('.logout img').attr("src", storedDetail[i].profileImg);
   //     }
   //   }
   // }
   var loginDetail =  authHelper.getLoginDetails();
   if(loginDetail) {
     var dashboardData = new Dashboard();
     dashboardData.prepareDashboard(loginDetail);
     $('.logout').removeClass('hide');
     $('.logout img').attr("src", loginDetail.profileImg);
   }
 }

}
