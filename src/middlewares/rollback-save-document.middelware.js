import cloudinaryConnection from "../utils/cloudinary.js";

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @description call cloudinary
 */
export const rollbackSaveDocument = async (req,res,next)=>{
    // {model , _id}
    console.log("rollbackSaveDocument",req.savedDocument);
    if(req.savedDocument){
        const {model,_id} = req.savedDocument
        await model.findByIdAndDelete(_id)
    }

}