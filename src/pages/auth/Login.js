import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import APIAUTH from '../../services/auth/Login';
import Alert from '@mui/material/Alert';
import { SignIn } from '../../utils/Auth';

const Login = () => {

    const initialUser = {
        username: '',
        password: '',
    }

    const [data, setData] = React.useState(initialUser);
    const [alert, setAlert] = React.useState(false);
    const [message, setMessage] = React.useState(null);
    // const [openBackdrop, setOpenBackdrop] = React.useState(false);

    const handleOnChange = (event) => {
        let { name, value } = event.target;
        setData({ ...data, [name]: value });
        setAlert(false);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        APIAUTH.Login(data).then(result => {
            SignIn(result.data)
        }).catch(error => {
            setMessage(error.data.message)
            setAlert(true)
        })
    };

    return (
        <Card elevation={4} sx={{
            marginTop: 20,
            justifyContent: 'center',
            textAlign: 'center',
        }}>
            <CardContent>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main', mx: 'auto' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Alert severity="error" sx={{ mt: 2, display: `${alert ? 'flex' : 'none'}` }} >{message}</Alert>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        name="username"
                        label="Username"
                        autoComplete="username"
                        autoFocus
                        onChange={handleOnChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleOnChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/dashboard" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    )
}

export default Login