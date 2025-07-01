import React, { useState, useEffect } from 'react';

const Homeworld = ({ hId, onClick }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetching data for Homeworld with hId:", hId);
                const url = import.meta.env.VITE_PLANETS_URL + '/' + String(hId);
                console.log("Fetch URL:", url);
                const response = await fetch(url);
                console.log("Fetch response:", response);
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                const json_response = await response.json();
                console.log("JSON response:", json_response);
                setData(json_response[0]);
                console.log("Data set:", json_response[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [hId]);

    console.log("Current data state:", data);

    return (
        <div onClick={() => onClick && onClick(data ? data.id : null)} style={{ cursor: 'pointer' }}>
            {data && data.name ? data.name : "Loading homeworld"}
        </div>
    );
};

export default Homeworld;