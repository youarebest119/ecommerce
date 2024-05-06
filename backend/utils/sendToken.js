const { COOKIE_EXPIRE } = require("./constants");

exports.sendToken = (user, res, message) => {
    let token = user.getJWTToken();
    user = JSON.stringify(user);
    user = JSON.parse(user);
    delete user["password"];

    res.status(200).cookie("token", token, {
        expires: new Date(
            Date.now() + Number(COOKIE_EXPIRE) * 30,
        ),
        httpOnly: true,
    }).json({
        success: true,
        token,
        data: user,
        message: message || "user logged in",
    })
}