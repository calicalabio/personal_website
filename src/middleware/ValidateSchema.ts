import Joi, { ObjectSchema } from "joi";
import { NextFunction, Response, Request } from "express";
import Logging from "../library/Logging";
import { IMessage } from '../models/Message';

export const ValidateSchema = (schema : ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            Logging.error(error);
            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    message: {
        create: Joi.object<IMessage>({
            author: Joi.string().required(),
            content: Joi.string().required()
        }),
        update: Joi.object<IMessage>({
            author: Joi.string().required(),
            content: Joi.string().required()
        })
    }
};