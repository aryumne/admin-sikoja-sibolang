import HTTPMAIN from ".";

const GetAll = (path) => {
    return new Promise((resolve, reject) => {
        HTTPMAIN().get(path)
            .then(result => {
                resolve(result.data.data);
            }).catch(error => {
                reject(error.response);
            })
    })
}

const Sikojas = () => GetAll('sikoja');
const Villages = () => GetAll('village');
const Streets = () => GetAll('street');
const Users = () => GetAll('user');
const Instances = () => GetAll('instance');
const APIGETALL = {
    Sikojas,
    Villages,
    Streets,
    Users,
    Instances
}

export default APIGETALL