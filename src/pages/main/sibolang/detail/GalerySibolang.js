import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { URLROOT } from '../../../../services/root';
import ReactPlayer from 'react-player';

const GalerySibolang = (props) => {
    return (
        <ImageList
            sx={{ width: '100', height: 'auto' }}
            variant="quilted"
            cols={3}
            rowHeight={130}
            width='100%'
        >
            {
                props.item.map((galery) => {
                    const extension = galery.filename.split('.')
                    if (extension[1] === 'mp4') {
                        return (
                            <ReactPlayer key={galery.id} height='auto' width='100%' controls url={URLROOT + galery.path} playing={true} />
                        )
                    } else {
                        return (
                            <ImageListItem key={galery.id}>
                                <img
                                    src={URLROOT + galery.path}
                                    alt='satuuu'
                                    loading="lazy"
                                />
                            </ImageListItem>
                        )
                    }
                })
            }
        </ImageList>
    )
}

export default GalerySibolang