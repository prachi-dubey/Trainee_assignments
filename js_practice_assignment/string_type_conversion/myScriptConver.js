var str = "JAVA";

function caseconversion(txt, caseCon) {
  var tmp = '';
  for (var i = 0; i <= txt.length; i++) {
     if(caseCon == 'l') {
       if(txt[i] >= 'A' && txt[i] <= 'Z') {
         tmp += String.fromCharCode(txt.charCodeAt(i) + 32);
       }
     }
     if(caseCon == 'u') {
       if (txt[i] >= 'a' && txt[i] <= 'z') {
         tmp +=  String.fromCharCode(txt.charCodeAt(i) - 32);
       }
     }
  }
  return tmp;
}

var convertedStr = caseconversion(str, 'l');
console.log(convertedStr);
