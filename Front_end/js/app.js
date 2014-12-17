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
// var newEventTemplate;
var individualEventTemplate;

var loginTemplate;
// var editUseremplate;
// var newUserTemplate;

//Compile all templates on document ready for Events

(function() {
  var eventListTemplateSource = $("#event-list-template").html();
  eventListTemplate = Handlebars.compile(eventListTemplateSource);

  var individualEventTemplateSource = $("#individual-event-template").html();
  individualEventTemplate = Handlebars.compile(individualEventTemplateSource);

  // var editEventTemplateSource = $("#edit-event-template").html();
  // editEventTemplate = Handlebars.compile(editEventTemplateSource);

  // var newEventTemplateSource = $("#new-event-template").html();
  // newEventTemplate = Handlebars.compile(newEventTemplateSource);
})();

//Compile all templates on document ready for Users
(function() {
  var loginTemplateSource = $("#login-template").html();
  loginTemplate = Handlebars.compile(loginTemplateSource);
})();

//we are setting up an event "collection" of users (Backbone does this)
var Users = Backbone.Collection.extend({
  url: "http://api.rsvp_app.dev/users.json"
});

// we are setting up an user "Model"
var Event = Backbone.Model.extend({
  urlRoot:"http://api.rsvp_app.dev/users"
});

///////////

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
    var event = new Event({
      id: id
    });
// grab things from database using backbone (fetch is backbone specific)
    event.fetch({
      success: function(){
        var html = individualEventTemplate({
                //gettig the event info and passing it in 
                eventInfo: event
              });
          $("#container").html(html);
          $("#container").trigger("create");
          } 
        });
  }
});

//Set up login View
var LoginView = Backbone.View.extend({
  el: "#container", 
  render: function() {
    var html = loginTemplate();
    $(this.el).html(html);
  },

  events: {
    "click #login_submit": "login_submit",
  },


  // Defining a login_submit function
  login_submit: function(event) {
    // $('#login_submit').submit(function(event){
      event.preventDefault();
      $.ajax({
          url: "http://api.rsvp_app.dev/users/login/",
          type: "POST",
          data: {

              username: "jangelroa",
              password: "b"

          } ,
          success: function(data) {
            // sessionStorage.setItem("auth_token", data.responseJSON.auth_token);
            // sessionStorage.setItem("user_id", data.responseJSON.id);
            router.navigate('', {trigger: true});
            // var html = loginTemplate({loginData: data});

            alert("User Log");
            console.log(data);
            // WORKING

            // $("#container").html(html);
          },
          error: function(jqXHR, textStatus, errorThrown) {
            alert("something went wrong login the user");
            // console.log(errorThrown);

            // THE USERNAME AND PASSWORD DONT MATCH
          }
        });

    // });
  }

});



//Set up a Create New Event View
// var NewEvent = Backbone.View.extend({
//   el: "#container",
//   render: function (){
//     var html = newEventTemplate();

//     $("#container").html(html);
//   },
//   // key value pair of the event object 
//   // "saveEvent" in quotes is backbone specific syntax for key value pairs
//   events: {
//     "click #submit-event": "saveEvent"
//   },
//   saveBook: function() {
//     var that = this; 
//     var book = new Book();
//     var bookInfo = {
//       title: $("#new-title").val(),
//       author: $("#new-author").val(),
//       release_date: $("#new-release").val(),
//       image: $("#new-image").val()
//     };
//       book.save(bookInfo, {
//         success: function() {
//             router.navigate("/", {
//               trigger: true
//             });
//             that.undelegateEvents();
//         }
//       });
//   }
// });

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
    "":"index",

    "edit/:id":"edit_event",
    "new":"new_event",
    "show_event/:id":"show_event",
    // "showPrivate/:id":"show_priv",
    "findEvents":"find_events",
    "add":"add_event",
    
    "invite/:id":"invite_guests",
    "showRSVP/:id":"show_rsvps",

    "login":"login",
    "login_submit": "login_submit",


    "editUser/:id":"edit-user",
    "newUser":"new_user",
    "showProfile/:id":"show_profile"

  },

  //Defining index route 
  index: function() {
    var eventlist = new EventList();
    eventlist.render();
  },
//Definining the show Individual Event Route
  show_event: function(id) {
  var showIndividualEvent = new ShowIndividualEvent();
  showIndividualEvent.render(id);
  }, 

//defining login route

  login: function() {
    var login = new LoginView();
    login.render();
    // var html = loginTemplate();

    // $("#container").html(html);
    // $("#container").trigger("create");

    // $('#login').submit(function(event){
    //   event.preventDefault();
    //   $.ajax({
    //       url: "http://api.rsvp_app.dev/users/login/",
    //       type: "POST",
    //       data: {

    //           username: "jangelroa",
    //           password: "a"

    //       } ,
    //       success: function(data) {
    //         sessionStorage.setItem("auth_token", data.responseJSON.auth_token);
    //         sessionStorage.setItem("user_id", data.responseJSON.id);
    //         router.navigate('index', {trigger: true});
    //         // var html = loginTemplate({loginData: data});

    //         alert("User Log");
    //         console.log(data);
    //         // WORKING

    //         // $("#container").html(html);
    //       },
    //       error: function(jqXHR, textStatus, errorThrown) {
    //         alert("something went wrong login the user");
    //         // console.log(errorThrown);

    //         // THE USERNAME AND PASSWORD DONT MATCH
    //       }
    //     });

    // });
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