import express, { Router } from 'express';
import { UserController } from '../controller';
const router : Router = express.Router();

//router.route("/create").post(UserController.CreateUser.handle);
router.route("/login").post(UserController.LoginUser.handle);
router.route("/logout").post(UserController.LogoutUser.handle);
router.route("/").post(UserController.GetUser.handle);

export default router;