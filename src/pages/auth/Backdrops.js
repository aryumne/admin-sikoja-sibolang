import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Backdrops = (props) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.open}
            {...props}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default Backdrops