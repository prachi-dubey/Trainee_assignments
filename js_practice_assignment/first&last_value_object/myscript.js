var person = {
  firstname:"john",
  lastname:"Doe",
  age:50,
  eyecolor:"blue",
  nationality:"indian",
  profession:50,
};

var x, txt1 = "", txt2 = "", txt3;

// console.log(Object.keys(person));                 //(4) ["firstname", "lastname", "age", "eyecolor"]
 var y = Object.keys(person).length;
// console.log(y);                                   // 4

for ( var i = 0; i <= y; i++) {
      if (i == 0) {
         for (x in person) { txt1 = person[x];  break; }  // john
      }
      if ( i == y) {
        for (x in person) { txt2 = person[x]; }
      }

      txt3 = txt1.concat(" ", txt2);
      // console.log(i);
 }
 console.log(txt3);

 // for (x in person) {
    // console.log(person[x]);                               // john, doe ,50 ,blue
    // console.log(Object.keys(person[x]).length);           // 4, 3, 0, 4
    // console.log(x);                                       // firstname, lastname, age, eyecolor
    // console.log(Object.keys(x).length);                 // 9, 8, 3, 8
 // }
