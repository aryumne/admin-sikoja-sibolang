import React from 'react';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';


const LoadSkeleton = () => {
    return (
        <Grid container spacing={1} rowSpacing={1}>
            <Grid item lg={12}>
                <Grid container spacing={2}>
                    <Grid item lg={5} md={6} sm={12} >
                        <Skeleton variant="rectangular" width='100%' height={408} />
                    </Grid>
                    <Grid item lg={7} md={6} sm={12} >
                        <Skeleton variant="rectangular" width='100%' height={408} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item lg={12}>
                <Grid container spacing={2}>
                    <Grid item lg={5} md={6} sm={12} >
                        <Skeleton variant="rectangular" width='100%' height={408} />
                    </Grid>
                    <Grid item lg={7} md={6} sm={12} >
                        <Skeleton variant="rectangular" width='100%' height={408} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid >
    )
}

export default LoadSkeleton