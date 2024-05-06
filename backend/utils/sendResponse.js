const { LAZY_TIME } = require("./constants");

exports.sendResponse = async (res, status, message, data) => {
    setTimeout(async () => {
        return await res.status(status || 200).json({
            success: true,
            message: message,
            ...data,
        })
    }, LAZY_TIME);
}