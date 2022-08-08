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
const UpdateStatusSibolang = (id, data) => Patch('updateStatusSibolang/' + id, data);
const UpdateDisposition = (id, data) => Patch('sikojadisp/' + id, data);
const UpdateDispositionSibolang = (id, data) => Patch('sibolangdisp/' + id, data);
const UpdateInstance = (id, data) => Patch('instance/' + id, data);
const UpdateVillage = (id, data) => Patch('village/' + id, data);
const UpdateStreet = (id, data) => Patch('street/' + id, data);
const UpdateStatus = (id, data) => Patch('status/' + id, data);
const UpdateCategory = (id, data) => Patch('category/' + id, data);
const UpdateUser = (id, data) => Patch('user/' + id, data);
const APIPATCH = {
    UpdateStatusSikoja,
    UpdateDisposition,
    UpdateStatusSibolang,
    UpdateDispositionSibolang,
    UpdateInstance,
    UpdateVillage,
    UpdateStreet,
    UpdateStatus,
    UpdateCategory,
    UpdateUser
}

export default APIPATCH