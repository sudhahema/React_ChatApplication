//import express
const express = require('express')
const app = express()
const http = require("http")
//import cors 
var cors = require('cors')
//socket

const { Server } = require( "socket.io")

app.use(cors())

const server = http.createServer(app)

const io = new Server(server,{
    cors : {
        origin : "http://localhost:3000",
        methods : ["GET","POST"]
    },
});

//connection
io.on("connection",(socket)=>{
    console.log(`user connection : ${socket.id}`)
    
    socket.on("event" , (data) =>{
        socket.join(data);
        // console.log("id" , data)
    })
    //send 
    socket.on("send_message" , (data)=>{
    //receive     
    socket.to(data.id).emit("receive_message", data)
     
    })
    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id)
    })
})
//port
server.listen('3001',()=>{
    console.log("Server Running")
})


