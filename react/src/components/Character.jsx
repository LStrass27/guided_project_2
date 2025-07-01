import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Homeworld from "./homeworld";
import MapFilms from './MapFilms';


const Character = () => {
    const { id } = useParams(); 
    const [data, setData] = useState([null]);
    const [filmsData, setFilmsData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_CHARACTERS_URL + '/' + String(id));        
            if (!response.ok) {
                throw new Error('Data could not be fetched!');
            }
            const json_response = await response.json();
            setData(json_response[0]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        try {
            const response = await fetch(import.meta.env.VITE_CHARACTERS_URL + '/' + String(id) + "/films");
            console.log(response);      
            if (!response.ok) {
                throw new Error('films could not be fetched!');
            }
            const json_response = await response.json();
            setFilmsData(json_response);
            console.log("Film Data: ", json_response); // Log the fetched character data
        } catch (error) {
            console.error('Error fetching film data:', error);
        }


        };

        fetchData();
    }, [id]);

    const navigate = useNavigate();

    const handleHomeworldClick = () => {
        if (data && data.homeworld) {
            navigate(`/planet/${data.homeworld}`);
        }
    };

    const handleFilmClick = (filmId) => {
        if (filmId) {
            navigate(`/film/${filmId}`);
        }
    };


    return (
        <div>
            <h1>{data.name}</h1>
            <section id="generalInfo">
                <p>Height: {data.height} cm</p>
                <p>Mass: {data.mass} kg</p>
                <p>Born: {data.birth_year}</p>
            </section>

            <section id="homeworld">
                <h3>Homeworld: </h3>
                {data && data.homeworld ? <Homeworld hId={data.homeworld} onClick={handleHomeworldClick}/> : 'Homeworld data loading'}
            </section>

            <section id="films">
                <h3>Films appeared: </h3>
                {
                    filmsData.length > 0 ? (
                        <MapFilms data={filmsData} onClick={handleFilmClick} />
                    ) : (
                        'Film data loading'
                    )
                }
            </section>
        </div>
    );
};

export default Character;