import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Moment from '../../../../components/Moment';
import APIGETONE from '../../../../services/public/GetOne';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import APIGETALL from '../../../../services/main/GetAll';
import Autocomplete from '@mui/material/Autocomplete';
import APIPOST from '../../../../services/main/Post';
import APIPATCH from '../../../../services/main/Patch';
import Skeleton from '@mui/material/Skeleton';
import LoadingBackDrop from '../../../../components/LoadingBackDrop';
import LoadSkeleton from './LoadSkeleton';

const MainData = (props) => {
    const { item } = props;
    const colorChip = (id) => {
        let color = 'error';
        if (id === 1) {
            return color;
        } else if (id === 2) {
            return color = 'warning';
        } else if (id === 3) {
            return color = 'success';
        } else {
            return color = 'primary';
        }
    }
    return (
        <List>
            <ListItem>
                <ListItemText
                    primary={
                        <Typography varian="body1" fontWeight='medium'>
                            Nama Pelapor
                        </Typography>
                    }
                    secondary={
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {item.name} - {item.hp}
                        </Typography>
                    }
                />
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemText
                    primary={
                        <Typography varian="body1" fontWeight='medium'>
                            Judul Laporan
                        </Typography>
                    }
                    secondary={
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {item.title}
                        </Typography>
                    }
                />
            </ListItem>
            <Divider />
            <ListItem >
                <ListItemText
                    primary={
                        <Typography varian="body1" fontWeight='medium'>
                            Keterangan Laporan
                        </Typography>
                    }
                    secondary={
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {item.description}
                        </Typography>
                    }
                />
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemText
                    primary={
                        <Typography varian="body1" fontWeight='medium'>
                            Alamat Kampung
                        </Typography>
                    }
                    secondary={
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {item.village.village}
                        </Typography>
                    }
                />
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemText
                    primary={
                        <Typography varian="body1" fontWeight='medium'>
                            Nama Jalan
                        </Typography>
                    }
                    secondary={
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {item.street ? item.street.street : 'tidak ada'}
                        </Typography>
                    }
                />
            </ListItem>
            <Divider />
        </List>
    )
}

export default MainData