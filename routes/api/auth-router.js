import express from "express";
import authController from "../../controllers/auth-controller.js";
import {authenticate, isEmptyBody, upload} from "../../middlewares/index.js"
import { userEmailSchema, userSigninSchema, userSignupSchema } from "../../models/User.js";
import {validateBody} from "../../decorators/index.js"

const authRouter = express.Router();

authRouter.post("/register", validateBody(userSignupSchema), authController.signup);
authRouter.get ("/verify/:verificationToken",  authController.verify);
authRouter.post("/verify", isEmptyBody, validateBody(userEmailSchema),authController.resendVerify);
authRouter.post ("/login", validateBody(userSigninSchema), authController.signin);
authRouter.get ("/current", authenticate,authController.getCurrent);
authRouter.post("/logout", authenticate, authController.signout);
authRouter.patch("/", authenticate,authController.updateSubscription);
authRouter.patch("/avatars",upload.single("avatar"), authenticate, authController.updateAvatar)
export default authRouter;