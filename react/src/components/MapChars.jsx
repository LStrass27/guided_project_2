import React from 'react';
import Name from './Name'; 

const MapChars = ({ data, onClick }) => {
    // Log the entire data array to the console

    return (
        <div>
            {data ? (
                data.map((character) => {
                    // Log each character object to the console
                    return (
                        <div key={character.id} onClick={() => onClick(character.id)} style={{ cursor: 'pointer' }}>
                            {character.name}
                        </div>
                    );
                })
            ) : (
                <p>Loading character data...</p> // Display a loading message or spinner
            )}
        </div>
    );
};

export default MapChars;