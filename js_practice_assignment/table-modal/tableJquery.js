var personRecords = [];
var getUserData = $("#insert-data");

function getRowData(id, isEdit, editdata) {
  var data = null;
  var trHtml = "";
  if (id) {
    data = personRecords[parseInt(id-1)];
  }
  if (!data) {
    id = personRecords.length + 1;
    $("#table-row").append("<tr id=row-" + id + "></tr>");
  }
  trHtml = '<td>' + id + '</td>';
  if (isEdit) {
    trHtml += '<td>'+ (editdata.fname ? editdata.fname : "n/a") + '</td>';
    trHtml += '<td>'+ (editdata.lname ? editdata.lname : "n/a") + '</td>';
    trHtml += '<td>' + (editdata.age ? editdata.age : "n/a") + '</td>';
    trHtml += '<td>' + (editdata.profile ? editdata.profile : "n/a") + '</td>';
    // trHtml += '<td> <button onclick="getRowData('+ id +')" id="edit-Btn" class="btn btn-success"> EDIT </button> </td>';
    trHtml += '<td> <button onclick="createModal('+ id + ')" class="btn btn-success"> EDIT </button> </td>';
  } else {
    trHtml += '<td> <input id="fname" class="form-control" type="text" placeholder="firstName" value="' + (data ? data.fname: '') + '"> </td>';
    trHtml += '<td> <input id="lname" class="form-control" type="text" placeholder="lastName" value="' + (data ? data.lname: '') + '"> </td>';
    trHtml += '<td> <input id="age" class="form-control" type="text" placeholder="age" value="' + (data ? data.age: '') + '"> </td>';
    trHtml += '<td> <input id="profile" class="form-control" type="text" placeholder="profile"  value="' + (data ? data.profile: '') + '"></td>';
    trHtml += '<td> <button onclick="storeEditData(' + id + ')" class="btn btn-success"> SAVE </button> </td>';
  }

  $("#row-" + id).html(trHtml);
}

function storeEditData(id) {
   var person = personRecords[(id-1)];
   var addNew = (!person) ? true : false;
   var fname = $("#fname").val();
   var lname = $("#lname").val();
   var age = $("#age").val();
   var profile = $("#profile").val();
   person = {fname: fname, lname: lname, age: age, profile: profile, id: id};
   if(!(person.fname || person.lname || person.age || person.profile)) {
     $("#error").text("Enter at least one parameter!");
     return false;
   } else {
     $("#error").text(" ");
   }
   if(addNew) {
     personRecords.push(person);
   }
   getRowData(id, true, person);
   $("#myModal").modal('hide');
   // console.log(personRecords);
}

function createModal(id) {
  var modalHtml = "";
  // var personDetails = personRecords.filter(obj => {return obj.id === id});
  // console.log(readPersonRecord[0]);

  personDetails = {};
  for (var i = 0; i < personRecords.length; i++) {
    if(personRecords[i].id == id) {
      personDetails = personRecords[i];
      break;
    }
  }
  console.log(personDetails);
  // console.log(personDetails.fname);

  modalHtml += '<div class="modal fade" id="myModal" tabindex="-1" role="dialog">'
  modalHtml += '<div class="modal-dialog">';
  modalHtml += '<div class="modal-content">';
  modalHtml += '<div class="modal-header"> <button type="button" class="close" data-dismiss="modal">&times;</button>';
  modalHtml += '<h4 class="modal-title">Edit Table Entry</h4></div>';      // modal header
  modalHtml += '<div class="modal-body">';
  modalHtml += '<label>fname  :</label><input id="fname" class="form-control" type="text" placeholder="firstName" value="' + (personDetails ? personDetails.fname: '') + '">';
  modalHtml += '<label>lname  :</label><input id="lname" class="form-control" type="text" placeholder="lastName" value="' + (personDetails ? personDetails.lname: '') + '">';
  modalHtml += '<label>age    :</label><input id="age" class="form-control" type="text" placeholder="age" value="' + (personDetails ? personDetails.age: '') + '">';
  modalHtml += '<label>profile:</label><input id="profile" class="form-control" type="text" placeholder="profile"  value="' + (personDetails ? personDetails.profile: '') + '">';
  modalHtml += '<div class="modal-footer">'
  modalHtml += '<button onclick="storeEditData(' + id + ')" class="btn btn-success"> SAVE </button></div>';
  modalHtml += '</div>';                // modal body
  modalHtml += '</div>';                // modal-content
  modalHtml += '</div></div>';         // myModal and modal dialog


  $("#edit-entry").html(modalHtml);
  $("#myModal").modal();
}
