import React, { useState, useEffect } from 'react';

const Homeworld = ({ hId, onClick }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = import.meta.env.VITE_PLANETS_URL + '/' + String(hId);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                setData(json_response[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [hId]);


    return (
        <div onClick={() => onClick && onClick(data ? data.id : null)} style={{ cursor: 'pointer' }}>
            {data && data.name ? data.name : "Loading homeworld"}
        </div>
    );
};

export default Homeworld;