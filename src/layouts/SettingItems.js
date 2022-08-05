import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { Logout } from '../utils/Auth';
import APILOGOUT from '../services/main/Logout';

const SettingItems = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [data, setData] = React.useState({
        username: localStorage.getItem('username')
    })


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleClick = () => {
        APILOGOUT.SignOut(data).then(result => {
            Logout();
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', m: 0 }}>
                        <AccountCircleIcon fontSize="large" />
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem>
                    {/* <Typography textAlign="center">Logout</Typography> */}
                    <Button onClick={handleClick}>
                        Logout
                    </Button>
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default SettingItems