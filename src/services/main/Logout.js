import HTTPMAIN from ".";

const Logout = (path, data) => {
    return new Promise((resolve, reject) => {
        HTTPMAIN().post(path, data)
            .then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            })
    })
}

const SignOut = (data) => Logout('logout', data);
const APILOGOUT = {
    SignOut
}

export default APILOGOUT