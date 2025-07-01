import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  changePassword
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", auth, getUserProfile);
router.post("/change-password", auth, changePassword);

export default router;
