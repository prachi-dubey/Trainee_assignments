var arr = [34, 56, 6, 4, 5];

function searchArrayElement(array) {
  var len = array.length;
  console.log(len);
  var temp = (len - 1) / 2;
  console.log(temp);
  return arr[temp];
  console.log(arr[temp]);
}

var arrElement = searchArrayElement(arr);
console.log("element of array is : " + arrElement);

///////////////////////////////////// another apporach find ///////////////////////////

var first = arr.find(myFunction);
console.log(first);

function myFunction(value, index, array) {
  return value == 6;
}

//////////////////// index of /////////////////////

var a = arr.indexOf(20);
// console.log(a);

if(a != -1) {
  console.log(a);
} else {
  console.log("Number not found");
}
