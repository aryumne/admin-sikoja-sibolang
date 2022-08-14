import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import APIAUTH from '../../services/auth/Login';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ResetPassword = () => {

    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    const initialUser = {
        token: searchParams.get('token'),
        email: localStorage.getItem('email'),
        password: '',
        password_confirmation: '',
    }

    const [data, setData] = React.useState(initialUser);
    const [alert, setAlert] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState('');
    const [severity, setSeverity] = React.useState('success');
    const [message, setMessage] = React.useState('Reset password berhasil, silakan login!');
    const [openBackdrop, setOpenBackdrop] = React.useState(false);

    const handleOnChange = (event) => {
        let { name, value } = event.target;
        setData({ ...data, [name]: value });
        console.log({ ...data, [name]: value });
        if (name == 'password_confirmation') {
            if (data.password !== '') {
                if (value != data.password) {
                    setError(true)
                    setErrorMsg('konfirmasi password tidak sama')
                } else {
                    setError(false)
                    setErrorMsg('konfirmasi password benar')
                }
            }
        }
        setAlert(false);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setOpenBackdrop(true)
        APIAUTH.ResetPassword(data).then(() => {
            localStorage.removeItem('token')
            setAlert(true)
            setSeverity('success')
            setMessage('Link reset password telah dikirim ke email anda!')
            setOpenBackdrop(false)
            navigate('/login', { replace: true })
        }).catch((e) => {
            setAlert(true)
            setSeverity('error')
            setMessage('Gagal mereset password, silahkan coba lagi!')
            setOpenBackdrop(false)
            console.log(e)
        })
    }
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
                    Reset Password
                </Typography>
                <Typography variant="subtitle1" color='text.secondary'>
                    Buat password baru anda!
                </Typography>
                <Alert severity={severity} sx={{ mt: 2, display: `${alert ? 'flex' : 'none'}` }} >{message}</Alert>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        name="password"
                        label="Password Baru"
                        type='password'
                        autoFocus
                        onChange={handleOnChange}
                        helperText="password minimal 8 digit"
                    />
                    <TextField
                        error={error}
                        helperText={errorMsg}
                        margin="normal"
                        required
                        fullWidth
                        id="password_confirmation"
                        name="password_confirmation"
                        label="Konfirmasi Password"
                        type='password'
                        onChange={handleOnChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Buat Password
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default ResetPassword