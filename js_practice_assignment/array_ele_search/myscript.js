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
