import React, { useEffect, useState } from 'react';
import APIGETALL from '../../../services/main/GetAll';
import { DataGrid } from '@mui/x-data-grid';
import { Card, CardContent, Chip, Typography } from '@mui/material';
import Moment from '../../../components/Moment';
import { useNavigate } from 'react-router-dom';

const columns = [
    { field: 'id', headerName: 'ID', hide: true, width: 0, },
    { field: 'waktu', headerName: 'Tanggal', width: 130, valueGetter: (params) => `${Moment(params.row.created_at) || ''}` },
    { field: 'status', headerName: 'Status', width: 140, valueGetter: (params) => { <Chip label={params.row.status.statuse || ''} color="primary" variant="outlined" /> } },
    { field: 'title', headerName: 'Judul Pengaduan', width: 250 },
    { field: 'description', headerName: 'Keterangan', width: 250 },
    { field: 'name', headerName: 'Pelapor', width: 200 },
    { field: 'kampung', headerName: 'Kampung', width: 170, valueGetter: (params) => params.row.village ? `${params.row.village.village || ''}` : '' },
    { field: 'street', headerName: 'Jalan', width: 250, valueGetter: (params) => params.row.street ? `${params.row.street.street}` : '' },
];


const Sikoja = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    useEffect(() => {
        APIGETALL.Sikojas().then(result => {
            setData(result)
        }).catch(error => {
            console.log(error.message)
        })
    }, [])
    return (
        <Card >
            <CardContent>
                <Typography variant='h5' fontWeight='bold' paragraph>
                    Data Pengaduan Sikoja
                </Typography>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={data}
                        onRowClick={(item) => navigate(`${item.id}`)}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default Sikoja