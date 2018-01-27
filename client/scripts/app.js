// stub out functions
var message = {
  username: this.username,
  text: this.text,
  roomname: this.roomname,
}

var App = function() {
  this.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';
};

App.prototype.init = function() {
  //var app = new App();

  this.fetch();
};

App.prototype.send = (message) => {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: message,
    contentType: 'Application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
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
    // data: data,
    success: function (data) {
    App.prototype.renderMessage.call(app, data);
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
  //output should be messages appended to the chats div
  //get the actual messages from the object
  var messages = data.results
  //loop over all of them
  for (var i = 0; i < messages.length; i++) {
    //create the message for the text
    var messageFormated = '<p class="username">' + messages[i].username +  '</p>' + messages[i].text;
    console.log(messageFormated)
    //we need to wrap them in chats divs
    $("#chatsList").append('<div class="chat">' + messageFormated + '</div>');
    //make html/dom container
  }
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

App.prototype.handleSubmit = function() {

};

var app = new App();
app.init();
// console.log(app);
