function getItbookUrlData() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log("fetching data");
        console.log(this.responseText);
    }
    console.log(this.readyState);
    console.log(readyState);
    console.log('-------------');
  };
  xhttp.open("GET", 'ajax.txt', true);
  xhttp.send();
}
