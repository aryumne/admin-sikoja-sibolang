import React, { useEffect, useState } from 'react';
import APIGETALL from '../../../services/main/GetAll';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import CountUp from 'react-countup';
import _ from 'lodash';
const Dashboard = () => {
    const [countSikoja, setCountSikoja] = useState({});
    useEffect(() => {
        APIGETALL.Sikojas().then(result => {
            const temp = _.countBy(result, 'status_id')
            setCountSikoja(temp)
        }).catch(error => {
            console.log(error.message)
        })
    }, [])

    return (
        <div>
            <Typography variant='h5' >
                Jumlah Laporan SIKOJA
            </Typography>
            <Grid container sx={{ mt: 2 }} spacing={1}>
                <Grid item lg={3} md={6} sm={6} xs={12}>
                    <Card elevation={2} sx={{ bgcolor: grey[50] }}>
                        <CardContent>
                            <Typography variant='subtitle1' fontWeight='bold' color='text.secondary'>
                                Diterima
                            </Typography>
                            <Typography variant='h3' fontWeight='bold' color='error'>
                                <CountUp end={countSikoja['1']} duration={0.7} />
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={3} md={6} sm={6} xs={12}>
                    <Card elevation={2} sx={{ bgcolor: grey[50] }}>
                        <CardContent>
                            <Typography variant='subtitle1' fontWeight='bold' color='text.secondary'>
                                Didisposisikan
                            </Typography>
                            <Typography variant='h3' fontWeight='bold' color='warning.main'>
                                <CountUp end={countSikoja['2']} duration={0.7} />
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={3} md={6} sm={6} xs={12}>
                    <Card elevation={2} sx={{ bgcolor: grey[50] }}>
                        <CardContent>
                            <Typography variant='subtitle1' fontWeight='bold' color='text.secondary'>
                                Ditindaklanjuti
                            </Typography>
                            <Typography variant='h3' fontWeight='bold' color='success.main'>
                                <CountUp end={countSikoja['3']} duration={0.7} />
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={3} md={6} sm={6} xs={12}>
                    <Card elevation={2} sx={{ bgcolor: grey[50] }}>
                        <CardContent>
                            <Typography variant='subtitle1' fontWeight='bold' color='text.secondary'>
                                Selesai
                            </Typography>
                            <Typography variant='h3' fontWeight='bold' color='info.main'>
                                <CountUp end={countSikoja['4']} duration={0.7} />
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div >
    )
}

export default Dashboard