import React, { useEffect, useState } from 'react';
import APIGETALL from '../../../services/main/GetAll';
import { DataGrid } from '@mui/x-data-grid';
import { Card, CardContent, Chip, Typography } from '@mui/material';
import { Relative } from '../../../components/Moment';
import { useNavigate } from 'react-router-dom';

const columns = [
    { field: 'id', headerName: 'ID', hide: true, width: 0, },
    { field: 'waktu', headerName: 'Tanggal', width: 130, valueGetter: (params) => `${Relative(params.row.created_at) || ''}` },
    {
        field: 'status', headerName: 'Status', width: 200, renderCell: (params) => {
            const statusId = params.row.status_id
            return (
                <Chip label={params.row.status.statuse || ''} color={statusId === 1 ? 'error' : statusId === 2 ? 'warning' : statusId === 3 ? 'success' : 'primary'} variant="contained" size='small' />
            )
        }
    },
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
                <div style={{ height: '73vh', width: '100%' }}>
                    <DataGrid
                        rows={data}
                        onRowClick={(item) => navigate(`${item.id}`)}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default Sikoja