import React, { useEffect, useState } from 'react';
import APIGETALL from '../../../services/main/GetAll';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import APIPATCH from '../../../services/main/Patch';
import LoadingBackDrop from '../../../components/LoadingBackDrop';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import APIPOST from '../../../services/main/Post';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const columns = [
    { field: 'id', headerName: 'ID', width: 30, hide: true, editable: false },
    { field: 'name', headerName: 'Nama Pengguna', flex: 1, editable: false  },
    { field: 'username', headerName: 'Username', flex: 1, editable: false  },
    { field: 'email', headerName: 'Email', flex: 1, editable: false  },
    { field: 'instance', headerName: 'Asal Instansi', flex: 1, valueGetter: (params) => `${params.row.instance.instance}` },
    { field: 'role', headerName: 'Level Pengguna', flex: 1, valueGetter: (params) => `${params.row.role.role}` },
];

function AddToolBar(props) {
    const initialzeUser = {
        name: "",
        username: "",
        hp: "",
        role_id: 3,
        instance_id: null,
        email: "",
        password: "",
        password_confirmation: ""

    }

    const { instances } = props;
    const [newData, setNewData] = useState(initialzeUser);
    const [instance, setInstance] = useState('');
    const [errormessage, setErrormessage] = useState('Pengguna baru berhasil ditambahkan!');
    const [errorstatus, setErrorstatus] = useState(201);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [role, setRole] = useState(3);
    const [open, setOpen] = React.useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectedInstance = (event) => {
        const { value } = event.target;
        setInstance(value);
        setNewData({ ...newData, instance_id: value })
        setErrorstatus(false)
    };
    const handleSelectedRole = (event) => {
        const { value } = event.target;
        setNewData({ ...newData, role_id: value })
        setErrorstatus(false)
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewData({ ...newData, [name]: value })
        setErrorstatus(false)

    }

    const handleChangePassword = (event) => {
        const { value } = event.target;
        setNewData({ ...newData, password: value, password_confirmation: value })
        setErrorstatus(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setOpen(false);
        setOpenBackdrop(true)
        APIPOST.NewUser(newData).then(() => {
            setOpenSnackbar(true)
            setOpenBackdrop(false)
            window.location.reload()
        }).catch(error => {
            setOpenSnackbar(true)
            setErrorstatus(error.status)
            setErrormessage('Gagal menyimpan, Coba lagi!')
            setOpenBackdrop(false)
        })
    }

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleOpen}>
                Pengguna Baru
            </Button>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={1000}
            >
                <Alert severity={errorstatus === 201 ? 'success' : 'error'} sx={{ width: '100%' }} onClose={() => setOpenSnackbar(false)}>
                    {errormessage}
                </Alert>
            </Snackbar>
            <LoadingBackDrop open={openBackdrop} onClick={() => setOpenBackdrop(true)} />
            <Dialog scroll='body' fullWidth aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description" maxWidth='sm' open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Pengguna Baru</DialogTitle>
                    <DialogContent tabIndex={-1}>
                        <DialogContentText>
                            Pastikan data yang didaftarkan sesuai dengan data user dari instansi bersangkutan!
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="name"
                            label="nama pengguna"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="username"
                            name="username"
                            label="username"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            helperText='pastikan username belum terdaftar'
                        />
                        <TextField
                            required
                            margin="dense"
                            id="email"
                            name="email"
                            label="email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            helperText='pastikan email aktif, dan belum terdaftar disistem'
                        />
                        <TextField
                            required
                            margin="dense"
                            id="password"
                            name="password"
                            label="password sementara"
                            type="password"
                            fullWidth
                            variant="outlined"
                            onChange={handleChangePassword}
                            helperText='password harus terdiri dari 8 digit'
                        />
                        <InputLabel id="instance">Asal Instansi</InputLabel>
                        <Select
                            fullWidth
                            required
                            labelId="instance"
                            id="demo-simple-select"
                            value={instance}
                            onChange={handleSelectedInstance}
                        >
                            {
                                instances.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>{item.instance}</MenuItem>
                                ))
                            }
                        </Select>
                        <InputLabel id="instance">Level Pengguna</InputLabel>
                        <Select
                            fullWidth
                            required
                            labelId="instance"
                            id="demo-simple-select"
                            value={role}
                            onChange={handleSelectedRole}
                        >
                            <MenuItem value={2}>Admin SIKOJA-SIBOLANG</MenuItem>
                            <MenuItem value={3}>Admin Instansi</MenuItem>
                        </Select>
                        <TextField
                            required
                            margin="dense"
                            id="hp"
                            name="hp"
                            label="Nomor Hp"
                            type="number"
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            helperText='cth: 08120000000'
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Batal</Button>
                        <Button type='submit'>Simpan</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </GridToolbarContainer >
    );
}

const User = () => {
    const [users, setUsers] = useState([]);
    const [instances, setInstances] = useState([]);
    const [data, setData] = useState({ instance: '' });
    const [openBackdrop, setOpenBackdrop] = useState(false);

    useEffect(() => {
        APIGETALL.Instances().then(result => {
            setInstances(result)
        }).catch(error => {
            console.log(error.message)
        })
    }, [])

    useEffect(() => {
        APIGETALL.Users().then(result => {
            setUsers(result)
        }).catch(error => {
            console.log(error.message)
        })
    }, [])

    const onEditCommit = (id) => {
        setOpenBackdrop(true)
        APIPATCH.UpdateInstance(id, data).then(() => {
            setOpenBackdrop(false)
        }).catch(error => {
            setOpenBackdrop(false)
            console.log(error.status)
        })
    }
    return (
        <Container maxWidth='lg'>
            <LoadingBackDrop open={openBackdrop} onClick={() => setOpenBackdrop(true)} />
            <Card>
                <CardContent>
                    <Typography variant='h5' fontWeight='bold' paragraph>
                        Daftar Instansi
                    </Typography>
                    <div style={{ height: '73vh', width: '100%' }}>
                        <DataGrid
                            editMode='cell'
                            rows={users}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            onEditCellPropsChange={(params) => {
                                setData({ instance: params.props.value })
                                console.log(data)
                            }}
                            onRowEditCommit={onEditCommit}
                            components={{
                                Toolbar: AddToolBar,
                            }}
                            componentsProps={{
                                toolbar: { instances },
                            }}
                        />
                    </div>
                </CardContent>
            </Card>
        </Container>
    )
}

export default User