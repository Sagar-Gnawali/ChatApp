const express = require('express');
const port = 8099;
const app = express();
const socket = require('socket.io');
app.use(express.static('Public'));
app.get('/', (req, res, next) => {
    res.json({
        msg: 'this is from node '
    })
})

app.use((req, res, next) => {
    res.json({
        msg: 'Invalid url',
        status: 400
    })
})
let server = app.listen(port, (error, done) => {
    if (error) {
        console.log("OOPS! Something went wrong while listening to the server.")
    } else {
        console.log(`Server is listening and at port no ${port}`)
    }
});

// Socket setup 
var io = socket(server);
io.on('connection', (socket) => {
    console.log('Socket connection made done ', socket.id);
    socket.on('chat', function (data) {
        console.log("data in server is >>", data);
        io.sockets.emit('chat', data);
        socket.on('typing',(name)=>{
            console.log('persone name is ',name);
            socket.broadcast.emit('typing',name);
        });

    })
})
io.emit('connection');