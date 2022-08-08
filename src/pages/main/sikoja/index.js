import React, { useEffect, useState } from 'react';
import APIGETALL from '../../../services/main/GetAll';
import { DataGrid } from '@mui/x-data-grid';
import { Card, CardContent, Chip, Typography } from '@mui/material';
import { Relative } from '../../../components/Moment';
import { useNavigate } from 'react-router-dom';
import LoadingBackDrop from '../../../components/LoadingBackDrop';

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

const columns = [
    { field: 'id', headerName: 'ID', hide: true, width: 0, },
    { field: 'waktu', headerName: 'Tanggal', width: 130, valueGetter: (params) => `${Relative(params.row.created_at) || ''}` },
    {
        field: 'status', headerName: 'Status', width: 200, renderCell: (params) => {
            const statusId = params.row.status_id
            return (
                <Chip label={Status(statusId).label} color={Status(statusId).color} variant="contained" size='small' />
            )
        }
    },
    { field: 'title', headerName: 'Judul Pengaduan', width: 250 },
    { field: 'description', headerName: 'Keterangan', width: 250 },
    { field: 'name', headerName: 'Pelapor', width: 200 },
    { field: 'kampung', headerName: 'Kampung', width: 170, valueGetter: (params) => params.row.village ? `${params.row.village.village || ''}` : '' },
    { field: 'street', headerName: 'Jalan', width: 250, valueGetter: (params) => params.row.street ? `${params.row.street.street}` : '-' },
];


const Sikoja = () => {
    const instanceId = localStorage.getItem('instance');
    const roleId = localStorage.getItem('role');
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [openBackDrop, setOpenBackDrop] = useState(false);
    useEffect(() => {
        setOpenBackDrop(true)
        if (roleId == 3) {
            APIGETALL.SikojaDisps().then(result => {
                const newResult = result.filter((item) => item.instance_id == instanceId).map((itm) => itm.sikoja);
                setData(newResult);
                console.log(newResult)
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