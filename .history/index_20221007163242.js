const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const amqp = require("amqplib/callback_api");
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
// io.on('connection',(socket)=>{
//     console.log("user connect");
//     socket.on('on-chat',data=>{
//         //console.log(data);
//        io.emit('user-chat',data);

//     })
// })

amqp.connect("amqp://localhost", (connError, connection) => {
  if (connError) {
    throw connError;
  }
  // Step 2: Create Channel
  connection.createChannel((channelError, channel) => {
    if (channelError) {
      throw channelError;
    }
    // Step 3: Assert Queue
    const QUEUE = "messagee";
    channel.assertQueue(QUEUE);
    // Step 4: Send message to queue
  //  channel.sendToQueue(QUEUE, Buffer.from("hello its coding time"));

    io.on("connection", (socket) => {
      console.log("user connect");
      socket.on("on-chat", (data) => {
     //   console.log(data.name+" : "+data.message);
        channel.sendToQueue(QUEUE, Buffer.from(data.name+" : "+data.message));
        channel.consume(QUEUE, (msg) => {
            console.log(`Message received: ${msg.content.toString()}`)
        }, {
            noAck: true
        })
       

      //  io.emit("user-chat", data);
      });
    });

    console.log(`Message send ${QUEUE}`);
  });
});

server.listen(3000, () => {
  console.log("listen poxrt 3000");
});
