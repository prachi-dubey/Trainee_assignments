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

// localStorage.setItem('globalPost', JSON.stringify(globalPostData));

function Home() {
  this.prepareHome = function() {
    var globalPost = getGlobalPost();
    for (var i = 0; i < globalPost.length; i++) {
      globalPost[i].time = timecheck(globalPost[i].time);
      globalPost[i].name = globalPost[i].name.charAt(0).toUpperCase() + globalPost[i].name.substr(1);
    }

    globalPost.data = globalPost;
    $.get("../template/home.html", function(templateHome, Status) {
      var output = Mustache.render(templateHome, globalPost);
      history.replaceState({ page: 1}, "home", "#/dashboard-home");
      $('#tab-content').html(output);
      $('.lazy').lazy({
        scrollDirection: 'vertical',
        visibleOnly: true,
        onError: function(element) {
          console.log('error loading ' + element.data('src'));
        }
      });
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
    var post = {};
    inputs.each(function() {
      post[this.name] = $(this).val();
    });
    var loginDetail = authHelper.getLoginDetails();
    if(loginDetail) {
      var today = new Date();
      var time = today.getTime();
      post.image = post.image + '?';
      post.time = time;
      post.name = loginDetail.name;
      post.icon = loginDetail.profileImg;
      var userPost = getGlobalPost();
      userPost.unshift(post);
      storeGlobalPost(userPost);
    }
    this.prepareHome();
  }

  function getGlobalPost() {
    var globalPostDetail = JSON.parse(localStorage.getItem('globalPost'));
    return globalPostDetail;
  }

  function storeGlobalPost(userPost) {
    localStorage.setItem('globalPost', JSON.stringify(userPost));
  }

}

function likeCount(event) {
  $($(event)[0]).addClass('like-hightlight');
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
        required: function(element) {
          var titleValue = $('#add-title').val();
          var subtitleValue = $('#add-subtitle').val();
          if(titleValue && subtitleValue) { return false; }
          else if(titleValue && !subtitleValue) {return true;}
        },
        extension: "png|jpg"
      },
      subtitle: {
        required: function(element) {
          var titleValue = $('#add-title').val();
          var imageValue = $('#add-image').val();
          if(titleValue && imageValue) { return false; }
          else if(titleValue && !imageValue) {return true;}
        },
        maxlength: 100
      }
    },
    messages: {
      title: "Please add Post Title",
      image: {
        required: "Please add Post Subtitle/Image Url",
        extension: "Please enter valid url with png or jpg extension"
      },
      subtitle: {
        required: "Please add Post Subtitle/image Url",
      }
    },
    onfocusout: function(element) {
      this.element(element);
    },
    submitHandler: home.onSubmit.bind(home)
  });
}

function timecheck(time) {
  var postTime = new Date(time);
  var today = new Date();
  var getPostTime = '';
  var date = today.getDate() - postTime.getDate();

  if(date == 0) {
    var diff = today.getTime() - postTime.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);
    diff -= minutes * 1000 * 60;
    var seconds = Math.floor(diff / 1000 );

    if(hours > 0) {
      getPostTime = hours + ' hours';
    } else if(minutes < 60 && minutes > 0) {
      getPostTime = minutes + ' minutes';
    } else if(seconds < 60) {
      getPostTime = seconds + ' seconds';
    }
    return getPostTime;
  } else {
    return date + ' days';
  }
}
