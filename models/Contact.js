import { handleSaveError } from "./hooks.js";
import {Schema, model} from "mongoose";
import Joi from "joi";
const contactSchema = new Schema({

    name:{
        type: String,
        required:[true, 'Set name for contact'],
    },
    email: {
        type: String
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    }

},{versionKey: false})


contactSchema.post("save", handleSaveError);



export const contactsAddSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
  });
  
  export const contactsUpdateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.number(),
    favorite: Joi.boolean()
  });
  







const Contact = model("contact", contactSchema);

export default Contact;