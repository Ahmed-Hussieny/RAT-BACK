import { Schema, model } from "mongoose";
import { systemRoles } from "../../src/utils/system-roles.js";

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:20,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8
    }
},{
    timestamps:true
})

const User= model('User',userSchema)
export default User;