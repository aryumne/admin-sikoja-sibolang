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
const StoreDispoSibolang = (data) => Post('sibolangdisp', data);
const NewInstance = (data) => Post('instance', data);
const NewVillage = (data) => Post('village', data);
const NewStreet = (data) => Post('street', data);
const NewCategory = (data) => Post('category', data);
const NewUser = (data) => Post('register', data);
const APIPOST = {
    SignOut,
    SendEmailVerification,
    VerifyEmail,
    StoreDispo,
    StoreDispoSibolang,
    NewInstance,
    NewVillage,
    NewStreet,
    NewUser,
    NewCategory
}

export default APIPOST