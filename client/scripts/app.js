// stub out functions

var App = function() {
  this.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';

  this.message = {
    username: this.username,
    text: this.text,
    roomname: this.roomname
  }
};

App.prototype.init = function() {
  //var app = new App();
  this.fetch();
};
App.prototype.escapeString = function(string) {
  if(string) {
    return string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g,'&gt;');
  }
}
App.prototype.send = (message) => {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'Application/json',
    success: function (data) {
      console.log('chatterbox: Message sent', data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

App.prototype.fetch = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'GET',
    data: 'order=-createdAt&limit=100',
    success: function (data) {
    App.prototype.renderMessage.call(app, data);
    // this.renderMessage(data)
      console.log('chatterbox: Message received', data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to recieve message', data);
    }
  });
};

App.prototype.clearMessages = function() {

};

App.prototype.renderMessage = function(data) {
  //input is an object with an array of objects
  var rooms = [];
  //output should be messages appended to the chats div
  //get the actual messages from the object
  var messages = data.results
  //loop over all of them
  for (var i = 0; i < messages.length; i++) {
    if(!rooms.includes(messages[i].roomname)){
    rooms.push(messages[i].roomname)
  }
    //create the message for the text
    var messageFormatted = '<p class="username">' + this.escapeString(messages[i].username) +  '</p>' + this.escapeString(messages[i].text);
    // console.log(messages[i].username)
    //we need to wrap them in chats divs
    $("#chatsList").append('<div class="chat">' + messageFormatted + '</div>');
    //make html/dom container
  }
  rooms.forEach(function(room) {
    $("#rooms").append('<option>' + room + '</option>')
  })
  //$ chat div
};

App.prototype.renderRoom = function(data) {
  //create an array to hold our possible rooms from data
  //loop thourgh the obj in data
  //grab the roomname from each
  //check for duplicate room names before adding
  //push them into the array
  //wrap each string in an option tag
  //to append to the select

};

App.prototype.handleUsernameClick = function() {

};


var app = new App();
app.init();
// console.log(app);

$(document).ready(function() {
  $(document).on('click','#submit', function(e) {
    e.preventDefault();
    // app.message.text = $(document).find('#messageText').val();
    app.message.text = $('#messageText').val();
    app.message.username = window.location.search.slice(10, window.location.search.length );

    console.log($('#messageText').val())
    app.send(app.message);
    // App.prototype.send(message);
    // this.send(this.message);
  })
})
