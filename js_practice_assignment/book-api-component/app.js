var starvalue = null;
var sidenavbar = new Sidenav();
var booksTile = new Book();

function App() {
   this.setSubName = function (subName) {
    booksTile.getSubDetails(subName);
  };
}

$(document).ready(function() {
  sidenavbar.prepareNavData();
  booksTile.getSubDetails('java');
});
