import React from 'react';
import Name from './Name'; 

const MapPlanets = ({ data, onClick }) => {
    // Log the entire data array to the console

    return (
        <div>
            {data ? (
                data.map((planet) => {
                    // Log each character object to the console
                    return (
                        <div key={planet.id} onClick={() => onClick(planet.id)} style={{ cursor: 'pointer' }}>
                            {planet.name}
                        </div>
                    );
                })
            ) : (
                <p>Loading planet data...</p> // Display a loading message or spinner
            )}
        </div>
    );
};

export default MapPlanets;