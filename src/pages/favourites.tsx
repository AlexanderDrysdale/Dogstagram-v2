import axios from "axios";
import React, { useEffect, useState } from "react";
import DogCard from "../components/dogCard"
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FavouriteDog } from "../models/favouriteDog";
import BackButton from "../components/backButton";

export default function FavouritesPage() {

    const [favouriteDogs, setFavouriteDogs] = useState<FavouriteDog[]>([])

    useEffect(() => {
        fetchFavouriteDogs(1);
    }, []);

    const fetchFavouriteDogs = (pageNumber: Number) => {
        const headers = { 'x-api-key': 'ecd04f9a-fb4c-4fb2-b079-de2aaae47e5f' };
        const params = {
            "sub_id": "my-user-1337",
            limit: 25,
            page: 0
        };
        axios.get(`https://api.thedogapi.com/v1/favourites`, { params: params, headers: headers })
            .then(response => {
                var currentdogs = [...favouriteDogs];
                currentdogs = currentdogs.concat(response.data);
                setFavouriteDogs(currentdogs);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    return (
        <>
            <BackButton />
            <div>
                <div style={{ display: "flex", flexWrap: "wrap", width: "80%", marginLeft: "12%" }}>
                    {
                        favouriteDogs && favouriteDogs.length > 0 ? favouriteDogs.map((dog, index) => {
                            return (<DogCard url={dog.image.url} id={dog.image_id}
                                title={dog.created_at.toString()}
                                description={""} />)
                        }) : null
                    }
                </div>
            </div>
        </>
    );
}