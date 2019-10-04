// var d = new Date();
// var time = d.getTime();
// var globalPostData = [{ title: "Josephin deo",
//      name: "public",
//      icon: "https://i.pinimg.com/236x/04/8c/f4/048cf4817731ca4f4a0b040290523188--iphone--cases-s-cases.jpg",
//      time: time,
//      image: "https://images.pexels.com/photos/236047/pexels-photo-236047.jpeg?",
//      subtitle: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
//      likes: 5
//    } ,
//    { title: "Leon leo",
//     name: "public",
//     icon: "http://icons.iconarchive.com/icons/dooffy/christmas/256/nature-icon.png",
//     time: time,
//     image: "https://i.ytimg.com/vi/HS7ulzLL034/maxresdefault.jpg?",
//     subtitle: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
//     likes: 8
//   },
//   { title: "Flower theam",
//    name: "public",
//    icon: "https://p1.hiclipart.com/preview/228/719/727/prismatic-nature-s-the-shit-legit-pink-petaled-flower.jpg",
//    time: time,
//    image: "http://miriadna.com/desctopwalls/images/max/Nature-of-Brazil.jpg?",
//    subtitle: "miriadna.com desctopwalls images/max/Nature-of-Brazil.jpg Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
//    likes: 8
//  } ];
//
// localStorage.setItem('globalPost', JSON.stringify(globalPostData));

function Home() {
  this.prepareHome = function(personDetail) {
    var globalPost = JSON.parse(localStorage.getItem('globalPost'));
    for (var i = 0; i < globalPost.length; i++) {
      var diffTime = timecheck(globalPost[i].time);
      globalPost[i].time = diffTime;
      globalPost[i].name = globalPost[i].name.charAt(0).toUpperCase() + globalPost[i].name.substr(1);
    }

    globalPost.data = globalPost;
    $.get("../template/home.html", function(templateHome, Status) {
      var output = Mustache.render(templateHome, globalPost);
      history.replaceState({ page: 1}, "home", "#dashboard-home");
      $('#tab-content').html(output);
      $('.lazy').lazy({
        scrollDirection: 'vertical',
        visibleOnly: true,
        onError: function(element) {
          console.log('error loading ' + element.data('src'));
        }
      });
      $('.timeline').first().addClass('before');
      $('.timeline').last().addClass('after');
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  this.onSubmit = function (form) {
    $('#post-modal').removeAttr('novalidate');
    event.preventDefault();
    $("#open-modal").modal('hide');
    $(document.body).removeClass("modal-open");
    $(".modal-backdrop").remove();
    var authHelper = new AuthHelper();
    var inputs = $('#post-modal :input');
    var values = {};
     inputs.each(function() {
       values[this.name] = $(this).val();
     });
     var loginDetail = authHelper.getLoginDetails();
     if(loginDetail) {
       var arr = [];
       var d = new Date();
       var time = d.getTime();
       values.image = values.image + '?';
       values.time = time ;
       values.name = loginDetail.name;
       values.icon = loginDetail.profileImg;
       arr = [values];
       var userPost = JSON.parse(localStorage.getItem('globalPost'));
       userPost.unshift(values);
       localStorage.setItem('globalPost', JSON.stringify(userPost));
     }

     var globalPost = JSON.parse(localStorage.getItem('globalPost'));
     for (var i = 0; i < globalPost.length; i++) {
       var diffTime = timecheck(globalPost[i].time);
       globalPost[i].time = diffTime;
     }
     var commonData = {};
     commonData.data = globalPost;

     $.get("../template/home.html", function(templateHome, Status) {
       var output = Mustache.render(templateHome, commonData);
       $('#user-post').html(output);
     });
   }

 }

function likeCount(event) {
  console.log("hii");
  console.log(event);
  $(event).css("color", '#6ec0fb');

  var likesCount = $(event).siblings().eq(1).html();
  likesCount = parseInt(likesCount, 10)
  likesCount = likesCount + 1;
  $(event).siblings().eq(1).html(likesCount);

  var t = $(event).parents().eq(1);
  console.log(t);

}

function addPostEvent() {
  $('#open-modal').on('hidden.bs.modal', function() {
    $('#add-title').val("");
    $('#add-image').val("");
    $('#add-subtitle').val("");
  });

  $('#open-modal').modal('show');
}

function storeUserPost() {
  var home = new Home();
  $("#post-modal").validate({
    rules: {
      title: "required",
      image: {
        required:true,
        extension: "png|jpg"
      }
    },
    messages: {
      title: "Please add title",
      image: {
        extension: "Please enter valid url with png or jpg extension"
      }
    },
    onfocusout: function(element) {
      this.element(element);
    },
    submitHandler: home.onSubmit
  });
}

function timecheck(time) {
  var saveTime = new Date(time);
  var newTime = new Date();
  var time = '';
  var date = newTime.getDate() - saveTime.getDate();

  if(date == 0) {
    var diff = newTime.getTime() - saveTime.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);
    diff -= minutes * 1000 * 60;
    var seconds = Math.floor(diff / 1000 );

    if(hours > 0) {
      time = hours + ' hours';
    } else if(minutes < 60 && minutes > 0) {
      time = minutes + ' minutes';
    } else if(seconds < 60) {
      time = seconds + ' seconds';
    }
    return time;
  } else {
    return date + ' days';
  }
}
