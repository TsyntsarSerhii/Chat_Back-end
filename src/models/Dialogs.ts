import mongoose, { Schema, Document } from 'mongoose';
import { isEmail } from 'validator';


export interface IDialogs extends Document {
    author: {
        type: Schema.Types.ObjectId;
        ref: string;
        require: true;
    };
    partner: {
        type: Schema.Types.ObjectId;
        ref: string;
        require: true;
    };
    lastMessage: {
        type: Schema.Types.ObjectId;
        ref: string;
    };
}

const DialogsSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: "User" },
    partner: { type: Schema.Types.ObjectId, ref: "User" },
    lastMessage: { type: Schema.Types.ObjectId, ref: "Messages" },
},
    {
        timestamps: true
    }
);

const DialogsModel = mongoose.model<IDialogs>('Dialogs', DialogsSchema);

export default DialogsModel;