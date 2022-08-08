import React from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

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
                            {item.village ? item.village.village : ''}
                        </Typography>
                    }
                />
            </ListItem>
            <Divider />
            <ListItem>
                <ListItemText
                    primary={
                        <Typography varian="body1" fontWeight='medium'>
                            Kategori Pengaduan
                        </Typography>
                    }
                    secondary={
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {item.category.category}
                        </Typography>
                    }
                />
            </ListItem>
            <Divider />
        </List>
    )
}

export default MainData