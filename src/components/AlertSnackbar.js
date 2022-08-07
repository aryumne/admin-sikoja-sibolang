import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const AlertSnackbar = (props) => {
    const { opensnackbar, setOpensnackbar, status, message } = props

    return (
        <Snackbar
            open={opensnackbar}
            autoHideDuration={1000}

            {...props}
        >
            <Alert severity={status ? 'success' : 'error'} sx={{ width: '100%' }} onClose={() => setOpensnackbar(false)}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default AlertSnackbar