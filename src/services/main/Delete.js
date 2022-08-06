import HTTPMAIN from ".";

const Delete = (path) => {
    return new Promise((resolve, reject) => {
        HTTPMAIN().delete(path)
            .then(result => {
                resolve(result);
            }).catch(error => {
                reject(error.response);
            })
    })
}

const DeleteUser = (id) => Delete('user/' + id);
const APIDELETE = {
    DeleteUser
}

export default APIDELETE