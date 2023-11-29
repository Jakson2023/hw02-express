import express from "express";
import authController from "../../controllers/auth-controller.js";
import {authenticate} from "../../middlewares/index.js"
import { userSigninSchema, userSignupSchema } from "../../models/User.js";
import {validateBody} from "../../decorators/index.js"

const authRouter = express.Router();

authRouter.post("/register", validateBody(userSignupSchema), authController.signup);
authRouter.post ("/login", validateBody(userSigninSchema), authController.signin);
authRouter.get ("/current", authenticate,authController.getCurrent);
authRouter.post("/logout", authenticate, authController.signout)
export default authRouter;