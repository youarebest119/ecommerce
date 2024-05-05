exports.sendToken = (user, res) => {
    let token = user.getJWTToken();
    user = JSON.stringify(user);
    user = JSON.parse(user);
    delete user["password"];

    res.status(200).cookie("token", token, {
        expires: new Date(
            Date.now() + Number(process.env.COOKIE_EXPIRE) * 30,
        ),
        httpOnly: true,
    }).json({
        success: true,
        token,
        data: user,
        message: "user logged in",
    })
}