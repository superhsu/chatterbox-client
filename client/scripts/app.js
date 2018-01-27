// YOUR CODE HERE:
// http://parse.sfm8.hackreactor.com/ 

var app = {server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages'};
// '?where={"createdAt":{"$gte":{"__type":"Date","iso":"2018-01-01T18:02:52.249Z"}}}

app.init = function() {
  $.ajax(
    {
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      data: {order: '-createdAt'},
      success: function (data) {
        var rooms = ['lobby'];      
        _.each(data.results, function(messageObj) {
          var room = messageObj.roomname;
          if (!rooms.includes(room) && room !== '') {
            rooms.push(room);
          }
          
          app.renderMessage(messageObj);  
        });
        
        // for every rooms el, push <option> onto DOM
        for (var i = 0; i < rooms.length; i++) {
          app.renderRoom(rooms[i]);
        }
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to retrieve data', data);
      }
    }
  );
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

app.fetch = function(whereObj) { 
  $.ajax(
    {
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      data: {order: '-createdAt', where: whereObj},
      success: function (data) {     
        _.each(data.results, function(messageObj) {
          app.renderMessage(messageObj);  
        });
        
        // for every rooms el, push <option> onto DOM
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

app.handleSubmit = function() {
  var messageObj = {};
  // set username
  messageObj.username = location.search.slice(10);
  // set text
  messageObj.text = $('#message').val();
  // set roomname
  messageObj.roomname = 'lobby';
  console.log(messageObj);
  
  app.renderMessage(messageObj);
  app.send(messageObj);
};

$(document).ready(function() {
  $(document).on('click', '#send', function(event) {
    app.handleSubmit();
  });


  $('#roomSelect').change(function() {
    // app.fetch only messages with roomname = what was selected
    app.clearMessages();
    var room = $( 'select option:selected' ).text();
    app.fetch({roomname: room});
    
    
    // clear messages 
    // render messages with roomname = room
    // app.fetch(room)  
  });
  
  $(document).on('click', '.username', function(event) {
    app.handleUsernameClick();
  });
});

// INITIALIZE
app.init();

