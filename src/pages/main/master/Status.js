import React, { useEffect, useState } from 'react';
import APIGETALL from '../../../services/main/GetAll';
import { DataGrid } from '@mui/x-data-grid';
import { Card, CardContent, Container, Typography } from '@mui/material';
import APIPATCH from '../../../services/main/Patch';
import LoadingBackDrop from '../../../components/LoadingBackDrop';
import AlertSnackbar from '../../../components/AlertSnackbar';


const columns = [
    { field: 'id', headerName: 'ID', width: 30, editable: false },
    { field: 'statuse', headerName: 'Keterangan Status', flex: 1, editable: true },
];


const Status = () => {
    const [statuses, setStatuses] = useState([]);
    const [data, setData] = useState({ statuse: '' });
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [message, setMessage] = useState('Data telah diupdate!');
    const [status, setStatus] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false);


    useEffect(() => {
        setOpenBackdrop(true)
        APIGETALL.Status().then(result => {
            setOpenBackdrop(false)
            setStatuses(result)
        }).catch(error => {
            setOpenBackdrop(false)
            console.log(error.message)
        })
    }, [])

    const onEditCommit = (id) => {
        setOpenBackdrop(true)
        APIPATCH.UpdateStatus(id, data).then(() => {
            setStatus(true)
            setOpenSnackbar(true)
            setOpenBackdrop(false)
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
                        Daftar Status
                    </Typography>
                    <div style={{ height: 319, width: '100%' }}>
                        <DataGrid
                            editMode='row'
                            rows={statuses}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            onEditCellPropsChange={(params) => {
                                setData({ statuse: params.props.value })
                                console.log(data)
                            }}
                            onRowEditCommit={onEditCommit}
                        />
                    </div>
                </CardContent>
            </Card>
        </Container>
    )
}

export default Status