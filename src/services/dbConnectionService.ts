import { CustomError } from "../app";
import { usersList } from "../data/seedData";
import dbClient from "../dbClient";
import userModel, { UserDocument } from "../models/userModel";

export async function connectToDb(){
    try{
    await dbClient.connect();
    }
    catch(err){
       throw new CustomError("Error connecting to DB",500);
    }
}

export async function loadUsers(){
    //adding data this way so that schema is respected.
    try{
        const users:UserDocument[]= await userModel.find({});
        if(!users.map(x=>x.toObject()).length){
        console.log("no users in collection. loading from file");
        await userModel.deleteMany({}); //delete any before adding new
        await userModel.create(usersList); //create runs validation as well
        }
        }
   catch(err){
           console.log(err);
           throw new CustomError("Loading products to DB",500);
    }
}
