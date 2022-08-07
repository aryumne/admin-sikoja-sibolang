import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import APIPATCH from '../../../../services/main/Patch';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import LoadingBackDrop from '../../../../components/LoadingBackDrop';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment';
import { Input } from '../../../../components/Moment';
import Stack from '@mui/material/Stack';
import { useDropzone } from 'react-dropzone';
import ReactPlayer from 'react-player';
import Slide from '@mui/material/Slide';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Grid } from '@mui/material';
import APIUPLOAD from '../../../../services/main/upload';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: {
        xs: '100%',
        md: '100%',
        lg: '50%'
    },
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}



const ModalTindakLanjut = (props) => {
    const { disId, description, status, start, estimation, sikojaId, dispFiles, instanceID } = props;
    const initializeDisp = {
        instance_id: instanceID,
        description: description,
        start_date: start ? Input(start) : Input(moment().format()),
        estimation_date: estimation ? Input(estimation) : Input(moment().format()),
    }
    const [anyFiles, setAnyFiles] = useState(dispFiles);
    const [data, setData] = useState(initializeDisp)
    const [open, setOpen] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [message, setMessage] = useState('Data telah diupdate!');
    const [codeStatus, setCodeStatus] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [files, setFiles] = useState([]);
    const { getRootProps, isDragActive } = useDropzone({
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
            setAnyFiles(files.length + 1)
        },
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg'],
            'video/mp4': ['.mp4']
        },
        maxFiles: 4,
        maxSize: 10240000,

    });

    const thumbs = files.length !== 0 ? (
        files.map(file => {
            if (file.type == 'video/mp4') {
                return (
                    <ReactPlayer key={file.name} height='100%' width='100%' controls url={file.preview} />
                )
            } else {
                return (
                    <ImageListItem key={file.name} cols={1} rows={1}>
                        <img
                            src={file.preview}
                            alt={file.name}
                            loading="lazy"
                        />
                    </ImageListItem>
                )
            }
        })
    ) : '';


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (anyFiles < 1) {
            setMessage('Upload gambar sebagai dokumentasi!')
            setCodeStatus(false)
            setOpenSnackbar(true)
        } else {
            setOpen(false)
            setOpenBackdrop(true)
            APIPATCH.UpdateDisposition(disId, data).then(() => {
                setCodeStatus(true)
                setOpenSnackbar(true)
            }).then(() => {
                APIPATCH.UpdateStatusSikoja(sikojaId, { status_id: 3 }).then(() => {
                    setMessage('Status laporan telah diupdate')
                    setCodeStatus(true)
                    setOpenSnackbar(true)
                }).catch((error) => {
                    setMessage('Gagal mengupdate status, coba lagi!')
                    setCodeStatus(false)
                    setOpenSnackbar(true)
                    setOpenBackdrop(false)
                })
            }).then(() => {
                for (let file of files) {
                    const data2 = new FormData();
                    data2.append('file', file)
                    data2.append('sikojadisp_id', disId)
                    APIUPLOAD.UploadFile(data2).then(result => {
                        setMessage('Dokumentasi telah diupload!')
                        setCodeStatus(true)
                        setOpenSnackbar(true)
                        setTimeout(() => {
                            window.location.reload()
                        }, 1500)
                    }).catch(error => {
                        setMessage('Gagal mengupload gambar!')
                        setCodeStatus(false)
                        setOpenSnackbar(true)
                        setOpenBackdrop(false)
                    })
                }
                setTimeout(() => {
                    window.location.reload()
                }, 1500)
            }).catch((error) => {
                setMessage('Gagal menyimpan perubahan, coba lagi!')
                setCodeStatus(false)
                setOpenSnackbar(true)
                setOpenBackdrop(false)
            })
        }
    }

    const handleOnClick = (event) => {
        event.preventDefault();
        setOpenBackdrop(true);
        APIPATCH.UpdateStatusSikoja(sikojaId, { status_id: 4 }).then(() => {
            setMessage('Laporan selesai')
            setCodeStatus(true)
            setOpenSnackbar(true)
            setTimeout(() => {
                window.location.reload()
            }, 1500)
        }).catch((error) => {
            setMessage('Gagal mengupdate status, coba lagi!')
            setCodeStatus(false)
            setOpenSnackbar(true)
            setOpenBackdrop(false)
        })
    }

    return (
        <>
            <Button variant='outlined' disabled={status === 4 ? true : false} color='success' onClick={handleOpen} sx={{ display: status === 4 ? 'none' : 'inline' }}>
                {description === null ? 'Tambah Keterangan' : 'Edit'}
            </Button>
            <Button variant='contained' disabled={status === 4 ? true : false} onClick={handleOnClick} sx={{ ml: 1 }}>
                Selesai
            </Button>
            <LoadingBackDrop open={openBackdrop} onClick={() => setOpenBackdrop(true)} />
            <Snackbar
                open={openSnackbar}
                autoHideDuration={1000}
                TransitionComponent={TransitionUp}
            >
                <Alert severity={codeStatus ? 'success' : 'error'} sx={{ width: '100%' }} onClose={() => setOpenSnackbar(false)}>
                    {message}
                </Alert>
            </Snackbar>
            <Modal
                scroll='body'
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ mx: 1 }}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" paragraph>
                        {description === null ? 'Tambahkan' : 'Ubah '}keterangan tindaklanjut dari laporan ini.
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack spacing={2}>
                                    <TextField
                                        autoFocus
                                        required
                                        defaultValue={data.description}
                                        margin="dense"
                                        id="description"
                                        name="description"
                                        label="keterangan"
                                        multiline
                                        rows={4}
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        onChange={handleChange}
                                    />
                                    <Grid container >
                                        <Grid container columnSpacing={1}>
                                            <Grid item lg={6} md={12} sm={12}>
                                                <DateTimePicker
                                                    id="start_date"
                                                    name="start_date"
                                                    label="Tanggal mulai Pengerjaan"
                                                    renderInput={(params) => <TextField fullWidth required {...params} />}
                                                    value={data.start_date}
                                                    onChange={(newValue) => {
                                                        setData({ ...data, start_date: Input(newValue) });
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item lg={6} md={12} sm={12}>
                                                <DateTimePicker
                                                    id="estimation_date"
                                                    name="estimation_date"
                                                    label="Estimasi Selesai"
                                                    renderInput={(params) => <TextField fullWidth required {...params} />}
                                                    value={data.estimation_date}
                                                    onChange={(newValue) => {
                                                        setData({ ...data, estimation_date: Input(newValue) });
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Paper sx={{ cursor: 'pointer', background: '#fafafa', color: '#bdbdbd', border: '1px dashed #ccc', '&:hover': { border: '1px solid #ccc' }, mt: 2 }}>
                                        <div style={{ padding: '20px', height: 'auto' }} {...getRootProps()}>
                                            {isDragActive ? (
                                                <Typography align='center' variant='subtitle1' color='primary.main'> Drop disini..</Typography>
                                            ) : (
                                                <div>
                                                    <Typography align='center' variant='subtitle1'>Drag & Drop atau klik untuk memilih gambar...</Typography>
                                                    <Typography align='center' variant='subtitle1'>maksimal 4 file</Typography>
                                                </div>
                                            )}
                                        </div>
                                    </Paper>
                                    {files.length != 0 ? (
                                        <Container >
                                            <ImageList
                                                sx={{ width: '100', height: 'auto' }}
                                                variant="quilted"
                                                cols={4}
                                                rowHeight={121}
                                            >
                                                {thumbs}
                                            </ImageList>
                                        </Container>
                                    ) : null}
                                </Stack>
                            </LocalizationProvider>
                        </FormControl>
                        <Button type='submit' variant='contained' sx={{ mt: 2 }}>Simpan</Button>
                    </form>
                </Box>
            </Modal>
        </>
    )
}

export default ModalTindakLanjut