let users = [];
let admins = [];

var sockets = {},
  ananomUsers = {},
  boyStrangerQueue = [],
  girlStrangerQueue = [];

  const getAnanomUser = (socketId) => {
    console.log(users);
    return users.find((user) => user.socketId === socketId);
}; 

console.log("jshkjdsfh")

const SocketServer = (socket) => {
  console.log(socket.id)
  sockets[socket.id] = socket;
  ananomUsers[socket.id] = {
    connectedTo: -1,
    isTyping: false,
  };

  //#region //!Connection
  socket.on("joinUser", (id) => {
    users.push({ id, socketId: socket.id });
  });

  
  socket.on("joinAdmin", (id) => {
    admins.push({ id, socketId: socket.id });
    const admin = admins.find((admin) => admin.id === id);
    let totalActiveUsers = users.length;

    socket.to(`${admin.socketId}`).emit("activeUsers", totalActiveUsers);
  });

  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    admins = admins.filter((user) => user.socketId !== socket.id);
  });

  //#endregion

  //#region //!Like
  socket.on("likePost", (newPost) => {
    let ids = [...newPost.user.followers, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));
    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("likeToClient", newPost);
      });
    }
  });

  socket.on("unLikePost", (newPost) => {
    let ids = [...newPost.user.followers, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));
    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("unLikeToClient", newPost);
      });
    }
  });

  socket.on("disLikePost", (newPost) => {
    let ids = [...newPost.user.followers, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));
    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("disLikeToClient", newPost);
      });
    }
  });

  socket.on("unDisLikePost", (newPost) => {
    let ids = [...newPost.user.followers, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));
    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("unDIsLikeToClient", newPost);
      });
    }
  });
  //#endregion

  //#region //!comment
  socket.on("createComment", (newPost) => {
    console.log(socket.id, "createcomment");
    let ids = [...newPost.user.followers, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));
    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("createCommentToClient", newPost);
      });
    }
  });

  socket.on("deleteComment", (newPost) => {
    let ids = [...newPost.user.followers, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));
    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("deleteCommentToClient", newPost);
      });
    }
  });
  //#endregion

  //#region //!follow

  socket.on("follow", (newUser) => {
    const user = users.find((user) => user.id === newUser._id);
    user && socket.to(`${user.socketId}`).emit("followToClient", newUser);
  });

  socket.on("unFollow", (newUser) => {
    const user = users.find((user) => user.id === newUser._id);
    user && socket.to(`${user.socketId}`).emit("unFollowToClient", newUser);
  });
  //#endregion

  //#region //!match

  socket.on("requestmatch", (newUser) => {
    console.log(newUser, "requestmatch")
    const user = users.find((user) => user.id === newUser);
    console.log(user.id, "userId");
    user && socket.to(`${user.socketId}`).emit("requestmatchToClient", newUser);
  });

  socket.on("makematch", (sender, receiver) => {
    const user = users.find((user) => user.id === sender);
    user && socket.to(`${user.socketId}`).emit("makeMatchToClient", sender);
  });

  socket.on("removematch", (newUser) => {
    const user = users.find((user) => user.id === newUser._id);
    user && socket.to(`${user.socketId}`).emit("removeMatchToClient", newUser);
  });

  socket.on("rejectmatch", (sender, receiver) => {
    const user = users.find((user) => user.id === sender);
    user && socket.to(`${user.socketId}`).emit("rejectMatchToClient", sender);
  });
  //#endregion

  //#region //!Notifications

  socket.on("createNotify", (msg) => {
    const clients = users.filter((user) => msg.recipients.includes(user.id));
    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("createNotifyToClient", msg);
      });
    }
  });

  socket.on("removeNotify", (msg) => {
    const clients = users.filter((user) => msg.recipients.includes(user.id));
    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("removeNotifyToClient", msg);
      });
    }
  });

  //#endregion

  socket.on("getActiveUsers", (id) => {
    const admin = admins.find((user) => user.id === id);
    const totalActiveUsers = users.length;

    socket
      .to(`${admin.socketId}`)
      .emit("getActiveUsersToClient", totalActiveUsers);
  });

  //#region //!Messages

  socket.on("addMessage", (msg) => {
    console.log(msg)
    const user = users.find((user) => user.id === msg.recipient);
    user && socket.to(`${user.socketId}`).emit("addMessageToClient", msg);
  });

  //#endregion

  // for ananomous connection

  // Got data from someone
  socket.on("new", function (sex, googleId) {
    console.log("i am here");
    console.log(googleId);
    console.log(sex);
    if (sex === "BOY") {
      if (girlStrangerQueue.length > 0) {
        ananomUsers[socket.id].connectedTo = girlStrangerQueue[0];
        console.log(ananomUsers[socket.id].connectedTo, "jbdjbfjdbjfkdj");
        ananomUsers[girlStrangerQueue[0].socketId].connectedTo = {
          socketId: socket.id,
          googleId: googleId,
        };
        ananomUsers[socket.id].isTyping = false;
        ananomUsers[girlStrangerQueue[0].socketId].isTyping = false;
        socket.emit("conn", {
          id: ananomUsers[socket.id].connectedTo.socketId,
          ownId: socket.id,
          googleId: ananomUsers[socket.id].connectedTo.googleId,
        });
        sockets[girlStrangerQueue[0].socketId].emit("conn", {
          code: 1,
          bcode: 1,
          text: "You are now chatting with a Stranger!",
          id: ananomUsers[girlStrangerQueue[0].socketId].connectedTo.socketId,
          ownId: ananomUsers[socket.id].connectedTo.socketId,
          googleId:
            ananomUsers[girlStrangerQueue[0].socketId].connectedTo.googleId,
        });
        socket.emit("waiting", {
          bcode: 1,
          code: 1,
          text: "You are now chatting with a Stranger!",
        });
        girlStrangerQueue.splice(0, 1);
      } else {
        boyStrangerQueue.push({
          socketId: socket.id,
          googleId: googleId,
        });
        socket.emit("waiting", {
          code: 2,
          bcode: 2,
          text: "Hold up, we are searching for someone to chat",
        });
      }
    } else {
      if (boyStrangerQueue.length > 0) {
        console.log(boyStrangerQueue[0]);
        ananomUsers[socket.id].connectedTo = boyStrangerQueue[0];
        ananomUsers[boyStrangerQueue[0].socketId].connectedTo = {
          socketId: socket.id,
          googleId: googleId,
        };
        ananomUsers[socket.id].isTyping = false;
        ananomUsers[boyStrangerQueue[0].socketId].isTyping = false;
        socket.emit("conn", {
          id: ananomUsers[socket.id].connectedTo.socketId,
          ownId: socket.id,
          googleId: ananomUsers[socket.id].connectedTo.googleId,
        });
        sockets[boyStrangerQueue[0].socketId].emit("conn", {
          code: 1,
          bcode: 1,
          text: "You are now chatting with a Stranger!",
          id: ananomUsers[boyStrangerQueue[0].socketId].connectedTo.socketId,
          ownId: ananomUsers[socket.id].connectedTo.socketId,
          googleId:
            ananomUsers[boyStrangerQueue[0].socketId].connectedTo.googleId,
          senderId: socket.id,
        });
        socket.emit("waiting", {
          bcode: 1,
          code: 1,
          text: "You are now chatting with a Stranger!",
        });
        boyStrangerQueue.slice(0, 1);
      } else {
        girlStrangerQueue.push({
          socketId: socket.id,
          googleId: googleId,
        });
        socket.emit("waiting", {
          code: 2,
          bcode: 2,
          text: "Hold up, we are searching for someone to chat",
        });
      }
    }
  });

  socket.on("typing", (isTyping) => {
    if (
      ananomUsers[socket.id].connectedTo !== -1 &&
      sockets[ananomUsers[socket.id].connectedTo.socketId]
    ) {
      ananomUsers[socket.id].isTyping = isTyping;
      sockets[ananomUsers[socket.id].connectedTo.socketId].emit(
        "istyping",
        isTyping
      );
    }
  });

  socket.on("sendAnanomMessage", (message) => {
    if (
      ananomUsers[socket.id].connectedTo !== -1 &&
      sockets[ananomUsers[socket.id].connectedTo.socketId]
    ) {
      const user = getAnanomUser(message.receieverSocketID);
      sockets[ananomUsers[socket.id].connectedTo.socketId].emit(
        "getAnanomMessage",
        message
      );
      // sockets[socket.id].emit("getAnanomMessage", message);

      // console.log(message.receieverSocketID, "anananan");
      console.log(message);
      // console.log(user);
      // sockets[user.socketId].emit("getAnanomMessage", message);
    }
  });

  socket.on("disconn", function () {
    var connTo = ananomUsers[socket.id].connectedTo;
    let index = 0;
    boyStrangerQueue.map((boy) => {
      if (boy.socketId === socket.id || boy.socketId === connTo.socketId) {
        boyStrangerQueue.splice(index, 1);
      }
      index++;
    });
    let girlIndex = 0;
    girlStrangerQueue.map((girl) => {
      if (girl.socketId === socket.id || girl.socketId === connTo.socketId) {
        girlStrangerQueue.splice(girlIndex, 1);
      }
      girlIndex++;
    });

    ananomUsers[socket.id].connectedTo = -1;
    ananomUsers[socket.id].isTyping = false;
    if (sockets[connTo.socketId]) {
      ananomUsers[connTo.socketId].connectedTo = -1;
      ananomUsers[connTo.socketId].isTyping = false;
      sockets[connTo.socketId].emit("disconn", {
        who: 2,
        text: "Stranger has left the chat",
        bcode: 3,
        code: 3,
      });
    }
    socket.emit("disconn", {
      who: 1,
      bcode: 3,
      code: 3,
      text: "You have left the chat",
    });
  });

  socket.on("disconnect", (err) => {
    console.log("User has disconnected" + socket.id);

    var connTo = ananomUsers[socket.id] && ananomUsers[socket.id].connectedTo;
    if (connTo === undefined) {
      connTo = -1;
    }
    if (connTo !== -1 && sockets[connTo.socketId]) {
      sockets[connTo.socketId].emit("disconn", {
        bcode: 3,
        code: 3,
        who: 2,
        reason: err && err.toString(),
        id: ananomUsers[socket.id].connectedTo.socketId,
        googleId: ananomUsers[socket.id].connectedTo.googleId,
        text: "Stranger has left the chat",
      });
      socket.emit("disconn", {
        who: 1,
        bcode: 3,
        code: 3,
        text: "You have left the chat",
      });
      ananomUsers[connTo.socketId].connectedTo = -1;
    }

    delete sockets[socket.id];
    delete ananomUsers[socket.id];

    let index = 0;
    boyStrangerQueue.map((boy) => {
      if (boy.socketId === socket.id || boy.socketId === connTo.socketId) {
        boyStrangerQueue.splice(index, 1);
      }
      index++;
    });
    index = 0;
    girlStrangerQueue.map((girl) => {
      if (girl.socketId === socket.id || girl.socketId === connTo.socketId) {
        girlStrangerQueue.splice(index, 1);
      }
      index++;
    });
  });
}


module.exports = SocketServer;