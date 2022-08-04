import Http from "../auth";

const GetAll = (path) => {
    return new Promise((resolve, reject) => {
        Http.get(path).
            then(result => {
                resolve(result.data);
            }).catch(error => {
                reject(error.response.data);
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