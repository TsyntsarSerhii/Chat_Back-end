import express from 'express';

import { DialogsModel } from '../models';


class DialogsController {

    index(req: express.Request, res: express.Response) {
        const authorId: string = req.params.id;

        DialogsModel.
            find({ author: authorId }).
            populate(['author', 'partner']).
            exec(function (err, dialogs) {
                if (err) {
                    return res.status(404).json({
                        message: 'Dialogs not found'
                    });
                }
                return res.json(dialogs);
            })
    }

    create(req: express.Request, res: express.Response) {
        const postData = {
            author: req.body.author,
            partner: req.body.partner,
        }
        const dialogs = new DialogsModel(postData);
        dialogs
            .save()
            .then((obj: any) => {
                res.json(obj);
            }).catch(reason => {
                res.json(reason)
            })
    }

    // show(req: express.Request, res: express.Response) {
    //     const id: string = req.params.id;
    //     DialogsModel.findById(id, (err, user) => {
    //         if (err) {
    //             return res.status(404).json({
    //                 message: 'Not found'
    //             });
    //         }
    //         res.json(user)
    //     })
    // }
}

export default DialogsController;