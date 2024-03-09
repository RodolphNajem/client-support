import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  
  email: string;
  firstName: string;
  lastName:string;
  password: string;
  isVIP:boolean;
  isAdmin: boolean;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName:{type:String,required:true},
  lastName:{type: String, required:true},
  password: { type: String, required: true },
  isVIP:{type:Boolean, default:false},
  isAdmin: { type: Boolean, default: false }
});

export default mongoose.model<IUser>('User', UserSchema);
