// YOUR CODE HERE:
// http://parse.sfm8.hackreactor.com/ 

var app = {server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages'};

app.init = function() {
  app.fetch(this.server + '?where={"createdAt":{"$gte":{"__type":"Date","iso":"2018-01-01T18:02:52.249Z"}}}');
};

app.send = function(messageObj) {
  $.ajax(
    {
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'POST',
      data: JSON.stringify(messageObj),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    }
  );
};

app.fetch = function(url) {
  $.ajax(
    {
      // This is the url you should use to communicate with the parse API server.
      url: url || this.server,
      type: 'GET',
      success: function (data) {      
        _.each(data.results, function(messageObj) {
          app.renderMessage(messageObj);
        });
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to retrieve data', data);
      }
    }
  );
};
 
app.clearMessages = function() {
  $('#chats').html('');
};

app.renderMessage = function(messageObj) {
  var $node = $('<div class="chat"><div class="username"></div><div class="text"></div></div>');
  // add username
  $node.find('.username').text(messageObj.username);
  $node.find('.text').text(messageObj.text);
  // add message 
  $('#chats').append($node);
};

app.renderRoom = function(room) {
  var $room = $('<option></option>');
  $room.text(room);
  $('#roomSelect').append($room);
};

app.handleUsernameClick = function() {
  
};

$(document).on('click', '.username', function(event) {
  app.handleUsernameClick();
});

app.handleSubmit = function() {
  var messageObj = {};
  // set username
  messageObj.username = location.search.slice(10);
  // set text
  messageObj.text = $('#message').val();
  // set roomname
  messageObj.roomname = 'lobby';
  console.log(messageObj);
  
  app.renderMessage(messageObj)
  app.send(messageObj);
};

$( "#target" ).submit(function( event ) {
  alert( "Handler for .submit() called." );
  event.preventDefault();
});

$(document).on('click', '#send', function(event) {
    app.handleSubmit();
});

// why doesn't   this work?
// $('#send').on('submit', function(event) {
//   app.handleSubmit();
// });

app.init();
