var number = 8;

function factorial(numb) {

  var temp = 1 , temp2;
    for(i = 1; i <= numb; i++)
    {
      temp = i * temp;
      // temp2 *= temp ;
       // console.log(temp);
        // console.log(temp2);
    }
     return temp;
  // console.log(temp2);
}

var factorial = factorial(number);
console.log(factorial);
