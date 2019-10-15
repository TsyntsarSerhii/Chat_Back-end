import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import {
    UserController,
    DialogsController,
    MessagesController
} from './controllers';

import { LastSeen, checkAuth } from './middleware';


const app = express()
dotenv.config();

app.use(bodyParser.json())
app.use(LastSeen);
app.use(checkAuth);

const User = new UserController;  // Ctrl (controller)
const Dialogs = new DialogsController;
const Messages = new MessagesController;

mongoose.connect("mongodb://localhost:27017/chat", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

app.get("/user/:id", User.show)//-----------Routs--------------
app.post("/user/registration", User.create)
app.delete("/user/:id", User.delete)
app.post("/user/login", User.login)

app.get("/dialogs", Dialogs.index)
app.post("/dialogs", Dialogs.create)
app.delete("/dialogs/:id", Dialogs.delete)

app.get("/messages", Messages.index)
app.post("/messages", Messages.create)
app.delete("/messages/:id", Messages.delete)

app.listen(process.env.PORT, function () {
    console.log(`Server: http://localhost:${process.env.PORT}`);
});