import express from 'express';
import socket from 'socket.io';

import { DialogsModel, MessagesModel } from '../models';


class DialogsController {

    io: socket.Server;

    constructor(io: socket.Server) {
        this.io = io;
    }

    index = (req: any, res: express.Response) => {
        const authorId = req.user._id;

        DialogsModel.
            find({ author: authorId })
            .populate(['author', 'partner'])
            .populate({
                path: 'lastMessage',
                populate: {
                    path: 'user',
                }
            })
            .exec(function (err, dialogs) {
                if (err) {
                    return res.status(404).json({
                        message: 'Dialogs not found'
                    });
                }
                return res.json(dialogs);
            })
    }

    create = (req: express.Request, res: express.Response) => {
        const postData = {
            author: req.body.author,
            partner: req.body.partner,
        }
        const dialogs = new DialogsModel(postData);
        dialogs
            .save()
            .then((dialogObj: any) => {
                const messages = new MessagesModel({
                    text: req.body.text,
                    user: req.body.author,
                    dialog: dialogObj._id
                })

                messages
                    .save()
                    .then(() => {
                        res.json(dialogObj)
                    })
                    .catch(reason => {
                        res.json(reason)
                    });
            })
            .catch(reason => {
                res.json(reason)
            });
    }

    delete = (req: express.Request, res: express.Response) => {
        const id: string = req.params.id;
        DialogsModel.findOneAndRemove({ _id: id })
            .then(dialogs => {
                if (dialogs) {
                    res.json({
                        message: `Dialog deleted`
                    });
                }
            })
            .catch(() => {
                res.json({
                    message: `Dialog not found`
                });
            });
    }
}

export default DialogsController;