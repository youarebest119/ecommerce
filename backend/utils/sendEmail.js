const emailjs = require("@emailjs/nodejs");
const { EMAIL_JS } = require("./constants");

exports.sendEmail = async (templateId, params) => {
    return await emailjs
        .send(EMAIL_JS.SERVICE_ID, templateId, params, {
            publicKey: EMAIL_JS.PUBLIC_KEY,
            privateKey: EMAIL_JS.PRIVATE_KEY, // optional, highly recommended for security reasons
        })
}