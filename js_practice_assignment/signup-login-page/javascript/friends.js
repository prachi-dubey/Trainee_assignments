function Friends() {

  var globalFriends = [ {name: "Josephin Deo",profile: "Backend Engineer",follower: false, id: 1},
                      {name: "Leo Deo",profile: "Professor" ,follower: false , id: 2},
                      {name: "Joe Leon",profile: "Frontend Engineer" ,follower: false , id: 3},
                      {name: "Ram Singh",profile: "Militry Officer" ,follower: false , id: 4},
                      {name: "Rohit",profile: "Boxer" ,follower: false , id: 5},
                      {name: "Ambani",profile: " Businessman" ,follower: false , id: 6},
                      {name: "Steven",profile: "Cricketer" ,follower: false , id: 7},
                      {name: "Robert Peel",profile: "Player" ,follower: false , id: 8},
                      {name: "Neil Chaplin",profile: "Astronauts" ,follower: false , id: 9},
                      {name: "Charlie",profile: "Actor" ,follower: false , id: 10},
                    ];

  this.prepareFriends = function() {
    localStorage.setItem('friends', JSON.stringify(globalFriends));
    var followersData = {};
    followersData.data = updateFollowers();
    $.get("../template/friends.html", function(template, status) {
      var template = Mustache.render(template, followersData);
      $('#tab-content').html(template);
      history.replaceState({ page: 1}, "home", "#/dashboard-friends");
    });
  }

  function updateFollowers() {
    var authHelper = new AuthHelper();
    var loginDetail = authHelper.getLoginDetails();
    if(loginDetail) {
      var following = loginDetail.follower;
      var friendsData = JSON.parse(localStorage.getItem('friends'));
      console.log(following);
      if(following.length) {
        for(var i = 0; i < following.length ; i++) {
          var t = following[i].id;
          for(var j = 0; j <= friendsData.length ; j++) {
            if(t == friendsData[j].id) {
              friendsData[j].follower = true;
              break;
            }
          }
        }
      }
    }
    localStorage.setItem('friends', JSON.stringify(friendsData));
    return friendsData;
  }

  this.StoreLoggedInFollower = function(followersData) {
    var followerList = [];
    for(var i = 0; i < followersData.length; i++) {
      if(followersData[i].follower) {
        var temp = {
          id: followersData[i].id,
        }
        followerList.push(temp);
      }
    }
    var followersCount = followersData.length - followerList.length;
    $('.following-counts').text(followersCount);

    var authHelper = new AuthHelper();
    var storedDetail = authHelper.getData();
    for (var i = 0; i < storedDetail.length; i++) {
      if (storedDetail[i].isloggedIn) {
        storedDetail[i].follower = followerList;
        storedDetail[i].following = followersCount;
      }
    }
    authHelper.setData(storedDetail);
  }
}

function follow(event) {
  var id = $(event).data('id');
  var totalFollowers = JSON.parse(localStorage.getItem('friends'));
  for (var i = 0; i < totalFollowers.length; i++) {
    if(totalFollowers[i].id == id) {
      if(totalFollowers[i].follower) {
        totalFollowers[i].follower = false;
      } else {
        totalFollowers[i].follower = true;
      }
    }
  }
  localStorage.setItem('friends', JSON.stringify(totalFollowers));

  var followersData = JSON.parse(localStorage.getItem('friends'));
  var tempStore = {};
  tempStore.data = followersData;
  $.get("../template/friends.html", function(templateCheck, Status) {
    var template = Mustache.render(templateCheck, tempStore);
    $('#follower').html(template);
  });

  var storeFollowers = new Friends();
  storeFollowers.StoreLoggedInFollower(followersData);
}
