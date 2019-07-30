var isPrimeNumber = false;
var n = 37 ;

  for (var i = 2; i <= n/2; i++) {             // mod 0 is undefined and mod 1 gives 0
    if (n%i == 0) {
      console.log("value of n "  + n);
      isPrimeNumber = true;
    }
  }

if (isPrimeNumber) {
  alert("not prime number");
} else {
  alert("prime number");
}

console.log("value of isPrimeNumber "  + isPrimeNumber);
