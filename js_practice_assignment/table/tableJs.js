var person = {
  id: "",
  fname: "",
  lname: "",
  age: "",
  profile: ""
};
var rowNumber = 1;

function showInputRow() {
  var x = document.getElementById("insert-data");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function getRowData() {

  person.id = document.getElementById("idNo").value;
  person.fname = document.getElementById("firstName").value;
  person.lname = document.getElementById("lastName").value;
  person.age = document.getElementById("age").value;
  person.profile = document.getElementById("profile").value;
  insertRowData(person);
  document.getElementById("idNo").value = null;
  document.getElementById("firstName").value = null;
  document.getElementById("lastName").value = null;
  document.getElementById("age").value = null;
  document.getElementById("profile").value = null;
}


function insertRowData() {
  // console.log("inserting row in your table");
  // console.log("my row numb is " +rowNumber);
  var table = document.getElementById("wrapper");
  var row = table.insertRow(rowNumber);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  cell1.innerHTML= person.id;
  cell2.innerHTML = person.fname;
  cell3.innerHTML= person.lname;
  cell4.innerHTML = person.age;
  cell5.innerHTML= person.profile;

  document.getElementById("insert-data").style.display = "none";
  // var x = document.getElementById("insert-data");
  // console.log("i m hide"  + x.style.display);

  rowNumber++;

  // console.log(person.id);
  // console.log(person.fname);
  // console.log(person.lname);
  // console.log(person.age);
  // console.log(person.profile);
}
