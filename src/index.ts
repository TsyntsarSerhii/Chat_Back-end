import express from 'express';
import socket from 'socket.io';
import dotenv from 'dotenv';
import { createServer } from 'http';

import './core/db';
import createRoutes from './core/routes';


const app = express()
const http = createServer(app);  // http server
const io = socket(http);  // soket server

dotenv.config();

createRoutes(app, io);

io.on('connection', function (socket) {
    console.log('Connected!');
    socket.emit('TEST_1', 'wwwwwwwwwwwwwwwww');
});

http.listen(process.env.PORT, function () {
    console.log(`Server: http://localhost:${process.env.PORT}`);
});