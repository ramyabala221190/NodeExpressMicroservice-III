import express from "express";
import userController from "../controllers/userController";

const userRouter= express.Router();


userRouter.route('/user/:userName')
.get(userController.getUserDetail);

userRouter.route('/login')
.post(userController.userLogin)


export default userRouter;