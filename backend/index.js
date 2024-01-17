const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const http = require('http');
const server = http.createServer(app);
const dotenv = require('dotenv');
dotenv.config();


const User = require('./models/user');

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


  //joining a room
  socket.on('join-room', (roomName, fname, lname, email) => {
    console.log('user'+ socket.id +'joining room:'+ roomName);
    createUser(socket, fname, lname, email, roomName, socket.id);
    socket.join(roomName);
  });


  //listening to message
  // socket.on('message', message => {
  //   console.log('message:'+ message + ' from:'+ socket.id);

  //   //brodcaste the message
  //   socket.broadcast.emit('brodcast-message', message);
  // });


  //listening to room message
  socket.on('room-message', (message, roomName) => {
    io.to(roomName).emit('new-message', message);
    // console logging for clearirity and debugging
    console.log(`message send by: ${socket.id} on roomName: ${roomName} and message is "${message}".`) 
  });

  // disconnect event.
  // socket.on('disconnect', async () => {
  //   console.log('user disconnected with id:' + socket.id);
  
  //   try {
  //     // Find and delete the user from the database based on their socket id
  //     const deletedUser = await deleteUserBySocketId(socket.id);
  //     console.log('User deleted!', deletedUser);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

});



//logic to delete the user when it leaves the room.

// async function deleteUserBySocketId(socketId) {
//   try {
//     // Find and delete the user based on their socket id
//     const deletedUser = await User.findOneAndDelete({ socketId });
//     return deletedUser;
//   } catch (error) {
//     throw error;
//   }
// }






//creating user function
async function createUser(socket, fname, lname, email, room) {
  try{
    const newUser = new User({
      fname,
      lname,
      email,
      room,
      socketId: socket.id,
    });

    const savedUser = await newUser.save();
    console.log('User created!', savedUser);
    return savedUser;

  }
  catch(error){
    console.log(error);
    throw error;
  }
}



mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    server.listen(3001, () => {
      console.log('listening on *:3001');
    });
  })
  .catch((error) => console.log(error));


