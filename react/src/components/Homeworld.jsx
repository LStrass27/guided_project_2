import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Homeworld = (props) => {
    const hId = props.hId; 
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_PLANETS_URL + '/' + String(hId));
            console.log(import.meta.env.VITE_PLANETS_URL + '/' + String(hId))
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
    }, [hId]);

    return (
        <div >
            {data.name}
        </div>
    );
};

export default Homeworld;