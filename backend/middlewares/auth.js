const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../models/user");
const jsonwebtoken = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandlers");
const { JWT_SECRET } = require("../utils/constants");

exports.authentication = catchAsyncErrors(async (req, res, next) => {
    let token = req.cookies.token;
    if (!token) {
        token = req.headers.authorization;
    }
    let { id } = await jsonwebtoken.verify(token, JWT_SECRET);
    let user = await User.findOne({
        _id: id,
    })
    if (!user) {
        return next(new ErrorHandler("Login Required", 401));
    }
    req.user = user;
    next();
})