var arr = new Array([40, 100, 1, 5, 25, 10, 122, 150, 92, 125]);

console.log(typeof arr);                    // object
var a = new String('hello')
console.log(typeof a);                     //  object
console.log(Array.isArray(arr));           //  true

// console.log(arr);
var x = arr.pop();
console.log(x);

function largestArrayElement(array) {
  array.sort(function(a, b){return b - a});       // sort array in descending order
  var temp = array.shift();                      //begining value of array
  return temp;
}

function addArrayElement(array) {
   var len = array.length;
   console.log("length of pervious array is " + len);
   array.splice(7, 0, 20);                     // add an element on 7th location of array
   var len = array.length;
   console.log("length of new array is " + len);
   return array;
}

var largestElement = largestArrayElement(arr);
console.log("largest element of array is : " + largestElement);

var addElement = addArrayElement(arr);
console.log("Adding element in array : " + addElement);
