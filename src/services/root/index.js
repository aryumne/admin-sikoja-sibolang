export const URLROOT = 'http://localhost:8000/';
export const URLAPIROOT = 'http://localhost:8000/api/';

export const GetCookie = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; XSRF-TOKEN=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}