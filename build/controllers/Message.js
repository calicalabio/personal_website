"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Message_1 = __importDefault(require("../models/Message"));
const createMessage = (req, res, next) => {
    const message = new Message_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        content: req.body.content,
        author: req.body.author || req.socket.remoteAddress
    });
    return message.save()
        .then((message) => res.status(201).json({ message }))
        .catch((error) => res.status(500).json({ error }));
};
const readMessage = (req, res, next) => {
    const messageId = req.params.messageId;
    return Message_1.default.findById(messageId)
        .then((message) => message ? res.status(200).json({ message }) : res.status(404).json({ message: 'Message not found' }))
        .catch((error) => res.status(500).json({ error }));
};
const readAll = (req, res, next) => {
    return Message_1.default.find()
        .then((messages) => res.status(200).json({ messages }))
        .catch((error) => res.status(500).json({ error }));
};
const updateMessage = (req, res, next) => {
    const messageId = req.params.messageId;
    return Message_1.default.findById(messageId)
        .then((message) => {
        if (message) {
            message.set(req.body);
            return message.save()
                .then((message) => res.status(201).json({ message }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'Message not found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteMessage = (req, res, next) => {
    const messageId = req.params.messageId;
    return Message_1.default.findByIdAndDelete(messageId)
        .then((message) => (message ? res.status(201).json({ message: 'Deleted message' }) : res.status(404).json({ message: 'Message not found' })))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createMessage, readMessage, readAll, updateMessage, deleteMessage };
