import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Relative, Format } from '../../../../components/Moment';
import APIGETONE from '../../../../services/public/GetOne';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadSkeleton from './LoadSkeleton';
import MainData from './MainData';
import GalerySikoja from './GalerySikoja';
import ModalDisposisi from './ModalDisposisi';
import ModalUpdateInstance from './ModalUpdateInstance';
import ModalTindakLanjut from './ModalTindakLanjut';


const DetailSikoja = () => {
    const params = useParams();
    const [sikoja, setSikoja] = useState([]);
    const [disp, setDisp] = useState([]);
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const roleId = localStorage.getItem('role');

    const colorChip = (id) => {
        let color = 'error';
        if (id === 1) {
            return color;
        } else if (id === 2) {
            return color = 'warning';
        } else if (id === 3) {
            return color = 'success';
        } else {
            return color = 'primary';
        }
    }
    useEffect(() => {
        APIGETONE.GetSikoja(params.id).then(result => {
            setSikoja(result)
            setData(result[0].id)
        }).then(() => {
            APIGETONE.GetDisp(params.id).then(result => {
                setDisp(result)
            })
        }).catch(() => {
            setDisp(null);
        }).finally(() => {
            setIsLoading(false)
        });
    }, []);

    return (
        !isLoading ? (
            sikoja.map((item) => (
                <Grid key={item.id} container spacing={1} rowSpacing={1}>
                    <Grid item lg={5} md={6} sm={12} >
                        <Card>
                            <CardContent>
                                <Stack direction="row" spacing={1} alignItems='center'>
                                    <Typography variant='h6' fontWeight='bold' >
                                        Detail Laporan
                                    </Typography>
                                    <Chip label={item.status.statuse || ''} color={colorChip(item.status_id)} variant="contained" size='small' />
                                </Stack>
                                <Typography variant='subtitle1' fontStyle='italic'>
                                    {Relative(item.created_at)}
                                </Typography>
                                <MainData item={item} />
                            </CardContent>
                            {roleId <= 2 ? (
                                <CardActions sx={{ p: 2, mt: 0, pt: 0 }}>
                                    <ModalDisposisi status={item.status.id} instanceid={data} />
                                </CardActions>
                            ) : ''}
                        </Card>
                        <Card sx={{ mt: 1 }}>
                            <CardContent>
                                <Typography variant='h6' fontWeight='bold' >
                                    Laporan Didisposisikan
                                </Typography>
                                {disp.length !== 0 ? (
                                    disp.map((dis) => (
                                        <div key={dis} >
                                            <Typography variant='subtitle1' fontStyle='italic'>
                                                {Relative(disp[0].created_at)}
                                            </Typography>
                                            <List>
                                                <ListItem>
                                                    <ListItemText
                                                        primary={
                                                            <Typography varian="body1" fontWeight='medium'>
                                                                Nama Instansi
                                                            </Typography>
                                                        }
                                                        secondary={
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                {dis.instance ? dis.instance.instance : 'Belum ada'}
                                                            </Typography>
                                                        }
                                                    />
                                                </ListItem>
                                            </List>
                                            {roleId <= 2 ? (
                                                <ModalUpdateInstance disId={dis.id} instanceId={disp} description={dis.description} />
                                            ) : ''}
                                        </div>
                                    ))
                                ) : (
                                    <Typography variant='subtitle1' >
                                        Laporan belum didisposisikan
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                        <Card sx={{ mt: 1 }}>
                            <CardContent>
                                <Typography variant='h6' fontWeight='bold' >
                                    Detail Tindaklanjut
                                </Typography>
                                {disp.length !== 0 ? (
                                    disp.map((dis) => {
                                        if (dis.description !== null) {
                                            return (
                                                <div key={dis}>
                                                    <Typography variant='subtitle1' fontStyle='italic'>
                                                        {Relative(dis.updated_at)}
                                                    </Typography>
                                                    <List>
                                                        <ListItem>
                                                            <ListItemText
                                                                primary={
                                                                    <Typography varian="body1" fontWeight='medium'>
                                                                        Keterangan
                                                                    </Typography>
                                                                }
                                                                secondary={
                                                                    <Typography
                                                                        sx={{ display: 'inline' }}
                                                                        component="span"
                                                                        variant="body2"
                                                                        color="text.primary"
                                                                    >
                                                                        {dis.description ? dis.description : 'Belum ada'}
                                                                    </Typography>
                                                                }
                                                            />
                                                        </ListItem>
                                                        <Divider />
                                                        <ListItem>
                                                            <ListItemText
                                                                primary={
                                                                    <Typography varian="body1" fontWeight='medium'>
                                                                        Estimasi Pengerjaan
                                                                    </Typography>
                                                                }
                                                                secondary={
                                                                    <Typography
                                                                        sx={{ display: 'inline' }}
                                                                        component="span"
                                                                        variant="body2"
                                                                        color="text.primary"
                                                                    >
                                                                        {Format(dis.start_date)} - {Format(dis.estimation_date)}
                                                                    </Typography>
                                                                }
                                                            />
                                                        </ListItem>
                                                    </List>
                                                    {
                                                        roleId != 2 ? (
                                                            <ModalTindakLanjut dispFiles={dis.file.length} disId={dis.id} instanceID={dis.isntance_id} sikojaId={item.id} start={dis.start_date} estimation={dis.estimation_date} description={dis.description} status={item.status_id} />
                                                        ) : ''
                                                    }
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div key={dis.id}>
                                                    <Typography variant='subtitle1' key={dis}>
                                                        Laporan belum ditindaklanjuti
                                                    </Typography>
                                                    {
                                                        roleId != 2 ? (
                                                            <ModalTindakLanjut dispFiles={dis.file.length} instanceID={dis.isntance_id} disId={dis.id} sikojaId={item.id} description={dis.description} status={item.status_id} />
                                                        ) : ''
                                                    }
                                                </div>
                                            )
                                        }
                                    })
                                ) : (
                                    <Typography variant='subtitle1' >
                                        Laporan belum ditindaklanjuti
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={7} md={6} sm={12} >
                        <Card>
                            <CardContent>
                                <Typography variant='h6' fontWeight='bold' >
                                    Galery Laporan
                                </Typography>
                                <GalerySikoja item={item.galery} />
                            </CardContent>
                        </Card>
                        <Card sx={{ mt: 1 }}>
                            <CardContent>
                                <Typography variant='h6' fontWeight='bold' >
                                    Dokumentasi TindakLanjut
                                </Typography>
                                {disp.length !== 0 ? (
                                    disp.map((dis) => {
                                        if (dis.file.length !== 0) {
                                            return (
                                                disp.map((dis) => (
                                                    <GalerySikoja key={dis} item={dis.file} />
                                                ))
                                            )
                                        } else {
                                            return (
                                                <Typography key={dis} variant='subtitle1' >
                                                    Belum ada progress
                                                </Typography>
                                            )
                                        }
                                    })
                                ) : (
                                    <Typography variant='subtitle1' >
                                        Belum ada progress
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid >
            )))
            : (
                <LoadSkeleton />
            )
    )
}

export default DetailSikoja