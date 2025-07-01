import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MapChars from './MapChars';
import MapFilms from './MapFilms';

const Planet = () => {
    const { id } = useParams(); 
    const [data, setData] = useState(null); // Set initial state to null
    const [charData, setCharData] = useState([]); // Set initial state to an empty array
    const [filmData, setFilmData] = useState([]); // Set initial state to an empty array


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_PLANETS_URL + '/' + String(id));
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                setData(json_response[0]);
                console.log("Planet Data: ", json_response[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

            try {
                const response = await fetch(import.meta.env.VITE_PLANETS_URL + '/' + String(id) + "/characters");
                if (!response.ok) {
                    throw new Error('Characters could not be fetched!');
                }
                const json_response = await response.json();
                setCharData(json_response);
            } catch (error) {
                console.error('Error fetching character data:', error);
            }

            try {
                const response = await fetch(import.meta.env.VITE_PLANETS_URL + '/' + String(id) + "/films");
                if (!response.ok) {
                    throw new Error('films could not be fetched!');
                }
                const json_response = await response.json();
                setFilmData(json_response);
            } catch (error) {
                console.error('Error fetching film data:', error);
            }
        };

        fetchData();
    }, [id]);

    const navigate = useNavigate();

    const handleCharacterClick = (charId) => {
        if (data && charData) {
            navigate(`/character/${charId}`);
        }
    };

    const handleFilmClick = (filmId) => {
        if (filmId) {
            navigate(`/film/${filmId}`);
        }
    };

    console.log("FILM DATA", filmData);

    return (
        <div>
            <h1>{data ? data.name : 'Loading...'}</h1>

            <section id="characters">
                <h3>Characters: </h3>
                {
                    charData.length > 0 ? (
                        <MapChars data={charData} onClick={handleCharacterClick} />
                    ) : (
                        'Character data loading'
                    )
                }
            </section>

            <section id="films">
            <h3>Films: </h3>
            {
                    filmData.length > 0 ? (
                        <MapFilms data={filmData} onClick={handleFilmClick} />
                    ) : (
                        'Film data loading'
                    )
                }
            </section>
        </div>
    );
};

export default Planet;