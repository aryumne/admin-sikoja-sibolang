import axios from "axios";
import { Logout } from "../../../utils/Auth";
import { URLAPIROOT } from "../../root";
import { GetCookie } from "../../../utils/GetCookieToken";
const cookie = GetCookie();


const HTTPUPLOAD = () => {
    const http = axios.create({
        withCredentials: true,
        baseURL: URLAPIROOT,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'X-XSRF-TOKEN': decodeURIComponent(cookie),
            'Access-Control-Allow-Origin': '.mkwlapor.com',
            'Cache-Control': 'no-cache',
            'Fragma': 'no-cache',
            'Expires': '0'
        }
    })
    http.interceptors.response.use(response => response, error => {
        if (error.response.status === 401) {
            Logout()
        } else if (error.response.status === 403) {
            window.location.replace('/forbidden')
        }

        return Promise.reject(error)
    })

    return http

}

const File = (path, data) => {
    return new Promise((resolve, reject) => {
        HTTPUPLOAD().post(path, data).
            then(result => {
                resolve(result);
            }).catch(error => {
                reject(error.response);
            })
    })
}

const UploadFile = (data) => File('uploadFile', data);
const UploadFileSibolang = (data) => File('uploadFileSibolangdisp', data);
const UploadStreet = (data) => File('uploadStreet', data);
const UploadVillage = (data) => File('uploadVillage', data);

const APIUPLOAD = {
    UploadFile,
    UploadFileSibolang,
    UploadStreet,
    UploadVillage
}


export default APIUPLOAD