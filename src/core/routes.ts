import bodyParser from 'body-parser';

import {
    UserController,
    DialogsController,
    MessagesController
} from '../controllers';

import { LastSeen, checkAuth } from '../middleware';
import { loginValidation } from '../helpers/validations';


export default (app: any) => {

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


