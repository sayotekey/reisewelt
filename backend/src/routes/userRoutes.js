import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserData,
  changePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";
import UserModel from "../models/UserModel.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", auth, getUserProfile);
router.patch("/profile", auth, updateUserData);
router.post("/change-password", auth, changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
