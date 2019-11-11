import socket from 'socket.io';
import http from 'http';


export default (http: http.Server) => {
    const io = socket(http);  // soket server

    io.on('connection', function (socket: socket.Socket) {
        console.log('Connected!');
    });
    return io;
}

//move socket logic to a separate file, 