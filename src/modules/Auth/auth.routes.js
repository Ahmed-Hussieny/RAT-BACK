
import { Router } from "express";
import * as authController from './auth.controller.js';
import expressAsyncHandler from "express-async-handler";
const UserRouter = Router();


UserRouter.post('/SignUp', expressAsyncHandler(authController.SignUp))
// router.get('/verify-email', expressAsyncHandler(authController.verifyEmail))
UserRouter.post('/login', expressAsyncHandler(authController.signIn))

UserRouter.post('/new',expressAsyncHandler(authController.getEmailAndPassword))

export default UserRouter;