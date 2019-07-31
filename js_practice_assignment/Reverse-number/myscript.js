var numb = "apple is fruit";

function reverseNumber(number) {
  var i ,temp = "";
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
  return temp;
  // console.log(temp);
  // console.log(typeof temp);
}


var reverseNumb = reverseNumber(numb);
console.log(reverseNumb);
