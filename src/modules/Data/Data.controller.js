import Data from "../../../DB/models/data.model.js"
import cloudinaryConnection from '../../utils/cloudinary.js';
import generateUniqueString from "../../utils/generate-Unique-String.js";


// & ==================Add Data =================
export const AddData = async (req, res, next) => {
        const { number1, number2,number3, Date } = req.body;

        let firstObject = await Data.findOne({number3});

    console.log(firstObject);
        if (firstObject) {
            if(number1){
                firstObject.number1 = number1
            }
            if(number1){
                firstObject.number2 = number2
            }
            if(number1){
                firstObject.number3 = number3
            }
            if(Date){
                firstObject.Date = Date
            }
            await cloudinaryConnection().api.delete_resources_by_prefix(`${process.env.MAIN_FOLDER}/PDF/${firstObject.folderId}`);
            await cloudinaryConnection().api.delete_folder(`${process.env.MAIN_FOLDER}/PDF/${firstObject.folderId}`);
            if (!req.file) {
                return next({ cause: 400, message: "Image is required" });
            }
    
            if(req.file){
                const folder = generateUniqueString(4);
            const { secure_url, public_id } = await cloudinaryConnection().uploader.upload(req.file.path, {
                folder: `${process.env.MAIN_FOLDER}/PDF/${folder}`
            });
            firstObject.PDF = { secure_url, public_id }
            firstObject.folderId = folder
            }
    
            const newData = await Data.create(firstObject);
    
            return res.status(200).json({ message: "Data added successfully", status: 200, data: newData });
        }else{

            firstObject = { number1, number2,number3, Date }
            if (!req.file) {
            return next({ cause: 400, message: "Image is required" });
            }

            if(req.file){
                const folder = generateUniqueString(4);
            const { secure_url, public_id } = await cloudinaryConnection().uploader.upload(req.file.path, {
                folder: `${process.env.MAIN_FOLDER}/PDF/${folder}`
            });
            firstObject.PDF = { secure_url, public_id }
            firstObject.folderId = folder
            }
        const newData = await Data.create(firstObject);

        return res.status(200).json({ message: "Data added successfully", status: 200, data: newData });

        }
};


// & ==================Get All Data =================

export const getData = async(req,res,next) => {
    const data = await Data.find()
    return res.status(200).json({status:200,Data:data})
}


// & ==================Get PDF by ID =================

export const getDataByID = async(req,res,next) => {
    const {id} = req.params
    const data = await Data.findOne({number3:id})
    return res.status(200).json({status:200,Data:data})
}