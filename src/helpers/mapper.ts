import { UserModel } from "@ramyabala221190/api-contracts"
import { UserDocument } from "../models/userModel"

export function schemaToResponseMapper(user: UserDocument): UserModel {
    const userObj=user.toObject();
    return {
        ...userObj,
        ...{_id:userObj._id.toString()}
    }
}