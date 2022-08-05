import HTTPMAIN from ".";

const GetAll = (path) => {
    return new Promise((resolve, reject) => {
        HTTPMAIN().get(path)
            .then(result => {
                resolve(result);
            }).catch(error => {
                reject(error);
            })
    })
}

const Sikojas = () => GetAll('sikoja');
const Villages = () => GetAll('village');
const Streets = () => GetAll('street');
const Users = () => GetAll('user');
const APIGETALL = {
    Sikojas,
    Villages,
    Streets,
    Users,
}

export default APIGETALL