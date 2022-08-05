import React, { useEffect } from 'react';
import APIGETALL from '../../../services/main/GetAll';

const Sikoja = () => {
    useEffect(() => {
        APIGETALL.Sikojas().then(result => {
            console.log(result.data)
        }).catch(error => {
            console.log(error.message)
        })
    }, [])
    return (
        <div>Sikoja</div>
    )
}

export default Sikoja