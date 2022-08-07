import { Button, Container, Typography } from '@mui/material'
import React from 'react'

const NotFound = () => {
  return (
    <Container sx={{ mt: 40 }}>
      <Typography variant='h4' color='primary.dark' align='center' textTransform='uppercase' fontWeight='bold'>
        PAGE NOT FOUND
      </Typography>
      <Typography variant='subtitle2' align='center'>
        Halaman tidak ditemukan, silahkan kembali ke halaman sebelumnya!
      </Typography>
      <Container sx={{ mt: 2, justifyContent: 'center', display: 'flex' }}>
        <Button variant='contained' onClick={() => window.history.back()}>
          Kembali
        </Button>
      </Container>
    </Container>
  )
}

export default NotFound