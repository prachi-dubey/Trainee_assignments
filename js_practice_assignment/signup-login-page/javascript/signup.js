function Signup() {
  this.prepareSignupData = function() {
    var template = null;
    $.get("../template/signup.html", function(templateData, status) {
      var output = Mustache.render(templateData);
      $('#wrapper').html(output);
      $("#sign-app").validate({
        rules: {
          name: {
            required: true,
            lettersonly: true
          },
          email: {
            required: true,
            email: true
          },
          password: {
            required: true,
            minlength:6
          },
          profileImg: {
            required:true,
            extension: "png|jpg"
          },
          mobile: {
            required:true,
            number: true,
            minlength:9,
            maxlength:10
          },
          gender: {
            required:true,
          },
          profile: {
            required:true,
          },
          "skills": {
            required: true,
            minlength: 1
          }
        },
        messages: {
          name: {
            required: "Please enter letters only",
            lettersonly: "Please enter full name"
          },
          email: {
            required: "This field is required",
            email: "Please enter a valid email address"
          },
          password: {
            required: "This field is required",
            minlength: "Please enter atleast 6 character"
          },
          mobile: {
            required: "Please provide a mobile number",
            number: "Please enter a valid number",
            minlength: "Required 10 characters long"
          },
          profileImg: {
            extension: "Please enter valid url",
          },
          gender: "Please select one option",
          profile: "Please select an option from the list, if none are appropriate please select 'Other'",
          "skills": "Please select at least one checkbox",
        },
        onfocusout: function(element) {
          this.element(element);
        },
        errorPlacement: function (error, element) {
          if ( element.is(":radio")) {
            error.insertAfter($(element).parents("div .gender"));
          } else if( element.is(":checkbox")) {
            error.insertAfter($(element).parents("div .skills"));
          } else {
            error.insertAfter( element );
          }
        },
        submitHandler: onSignupSubmit
      });
    });
  }

  function onSignupSubmit (form) {
    event.preventDefault();
    var inputs = $("#sign-app :input");
    var singupData = {};
    inputs.each(function() {
      var skills = [];
      if(this.name == 'skills') {
        $(":checkbox:checked").each(function(index) {
        skills[index] = $(this).val();
       });
       singupData['skills'] = skills;
      } else if(this.name == 'gender') {
        var data = $('input:radio[name=gender]:checked').val();
        singupData[this.name] = data;
      } else {
        singupData[this.name] = $(this).val();
      }
    });
    singupData.follower = [];
    singupData.following = 0;
    
    console.log(singupData);
    var authHelper = new AuthHelper();
    var dataCheck = authHelper.getData();
    if(!dataCheck) {
      dataCheck = [];
    }
    dataCheck.push(singupData);
    authHelper.setData(dataCheck);

    document.getElementById('sign-app').reset();
    var loginData = new Login();
    loginData.prepareLoginData();
  }
}

$.validator.addMethod("lettersonly", function(value, element) {
  if (/^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/.test(value)) {
    return true;
  } else {
    return false;
  };
});
