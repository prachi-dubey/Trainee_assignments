var array = [34, 56, 6, 4, 5];

function sumOfArray(arr) {
  var i , temp, temp2 = 0;
  var len = arr.length;
  // console.log(len);
  for (i = 0 ; i < len ; i++) {
    temp = arr[i];
    temp2 = temp2 + temp;
    // console.log(arr[i]);
    // console.log(temp);
    // console.log(temp2);
    // console.log(typeof temp);
  }
 // console.log(i);
 // console.log(typeof temp2);
 // console.log(temp2);
   return temp2;
}

var totalArray = sumOfArray(array);
 console.log(totalArray);
 // console.log(typeof totalArray);
