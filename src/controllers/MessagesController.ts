import express from 'express';

import { MessagesModel } from '../models';


class MessagesController {

    index(req: express.Request, res: express.Response) {
        const dialogId: string = req.query.dialog;

        MessagesModel.
            find({ dialog: dialogId }).
            populate(['dialog']).
            exec(function (err, messages) {
                if (err) {
                    return res.status(404).json({
                        messages: 'Messages not found'
                    });
                }
                return res.json(messages);
            })
    }

    create(req: any, res: express.Response) {
        const userId = req.user._id;

        const postData = {
            text: req.body.text,
            dialog: req.body.dialog_id,
            user: userId
        };

        const messages = new MessagesModel(postData);

        messages
            .save()
            .then((obj: any) => {
                res.json(obj);
            }).catch(reason => {
                res.json(reason)
            })
    }

    delete(req: express.Request, res: express.Response) {
        const id: string = req.params.id;

        MessagesModel.findOneAndRemove({ _id: id })
            .then(messages => {
                if (messages) {
                    res.json({
                        messages: `Message deleted`
                    });
                }
            })
            .catch(() => {
                res.json({
                    messages: `Message not found`
                });
            });
    }
}

export default MessagesController;