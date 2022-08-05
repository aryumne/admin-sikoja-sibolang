import HTTPMAIN from ".";

const Patch = (path, data) => {
    return new Promise((resolve, reject) => {
        HTTPMAIN().patch(path, data)
            .then(result => {
                resolve(result);
            }).catch(error => {
                reject(error.response);
            })
    })
}

const UpdateStatusSikoja = (id, data) => Patch('updateStatus/' + id, data);
const APIPATCH = {
    UpdateStatusSikoja
}

export default APIPATCH