import Data from "../../../DB/models/data.model.js"
import cloudinaryConnection from '../../utils/cloudinary.js';
import generateUniqueString from "../../utils/generate-Unique-String.js";


// & ==================Add Data =================
export const AddData = async (req, res, next) => {
    try {
        // Check if there's existing data
        const firstObject = await Data.findOne();
        console.log(firstObject);

        // If there's existing data, delete it along with corresponding resources on Cloudinary
        if (firstObject) {
            await cloudinaryConnection().api.delete_resources_by_prefix(`${process.env.MAIN_FOLDER}/PDF`);
            await cloudinaryConnection().api.delete_folder(`${process.env.MAIN_FOLDER}/PDF`);
            await Data.deleteMany();
        }

        // Extract necessary data from request body
        const { number1, number2, Date } = req.body;

        // Check if file is provided in the request
        if (!req.file) {
            return next({ cause: 400, message: "Image is required" });
        }

        // Upload the file to Cloudinary
        const folder = generateUniqueString(4);
        const { secure_url, public_id } = await cloudinaryConnection().uploader.upload(req.file.path, {
            folder: `${process.env.MAIN_FOLDER}/PDF/${folder}`
        });

        // Create a new data entry
        const newData = await Data.create({
            number1,
            number2,
            Date,
            PDF: { secure_url, public_id },
            folderId: folder
        });

        // Respond with success message and newly created data
        return res.status(200).json({ message: "Data added successfully", status: 200, data: newData });
    } catch (error) {
        // If an error occurs, pass it to the error handling middleware
        return next(error);
    }
};


// & ==================Get Data =================

export const getData = async(req,res,next) => {
    const data = await Data.find()
    return res.status(200).json({status:200,Data:data})
}