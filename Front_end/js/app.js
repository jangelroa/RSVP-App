$.mobile.ajaxEnabled = false;
$.mobile.linkBindingEnabled = false;
$.mobile.hashListeningEnabled = false;
$.mobile.pushStateEnabled = false;
$.mobile.changePage.defaults.changeHash = false;

$.ajaxSetup({
  beforeSend: function(xhr) {
    xhr.setRequestHeader("Accept", "application/json")
  }
});

var eventListTemplate;
// var editEventTemplate;
var newEventTemplate;
var individualEventTemplate;
var pubIndividualEventTemplate;

var loginTemplate;
// var editUseremplate;
var newUserTemplate;
var userProfileTemplate;

//Compile all templates on document ready for Events

(function() {
  var eventListTemplateSource = $("#event-list-template").html();
  eventListTemplate = Handlebars.compile(eventListTemplateSource);

  var individualEventTemplateSource = $("#individual-event-template").html();
  individualEventTemplate = Handlebars.compile(individualEventTemplateSource);

  var pubIndividualEventTemplateSource = $("#pub-view-individual-event-template").html();
  pubIndividualEventTemplate = Handlebars.compile(pubIndividualEventTemplateSource);
  // var editEventTemplateSource = $("#edit-event-template").html();
  // editEventTemplate = Handlebars.compile(editEventTemplateSource);

  var newEventTemplateSource = $("#new-event-template").html();
  newEventTemplate = Handlebars.compile(newEventTemplateSource);
})();

//Compile all templates on document ready for Users
(function() {
  var loginTemplateSource = $("#login-template").html();
  loginTemplate = Handlebars.compile(loginTemplateSource);

  var newUserTemplateSource = $("#new-user-template").html();
  newUserTemplate = Handlebars.compile(newUserTemplateSource);

  var userProfileTemplateSource =$("#user-profile-template").html();
  userProfileTemplate = Handlebars.compile(userProfileTemplateSource);

})();

// This section is all USERS related **************************************

//we are setting up an event "collection" of users (Backbone does this)
var Users = Backbone.Collection.extend({
  url: "http://api.rsvp_app.dev/users.json"
});

// we are setting up an user "Model"
var User = Backbone.Model.extend({
  urlRoot:"http://api.rsvp_app.dev/users"
});

//Set up user login "View"
var LoginView = Backbone.View.extend({
  el: "#container",
  render: function() {
    var html = loginTemplate();
    $(this.el).html(html);
  },

  events: {
    "click #login_submit": "login_submit"
    // "click #newUser": "new_user"
  },


  // Defining a login_submit function
  login_submit: function(event) {
    // $('#login_submit').submit(function(event){
      event.preventDefault();
      $.ajax({
          url: "http://api.rsvp_app.dev/users/login/",
          type: "POST",
          data: {

              username: $("#login_username").val(),
              password: $("#login_password").val()

          } ,
          success: function(data) {
            sessionStorage.setItem("auth_token", data.auth_token);
            sessionStorage.setItem("user_id", data.id);
            // console.log(data.auth_token);
            router.navigate('allEvents', {trigger: true});

            // alert("User Log");
            // console.log(data);
            // WORKING

          },
          error: function(jqXHR, textStatus, errorThrown) {
            alert("Username and Password don't match");
            // console.log(errorThrown);

            // THE USERNAME AND PASSWORD DONT MATCH
          }
        });

    // });
  }

});

//Set up NEW USER signup  View
var NewUserSignup = Backbone.View.extend({
  el: "#container",
  render: function() {
    var html = newUserTemplate();
   $("#container").html(html);
  },
  // key value pair of the event object
  // "saveUser" in quotes is backbone specific syntax for key value pairs
  events: {

    "click #submit_newUser": "saveUser"
  },
  saveUser: function(event){
    event.preventDefault();
    var that = this;
    var new_user = new User();

    var userInfo = {
      firstname: $("#new-firstname").val(),
      lastname : $("#new-lastname").val(),
      email : $("#new-email").val(),
      username: $("#new-username").val(),
      password : $("#new-password ").val(),
      picture_url: $("#new-picture_url").val()
     
    };

    new_user.save(userInfo, {
      success: function() {
        router.navigate("#allEvents", {
          trigger:true
        });
        that.undelegateEvents();
      }
    });
  }
});

// we are setting up an event "View", using a key value pair - Eventlist is to show all evetss
var UserProfile = Backbone.View.extend({
  el: "#container",
  render: function() {
    // var user_info = new User({
    //   id: sessionStorage.getItem("user_id")
    // });
    //fetch is a function, through backbone, that accepts an object, uses the success error syntax
      // var that = this;
      // user_info.fetch({
      //   success: function () {
            var html = userProfileTemplate({
              // userInfo: user_info
          
            });
         
            $("#container").html(html);
            $("#container").trigger("create");
      //   }
      // });
    }
});

// This section is all EVENTS related *************************************

//we are setting up an event "collection" of events (Backbone does this)
var Events = Backbone.Collection.extend({
  url: "http://api.rsvp_app.dev/events.json"
});

// we are setting up an event "Model"
var Event = Backbone.Model.extend({
  urlRoot:"http://api.rsvp_app.dev/events"
});

