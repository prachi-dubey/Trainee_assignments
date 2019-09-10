var personRecords = [];
var getUserData = document.getElementById("insert-data");

function getRowData(id, isEdit, editdata) {
  var data = null;
  var trHtml = "";
  if (id) {
    data = personRecords[parseInt(id-1)];
  }
  if (!data) {
    id = personRecords.length + 1;
    var row = document.getElementById("table-row");
    var rowElem = document.createElement('tr');
    rowElem.setAttribute("id", "row-" + id);
    row.appendChild(rowElem);
  }
  var tmp = document.getElementById("row-" + id);
  trHtml = '<td>' + id + '</td>';
  if (isEdit) {
    trHtml += '<td>'+ (editdata.fname ? editdata.fname : "n/a") + '</td>';
    trHtml += '<td>'+ (editdata.lname ? editdata.lname : "n/a") + '</td>';
    trHtml += '<td>' + (editdata.age ? editdata.age : "n/a") + '</td>';
    trHtml += '<td>' + (editdata.profile ? editdata.profile : "n/a") + '</td>';
    trHtml += '<td> <button onclick="getRowData('+ id +')" class="btn btn-success"> EDIT </button> </td>';
  } else {
    trHtml += '<td> <input id="fname" class="form-control" type="text" placeholder="firstName" value="' + (data ? data.fname: '') + '"> </td>';
    trHtml += '<td> <input id="lname" class="form-control" type="text" placeholder="lastName" value="' + (data ? data.lname: '') + '"> </td>';
    trHtml += '<td> <input id="age" class="form-control" type="text" placeholder="age" value="' + (data ? data.age: '') + '"> </td>';
    trHtml += '<td> <input id="profile" class="form-control" type="text" placeholder="profile"  value="' + (data ? data.profile: '') + '"></td>';
    trHtml += '<td> <button onclick="storeEditData(' + id + ')" class="btn btn-success"> SAVE </button> </td>';
  }
  tmp.innerHTML = trHtml;
}

function storeEditData(id) {
   var person = personRecords[(id-1)];
   var fname = document.getElementById("fname").value;
   var lname = document.getElementById("lname").value;
   var age = document.getElementById("age").value;
   var profile = document.getElementById("profile").value;
   if(person) {
     person.fname = fname;
     person.lname = lname;
     person.age = age;
     person.profile= profile;
   } else {
     person = {
       id: id,
       fname: fname,
       lname: lname,
       age: age,
       profile: profile
     };
     personRecords.push(person);
   }
   getRowData(id, true, person);

   console.log(personRecords);
}


/*
function showInputRow() {
  getUserData = document.getElementById("insert-data");
  if (getUserData.style.display === "none") {
    getUserData.style.display = "table-row";
    document.getElementById("id-no").innerHTML = (idVAlue);
  } else {
    getUserData.style.display = "none";
  }
}

function getRowData() {
  var person = {
    id: idVAlue,
    fname: "",
    lname: "",
    age: "",
    profile: "",
  };
  person.fname = document.getElementById("first-name").value;
  person.lname = document.getElementById("last-name").value;
  person.age = document.getElementById("age").value;
  person.profile = document.getElementById("profile").value;

  if( person.fname == '' && person.lname == '' && person.age == '' && person.profile == '') {
    document.getElementById("error").innerHTML = "Enter at least one parameter!";
    return false;
  } else {
    document.getElementById("error").innerHTML = "";
  }

  insertRowData(person);
  document.getElementById("first-name").value = null;
  document.getElementById("last-name").value = null;
  document.getElementById("age").value = null;
  document.getElementById("profile").value = null;
}

function insertRowData(personData) {
  var row = table.insertRow(rowNumber);
  var idCell = row.insertCell(0);
  var fnameCell = row.insertCell(1);
  var lnameCell = row.insertCell(2);
  var ageCell = row.insertCell(3);
  var profileCell = row.insertCell(4);
  var actionCell = row.insertCell(5);

  row.setAttribute("id", "row-" + idVAlue);
  idCell.innerHTML = idVAlue;
  fnameCell.innerHTML = personData.fname ? personData.fname : 'n/a';
  lnameCell.innerHTML = personData.lname ? personData.lname : 'n/a';
  ageCell.innerHTML = personData.age ? personData.age : 'n/a';
  profileCell.innerHTML = personData.profile  ? personData.profile : 'n/a';

  var editBtn = document.createElement("BUTTON");
  editBtn.innerHTML = " EDIT ";
  editBtn.setAttribute("class", "btn btn-success");
  editBtn.setAttribute("id", "edit-"+idVAlue);
  editBtn.setAttribute("data-value", idVAlue);
  editBtn.addEventListener("click", function() {
    var id = this.getAttribute("data-value");
    getRowData(id);
  });
  actionCell.appendChild(editBtn);

  personRecords.push(personData);

  rowNumber++;
   idVAlue += 1;
}
*/
