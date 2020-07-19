const WebSocket = require("ws");
const wsConnection = new WebSocket.Server({port: 5501});

const clients = new Set();

class User {
  constructor(connection) {
    this.connection = connection;
    this._channels = new Set();
  }

  loginChannel(channelName) {
    this._channels.add(channelName);
  }

  logoutChannel(channelName) {
    this._channels.delete(channelName);
  }

  isLoggedIn(channelName) {
    return this._channels.has(channelName);
  }
}

function sendMessage(channelName, message) {
  for (let client of clients) {
    if (client.isLoggedIn(channelName)) {
      client.connection.send(message);
    }
  }
}

wsConnection.on("connection", ws => {
  const user = new User(ws);
  clients.add(user);

  user.connection.on("message", function (data) {
    const message = JSON.parse(data);

    switch (message.command) {
      case "login":
        user.name = message.username;
        user.loginChannel(message.channel);
        sendMessage(message.channel, `User ${message.username} is logged in ${message.channel}`);
        return;

      case "logout":
        if (user.isLoggedIn(message.channel)) {      
          sendMessage(message.channel, `User ${user.name} left the channel`);
          user.logoutChannel(message.channel);
          return;
        }
        user.connection.send('Log in please before logging out');
        return;

      case "sendMessage":
        if (user.isLoggedIn(message.channel)) {
          sendMessage(message.channel, `channel: ${message.channel},\n username: ${user.name},\n message: ${message.text}`);
          return;
        }

        user.connection.send('Log in please before sending messages');
        return;

      case "exitChat":
        ws.close();
        return;

      default:
        ws.send("Unknown command");
        return;
    }
  });

  user.connection.on("close", function () {
    clients.delete(user);
  });

});
