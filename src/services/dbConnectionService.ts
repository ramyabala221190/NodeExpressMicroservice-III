import { CustomError } from "../app";
import dbClient from "../dbClient";

export async function connectToDb(){
    try{
    await dbClient.connect();
    }
    catch(err){
       throw new CustomError("Error connecting to DB",500);
    }
}
