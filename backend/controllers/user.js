const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandlers");
const { sendToken } = require("../utils/sendToken");
const crypto = require("crypto");
const { sendEmail } = require("../utils/sendEmail");
const { sendResponse } = require("../utils/sendResponse");
const { AVATAR_URL, LAZY_TIME, FRONTEND_PORT, EMAIL_JS } = require("../utils/constants");

exports.registerUser = catchAsyncErrors(async (req, res) => {
    let newUser = new User({
        ...req.body,
        profilePic: {
            url: AVATAR_URL,
        },
    })
    await newUser.save();
    sendResponse(res, 200, "user registered successfully, please verify your email address");
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { username, password } = req.body;
    if (!username) {
        return next(new ErrorHandler("username is required", 400));
    }
    if (!password) {
        return next(new ErrorHandler("password is required", 400));
    }

    let user = await User.findOne({ username }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    let isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, res);
})

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    let user = await User.findOne({ _id: req.user._id, }).select("-password");
    sendResponse(res, 200, "user fetched", { data: user, })
})


// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    sendResponse(res, 200, "Logged Out")
});

// verify email url

exports.sendVerifyEmailUrl = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    if (user.isMailVerified) {
        sendResponse(res, 409, `Email already verified`, { emailVerified: true, })
    }

    // Get verify email Token
    const resetToken = user.getVerifyEmailToken();

    await user.save({ validateBeforeSave: false });

    const verifyEmailUrl = `${req.protocol}://localhost:${FRONTEND_PORT}/verify-email/${resetToken}`;

    try {
        const templateParams = {
            'verify-url': verifyEmailUrl,
            'email': user.email,
            'username': user.username,
        };

        await sendEmail(EMAIL_JS.CONFIRM_EMAIL_TEMPLATE_ID, templateParams);
        sendResponse(res, 200, `Email sent to ${user.email} successfully`, { email: user.email, username: user.username, });
    } catch (error) {
        user.verifyEmailToken = undefined;
        user.verifyEmailExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.text || error.message, 500));
    }
});

// verify email address
exports.verifyEmail = catchAsyncErrors(async (req, res, next) => {
    // creating token hash
    const verifyEmailToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        verifyEmailToken,
        verifyEmailExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(
            new ErrorHandler(
                "Verify email url is invalid or has been expired",
                400
            )
        );
    }

    user.isMailVerified = true;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendResponse(res, 200, "Email verified successfully")
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const { username } = req.body;
    const user = await User.findOne({ username, });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    if(!user.isMailVerified) {
        return next(new ErrorHandler("Email not verified, please verify your email first", 401));
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // const resetPasswordUrl = `${req.protocol}://${req.get(
    //     "host"
    // )}/password/reset/${resetToken}`;
    const resetPasswordUrl = `${req.protocol}://localhost:${FRONTEND_PORT}/reset-password/${resetToken}`;

    try {
        const templateParams = {
            'reset-url': resetPasswordUrl,
            'email': user.email,
            "subject": "Password Recovery",
        };

        await sendEmail(EMAIL_JS.RESET_PASSWORD_TEMPLATE_ID, templateParams);
        sendResponse(res, 200, `Email sent to ${user.email} successfully`, { email: user.email })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.text || error.message, 500));
    }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        isMailVerified: true,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(
            new ErrorHandler(
                "Reset Password Token is invalid or has been expired",
                400
            )
        );
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not password", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendResponse(res, 200, "Password reset successfully")
});



// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, res);
});



// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        username: req.body.username,
        email: req.body.email,
    };

    await User.findByIdAndUpdate(req.user._id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    sendResponse(res, 200, "Profile updated successfully");
});

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.user._id}`, 400)
        );
    }
    await user.deleteOne();

    sendResponse(res, 200, "User Deleted Successfully");

});
