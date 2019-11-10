import bodyParser from 'body-parser';
import express from 'express';
import socket from 'socket.io';

import {
    UserCtrl,
    DialogsCtrl,
    MessagesCtrl
} from '../controllers';

import { LastSeen, checkAuth } from '../middleware';
import { loginValidation } from '../helpers/validations';


const createRoutes = (app: express.Express, io: socket.Server) => {

    const UserController = new UserCtrl(io);
    const DialogsController = new DialogsCtrl(io);
    const MessagesController = new MessagesCtrl(io);

    app.use(bodyParser.json())
    app.use(LastSeen);
    app.use(checkAuth);

    app.get("/user/me", UserController.getMe)//-----------Routs--------------
    app.get("/user/:id", UserController.show)
    app.post("/user/registration", UserController.create)
    app.delete("/user/:id", UserController.delete)
    app.post("/user/login", loginValidation, UserController.login)

    app.get("/dialogs", DialogsController.index)
    app.post("/dialogs", DialogsController.create)
    app.delete("/dialogs/:id", DialogsController.delete)

    app.get("/messages", MessagesController.index)
    app.post("/messages", MessagesController.create)
    app.delete("/messages/:id", MessagesController.delete)
}

export default createRoutes;
