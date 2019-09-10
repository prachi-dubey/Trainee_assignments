var person = {
  fname:  "",
  lname: "",
  age: "",
  email: "",
  profile: "",
  lang: ""
};

function getInfo() {
  var errorMsg = false;
  person.fname = document.getElementById("firstName").value;
  person.lname = document.getElementById("lastName").value;
  console.log("my name is " + person.fname + " " + person.lname);

  person.age = document.getElementById("age").value;
  // console.log(person.age);
  if(!isInValidAge(person.age)) {
    document.getElementById("error").innerHTML = "Age should be numeric only";
    errorMsg = true;
    return;
  } else {
   console.log("my age is " + person.age);
  }

  var emailData = document.getElementById("emailAdd").value;
  // console.log(emailData);
  if(!chkMailValid(emailData)) {
    document.getElementById("error").innerHTML = "email is invalid";
    errorMsg = true;
    return;
  } else {
    console.log("my email id is " + emailData);
  }

  person.profile = document.getElementById("profile").value ;
  console.log("my profile is " + person.profile);

  person.lang = document.getElementById("chkLang");
  getChkBoxInfo(person.lang);
  document.getElementById("error").innerHTML = "";
}

function getChkBoxInfo(chkLang) {
  var selectedLang = [];                //Create an Array.
  var languages = chkLang.getElementsByTagName("input");    //Reference all the CheckBoxes.
  for (var i = 0; i < languages.length; i++) {                 // Loop and push the checked CheckBox value in Array.
     if (languages[i].checked) {
         selectedLang.push(languages[i].value);
     }
  }
  if (selectedLang.length) {
    console.log("I use: " + selectedLang.join(",") + " language");
  }
}

function isInValidAge(age) {
  if(isNaN(age)) {
      return false;
  }
  return true;
}

function chkMailValid(emailAdd) {
  var mailformat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return mailformat.test(emailAdd);
}
