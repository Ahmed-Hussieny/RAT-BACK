import { Schema, model } from "mongoose";

const dataSchema = new Schema({
    number1:{
        type:Number,
        required:true,
    },
    number2:{
        type:Number,
        required:true,
    },
    PDF:{
        secure_url : {type:String,required:true},
        public_id : {type:String,required:true,unique:true}
    },
    Date:{
        type:Date,
        required:true
    },
    folderId:{
        type:String,
        required:true,
        unique:true
    }
},{
    timestamps:true
})

const Data = model('Data',dataSchema)
export default Data;