import { Schema, model } from "mongoose";

const USchema = new Schema({
    email :{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const U = model('U',USchema)
export default U;