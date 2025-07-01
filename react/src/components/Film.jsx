import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Name from './Name';
import MapChars from './MapChars';

const Film = ({ fId, onClick }) => {
    const [filmData, setFilmData] = useState(null);
    const [charactersData, setCharactersData] = useState([]);
    const [planetsData, setPlanetsData] = useState([]);

    useEffect(() => {
        const fetchFilmData = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_FILMS_URL + '/' + String(fId));
                console.log(import.meta.env.VITE_FILMS_URL + '/' + String(fId));
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
                const response = await fetch(import.meta.env.VITE_PLANETS_URL + '/' + String(id) + "/characters");
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
                const response = await fetch(import.meta.env.VITE_FILMS_URL + '/' + String(fId) + '/planets');
                console.log(import.meta.env.VITE_FILMS_URL + '/' + String(fId) + '/planets');
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

        
            

        

        fetchData();
        
    }, [fId]);

    return (
        <section id="film">     
            <div id="film-desc">
                <div onClick={() => onClick(filmData.id)} style={{ cursor: 'pointer' }}>
                    {filmData.name ? filmData.name : "Loading film"}
                </div>
                <div>{filmData.opening_crawl}</div>
                <div>{filmData.director}</div>
                <div>{filmData.release_date}</div>
            </div>
            <div id="charactersList">
                <ul>
                {
                    characters.map((ch)=> (
                        <li><Name key={ch._id} data={ch} onClick={handleNameClick}/></li>
                    ))
                }
                </ul> 
            </div>
            <div id="planetsList">
                <ul>
                {
                    planets.map((p)=> (
                        <li><Name key={p._id} data={p} onClick={handleNameClick}/></li>
                    ))
                }
                </ul> 
            </div>
        </section>   
    );
};

export default Film;
