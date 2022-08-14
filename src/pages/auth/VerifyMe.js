import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const VerifyMe = () => {
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    const url = searchParams.get('url')
    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const [alert, setAlert] = React.useState(true);
    const [severity, setSeverity] = React.useState('success');
    const [message, setMessage] = React.useState('Jika halaman tidak diredirect silahkan klik tombol dashboard!');
    const [to, setTo] = React.useState('/');

    const handleClick = () => {
        window.location.href = `${to}`
    }

    useEffect(() => {
        axios.get(url, config).then(result => {
            localStorage.removeItem('token')
            setTo('/')
            navigate('/')
        }).catch((e) => {
            setSeverity('error')
            setMessage('Gagal verifikasi data, silahkan login dan verifikasi ulang!')
            setTo('/login')
        })
    }, [])

    return (
        <Container maxWidth='100' sx={{ mt: 20 }}>
            <Typography variant='h5' align='center' fontWeight='bold'>
                Halaman ini akan diredirect secara otomatis.
            </Typography>
            <Alert severity={severity} sx={{ mt: 2, display: `${alert ? 'flex' : 'none'}` }} action={
                severity == 'success' ? (
                    <Button color="inherit" size="small" onClick={handleClick}>
                        Dashboard
                    </Button>
                ) : (
                    <Button color="inherit" size="small" onClick={handleClick}>
                        Login
                    </Button>
                )

            }>{message}</Alert>
        </Container >
    )
}

export default VerifyMe