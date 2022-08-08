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
const SikojaDisps = () => GetAll('sikojadisp');
const Sibolangs = () => GetAll('sibolang');
const SibolangDisps = () => GetAll('sibolangdisp');
const Instances = () => GetAll('instance');
const Users = () => GetAll('user');
const Villages = () => GetAll('village');
const Streets = () => GetAll('street');
const Categories = () => GetAll('category');
const Status = () => GetAll('status');
const APIGETALL = {
    Sikojas,
    SikojaDisps,
    Sibolangs,
    SibolangDisps,
    Villages,
    Streets,
    Users,
    Instances,
    Categories,
    Status,
}

export default APIGETALL