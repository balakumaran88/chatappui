const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
var server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const {db} = require('./config/db')



io.on('connection', (socket) => {
    console.log('one user connected', socket.id)
    socket.on('join',(data) => {
        socket.join(data.room)
        console.log(`${data.user} has joined the ${data.room}` )
        socket.broadcast.to(data.room).emit('user', {user: data.user, message: "has joined the room"})
    })

    socket.on('leave',(data) => {
        console.log(`${data.user} has left the ${data.room}` )
        socket.broadcast.to(data.room).emit('left', {user: data.user, message: "has left the room"})
        socket.leave(data.room)
    })

})



app.use(bodyParser.json())
const routes = require('./routes')
  
app.use(cors({credentials:false, origin: 'http://localhost:4200'}))
//using cross browser compatability

//configuring routes
app.use('/api', routes)






server.listen(3001, (err, resp) => {
    console.log('server is running on port 3001')
})