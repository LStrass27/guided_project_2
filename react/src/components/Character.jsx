import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Homeworld from "./homeworld";

const Character = () => {
    const { id } = useParams(); 
    const [data, setData] = useState([null]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_CHARACTERS_URL + '/' + String(id));
            if (!response.ok) {
                throw new Error('Data could not be fetched!');
            }
            const json_response = await response.json();
            setData(json_response[0]);
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, [id]);

    return (
        <div>
            <h1>{data.name}</h1>
            <section id="generalInfo">
                <p>Height: {data.height} cm</p>
                <p>Mass: {data.mass} kg</p>
                <p>Born: {data.birth_year}</p>
            </section>

            <section id="homeworld">
                <p>Homeworld: <Homeworld hId={data.homeworld}/> </p>
            </section>

            <section id="films">
                <p>Films Appeared In: {data.height} </p>
            </section>
        </div>
    );
};

export default Character;