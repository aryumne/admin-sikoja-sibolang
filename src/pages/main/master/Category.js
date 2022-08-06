import React, { useEffect, useState } from 'react';
import APIGETALL from '../../../services/main/GetAll';
import { DataGrid } from '@mui/x-data-grid';
import { Card, CardContent, Container, Typography } from '@mui/material';
import APIPATCH from '../../../services/main/Patch';
import LoadingBackDrop from '../../../components/LoadingBackDrop';

const columns = [
    { field: 'id', headerName: 'ID', width: 30, editable: false },
    { field: 'category', headerName: 'Nama Kateogri', flex: 1, editable: true },
];


const Street = () => {
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState({ category: '' });
    const [openBackdrop, setOpenBackdrop] = useState(false);


    useEffect(() => {
        APIGETALL.Categories().then(result => {
            setCategories(result)
        }).catch(error => {
            console.log(error.message)
        })
    }, [])

    const onEditCommit = (id) => {
        setOpenBackdrop(true)
        APIPATCH.UpdateCategory(id, data).then(() => {
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

export default Street