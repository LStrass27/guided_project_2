import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Planet = () => {
    const { id } = useParams(); 
    const [data, setData] = useState([null]);
    const [charData, setCharData] = useState([null]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_PLANETS_URL + '/' + String(id));
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                setData(json_response[0]);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

            try {
                const response = await fetch(import.meta.env.VITE_PLANETS_URL + '/' + String(id)) + "/characters";
                if (!response.ok) {
                    throw new Error('Characters could not be fetched!');
                }
                const json_response = await response.json();
                setCharData(json_response);
            } catch (error) {
                console.error('Error fetching data:', error);
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

    return (
        <div>
            <h1>{data.name}</h1>

            <section id="characters">
                <h3>Characters: </h3>
                {data && data.homeworld ? <Homeworld hId={data.homeworld} onClick={handleHomeworldClick}/> : 'Homeworld data loading'}
            </section>

            <section id="films">
                <h3>Films Appeared In: </h3>
                <p>Films Appeared In: {data.height} </p>
            </section>
        </div>
    );
};

export default Planet;