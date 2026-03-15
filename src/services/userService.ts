import { CustomError, ExplicitError } from "../app";
import { schemaToResponseMapper } from "../helpers/mapper";
import userModel, { UserDocument } from "../models/userModel";
import {UserModel} from "@ramyabala221190/api-contracts";


class UserService {

  constructor() {
    console.log("instance for User Service created")
  }

  async loginService(username: string):Promise<UserModel> {
    try {
      if(!username){
        throw new ExplicitError("Username is not valid",400);
      }
      const date = new Date();
      const user: UserDocument | null = await userModel.findOneAndUpdate(
        {
          username: username
        },
        {
          $set: {
            lastLoggedIn: date
          },
          $push: {
            loginAttempts: {
              $each: [date],
              $slice: -3
            }
          }
        },
        {
          runValidators:true, //ensures validations are run, which are not run by default
          new: true //new ensures that the updated doc is returned
        }
      )
      if (user) {
        return schemaToResponseMapper(user);
      }
      else {
        throw new ExplicitError("User not found", 404);
      }
    }
    catch (err) {
      if (err instanceof ExplicitError) {
        throw err;
      }
      else {
        throw new CustomError("Error logging in", 500);
      }
    }
  }

  async getUserDetailService(username: string): Promise<UserModel> {
    try {
      const user: UserDocument | null = await userModel.findOne({ username: username });
      if (user) {
        return schemaToResponseMapper(user);
      }
      else {
        throw new ExplicitError("User not found", 404);
      }

    }
    catch (err) {
      if (err instanceof ExplicitError) {
        throw err;
      }
      else {
        throw new CustomError(`Error fetching user detail:${err}`, 500);
      }
    }
  }

}

export default new UserService();


