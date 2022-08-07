import { Button, Container, Typography } from '@mui/material'
import React from 'react'

const Forbidden = () => {
    return (
        <Container sx={{ mt: 40 }}>
            <Typography variant='h4' color='error.dark' align='center' textTransform='uppercase' fontWeight='bold'>
                Forbidden Access
            </Typography>
            <Typography variant='subtitle2' align='center'>
                Anda tidak memiliki akses, silahkan kembali ke halaman sebelumnya!
            </Typography>
            <Container sx={{ mt: 2, justifyContent: 'center', display: 'flex' }}>
                <Button variant='contained' onClick={() => window.history.back()}>
                    Kembali
                </Button>
            </Container>
        </Container>
    )
}

export default Forbidden