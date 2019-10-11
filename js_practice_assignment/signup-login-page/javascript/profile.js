function Profile() {

  this.prepareProfile = function(personDetail) {
    $.get("../template/profile.html", function(templateProfile, Status) {
      var output = Mustache.render(templateProfile, personDetail );
      history.pushState({ page: 1}, "profile", "#/dashboard-profile");
      $('#tab-content').html(output);

      $.get("../template/profile-view.html", function(profileView, Status) {
        var basicTemplate = $(profileView).filter('#basic-view').html();
        var outputBasic = Mustache.render(basicTemplate, personDetail );
        $('#profile-basic-view').html(outputBasic);

        var workTemplate = $(profileView).filter('#work-view').html();
        var outputWork = Mustache.render(workTemplate, personDetail);
        $('#profile-work-view').html(outputWork);
      });
    });
  }

  this.onBasicProfile = function (form) {
    $('#profile-basic').removeAttr('novalidate');
    event.preventDefault();
    var inputs = $('form :input');
    var basicData = {};
    var authHelper = new AuthHelper();
    inputs.each(function() {
      if(this.name == 'gender') {
        var data = $('input:radio[name=gender]:checked').val();
        basicData[this.name] = data;
      } else {
        basicData[this.name] = $(this).val();
      }
    });
    var storedDetail = authHelper.getData();
    for (var i = 0; i < storedDetail.length; i++) {
      if(storedDetail[i].isloggedIn) {
        storedDetail[i].name = basicData.fullname;
        $('.user-name').text(storedDetail[i].name);
        storedDetail[i].gender = basicData.gender;
        storedDetail[i].birthdate = basicData.datepicker;
        storedDetail[i].maritalstatus = basicData.maritalStatus;
        storedDetail[i].mobile = basicData.mobile;
      }
    }
    authHelper.setData(storedDetail);

    $('.edit-info').show();
    $('#profile-basic-view').show();
    var loginDetail =  authHelper.getLoginDetails();
    if(loginDetail) {
      var profileData = new Profile();
      profileData.prepareProfile(loginDetail);
    }
  }

  this.onWorkProfile =  function (form) {
    $('#profile-work').removeAttr('novalidate');
    event.preventDefault();
    var authHelper = new AuthHelper();
    var inputs = $('form :input');
    var workData = {};
    inputs.each(function() {
      var skills = [];
      if(this.name == 'skills') {
        $(":checkbox:checked").each(function(index) {
          skills[index] = $(this).val();
        });
        workData['skills'] = skills;
      } else {
        workData[this.name] = $(this).val();
      }
    });

    var storedDetail = authHelper.getData();
    for (var i = 0; i < storedDetail.length; i++) {
      if(storedDetail[i].isloggedIn) {
        storedDetail[i].profile = workData.profile;
        $('.user-profile').text(storedDetail[i].profile);
        storedDetail[i].skills = workData.skills;
      }
    }
    authHelper.setData(storedDetail);

    $('.edit-work').show();
    $('#profile-work-view').show();
    var loginDetail =  authHelper.getLoginDetails();
    if(loginDetail) {
      var profileData = new Profile();
      profileData.prepareProfile(loginDetail);
    }
  }
}

function editBasicProfile() {
  $('.edit-info').hide();
  $('#profile-basic-view').hide();
  $.get("../template/profile-edit.html", function(profileEdit, Status) {
    basicTemplate = $(profileEdit).filter('#basic-edit').html();
    var authHelper = new AuthHelper();
    var dataDetail =  authHelper.getLoginDetails();
    var outputEdit = Mustache.render(basicTemplate, dataDetail);
    $('#profile-basic-edit').html(outputEdit);
    $('input[name=gender][value='+ dataDetail.gender +' ]').prop("checked",true);
    $('#birth-date').datepicker();
    $('.input-group-addon').on('click', function() {
      $(this).siblings('.showDatepicker').datepicker("show");
    });
  });
}

function saveBasicProfile() {
 var profile = new Profile();
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
    submitHandler: profile.onBasicProfile
  });
}

function editWorkProfile() {
  $('.edit-work').hide();
  $('#profile-work-view').hide();
  $.get("../template/profile-edit.html", function(profileEdit, Status) {
    basicTemplate = $(profileEdit).filter('#work-edit').html();
    var authHelper = new AuthHelper();
    var dataDetail =  authHelper.getLoginDetails();
    var outputEdit = Mustache.render(basicTemplate, dataDetail);
    $('#profile-work-edit').html(outputEdit);
    $('select option[value='+ dataDetail.profile +']').attr('selected','selected');
    for(var i = 0; i < dataDetail.skills.length ; i++) {
      $('input[type=checkbox][value='+ dataDetail.skills[i] +' ]').prop("checked",true);
    }
  });
}

function saveWorkProfile() {
  var profile = new Profile();
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
    submitHandler: profile.onWorkProfile
  });
}
