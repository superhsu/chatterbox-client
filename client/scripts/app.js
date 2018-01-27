// YOUR CODE HERE:
// http://parse.sfm8.hackreactor.com/ 

var app = {server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages'};

app.init = function() {
  // pull messages in lobby onto the DOM
  // go to server
  // find messages for lobby 
  // app.fetch('http://parse.sfm8.hackreactor.com/chatterbox/classes/messages') ?
  // app.renderMessage(messageObj) for all of them
  //debugger;
  // var requestObj = app.fetch('http://parse.sfm8.hackreactor.com/chatterbox/classes/messages/');
  // console.log('STORE TO VAR :', requestObj);
  // var results = requestObj.res
//   _.each(results, function(messponseJSON.results;
//     if (messageObj.roomname === 'lobby') {
//       app.renderMessage(messageObj);
//     }
//   });
  app.fetch(this.server);
};

app.send = function(messageObj) {
  $.ajax(
    {
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'POST',
      data: messageObj,
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
      url: this.server + '?where={"createdAt":{"$gte":{"__type":"Date","iso":"2018-01-01T18:02:52.249Z"}}}',
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
  
};

$(document).on('submit', '#send', function(event) {
  app.handleSubmit();
  // var messageObj = {};
  // // set username
  // messageObj.username = location.search.slice(10);
  // // set text
  // messageObj.text = $('#message').val();
  // // set roomname
  // messageObj.roomname = 'lobby';
  
  // app.send(messageObj);
});

// why doesn't   this work?
// $('#send').on('submit', function(event) {
//   app.handleSubmit();
// });

app.init();
