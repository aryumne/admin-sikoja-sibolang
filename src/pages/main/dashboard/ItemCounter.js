import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import CountUp from 'react-countup';

const ItemCounter = ({ color, countEnd, text }) => {
    return (
        <Grid item lg={3} md={6} sm={6} xs={12}>
            <Card elevation={2} sx={{ bgcolor: grey[50] }}>
                <CardContent>
                    <Typography variant='subtitle1' fontWeight={500} color='text.secondary'>
                        {text}
                    </Typography>
                    <Typography variant='h3' fontWeight='bold' color={color}>
                        <CountUp end={countEnd} duration={0.7} />
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default ItemCounter