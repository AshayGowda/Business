const io = require("socket.io")(3000, {
    cors: {
        origin: ["http://localhost:8080"]
    }
})

io.on("connection", socket => {
    console.log(socket.id)
    socket.on("send-message", (message, room) => {
        if(room === ''){
            socket.broadcast.emit('recieve-message', message)
        }else {
            socket.broadcast.to(room).emit('recieve-message', message)
        }
        
    })
    socket.on("join-room", room => {
        socket.join(room)
    })
})
