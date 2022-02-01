import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Dog from "../models/dog";
import Breed from "../models/breed";
import DogCard from "../components/dogCard";
import BreedDisplayList from "../models/breedSelect"
import { Autocomplete, Button, FormControl, Grid, InputLabel, MenuItem, Pagination, Select, Stack, TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export default function IndexPage() {

    const [breedDisplayList, setbreedDisplayList] = useState<BreedDisplayList[]>([]);
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [page, setPage] = useState(1);
    const [breeds, setBreeds] = useState<Breed[]>();

    const navigate = useNavigate();

    useEffect(() => {
        fetchDogSearchResults(0);
        fetchDogBreedResults();
    }, []);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        fetchDogSearchResults(value - 1);
    };

    const fetchDogSearchResults = (pageIndex: number, breedId?: number) => {
        var queryString = `https://api.thedogapi.com/v1/images/search?limit=8&page=${pageIndex}&order=Desc`
        if (breedId)
            queryString += `&breed_ids=${breedId}`
        axios.get(queryString)
            .then(response => {
                setDogs(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const fetchDogBreedResults = () => {
        axios.get(`https://api.thedogapi.com/v1/breeds`)
            .then(response => {
                setBreeds(response.data);
                constructBreedList(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }


    const fetchSpecificBreed = (value: number) => {
        axios.get(` https://api.TheDogAPI.com/images/search?breed_id=${{ value }}`)
            .then(response => {
                setDogs(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }


    const constructBreedList = (breeds: Breed[] | undefined) => {
        let toPushBreeds: BreedDisplayList[] = [];
        breeds?.forEach(breed => {
            toPushBreeds.push({ label: breed.name, id: breed.id })
        });
        setbreedDisplayList(toPushBreeds);
    }

    const navigateToFavourites = () => {
        navigate('favourites');
    }
    const handleBreedChange = () => {

    }
    return (
        <div style={{ width: "80%", marginLeft: "13%" }}>
            <div style={{ margin: "30px", }}>
                <div style={{ display: "inline-block", marginTop: "20px", marginRight: "5px" }} >
                    <Button variant="contained" style={{ float: "left" }}
                        onClick={() => { navigateToFavourites() }}
                    >
                        Favourites
                    </Button>
                </div>
                <div style={{ display: "inline-block", }}>
                    {breedDisplayList && breedDisplayList.length > 0 ?
                        < Autocomplete

                            onChange={(event: any, value: BreedDisplayList | null) => {
                                if (value && value?.id)
                                    // TODO save to state to allow page number change
                                    fetchDogSearchResults(0, value?.id);
                            }}
                            disablePortal
                            id="combo-box-demo"
                            options={breedDisplayList}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Breed" />}
                        /> : null

                    }
                </div></div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {
                    dogs && dogs.length > 0 ? dogs.map((dog, index) => {
                        return (<DogCard url={dog.url} id={dog.id}
                            title={dog.breeds[0]?.name}
                            description={dog.breeds[0]?.bred_for} />)
                    }) : null
                }
            </div>
            <Stack spacing={2} style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                width: "40%",
                marginTop: "20px"
            }}>
                <Pagination count={10} page={page} onChange={handlePageChange} size="large" />
            </Stack>
        </div>
    );
}
