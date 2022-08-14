import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import APIPOST from '../../services/main/Post';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const VerifyEmail = () => {

    const initialUser = {
        email: '',
    }

    const [data, setData] = React.useState(initialUser);
    const [alert, setAlert] = React.useState(true);
    const [severity, setSeverity] = React.useState('success');
    const [message, setMessage] = React.useState('Cek email anda jika belum mendapatkan link verifikasi silahkan isi form dibawah!');
    const [openBackdrop, setOpenBackdrop] = React.useState(false);

    const handleOnChange = (event) => {
        let { name, value } = event.target;
        setData({ ...data, [name]: value });
        setAlert(false);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setOpenBackdrop(true)
        APIPOST.SendEmailVerification(data).then(() => {
            setAlert(true)
            setSeverity('success')
            setMessage('Link Verifikasi telah dikirim ke email anda')
            setOpenBackdrop(false)
        }).catch(error => {
            setAlert(true)
            setSeverity('error')
            setOpenBackdrop(false)
            if (error.status === 500) {
                setMessage('email anda tidak terdaftar!')
            }
            console.log(error)
        })
    };

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) return window.history.back()
    })


    return (
        <Card elevation={4} sx={{
            marginTop: 20,
            justifyContent: 'center',
            textAlign: 'center',
        }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
                onClick={() => setOpenBackdrop(true)}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <CardContent>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main', mx: 'auto', mb: 2 }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" fontWeight={600} gutterBottom>
                    Verifikasi Email
                </Typography>
                <Typography variant="subtitle1" color='text.secondary'>
                    Masukkan email yang terdaftar di akun anda!
                </Typography>
                <Alert severity={severity} sx={{ mt: 2, display: `${alert ? 'flex' : 'none'}` }} >{message}</Alert>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        autoComplete="email"
                        type='email'
                        autoFocus
                        onChange={handleOnChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Kirim Email Verifikasi
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default VerifyEmail