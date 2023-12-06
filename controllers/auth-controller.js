import User from "../models/User.js";
import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userUpdSubSchema from "../models/User.js";
import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";

const avatarsPath = path.resolve("public", "avatars");
const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const avatarURL = gravatar.url(email);

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    avatarURL,
    password: hashPassword,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};
const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).end();
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, req.body);
  res.json({
    message: "Subscription update",
  });
};

const updateAvatar = async (req, res) => {
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarsPath, filename);
  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("public", "avatars", filename);
  await User.findByIdAndUpdate(req.user._id, { avatarURL });

  res.json({
    message: "avatarURL:",
  });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
  updateSubscription,
  updateAvatar,
};
