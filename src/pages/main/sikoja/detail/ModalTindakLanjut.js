import React, { useState } from 'react';
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
import { Stack } from '@mui/material';
import Slide from '@mui/material/Slide';


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

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}



const ModalTindakLanjut = (props) => {
    const { disId, description, status, start, estimation, sikojaId } = props;
    const initializeDisp = {
        instance_id: disId,
        description: description,
        start_date: start ? Input(start) : Input(moment().format()),
        estimation_date: estimation ? Input(estimation) : Input(moment().format()),
    }
    const [data, setData] = useState(initializeDisp)
    const [open, setOpen] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [message, setMessage] = useState('Data telah diupdate!');
    const [codeStatus, setCodeStatus] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value })
        console.log(data)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
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
                setTimeout(() => {
                    window.location.reload()
                }, 1500)
            }).catch((error) => {
                console.log(error)
                setMessage('Gagal mengupdate status, coba lagi!')
                setCodeStatus(false)
                setOpenSnackbar(true)
                setOpenBackdrop(false)
            })
        }).catch((error) => {
            console.log(error)
            setMessage('Gagal menyimpan perubahan, coba lagi!')
            setCodeStatus(false)
            setOpenSnackbar(true)
            setOpenBackdrop(false)
        })
    }

    return (
        <>
            <Button variant='outlined' disabled={status === 4 ? true : false} onClick={handleOpen}>
                {description === null ? 'Tambah Keterangan' : 'Edit'}
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
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ mx: 1 }}
            >
                <Box sx={style} maxWidth='lg'>
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
                                    <DateTimePicker
                                        id="start_date"
                                        name="start_date"
                                        label="Tanggal mulai Pengerjaan"
                                        renderInput={(params) => <TextField required {...params} />}
                                        value={data.start_date}
                                        onChange={(newValue) => {
                                            setData({ ...data, start_date: Input(newValue) });
                                        }}
                                    />
                                    <DateTimePicker
                                        id="estimation_date"
                                        name="estimation_date"
                                        label="Estimasi Selesai"
                                        renderInput={(params) => <TextField required {...params} />}
                                        value={data.estimation_date}
                                        onChange={(newValue) => {
                                            setData({ ...data, estimation_date: Input(newValue) });
                                        }}
                                    />
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