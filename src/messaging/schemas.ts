import Joi from "joi";

export const SendMessageSchema = Joi.object({
    channel: Joi.string().required(),
    message: Joi.string().required(),
    to: Joi.string().required(),
    isNotification: Joi.boolean()
});

export const MessageReceivedSchema = Joi.object({
    channel: Joi.string().required(),
    message: Joi.string().required(),
    from: Joi.string().required()
});