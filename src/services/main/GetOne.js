import HTTPMAIN from "."


const GetOne = (path) => {
    return new Promise((resolve, reject) => {
        HTTPMAIN().get(path)
            .then(result => {
                resolve(result.data.data)
            }).catch(error => {
                reject(error.response)
            })
    })
}


const GetUser = (username) => GetOne('user/' + username);

const APIGETONEAUTH = {
    GetUser,
}

export default APIGETONEAUTH
