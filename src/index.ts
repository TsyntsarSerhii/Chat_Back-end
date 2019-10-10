import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';

import {
    UserController,
    DialogsController,
    MessagesController
} from './controllers';

import { LastSeen } from './middleware';

const app = express()

app.use(bodyParser.json())
app.use(LastSeen);

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

app.get("/dialogs", Dialogs.index)
app.post("/dialogs", Dialogs.create)
app.delete("/dialogs/:id", Dialogs.delete)

app.get("/messages", Messages.index)
app.post("/messages", Messages.create)
app.delete("/messages/:id", Messages.delete)

app.listen(3000, function () {
    console.log(`Server: http://localhost:3000`);
});