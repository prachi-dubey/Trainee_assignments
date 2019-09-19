$(document).ready(function() {
  $("form").validate({
    rules: {
      name: {
        required: true,
        lettersonly: true
      },
      email: {
        required: true,
        email: true
      },
      card: {
        required: true,
        minlength: 16,
        maxlength: 19
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
      },
      resume: {
        required: true,
        extension: "docx|doc|pdf"
      },
      message: {
        required: true,
        maxlength: 150
      }
    },
    messages: {
      name: {
        required: "Please enter your name",
        lettersonly: "Letters only please"
      },
      email: {
        required: "This field is required",
        email: "Please enter a valid email address"
      },
      mobile: {
        required: "Please provide a mobile number",
        number: "Please enter a valid number",
        minlength: "Required 10 characters long"
      },
      card: {
        required: "Please Enter card detail",
        maxlength: "Only 16 digit is valid"
      },
      gender: "Please select one option",
      profile: "Please select an option from the list, if none are appropriate please select 'Other'",
      "skills": "Please select at least one checkbox",
      resume: {
        required:"please upload resume",
        extension:"Please upload valid file formats"
      },
      message: {
        required:"please fill"
      }
    },
    onfocusout: function(element) {
      this.element(element);
    },
    onblur: function(){
    $(this).trigger('keypress');
    },
    errorPlacement: function (error, element) {
      if ( element.is(":radio")) {
        error.insertAfter($(element).parents("div .gender"));
      } else if( element.is(":checkbox")) {
        error.insertAfter($(element).parents("div .skills"));
      } else {
        error.insertAfter( element );
      }
    }
  });
  $('form').submit(function(e) {
    console.log(e.target);
    e.preventDefault();
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
    document.getElementById('job-app').reset();
  });
});

$.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^[a-z]+$/i.test(value);
});

$('#credit-card').on('keyup', validateCard);

var cardValue = '';
var digit = 4;
var validateCard = function(event) {
   var cardNumber = $('#test');
   var errorMsg = $('.error');
   if(event.keyCode >= 48 && event.keyCode <= 57) {          // key add
      errorMsg.text("");
      if(cardNumber.val().length >= 20) {
        cardNumber.val(cardValue);
      } else {
        cardValue += event.key;
      }
      if((cardValue.length == digit) && digit < 19) {
        digit += 5;
        cardValue += '-';
        cardNumber.val(cardValue);
      }
    } else if(event.keyCode == 8 || event.keyCode == 46) {   // key remove
      errorMsg.text("");
      if(cardValue.length == 16 || cardValue.length == 11 || cardValue.length == 6) {
      cardValue  = cardValue.slice(0, -1);
        digit -= 5;
      } else if(cardValue.length < 4 ) {
        digit = 4;
      }
      cardValue = cardValue.slice(0, -1);
      cardNumber.val(cardValue);
    } else {
      errorMsg.text("digits only");
    }
};
