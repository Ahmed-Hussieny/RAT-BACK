import cloudinaryConnection from "../utils/cloudinary.js";

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @description call cloudinary
 */
export const rollbackuploadedfiles = async (req,res,next)=>{
    console.log("rollbackuploadedfiles");
    if(req.folder){
    await cloudinaryConnection().api.delete_resources_by_prefix(`${req.folder}`)
    await cloudinaryConnection().api.delete_folder(`${req.folder}`)

    }
    next()

}