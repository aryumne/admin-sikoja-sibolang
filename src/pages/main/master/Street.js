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


const columns = [
    { field: 'id', headerName: 'ID', width: 30, editable: false },
    { field: 'street', headerName: 'Nama Jalan', flex: 1, editable: true },
];

function AddToolBar() {
    const [newData, setNewData] = useState({ street: '' });
    const [open, setOpen] = React.useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(false);

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
            setOpenBackdrop(false)
            window.location.reload()
        }).catch(error => {
            console.log(error.status)
            setOpenBackdrop(false)
        })
    }

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleOpen}>
                Jalan Baru
            </Button>
            <LoadingBackDrop open={openBackdrop} onClick={() => setOpenBackdrop(true)} />
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
    const [streets, setStreets] = useState([]);
    const [data, setData] = useState({ street: '' });
    const [openBackdrop, setOpenBackdrop] = useState(false);


    useEffect(() => {
        APIGETALL.Streets().then(result => {
            setStreets(result)
        }).catch(error => {
            console.log(error.message)
        })
    }, [])

    const onEditCommit = (id) => {
        setOpenBackdrop(true)
        APIPATCH.UpdateStreet(id, data).then(() => {
            setOpenBackdrop(false)
        }).catch(error => {
            setOpenBackdrop(false)
            console.log(error.status)
        })
    }
    return (
        <Container maxWidth='md'>
            <LoadingBackDrop open={openBackdrop} onClick={() => setOpenBackdrop(true)} />
            <Card>
                <CardContent>
                    <Typography variant='h5' fontWeight='bold' paragraph>
                        Daftar Nama Jalan
                    </Typography>
                    <div style={{ height: '73vh', width: '100%' }}>
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