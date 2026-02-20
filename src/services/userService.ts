import { CustomError } from "../app";
import userModel, { UserModel } from "../models/userModel";

class UserService   {

  constructor(){
    console.log("instance for User Service created")
  }

async getUserDetailService(username:string):Promise<UserModel|null>{
    try{
    return userModel.findOne({username:username});
    }
    catch(err){
       throw new CustomError(`Error fetching user detail:${err}`,500);
    }
}

}

export default new UserService();


