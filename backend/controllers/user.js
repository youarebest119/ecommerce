const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandlers");
const { sendToken } = require("../utils/sendToken");
const crypto = require("crypto");
const emailjs = require("@emailjs/nodejs");

exports.registerUser = catchAsyncErrors(async (req, res) => {
    let newUser = new User({
        ...req.body,
        profilePic: {
            url: process.env.AVATAR_URL,
        },
    })
    await newUser.save();
    setTimeout(() => {
        res.status(200).json({
            success: true,
            message: "user registered",
        })
    }, process.env.LAZY_TIME);
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
    let user = await User.findOne({ _id: req.user._id }).select("-password");
    setTimeout(() => {
        res.status(200).json({
            success: true,
            data: user,
            message: "user fetched",
        })
    }, process.env.LAZY_TIME);
})


// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});




// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const { username } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // const resetPasswordUrl = `${req.protocol}://${req.get(
    //     "host"
    // )}/password/reset/${resetToken}`;
    const resetPasswordUrl = `${req.protocol}://localhost:${process.env.FRONTEND_PORT}/reset-password/${resetToken}`;

    try {
        const templateParams = {
            'reset-url': resetPasswordUrl,
            'email': user.email,
            "subject": "Password Recovery",
        };

        await emailjs
            .send('service_x5dbaxp', 'template_mofuqsg', templateParams, {
                publicKey: 'qRvnABZdIwr1S39sP',
                privateKey: 'vziYnEcOzpM8_epeDP1RC', // optional, highly recommended for security reasons
            })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
            email: user.email,
        });
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

    sendToken(user, res);
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

    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
    });
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

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
});
