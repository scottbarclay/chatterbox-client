// stub out functions

var App = function() {
  this.server = 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages';

  this.message = {
    username: this.username,
    text: this.text,
    roomname: this.roomname
  }
  this.friends = [];
};

App.prototype.init = function() {
  // setInterval(function(){
  //   App.prototype.fetch.call(app)
  // }, 500)
   App.prototype.fetch.call(app)

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
      App.prototype.fetch.call(app)
      console.log('chatterbox: Message sent', data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

App.prototype.fetch = function(friends) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'GET',
    data: 'order=-createdAt&limit=1000',
    success: function (data) {
    App.prototype.renderMessage.call(app, data, friends);
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
  $(".chat").remove()
};

App.prototype.renderMessage = function(data, friends) {
  if(friends !== undefined) {
      var messages = data.results
    for (var i = 0; i < messages.length; i++) {
      if(friends.includes(messages[i].username)){
    if($("#rooms option:selected").text() === messages[i].roomname){
      //create the message for the text
      var messageFormatted = '<p class="username"><a href="#">' + this.escapeString(messages[i].username) +  '</a></p>' + this.escapeString(messages[i].text);
      // console.log(messages[i].username)
      //we need to wrap them in chats divs
      $("#chatsList").append('<div class="chat">' + messageFormatted + '</div>');
      //make html/dom container
    }
  }
}
} else {
  //input is an object with an array of objects
  var rooms = [];
  //output should be messages appended to the chats div
  //get the actual messages from the object
  var messages = data.results
  //loop over all of them
  for (var i = 0; i < messages.length; i++) {
    // console.log(messages[i].roomname)
    if(!rooms.includes(messages[i].roomname)){
    rooms.push(messages[i].roomname)
  }
  if($("#rooms option:selected").text() === messages[i].roomname){
    //create the message for the text
    var messageFormatted = '<p class="username"><a href="#">' + this.escapeString(messages[i].username) +  '</a></p>' + this.escapeString(messages[i].text);
    // console.log(messages[i].username)
    //we need to wrap them in chats divs
    $("#chatsList").append('<div class="chat">' + messageFormatted + '</div>');
    //make html/dom container
  }
}

  rooms.forEach(function(room) {
    $("#rooms").append('<option>' + room + '</option>')
  })
  //$ chat div
}
};

App.prototype.renderRoom = function(data) {
  this.clearMessages();
  this.fetch();

};

App.prototype.renderFriends = function(array) {
  this.clearMessages();
  this.fetch(array);

}

App.prototype.handleUsernameClick = function() {

};


var app = new App();
app.init();
// console.log(app);

$(document).ready(function() {
  $(document).on('click','#submit', function(e) {
    // App.prototype.clearMessages();
    e.preventDefault();
    // app.message.text = $(document).find('#messageText').val();
    app.message.text = $('#messageText').val();
    app.message.username = window.location.search.slice(10, window.location.search.length );
    app.message.roomname = $("#rooms option:selected").text()
    app.clearMessages();
    // console.log($('#messageText').val())
    app.send(app.message);
    // App.prototype.send(message);
    // this.send(this.message);
    app.fetch();
  })
  $(document).on('click','#clear', function(e) {
    e.preventDefault();
    // app.message.text = $(document).find('#messageText').val();
    app.clearMessages();
  })
  $(document).on('change','#rooms', function(e) {
    e.preventDefault();
    // app.message.text = $(document).find('#messageText').val();
    app.renderRoom();
  })
  $(document).on('click','#addRoom', function(e) {
    e.preventDefault();
    app.message.text = $('#messageText').val();
    app.message.username = window.location.search.slice(10, window.location.search.length );
    app.message.roomname = $('#roomAdder').val()
    // console.log($('#roomAdder').val())
    app.send(app.message);
    app.fetch();
  })
  $(document).on('click','a', function(e) {

    app.friends.push($(e.target).text());
    // app.message.text = $(document).find('#messageText').val();
    console.log(app.friends)


  })
  $(document).on('change','#friends', function(e) {
    e.preventDefault();
    // app.message.text = $(document).find('#messageText').val();
    app.renderFriends(app.friends)

  })
})
