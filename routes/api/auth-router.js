import express from "express";
import authController from "../../controllers/auth-controller.js";
import {isEmptyBody} from "../../middlewares/index.js"
// import { userSigninSchema, userSignupSchema } from "../../models/User.js";

const authRouter = express.Router();

authRouter.post("/signup", authController.signup);
authRouter.post ("/signin", authController.signin);
export default authRouter;