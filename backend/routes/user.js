const express = require("express");
const { registerUser, loginUser, getUserDetails, getInboxUsers, allUsers, logout, forgotPassword, resetPassword, updatePassword, updateProfile, deleteUser, sendVerifyEmailUrl, verifyEmail } = require("../controllers/user");
const { authentication } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/send-verify-email").post(sendVerifyEmailUrl);
router.route("/verify-email").post(verifyEmail);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/").get(authentication, getUserDetails).put(authentication, updateProfile).delete(authentication, deleteUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(authentication, updatePassword);

module.exports = router;