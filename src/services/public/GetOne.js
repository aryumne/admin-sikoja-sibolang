import Http from "."


const GetOne = (path) => {
    return new Promise((resolve, reject) => {
        Http.get(path)
            .then(result => {
                resolve(result.data.data)
            }).catch(error => {
                reject(error.response)
            })
    })
}


const GetSikoja = (id) => GetOne('sikoja/' + id);
const GetDisp = (id) => GetOne('sikojadisp/' + id);

const APIGETONE = {
    GetSikoja,
    GetDisp
}

export default APIGETONE

