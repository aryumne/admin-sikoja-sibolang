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
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import APIPOST from '../../../services/main/Post';
import AlertSnackbar from '../../../components/AlertSnackbar';
import APIUPLOAD from '../../../services/main/upload';


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
        APIUPLOAD.UploadVillage(data).then((result) => {
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

function AddToolBar({ districts }) {
    const [newData, setNewData] = useState({ village: '', district_id: 1 });
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
        APIPOST.NewVillage(newData).then(() => {
            setStatus(true)
            setOpenBackdrop(false)
            window.location.reload()
            setOpenSnackbar(true)
        }).catch(() => {
            setMessage('Gagal menyimpan data, coba lagi!')
            setStatus(false)
            setOpenSnackbar(true)
            setOpenBackdrop(false)
        })
    }

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleOpen}>
                Kampung Baru
            </Button>
            <LoadingBackDrop open={openBackdrop} onClick={() => setOpenBackdrop(true)} />
            <AlertSnackbar message={message} status={status} opensnackbar={openSnackbar} setOpensnackbar={setOpenSnackbar} />
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Kampung Baru</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Masukkan nama kampung yang belum terdaftar!
                        </DialogContentText>
                        <FormControl fullWidth>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="village"
                                name="village"
                                label="nama kampung"
                                type="text"
                                variant="standard"
                                onChange={handleChange}
                            />
                            <Select
                                variant='standard'
                                labelId="Pilih Distrik"
                                id="district_id"
                                name="district_id"
                                value={newData.district_id}
                                label="Age"
                                onChange={handleChange}
                                sx={{ mt: 2 }}
                            >
                                {districts.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>{item.district}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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

const Village = () => {
    const role = localStorage.getItem('role')
    const [villages, setVillages] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [data, setData] = useState({ village: '', district_id: null });
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [message, setMessage] = useState('Data telah diupdate!');
    const [status, setStatus] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const columns = [
        { field: 'id', headerName: 'ID', width: 30, editable: false },
        { field: 'village', headerName: 'Nama Kampung', flex: 1, editable: true },
        {
            field: 'district_id', headerName: 'Distrik', flex: 1,
            type: 'singleSelect',
            valueOptions: districts.map((item) => ({ value: item.id, label: item.district })),
            valueGetter: (params) => params.row.district ? `${params.row.district.district}` : '-', editable: true,
        },
    ];

    useEffect(() => {
        setOpenBackdrop(true)
        APIGETALL.Villages().then(result => {
            setVillages(result)
            setOpenBackdrop(false)
        }).catch(() => { })
    }, [])

    useEffect(() => {
        setOpenBackdrop(true)
        APIGETALL.Districts().then(result => {
            setDistricts(result)
        }).catch(() => { })
    }, [])

    const onEditCommit = (id) => {
        setOpenBackdrop(true)
        APIPATCH.UpdateVillage(id, data).then(() => {
            setStatus(true)
            setOpenBackdrop(false)
            setOpenSnackbar(true)
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }).catch(error => {
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
                        Daftar Nama Kampung
                    </Typography>
                    {role == 1 ? (<Import />) : ''}
                    <div style={{ height: '85vh', width: '100%' }}>
                        <DataGrid
                            editMode='row'
                            rows={villages}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            onRowDoubleClick={(params) => {
                                setData({ ...params.row })
                            }}
                            onEditCellPropsChange={(params) => {
                                setData({ ...data, [params.field]: params.props.value })
                            }}
                            onRowEditCommit={onEditCommit}
                            components={{
                                Toolbar: AddToolBar,
                            }}
                            componentsProps={{
                                toolbar: { districts }
                            }}
                        />
                    </div>
                </CardContent>
            </Card>
        </Container>
    )
}

export default Village