import { NextFunction, Request, Response } from "express";
import userService from "../services/userService";

class UserController{

 constructor(){
    console.log("UserController instantiated")
 } 
 
 async getUserDetail(req:Request,res:Response,next:NextFunction){
   try{
    const userName:string=req.params.userName as string;
    console.log(userName)
    let userDetail=await userService.getUserDetailService(userName);
    if(!userDetail){
      res.status(404).json({message:"User not found",userDetail:null});
      return;
    }
    res.status(200).json({message:"User Detail retrieved successfully",userDetail:userDetail})
   }
   catch(err){
    next(err);
   }
 }
}

export default new UserController();