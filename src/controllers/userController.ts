import { NextFunction, Request, Response } from "express";
import userService from "../services/userService";
import {UserModel} from "@ramyabala221190/api-contracts";

class UserController {

  constructor() {
    console.log("UserController instantiated")
  }

  async userLogin(req: Request, res: Response, next: NextFunction) {
    try {
      let userDetail: UserModel = await userService.loginService(req.body.username);
      res.status(200).json({ message: "Login success", userDetail: userDetail })
    }
    catch (err) {
      next(err);
    }
  }

  async getUserDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const userName: string = req.params.userName as string;
        let userDetail:UserModel = await userService.getUserDetailService(userName);
        res.status(200).json({ message: "User Detail retrieved successfully", userDetail: userDetail })      
    }
    catch (err) {
      next(err);
    }
  }
}

export default new UserController();