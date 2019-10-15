import express from 'express';

import { UserModel } from '../models';


export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
    UserModel.findByIdAndUpdate(
        { _id: '5d9b61587730363d486dba8d' },
        {
            $set: {
                last_seen: new Date()
            }
        },
        { new: true },
        () => { }
    )
    next();
}