var eventListTemplate;
// var editEventTemplate;
// var newEventTemplate;

// var userTemplate;
// var editUseremplate;
// var newUserTemplate;

//Compile all templates on document ready

(function() {
  var eventListTemplateSource = $("#event-list-template").html();
  eventListTemplate = Handlebars.compile(eventListTemplateSource);

  // var editEventTemplateSource = $("#edit-event-template").html();
  // editEventTemplate = Handlebars.compile(editEventTemplateSource);

  // var newEventTemplateSource = $("#new-event-template").html();
  // newEventTemplate = Handlebars.compile(newEventTemplateSource);
})();

//we are setting up an event "collection" of events (Backbone does this)
var Events = Backbone.Collection.extend({
  url: "http://api.rsvp_app.dev/events"
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

            // $("#container").html(html);
            //alternative way to write the same code line above in javascript. 
            // that.$el.html(html);
            $("#container").html(html);
            $("#container").trigger("create");
        }
      });
    }
});

//Set up a New Book View
// var NewBook = Backbone.View.extend({
//   el: "#container",
//   render: function (){
//     var html = newBookTemplate();

//     $("#container").html(html);
//   },
//   // key value pair of the event object 
//   // "saveBook" in quotes is backbone specific syntax for key value pairs
//   events: {
//     "click #submit-book": "saveBook"
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
//   book.save(bookInfo, {
//     success: function() {
//       router.navigate("/", {
//         trigger :true
//       });
//       that.undelegateEvents();
//     }
//   });
// },
// deleteBook: function(event){
//   var that = this; 
//           // we need to instantiate the book with the id
//           var book = new Book({
//           id: event.target.id
//         });

// book.destroy ({
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
    "new":"new_event"
  },

  //Defining index route 
  index: function() {
    var eventlist = new EventList();
    eventlist.render();
  }
});

var router = new Router();

//Defining edit event route
// router.on("route:edit_event", function(id) {
//   //we are instantiate a new Event, specifically only one record and therefore, we have to pass in an id
//   var editevent = new EditEvent();
//     editevent.render(id);
//   });
  
// //Show new eventform
// router.on("route:new_event", function() {
//   var newevent= new NewEvent();
//   newevent.render();
  
// });

//Start the history

Backbone.history.start();