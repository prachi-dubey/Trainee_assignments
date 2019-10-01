// var d = new Date();
// var time = d.getTime();
// var commonPosts = {}
// var globalPostData = [{ title: "Josephin deo",
//      icon: "https://cdn130.picsart.com/280942166026201.jpg?c256x256",
//      time: time,
//      imageUrl: "https://images.pexels.com/photos/236047/pexels-photo-236047.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//      subtitle: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
//      likes: 5
//    } ,
//    { title: "Leon leo",
//     icon: "http://icons.iconarchive.com/icons/dooffy/christmas/256/nature-icon.png",
//     time: time,
//     imageUrl: "https://i.ytimg.com/vi/HS7ulzLL034/maxresdefault.jpg",
//     subtitle: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
//     likes: 8
//   },
//   { title: "Flower theam",
//    icon: "https://p1.hiclipart.com/preview/228/719/727/prismatic-nature-s-the-shit-legit-pink-petaled-flower.jpg",
//    time: time,
//    imageUrl: "http://miriadna.com/desctopwalls/images/max/Nature-of-Brazil.jpg",
//    subtitle: "miriadna.com desctopwalls images/max/Nature-of-Brazil.jpg Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.",
//    likes: 8
//  } ];
//
// commonPosts.data = globalPostData;
// console.log(globalPostData );
// localStorage.setItem('globalPost', JSON.stringify(commonPosts));

var globalPost = JSON.parse(localStorage.getItem('globalPost'));
console.log(globalPost);

function Home() {
  this.prepareHome = function(personDetail) {
    $.get("../template/home.html", function(templateHome, Status) {
      var output = Mustache.render(templateHome, globalPost);
      history.replaceState({ page: 1}, "home", "#dashboard-home");
      $('#tab-content').html(output);
    });
  }

  this.onSubmit = function (form) {
    $('#modal-form').removeAttr('novalidate');
    console.log(event.target);
    event.preventDefault();
    $("#open-modal").modal('hide');
    var inputs = $('form :input');
     var values = {};
     inputs.each(function() {
       values[this.name] = $(this).val();
     });
     console.log(values);
     var authHelper = new AuthHelper();
     var storedDetail = authHelper.getData();
     // var storedDetail = JSON.parse(localStorage.getItem('personDetail'));
     for (var i = 0; i < storedDetail.length; i++) {
     if(storedDetail[i].isloggedIn) {
       commonPosts.data = values;
       localStorage.setItem('userPost', JSON.stringify(commonPosts));
     }
     var userPost = JSON.parse(localStorage.getItem('userPost'));
     console.log("userPost");
     console.log(userPost);
    }
  }
}

function addPostEvent() {
  $('#open-modal').modal('show');
}

// $('#open-modal').on('hidden.bs.modal', function() {
//   $('#add-title').val("");
//   $('#add-image').val("");
//   $('#add-subtitle').val("");
// });

function storeUserPost() {
    var home = new Home();
    $("#modal-form").validate({
      rules: {
        postTitle: "required",
        postImage: {
          required:true,
          extension: "png|jpg"
        },
        // postSubtitle: "optional"
       },
      messages: {
        postTitle: "Please add title",
        // postSubtitle: "optional field",
        postImage: {
          extension: "Please enter valid url with png or jpg extension"
        }
       },
      onfocusout: function(element) {
        this.element(element);
      },
      submitHandler: home.onSubmit
  });
}
