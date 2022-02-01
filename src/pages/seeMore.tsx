import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import Dog from '../models/dog';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import BackButton from '../components/backButton';

function createData(
    name: string,
    bred_for: string,
    breed_group: string,
    life_span: string,
    temperament: string,
    weight: string,
    height: string) {
    return {
        name,
        bred_for,
        breed_group,
        life_span,
        temperament,
        weight,
        height
    };
}

export default function SeeMorePage() {
    const [dog, setDog] = useState<Dog>();
    let { imageId } = useParams();

    useEffect(() => {
        axios.get(`https://api.thedogapi.com/v1/images/${imageId}`)
            .then(response => {
                setDog(response.data);
                debugger;
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

    }, []);

    return (
        <>
            <BackButton />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Bred for</TableCell>
                            <TableCell align="right">Breed group</TableCell>
                            <TableCell align="right">Life span</TableCell>
                            <TableCell align="right">Temperament</TableCell>
                            <TableCell align="right">Weight</TableCell>
                            <TableCell align="right">Height</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            dog ?
                                (<TableRow
                                    key={dog?.breeds[0]?.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {dog?.breeds[0]?.name}
                                    </TableCell>
                                    <TableCell align="right">{dog?.breeds[0]?.bred_for}</TableCell>
                                    <TableCell align="right">{dog?.breeds[0]?.breed_group}</TableCell>
                                    <TableCell align="right">{dog?.breeds[0]?.life_span}</TableCell>
                                    <TableCell align="right">{dog?.breeds[0]?.temperament}</TableCell>
                                    <TableCell align="right">{dog?.breeds[0]?.weight.metric}</TableCell>
                                    <TableCell align="right">{dog?.breeds[0]?.height.metric}</TableCell>
                                </TableRow>)
                                : null
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}