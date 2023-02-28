import express from "express"
import { userLogin, userLogout, userSignup } from "../controller/User.js";

const userRouter = express.Router();

userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);
userRouter.get("/logout", userLogout);

export default userRouter;