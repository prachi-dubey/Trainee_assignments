var tmpStr = "prachi";
var tmpNum = 9876;

function reverse(number) {
  var i, temp = "";
  var numberType = typeof number ;
  // console.log(typeof number);
  number = number.toString();            // number += ''; both works same
  console.log(typeof number);
  var len = number.length;
  console.log(len);
  // console.log(number[0]);
  // console.log(number[1]);
  // console.log(number[2]);
  // console.log(number[3]);
  for (i = 1; i <= len; i++) {
     // var pos = number.IndexOf(len - i);
     // console.log(pos);
     // console.log(number[len - i]);
     temp = temp.concat(number[len - i]);
     // console.log(typeof number);

  }
  // console.log(temp);
  var reverseType = typeof temp ;
  console.log(reverseType);
  if (isNaN(temp)) {
      // console.log("Not a Number");
  } else  {
    // console.log("thakur");
    temp = parseInt(temp, 10);
  }

   return temp;
}

var reverseNumb = reverse(tmpNum);
console.log(reverseNumb);


// 54321                     //it's work only for number, not a perfect example of reverse
//
// 54321%10 = 1
// 54321 / 10 = 5432
//
// 54321%10 = 2
// 54321 / 10 = 543
//
//
//
// 1
// 1 * 10 + 2 = 12
//
// 12*10 + 3 = 123
//
// 123 * 10 + 4 = 1234
