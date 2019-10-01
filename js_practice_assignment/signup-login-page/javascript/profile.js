var dataDetail = null;

function Profile() {
  this.prepareProfile = function(personDetail) {
    console.log("profile tab");
    $.get("../template/profile.html", function(templateProfile, Status) {
      var output = Mustache.render(templateProfile, personDetail );
      history.pushState({ page: 1}, "profile", "#dashboard-profile");
      $('#tab-content').html(output);

      $.get("../template/profile-view.html", function(profileView, Status) {
        var basicTemplate = $(profileView).filter('#basic-view').html();
        var outputView = Mustache.render(basicTemplate, personDetail );
        dataDetail = personDetail;
        $('#profile-basic-view').html(outputView);

        var workTemplate = $(profileView).filter('#work-view').html();
        var outputView = Mustache.render(workTemplate, personDetail);
        $('#profile-work-view').html(outputView);
      });
    });
  }
}

function editBasicProfile() {
  $('.edit-info').hide();
  $('#profile-basic-view').hide();
  $.get("../template/profile-edit.html", function(profileEdit, Status) {
    basicTemplate = $(profileEdit).filter('#basic-edit').html();
    var outputEdit = Mustache.render(basicTemplate, dataDetail);
    $('#profile-basic-edit').html(outputEdit);

    $('#birth-date').datepicker();
    $('.input-group-addon').on('click', function() {
      $(this).siblings('.showDatepicker').datepicker("show");
    });

    // $('.save-basic').on( "click", function() {
    //   saveBasicProfile.call(this);;
    // });
 });
}

function saveBasicProfile() {
console.log("profile-basic");
  $("#profile-basic").validate({
    rules: {
      fullname: {
        required: true,
        lettersonly: true
      },
      mobile: {
        required:true,
        number: true,
        minlength:9,
        maxlength:10
      },
      gender: "required",
      maritalStatus : "required",
      datepicker: "required",
     },
    messages: {
      fullname: {
        required: "Please enter letters only",
        lettersonly: "Please enter full name"
      },
      mobile: {
        required: "Please provide a mobile number",
        number: "Please enter a valid number",
        minlength: "Required 10 characters long"
      },
      gender: "Please select one option",
      maritalStatus: "please select one field",
      datepicker: "please select your birthdate"
     },
    onfocusout: function(element) {
      this.element(element);
    },
    errorPlacement: function (error, element) {
      if ( element.is(":radio")) {
        error.insertAfter($(element).parents("div .gender"));
      } else {
        error.insertAfter( element );
      }
    },
    submitHandler: function (form) {
      $('#profile-basic').removeAttr('novalidate');
      console.log(event.target);
      event.preventDefault();
      var inputs = $('form :input');
        var values = {};
        inputs.each(function() {
          var skills = [];
          values[this.name] = $(this).val();
        });
        console.log("check values");
        console.log(values);
        var authHelper = new AuthHelper();
        var storedDetail = authHelper.getData();
        // var storedDetail = JSON.parse(localStorage.getItem('personDetail'));
        for (var i = 0; i < storedDetail.length; i++) {
          if(storedDetail[i].isloggedIn) {
            storedDetail[i].name = values.fullname;
            storedDetail[i].gender = values.gender;
            storedDetail[i].birthdate = values.datepicker;
            storedDetail[i].maritalstatus = values.maritalStatus;
            storedDetail[i].mobile = values.mobile;
          }
        }
      var authHelper = new AuthHelper();
      authHelper.setData(storedDetail);

      $('.edit-info').show();
      $('#profile-basic-view').show();
      var authHelper = new AuthHelper();
      var storedDetail = authHelper.getData();
      // var storedDetail = JSON.parse(localStorage.getItem('personDetail'));
      console.log(storedDetail);
      for (var i = 0; i < storedDetail.length; i++) {
        if(storedDetail[i].isloggedIn) {
          var profileData = new Profile();
          console.log(storedDetail[i]);
          profileData.prepareProfile(storedDetail[i]);
        }
      }
    }
  });
}

function editWorkProfile() {
  $('.edit-work').hide();
  $('#profile-work-view').hide();
  $.get("../template/profile-edit.html", function(profileEdit, Status) {
    basicTemplate = $(profileEdit).filter('#work-edit').html();
    var outputEdit = Mustache.render(basicTemplate, dataDetail);
    $('#profile-work-edit').html(outputEdit);

    // $('.save-work').on( "click", function() {
    //   saveWorkProfile.call(this);;
    // });
 });
  console.log("i am done");
}

function saveWorkProfile() {
console.log("profile-work");
  $("#profile-work").validate({
    rules: {
      profile: "required",
      "skills": {
        required: true,
        minlength: 1
      }
     },
    messages: {
      profile: "please select option",
      "skills": "Please select at least one checkbox"
     },
    onfocusout: function(element) {
      this.element(element);
    },
    errorPlacement: function (error, element) {
     if( element.is(":checkbox")) {
        error.insertAfter($(element).parents("div .skills"));
      } else {
        error.insertAfter( element );
      }
    },
    submitHandler: function (form) {
      $('#profile-work').removeAttr('novalidate');
      console.log(event.target);
      event.preventDefault();
      var inputs = $('form :input');
      var values = {};
      inputs.each(function() {
        var skills = [];
        if(this.name == 'skills') {
          $(":checkbox:checked").each(function(index) {
            skills[index] = $(this).val();
          });
          values['skills'] = skills;
        } else {
          values[this.name] = $(this).val();
        }
    });
    console.log(values);
    var authHelper = new AuthHelper();
    var storedDetail = authHelper.getData();
    // var storedDetail = JSON.parse(localStorage.getItem('personDetail'));
    for (var i = 0; i < storedDetail.length; i++) {
      if(storedDetail[i].isloggedIn) {
        storedDetail[i].profile = values.profile;
        storedDetail[i].skills = values.skills;
      }
    }
    var authHelper = new AuthHelper();
    authHelper.setData(storedDetail);

    $('.edit-work').show();
    $('#profile-work-view').show();
    var authHelper = new AuthHelper();
    var storedDetail = authHelper.getData();
    // var storedDetail = JSON.parse(localStorage.getItem('personDetail'));
    console.log(storedDetail);
    for (var i = 0; i < storedDetail.length; i++) {
      if(storedDetail[i].isloggedIn) {
        var profileData = new Profile();
        console.log(storedDetail[i]);
        profileData.prepareProfile(storedDetail[i]);
      }
    }
  }
});
}
