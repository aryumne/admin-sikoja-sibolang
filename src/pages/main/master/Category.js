import React, { useEffect, useState } from 'react';
import APIGETALL from '../../../services/main/GetAll';
import { DataGrid } from '@mui/x-data-grid';
import { Card, CardContent, Container, Typography } from '@mui/material';
import APIPATCH from '../../../services/main/Patch';
import LoadingBackDrop from '../../../components/LoadingBackDrop';
import AlertSnackbar from '../../../components/AlertSnackbar';

const columns = [
    { field: 'id', headerName: 'ID', width: 30, editable: false },
    { field: 'category', headerName: 'Nama Kateogri', flex: 1, editable: true },
];


const Category = () => {
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState({ category: '' });
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [message, setMessage] = useState('Data telah diupdate!');
    const [status, setStatus] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false);


    useEffect(() => {
        setOpenBackdrop(true)
        APIGETALL.Categories().then(result => {
            setCategories(result)
            setOpenBackdrop(false)
        }).catch(error => {
            setOpenBackdrop(false)
            console.log(error.message)
        })
    }, [])

    const onEditCommit = (id) => {
        setOpenBackdrop(true)
        APIPATCH.UpdateCategory(id, data).then(() => {
            setStatus(true)
            setOpenBackdrop(false)
            setOpenSnackbar(true)
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
                        Daftar Kategori
                    </Typography>
                    <div style={{ height: '73vh', width: '100%' }}>
                        <DataGrid
                            editMode='row'
                            rows={categories}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            onEditCellPropsChange={(params) => {
                                setData({ category: params.props.value })
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

export default Category