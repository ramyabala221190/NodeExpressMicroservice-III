import mongoose, { Document } from "mongoose";

//interface that models the schema
export interface UserDocument extends Document{
  _id: mongoose.Types.ObjectId,
  lastLoggedIn: Date,
  loginAttempts: Date[],
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}

const userSchema = new mongoose.Schema({
  id: {type:Number,required:true},
  lastLoggedIn: {type:Date,required:true},
  loginAttempts: {type:Array<Date>,required:true},
  name: {type:String,required:true},
  username: {type:String,required:true},
  email: {type:String,required:true},
  address: {
    street: {type:String,required:true},
    suite: {type:String,required:true},
    city: {type:String,required:true},
    zipcode: {type:String,required:true},
    geo: {
      lat: {type:String,required:true},
      lng: {type:String,required:true}
    }
  },
  phone: {type:String,required:true},
  website: {type:String,required:true},
  company: {
    name: {type:String,required:true},
    catchPhrase: {type:String,required:true},
    bs: {type:String,required:true}
  }
})

export default mongoose.model<UserDocument>("User", userSchema); //collection name will be carts i.e plural lowercase of model name