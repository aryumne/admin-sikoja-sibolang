import React, { useEffect, useState } from 'react';
import APIGETALL from '../../../services/main/GetAll';
import { DataGrid } from '@mui/x-data-grid';
import { Card, CardContent, Chip, Typography } from '@mui/material';
import { Relative } from '../../../components/Moment';
import { useNavigate } from 'react-router-dom';
import LoadingBackDrop from '../../../components/LoadingBackDrop';

const roleId = localStorage.getItem('role');
const Status = (id) => {
    const objStatus = {
        label: 'Laporan diterima',
        color: 'error'
    }

    if (id === 1) {
        return objStatus
    } else if (id === 2) {
        objStatus.label = 'Laporan Didisposisikan'
        objStatus.color = 'warning'
        return objStatus
    } else if (id === 3) {
        objStatus.label = 'Laporan DitindakLanjuti'
        objStatus.color = 'success'
        return objStatus
    } else {
        objStatus.label = 'Selesai'
        objStatus.color = 'primary'
        return objStatus
    }

}

const columnAdmin = [
    { field: 'id', headerName: 'ID', hide: true, width: 30, },
    { field: 'waktu', headerName: 'Tanggal', flex: 1, valueGetter: (params) => `${Relative(params.row.created_at) || ''}` },
    {
        field: 'status', headerName: 'Status', flex: 1, renderCell: (params) => {
            const statusId = params.row.status_id
            return (
                <Chip label={Status(statusId).label} color={Status(statusId).color} variant="contained" size='small' />
            )
        }
    },
    { field: 'title', headerName: 'Judul Pengaduan', flex: 1 },
    { field: 'description', headerName: 'Keterangan', flex: 1 },
    { field: 'name', headerName: 'Pelapor', flex: 1 },
    { field: 'village', headerName: 'Kampung', flex: 1, valueGetter: (params) => params.row.village ? `${params.row.village.village || ''}` : '' },
    { field: 'street', headerName: 'Jalan', flex: 1, valueGetter: (params) => params.row.street ? `${params.row.street.street}` : '-' },
];
const columnInstansi = [
    { field: 'id', headerName: 'ID', hide: true, width: 30, },
    { field: 'waktu', headerName: 'Tanggal', flex: 1, valueGetter: (params) => `${Relative(params.row.created_at) || ''}` },
    {
        field: 'status', headerName: 'Status', flex: 1, renderCell: (params) => {
            const statusId = params.row.status_id
            return (
                <Chip label={Status(statusId).label} color={Status(statusId).color} variant="contained" size='small' />
            )
        }
    },
    { field: 'title', headerName: 'Judul Pengaduan', flex: 1 },
    { field: 'description', headerName: 'Keterangan', flex: 1 },
    { field: 'name', headerName: 'Pelapor', flex: 1 },
];


const Sikoja = () => {
    const instanceId = localStorage.getItem('instance');
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [openBackDrop, setOpenBackDrop] = useState(false);
    useEffect(() => {
        setOpenBackDrop(true)
        if (roleId == 3) {
            APIGETALL.SikojaDisps().then(result => {
                const newResult = result.filter((item) => item.instance_id == instanceId).map((itm) => itm.sikoja);
                setData(newResult);
                setOpenBackDrop(false)
            }).catch(() => { })
        } else {
            APIGETALL.Sikojas().then(result => {
                setData(result)
                setOpenBackDrop(false)
            }).catch(() => { })
        }
    }, [])
    return (
        <Card >
            <LoadingBackDrop open={openBackDrop} />
            <CardContent>
                <Typography variant='h5' fontWeight='bold' paragraph>
                    Data Pengaduan Sikoja
                </Typography>
                <div style={{ height: '73vh', width: '100%' }}>
                    <DataGrid
                        rows={data}
                        onRowClick={(item) => navigate(`${item.id}`)}
                        columns={roleId < 3 ? columnAdmin : columnInstansi}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default Sikoja