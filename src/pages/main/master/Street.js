import React, { useEffect, useState } from 'react';
import APIGETALL from '../../../services/main/GetAll';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import { Card, CardContent, Container, Typography } from '@mui/material';
import APIPATCH from '../../../services/main/Patch';
import LoadingBackDrop from '../../../components/LoadingBackDrop';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import APIPOST from '../../../services/main/Post';
import AlertSnackbar from '../../../components/AlertSnackbar';
import APIUPLOAD from '../../../services/main/upload';


const columns = [
    { field: 'id', headerName: 'ID', width: 30, editable: false },
    { field: 'street', headerName: 'Nama Jalan', flex: 1, editable: true },
];

const Import = () => {
    const [open, setOpen] = React.useState(false);
    const [file, setFile] = useState(null);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        const data = new FormData();
        data.append('file', file)
        APIUPLOAD.UploadStreet(data).then((result) => {
            setOpen(false)
            window.location.reload()
        })
    }

    return (
        <Container >
            <Button variant="outlined" onClick={handleOpen}>
                Import
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Import file excel
                    </DialogContentText>
                    <TextField
                        autoFocus
                        type='file'
                        margin="dense"
                        id="file"
                        name="file"
                        label="Email Address"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Upload</Button>
                </DialogActions>
            </Dialog>

        </Container>
    )

}

const AddToolBar = () => {
    const [newData, setNewData] = useState({ street: '' });
    const [open, setOpen] = React.useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [message, setMessage] = useState('Data berhasil ditambahkan!');
    const [status, setStatus] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewData({ ...newData, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setOpen(false);
        setOpenBackdrop(true)
        APIPOST.NewStreet(newData).then(() => {
            setStatus(true)
            setOpenBackdrop(false)
            window.location.reload()
            setOpenSnackbar(true)
        }).catch(error => {
            setMessage('Gagal menyimpan data, coba lagi!')
            setStatus(false)
            setOpenSnackbar(true)
            setOpenBackdrop(false)
        })
    }

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleOpen}>
                Jalan Baru
            </Button>
            <LoadingBackDrop open={openBackdrop} onClick={() => setOpenBackdrop(true)} />
            <AlertSnackbar message={message} status={status} opensnackbar={openSnackbar} setOpensnackbar={setOpenSnackbar} />
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Jalan Baru</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Masukkan nama jalan yang belum terdaftar!
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="street"
                            name="street"
                            label="nama jalan"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Batal</Button>
                        <Button type='submit'>Simpan</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </GridToolbarContainer>
    );
}

const Street = () => {
    const role = localStorage.getItem('role')
    const [streets, setStreets] = useState([]);
    const [data, setData] = useState({ street: '' });
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [message, setMessage] = useState('Data telah diupdate!');
    const [status, setStatus] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false);


    useEffect(() => {
        setOpenBackdrop(true)
        APIGETALL.Streets().then(result => {
            setStreets(result)
            setOpenBackdrop(false)
        }).catch(error => {
            setOpenBackdrop(false)
        })
    }, [])

    const onEditCommit = (id) => {
        setOpenBackdrop(true)
        APIPATCH.UpdateStreet(id, data).then(() => {
            setStatus(true)
            setOpenBackdrop(false)
            setOpenSnackbar(true)
        }).catch(() => {
            setMessage('Gagal menyimpan data, coba lagi!')
            setStatus(false)
            setOpenSnackbar(true)
            setOpenBackdrop(false)
            setTimeout(() => {
                window.location.reload()
            }, 1500)
        })
    }
    return (
        <Container maxWidth='md'>
            <LoadingBackDrop open={openBackdrop} onClick={() => setOpenBackdrop(true)} />
            <AlertSnackbar message={message} status={status} opensnackbar={openSnackbar} setOpensnackbar={setOpenSnackbar} />
            <Card>
                <CardContent>
                    <Typography variant='h5' fontWeight='bold' paragraph>
                        Daftar Nama Jalan
                    </Typography>
                    {role == 1 ? (<Import />) : ''}
                    <div style={{ height: '85vh', width: '100%' }}>
                        <DataGrid
                            editMode='row'
                            rows={streets}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            onEditCellPropsChange={(params) => {
                                setData({ street: params.props.value })
                                console.log(data)
                            }}
                            onRowEditCommit={onEditCommit}
                            components={{
                                Toolbar: AddToolBar,
                            }}
                        />
                    </div>
                </CardContent>
            </Card>
        </Container>
    )
}

export default Street