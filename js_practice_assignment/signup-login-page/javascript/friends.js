function Friends() {

  var globalFriends = [ {name: "Josephin Deo",profile: "Backend Engineer",following: false, id: 1},
                      {name: "Leo Deo",profile: "Professor" ,following: false , id: 2},
                      {name: "Joe Leon",profile: "Frontend Engineer" ,following: false , id: 3},
                      {name: "Ram Singh",profile: "Militry Officer" ,following: false , id: 4},
                      {name: "Rohit",profile: "Boxer" ,following: false , id: 5},
                      {name: "Ambani",profile: " Businessman" ,following: false , id: 6},
                      {name: "Steven",profile: "Cricketer" ,following: false , id: 7},
                      {name: "Robert Peel",profile: "Player" ,following: false , id: 8},
                      {name: "Neil Chaplin",profile: "Astronauts" ,following: false , id: 9},
                      {name: "Charlie",profile: "Actor" ,following: false , id: 10},
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
      var userFollower = loginDetail.following;
      $('.following-counts').text(userFollower.length);
      var friendsData = JSON.parse(localStorage.getItem('friends'));
      if(userFollower.length) {
        for(var i = 0; i < userFollower.length ; i++) {
          for(var j = 0; j <= friendsData.length ; j++) {
            if(userFollower[i].id == friendsData[j].id) {
              friendsData[j].following = true;
              break;
            }
          }
        }
      }
    }
    localStorage.setItem('friends', JSON.stringify(friendsData));
    return friendsData;
  }
}

function follow(event) {
  var id = $(event).data('id');

  var followerList = [];
  var followersCount = null;
  var authHelper = new AuthHelper();
  var storedDetail = authHelper.getData();
  for (var i = 0; i < storedDetail.length; i++) {
    if (storedDetail[i].isloggedIn) {
    followerList = storedDetail[i].following;
    }
  }

  if($(event).text() == 'Follow') {
    $(event).text('Following');
  } else if($(event).text() == 'Following') {
    $(event).text('Follow');
  }

  var isFollowing = false;
  if(followerList && followerList.length) {
    for (var i = 0; i < followerList.length; i++) {
      if(followerList[i].id == id) {
        isFollowing = true;
        followerList.splice(i, 1);
        break;
      }
    }
  }

  if((isFollowing) && (!followerList.length) ) {
    followerList = [];
  } else if(!isFollowing || !followerList.length) {
    followerList.push({id: id});
  }

  var followers = JSON.parse(localStorage.getItem('friends'));
  $('.following-counts').text(followerList.length);
  authHelper.setData(storedDetail);
  authHelper.setFollowersCount();
}
