import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import APIPOST from '../../services/main/Post';
import { Logout } from '../../utils/Auth';

const VerifyMe = () => {
    const params = useParams();
    const navigate = useNavigate();
    const data = {
        username: params.username
    }
    useEffect(() => {
        APIPOST.VerifyEmail(data).then(() => {
            navigate('/', { replace: true })
        }).catch(() => {
            Logout()
        })
    })

    return (
        <Container maxWidth='100' sx={{ mt: 20 }}>
            <Typography variant='h5' align='center' fontWeight='bold'>
                Halaman ini akan diredirect secara otomatis.
            </Typography>
            <Typography variant='subtitle1' align='center'>
                Jika halaman tidak diredirect silahkan refresh.
            </Typography>
        </Container>
    )
}

export default VerifyMe