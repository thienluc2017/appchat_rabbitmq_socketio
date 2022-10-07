const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const {Server}=require('socket.io');
const amqp = require('amqplib/callback_api');
const io=new Server(server);
app.get("/", (req, res) => {
 res.sendFile(__dirname+"/index.html");
});
io.on('connection',(socket)=>{

    console.log("user connect");
    socket.on('on-chat',data=>{
       // console.log(data);
       io.emit('user-chat',data);
        
    })
})


//const amqp = require('amqplib/callback_api');
   

        const socket=;
        const name=prompt("ten ban la gi");
        const chatForm=document.querySelector('#chat-form');
        const chatMes=document.querySelector('#chat-mes');
        chatForm.addEventListener('submit',(e)=>{
            e.preventDefault();
            const message=chatMes.value;
            socket.emit('on-chat',{name, message});
            chatMes.value='';
            amqp.connect('amqp://localhost', (connError, connection) => {
    if (connError) {
        throw connError;
    }
    // Step 2: Create Channel
    connection.createChannel((channelError, channel) => {
        if (channelError) {
            throw channelError;
        }
        // Step 3: Assert Queue
        const QUEUE = 'chat'
        channel.assertQueue(QUEUE);
        // Step 4: Send message to queue
        channel.sendToQueue(QUEUE, Buffer.from('hello its coding time'));
        console.log(`Message send ${QUEUE}`);
    })
   })



        })








server.listen(3000,()=>{
    console.log("listen poxrt 3000");
})