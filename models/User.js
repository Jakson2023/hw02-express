import { handleSaveError, preUpdate } from "./hooks.js";
import { Schema, model } from "mongoose";
import Joi from "joi";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const userSchema = new Schema ({

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: emailRegex,
        unique: true
    },
    password:{
        type: String,
        minLength: 6,
        required: true
    },
   

   


},{versionKey:false});


userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", preUpdate);
userSchema.post("findOneAndUpdate", handleSaveError);

 export const userSignupSchema = Joi.object({
username: Joi.string().required(),
email: Joi.string().pattern(emailRegex).required(),
password: Joi.string().min(6).required()


})

export const userSigninSchema = Joi.object({

    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).required()
    
    
    })

    const User = model("user", userSchema);

    export default User;
    

