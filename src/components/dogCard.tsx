import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type Props = {
    url: string,
    id: string,
    title: string,
    description: string
};



export default function DogCard({ url, id, title, description }: Props) {
    const navigate = useNavigate();
    const addToFavourites = async (id: string) => {
        const body = {
            "image_id": id,
            "sub_id": "my-user-1337"
        };
        const headers = { 'x-api-key': 'ecd04f9a-fb4c-4fb2-b079-de2aaae47e5f' };
        const response = await axios.post('https://api.thedogapi.com/v1/favourites', body, { headers });
    }

    return (
        <>
            <Card sx={{ width: 345 }} style={{ margin: "5px" }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={url}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        onClick={() => {
                            addToFavourites(id);
                        }}
                        startIcon={<FavoriteIcon />}
                    >
                    </Button>
                    {
                        title && title !== '' ? (
                            <Button size="small" onClick={() => {
                                navigate(`/seemore/${id}`);
                            }}>See more...</Button>) : null
                    }
                </CardActions>
            </Card>
        </>
    );
}
