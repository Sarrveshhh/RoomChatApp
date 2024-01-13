const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
      origin: '*', // Replace with your allowed origin
    }
});

app.use(express.static('public'));
app.use(cors());


// Logic of conection and message

//socket connection
io.on('connection', socket => {
  console.log('a user connected with id:'+ socket.id);
  
  //listening to message
  socket.on('message', message => {
    console.log('message:'+ message);

    //brodcaste the message
    socket.broadcast.emit('brodcast-message', message);
  });
});


server.listen(3001, () => {
  console.log('listening on *:3001');
});
