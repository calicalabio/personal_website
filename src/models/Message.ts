import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage {
    content: string;
    author: string;
}

export interface IMessageModel extends IMessage, Document {}

const MessageSchema: Schema = new Schema(
    {
        content: { type: String, required: true },
        author: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IMessageModel>('Message', MessageSchema)