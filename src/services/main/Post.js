import HTTPMAIN from ".";

const Post = (path, data) => {
    return new Promise((resolve, reject) => {
        HTTPMAIN().post(path, data)
            .then(result => {
                resolve(result);
            }).catch(error => {
                reject(error.response);
            })
    })
}

const SignOut = (data) => Post('logout', data);
const SendEmailVerification = (data) => Post('resend-verify-email', data);
const VerifyEmail = (data) => Post('verify-email', data);
const StoreDispo = (data) => Post('sikojadisp', data);
const APIPOST = {
    SignOut,
    SendEmailVerification,
    VerifyEmail,
    StoreDispo,
}

export default APIPOST