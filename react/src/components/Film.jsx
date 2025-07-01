import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Name from './Name';

import MapChars from './MapChars';

const Film = ({onClick }) => {
    const { id } = useParams();
    const [filmData, setFilmData] = useState(null);
    const [charData, setCharData] = useState([]);
    const [planetsData, setPlanetsData] = useState([]);

    useEffect(() => {
        const fetchFilmData = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_FILMS_URL + '/' + String(id));
                console.log(import.meta.env.VITE_FILMS_URL + '/' + String(id));
                if (!response.ok) {
                    throw new Error('Film data could not be fetched');
                }
                const json_response = await response.json();
                setFilmData(json_response[0]);
                console.log(filmData);
            } catch (error) {
                console.error('Error fetching film data:', error);
            }

            try {
                const response = await fetch(import.meta.env.VITE_FILMS_URL + '/' + String(id) + "/characters");
                if (!response.ok) {
                    throw new Error('Characters could not be fetched!');
                }
                const json_response = await response.json();
                setCharData(json_response);
                console.log("Character Data: ", json_response); // Log the fetched character data
            } catch (error) {
                console.error('Error fetching character data:', error);
            }

            try {
                const response = await fetch(import.meta.env.VITE_FILMS_URL + '/' + String(id) + '/planets');
                console.log(import.meta.env.VITE_FILMS_URL + '/' + String(id) + '/planets');
                if (!response.ok) {
                    throw new Error('planet data could not be fetched');
                }
                const json_response = await response.json();
                setPlanetsData(json_response[0]);
                console.log(planetsData);
            } catch (error) {
                console.error('Error fetching film data:', error);
            }
        };        

        fetchFilmData();
        
    }, [id]);

    const navigate = useNavigate();

    const handleCharacterClick = (charId) => {
        if (charId) {
            navigate(`/character/${charId}`);
        }
    };

    return (
        <section id="film">     
            <div id="film-desc">
                <h1>{filmData ? filmData.title : "Loading Title"} </h1>
                <div onClick={() => onClick(filmData.id)} style={{ cursor: 'pointer' }}>
                    {filmData ? filmData.name : "Loading film"}
                </div>
                <div>Opening Crawl: {filmData ? filmData.opening_crawl : "Loading film"}</div>
                <div>Director: {filmData ? filmData.director : "Loading film"}</div>
                <div>Release Date: {filmData ? filmData.release_date : "Loading film"}</div>
            </div>
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
            <section id="planets">
                <h3>Planets: </h3>
                {
                    planetsData.length > 0 ? (
                        <MapFilms data={planetsData} onClick={handlePlanetClick} />
                    ) : (
                        'Planet data loading'
                    )
                }
            </section>
        </section>   
    );
};

export default Film;
