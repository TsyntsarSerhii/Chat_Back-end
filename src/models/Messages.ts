import mongoose, { Schema, Document } from 'mongoose';


export interface IMessages extends Document {
    text: {
        type: string;
        require: boolean;
    };
    dialog: {
        type: Schema.Types.ObjectId;
        ref: string;
        require: true;
    };
    unread: {
        type: boolean;
        default: boolean;
    };
}

const MessagesSchema = new Schema({
    text: { type: String, required: Boolean },
    dialog: { type: Schema.Types.ObjectId, ref: "Dialogs", require: true },
    user: { type: Schema.Types.ObjectId, ref: "User", require: true },
    unread: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true
    }
);

const MessagesModel = mongoose.model<IMessages>('Messages', MessagesSchema);

export default MessagesModel;