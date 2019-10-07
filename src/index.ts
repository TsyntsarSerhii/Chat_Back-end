import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';

import { UserController, DialogsController } from './controllers';


const app = express()

app.use(bodyParser.json())

const User = new UserController;  // Ctrl (controller)
const Dialogs = new DialogsController;

mongoose.connect("mongodb://localhost:27017/chat", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

app.get("/user/:id", User.show)  //Routs
app.delete("/user/:id", User.delete)
app.post("/user/registration", User.create)

app.get("/dialogs/:id", Dialogs.index)  //Routs
app.post("/dialogs", Dialogs.create)

app.listen(3000, function () {
    console.log(`Server: http://localhost:3000`);
});