// we are setting up an event "View", using a key value pair - Eventlist is to show all evetss
var EventList = Backbone.View.extend({
  el: "#container",
  render: function() {
    //fetch is a function, through backbone, that accepts an object, uses the success error syntax
      // var that = this;
      events.fetch({
        success: function () {
            var html = eventListTemplate({
              allEvents: events.models
            });
            console.log(events.models);
            $("#container").html(html);
            $("#container").trigger("create");
        }
      });
    }
});

//Set up show Individual Event View
var ShowIndividualEvent = Backbone.View.extend({
  el: "#container",
  render: function(id) {
    var event_info = new Event({
      id: id
    });
// grab things from database using backbone (fetch is backbone specific)
    event_info.fetch({
      success: function() {
        if (event_info.attributes.publico) {
          var html = pubIndividualEventTemplate({
            eventInfo: event_info
          });

          $("#container").html(html);
          $("#container").trigger("create");
        } else {
          var html = individualEventTemplate({
            eventInfo: event_info
          });

          $("#container").html(html);
          $("#container").trigger("create");
        }
      }
    });
  }
});

// Set up a Create New Event View
var NewEvent = Backbone.View.extend({
  el: "#container",
  render: function (){
    var html = newEventTemplate();

    $("#container").html(html);
  },
  // key value pair of the event object
  // "saveEvent" in quotes is backbone specific syntax for key value pairs
  events: {
    "click #submit-new-event": "saveEvent"
  },
  saveEvent: function(event) {
    event.preventDefault();
    var that = this;
    var new_event = new Event();

    var eventInfo = {
      title: $("#new-title").val(),
      public_descripton : $("#new-public_description").val(),
      private_descripton : $("#new-private_description").val(),
      date : $("#new-date").val(),
      time : $("#new-time").val(),
      location : $("#new-location").val(),
      max_attendances : $("#new-max_attendances").val(),
      event_picture_url: $("#new-event_picture_url").val(),
      publico : $(".new-publico").val(),
    };

      new_event.save(eventInfo, {
        success: function() {
            router.navigate("#allEvents", {
              trigger: true
            });
            that.undelegateEvents();
        }
      });
  }
});

// //Set up edit Book View
// var EditBook = Backbone.View.extend({
//   el: "#container",
//   render: function(id) {
//     var book = new Book({
//       id: id
//     });

// //grab things from database using backbone (fetch is backbone specific)
// book.fetch({
//   success: function(){
//     var html = editBookTemplate({
//             //gettig the book info and passing it in
//             bookInfo: book
//           });
//     $("#container").html(html);
//   }
// });
// },
// events: {
//   "click .submit-book-edits": "editBook",
//   "click .delete-book": "deleteBook"
// },
// editBook: function(event) {
//   var that = this;
//   var book = new Book();
//   var bookInfo = {
//     id: event.target.id,
//     title: $("#edit-title").val(),
//     author: $("#edit-author").val(),
//     release_date: $("#edit-release").val(),
//     image: $("#edit-image").val()
//   };
//   event.save(eventInfo, {
//     success: function() {
//       router.navigate("/", {
//         trigger :true
//       });
//       that.undelegateEvents();
//     }
//   });
// },
// deleteEvent: function(event){
//   var that = this;
//           // we need to instantiate the event with the id
//           var event = new Event({
//           id: event.target.id
//         });

// event.destroy ({
//   success: function() {
//     router.navigate("/", {
//       trigger: true
//     });
//     that.undelegateEvents();
//       }
//     });
//   }
// });



//here we instantiate a new collection of Events
var events = new Events();

// Set up routes

var Router = Backbone.Router.extend({
  routes: {
    "":"login",
    "allEvents":"all_events",
    "edit/:id":"edit_event",
    "new":"new_event",
    "show_event/:id":"show_event",
    // "showPrivate/:id":"show_priv",
    "findEvents":"find_events",
    "add":"add_event",
    
    "invite/:id":"invite_guests",
    "showRSVP/:id":"show_rsvps",

    // "login":"login",
    "login_submit": "login_submit",


    "editUser/:id":"edit-user",
    "newUser":"new_user",
    "show_profile/:id":"show_profile"

  },

//Defining index route 
   login: function() {
    var login = new LoginView();
    login.render();
    $("#container").trigger("create");
  },
//Defining the all_events List route
  all_events: function() {
    var eventlist = new EventList();
    eventlist.render();
    $("#container").trigger("create");
  },

//Definining the show Individual Event Route
  show_event: function(id) {
  var showIndividualEvent = new ShowIndividualEvent();
  showIndividualEvent.render(id);
  $("#container").trigger("create");
  }, 

  //defining new_user route
  new_user: function() {
    var newUserSignup = new NewUserSignup();
    newUserSignup.render();
    $("#container").trigger("create");
  }, 
//defining a new event (creating a new event) route
  new_event: function() {
    var newEvent = new NewEvent();
    newEvent.render();
    $("#container").trigger("create");
  }, 

// Defining a route for User Profile 
  show_profile: function(id) {
    var newUserProfile = new UserProfile();
    newUserProfile.render(id);
    $("#container").trigger("create");
  }
});


var router = new Router();



//Defining edit event route
// edit_event: function() {
//    //we are instantiate a new Event, specifically only one record and therefore, we have to pass in an id
//   var editevent = new EditEvent();
//   editevent.render(id);
// };

//Show new eventform
// new_event: function() {
//   var newevent= new NewEvent();
//   newevent.render();

// };

//Start the history

Backbone.history.start();