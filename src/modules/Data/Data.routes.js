import { Router } from "express";
import * as DataController from "./Data.controller.js";
import { multerMiddleHost, multerMiddleLocal } from "../../middlewares/multer.js";
import { allowedExtensions } from "../../utils/allowed-extensions.js";
import expressAsyncHandler from "express-async-handler";

const dataRouter = Router();

dataRouter.post("/",multerMiddleLocal({
    extensions: allowedExtensions.document
}).single('PDF'), expressAsyncHandler(DataController.AddData))


dataRouter.get('/getData',expressAsyncHandler(DataController.getData))

// auth(endPointsRoles.ADD_CATEGORY),
// multerMiddleHost({
//     extensions: allowedExtensions.image
// }).single('image'),
// expressAsyncHandler(categoryController.addCategory))


export default dataRouter;