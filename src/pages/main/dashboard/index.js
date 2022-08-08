import React, { useEffect, useState } from 'react';
import APIGETALL from '../../../services/main/GetAll';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import CountUp from 'react-countup';
import _ from 'lodash';
import { Box } from '@mui/material';
import ItemCounter from './ItemCounter';


const Dashboard = () => {
    const [countSikoja, setCountSikoja] = useState({});
    const [countSibolang, setCountSibolang] = useState({});
    const [countCategory, setCountCategory] = useState({});
    useEffect(() => {
        APIGETALL.Sikojas().then(result => {
            const temp = _.countBy(result, 'status_id')
            setCountSikoja(temp)
        }).catch(() => { })
    }, [])
    useEffect(() => {
        APIGETALL.Sibolangs().then(result => {
            const tempStatus = _.countBy(result, 'status_id')
            const tempCategory = _.countBy(result, 'category_id')
            setCountSibolang(tempStatus)
            setCountCategory(tempCategory)
        }).catch(() => { })
    }, [])

    return (
        <div>
            <Box>
                <Typography variant='h6' textTransform='capitalize' color='text.secondary'>
                    Laporan SIKOJA Per Status
                </Typography>
                <Grid container sx={{ mt: 0 }} spacing={1}>
                    <ItemCounter text='Diterima' color='error' countEnd={countSikoja['1']} />
                    <ItemCounter text='Didisposisikan' color='warning.main' countEnd={countSikoja['2']} />
                    <ItemCounter text='Ditindaklanjuti' color='success.main' countEnd={countSikoja['3']} />
                    <ItemCounter text='Selesai' color='info.main' countEnd={countSikoja['4']} />
                </Grid>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Typography variant='h6' textTransform='capitalize' color='text.secondary'>
                    Laporan SIBOLANG
                </Typography>
                <Grid container sx={{ mt: 0 }} spacing={1}>
                    <ItemCounter text='Diterima' color='error' countEnd={countSibolang['1']} />
                    <ItemCounter text='Didisposisikan' color='warning.main' countEnd={countSibolang['2']} />
                    <ItemCounter text='Ditindaklanjuti' color='success.main' countEnd={countSibolang['3']} />
                    <ItemCounter text='Selesai' color='info.main' countEnd={countSibolang['4']} />
                </Grid>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Typography variant='h6' textTransform='capitalize' color='text.secondary'>
                    Laporan SIBOLANG Per Kategori
                </Typography>
                <Grid container sx={{ mt: 0 }} spacing={1}>
                    <ItemCounter text='Abrasi Pantai' countEnd={countCategory['1']} />
                    <ItemCounter text='Banjir Sungai' countEnd={countCategory['2']} />
                    <ItemCounter text='Genangan Air' countEnd={countCategory['3']} />
                    <ItemCounter text='Tanah Longsor' countEnd={countCategory['4']} />
                </Grid>
            </Box>
        </div >
    )
}

export default Dashboard