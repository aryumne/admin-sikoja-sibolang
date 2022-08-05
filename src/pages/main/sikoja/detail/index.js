import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Moment from '../../../../components/Moment';
import APIGETONE from '../../../../services/public/GetOne';
import Box from '@mui/material/Box';
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
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import APIGETALL from '../../../../services/main/GetAll';
import Autocomplete from '@mui/material/Autocomplete';
import APIPOST from '../../../../services/main/Post';
import APIPATCH from '../../../../services/main/Patch';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: {
        xs: '100%',
        md: '100%',
        lg: 500
    },
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

const DetailSikoja = () => {
    const params = useParams();
    const [sikoja, setSikoja] = useState([]);
    const [disp, setDisp] = useState([]);
    const [instances, setInstances] = useState([]);
    const [data, setData] = useState({ instance_id: null, sikoja_id: null })
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
            setData({ ...data, sikoja_id: result[0].id })
        }).catch(error => {
            console.log(error)
        })
    }, [])
    useEffect(() => {
        APIGETONE.GetDisp(params.id).then(result => {
            setDisp(result)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        APIGETALL.Instances().then(result => {
            setInstances(result)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const handleOnSelected = (event, newValue) => {
        const id = newValue.id;
        setData({ ...data, instance_id: id })
        console.log(data);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        APIPOST.StoreDispo(data).then(() => {
            console.log(data);
        }).then(() => {
            APIPATCH.UpdateStatusSikoja(data.sikoja_id, { status_id: 2 }).then(() => {
                window.location.reload()
            })
        }).catch(error => {
            console.log(error.status)
        })
    }
    return (
        <>
            {sikoja.map((item) => (
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
                                <Typography variant='subtitle2' fontStyle='italic'>
                                    {Moment(item.created_at)}
                                </Typography>
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                <Typography varian="body1" fontWeight='medium'>
                                                    Nama Pelapor
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {item.name} - {item.hp}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                <Typography varian="body1" fontWeight='medium'>
                                                    Judul Laporan
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {item.title}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                    <Divider />
                                    <ListItem >
                                        <ListItemText
                                            primary={
                                                <Typography varian="body1" fontWeight='medium'>
                                                    Keterangan Laporan
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {item.description}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                <Typography varian="body1" fontWeight='medium'>
                                                    Alamat Kampung
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {item.village.village}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                <Typography varian="body1" fontWeight='medium'>
                                                    Nama Jalan
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {item.street ? item.street.street : 'tidak ada'}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                    <Divider />
                                </List>
                            </CardContent>
                            <CardActions sx={{ p: 2, mt: 0, pt: 0 }}>
                                <Button variant='contained' disabled={item.status_id === 1 ? false : true} onClick={handleOpen}>
                                    {item.status_id === 1 ? 'Disposisikan' : 'Sudah didisposisikan'}
                                </Button>
                            </CardActions>
                        </Card>
                        <Card sx={{ mt: 1 }}>
                            {disp.map((dis) => (
                                <CardContent key={dis}>
                                    <Typography variant='h6' fontWeight='bold' >
                                        Laporan Didisposisikan
                                    </Typography>
                                    <Typography variant='subtitle2' fontStyle='italic'>
                                        {Moment(disp[0].created_at)}
                                    </Typography>
                                    <Divider />
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
                                </CardContent>
                            ))}
                        </Card>
                    </Grid>
                    <Grid item lg={7} md={6} sm={12} >
                        <Card>
                            <CardContent>
                                <Typography variant='h6' fontWeight='bold' >
                                    Laporan Disposisikan
                                </Typography>
                                <Typography variant='subtitle2' fontStyle='italic'>
                                    {Moment(item.created_at)}
                                </Typography>
                                <List>

                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid >
            ))
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ mx: 1 }}
            >
                <Box sx={style} maxWidth='lg'>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Pilih Instansi
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth>
                            <Autocomplete disablePortal
                                id="instance_id"
                                name='instance_id'
                                options={instances}
                                sx={{ mt: 2 }}
                                getOptionLabel={(instances) => `${instances.instance}`}
                                noOptionsText='Instansi Tidak Ditemukan'
                                renderInput={(params) => <TextField {...params} required label="Nama Instansi" />}
                                onChange={handleOnSelected}
                            />
                        </FormControl>
                        <Button type='submit' variant='contained' sx={{ mt: 2 }}>Simpan</Button>
                    </form>
                </Box>
            </Modal>
        </>
    )
}

export default DetailSikoja