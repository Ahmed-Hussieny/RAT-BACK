import { Schema, model } from "mongoose";

const dataSchema = new Schema({
    number1:{
        type:Number,
        
    },
    number2:{
        type:Number,
        
    },
    number3:{
        type:Number,
        unique:true
    },
    PDF:{
        secure_url : {type:String,required:true},
        public_id : {type:String,unique:true}
    },
    Date:{
        type:Date,
        required:true
    },
    folderId:{
        type:String,
        
        unique:true
    }
},{
    timestamps:true
})

const Data = model('Data',dataSchema)
export default Data;